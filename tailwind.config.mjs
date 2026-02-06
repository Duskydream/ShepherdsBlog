/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from "@iconify/tailwind";
import typography from "@tailwindcss/typography";
import daisyUI from "daisyui";
import { SITE_THEME } from "./src/config";

export default {
  darkMode: ["attribute", "[data-theme-type=\"dark\"]"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  safelist: [
    "alert",
    "alert-info",
    "alert-success",
    "alert-warning",
    "alert-error",
  ],
  plugins: [daisyUI, typography, addDynamicIconSelectors()],
  daisyui: {
    themes: [
      {
        notion: {
          "primary": "#0f1720",
          "secondary": "#6b7280",
          "accent": "#0f1720",
          "neutral": "#111827",
          "base-100": "#ffffff",
          "base-200": "#f6f6f6",
          "base-300": "#efefef",
          "base-content": "#0f1720",
          "info": "#0f1720",
          "success": "#0f1720",
          "warning": "#0f1720",
          "error": "#0f1720",
        },
      },
    ],
    darkTheme: "notion",
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
