import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { defineTool } from "eve/tools";
import { z } from "zod";
import { truncateOutput, workspaceRoot } from "../lib/workspace.js";

const execFileAsync = promisify(execFile);

export default defineTool({
  description: "Search host workspace file contents with ripgrep and return file names, line numbers, and matching lines.",
  inputSchema: z.object({
    pattern: z.string().min(1).describe("Regular expression"),
    path: z.string().default("."),
    glob: z.string().optional(),
    ignoreCase: z.boolean().default(false),
  }),
  async execute({ pattern, path, glob, ignoreCase }) {
    const cwd = await workspaceRoot();
    const args = ["--line-number", "--no-heading", "--color", "never"];
    if (ignoreCase) args.push("--ignore-case");
    if (glob) args.push("-g", glob);
    args.push("--", pattern, path);
    try {
      const { stdout } = await execFileAsync("rg", args, { cwd, maxBuffer: 5_000_000 });
      return { matches: truncateOutput(stdout) };
    } catch (error: unknown) {
      const candidate = error as { code?: number; stdout?: string; message?: string };
      if (candidate.code === 1) return { matches: "" };
      throw new Error(candidate.message ?? String(error));
    }
  },
});
