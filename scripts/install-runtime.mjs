import { access } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

try {
  await access(path.join(process.cwd(), ".git"));
  // npm prepares Git dependencies in a temporary clone before their dependency
  // tree is stable. The packed global installation runs postinstall again.
  console.log("Deferring Eve Agent runtime build to the installed package.");
  process.exit(0);
} catch {}

await import("./patch-eve.mjs");
await new Promise((resolve, reject) => {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = spawn(npm, ["run", "build"], { cwd: process.cwd(), env: process.env, stdio: "inherit" });
  child.once("error", reject);
  child.once("exit", (code) => code === 0
    ? resolve()
    : reject(new Error(`Eve Agent installation build exited with status ${code ?? "unknown"}`)));
});
