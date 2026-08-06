#!/usr/bin/env node
import { constants } from "node:fs";
import { access, readFile, realpath, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { writeActiveSettingsFile } from "./active-settings-file.mjs";

const major = Number(process.versions.node.split(".")[0]);
if (major < 24) {
  console.error(`eve-agent requires Node.js 24 or newer (currently ${process.version}).`);
  process.exit(1);
}

const agentRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const commands = new Set(["login", "logout", "model", "models", "auth", "plugin", "help", "--help", "-h"]);
const inputArgs = process.argv.slice(2);

function runChild(command, args, options = {}) {
  const child = spawn(command, args, { cwd: agentRoot, env: process.env, stdio: "inherit", ...options });
  child.on("error", (error) => {
    console.error(`Failed to start ${path.basename(command)}: ${error.message}`);
    process.exit(1);
  });
  for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
  child.on("exit", (code) => process.exit(code ?? 1));
}

if (commands.has(inputArgs[0])) {
  const tsx = path.join(agentRoot, "node_modules", ".bin", "tsx");
  runChild(tsx, [path.join(agentRoot, "bin", "eve-agent-cli.ts"), ...inputArgs]);
} else {
  let modelOverride;
  const positional = [];
  for (let index = 0; index < inputArgs.length; index += 1) {
    if (inputArgs[index] === "--model") {
      modelOverride = inputArgs[index + 1];
      if (!modelOverride) { console.error("--model requires provider/model-id"); process.exit(1); }
      index += 1;
    } else positional.push(inputArgs[index]);
  }
  if (positional.length > 1) { console.error("Expected at most one workspace path"); process.exit(1); }

  const requested = positional[0] ?? process.env.INIT_CWD ?? process.cwd();
  const candidate = path.resolve(requested);
  let workspace;
  try {
    await access(candidate, constants.R_OK | constants.W_OK);
    if (!(await stat(candidate)).isDirectory()) throw new Error("not a directory");
    workspace = await realpath(candidate);
  } catch (error) {
    console.error(`Cannot use coding workspace ${candidate}: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }

  let modelConfig = { version: 1, model: undefined, reasoning: "high", priority: false };
  const home = process.env.EVE_AGENT_HOME?.trim() || path.join(os.homedir(), ".config", "eve-agent");
  try { modelConfig = { ...modelConfig, ...JSON.parse(await readFile(path.join(home, "config.json"), "utf8")) }; }
  catch (error) { if (error?.code !== "ENOENT") console.warn(`Ignoring unreadable model config: ${error.message}`); }
  await writeActiveSettingsFile(agentRoot, modelConfig);
  const selectedModel = modelOverride ?? modelConfig.model;
  console.log(`Eve Agent workspace: ${workspace}`);
  console.log(`Model: ${selectedModel ?? "Vercel AI Gateway fallback"}`);
  console.log("Warning: this agent's tools can edit files and execute commands here with your host permissions.\n");

  const eve = path.join(agentRoot, "node_modules", ".bin", "eve");
  runChild(eve, ["dev"], {
    env: {
      ...process.env,
      CODING_WORKSPACE: workspace,
      ...(modelOverride ? { EVE_AGENT_MODEL_OVERRIDE: modelOverride } : {}),
    },
  });
}
