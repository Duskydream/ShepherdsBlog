import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1200, H = 630;
const font = 'sans-serif';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}">
      <stop offset="0%" stop-color="#0f1115"/>
      <stop offset="55%" stop-color="#161a21"/>
      <stop offset="100%" stop-color="#1d232c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.22" r="0.62">
      <stop offset="0%" stop-color="#4a7fb5" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#4a7fb5" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5f8fc2" stop-opacity="0.05"/>
      <stop offset="45%" stop-color="#5f8fc2" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#356b9d" stop-opacity="0.05"/>
    </linearGradient>
    <g id="petal">
      <path d="M 0 0 C -26 18 -55 18 -78 0 C -55 -18 -26 -18 0 0 Z" fill="#5f8fc2" opacity="0.85"/>
    </g>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- 左上角五瓣花 -->
  <g transform="translate(92 96) scale(0.62)">
    <use href="#petal"/>
    <use href="#petal" transform="rotate(72)"/>
    <use href="#petal" transform="rotate(144)"/>
    <use href="#petal" transform="rotate(216)"/>
    <use href="#petal" transform="rotate(288)"/>
    <circle r="13" fill="#8fb2da"/>
  </g>

  <!-- 花茎 -->
  <path d="M 92 132 C 92 300 92 400 92 500" stroke="url(#vine)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <g opacity="0.5" fill="#356b9d">
    <path d="M 92 300 C 66 288 46 268 36 244 C 62 252 84 272 92 300 Z"/>
    <path d="M 92 372 C 118 362 138 344 150 322 C 124 330 100 348 92 372 Z"/>
  </g>

  <!-- 文字 -->
  <text x="200" y="292" font-family="${font}" font-size="82" font-weight="600" fill="#f0f3f7" letter-spacing="2">祈りの花庭</text>
  <text x="200" y="352" font-family="${font}" font-size="30" fill="#8fb2da" letter-spacing="6">INORI NO HANANIWA</text>
  <rect x="200" y="384" width="86" height="3" rx="1.5" fill="#5f8fc2" opacity="0.7"/>
  <text x="200" y="446" font-family="${font}" font-size="30" fill="#9aa5b1">The Garden of Prayer</text>
  <text x="200" y="524" font-family="${font}" font-size="24" fill="#6b7683">www.lxzm.space</text>
</svg>`;

mkdirSync('public/images', { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9, quality: 92 }).toFile('public/images/og-default.png');
console.log('wrote public/images/og-default.png');
