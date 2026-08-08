import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  dispatchPluginHooks,
  resetPluginCacheForTests,
  resolvePluginInstructions,
  resolvePluginTools,
} from "../agent/lib/plugins.js";

const standardSchema = `{
  "~standard": {
    version: 1,
    vendor: "fixture",
    validate: (value) => ({ value }),
  },
}`;

test("runtime plugins are discovered outside the application dependencies", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "eve-agent-plugins-"));
  const workspace = path.join(root, "workspace");
  const pluginRoot = path.join(root, "external-plugins");
  const plugin = path.join(pluginRoot, "hello");
  await mkdir(workspace, { recursive: true });
  await mkdir(plugin, { recursive: true });
  await writeFile(path.join(plugin, "package.json"), JSON.stringify({
    name: "@fixture/hello-plugin",
    eveAgent: { plugin: "./entry.mjs", namespace: "hello" },
  }));
  await writeFile(path.join(plugin, "entry.mjs"), `
    export default (api) => {
      api.addInstructions("Always greet the user.");
      api.registerTool("echo", {
        description: "Echo input",
        inputSchema: ${standardSchema},
        execute: async (input, context) => ({ input, session: context.session.id }),
      });
      api.on("session.completed", (_event, context) => {
        globalThis.__eveAgentFixtureSession = context.session.id;
      });
    };
  `);

  const previous = {
    workspace: process.env.CODING_WORKSPACE,
    home: process.env.EVE_AGENT_HOME,
    paths: process.env.EVE_AGENT_PLUGIN_PATHS,
  };
  process.env.CODING_WORKSPACE = workspace;
  process.env.EVE_AGENT_HOME = path.join(root, "empty-home");
  process.env.EVE_AGENT_PLUGIN_PATHS = pluginRoot;
  resetPluginCacheForTests();
  try {
    const tools = await resolvePluginTools();
    assert.deepEqual(Object.keys(tools), ["hello__echo"]);
    assert.deepEqual(await tools.hello__echo.execute({ text: "hi" }, { session: { id: "s1" } } as never), {
      input: { text: "hi" }, session: "s1",
    });
    assert.match(await resolvePluginInstructions({}, {}), /# hello plugin[\s\S]*Always greet/);
    await dispatchPluginHooks({ type: "session.completed" }, { session: { id: "s1" } });
    assert.equal((globalThis as Record<string, unknown>).__eveAgentFixtureSession, "s1");
  } finally {
    if (previous.workspace === undefined) delete process.env.CODING_WORKSPACE; else process.env.CODING_WORKSPACE = previous.workspace;
    if (previous.home === undefined) delete process.env.EVE_AGENT_HOME; else process.env.EVE_AGENT_HOME = previous.home;
    if (previous.paths === undefined) delete process.env.EVE_AGENT_PLUGIN_PATHS; else process.env.EVE_AGENT_PLUGIN_PATHS = previous.paths;
    resetPluginCacheForTests();
    delete (globalThis as Record<string, unknown>).__eveAgentFixtureSession;
  }
});

test("the host package and lockfile contain no Prime Agent product dependency", async () => {
  const packageJson = await readFile(path.resolve("package.json"), "utf8");
  const lockfile = await readFile(path.resolve("package-lock.json"), "utf8");
  for (const contents of [packageJson, lockfile]) {
    assert.doesNotMatch(contents, /@earendil-works\/(?:pi-coding-agent|prime-agent-eve)/);
  }
});
