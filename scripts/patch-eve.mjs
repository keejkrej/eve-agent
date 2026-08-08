import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
import { writeActiveSettingsFile } from "../bin/active-settings-file.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const handlerPath = path.join(root, "node_modules/eve/dist/src/cli/dev/tui/prompt-command-handler.js");
const statusPath = path.join(root, "node_modules/eve/dist/src/cli/dev/tui/status-line.js");
const runnerPath = path.join(root, "node_modules/eve/dist/src/cli/dev/tui/runner.js");
const headerPath = path.join(root, "node_modules/eve/dist/src/cli/dev/tui/agent-header.js");

async function patchHandler() {
  let source = await readFile(handlerPath, "utf8");
  if (source.includes("runEveAgentModelFlow")) {
    if (!source.includes("serverUrl:a.serverUrl")) {
      source = source.replace("argument:r.argument})", "argument:r.argument,serverUrl:a.serverUrl})");
      await writeFile(handlerPath, source);
    }
    return;
  }
  const firstImport = 'import{isPromptCommandAvailableFor}from"./prompt-commands.js";';
  if (!source.startsWith(firstImport)) throw new Error("Unsupported Eve prompt command handler; update scripts/patch-eve.mjs");
  source = `import{pathToFileURL}from"node:url";${source}`;
  const needle = ';if(r.name===`model`&&r.argument.length>0){';
  const custom = ';if(r.name===`model`){let e=i.renderer.setupFlow;if(e===void 0)return{message:`/model is not supported by this renderer.`};e.begin(`Configure the agent model`,`pulse`);try{let{createTuiPrompter:t}=await import(`./tui-prompter.js`),{runEveAgentModelFlow:o}=await import(pathToFileURL(`${a.workspaceRoot}/bin/tui-model-flow.mjs`).href);return{message:await o({appRoot:a.workspaceRoot,prompter:t(e),argument:r.argument,serverUrl:a.serverUrl}),effect:{kind:`model-access-changed`}}}catch(e){return{message:`Couldn\'t change the model: ${toErrorMessage(e)}`}}finally{e.end({preserveDiagnostics:!1})}}';
  if (!source.includes(needle)) throw new Error("Unsupported Eve /model handler; update scripts/patch-eve.mjs");
  source = source.replace(needle, `${custom}${needle}`);
  await writeFile(handlerPath, source);
}

async function patchStatusLine() {
  let source = await readFile(statusPath, "utf8");
  const original = 'const EXTERNAL_PROVIDER_DISPLAY_NAMES={codex:`chatgpt-sub`};';
  const patched = 'const EXTERNAL_PROVIDER_DISPLAY_NAMES={codex:`chatgpt-sub`,openai:`chatgpt-sub`,xai:`xai-sub`,"ollama-cloud":`ollama-cloud`};';
  if (source.includes(patched)) return;
  if (!source.includes(original)) throw new Error("Unsupported Eve status line; update scripts/patch-eve.mjs");
  await writeFile(statusPath, source.replace(original, patched));
}

async function patchRunner() {
  let source = await readFile(runnerPath, "utf8");
  const original = 'function authIssueForStatus(e){if(e===`logged-out`)return LOGIN_SETUP_ISSUE;if(e===`cli-missing`)return CLI_MISSING_SETUP_ISSUE}';
  const patched = 'function authIssueForStatus(e){return}';
  if (source.includes(patched)) return;
  if (!source.includes(original)) throw new Error("Unsupported Eve Vercel setup warning logic; update scripts/patch-eve.mjs");
  await writeFile(runnerPath, source.replace(original, patched));
}

async function patchHeaderTips() {
  let source = await readFile(headerPath, "utf8");
  const original = 'const AGENT_HEADER_TIPS=[`Use /add to install integrations from the registry.`,`Use /deploy to see your agent go live.`,`Type /help to see every command.`];';
  const patched = 'const AGENT_HEADER_TIPS=[`Use /model to switch model, thinking, and speed.`,`Use /traces to inspect a run.`,`Type /help to see every command.`];';
  if (source.includes(patched)) return;
  if (!source.includes(original)) throw new Error("Unsupported Eve header tips; update scripts/patch-eve.mjs");
  await writeFile(headerPath, source.replace(original, patched));
}

await patchHandler();
await patchStatusLine();
await patchRunner();
await patchHeaderTips();
const configFile = path.join(process.env.EVE_AGENT_HOME?.trim() || path.join(os.homedir(), ".config", "eve-agent"), "config.json");
let config = { version: 1 };
try { config = JSON.parse(await readFile(configFile, "utf8")); }
catch (error) { if (error?.code !== "ENOENT") throw error; }
await writeActiveSettingsFile(root, config);
console.log("Patched Eve TUI with eve-agent model controls.");
