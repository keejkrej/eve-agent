import { constants } from "node:fs";
import { access, lstat, realpath } from "node:fs/promises";
import path from "node:path";

export const MAX_TOOL_OUTPUT = 60_000;

export async function workspaceRoot(): Promise<string> {
  const configured = process.env.CODING_WORKSPACE?.trim();
  const candidate = path.resolve(configured || process.cwd());
  await access(candidate, constants.R_OK | constants.W_OK);
  const stat = await lstat(candidate);
  if (!stat.isDirectory()) throw new Error(`CODING_WORKSPACE is not a directory: ${candidate}`);
  return realpath(candidate);
}

export async function resolveWorkspacePath(inputPath: string): Promise<string> {
  const root = await workspaceRoot();
  const lexical = path.resolve(root, inputPath || ".");
  const lexicalRelative = path.relative(root, lexical);
  if (lexicalRelative.startsWith("..") || path.isAbsolute(lexicalRelative)) {
    throw new Error(`Path escapes the coding workspace: ${inputPath}`);
  }

  // Resolve the nearest existing ancestor so a symlink cannot redirect a file
  // operation outside the selected workspace.
  let ancestor = lexical;
  const missing: string[] = [];
  while (true) {
    try {
      await lstat(ancestor);
      break;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== "ENOENT") throw error;
      const parent = path.dirname(ancestor);
      if (parent === ancestor) throw error;
      missing.unshift(path.basename(ancestor));
      ancestor = parent;
    }
  }
  const canonicalAncestor = await realpath(ancestor);
  const canonical = path.join(canonicalAncestor, ...missing);
  const canonicalRelative = path.relative(root, canonical);
  if (canonicalRelative.startsWith("..") || path.isAbsolute(canonicalRelative)) {
    throw new Error(`Path resolves through a symlink outside the coding workspace: ${inputPath}`);
  }
  return canonical;
}

export function relativeToWorkspace(root: string, filePath: string): string {
  const relative = path.relative(root, filePath);
  return relative.length === 0 ? "." : relative;
}

export function truncateOutput(value: string, limit = MAX_TOOL_OUTPUT): string {
  if (value.length <= limit) return value;
  const headSize = Math.floor(limit * 0.35);
  const tailSize = limit - headSize;
  const omitted = value.length - headSize - tailSize;
  return `${value.slice(0, headSize)}\n\n… ${omitted} characters omitted …\n\n${value.slice(-tailSize)}`;
}
