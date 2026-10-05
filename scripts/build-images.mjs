/**
 * 把内容里引用的远程图片（图床 pic1.imgdb.cn）在构建期镜像到本地并转成多个宽度的
 * WebP，写出 `src/data/image-manifest.json`。
 *
 * 为什么需要：图床不提供任何缩放接口（试过 `!w400`、`?w=400`、`/400` 全部原样返回），
 * 而站点正文最宽只有 52rem(≈832px)，原图却有 5712×4284 / 2880×3840 这种尺寸。
 * 实测 23 张正文图片原始合计 21.5 MB，其中单张 1280×720 的 PNG 就有 1.7 MB。
 *
 * 生成的产物会提交进仓库（与 public/data/bangumi.json 的做法一致），
 * 所以 `astro build` 本身不需要联网；只有 `pnpm run refresh:images` 才需要。
 *
 * 用法：
 *   node scripts/build-images.mjs              下载缺失的、重新生成清单
 *   node scripts/build-images.mjs --force      全部重新下载并重压
 *   node scripts/build-images.mjs --from-cache 不联网，只用 .image-cache/ 里已有的原图
 */
import { mkdir, readdir, readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(root, "src/content/docs");
const cacheDir = path.join(root, ".image-cache");
const outDir = path.join(root, "public/images/cdn");
const manifestFile = path.join(root, "src/data/image-manifest.json");

const WIDTHS = [480, 832, 1280, 1600];
const QUALITY = 72;

const IMAGE_PATTERN = /!\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)/g;
const HTML_IMAGE_PATTERN = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi;

/** 组件里写死的、不会被 markdown 扫描到的远程图片，附带各自的宽度档位。 */
const EXTRA_IMAGES = {
  // 页脚横幅：卡片式满宽裁切
  "https://pic1.imgdb.cn/i/034HC8xfJdk5i0JelBlVVz.jpg": {},
  // 头像：about 页 68px、首页 56px 显示，原图却有 800×800 / 278 KB
  "https://pic1.imgdb.cn/item/65c1c9269f345e8d03080e8d.jpg": { widths: [68, 136], sizes: "72px" },
  // 微信公众号二维码：about 页 170px 显示
  "https://pic1.imgdb.cn/i/034IJ9x5hhAP5kGdKSrV7l.jpg": { widths: [170, 340], sizes: "170px" },
};

const CONTENT_SIZES = "(max-width: 52rem) calc(100vw - 3rem), 52rem";

const force = process.argv.includes("--force");
const fromCache = process.argv.includes("--from-cache");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.mdx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

function collectUrls(source) {
  const urls = new Set();
  for (const match of source.matchAll(IMAGE_PATTERN)) urls.add(match[1].replace(/^<|>$/g, ""));
  for (const match of source.matchAll(HTML_IMAGE_PATTERN)) urls.add(match[1]);
  return [...urls].filter((url) => /^https?:\/\//.test(url) && !url.includes("/images/cdn/"));
}

async function mapWithConcurrency(items, limit, worker) {
  const results = [];
  let index = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current]);
    }
  });
  await Promise.all(runners);
  return results;
}

const keyOf = (url) => createHash("sha1").update(url).digest("hex").slice(0, 12);

/** 下载原图到 .image-cache/（按 url 哈希命名，扩展名从响应头推断）。 */
async function download(url) {
  if (fromCache) throw new Error("--from-cache: 缓存里没有这张图");
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(cacheDir, { recursive: true });
  const file = path.join(cacheDir, keyOf(url));
  await writeFile(file, buffer);
  return file;
}

async function originalPath(url) {
  const file = path.join(cacheDir, keyOf(url));
  if (existsSync(file)) {
    if (!force) return file;
    // --force 时忽略缓存，但网络失败仍可退回缓存
    try {
      return await download(url);
    } catch (error) {
      console.warn(`[images] reuse cache for ${url}: ${error.message}`);
      return file;
    }
  }
  return download(url);
}

/**
 * 把一张图压成多个宽度的 WebP。
 * 返回 null 表示这张图既不在缓存里也下载不到，调用方会退回原始 URL。
 */
