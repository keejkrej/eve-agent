import { spawn } from "node:child_process";

if (process.env.npm_config_global !== "true") {
  // npm prepares Git dependencies with a non-global install before packing
  // them. The actual `vp i -g` installation runs this script again globally.
  console.log("Deferring Eve Agent runtime build to the global installation.");
  process.exit(0);
}

await import("./patch-eve.mjs");
await new Promise((resolve, reject) => {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = spawn(npm, ["run", "build"], { cwd: process.cwd(), env: process.env, stdio: "inherit" });
  child.once("error", reject);
  child.once("exit", (code) => code === 0
    ? resolve()
    : reject(new Error(`Eve Agent installation build exited with status ${code ?? "unknown"}`)));
});
