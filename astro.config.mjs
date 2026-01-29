import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import terser from "@rollup/plugin-terser";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";

import remarkMath from "remark-math";

import { CODE_THEME, USER_SITE } from "./src/config.ts";

import updateConfig from "./src/integration/updateConfig.ts";

import { remarkReadingTime } from "./src/plugins/remark-reading-time";

// https://astro.build/config
export default defineConfig({
  site: USER_SITE,
  output: "static",

  // 环境变量配置
  env: {
    schema: {
      BLOG_ENCRYPT_PASSWORD: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },

  style: {
    scss: {
      includePaths: ["./src/styles"],
    },
  },

  integrations: [
    updateConfig(),
    expressiveCode({
      themes: [CODE_THEME],
      plugins: [],
      defaultProps: {
        showLineNumbers: true,
        overridesByLang: {
          'js,jsx,ts,tsx': {
            showLineNumbers: true,
          },
          'python': {
            showLineNumbers: true,
          },
          'bash,sh,shell': {
            showLineNumbers: false,
          },
        },
      },
    }),
    mdx(),
    icon(),
    terser({
      compress: true,
      mangle: true,
    }),
    sitemap(),
    tailwind({
      configFile: "./tailwind.config.mjs",
    }),
    playformCompress(),
  ],

  markdown: {
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: "↗" },
        },
      ],
    ],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },

  // adapter removed (migrated from Vercel to Tencent EdgeOne); using default static build

  redirects: {
    "/about": "/",
  },
});
