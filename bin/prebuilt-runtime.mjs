import { spawn } from "node:child_process";
import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SETTINGS_CHANGED = Symbol.for("eve-agent/settings-changed");

export function settingsEnvironment(settings = {}) {
  return {
    ...(settings.model ? { EVE_AGENT_MODEL_OVERRIDE: settings.model } : {}),
    ...(settings.reasoning ? { EVE_AGENT_REASONING_OVERRIDE: settings.reasoning } : {}),
    ...(typeof settings.priority === "boolean" ? { EVE_AGENT_PRIORITY_OVERRIDE: String(settings.priority) } : {}),
  };
}

function availablePort() {
  return new Promise((resolve, reject) => {
    const socket = net.createServer();
    socket.once("error", reject);
    socket.listen(0, "127.0.0.1", () => {
      const address = socket.address();
      const port = typeof address === "object" && address ? address.port : undefined;
      socket.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

function waitForExit(child) {
  if (child.exitCode !== null) return Promise.resolve();
  return new Promise((resolve) => child.once("exit", resolve));
}

async function stopChild(child) {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  const timeout = setTimeout(() => child.kill("SIGKILL"), 2_000);
  await waitForExit(child);
  clearTimeout(timeout);
}

async function waitUntilReady(url, child, stderr) {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Eve server exited during startup.
${stderr.value}`.trim());
    try {
      const response = await fetch(new URL("/eve/v1/info", url), { signal: AbortSignal.timeout(500) });
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out starting the prebuilt Eve server.
${stderr.value}`.trim());
}

export async function buildAgent(agentRoot, { quiet = false } = {}) {
  await new Promise((resolve, reject) => {
    const npm = process.env.npm_execpath && process.env.npm_execpath.endsWith(".js")
      ? process.execPath
      : process.platform === "win32" ? "npm.cmd" : "npm";
    const args = npm === process.execPath ? [process.env.npm_execpath, "run", "build"] : ["run", "build"];
    const child = spawn(npm, args, {
      cwd: agentRoot,
      env: process.env,
      stdio: quiet ? ["ignore", "pipe", "pipe"] : "inherit",
    });
    let output = "";
    if (quiet) {
      child.stdout?.on("data", (chunk) => { output = `${output}${chunk}`.slice(-20_000); });
      child.stderr?.on("data", (chunk) => { output = `${output}${chunk}`.slice(-20_000); });
    }
    child.once("error", reject);
    child.once("exit", (code) => code === 0
      ? resolve()
      : reject(new Error(`Eve Agent build exited with status ${code ?? "unknown"}.\n${output}`.trim())));
  });
}

const RELOCATABLE_RUNTIME_FILES = [
  ["server", "index.mjs"],
  [".eve", "discovery", "agent-discovery-manifest.json"],
  [".eve", "compile", "compiled-agent-manifest.json"],
];

export async function relocatePrebuiltRuntime(outputRoot, agentRoot) {
  const manifestPath = path.join(outputRoot, ".eve", "compile", "compiled-agent-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const authoredRoot = typeof manifest.appRoot === "string" ? manifest.appRoot : undefined;
  if (!authoredRoot || path.resolve(authoredRoot) === path.resolve(agentRoot)) return;

  const escapedAuthoredRoot = JSON.stringify(authoredRoot).slice(1, -1);
  const escapedAgentRoot = JSON.stringify(agentRoot).slice(1, -1);
  for (const segments of RELOCATABLE_RUNTIME_FILES) {
    const file = path.join(outputRoot, ...segments);
    const source = await readFile(file, "utf8");
    const relocated = source
      .replaceAll(escapedAuthoredRoot, escapedAgentRoot)
      .replaceAll(authoredRoot, agentRoot);
    if (relocated !== source) await writeFile(file, relocated);
  }
}

export async function runPrebuiltAgent({ agentRoot, workspace, settings = {} }) {
  const outputRoot = path.join(agentRoot, ".output");
  const output = path.join(outputRoot, "server", "index.mjs");
  try { await access(output); }
  catch {
    const prebuilt = path.join(agentRoot, "dist", "runtime");
    try {
      await mkdir(outputRoot, { recursive: true });
      await cp(prebuilt, outputRoot, { recursive: true });
      await access(output);
    } catch {
      throw new Error("Installed Eve Agent has no prebuilt runtime. Reinstall it; repository development should use `npm run dev`.");
    }
  }

  await relocatePrebuiltRuntime(outputRoot, agentRoot);

  const eve = path.join(agentRoot, "node_modules", ".bin", "eve");
  const port = await availablePort();
  const serverUrl = `http://127.0.0.1:${port}`;
  let server;
  let runtimeSettings = settings;
  let transition = Promise.resolve();

  const startServer = async () => {
    const stderr = { value: "" };
    const child = spawn(eve, ["start", "--host", "127.0.0.1", "--port", String(port)], {
      cwd: agentRoot,
      env: { ...process.env, ...settingsEnvironment(runtimeSettings), CODING_WORKSPACE: workspace, EVE_DEV: "1" },
      stdio: ["ignore", "ignore", "pipe"],
    });
    child.stderr?.on("data", (chunk) => { stderr.value = `${stderr.value}${chunk}`.slice(-20_000); });
    await waitUntilReady(serverUrl, child, stderr);
    server = child;
  };

  await startServer();
  globalThis[SETTINGS_CHANGED] = (nextSettings) => {
    transition = transition.then(async () => {
      runtimeSettings = nextSettings;
      await stopChild(server);
      await startServer();
    });
    return transition;
  };

  const stop = async () => {
    delete globalThis[SETTINGS_CHANGED];
    await stopChild(server);
  };
  const onSignal = () => { void stop().finally(() => process.exit(130)); };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);
  try {
    const tuiPath = path.join(agentRoot, "node_modules", "eve", "dist", "src", "cli", "dev", "tui", "tui.js");
    const { runDevelopmentTui } = await import(pathToFileURL(tuiPath).href);
    await runDevelopmentTui({
      name: "Eve Agent",
      target: { kind: "local", serverUrl, workspaceRoot: agentRoot },
    });
  } finally {
    process.removeListener("SIGINT", onSignal);
    process.removeListener("SIGTERM", onSignal);
    await stop();
  }
}
