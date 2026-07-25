import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PptxGenJS = require("pptxgenjs");
const pptx = new PptxGenJS();

pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.subject = "程序设计实践课程学习总结";
pptx.title = "从 AC 到体系";
pptx.company = "Starlight";
pptx.lang = "zh-CN";
pptx.theme = {
  headFontFace: "Microsoft YaHei",
  bodyFontFace: "Microsoft YaHei",
  lang: "zh-CN",
};
pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333333, height: 7.5 });
pptx.layout = "CUSTOM_WIDE";

const renders = "F:/Temp/codex-presentations/presentation-html-conversion/tmp/html-renders";
for (let i = 1; i <= 9; i += 1) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };
  slide.addImage({ path: `${renders}/slide-${i}.png`, x: 0, y: 0, w: 13.333333, h: 7.5 });
}

await pptx.writeFile({ fileName: "F:/Starlight/public/presentation.pptx" });
