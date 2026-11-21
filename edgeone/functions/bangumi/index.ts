/**
 * Tencent EdgeOne function: Bangumi aggregate API.
 * Route: /bangumi
 * The client falls back to /data/bangumi.json when this endpoint fails.
 */

const USER_ID = "duskydream";
const BASE = `https://api.bgm.tv/v0/users/${USER_ID}/collections`;
const TIMELINE_URL = `https://bgm.tv/feed/user/${USER_ID}/timeline`;
const LIMIT = 30;
const MAX_PAGES = 20;
const CACHE_TTL = 15 * 60 * 1000;
const FORCE_COOLDOWN = 60 * 1000;
const UPSTREAM_TIMEOUT_MS = 8000;
const DEBUG_MAX_BODY = 400;
const TIMELINE_ACTION_RE = /^(在玩|玩过|想玩|在看|看过|想看|在读|读过|想读|在听|听过|想听|搁置|抛弃)/;
const TIMELINE_ACTION_PREFIX_RE =
  /^(在玩|玩过|想玩|在看|看过|想看|在读|读过|想读|在听|听过|想听|搁置|抛弃)\s*/;

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
type BangumiPayload = {
  watching: BangumiCollectionItem[];
  wish: BangumiCollectionItem[];
  watched: BangumiCollectionItem[];
  timeline: BangumiTimelineItem[];
  cachedAt: number;
};

let memoryCache: BangumiPayload | null = null;
let inflightFetch: Promise<BangumiPayload> | null = null;

function truncateForDebug(value: string) {
  return value.length > DEBUG_MAX_BODY ? `${value.slice(0, DEBUG_MAX_BODY)}...` : value;
}

function slimItem(item: BangumiCollectionItem): BangumiCollectionItem {
  if (!item || typeof item !== "object") return item;
  const subject = (item.subject ?? {}) as Record<string, unknown>;
  const images = (subject.images ?? {}) as Record<string, unknown>;
  const medium = (images.medium || images.common || images.large || "") as string;
  const rawTags = Array.isArray(subject.tags) ? subject.tags : [];

  return {
    subject_id: item.subject_id ?? subject.id,
    rate: item.rate ?? 0,
    comment: item.comment ?? "",
    updated_at: item.updated_at ?? "",
    subject: {
      id: subject.id,
      name: subject.name ?? "",
      name_cn: subject.name_cn ?? "",
      type: subject.type,
      score: subject.score ?? 0,
      summary: subject.summary ?? "",
      short_summary: subject.short_summary ?? "",
      images: medium ? { medium } : {},
      tags: rawTags.map((tag: unknown) => ({
        name:
          tag && typeof tag === "object" && "name" in tag
            ? String((tag as { name?: unknown }).name ?? "")
            : "",
      })),
    },
  };
}

async function fetchCollection(type: number) {
  let page = 1;
  const all: BangumiCollectionItem[] = [];

  while (page <= MAX_PAGES) {
    const url = `${BASE}?type=${type}&limit=${LIMIT}&offset=${(page - 1) * LIMIT}&timestamp=${Date.now()}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = truncateForDebug(await res.text());
      throw new Error(`Bangumi upstream ${res.status} for type=${type} page=${page}: ${detail}`);
    }

    const json = (await res.json()) as { data?: BangumiCollectionItem[] };
    if (!json.data || json.data.length === 0) break;
    all.push(...json.data.map(slimItem));
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
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
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

      const actionMatch = title.match(TIMELINE_ACTION_RE);
      const action = actionMatch ? actionMatch[1] : "更新了";
      const cleanTitle = title.replace(TIMELINE_ACTION_PREFIX_RE, "");

      const parsed = pubDate ? new Date(pubDate) : null;
      const dateFormatted =
        parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString().slice(0, 10) : "";

      items.push({
        guid,
        title,
        action,
        cleanTitle,
        subjectId,
        subjectNameCn,
        pubDate,
        dateFormatted,
      });
    }

    return items;
  } catch {
    return [];
  }
}

async function getData(force: boolean): Promise<BangumiPayload> {
  const now = Date.now();
  if (memoryCache) {
    const age = now - memoryCache.cachedAt;
    if (!force && age < CACHE_TTL) {
      return memoryCache;
    }
    if (force && age < FORCE_COOLDOWN) {
      return memoryCache;
    }
  }

  if (inflightFetch) {
    return inflightFetch;
  }

  inflightFetch = (async () => {
    const [watching, wish, watched, timeline] = await Promise.all([
      fetchCollection(3),
      fetchCollection(1),
      fetchCollection(2),
      fetchTimeline(),
    ]);

    const nextPayload: BangumiPayload = {
      watching,
      wish,
      watched,
      timeline: timeline.length > 0 ? timeline : (memoryCache?.timeline || []),
      cachedAt: Date.now(),
    };

    const totalItems =
      nextPayload.watching.length + nextPayload.wish.length + nextPayload.watched.length;
    if (totalItems > 0) {
      memoryCache = nextPayload;
    }

    return nextPayload;
  })();

  try {
    return await inflightFetch;
  } finally {
    inflightFetch = null;
  }
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
