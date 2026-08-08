import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("installed Eve TUI uses subscription controls without mandatory Vercel warnings", async () => {
  const eveTui = path.join(process.cwd(), "node_modules", "eve", "dist", "src", "cli", "dev", "tui");
  const handler = await readFile(path.join(eveTui, "prompt-command-handler.js"), "utf8");
  const runner = await readFile(path.join(eveTui, "runner.js"), "utf8");
  const status = await readFile(path.join(eveTui, "status-line.js"), "utf8");
  const header = await readFile(path.join(eveTui, "agent-header.js"), "utf8");
  const applicationNitro = await readFile(path.join(process.cwd(), "node_modules", "eve", "dist", "src", "internal", "nitro", "host", "create-application-nitro.js"), "utf8");
  assert.match(handler, /runEveAgentModelFlow/);
  assert.match(handler, /serverUrl:a\.serverUrl/);
  assert.match(runner, /function authIssueForStatus\(e\)\{return\}/);
  assert.match(status, /openai:`chatgpt-sub`/);
  assert.doesNotMatch(header, /Use \/deploy/);
  assert.match(header, /Use \/model/);
  assert.match(applicationNitro, /isAbsolute\(t\)\?normalizePath\(stripFileSystemPrefix\(t\)\)/);
  for (const file of ["prompt-command-handler.js", "runner.js", "status-line.js", "agent-header.js"]) {
    const result = spawnSync(process.execPath, ["--check", path.join(eveTui, file)], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
  }
});

test("packaged Eve patch targets a #UUID installation when launched from another workspace", async () => {
  const packageRoot = await mkdtemp(path.join(os.tmpdir(), "eve-agent#fixture-"));
  const workspace = await mkdtemp(path.join(os.tmpdir(), "eve-agent-workspace-"));
  const eveDist = path.join(packageRoot, "node_modules", "eve", "dist", "src");
  const tui = path.join(eveDist, "cli", "dev", "tui");
  await mkdir(path.join(packageRoot, "scripts"), { recursive: true });
  await mkdir(path.join(packageRoot, "bin"), { recursive: true });
  await mkdir(tui, { recursive: true });
  await cp("scripts/patch-eve.mjs", path.join(packageRoot, "scripts", "patch-eve.mjs"));
  await cp("bin/active-settings-file.mjs", path.join(packageRoot, "bin", "active-settings-file.mjs"));
  await writeFile(path.join(tui, "prompt-command-handler.js"),
    'import{isPromptCommandAvailableFor}from"./prompt-commands.js";;if(r.name===`model`&&r.argument.length>0){');
  await writeFile(path.join(tui, "status-line.js"),
    'const EXTERNAL_PROVIDER_DISPLAY_NAMES={codex:`chatgpt-sub`};');
  await writeFile(path.join(tui, "runner.js"),
    'function authIssueForStatus(e){if(e===`logged-out`)return LOGIN_SETUP_ISSUE;if(e===`cli-missing`)return CLI_MISSING_SETUP_ISSUE}');
  await writeFile(path.join(tui, "agent-header.js"),
    'const AGENT_HEADER_TIPS=[`Use /add to install integrations from the registry.`,`Use /deploy to see your agent go live.`,`Type /help to see every command.`];');
  await mkdir(path.join(eveDist, "internal"), { recursive: true });
  await writeFile(path.join(eveDist, "internal", "authored-module-loader.js"),
    "import{createHash}from\"node:crypto\";function createFileImportSpecifier(e){let t=e.replaceAll(`\\\\`,`/`);return/^[A-Za-z]:\\//.test(t)?`file:///${encodeURI(t)}`:t.startsWith(`/`)?`file://${encodeURI(t)}`:t}");
  const nitroHost = path.join(eveDist, "internal", "nitro", "host");
  await mkdir(nitroHost, { recursive: true });
  await writeFile(path.join(nitroHost, "create-application-nitro.js"),
    "function resolveNitroModuleComparisonPath(e,t){return t.startsWith(`file://`)?normalizePath(stripFileSystemPrefix(stripPathQueryAndHash(fileURLToPath(t)))):isAbsolute(t)?normalizePath(stripFileSystemPrefix(stripPathQueryAndHash(t))):normalizePath(stripFileSystemPrefix(stripPathQueryAndHash(resolve(e,t))))}");

  const result = spawnSync(process.execPath, [path.join(packageRoot, "scripts", "patch-eve.mjs")], {
    cwd: workspace,
    env: { ...process.env, EVE_AGENT_HOME: path.join(packageRoot, "config") },
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(await readFile(path.join(tui, "prompt-command-handler.js"), "utf8"), /runEveAgentModelFlow/);
  assert.match(await readFile(path.join(tui, "runner.js"), "utf8"), /function authIssueForStatus\(e\)\{return\}/);
  const loader = await readFile(path.join(eveDist, "internal", "authored-module-loader.js"), "utf8");
  assert.match(loader, /pathToFileURL/);
  assert.doesNotMatch(loader, /encodeURI/);
  const applicationNitro = await readFile(path.join(nitroHost, "create-application-nitro.js"), "utf8");
  assert.match(applicationNitro, /isAbsolute\(t\)\?normalizePath\(stripFileSystemPrefix\(t\)\)/);
  assert.match(await readFile(path.join(packageRoot, "agent", "lib", "active-settings.generated.ts"), "utf8"), /"model": "gateway"/);
});
