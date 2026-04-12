import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";
import fs from "node:fs";
import path from "node:path";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { friendLinks } from './src/data/friend-links.js';
import starlightThemeRapide from "starlight-theme-rapide";

const DOCS_ROOT = path.resolve("src/content/docs");
function parseDateFromFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const dateMatch = match[1].match(/^date:\s*([^\r\n]+)$/m);
  if (!dateMatch) return null;

  const timestamp = new Date(dateMatch[1].trim()).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

function filenameToSlug(fileName) {
  const stem = fileName.replace(/\.md$/i, "");
  return stem
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildSidebarItems(directory) {
  const directoryPath = path.join(DOCS_ROOT, directory);
  const entries = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md")
    .map((entry) => {
      const filePath = path.join(directoryPath, entry.name);
      return {
        slug: `${directory}/${filenameToSlug(entry.name)}`,
        timestamp: parseDateFromFrontmatter(filePath),
      };
    })
    .filter((entry) => entry.timestamp !== null)
    .sort((left, right) => {
      if (left.timestamp !== right.timestamp) return right.timestamp - left.timestamp;
      return left.slug.localeCompare(right.slug, "zh-CN");
    });

  return entries.map((entry) => ({ slug: entry.slug }));
}

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
        { icon: "x.com", href: "https://x.com/Lxzm1211", label: "X (Twitter)" },
      ],
      sidebar: [
        {
          label: "Blog",
          collapsed: false,
          items: buildSidebarItems("blog"),
        },
        {
          label: "Coding Notes",
          collapsed: false,
          items: buildSidebarItems("coding-notes"),
        },
        {
          label: "Log",
          collapsed: false,
          items: buildSidebarItems("log"),
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
