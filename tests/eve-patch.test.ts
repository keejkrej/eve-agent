import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

test("installed Eve TUI uses subscription controls without mandatory Vercel warnings", async () => {
  const eveTui = path.join(process.cwd(), "node_modules", "eve", "dist", "src", "cli", "dev", "tui");
  const handler = await readFile(path.join(eveTui, "prompt-command-handler.js"), "utf8");
  const runner = await readFile(path.join(eveTui, "runner.js"), "utf8");
  const status = await readFile(path.join(eveTui, "status-line.js"), "utf8");
  assert.match(handler, /runEveAgentModelFlow/);
  assert.match(runner, /function authIssueForStatus\(e\)\{return\}/);
  assert.match(status, /openai:`chatgpt-sub`/);
});
