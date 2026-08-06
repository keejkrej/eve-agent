import { spawn } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { getCredential, readConfig, setCredential, setSelectedModel, type AuthProvider } from "../src/models/auth-store.js";
import { loginOpenAICodex } from "../src/models/oauth/openai-codex.js";
import { loginXai } from "../src/models/oauth/xai.js";
import { DEFAULT_MODELS } from "../src/models/providers.js";

function usage(): never {
  console.log(`Usage:
  eve-agent [--model provider/model] [workspace]
  eve-agent login <chatgpt|xai|ollama-cloud>
  eve-agent logout <chatgpt|xai|ollama-cloud>
  eve-agent model [provider/model|gateway]
  eve-agent models
  eve-agent auth status

Examples:
  eve-agent login chatgpt
  eve-agent model chatgpt/gpt-5.6-sol
  eve-agent --model xai/grok-code-fast-1 .
  eve-agent login ollama-cloud
  eve-agent model ollama-cloud/gpt-oss:120b`);
  process.exit(0);
}

async function prompt(message: string): Promise<string> {
  const rl = createInterface({ input: stdin, output: stdout });
  try { return (await rl.question(`${message} `)).trim(); }
  finally { rl.close(); }
}

async function secretPrompt(message: string): Promise<string> {
  if (!stdin.isTTY || !stdout.isTTY || typeof stdin.setRawMode !== "function") return prompt(message);
  stdout.write(`${message} `);
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  return new Promise((resolve, reject) => {
    let value = "";
    const finish = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
      stdout.write("\n");
    };
    const onData = (chunk: string) => {
      for (const character of chunk) {
        if (character === "\u0003") { finish(); reject(new Error("Cancelled")); return; }
        if (character === "\r" || character === "\n") { finish(); resolve(value.trim()); return; }
        if (character === "\u007f") { value = value.slice(0, -1); continue; }
        value += character;
      }
    };
    stdin.on("data", onData);
  });
}

function openBrowser(url: string): void {
  const command = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(command, args, { detached: true, stdio: "ignore" });
  child.on("error", () => undefined);
  child.unref();
}

function normalizeProvider(value: string | undefined): AuthProvider {
  if (value === "openai" || value === "openai-codex") return "chatgpt";
  if (value === "ollama") return "ollama-cloud";
  if (value === "chatgpt" || value === "xai" || value === "ollama-cloud") return value;
  throw new Error(`Unknown provider: ${value ?? "(missing)"}`);
}

async function login(provider: AuthProvider): Promise<void> {
  if (provider === "chatgpt") {
    console.log("Starting ChatGPT Plus/Pro OAuth login…");
    const credentials = await loginOpenAICodex({
      onAuth: ({ url, instructions }) => {
        console.log(`\n${instructions ?? "Complete authentication in your browser."}\n${url}\n`);
        openBrowser(url);
      },
      onPrompt: ({ message }) => prompt(message),
      onProgress: (message) => console.log(message),
      originator: "pi",
    });
    await setCredential("chatgpt", { type: "oauth", ...credentials });
  } else if (provider === "xai") {
    console.log("Starting xAI SuperGrok/X Premium device login…");
    const credentials = await loginXai({
      onAuth: ({ url, instructions }) => {
        console.log(`\n${instructions ?? "Complete authentication in your browser."}\n${url}\n`);
        openBrowser(url);
      },
      onPrompt: ({ message }) => prompt(message),
      onProgress: (message) => console.log(message),
    });
    await setCredential("xai", { type: "oauth", ...credentials });
  } else {
    const key = process.env.OLLAMA_API_KEY?.trim() || await secretPrompt("Ollama Cloud API key:");
    if (!key) throw new Error("No API key provided");
    await setCredential("ollama-cloud", { type: "api_key", key });
  }
  console.log(`Saved ${provider} credentials securely (0600).`);
  const current = await readConfig();
  if (!current.model) {
    const model = `${provider}/${DEFAULT_MODELS[provider]}`;
    await setSelectedModel(model);
    console.log(`Selected default model: ${model}`);
  }
}

async function status(): Promise<void> {
  const config = await readConfig();
  console.log(`Selected model: ${config.model ?? "gateway (agent.ts fallback)"}`);
  for (const provider of ["chatgpt", "xai", "ollama-cloud"] as const) {
    const credential = await getCredential(provider);
    const state = !credential ? "not configured" : credential.type === "api_key" ? "API key configured" : credential.expires > Date.now() ? "OAuth connected" : "OAuth connected (refresh required)";
    console.log(`${provider.padEnd(13)} ${state}`);
  }
}

async function main(): Promise<void> {
  const [command, argument] = process.argv.slice(2);
  if (!command || command === "help" || command === "--help" || command === "-h") usage();
  if (command === "login") { await login(normalizeProvider(argument)); return; }
  if (command === "logout") { const provider = normalizeProvider(argument); await setCredential(provider, undefined); console.log(`Removed ${provider} credentials.`); return; }
  if (command === "model") {
    if (!argument) { console.log((await readConfig()).model ?? "gateway"); return; }
    await setSelectedModel(argument === "gateway" ? undefined : argument);
    console.log(`Selected model: ${argument}`);
    return;
  }
  if (command === "models") {
    console.log(`Recommended models:
  chatgpt/${DEFAULT_MODELS.chatgpt}        ChatGPT Plus/Pro OAuth
  xai/${DEFAULT_MODELS.xai}     SuperGrok/X Premium OAuth
  ollama-cloud/${DEFAULT_MODELS["ollama-cloud"]} Ollama Cloud API key

You may replace the model-id portion with another model supported by that provider.`);
    return;
  }
  if (command === "auth" && argument === "status") { await status(); return; }
  usage();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
