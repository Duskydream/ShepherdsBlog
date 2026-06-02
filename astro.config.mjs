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
        Sidebar: './src/components/Sidebar.astro',
        Footer: './src/components/Footer.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        PageTitle: './src/components/PageTitle.astro',
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
      head: [
        {
          tag: "script",
          content: `
            (() => {
              let frame = 0;
              let mouseX = "80vw";
              let mouseY = "20vh";

              function applyPointerPosition() {
                frame = 0;
                document.documentElement.style.setProperty("--mouse-x", mouseX);
                document.documentElement.style.setProperty("--mouse-y", mouseY);
              }

              document.addEventListener("mousemove", (event) => {
                if (document.documentElement.dataset.routeTransition === "active") return;
                mouseX = event.clientX + "px";
                mouseY = event.clientY + "px";
                if (!frame) frame = requestAnimationFrame(applyPointerPosition);
              }, { passive: true });

              document.addEventListener("astro:before-preparation", () => {
                document.documentElement.dataset.routeTransition = "active";
              });
              document.addEventListener("astro:page-load", () => {
                requestAnimationFrame(() => {
                  delete document.documentElement.dataset.routeTransition;
                });
              });
            })();
          `,
        },
      ],
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
