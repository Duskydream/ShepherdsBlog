import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
// @ts-check
import { defineConfig } from "astro/config";
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

function rehypeImageHints() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== "object") return;

      if (node.type === "element" && node.tagName === "img") {
        node.properties ??= {};
        node.properties.loading ??= "lazy";
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

export default defineConfig({
  site: "https://www.lxzm.space",
  // Avoid fetching every visible navigation target up front. Hover prefetch keeps
  // navigation feeling instant without competing with the current page's assets.
  prefetch: { defaultStrategy: "hover" },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
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
