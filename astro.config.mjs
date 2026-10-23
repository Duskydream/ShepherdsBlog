import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
// @ts-check
import { defineConfig } from "astro/config";
import { slug as githubSlug } from "github-slugger";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import starlightThemeRapide from "starlight-theme-rapide";

// scripts/build-images.mjs 产出：远程图片的本地 WebP 变体 + srcset。
// 清单是提交进仓库的，所以 astro build 本身不需要联网。
const imageManifestPath = path.resolve(process.cwd(), "src/data/image-manifest.json");
const imageManifest = existsSync(imageManifestPath)
  ? JSON.parse(readFileSync(imageManifestPath, "utf8"))
  : {};

/** 构建期发现的、清单里没有的远程图片，收集起来一次性告警。 */
const unmappedImages = new Set();
if (process.env.NODE_ENV !== "development") {
  process.on("exit", () => {
    if (unmappedImages.size > 0) {
      console.warn(
        `[images] ${unmappedImages.size} 张远程图片不在 src/data/image-manifest.json 里，` +
          `将按原图直出（无 srcset）。运行 \`pnpm run refresh:images\` 补上：\n` +
          [...unmappedImages].map((url) => `  - ${url}`).join("\n"),
      );
    }
  });
}

/**
 * 扫描 src/content/docs 下每个 markdown/mdx 文件的 frontmatter `date`，
 * 建一张 “站点路径 → 发布日期” 的表，供 sitemap 的 serialize 使用。
 *
 * 构建期读文件是同步的，内容量很小（8 个文件），代价可忽略。
 */
function collectContentDates() {
  /** @type {Map<string, Date>} */
  const dates = new Map();
  const root = path.resolve(process.cwd(), "src/content/docs");
  if (!existsSync(root)) return dates;

  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith(".") || entry.startsWith("_")) continue;
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(md|mdx)$/.test(entry)) continue;

      const source = readFileSync(full, "utf8");
      const match = source.match(/^date:\s*(.+)$/m);
      if (!match) continue;

      const value = new Date(match[1].trim().replace(/^["']|["']$/g, ""));
      if (Number.isNaN(value.getTime())) continue;

      const slug = path
        .relative(root, full)
        .split(path.sep)
        .join("/")
        .replace(/\.(md|mdx)$/, "")
        .replace(/\/index$/, "")
        // Starlight 会把 slug 转成小写、并把空白折叠成连字符
        // （dist 里是 bfs初探、shoujo-in-eden、2025-10-18-revue-starlight），
        // 所以查表用的 key 也必须做同样的归一化，否则只有本来就全小写、
        // 无空格的文件名能命中。
        .toLowerCase()
        .replace(/\s+/g, "-");

      dates.set(`/${slug}/`, value);
    }
  };

  walk(root);
  return dates;
}

const contentDates = collectContentDates();

function addClass(node, className) {
  node.properties ??= {};
  const existing = node.properties.className;
  if (Array.isArray(existing)) {
    if (!existing.includes(className)) existing.push(className);
  } else if (typeof existing === "string" && existing.trim()) {
    const list = existing.trim().split(/\s+/);
    if (!list.includes(className)) list.push(className);
    node.properties.className = list;
  } else {
    node.properties.className = [className];
  }
}

