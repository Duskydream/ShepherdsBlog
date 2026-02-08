// Service Worker for Shepherd's Blog
const CACHE_NAME = "shepherds-blog-v1";
const OFFLINE_URL = "/404";

// 需要缓存的静态资源
const STATIC_ASSETS = [
  "/",
  "/blog",
  "/friend",
  "/anime",
  "/404",
];

// 安装 Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting();
});

// 激活 Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name)),
      );
    }),
  );
  self.clients.claim();
});

// 拦截请求
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return;
  }

  // API 请求和动态数据一律走网络，不经过 SW 缓存
  if (url.pathname.startsWith("/bangumi") || url.pathname.startsWith("/api/") || url.pathname.startsWith("/data/bangumi")) {
    return;
  }

  // 对于 HTML 页面，使用 Network First 策略
  if (request.headers.get("Accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(r => r || caches.match(OFFLINE_URL))),
    );
    return;
  }

  // 对于静态资源，使用 Cache First 策略
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // 后台更新缓存
        fetch(request).then((response) => {
          caches.open(CACHE_NAME).then(cache => cache.put(request, response));
        });
        return cached;
      }
      return fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      });
    }),
  );
});
