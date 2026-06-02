import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { friendLinks } from './src/data/friend-links.js';
import starlightThemeRapide from "starlight-theme-rapide";

export default defineConfig({
  site: "https://duskydream.icu",
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: "Shepherd's Blog",
      components: {
        Sidebar: './src/components/Sidebar.astro',
        Footer: './src/components/Footer.astro',
      },
      tableOfContents: {
        minHeadingLevel: 1,
        maxHeadingLevel: 6,
      },
      customCss: ["./src/styles/custom.css"],
      description: "櫻の森の上を舞う",
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
        { icon: "rss", href: "/rss.xml", label: "RSS Feed" },
      ],
      sidebar: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Blog",
          collapsed: false,
          autogenerate: { directory: "blog" },
        },
        {
          label: "Coding Notes",
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
          label: "Links",
          collapsed: true,
          items: friendLinks,
        },
      ],
      editLink: {
        baseUrl: "https://github.com/Duskydream/Frosti/edit/main/Starlight/",
      },
      lastUpdated: true,
    }),
  ],
});
