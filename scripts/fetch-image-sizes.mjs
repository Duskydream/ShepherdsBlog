import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(root, "src/content/docs");
const outputFile = path.join(root, "src/data/image-sizes.json");

const IMAGE_PATTERN = /!\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)/g;
const HTML_IMAGE_PATTERN = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.mdx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

function collectUrls(source) {
  const urls = new Set();
  for (const match of source.matchAll(IMAGE_PATTERN)) {
    urls.add(match[1].replace(/^<|>$/g, ""));
  }
  for (const match of source.matchAll(HTML_IMAGE_PATTERN)) {
    urls.add(match[1]);
  }
  return [...urls].filter((url) => /^https?:\/\//.test(url));
}

async function readSize(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) throw new Error("missing dimensions");
  return { width: metadata.width, height: metadata.height };
}

async function mapWithConcurrency(items, limit, worker) {
  const results = [];
  let index = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current]);
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  const existing = existsSync(outputFile)
    ? JSON.parse(await readFile(outputFile, "utf8"))
    : {};

  const files = await walk(docsDir);
  const urls = new Set();
  for (const file of files) {
    for (const url of collectUrls(await readFile(file, "utf8"))) urls.add(url);
  }

  const pending = [...urls].filter((url) => !existing[url]);
  console.log(`[image-sizes] ${urls.size} images referenced, ${pending.length} to resolve`);

  const resolved = await mapWithConcurrency(pending, 6, async (url) => {
    try {
      const size = await readSize(url);
      return [url, size];
    } catch (error) {
      console.warn(`[image-sizes] skip ${url}: ${error.message}`);
      return null;
    }
  });

  const sizes = { ...existing };
  for (const entry of resolved) {
    if (entry) sizes[entry[0]] = entry[1];
  }

  const sorted = Object.fromEntries(Object.entries(sizes).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(outputFile, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`[image-sizes] wrote ${Object.keys(sorted).length} entries to src/data/image-sizes.json`);
}

main().catch((error) => {
  console.error("[image-sizes] failed:", error);
  process.exitCode = 1;
});
