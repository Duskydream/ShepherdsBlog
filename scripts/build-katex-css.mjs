// 从 katex 官方 dist 里挑出"实际用得到的 face + 布局规则"，生成 src/styles/katex.css。
//
// 为什么手写而不是直接 @import "katex/dist/katex.min.css"：
// 那份文件带 12 个字体家族 / 60 个 woff2，全站 27 页都要下载解析 ≈ 1 MB。
// 本博客只有 2 篇文章有公式，按 dist 产物里实际出现的 class 反查，真正命中的
// face 只有 5 个（Main / Math / AMS / Size1 / Size3）。
//
// 维护：升级 katex 后重跑 `node scripts/build-katex-css.mjs`，脚本会自动从
// node_modules/katex/dist 里把对应规则原样抽出来，不需要手抄。
import { readFile, writeFile, readdir, mkdir, rm, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outCss = path.join(root, "src/styles/katex.css");
const outFonts = path.join(root, "src/styles/fonts");
const srcFonts = path.join(root, "node_modules/katex/dist/fonts");

// 需要保留的 face。删任何一个之前，先确认 dist 里没有内容命中它对应的 class：
//   KaTeX_Main   ← .katex 基线（数字 / = / { } / , 全部走这里）
//   KaTeX_Math   ← .mathnormal（O(n) / i / n / S / f 这类变量）
//   KaTeX_AMS    ← .amsrm（\varnothing 的 ∅。删了会掉回 Times 的字形）
//   KaTeX_Size1  ← .op-symbol.small-op（\sum）
//   KaTeX_Size3  ← .sizing.reset-size6.size3（\sum 的下标 (2)）
const FACES = [
  { family: "KaTeX_Main", style: "normal", weight: 400, file: "KaTeX_Main-Regular" },
  { family: "KaTeX_Math", style: "italic", weight: 400, file: "KaTeX_Math-Italic" },
  { family: "KaTeX_AMS", style: "normal", weight: 400, file: "KaTeX_AMS-Regular" },
  { family: "KaTeX_Size1", style: "normal", weight: 400, file: "KaTeX_Size1-Regular" },
  // Size3 只用在一个下标上，但 .sizing.reset-size6.size3 规则必须能解析到这个
  // family，所以 @font-face 保留、字体文件删掉，数据内联成 data URI（见下）。
  { family: "KaTeX_Size3", style: "normal", weight: 400, file: "KaTeX_Size3-Regular", inline: true },
];

// 被丢掉的 face。留着这段是为了让下一个人知道它们是"有意删的"，以及要恢复需要补什么。
const DROPPED = {
  "KaTeX_Main-Bold": "\\mathbf",
  "KaTeX_Main-Italic": "\\mathit",
  "KaTeX_Main-BoldItalic": "\\boldsymbol",
  "KaTeX_Math-BoldItalic": "\\boldsymbol",
  "KaTeX_Size2-Regular": "\\sum 的大号版本（.op-symbol.large-op）",
  "KaTeX_Size4-Regular": "\\sum\\limits 的大号版本",
  "KaTeX_SansSerif": "\\mathsf / \\text",
  "KaTeX_Typewriter": "\\mathtt / \\texttt",
  "KaTeX_Caligraphic": "\\mathcal",
  "KaTeX_Fraktur": "\\mathfrak",
  "KaTeX_Script": "\\mathscr",
};

/** 把一段扁平 CSS 拆成顶层块（规则 / @media / @font-face / @keyframes 都算原子块）。 */
function splitTopLevel(css) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        out.push(css.slice(start, i + 1).trim());
        start = i + 1;
      }
    } else if (ch === ";" && depth === 0) {
      out.push(css.slice(start, i + 1).trim());
      start = i + 1;
    }
  }
  if (css.slice(start).trim()) out.push(css.slice(start).trim());
  return out;
}

/** @font-face -> {family, style, weight}。family 名里含数字（KaTeX_Size1），正则不能只写字母。 */
function faceKeyOf(rule) {
  const family = /font-family:"?(KaTeX_[A-Za-z0-9]+)"?/.exec(rule)?.[1];
  if (!family) return null;
  return {
    family,
    style: /font-style:(\w+)/.exec(rule)?.[1] ?? "normal",
    weight: /font-weight:(\d+)/.exec(rule)?.[1] ?? "400",
  };
}

