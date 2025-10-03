import type { APIRoute } from "astro";
// ...existing code...
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const username = "851657";
const baseUrl = `https://api.bgm.tv/v0/users/${username}/collections`;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const CACHE_FILE = path.resolve(process.cwd(), ".cache", "bangumi.json");

async function fetchCollectionType(type: number) {
  let page = 1;
  const limit = 30;
  let all: any[] = [];
  try {
    while (true) {
      const res = await fetch(`${baseUrl}?type=${type}&limit=${limit}&offset=${(page - 1) * limit}`, {
        headers: { "User-Agent": "AstroBlog/1.0 (https://yourblog.com)" },
      });
      if (!res.ok)
        break;
      const j = await res.json();
      if (!j.data || j.data.length === 0)
        break;
      all = all.concat(j.data);
      if (j.data.length < limit)
        break;
      page++;
    }
  }
  catch (e) {
    console.error("fetchCollectionType error:", e);
  }
  return all;
}

async function readCache() {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(raw);
  }
  catch {
    return null;
  }
}
async function writeCache(obj: any) {
  try {
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(obj), "utf-8");
  }
  catch (e) {
    console.warn("writeCache failed:", e);
  }
}

export const get: APIRoute = async () => {
  // Try read file cache
  const fileCache = await readCache();
  const now = Date.now();
  if (fileCache && fileCache.cachedAt && (now - fileCache.cachedAt) < CACHE_TTL_MS) {
    return new Response(JSON.stringify({ ...fileCache, servedFrom: "file-cache" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  // Otherwise fetch fresh (or partial) and save
  const [watching, wish, watched] = await Promise.all([
    fetchCollectionType(3),
    fetchCollectionType(1),
    fetchCollectionType(2),
  ]);

  const payload = { watching, wish, watched, cachedAt: now };
  await writeCache(payload).catch(() => {});
  return new Response(JSON.stringify({ ...payload, servedFrom: "fetched" }), { status: 200, headers: { "Content-Type": "application/json" } });
};
// ...existing code...
