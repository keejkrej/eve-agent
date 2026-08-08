import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, ".output");
const destination = path.join(root, "dist", "runtime");
await rm(destination, { recursive: true, force: true });
await mkdir(path.dirname(destination), { recursive: true });
await cp(source, destination, { recursive: true });
console.log(`Copied prebuilt runtime to ${destination}`);
