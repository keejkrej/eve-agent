import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("installed Eve TUI uses subscription controls without mandatory Vercel warnings", async () => {
  const eveTui = path.join(process.cwd(), "node_modules", "eve", "dist", "src", "cli", "dev", "tui");
  const handler = await readFile(path.join(eveTui, "prompt-command-handler.js"), "utf8");
  const runner = await readFile(path.join(eveTui, "runner.js"), "utf8");
  const status = await readFile(path.join(eveTui, "status-line.js"), "utf8");
  const header = await readFile(path.join(eveTui, "agent-header.js"), "utf8");
  assert.match(handler, /runEveAgentModelFlow/);
  assert.match(runner, /function authIssueForStatus\(e\)\{return\}/);
  assert.match(status, /openai:`chatgpt-sub`/);
  assert.doesNotMatch(header, /Use \/deploy/);
  assert.match(header, /Use \/model/);
  for (const file of ["prompt-command-handler.js", "runner.js", "status-line.js", "agent-header.js"]) {
    const result = spawnSync(process.execPath, ["--check", path.join(eveTui, file)], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
  }
});
