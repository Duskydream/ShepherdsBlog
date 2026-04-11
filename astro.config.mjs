import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";
import starlightThemeRapide from "starlight-theme-rapide";

export default defineConfig({
  site: "https://duskydream.icu",
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: "Shepherd's Blog",
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
        { icon: "x.com", href: "https://x.com/Lxzm1211", label: "X (Twitter)" },
      ],
      sidebar: [
        {
          label: "Blog",
          autogenerate: { directory: "blog", collapsed: false },
        },
        {
          label: "Coding Notes",
          autogenerate: { directory: "coding-notes", collapsed: false },
        },
        {
          label: "Log",
          autogenerate: { directory: "log", collapsed: false },
        },
        {
          label: "Apps",
          items: [{ label: "GPA Calculator", link: "/apps/gpa" }],
        },
        {
          label: "Anime",
          link: "/anime",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/Duskydream/Frosti/edit/main/Starlight/",
      },
      lastUpdated: true,
    }),
  ],
});
