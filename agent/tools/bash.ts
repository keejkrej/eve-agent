import { spawn } from "node:child_process";
import { defineTool } from "eve/tools";
import { z } from "zod";
import { truncateOutput, workspaceRoot } from "../lib/workspace.js";

export default defineTool({
  description: "Run a shell command directly in the active host coding workspace. Use for Git, tests, builds, package managers, and repository inspection. Commands have the user's host permissions.",
  approval: ({ toolInput }) => {
    const command = typeof toolInput?.command === "string" ? toolInput.command : "";
    const dangerous = /(?:^|[;&|]\s*)(?:sudo\b|rm\s+-[^\n]*r[^\n]*f|git\s+(?:push\b|clean\b|reset\s+--hard\b)|npm\s+publish\b|pnpm\s+publish\b|yarn\s+npm\s+publish\b|vercel\s+(?:deploy|--prod)\b|(?:curl|wget)[^\n|]*\|\s*(?:sh|bash|zsh)\b)/i;
    return dangerous.test(command) ? "user-approval" : "not-applicable";
  },
  inputSchema: z.object({
    command: z.string().min(1).describe("Shell command to execute with zsh -lc"),
    timeoutSeconds: z.number().int().min(1).max(3600).default(120),
  }),
  async execute({ command, timeoutSeconds }, ctx) {
    const cwd = await workspaceRoot();
    return await new Promise<Record<string, unknown>>((resolve) => {
      const child = spawn("/bin/zsh", ["-lc", command], {
        cwd,
        env: process.env,
        detached: process.platform !== "win32",
        stdio: ["ignore", "pipe", "pipe"],
      });
      let stdout = "";
      let stderr = "";
      let timedOut = false;
      const append = (current: string, chunk: Buffer) => truncateOutput(current + chunk.toString(), 2_000_000);
      child.stdout.on("data", (chunk: Buffer) => { stdout = append(stdout, chunk); });
      child.stderr.on("data", (chunk: Buffer) => { stderr = append(stderr, chunk); });
      const stop = () => {
        if (child.pid === undefined) return;
        try {
          if (process.platform === "win32") child.kill("SIGTERM");
          else process.kill(-child.pid, "SIGTERM");
        } catch { child.kill("SIGTERM"); }
      };
      const timer = setTimeout(() => { timedOut = true; stop(); }, timeoutSeconds * 1000);
      ctx.abortSignal.addEventListener("abort", stop, { once: true });
      child.on("error", (error) => {
        clearTimeout(timer);
        resolve({ ok: false, exitCode: null, error: error.message, stdout: truncateOutput(stdout), stderr: truncateOutput(stderr) });
      });
      child.on("close", (code, signal) => {
        clearTimeout(timer);
        resolve({
          ok: code === 0 && !timedOut,
          exitCode: code,
          signal,
          timedOut,
          cwd,
          stdout: truncateOutput(stdout),
          stderr: truncateOutput(stderr),
        });
      });
    });
  },
});
