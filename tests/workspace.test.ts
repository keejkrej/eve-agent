import assert from "node:assert/strict";
import { mkdtemp, mkdir, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { resolveWorkspacePath, truncateOutput, workspaceRoot } from "../agent/lib/workspace.ts";

test("workspace paths stay inside the selected root", async () => {
  const base = await mkdtemp(path.join(os.tmpdir(), "eve-agent-path-"));
  const root = path.join(base, "repo");
  const outside = path.join(base, "outside");
  await mkdir(root);
  await mkdir(outside);
  await symlink(outside, path.join(root, "escape"));
  process.env.CODING_WORKSPACE = root;

  const canonicalRoot = await workspaceRoot();
  assert.equal(canonicalRoot, await import("node:fs/promises").then(({ realpath }) => realpath(root)));
  await assert.rejects(resolveWorkspacePath("../outside/file.txt"), /escapes the coding workspace/);
  await assert.rejects(resolveWorkspacePath("escape/file.txt"), /symlink outside/);
  assert.equal(await resolveWorkspacePath("src/new.ts"), path.join(canonicalRoot, "src/new.ts"));
});

test("long output keeps useful context from both ends", () => {
  const output = truncateOutput(`HEAD${"x".repeat(1_000)}TAIL`, 100);
  assert.match(output, /^HEAD/);
  assert.match(output, /characters omitted/);
  assert.match(output, /TAIL$/);
});
