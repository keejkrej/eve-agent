import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { runEveAgentModelFlow } from "../bin/tui-model-flow.mjs";

test("TUI model flow persists model, thinking, and fast tier", async () => {
  const home = await mkdtemp(path.join(os.tmpdir(), "eve-agent-tui-"));
  const appRoot = await mkdtemp(path.join(os.tmpdir(), "eve-agent-app-"));
  await mkdir(path.join(appRoot, "agent"));
  await writeFile(path.join(appRoot, "agent", "agent.ts"), "// watched\n");
  process.env.EVE_AGENT_HOME = home;
  const answers: unknown[] = [
    "model", "chatgpt/gpt-5.6-sol",
    "reasoning", "xhigh",
    "priority", "fast",
    "done",
  ];
  const prompter = { select: async () => answers.shift() };
  const message = await runEveAgentModelFlow({ appRoot, prompter });
  assert.match(message, /gpt-5\.6-sol@xhigh.*fast/);
  const config = JSON.parse(await readFile(path.join(home, "config.json"), "utf8"));
  assert.deepEqual(config, {
    version: 1,
    model: "chatgpt/gpt-5.6-sol",
    reasoning: "xhigh",
    priority: true,
  });
});
