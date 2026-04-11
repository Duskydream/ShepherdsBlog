import { execSync } from "node:child_process";
import path from "node:path";

const repoRoot = path.resolve(process.cwd());

function run(command, { silent = false, capture = false } = {}) {
  try {
    console.log(`Executing: ${command}`);
    return execSync(command, {
      stdio: capture ? "pipe" : silent ? "ignore" : "inherit",
      cwd: repoRoot,
      encoding: "utf8",
    });
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    throw error;
  }
}

console.log("🚀 Starting Starlight deploy...");

try {
  run("git add .");
  try {
    run("git diff-index --quiet HEAD --", { silent: true });
  } catch {
    run('git commit -m "deploy: sync Starlight site"');
  }
} catch {
  console.log("No changes to commit or git error.");
}

let remotes = [];
try {
  const stdout = run("git remote", { capture: true });
  remotes = stdout.split("\n").filter((r) => r.trim() !== "");
} catch {
  console.error("Failed to get remotes.");
  process.exit(1);
}

let currentBranch = "main";
try {
  currentBranch = run("git branch --show-current", { capture: true }).trim() || "main";
} catch {
  console.error("Failed to get current branch.");
  process.exit(1);
}

if (remotes.length === 0) {
  console.log("No remotes found.");
  process.exit(1);
} else {
  console.log(`Found remotes: ${remotes.join(", ")}`);
  console.log(`Current branch: ${currentBranch}`);
  for (const remote of remotes) {
    console.log(`\n📤 Pushing to ${remote}...`);
    run(`git push ${remote} ${currentBranch}`);
  }
}

console.log("\n✅ Deploy process finished.");
