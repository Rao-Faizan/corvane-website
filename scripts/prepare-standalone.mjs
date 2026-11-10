// Copies static assets into the standalone output so `.next/standalone` is a
// complete, self-contained deployment folder (Next.js does not copy them itself).
import { cpSync, existsSync } from "node:fs";

const target = ".next/standalone";
if (!existsSync(target)) {
  console.error("No standalone output found. Run `next build` first.");
  process.exit(1);
}
cpSync(".next/static", `${target}/.next/static`, { recursive: true });
if (existsSync("public")) cpSync("public", `${target}/public`, { recursive: true });
console.log("Standalone output prepared:", target);
