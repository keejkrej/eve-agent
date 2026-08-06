import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

test("Prime Eve plugin is installed through a managed namespaced mount", async () => {
  const root = process.cwd();
  const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  assert.equal(pkg.dependencies["@earendil-works/prime-agent-eve"], "file:../prime-agent/packages/eve-extension");
  const mount = await readFile(path.join(root, "agent", "extensions", "prime.ts"), "utf8");
  assert.match(mount, /@earendil-works\/prime-agent-eve/);
  const state = JSON.parse(await readFile(path.join(root, ".eve-agent", "plugins.json"), "utf8"));
  assert.deepEqual(state.plugins.map((plugin: { namespace: string }) => plugin.namespace), ["prime"]);
  const settings = await readFile(path.join(root, "agent", "lib", "plugin-settings.ts"), "utf8");
  assert.match(settings, /@earendil-works\/pi-coding-agent/);
  assert.match(settings, /zeromq/);
});
