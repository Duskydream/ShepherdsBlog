import starlight from "@astrojs/starlight";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
// @ts-check
import { defineConfig } from "astro/config";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import starlightThemeRapide from "starlight-theme-rapide";

const imageSizesPath = path.resolve(process.cwd(), "src/data/image-sizes.json");
const imageSizes = existsSync(imageSizesPath)
  ? JSON.parse(readFileSync(imageSizesPath, "utf8"))
  : {};

function rehypeImageHints() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== "object") return;

      if (node.type === "element" && node.tagName === "img") {
        node.properties ??= {};
        node.properties.loading ??= "lazy";
        node.properties.decoding ??= "async";
        const size = imageSizes[node.properties.src];
        if (size) {
          node.properties.width ??= size.width;
          node.properties.height ??= size.height;
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
        minHeadingLevel: 1,
        maxHeadingLevel: 6,
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
  ],
});
