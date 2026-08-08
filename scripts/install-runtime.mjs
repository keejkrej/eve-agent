import { spawn } from "node:child_process";

const preparingGitDependency = /[\\/]_cacache[\\/]tmp[\\/]git-clone[^\\/]*$/.test(process.cwd());
if (preparingGitDependency) {
  // npm prepares Git dependencies in a cache clone before packing them. The
  // actual `vp i -g` installation runs this script again from its final path.
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
