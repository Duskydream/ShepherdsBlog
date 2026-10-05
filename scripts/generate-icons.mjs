// 由 public/favicon.svg 生成 apple-touch-icon（PNG，180x180）与 social 图，
// 顺便产出站点 manifest 用的 192/512 图标。SVG 自���不支持 apple-touch-icon，
// 而 Starlight 只发一个 <link rel="shortcut icon">，iOS 加到主屏时会退回默认图标。
import sharp from "sharp";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";

const favicon = readFileSync("public/favicon.svg");
mkdirSync("public/images", { recursive: true });

// SVG 是透明底；iOS 会把它压在黑底上，所以先铺一层品牌深色底
function withBackdrop(size) {
  const inner = favicon.toString().replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const pad = Math.round(size * 0.12);
  const s = size - pad * 2;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="#161a21"/>
      <g transform="translate(${pad} ${pad}) scale(${s / 128})" fill="#7093c8">${inner}</g>
    </svg>`,
  );
}

await sharp(withBackdrop(180)).png().toFile("public/images/apple-touch-icon.png");
await sharp(withBackdrop(192)).png().toFile("public/images/icon-192.png");
await sharp(withBackdrop(512)).png().toFile("public/images/icon-512.png");

writeFileSync(
  "public/site.webmanifest",
  `${JSON.stringify(
    {
      name: "祈りの花庭",
      short_name: "花庭",
      description: "Inori no Hananiwa · The Garden of Prayer",
      start_url: "/",
      display: "standalone",
      background_color: "#161a21",
      theme_color: "#161a21",
      icons: [
        { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  )}\n`,
);

console.log("[icons] wrote apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest");
