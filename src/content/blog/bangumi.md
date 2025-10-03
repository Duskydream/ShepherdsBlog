---
title: 通过调用API实现博客追番页面
author: Shepherd
description: 给博客搭个追番页面
pubDate: 2025-10-03
tags: [Anime]
categories: [FrontendDeveloping]
---

# 通过调用Bangumi API实现博客追番页面

## 功能：

1.实时更新Bangumi的“已看/想看/在看”的番剧/游戏/小说（未作区分）；

2.搜索功能；

3.实时调用以及页面刷新

## 方法

### 1.注册Bangumi账号

访问www.bgm.tv(自测www.bangumi.tv需要代理)，注册账号，可浏览ACG作品并选择已看/想看/在看。点右上角图标进入个人页面记下左上角用户名旁的@id（不是用户名）。

### 2.页面搭建（以Astro为例）

在Blog的pages页面创建/api文件夹，新建bangumi.ts

```ts
import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const username = "";// 在这里填上@id的内容
const baseUrl = `https://api.bgm.tv/v0/users/${username}/collections`;
const CACHE_TTL_MS = 60 * 60 * 1000; // 这里是调用api的时间间隔，默认为60分钟
// Use /tmp on Vercel/serverless (writable), otherwise local .cache directory
const CACHE_DIR = process.env.VERCEL ? "/tmp" : path.resolve(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "bangumi.json");

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

export const GET: APIRoute = async ({ url }) => {
  const force = url.searchParams.get("force") === "1" || url.searchParams.get("refresh") === "1";

  // Try read file cache unless force refresh requested
  const now = Date.now();
  if (!force) {
    const fileCache = await readCache();
    if (fileCache && fileCache.cachedAt && (now - fileCache.cachedAt) < CACHE_TTL_MS) {
      return new Response(JSON.stringify({ ...fileCache, servedFrom: "file-cache" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // prevent CDN/browser caching of this response to ensure client-side refresh always revalidates
          "Cache-Control": "no-store, max-age=0",
        },
      });
    }
  }

  // Otherwise fetch fresh (or partial) and save
  const [watching, wish, watched] = await Promise.all([
    fetchCollectionType(3),
    fetchCollectionType(1),
    fetchCollectionType(2),
  ]);

  const payload = { watching, wish, watched, cachedAt: now };
  await writeCache(payload).catch(() => {});
  return new Response(JSON.stringify({ ...payload, servedFrom: force ? "forced-fetch" : "fetched" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // prevent CDN/browser caching so follow-up refreshes always consult the function
      "Cache-Control": "no-store, max-age=0",
    },
  });
};
// For SSR adapters, ensure this endpoint is executed at runtime and not pre-rendered
export const prerender = false;
```

以存放bangumi的api。

新建anime的页面，在astro里新建（hexo用md）anime.astro

```html
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import MainCard from "@/components/MainCard.astro";
import { Icon } from "astro-icon/components";<!--这里是博客的基本配置，不用管-->

type Subject = {
  id: number;
  name: string;
  name_cn?: string;
  date?: string;
  images?: { common?: string };
};
type WatchingItem = { subject: Subject };

// remove server-side fetching so page is static-built and client will update
---

