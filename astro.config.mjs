import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
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
        Head: './src/components/Head.astro',
        PageFrame: './src/components/PageFrame.astro',
        TwoColumnContent: './src/components/TwoColumnContent.astro',
        PageSidebar: './src/components/PageSidebar.astro',
        Sidebar: './src/components/Sidebar.astro',
        Footer: './src/components/Footer.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        PageTitle: './src/components/PageTitle.astro',
        MobileTableOfContents: './src/components/MobileTableOfContents.astro',
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
          label: "Article",
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
          link: "/links",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/Duskydream/ShepherdsBlog/tree/main/",
      },
      lastUpdated: true,
    }),
  ],
});
