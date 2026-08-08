import { readdir, readFile, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { defineTool, type ToolDefinition } from "eve/tools";
import { workspaceRoot } from "./workspace.js";

export type PluginInstruction =
  | string
  | ((event: unknown, context: unknown) => string | null | undefined | Promise<string | null | undefined>);
export type PluginHook = (event: unknown, context: unknown) => unknown | Promise<unknown>;

export interface EveAgentPluginApi {
  readonly namespace: string;
  registerTool(name: string, definition: Parameters<typeof defineTool>[0]): void;
  addInstructions(instructions: PluginInstruction): void;
  on(event: string, handler: PluginHook): void;
}

export type EveAgentPluginFactory = (api: EveAgentPluginApi) => void | Promise<void>;

interface LoadedPlugin {
  namespace: string;
  source: string;
  tools: Map<string, ToolDefinition>;
  instructions: PluginInstruction[];
  hooks: Map<string, PluginHook[]>;
}

interface PluginCandidate { source: string; namespace: string }
interface PluginManifest {
  name?: unknown;
  eveAgent?: { plugin?: unknown; namespace?: unknown };
}

const EXTENSIONS = new Set([".js", ".mjs", ".cjs", ".ts", ".mts", ".cts"]);
let cache: Promise<LoadedPlugin[]> | undefined;

function validNamespace(value: string): boolean {
  return /^[a-z][a-z0-9_-]*$/i.test(value);
}

function namespaceFromName(value: string): string {
  const base = value.split("/").at(-1) || "plugin";
  return base.replace(/(?:^eve-agent-|^eve-|\-eve-agent$|\-plugin$)/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-");
}

async function candidateFromEntry(entry: string): Promise<PluginCandidate | undefined> {
  const info = await stat(entry);
  if (info.isFile()) {
    const extension = path.extname(entry);
    if (!EXTENSIONS.has(extension) || entry.endsWith(".d.ts")) return;
    return { source: entry, namespace: namespaceFromName(path.basename(entry, extension)) };
  }
  if (!info.isDirectory()) return;
  let manifest: PluginManifest = {};
  try { manifest = JSON.parse(await readFile(path.join(entry, "package.json"), "utf8")) as PluginManifest; }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  const declared = manifest.eveAgent?.plugin;
  const candidates = typeof declared === "string"
    ? [declared]
    : ["index.mjs", "index.js", "index.ts"];
  for (const relative of candidates) {
    const source = path.resolve(entry, relative);
    try {
      if ((await stat(source)).isFile()) {
        const requested = manifest.eveAgent?.namespace;
        const namespace = typeof requested === "string"
          ? requested
          : namespaceFromName(typeof manifest.name === "string" ? manifest.name : path.basename(entry));
        return { source, namespace };
      }
    } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  }
}

export async function pluginRoots(): Promise<string[]> {
  const home = process.env.EVE_AGENT_HOME?.trim() || path.join(os.homedir(), ".config", "eve-agent");
  const workspace = await workspaceRoot();
  const explicit = (process.env.EVE_AGENT_PLUGIN_PATHS ?? "")
    .split(path.delimiter)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => path.resolve(value));
  return [...explicit, path.join(workspace, ".eve-agent", "plugins"), path.join(home, "plugins")];
}

async function discoverCandidates(): Promise<PluginCandidate[]> {
  const candidates: PluginCandidate[] = [];
  for (const root of await pluginRoots()) {
    let entries;
    try { entries = await readdir(root, { withFileTypes: true }); }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      console.warn(`[eve-agent] Cannot scan plugin directory ${root}:`, error);
      continue;
    }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name.startsWith(".")) continue;
      try {
        const candidate = await candidateFromEntry(path.join(root, entry.name));
        if (candidate) candidates.push(candidate);
      } catch (error) {
        console.warn(`[eve-agent] Cannot inspect plugin ${path.join(root, entry.name)}:`, error);
      }
    }
  }
  return candidates;
}

