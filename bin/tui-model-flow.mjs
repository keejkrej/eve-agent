import { chmod, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import os from "node:os";
import path from "node:path";
import { writeActiveSettingsFile } from "./active-settings-file.mjs";

const MODEL_OPTIONS = [
  { value: "chatgpt/gpt-5.6-sol", label: "chatgpt/gpt-5.6-sol", description: "ChatGPT subscription · balanced coding model" },
  { value: "chatgpt/gpt-5.6-luna", label: "chatgpt/gpt-5.6-luna", description: "ChatGPT subscription" },
  { value: "chatgpt/gpt-5.6-terra", label: "chatgpt/gpt-5.6-terra", description: "ChatGPT subscription" },
  { value: "chatgpt/gpt-5.5", label: "chatgpt/gpt-5.5", description: "ChatGPT subscription · compatibility fallback" },
  { value: "xai/grok-code-fast-1", label: "xai/grok-code-fast-1", description: "SuperGrok/X Premium OAuth" },
  { value: "xai/grok-4.20-0309-reasoning", label: "xai/grok-4.20-0309-reasoning", description: "SuperGrok/X Premium OAuth" },
  { value: "xai/grok-4.5", label: "xai/grok-4.5", description: "SuperGrok/X Premium OAuth" },
  { value: "ollama-cloud/deepseek-v4-flash", label: "ollama-cloud/deepseek-v4-flash", description: "Ollama Cloud" },
  { value: "ollama-cloud/deepseek-v4-flash:0731", label: "ollama-cloud/deepseek-v4-flash:0731", description: "Ollama Cloud" },
  { value: "ollama-cloud/deepseek-v4-pro", label: "ollama-cloud/deepseek-v4-pro", description: "Ollama Cloud" },
  { value: "ollama-cloud/gemma4:31b", label: "ollama-cloud/gemma4:31b", description: "Ollama Cloud" },
  { value: "ollama-cloud/glm-5.1", label: "ollama-cloud/glm-5.1", description: "Ollama Cloud" },
  { value: "ollama-cloud/glm-5.2", label: "ollama-cloud/glm-5.2", description: "Ollama Cloud" },
  { value: "ollama-cloud/gpt-oss:120b", label: "ollama-cloud/gpt-oss:120b", description: "Ollama Cloud" },
  { value: "ollama-cloud/gpt-oss:20b", label: "ollama-cloud/gpt-oss:20b", description: "Ollama Cloud" },
  { value: "ollama-cloud/kimi-k2.5", label: "ollama-cloud/kimi-k2.5", description: "Ollama Cloud" },
  { value: "ollama-cloud/kimi-k2.6", label: "ollama-cloud/kimi-k2.6", description: "Ollama Cloud" },
  { value: "ollama-cloud/kimi-k2.7-code", label: "ollama-cloud/kimi-k2.7-code", description: "Ollama Cloud" },
  { value: "ollama-cloud/kimi-k3", label: "ollama-cloud/kimi-k3", description: "Ollama Cloud" },
  { value: "ollama-cloud/minimax-m2.5", label: "ollama-cloud/minimax-m2.5", description: "Ollama Cloud" },
  { value: "ollama-cloud/minimax-m2.7", label: "ollama-cloud/minimax-m2.7", description: "Ollama Cloud" },
  { value: "ollama-cloud/minimax-m3", label: "ollama-cloud/minimax-m3", description: "Ollama Cloud" },
  { value: "ollama-cloud/mistral-large-3:675b", label: "ollama-cloud/mistral-large-3:675b", description: "Ollama Cloud" },
  { value: "ollama-cloud/nemotron-3-nano:30b", label: "ollama-cloud/nemotron-3-nano:30b", description: "Ollama Cloud" },
  { value: "ollama-cloud/nemotron-3-super", label: "ollama-cloud/nemotron-3-super", description: "Ollama Cloud" },
  { value: "ollama-cloud/nemotron-3-ultra", label: "ollama-cloud/nemotron-3-ultra", description: "Ollama Cloud" },
  { value: "ollama-cloud/qwen3.5:397b", label: "ollama-cloud/qwen3.5:397b", description: "Ollama Cloud" },
];
const REASONING_OPTIONS = ["provider-default", "none", "minimal", "low", "medium", "high", "xhigh"];

function configPath() {
  const home = process.env.EVE_AGENT_HOME?.trim() || path.join(os.homedir(), ".config", "eve-agent");
  return path.join(home, "config.json");
}
async function readConfig() {
  try { return JSON.parse(await readFile(configPath(), "utf8")); }
  catch (error) { if (error?.code === "ENOENT") return { version: 1 }; throw error; }
}
async function writeConfig(config) {
  const file = configPath();
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  await chmod(path.dirname(file), 0o700).catch(() => undefined);
  const temporary = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify({ ...config, version: 1 }, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, file);
  await chmod(file, 0o600).catch(() => undefined);
}
function summary(draft) {
  return `${draft.model ?? "gateway"}@${draft.reasoning ?? "high"}${draft.priority ? " ↯ fast" : " normal"}`;
}

async function readLiveAgent(serverUrl) {
  if (!serverUrl) return undefined;
  try {
    const response = await fetch(new URL("/eve/v1/info", serverUrl), { signal: AbortSignal.timeout(1_500) });
    if (response.ok) return (await response.json())?.agent;
  } catch {
    // The local server may be between generations.
  }
}

async function waitForRebuild(serverUrl, draft, previousAppRoot) {
  if (!serverUrl) return false;
  const [provider, ...modelParts] = draft.model.split("/");
  const expectedProvider = provider === "chatgpt" ? "openai" : provider;
  const expectedModel = `${expectedProvider}/${modelParts.join("/")}`;
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const agent = await readLiveAgent(serverUrl);
      const generationChanged = previousAppRoot === undefined || agent?.appRoot !== previousAppRoot;
      if (generationChanged && agent?.model?.id === expectedModel && agent?.model?.reasoning === draft.reasoning) {
        return true;
      }
    } catch {
      // Rebuilds briefly replace the local server generation; retry until ready.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return false;
}

export async function runEveAgentModelFlow({ appRoot, prompter, argument = "", serverUrl }) {
  const current = await readConfig();
  const draft = {
    model: current.model ?? "chatgpt/gpt-5.6-sol",
    reasoning: current.reasoning ?? "high",
    priority: current.priority === true,
  };
  const save = async () => {
    const previousAppRoot = (await readLiveAgent(serverUrl))?.appRoot;
    await writeConfig({ ...current, ...draft });
    await writeActiveSettingsFile(appRoot, draft);
    const rebuilt = await waitForRebuild(serverUrl, draft, previousAppRoot);
    return rebuilt
      ? `Selected ${summary(draft)}.`
      : `Selected ${summary(draft)}. Eve is still rebuilding; the footer will update shortly.`;
  };
  if (argument.trim()) {
    draft.model = argument.trim();
    if (!draft.model.startsWith("chatgpt/")) draft.priority = false;
    return save();
  }
  for (;;) {
    const row = await prompter.select({
      message: "",
      hint: summary(draft),
      options: [
        { value: "model", label: "Model", hint: draft.model },
        { value: "reasoning", label: "Thinking level", hint: draft.reasoning },
        {
          value: "priority",
          label: "Speed",
          hint: draft.priority ? "Fast (priority)" : "Normal",
          description: draft.model.startsWith("chatgpt/") ? "ChatGPT service tier" : "Fast tier currently applies to ChatGPT models",
        },
        { value: "done", label: "Done" },
      ],
      initialValue: "model",
    });
    if (row === "model") {
      draft.model = await prompter.select({
        message: "Choose a model",
        options: MODEL_OPTIONS,
        initialValue: draft.model,
        search: true,
        placeholder: "type a partial model name to filter",
      });
      if (!draft.model.startsWith("chatgpt/")) draft.priority = false;
    } else if (row === "reasoning") {
      draft.reasoning = await prompter.select({
        message: "Thinking level",
        options: REASONING_OPTIONS.map((value) => ({ value, label: value })),
        initialValue: draft.reasoning,
      });
    } else if (row === "priority") {
      if (draft.model.startsWith("chatgpt/")) {
        const speed = await prompter.select({
          message: "Request speed",
          options: [
            { value: "normal", label: "Normal", description: "Standard ChatGPT subscription service tier" },
            { value: "fast", label: "Fast", description: "Priority service tier when the account and model support it" },
          ],
          initialValue: draft.priority ? "fast" : "normal",
        });
        draft.priority = speed === "fast";
      }
    } else {
      return save();
    }
  }
}
