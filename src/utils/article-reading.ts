import { getReadingOffset } from "./reading-layout";

interface Bookmark {
  path: string;
  heading: string;
  fraction: number;
  ratio: number;
  savedAt: number;
}
const STORAGE_KEY = "hananiwa:reading:v1";
const MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const LONG_READ_MINUTES = 15;
let dispose: (() => void) | undefined;

function readBookmarks(): Bookmark[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is Bookmark =>
      typeof item?.path === "string" && typeof item.heading === "string" &&
      Number.isFinite(item.fraction) && item.fraction >= 0 && item.fraction <= 1 &&
      Number.isFinite(item.ratio) && item.ratio >= 0 && item.ratio < 0.98 &&
      Number.isFinite(item.savedAt) && item.savedAt <= Date.now() && Date.now() - item.savedAt < MAX_AGE,
    ).slice(-40);
  } catch { return []; }
}

export function initArticleReading() {
  dispose?.();
  dispose = undefined;
  const bar = document.querySelector<HTMLElement>(".reading-progress");
  const title = document.querySelector<HTMLElement>("[data-article-reading]");
  const article = document.querySelector<HTMLElement>("main .sl-markdown-content");
  if (!bar) return;
  bar.hidden = !title || !article || !!article.querySelector(".not-content");
  if (bar.hidden || !article || !title) return;

  const controller = new AbortController();
  const { signal } = controller;
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const headings = [...article.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id]")];
  const canSave = Number(title.dataset.readingMinutes) >= LONG_READ_MINUTES;
  let start = 0;
  let end = 0;
  let ratio = 0;
  let frame = 0;
  let saveTimer = 0;
  let dirty = false;
  let notice: HTMLElement | undefined;

  const measure = () => {
    const rect = article.getBoundingClientRect();
    start = rect.top + window.scrollY;
    end = rect.bottom + window.scrollY;
  };
  const update = () => {
    const offset = getReadingOffset();
    const range = Math.max(0, end - start - (window.innerHeight - offset));
    ratio = range > 0 ? Math.min(1, Math.max(0, (window.scrollY + offset - start) / range)) : 1;
    bar.style.transform = `scaleX(${ratio})`;
  };
  const save = () => {
    clearTimeout(saveTimer);
    saveTimer = 0;
    if (!canSave || !dirty) return;
    dirty = false;
    update();
    try {
      const bookmarks = readBookmarks().filter((bookmark) => bookmark.path !== path);
      if (ratio >= 0.03 && ratio < 0.98) {
        const position = window.scrollY + getReadingOffset();
        let current: HTMLElement | undefined;
        let currentTop = start;
        for (const heading of headings) {
          const top = heading.getBoundingClientRect().top + window.scrollY;
          if (top > position) break;
          current = heading;
          currentTop = top;
        }
        const next = current ? headings[headings.indexOf(current) + 1] : headings[0];
        const nextTop = next ? next.getBoundingClientRect().top + window.scrollY : end;
        bookmarks.push({ path, heading: current?.id ?? "", fraction: Math.min(1, Math.max(0,
          (position - currentTop) / Math.max(1, nextTop - currentTop))), ratio, savedAt: Date.now() });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks.slice(-40)));
    } catch { /* Private browsing/quota errors must not interrupt reading. */ }
  };
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; update(); });
  };

  const bookmark = canSave ? readBookmarks().find((item) => item.path === path) : undefined;
  // Explicit fragment links and browser-restored scroll positions take precedence.
  if (bookmark && !location.hash && window.scrollY < 100) {
    notice = document.createElement("div");
    notice.className = "reading-resume";
    notice.setAttribute("role", "status");
    const label = document.createElement("span");
    label.textContent = `上次读到约 ${Math.round(bookmark.ratio * 100)}% · 进度仅保存在本机`;
    const resume = document.createElement("button");
    resume.type = "button";
    resume.textContent = "继续阅读";
    const dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.textContent = "忽略";
    notice.append(label, resume, dismiss);
    title.append(notice);
    resume.addEventListener("click", () => {
      measure();
      const heading = headings.find((item) => item.id === bookmark.heading);
      const next = heading ? headings[headings.indexOf(heading) + 1] : headings[0];
      const base = heading ? heading.getBoundingClientRect().top + window.scrollY : start;
      const limit = next ? next.getBoundingClientRect().top + window.scrollY : end;
      const position = heading || !bookmark.heading
        ? base + bookmark.fraction * (limit - base)
        : start + bookmark.ratio * Math.max(0, end - start - window.innerHeight + getReadingOffset());
      const previousStart = start;
      notice?.remove();
      measure();
      // Removing the notice shifts the whole article by the same amount.
      const target = position + start - previousStart;
      window.scrollTo({ top: Math.max(0, target - getReadingOffset()), behavior: "instant" });
      const focusTarget = heading ?? article;
      const previousTabindex = focusTarget.getAttribute("tabindex");
      focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus({ preventScroll: true });
      if (previousTabindex === null) focusTarget.removeAttribute("tabindex");
      else focusTarget.setAttribute("tabindex", previousTabindex);
      dirty = true;
      update();
    }, { signal });
    dismiss.addEventListener("click", () => {
      notice?.remove();
      const heading = title.querySelector<HTMLElement>("h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
      heading?.removeAttribute("tabindex");
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(readBookmarks().filter((item) => item.path !== path))); } catch { /* optional storage */ }
      measure();
      update();
    }, { signal });
  }

  measure();
  update();
  window.addEventListener("scroll", () => {
    schedule();
    if (canSave) {
      dirty = true;
      if (!saveTimer) saveTimer = window.setTimeout(save, 1500);
    }
  }, { passive: true, signal });
  window.addEventListener("resize", () => { measure(); schedule(); }, { passive: true, signal });
  window.addEventListener("pagehide", save, { signal });
  document.addEventListener("visibilitychange", () => { if (document.hidden) save(); }, { signal });
  const observer = new ResizeObserver(() => { measure(); schedule(); });
  document.fonts.ready.then(() => { if (!signal.aborted) { measure(); schedule(); } });
  // Title (including the notice) and content can resize as fonts/images load.
  observer.observe(article);
  observer.observe(title);
  dispose = () => {
    save();
    controller.abort();
    observer.disconnect();
    cancelAnimationFrame(frame);
    clearTimeout(saveTimer);
    notice?.remove();
  };
}

document.addEventListener("astro:before-swap", () => { dispose?.(); dispose = undefined; });
