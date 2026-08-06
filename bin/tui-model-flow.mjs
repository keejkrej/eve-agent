import { chmod, mkdir, readFile, rename, utimes, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import os from "node:os";
import path from "node:path";

const MODEL_OPTIONS = [
  { value: "chatgpt/gpt-5.6-sol", label: "chatgpt/gpt-5.6-sol", description: "ChatGPT subscription · balanced coding model" },
  { value: "chatgpt/gpt-5.6-luna", label: "chatgpt/gpt-5.6-luna", description: "ChatGPT subscription" },
  { value: "chatgpt/gpt-5.6-terra", label: "chatgpt/gpt-5.6-terra", description: "ChatGPT subscription" },
  { value: "chatgpt/gpt-5.5", label: "chatgpt/gpt-5.5", description: "ChatGPT subscription · compatibility fallback" },
  { value: "xai/grok-code-fast-1", label: "xai/grok-code-fast-1", description: "SuperGrok/X Premium OAuth" },
  { value: "xai/grok-4.20-0309-reasoning", label: "xai/grok-4.20-0309-reasoning", description: "SuperGrok/X Premium OAuth" },
  { value: "xai/grok-4.5", label: "xai/grok-4.5", description: "SuperGrok/X Premium OAuth" },
  { value: "ollama-cloud/gpt-oss:120b", label: "ollama-cloud/gpt-oss:120b", description: "Ollama Cloud" },
  { value: "ollama-cloud/devstral-2:123b", label: "ollama-cloud/devstral-2:123b", description: "Ollama Cloud" },
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

export async function runEveAgentModelFlow({ appRoot, prompter, argument = "" }) {
  const current = await readConfig();
  const draft = {
    model: current.model ?? "chatgpt/gpt-5.6-sol",
    reasoning: current.reasoning ?? "high",
    priority: current.priority === true,
  };
  const save = async () => {
    await writeConfig({ ...current, ...draft });
    const agentSource = path.join(appRoot, "agent", "agent.ts");
    const now = new Date();
    await utimes(agentSource, now, now);
    return `Selected ${summary(draft)}. Live on your next prompt.`;
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
