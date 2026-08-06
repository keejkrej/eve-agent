import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const handlerPath = path.join(root, "node_modules/eve/dist/src/cli/dev/tui/prompt-command-handler.js");
const statusPath = path.join(root, "node_modules/eve/dist/src/cli/dev/tui/status-line.js");

async function patchHandler() {
  let source = await readFile(handlerPath, "utf8");
  if (source.includes("runEveAgentModelFlow")) return;
  const firstImport = 'import{isPromptCommandAvailableFor}from"./prompt-commands.js";';
  if (!source.startsWith(firstImport)) throw new Error("Unsupported Eve prompt command handler; update scripts/patch-eve.mjs");
  source = `import{pathToFileURL}from"node:url";${source}`;
  const needle = ';if(r.name===`model`&&r.argument.length>0){';
  const custom = ';if(r.name===`model`){let e=i.renderer.setupFlow;if(e===void 0)return{message:`/model is not supported by this renderer.`};e.begin(`Configure the agent model`,`pulse`);try{let{createTuiPrompter:t}=await import(`./tui-prompter.js`),{runEveAgentModelFlow:o}=await import(pathToFileURL(`${a.workspaceRoot}/bin/tui-model-flow.mjs`).href);return{message:await o({appRoot:a.workspaceRoot,prompter:t(e),argument:r.argument}),effect:{kind:`model-access-changed`}}}catch(e){return{message:`Couldn\'t change the model: ${toErrorMessage(e)}`}}finally{e.end({preserveDiagnostics:!1})}}';
  if (!source.includes(needle)) throw new Error("Unsupported Eve /model handler; update scripts/patch-eve.mjs");
  source = source.replace(needle, `${custom}${needle}`);
  await writeFile(handlerPath, source);
}

async function patchStatusLine() {
  let source = await readFile(statusPath, "utf8");
  const original = 'const EXTERNAL_PROVIDER_DISPLAY_NAMES={codex:`chatgpt-sub`};';
  const patched = 'const EXTERNAL_PROVIDER_DISPLAY_NAMES={codex:`chatgpt-sub`,openai:`chatgpt-sub`,xai:`xai-sub`,`ollama-cloud`:`ollama-cloud`};';
  if (source.includes(patched)) return;
  if (!source.includes(original)) throw new Error("Unsupported Eve status line; update scripts/patch-eve.mjs");
  await writeFile(statusPath, source.replace(original, patched));
}

await patchHandler();
await patchStatusLine();
console.log("Patched Eve TUI with eve-agent model controls.");
