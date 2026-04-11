/**
 * Migrate old blog posts to Starlight format.
 * - pubDate -> date
 * - Remove categories (directory structure handles grouping)
 * - Keep author, tags, title, description
 * Run: node scripts/migrate-posts.mjs
 */
import * as fs from "node:fs";
import * as path from "node:path";

const SOURCE_DIR = path.resolve("../src/content/blog");
const DOCS_DIR = path.resolve("src/content/docs");

// Category -> directory mapping
const CATEGORY_MAP = {
  "Coding Notes": "coding-notes",
  Music: "blog",
  Literature: "blog",
};

// Parse YAML frontmatter (simple parser, no external deps)
function parseFrontmatter(content) {
  // Strip BOM and normalize line endings
  content = content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;

  const fm = {};
  match[1].split("\n").forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    // Parse arrays like [a, b, c]
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
    // Parse dates
    else if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      // keep as string
    }
    // Parse booleans
    else if (val === "true") val = true;
    else if (val === "false") val = false;
    // Remove quotes
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

// Process each file
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

  // Determine target directory
  const categories = frontmatter.categories || [];
  const targetDir =
    categories
      .map((c) => CATEGORY_MAP[c])
      .find(Boolean)
      ?.replace(/\s+/g, "-") || "blog";

  // Build new frontmatter
  const newFm = {
    title: frontmatter.title,
  };
  if (frontmatter.description) newFm.description = frontmatter.description;
  if (frontmatter.author) newFm.author = frontmatter.author;
  // Convert pubDate -> date
  if (frontmatter.pubDate) newFm.date = frontmatter.pubDate;
  if (frontmatter.updated) newFm.lastUpdated = frontmatter.updated;
  if (frontmatter.tags) newFm.tags = frontmatter.tags;
  // Keep categories as metadata for display
  if (categories.length > 0) newFm.categories = categories;

  const newContent = buildFrontmatter(newFm) + body;

  // Write to target directory
  const targetDirPath = path.join(DOCS_DIR, targetDir);
  fs.mkdirSync(targetDirPath, { recursive: true });
  const destPath = path.join(targetDirPath, file);
  fs.writeFileSync(destPath, newContent, "utf-8");
  console.log(`Migrated: ${file} -> docs/${targetDir}/${file}`);
}

console.log("\nMigration complete!");
