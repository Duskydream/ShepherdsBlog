import fs from 'node:fs/promises';
import path__default from 'node:path';
import process from 'node:process';
export { renderers } from '../../renderers.mjs';

const username = "851657";
const baseUrl = `https://api.bgm.tv/v0/users/${username}/collections`;
const CACHE_TTL_MS = 15 * 60 * 1e3;
const CACHE_DIR = process.env.VERCEL ? "/tmp" : path__default.resolve(process.cwd(), ".cache");
const CACHE_FILE = path__default.join(CACHE_DIR, "bangumi.json");
async function fetchCollectionType(type) {
  let page = 1;
  const limit = 30;
  let all = [];
  try {
    while (true) {
      const res = await fetch(`${baseUrl}?type=${type}&limit=${limit}&offset=${(page - 1) * limit}`, {
        headers: { "User-Agent": "AstroBlog/1.0 (https://yourblog.com)" }
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
  } catch (e) {
    console.error("fetchCollectionType error:", e);
  }
  return all;
}
async function readCache() {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
async function writeCache(obj) {
  try {
    await fs.mkdir(path__default.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(obj), "utf-8");
  } catch (e) {
    console.warn("writeCache failed:", e);
  }
}
const GET = async ({ url }) => {
  const force = url.searchParams.get("force") === "1" || url.searchParams.get("refresh") === "1";
  const now = Date.now();
  if (!force) {
    const fileCache = await readCache();
    if (fileCache && fileCache.cachedAt && now - fileCache.cachedAt < CACHE_TTL_MS) {
      return new Response(JSON.stringify({ ...fileCache, servedFrom: "file-cache" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // prevent CDN/browser caching of this response to ensure client-side refresh always revalidates
          "Cache-Control": "no-store, max-age=0"
        }
      });
    }
  }
  const [watching, wish, watched] = await Promise.all([
    fetchCollectionType(3),
    fetchCollectionType(1),
    fetchCollectionType(2)
  ]);
  const payload = { watching, wish, watched, cachedAt: now };
  await writeCache(payload).catch(() => {
  });
  return new Response(JSON.stringify({ ...payload, servedFrom: force ? "forced-fetch" : "fetched" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // prevent CDN/browser caching so follow-up refreshes always consult the function
      "Cache-Control": "no-store, max-age=0"
    }
  });
};
const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