function rehypeImageHints() {
  return (tree) => {
    let isFirstImage = true;

    const visit = (node) => {
      if (!node || typeof node !== "object") return;

      if (node.type === "element" && node.tagName === "p" && Array.isArray(node.children)) {
        // 识别行尾带 <br> 的诗句段落与包含图片的段落，构建期直接打上静态 class，
        // 避免在《二人称》等千段长文中对每个 <p> 运行复杂的 :has() 选择器匹配。
        let lastMeaningful = null;
        let hasMedia = false;
        for (const child of node.children) {
          if (child.type === "text" && !child.value.trim()) continue;
          lastMeaningful = child;
          if (child.type === "element" && (child.tagName === "img" || child.tagName === "picture")) {
            hasMedia = true;
          }
        }
        if (lastMeaningful?.type === "element" && lastMeaningful.tagName === "br") {
          addClass(node, "verse");
        }
        if (hasMedia) {
          addClass(node, "has-media");
        }
      }

      if (node.type === "element" && node.tagName === "img") {
        node.properties ??= {};
        if (isFirstImage) {
          isFirstImage = false;
          node.properties.loading ??= "eager";
          node.properties.fetchpriority ??= "high";
        } else {
          node.properties.loading ??= "lazy";
        }
        node.properties.decoding ??= "async";

        const original = node.properties.src;
        const entry = imageManifest[original];
        if (entry) {
          // 本地 WebP 变体：src 用最大档，浏览器按 sizes 从 srcset 里挑一档。
          node.properties.src = entry.src;
          node.properties.srcset = entry.srcset;
          node.properties.sizes = entry.sizes;
          node.properties.width ??= entry.width;
          node.properties.height ??= entry.height;
        } else if (/^https?:\/\//.test(original ?? "")) {
          unmappedImages.add(original);
        }
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}

/**
 * 把 Obsidian 风格的相对 markdown 链接（`[x](second-person.md)`）重写成
 * 站点路由（`/blog/second-person/`）。
 *
 * 为什么需要：vault 用 `.obsidian/app.json` 的 `useMarkdownLinks: true`，
 * 这样插图会写成 `![](path)` 而不是 Astro 不认的 `![[path]]`。
 * 但 Obsidian 写出来的内部链接是「相对路径 + .md 扩展名」，而 Astro 的
 * 默认 remark 插件集（含 GitHub 风格链接解析）在自定义 processor 下不会
 * 自动把 `.md` 改写成路由 —— 实测 `[x](second-person.md)` 直出成
 * `href="second-person.md"`，浏览器会 404。
 *
 * 这里做最小改写：只在「相对路径 + .md/.mdx 结尾 + 文件真实存在」时
 * 换算成 Starlight 的绝对路由，其余链接原样放过（外链、锚点、已经是
 * 绝对路径的都不动）。
 */
function remarkRewriteObsidianLinks() {
  const docsRoot = path.resolve(process.cwd(), "src/content/docs");

  /** 与 collectContentDates() 保持一致的 slug 归一化：小写 + 空白折叠成连字符。 */
  const toRoute = (absFile) => {
    const rel = path.relative(docsRoot, absFile).split(path.sep).join("/");
    const slug = rel
      .replace(/\.(md|mdx)$/, "")
      .replace(/\/index$/, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
    return `/${slug}/`;
  };

  /**
   * 把 Obsidian 写的标题原文（`#DFS -> 利用栈...`）转成页面里真实的 id。
   *
   * Astro 的标题 id 来自 github-slugger（`node_modules/astro/dist/content/utils.js:5`
   * `import { slug as githubSlug } from "github-slugger"`），它会去掉标点、
   * 空格换连字符、转小写：`## 举例` → `id="举例"`，
   * `## DFS -> 利用栈的天然回溯性质，走到死路自动回头` →
   * `id="dfs---利用栈的天然回溯性质走到死路自动回头"`。
   * Obsidian 写的锚点却是标题原文，不改写就全部点不到。
   *
   * 对已经是 slug 的锚点是幂等的（小写、无空格、无标点 → 输出不变），
   * 所以 `#top` 这类手写锚点不受影响。
   */
  const toAnchor = (hash) => {
    if (!hash || hash === "#") return hash;
    let text = hash.slice(1);
    try {
      // Obsidian 也可能写成 `#Heading%20Text`，先解码再 slug。
      text = decodeURIComponent(text);
    } catch {
      // 畸形百分号转义：按原样处理。
    }
    return `#${githubSlug(text)}`;
  };

  return (tree, file) => {
    const sourceFile = file?.history?.[0] ?? file?.path;
    if (!sourceFile) return;

    const walk = (node) => {
      if (!node || typeof node !== "object") return;

      if (node.type === "link" && typeof node.url === "string") {
        const url = node.url;
        const [pathname, hash = ""] = url.split(/(?=#)/);
        // 只处理相对路径，且路径部分必须带 .md/.mdx 扩展名。
        // 注意扩展名要在 hash 之前判断：`[x](a.md#标题)` 的 url 以 `#标题`
        // 结尾，拿整个 url 做 /\\.mdx?$/ 测试会漏掉带锚点的链接。
        const isRelative = !/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(pathname);
        if (isRelative && /\.mdx?$/i.test(pathname)) {
          let decoded = pathname;
          try {
            decoded = decodeURIComponent(pathname);
          } catch {
            // 畸形百分号转义：保持原样，下面的 existsSync 会放过它。
          }
          const target = path.resolve(path.dirname(sourceFile), decoded);
          if (existsSync(target)) node.url = toRoute(target) + toAnchor(hash);
        } else if (pathname === "") {
          // 同页锚点 `[x](#标题)`：Obsidian 同样写标题原文。
          node.url = toAnchor(hash);
        }
      }

      node.children?.forEach(walk);
    };

    walk(tree);
  };
}

export default defineConfig({
  site: "https://www.lxzm.space",
  // Avoid fetching every visible navigation target up front. Hover prefetch keeps
  // navigation feeling instant without competing with the current page's assets.
  prefetch: { defaultStrategy: "hover" },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkRewriteObsidianLinks],
      rehypePlugins: [rehypeKatex, rehypeImageHints],
    }),
  },
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: "祈りの花庭",
      disable404Route: true,
      components: {
        Head: './src/components/Head.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        Header: './src/components/Header.astro',
        PageFrame: './src/components/PageFrame.astro',
        TwoColumnContent: './src/components/TwoColumnContent.astro',
        PageSidebar: './src/components/PageSidebar.astro',
        Sidebar: './src/components/Sidebar.astro',
        Footer: './src/components/Footer.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        PageTitle: './src/components/PageTitle.astro',
        MobileTableOfContents: './src/components/MobileTableOfContents.astro',
        TableOfContents: './src/components/TableOfContents.astro',
        MobileMenuFooter: './src/components/MobileMenuFooter.astro',
      },
      tableOfContents: {
        // Starlight 默认就只收 h2–h3。这里原来写的是 1–6，把所有层级都塞进
        // 侧栏目录：second-person 一页就变成 33 条，把右侧栏撑到需要滚动。
        // 回到 2–3 之后与 Starlight 默认一致，长文目录保持可扫视。
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },

      customCss: ["./src/styles/custom.css"],
      description: "Inori no Hananiwa · The Garden of Prayer",
      defaultLocale: "zh",
      locales: {
        root: { label: "简体中文", lang: "zh-CN" },
      },
      social: [
        {
          icon: "github",
          href: "https://github.com/Duskydream",
          label: "GitHub",
        },
        {
          icon: "telegram",
          href: "https://t.me/inorinohananiwa",
          label: "Telegram",
        },
        { icon: "rss", href: "/rss.xml", label: "RSS Feed" },
      ],
      sidebar: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Essay",
          collapsed: false,
          autogenerate: { directory: "blog" },
        },
        {
          label: "Notes",
          collapsed: false,
          autogenerate: { directory: "coding-notes" },
        },
        {
          label: "Log",
          collapsed: false,
          autogenerate: { directory: "log" },
        },
        {
          label: "Anime",
          link: "/anime",
        },
        {
          label: "About",
          link: "/about",
        },
        {
          label: "Links",
          link: "/links",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/Duskydream/ShepherdsBlog/tree/main/",
      },
      lastUpdated: true,
    }),
    mdx({
      optimize: true,
      // remarkMath / rehypeKatex / rehypeImageHints come from the shared
      // `markdown.processor` above via `extendMarkdownConfig` (default true),
      // so repeating them here would double-apply the plugins.
    }),
    // Starlight 默认会注册一个不带 serialize 的 @astrojs/sitemap
    // （见 node_modules/@astrojs/starlight/index.ts:101 —— 如果 integrations 里
    // 已经有 @astrojs/sitemap，它就不再重复添加）。在这里显式注册就能拿到
    // serialize 钩子，给每篇文章补上 <lastmod>；站点是单语言（root locale），
    // 所以不需要 Starlight 的 i18n sitemap 配置。
    sitemap({
      serialize(item) {
        // sitemap 里的 URL 是 percent-encoded 的（中文 slug、含空格的文件名），
        // 而表里的 key 是解码后的路径，所以查表前要先 decodeURIComponent。
        const pathname = decodeURIComponent(new URL(item.url).pathname);
        const lastmod = contentDates.get(pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
