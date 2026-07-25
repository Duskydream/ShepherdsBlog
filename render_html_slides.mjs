import fs from "node:fs/promises";

const out = "F:/Temp/codex-presentations/presentation-html-conversion/tmp/html-renders";
const source = await fs.readFile("F:/Starlight/public/presentation.html", "utf8");
await fs.mkdir(out, { recursive: true });
for (let i = 0; i < 9; i += 1) {
  const stateScript = `<style>.nav-bar { display: none !important; }</style><script>
    const sourceSlides = [...document.querySelectorAll('.slide')];
    sourceSlides.forEach((slide, n) => slide.classList.toggle('active', n === ${i}));
    document.getElementById('counter').textContent = '${i + 1} / ' + sourceSlides.length;
    document.getElementById('slideNum').textContent = '${i + 1} / ' + sourceSlides.length;
    document.getElementById('progress').style.width = '${((i + 1) / 9) * 100}%';
  </script>`;
  await fs.writeFile(`${out}/slide-${i + 1}.html`, source.replace("</body>", `${stateScript}</body>`));
}
