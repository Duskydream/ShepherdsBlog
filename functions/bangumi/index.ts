/**
 * Local function version of the Bangumi aggregate API.
 * Route: /bangumi
 * The client falls back to /data/bangumi.json when this endpoint fails.
 */

const USER_ID = "duskydream";
const BASE = `https://api.bgm.tv/v0/users/${USER_ID}/collections`;
const TIMELINE_URL = `https://bgm.tv/feed/user/${USER_ID}/timeline`;
const LIMIT = 30;
const CACHE_TTL = 15 * 60 * 1000;
const DEBUG_MAX_BODY = 400;

type BangumiCollectionItem = Record<string, unknown>;
type BangumiTimelineItem = {
  guid: string;
  title: string;
  action: string;
  cleanTitle: string;
  subjectId: number;
  subjectNameCn: string;
  pubDate: string;
  dateFormatted: string;
};

let memoryCache: {
  watching: BangumiCollectionItem[];
  wish: BangumiCollectionItem[];
  watched: BangumiCollectionItem[];
  timeline: BangumiTimelineItem[];
  cachedAt: number;
} | null = null;

function truncateForDebug(value: string) {
  return value.length > DEBUG_MAX_BODY ? `${value.slice(0, DEBUG_MAX_BODY)}...` : value;
}

async function fetchCollection(type: number) {
  let page = 1;
  const all: BangumiCollectionItem[] = [];

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

    const json = (await res.json()) as { data?: BangumiCollectionItem[] };
    if (!json.data || json.data.length === 0) break;
    all.push(...json.data);
    if (json.data.length < LIMIT) break;
    page++;
  }

  return all;
}

async function fetchTimeline(): Promise<BangumiTimelineItem[]> {
  try {
    const res = await fetch(TIMELINE_URL, {
      headers: {
        "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const text = await res.text();
    const items: BangumiTimelineItem[] = [];
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g);

    for (const m of itemMatches) {
      const raw = m[1];
      const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/);
      const descMatch = raw.match(/<description>([\s\S]*?)<\/description>/);
      const pubDateMatch = raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const guidMatch = raw.match(/<guid[^>]*>([\s\S]*?)<\/guid>/);

      const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
      const desc = descMatch ? descMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : "";
      const guid = guidMatch ? guidMatch[1].trim() : "";

      const subjectMatch = desc.match(/href="https?:\/\/bgm\.tv\/subject\/(\d+)"/);
      const subjectId = subjectMatch ? Number(subjectMatch[1]) : 0;
      const cnNameMatch = desc.match(/data-subject-name-cn="([^"]*)"/);
      const subjectNameCn = cnNameMatch ? cnNameMatch[1] : "";

      const actionMatch = title.match(/^(在玩|读过|在读|想读|看过|在看|想看|想玩|搁置|抛弃)/);
      const action = actionMatch ? actionMatch[1] : "更新了";
      const cleanTitle = title.replace(/^(在玩|读过|在读|想读|看过|在看|想看|想玩|搁置|抛弃)\s*/, "");

      items.push({
        guid,
        title,
        action,
        cleanTitle,
        subjectId,
        subjectNameCn,
        pubDate,
        dateFormatted: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : "",
      });
    }

    return items;
  } catch {
    return [];
  }
}

async function getData(force: boolean) {
  const now = Date.now();
  if (!force && memoryCache && now - memoryCache.cachedAt < CACHE_TTL) {
    return memoryCache;
  }

  const [watching, wish, watched, timeline] = await Promise.all([
    fetchCollection(3),
    fetchCollection(1),
    fetchCollection(2),
    fetchTimeline(),
  ]);

  memoryCache = {
    watching,
    wish,
    watched,
    timeline: timeline.length > 0 ? timeline : (memoryCache?.timeline || []),
    cachedAt: now,
  };
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
        // Keep the client and edge cache warm while the in-memory TTL limits
        // how often this function talks to Bangumi.
        "Cache-Control": "public, max-age=300, s-maxage=900, stale-while-revalidate=86400",
        Vary: "Accept-Encoding",
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
