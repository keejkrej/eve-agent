import { access } from "node:fs/promises";
import path from "node:path";

const output = path.join(process.cwd(), ".output", "server", "index.mjs");
try {
  await access(output);
} catch {
  // A Git dependency runs postinstall before prepare. Prepare will patch Eve,
  // build the runtime, and include that output in the packed Git dependency.
  console.log("Eve Agent runtime will be prepared after dependency installation.");
  process.exit(0);
}

await import("./patch-eve.mjs");
