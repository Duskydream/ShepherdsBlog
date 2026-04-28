/**
 * Prebuild script: fetch Bangumi data and write to public/data/bangumi.json.
 * Used as a static fallback when the runtime function fails.
 */
import fs from "node:fs/promises";
import path from "node:path";

const USER_ID = "duskydream";
const BASE = `https://api.bgm.tv/v0/users/${USER_ID}/collections`;
const LIMIT = 30;
const DEBUG_MAX_BODY = 400;

function truncateForDebug(value) {
  return value.length > DEBUG_MAX_BODY ? `${value.slice(0, DEBUG_MAX_BODY)}...` : value;
}

async function fetchCollection(type) {
  let page = 1;
  const all = [];

  while (true) {
    const url = `${BASE}?type=${type}&limit=${LIMIT}&offset=${(page - 1) * LIMIT}&t=${Date.now()}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)" },
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = truncateForDebug(await res.text());
      throw new Error(`Bangumi upstream ${res.status} for type=${type} page=${page}: ${detail}`);
    }

    const json = await res.json();
    if (!json.data || json.data.length === 0) break;
    all.push(...json.data);
    if (json.data.length < LIMIT) break;
    page++;
  }

  return all;
}

async function main() {
  console.log("[bangumi] 开始抓取...");

  const [watching, wish, watched] = await Promise.all([
    fetchCollection(3),
    fetchCollection(1),
    fetchCollection(2),
  ]);

  const totalItems = watching.length + wish.length + watched.length;
  if (totalItems === 0) {
    throw new Error("Bangumi upstream returned an empty payload for all collections");
  }

  const payload = { watching, wish, watched, cachedAt: Date.now() };
  const outDir = path.resolve(process.cwd(), "public", "data");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    path.join(outDir, "bangumi.json"),
    JSON.stringify(payload, null, 2),
    "utf-8",
  );

  console.log(`[bangumi] 写入完成 public/data/bangumi.json (${totalItems} items)`);
}

main().catch((error) => {
  console.error("[bangumi] 抓取失败，保留现有 public/data/bangumi.json:", error);
});
