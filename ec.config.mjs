import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  plugins: [pluginLineNumbers()],
  styleOverrides: {
    codeFontSize: '0.92rem',
    uiFontSize: '0.9rem',
    codeFontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
  },
});