async function loadPlugin(candidate: PluginCandidate): Promise<LoadedPlugin> {
  if (!validNamespace(candidate.namespace)) throw new Error(`Invalid plugin namespace: ${candidate.namespace}`);
  const imported = await import(pathToFileURL(candidate.source).href);
  const factory = imported.default ?? imported.plugin;
  if (typeof factory !== "function") throw new Error("Plugin must default-export a registration function");
  const plugin: LoadedPlugin = {
    namespace: candidate.namespace,
    source: candidate.source,
    tools: new Map(),
    instructions: [],
    hooks: new Map(),
  };
  const api: EveAgentPluginApi = {
    namespace: candidate.namespace,
    registerTool(name, definition) {
      if (!validNamespace(name)) throw new Error(`Invalid tool name: ${name}`);
      if (plugin.tools.has(name)) throw new Error(`Tool already registered: ${name}`);
      plugin.tools.set(name, defineTool(definition) as ToolDefinition);
    },
    addInstructions(instructions) {
      if (typeof instructions !== "string" && typeof instructions !== "function") throw new Error("Instructions must be text or a resolver function");
      plugin.instructions.push(instructions);
    },
    on(event, handler) {
      if (!event || typeof handler !== "function") throw new Error("Plugin hooks require an event name and handler");
      const handlers = plugin.hooks.get(event) ?? [];
      handlers.push(handler);
      plugin.hooks.set(event, handlers);
    },
  };
  await (factory as EveAgentPluginFactory)(api);
  return plugin;
}

export async function loadPlugins(): Promise<LoadedPlugin[]> {
  if (!cache) cache = (async () => {
    const loaded: LoadedPlugin[] = [];
    const namespaces = new Set<string>();
    for (const candidate of await discoverCandidates()) {
      if (namespaces.has(candidate.namespace)) {
        console.warn(`[eve-agent] Skipping duplicate plugin namespace ${candidate.namespace}: ${candidate.source}`);
        continue;
      }
      try {
        const plugin = await loadPlugin(candidate);
        namespaces.add(plugin.namespace);
        loaded.push(plugin);
      } catch (error) {
        console.warn(`[eve-agent] Failed to load plugin ${candidate.source}:`, error);
      }
    }
    return loaded;
  })();
  return cache;
}

export async function executePluginTool(
  namespace: string,
  name: string,
  input: unknown,
  context: unknown,
): Promise<unknown> {
  const plugin = (await loadPlugins()).find((candidate) => candidate.namespace === namespace);
  const tool = plugin?.tools.get(name);
  if (!tool) throw new Error(`Plugin tool is unavailable: ${namespace}__${name}`);
  return tool.execute(input, context as never);
}

export async function resolvePluginTools(): Promise<Record<string, ToolDefinition>> {
  const tools: Record<string, ToolDefinition> = {};
  for (const plugin of await loadPlugins()) {
    for (const [name, definition] of plugin.tools) {
      const namespace = plugin.namespace;
      const toolName = name;
      tools[`${namespace}__${toolName}`] = defineTool({
        ...definition,
        execute: async (input, context) => executePluginTool(namespace, toolName, input, context),
      }) as ToolDefinition;
    }
  }
  return tools;
}

export async function resolvePluginInstructions(event: unknown, context: unknown): Promise<string> {
  const sections: string[] = [];
  for (const plugin of await loadPlugins()) {
    for (const contribution of plugin.instructions) {
      try {
        const markdown = typeof contribution === "string" ? contribution : await contribution(event, context);
        if (markdown?.trim()) sections.push(`# ${plugin.namespace} plugin

${markdown.trim()}`);
      } catch (error) {
        console.warn(`[eve-agent] Plugin ${plugin.namespace} instructions failed:`, error);
      }
    }
  }
  return sections.join("\n\n");
}

export async function dispatchPluginHooks(event: { type?: unknown }, context: unknown): Promise<void> {
  const type = typeof event.type === "string" ? event.type : "";
  for (const plugin of await loadPlugins()) {
    for (const handler of [...(plugin.hooks.get(type) ?? []), ...(plugin.hooks.get("*") ?? [])]) {
      try { await handler(event, context); }
      catch (error) { console.warn(`[eve-agent] Plugin ${plugin.namespace} hook ${type || "(unknown)"} failed:`, error); }
    }
  }
}

export function resetPluginCacheForTests(): void { cache = undefined; }
