/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, d as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$MainCard } from '../chunks/MainCard_DU4c7EEu.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://duskydream.icu");
const prerender = false;
const $$Anime = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Anime;
  const username = "851657";
  const baseUrl = `https://api.bgm.tv/v0/users/${username}/collections`;
  async function fetchCollection(type) {
    let page = 1;
    const limit = 30;
    let allData = [];
    try {
      while (true) {
        const res = await fetch(`${baseUrl}?type=${type}&limit=${limit}&offset=${(page - 1) * limit}`, {
          headers: { "User-Agent": "AstroBlog/1.0 (https://yourblog.com)" }
        });
        if (!res.ok) break;
        const data = await res.json();
        if (!data.data || data.data.length === 0) break;
        allData = allData.concat(data.data);
        if (data.data.length < limit) break;
        page++;
      }
    } catch (e) {
      console.error(e);
    }
    return allData;
  }
  const watching = await fetchCollection(3);
  const wish = await fetchCollection(1);
  const watched = await fetchCollection(2);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u6211\u7684\u8FFD\u756A" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MainCard", $$MainCard, { "title": "Anime", "description": "\u8FFD\u756A\u8BB0\u5F55", "textOverlay": "Anime", "infoIcon": "lucide:tv" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([" ", '<div class="space-y-8 mb-8 max-w-7xl mx-auto px-4"> <!-- \u641C\u7D22 & Tabs --> <div class="flex flex-col md:flex-row items-center justify-between gap-4"> <input type="text" id="search" placeholder="\u641C\u7D22\u756A\u5267..." class="px-4 py-2 w-full md:w-64 rounded-full border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"> <div class="flex gap-2"> <button data-tab="watching" class="tab-btn px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow">\u5728\u770B</button> <button data-tab="wish" class="tab-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold">\u60F3\u770B</button> <button data-tab="watched" class="tab-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold">\u770B\u8FC7</button> </div> </div> <!-- Tabs \u5185\u5BB9\u5BB9\u5668\uFF0C\u7EDF\u4E00\u6805\u683C --> ', ' </div> <script type="module">\n      const tabs = document.querySelectorAll(".tab-btn");\n      const contents = [\n        document.getElementById("content-watching"),\n        document.getElementById("content-wish"),\n        document.getElementById("content-watched"),\n      ];\n      const searchInput = document.getElementById("search");\n\n      // Tabs \u5207\u6362\n      tabs.forEach((btn) => {\n        btn.addEventListener("click", () => {\n          const target = btn.dataset.tab;\n          tabs.forEach((b) => b.classList.remove("bg-blue-600", "text-white", "shadow"));\n          tabs.forEach((b) => b.classList.add("bg-gray-200", "text-gray-700"));\n          btn.classList.add("bg-blue-600", "text-white", "shadow");\n          contents.forEach((c) => c.classList.add("hidden"));\n          if (target === "watching") contents[0].classList.remove("hidden");\n          if (target === "wish") contents[1].classList.remove("hidden");\n          if (target === "watched") contents[2].classList.remove("hidden");\n          filterCards();\n        });\n      });\n\n      // \u641C\u7D22\u8FC7\u6EE4\n      searchInput.addEventListener("input", filterCards);\n      function filterCards() {\n        const term = searchInput.value.toLowerCase();\n        const activeContent = contents.find((c) => !c.classList.contains("hidden"));\n        if (!activeContent) return;\n        const cards = activeContent.querySelectorAll(".card");\n        cards.forEach((card) => card.classList.toggle("hidden", !(card.dataset.name || "").includes(term)));\n      }\n    <\/script> '])), maybeRenderHead(), ["watching", "wish", "watched"].map((tab) => renderTemplate`<div${addAttribute(`content-${tab}`, "id")}${addAttribute(`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ${tab !== "watching" ? "hidden" : ""}`, "class")}> ${(tab === "watching" ? watching : tab === "wish" ? wish : watched).map((item) => renderTemplate`<div class="card bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition overflow-hidden text-center"${addAttribute((item.subject.name_cn || item.subject.name).toLowerCase(), "data-name")}> ${item.subject.images?.common && renderTemplate`<a${addAttribute(`https://bgm.tv/subject/${item.subject.id}`, "href")} target="_blank" rel="noopener noreferrer"> <img${addAttribute(item.subject.images.common, "src")}${addAttribute(item.subject.name_cn || item.subject.name, "alt")} class="w-full h-48 md:h-56 lg:h-60 object-cover rounded-t-xl" loading="lazy"> </a>`} <h3 class="mt-2 text-sm font-medium truncate px-2">${item.subject.name_cn || item.subject.name}</h3> ${item.subject.date && renderTemplate`<p class="text-xs text-gray-500 mb-2">${item.subject.date}</p>`} </div>`)} </div>`)) })} ` })}`;
}, "F:/Frosti/src/pages/anime.astro", void 0);

const $$file = "F:/Frosti/src/pages/anime.astro";
const $$url = "/anime";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Anime,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
