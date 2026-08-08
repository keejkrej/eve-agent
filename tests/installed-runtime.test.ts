import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { writeActiveSettingsFile } from "../bin/active-settings-file.mjs";
import { runPrebuiltAgent, settingsEnvironment } from "../bin/prebuilt-runtime.mjs";

test("installed launcher serves prebuilt output instead of invoking Eve dev", async () => {
  const [launcher, runtime, manifest] = await Promise.all([
    readFile("bin/eve-agent.mjs", "utf8"),
    readFile("bin/prebuilt-runtime.mjs", "utf8"),
    readFile("package.json", "utf8").then(JSON.parse),
  ]);
  assert.doesNotMatch(launcher, /runChild\(eve, \["dev"\]/);
  assert.match(launcher, /runPrebuiltAgent/);
  assert.match(runtime, /\["start", "--host"/);
  assert.match(runtime, /\.output/);
  assert.equal(manifest.scripts.postinstall, undefined);
  assert.equal(manifest.scripts.prepare, undefined);
  assert.ok(manifest.files.includes("dist"));
});

test("installed runtime fails clearly when installation produced no build", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "eve-agent-unbuilt-"));
  await assert.rejects(
    runPrebuiltAgent({ agentRoot: root, workspace: root }),
    /Installed Eve Agent has no prebuilt runtime/,
  );
});

test("saving model settings can request a supervised runtime reload", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "eve-agent-settings-"));
  const symbol = Symbol.for("eve-agent/settings-changed");
  let received;
  globalThis[symbol] = async (settings) => { received = settings; };
  try {
    await writeActiveSettingsFile(root, { model: "xai/test", reasoning: "medium", priority: false });
    assert.deepEqual(received, { model: "xai/test", reasoning: "medium", priority: false });
  } finally {
    delete globalThis[symbol];
  }
});


test("configured model settings override a stale prebuilt runtime", () => {
  assert.deepEqual(settingsEnvironment({
    model: "ollama-cloud/deepseek-v4-flash:0731",
    reasoning: "high",
    priority: false,
  }), {
    EVE_AGENT_MODEL_OVERRIDE: "ollama-cloud/deepseek-v4-flash:0731",
    EVE_AGENT_REASONING_OVERRIDE: "high",
    EVE_AGENT_PRIORITY_OVERRIDE: "false",
  });
});
