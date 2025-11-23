import { execSync } from "node:child_process";

function run(command) {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: "inherit" });
  }
  catch (error) {
    console.error(`Failed to execute: ${command}`);
    // Don't exit process so we can try pushing to other remotes
  }
}

console.log("🚀 Starting deployment/sync process...");

// 1. Stage and Commit
try {
  run("git add .");
  // Only commit if there are changes
  try {
    execSync("git diff-index --quiet HEAD --");
  }
  catch (e) {
    run("git commit -m \"deploy: sync from pnpm run deploy\"");
  }
}
catch (e) {
  console.log("No changes to commit or git error.");
}

// 2. Get list of remotes
let remotes = [];
try {
  const stdout = execSync("git remote", { encoding: "utf8" });
  remotes = stdout.split("\n").filter(r => r.trim() !== "");
}
catch (e) {
  console.error("Failed to get remotes");
}

// 3. Push to all remotes
if (remotes.length === 0) {
  console.log("No remotes found.");
}
else {
  console.log(`Found remotes: ${remotes.join(", ")}`);

  // Special handling for local config where 'origin' might have multiple push URLs
  // But here we just iterate all defined remote names.

  for (const remote of remotes) {
    console.log(`\n📤 Pushing to ${remote}...`);
    run(`git push ${remote} main`);
  }
}

console.log("\n✅ Deploy process finished.");
