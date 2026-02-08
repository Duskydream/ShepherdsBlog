/**
 * Prebuild script: fetch Bangumi data and write to public/data/bangumi.json
 * Used as static fallback when EdgeOne function is unavailable or fails.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const USER_ID = "851657";
const BASE = `https://api.bgm.tv/v0/users/${USER_ID}/collections`;
const LIMIT = 30;

async function fetchCollection(type) {
  let page = 1;
  const all = [];
  while (true) {
    const url = `${BASE}?type=${type}&limit=${LIMIT}&offset=${(page - 1) * LIMIT}&t=${Date.now()}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)" },
      cache: "no-store",
    });
    if (!res.ok)
      break;
    const json = await res.json();
    if (!json.data || json.data.length === 0)
      break;
    all.push(...json.data);
    if (json.data.length < LIMIT)
      break;
    page++;
  }
  return all;
}

async function main() {
  try {
    console.log("[bangumi] 开始抓取...");
    const [watching, wish, watched] = await Promise.all([
      fetchCollection(3), // watching
      fetchCollection(1), // wish
      fetchCollection(2), // watched
    ]);

    const payload = { watching, wish, watched, cachedAt: Date.now() };
    const outDir = path.resolve(process.cwd(), "public", "data");
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "bangumi.json"), JSON.stringify(payload, null, 2), "utf-8");
    console.log("[bangumi] 写入完成 public/data/bangumi.json");
  }
  catch (e) {
    console.error("[bangumi] 抓取失败(忽略，不阻断构建):", e);
  }
}

main();
