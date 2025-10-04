/**
 * Tencent EdgeOne 云函数示例：Bangumi 聚合 API
 * 动态：实时或半实时抓取 + 简单文件级缓存（EdgeOne 运行环境需支持临时写入）
 *
 * 路由建议：部署后通过 /api/bangumi 指向此函数。
 * 客户端会在失败时回退到 /data/bangumi.json 静态文件。
 */

// EdgeOne 运行时若支持 fetch / Request / Response 接口，可直接使用 Web 标准。
// 若平台需要特定导出格式，可根据官方文档调整（例如 export default async function handler(evt) {...}）。

const USER_ID = "851657";
const BASE = `https://api.bgm.tv/v0/users/${USER_ID}/collections`;
const LIMIT = 30;
const CACHE_TTL = 15 * 60 * 1000; // 15分钟（内存缓存）
// 若平台提供临时目录，例如 /tmp，可使用；这里假设支持。

// 简易内存缓存（函数冷启动重置）
let memoryCache: { watching: any[]; wish: any[]; watched: any[]; cachedAt: number } | null = null;

async function fetchCollection(type: number) {
  let page = 1;
  const all: any[] = [];
  while (true) {
    const url = `${BASE}?type=${type}&limit=${LIMIT}&offset=${(page - 1) * LIMIT}`;
    const res = await fetch(url, { headers: { "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)" } });
    if (!res.ok)
      break;
    const json: any = await res.json();
    if (!json.data || json.data.length === 0)
      break;
    all.push(...json.data);
    if (json.data.length < LIMIT)
      break;
    page++;
  }
  return all;
}

async function getData(force: boolean) {
  const now = Date.now();
  if (!force && memoryCache && now - memoryCache.cachedAt < CACHE_TTL) {
    return { ...memoryCache, servedFrom: "memory" };
  }
  const [watching, wish, watched] = await Promise.all([
    fetchCollection(3),
    fetchCollection(1),
    fetchCollection(2),
  ]);
  memoryCache = { watching, wish, watched, cachedAt: now };
  return { ...memoryCache, servedFrom: force ? "force-fetch" : "fetch" };
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const force = ["1", "true"].includes(url.searchParams.get("force") || "");
  try {
    const data = await getData(force);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // 严格禁止缓存，确保客户端刷新可触发请求
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store",
        // 透出来源供前端调试
        "X-Bangumi-Served-From": data.servedFrom,
        // 避免中间缓存基于 Accept 等做合并
        "Vary": "*",
      },
    });
  }
  catch (e: any) {
    return new Response(JSON.stringify({ error: "upstream failed", detail: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
}

// EdgeOne 可能要求默认导出：尝试兼容（如果平台文档不同，请调整）
export default {
  fetch: handleRequest,
};
