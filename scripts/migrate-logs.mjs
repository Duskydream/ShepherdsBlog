/**
 * Migrate old log posts to Starlight format.
 * Run: node scripts/migrate-logs.mjs
 */
import * as fs from "node:fs";
import * as path from "node:path";

const SOURCE_DIR = path.resolve("../src/content/log");
const DOCS_DIR = path.resolve("src/content/docs/log");

function parseFrontmatter(content) {
  content = content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;

  const fm = {};
  match[1].split("\n").forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      // keep as string
    } else if (val === "true") val = true;
    else if (val === "false") val = false;
    else val = val.replace(/^["']|["']$/g, "");

    fm[key] = val;
  });

  return { frontmatter: fm, body: match[2] };
}

function buildFrontmatter(fm) {
  let result = "---\n";
  for (const [key, val] of Object.entries(fm)) {
    if (Array.isArray(val)) {
      result += `${key}: [${val.map((v) => `"${v}"`).join(", ")}]\n`;
    } else {
      result += `${key}: ${val}\n`;
    }
  }
  result += "---\n";
  return result;
}

fs.mkdirSync(DOCS_DIR, { recursive: true });

const files = fs.readdirSync(SOURCE_DIR).filter((f) => f.endsWith(".md"));

for (const file of files) {
  const srcPath = path.join(SOURCE_DIR, file);
  const content = fs.readFileSync(srcPath, "utf-8");
  const parsed = parseFrontmatter(content);

  if (!parsed) {
    console.warn(`Skipping ${file}: no frontmatter found`);
    continue;
  }

  const { frontmatter, body } = parsed;

  const newFm = {
    title: frontmatter.title,
  };
  if (frontmatter.date) newFm.date = frontmatter.date;
  if (frontmatter.updated) newFm.lastUpdated = frontmatter.updated;

  const newContent = buildFrontmatter(newFm) + body;

  const destPath = path.join(DOCS_DIR, file);
  fs.writeFileSync(destPath, newContent, "utf-8");
  console.log(`Migrated: ${file} -> docs/log/${file}`);
}

console.log("\nLog migration complete!");