<BaseLayout title="我的追番">
  <MainCard title="Anime" description="追番记录" textOverlay="Anime" infoIcon="lucide:tv">
    <div class="space-y-4 mb-8 max-w-7xl mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          id="search"
          placeholder="搜索番剧..."
          class="px-4 py-2 w-full md:w-64 rounded-full border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
        <div class="flex items-center gap-2">
          <div class="flex gap-2" id="tab-group">
            <button
              data-tab="watching"
              class="tab-btn px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow"
            >
              在看
            </button>
            <button data-tab="wish" class="tab-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold">
              想看
            </button>
            <button data-tab="watched" class="tab-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold">
              看过
            </button>
          </div>
          <button
            id="refresh-btn"
            title="手动刷新"
            class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold"
          >
            刷新
          </button>
        </div>
      </div>

      <!-- 内容容器：初始为空，客户端填充 -->
      <div id="content-area" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        <div id="loading-placeholder" class="col-span-full text-center py-12 text-sm text-gray-500">Loading...</div>
      </div>
    </div>

    <script type="module">
      const API = "/api/bangumi";
      const CACHE_KEY = "bangumi_front_cache_v1";
      const CLIENT_TTL = 60 * 60 * 1000; // 1 hour client-side fallback cache
      const AUTO_REFRESH_MS = 15 * 60 * 1000; // auto refresh every 15 minutes

      const tabs = ["watching", "wish", "watched"];
      let currentTab = "watching";
      let dataStore = { watching: [], wish: [], watched: [] };

      const searchInput = document.getElementById("search");
      const contentArea = document.getElementById("content-area");
      const refreshBtn = document.getElementById("refresh-btn");

      function saveClientCache(obj) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: obj, ts: Date.now() }));
        } catch (e) {
          /* ignore */
        }
      }
      function readClientCache() {
        try {
          const raw = localStorage.getItem(CACHE_KEY);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          if (Date.now() - parsed.ts > CLIENT_TTL) return null;
          return parsed.data;
        } catch {
          return null;
        }
      }

      async function fetchFromApi(force = false) {
        // If not forced, try client cache first
        if (!force) {
          const cached = readClientCache();
          if (cached) {
            dataStore = cached;
            renderCurrent();
            // still refresh in background if staled? we'll continue to fetch but don't block UI
          }
        }

        try {
          // Add cache-busting param and optional force flag so server bypasses cache
          const url = `${API}?t=${Date.now()}${force ? "&force=1" : ""}`;
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) throw new Error("fetch failed " + res.status);
          const json = await res.json();
          // server returns { watching, wish, watched, cachedAt }
          dataStore = {
            watching: json.watching || [],
            wish: json.wish || [],
            watched: json.watched || [],
          };
          saveClientCache(dataStore);
          renderCurrent();
          return true;
        } catch (e) {
          console.warn("Bangumi API fetch failed:", e);
          // if nothing in UI (from cache) and client cache missing, show error
          if (!dataStore.watching.length && !dataStore.wish.length && !dataStore.watched.length) {
            contentArea.innerHTML =
              '<div class="col-span-full text-center py-8 text-sm text-red-500">无法加载番剧数据，请稍后再试。</div>';
          }
          return false;
        }
      }

      function renderCard(item) {
        const title = (item.subject.name_cn || item.subject.name || "").replace(/"/g, "&quot;");
        const img = item.subject.images?.common;
        const id = item.subject.id;
        const date = item.subject.date ? `<p class="text-xs text-gray-500 mb-2">${item.subject.date}</p>` : "";
        return `
          <div class="card bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition overflow-hidden text-center" data-name="${(title || "").toLowerCase()}">
            ${img ? `<a href="https://bgm.tv/subject/${id}" target="_blank" rel="noopener noreferrer"><img src="${img}" alt="${title}" class="w-full h-48 md:h-56 lg:h-60 object-cover rounded-t-xl" loading="lazy" /></a>` : ""}
            <h3 class="mt-2 text-sm font-medium truncate px-2">${title}</h3>
            ${date}
          </div>
        `;
      }

      function renderCurrent() {
        const list = dataStore[currentTab] || [];
        const term = (searchInput.value || "").toLowerCase();
        // Only show 'no content' if data has been loaded and the list is empty.
        // If dataStore is empty, it means we are still in the initial loading phase.
        if (
          list.length === 0 &&
          (dataStore.watching.length > 0 || dataStore.wish.length > 0 || dataStore.watched.length > 0)
        ) {
          contentArea.innerHTML = '<div class="col-span-full text-center py-8 text-sm text-gray-500">暂无内容</div>';
          return;
        }
        if (list.length > 0) {
          const html = list.map((item) => renderCard(item)).join("");
          contentArea.innerHTML = html;
        }
        // apply search filter
        if (term) {
          const cards = contentArea.querySelectorAll("[data-name]");
          cards.forEach((c) => {
            const name = c.getAttribute("data-name") || "";
            c.classList.toggle("hidden", !name.includes(term));
          });
        }
      }

      // tabs UI: simple CSS class change and switching currentTab
      function setActiveTab(tab) {
        currentTab = tab;
        // update button styles
        document.querySelectorAll(".tab-btn").forEach((b) => {
          if (b.dataset.tab === tab) {
            b.classList.add("bg-blue-600", "text-white", "shadow");
            b.classList.remove("bg-gray-200", "text-gray-700");
          } else {
            b.classList.remove("bg-blue-600", "text-white", "shadow");
            b.classList.add("bg-gray-200", "text-gray-700");
          }
        });
        renderCurrent();
      }

      // Attach tab buttons
      document.querySelectorAll("#tab-group .tab-btn").forEach((b) => {
        b.addEventListener("click", () => setActiveTab(b.dataset.tab));
      });

      // Search
      searchInput.addEventListener("input", () => renderCurrent());

      // Refresh button
      refreshBtn.addEventListener("click", async () => {
        refreshBtn.textContent = "刷新中…";
        refreshBtn.disabled = true;
        await fetchFromApi(true);
        refreshBtn.textContent = "刷新";
        refreshBtn.disabled = false;
      });

      // Initial load: try client cache then network. Start auto refresh interval.
      (async () => {
        const clientCached = readClientCache();
        if (clientCached) {
          dataStore = clientCached;
          renderCurrent();
        } else {
          contentArea.innerHTML = '<div class="col-span-full text-center py-12 text-sm text-gray-500">Loading...</div>';
        }

        await fetchFromApi(false); // fetch fresh in background (updates UI when done)

        // auto refresh periodically
        setInterval(() => {
          fetchFromApi(false);
        }, AUTO_REFRESH_MS);

        // default active tab
        setActiveTab("watching");
      })();
    </script>
  </MainCard>
</BaseLayout>

```

这就搭建好了追番页面，后续可以自行修改参数样式。

示例：www.duskydream.icu/anime