async function optimize(url, config = {}) {
  const source = await originalPath(url);
  const image = sharp(source, { failOn: "none" });
  const meta = await image.metadata();
  if (!meta.width || !meta.height) throw new Error("missing dimensions");

  const requested = config.widths ?? WIDTHS;
  const key = keyOf(url);
  const widths = requested.filter((w) => w <= meta.width);
  // 请求的档位都比原图还大时，出一档原尺寸，否则 srcset 会是空的
  if (widths.length === 0) widths.push(meta.width);

  const unique = [...new Set(widths)].sort((a, b) => a - b);
  const sources = [];

  for (const width of unique) {
    const outName = `${key}-${width}.webp`;
    const outFile = path.join(outDir, outName);
    const height = Math.max(1, Math.round((meta.height / meta.width) * width));

    const upToDate =
      !force && existsSync(outFile) && (await stat(outFile)).mtimeMs >= (await stat(source)).mtimeMs;

    if (!upToDate) {
      await sharp(source, { failOn: "none" })
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(outFile);
    }

    const bytes = (await stat(outFile)).size;
    sources.push({ url: `/images/cdn/${outName}`, width, height, bytes });
  }

  const largest = sources[sources.length - 1];
  return {
    // 宽高取最大变体（与外层原图同比例），而不是原图尺寸：
    // 浏览器只拿得到最宽 1600px 的文件，报 2880 只会让占位盒看起来不准。
    width: largest.width,
    height: largest.height,
    // 兜底 src 用最大档；支持 srcset 的浏览器会按 sizes 自己挑
    src: largest.url,
    srcset: sources.map((s) => `${s.url} ${s.width}w`).join(", "),
    sizes: config.sizes ?? CONTENT_SIZES,
    originalBytes: (await stat(source)).size,
    optimizedBytes: sources.reduce((sum, s) => sum + s.bytes, 0),
  };
}

async function main() {
  const files = await walk(docsDir);
  const extra = Object.keys(EXTRA_IMAGES);
  const urls = new Set(extra);
  for (const file of files) {
    for (const url of collectUrls(await readFile(file, "utf8"))) urls.add(url);
  }

  await mkdir(outDir, { recursive: true });
  await mkdir(cacheDir, { recursive: true });

  const existing = existsSync(manifestFile) ? JSON.parse(await readFile(manifestFile, "utf8")) : {};
  const list = [...urls].sort();

  const results = await mapWithConcurrency(list, 5, async (url) => {
    const config = EXTRA_IMAGES[url] ?? {};
    const cached = existing[url];
    if (cached && !force) {
      const allThere = [cached.src, ...cached.srcset.split(", ").map((s) => s.split(" ")[0])].every(
        (p) => existsSync(path.join(root, "public", p)),
      );
      if (allThere) return [url, cached];
    }
    try {
      return [url, await optimize(url, config)];
    } catch (error) {
      console.warn(`[images] skip ${url}: ${error.message}`);
      return cached ? [url, cached] : null;
    }
  });

  const manifest = {};
  for (const entry of results) if (entry) manifest[entry[0]] = entry[1];

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(manifestFile, `${JSON.stringify(sorted, null, 2)}\n`);

  // 清理 manifest 里已经不存在的图片产物，避免 public/ 越积越多
  const keep = new Set();
  for (const entry of Object.values(sorted)) {
    keep.add(path.basename(entry.src));
    for (const item of entry.srcset.split(", ")) keep.add(path.basename(item.split(" ")[0]));
  }
  let removed = 0;
  for (const file of await readdir(outDir)) {
    if (!keep.has(file)) {
      await import("node:fs/promises").then((fs) => fs.rm(path.join(outDir, file)));
      removed += 1;
    }
  }

  const before = Object.values(sorted).reduce((sum, e) => sum + (e.originalBytes ?? 0), 0);
  const after = Object.values(sorted).reduce((sum, e) => sum + (e.optimizedBytes ?? 0), 0);
  console.log(
    `[images] ${Object.keys(sorted).length} images -> public/images/cdn/ ` +
      `(${(before / 1024 / 1024).toFixed(2)} MB 原图 / ${(after / 1024 / 1024).toFixed(2)} MB 全部变体, ${removed} stale removed)`,
  );
}

main().catch((error) => {
  // 与 refresh:bangumi 一致：图片优化失败不应让整个构建挂掉，
  // 保留现有 manifest（rehypeImageHints 会退回原始远程 URL）。
  console.error("[images] failed, keeping existing src/data/image-manifest.json:", error);
});