async function main() {
  const pkg = JSON.parse(await readFile(path.join(root, "node_modules/katex/package.json"), "utf8"));
  const src = await readFile(path.join(root, "node_modules/katex/dist/katex.min.css"), "utf8");
  const rules = splitTopLevel(src);

  const faceRules = [];
  const bodyRules = [];
  const dropped = new Set();

  for (const rule of rules) {
    if (!rule.startsWith("@font-face")) {
      bodyRules.push(rule);
      continue;
    }
    const key = faceKeyOf(rule);
    const match =
      key &&
      FACES.find((f) => f.family === key.family && f.style === key.style && String(f.weight) === String(key.weight));
    if (!match) {
      if (key) dropped.add(`${key.family}${key.style === "italic" ? " Italic" : ""}/${key.weight}`);
      continue;
    }
    const face = match.inline
      ? // 内联 face：把 woff2 换成 data URI，省掉一个 HTTP 请求（也省掉一个文件）。
        // 先把三连回退摘成只剩 woff2，再替换那个唯一的 URL，否则会拼出
        // `format("woff2") format("woff2")` 这种重复声明。
        stripLegacyFallbacks(rule).replace(
          /url\([^)]*\.woff2\)/,
          `url(data:font/woff2;base64,${(await readFile(path.join(srcFonts, `${match.file}.woff2`))).toString("base64")})`,
        )
      : stripLegacyFallbacks(rule);
    faceRules.push(face);
  }

  const resolvedFaceRules = faceRules;

  // katex.min.css 的每个 src 都是 woff2/woff/ttf 三连回退。我们只随包分发 woff2
  // （2026 年没有任何需要 woff/ttf 的浏览器），所以把后两项摘掉：留着它们会让
  // 构建期报一堆 “fonts/…woff didn't resolve” 警告，且真要触发时是 404。
  function stripLegacyFallbacks(css) {
    return css.replace(
      /src:url\(([^)]*\.woff2)\)(\s*format\(["']woff2["']\))?,[^;}]*/g,
      (_match, url, fmt) => `src:url(${url})${fmt ?? ' format("woff2")'}`,
    );
  }

  // 字体文件：拷贝需要的（内联的跳过），其余不入库
  await rm(outFonts, { recursive: true, force: true });
  await mkdir(outFonts, { recursive: true });
  const written = [];
  for (const f of FACES) {
    if (f.inline) continue;
    const from = path.join(srcFonts, `${f.file}.woff2`);
    if (!existsSync(from)) {
      console.warn(`[katex] katex@${pkg.version} has no ${f.file}.woff2`);
      continue;
    }
    await copyFile(from, path.join(outFonts, `${f.file}.woff2`));
    written.push(f.file);
  }

  const header =
    `/* KaTeX subset generated from katex@${pkg.version} (dist/katex.min.css).\n` +
    ` * Shipped: ${FACES.map((f) => f.family).join(", ")}${FACES.some((f) => f.inline) ? " (Size3 inlined as data URI)" : ""}\n` +
    ` * Dropped ${[...dropped].length} faces (${Object.keys(DROPPED).join(", ")}) - restore by editing FACES above.\n` +
    ` * DO NOT EDIT BY HAND - run: node scripts/build-katex-css.mjs\n` +
    ` */\n`;

  await writeFile(outCss, `${header}${resolvedFaceRules.join("")}\n${bodyRules.join("")}\n`);

  const files = await readdir(outFonts);
  const bytes = (await Promise.all(files.map((n) => stat(path.join(outFonts, n))))).reduce((n, s) => n + s.size, 0);
  const cssBytes = Buffer.byteLength(header + faceRules.join("") + "\n" + bodyRules.join("") + "\n");
  console.log(
    `[katex] katex@${pkg.version}: ${faceRules.length} @font-face kept, ${dropped.size} dropped; ` +
      `${bodyRules.length} rules; katex.css = ${(cssBytes / 1024).toFixed(1)} KB; ` +
      `${files.length} woff2 = ${(bytes / 1024).toFixed(1)} KB [${written.join(", ")}]`,
  );
}

main().catch((error) => {
  console.error("[katex] failed:", error);
  process.exitCode = 1;
});