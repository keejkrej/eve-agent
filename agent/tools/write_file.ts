import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { defineTool } from "eve/tools";
import { z } from "zod";
import { relativeToWorkspace, resolveWorkspacePath, workspaceRoot } from "../lib/workspace.js";

export default defineTool({
  description: "Atomically create or replace a UTF-8 file in the active host coding workspace. Read existing files first and preserve unrelated content.",
  inputSchema: z.object({ path: z.string().min(1), content: z.string() }),
  async execute({ path: inputPath, content }) {
    const root = await workspaceRoot();
    const absolute = await resolveWorkspacePath(inputPath);
    await mkdir(path.dirname(absolute), { recursive: true });
    const temporary = `${absolute}.eve-${randomUUID()}.tmp`;
    await writeFile(temporary, content, "utf8");
    await rename(temporary, absolute);
    return { ok: true, path: relativeToWorkspace(root, absolute), bytes: Buffer.byteLength(content) };
  },
});
