/**
 * Local function version of the Bangumi aggregate API.
 * Route: /bangumi
 * The client falls back to /data/bangumi.json when this endpoint fails.
 */

const USER_ID = "851657";
const BASE = `https://api.bgm.tv/v0/users/${USER_ID}/collections`;
const LIMIT = 30;
const CACHE_TTL = 15 * 60 * 1000;
const DEBUG_MAX_BODY = 400;

let memoryCache: {
  watching: any[];
  wish: any[];
  watched: any[];
  cachedAt: number;
} | null = null;

function truncateForDebug(value: string) {
  return value.length > DEBUG_MAX_BODY ? `${value.slice(0, DEBUG_MAX_BODY)}...` : value;
}

async function fetchCollection(type: number) {
  let page = 1;
  const all: any[] = [];

  while (true) {
    const url = `${BASE}?type=${type}&limit=${LIMIT}&offset=${(page - 1) * LIMIT}&timestamp=${Date.now()}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = truncateForDebug(await res.text());
      throw new Error(`Bangumi upstream ${res.status} for type=${type} page=${page}: ${detail}`);
    }

    const json: any = await res.json();
    if (!json.data || json.data.length === 0) break;
    all.push(...json.data);
    if (json.data.length < LIMIT) break;
    page++;
  }

  return all;
}

async function getData(force: boolean) {
  const now = Date.now();
  if (!force && memoryCache && now - memoryCache.cachedAt < CACHE_TTL) {
    return memoryCache;
  }

  const [watching, wish, watched] = await Promise.all([
    fetchCollection(3),
    fetchCollection(1),
    fetchCollection(2),
  ]);

  memoryCache = { watching, wish, watched, cachedAt: now };
  return memoryCache;
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const force = ["1", "true"].includes(url.searchParams.get("force") || "");

  try {
    const data = await getData(force);
    const totalItems = data.watching.length + data.wish.length + data.watched.length;
    if (totalItems === 0) {
      throw new Error("Bangumi upstream returned an empty payload for all collections");
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
        Vary: "*",
      },
    });
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: "upstream failed",
        detail: error instanceof Error ? error.message : String(error),
        force,
        at: new Date().toISOString(),
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      },
    );
  }
}

export function onRequest(context: { request: Request }) {
  return handleRequest(context.request);
}
