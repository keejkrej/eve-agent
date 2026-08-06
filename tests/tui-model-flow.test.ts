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
  const requests: Array<Record<string, unknown>> = [];
  const prompter = { select: async (request: Record<string, unknown>) => { requests.push(request); return answers.shift(); } };
  const originalFetch = globalThis.fetch;
  let ready = false;
  setTimeout(() => { ready = true; }, 50);
  globalThis.fetch = async () => Response.json({
    agent: { model: ready ? { id: "openai/gpt-5.6-sol", reasoning: "xhigh" } : { id: "openai/old", reasoning: "low" } },
  });
  let message: string;
  try {
    message = await runEveAgentModelFlow({ appRoot, prompter, serverUrl: "http://127.0.0.1:2000" });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.match(message, /gpt-5\.6-sol@xhigh.*fast/);
  const modelRequest = requests.find((request) => request.message === "Choose a model");
  assert.equal(modelRequest?.search, true);
  assert.equal((modelRequest?.options as unknown[]).length >= 20, true);
  const config = JSON.parse(await readFile(path.join(home, "config.json"), "utf8"));
  assert.deepEqual(config, {
    version: 1,
    model: "chatgpt/gpt-5.6-sol",
    reasoning: "xhigh",
    priority: true,
  });
});
