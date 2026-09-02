import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

async function main() {
  const outDir = path.resolve(process.cwd(), "src", "data");
  const jsonPath = path.join(outDir, "git-commits.json");
  const counts = {};

  try {
    const raw = await fs.readFile(jsonPath, "utf-8");
    const prev = JSON.parse(raw);
    for (const [d, c] of Object.entries(prev)) {
      counts[d] = c;
    }
  } catch {}

  try {
    const out = execSync("git log --all --format=%ad --date=short", {
      encoding: "utf-8",
      timeout: 3000,
    });
    const runtimeCounts = {};
    for (const line of out.split(/\r?\n/).filter(Boolean)) {
      runtimeCounts[line] = (runtimeCounts[line] || 0) + 1;
    }
    for (const [d, c] of Object.entries(runtimeCounts)) {
      counts[d] = Math.max(counts[d] || 0, c);
    }
  } catch {}

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(jsonPath, JSON.stringify(counts, null, 2), "utf-8");
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`[commits] 同步完成: ${total} commits across ${Object.keys(counts).length} days`);
}

main();
