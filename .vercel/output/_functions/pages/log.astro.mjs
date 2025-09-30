/* empty css                                 */
import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$MainCard } from '../chunks/MainCard_DU4c7EEu.mjs';
import { getCollection } from '../chunks/_astro_content_gv3P6M0L.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const logs = await getCollection("log");
  const sortedLogs = logs.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Logs" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MainCard", $$MainCard, { "title": "Logs", "description": "\u4E2A\u4EBA\u65F6\u95F4\u7EBF", "textOverlay": "LOGS", "infoIcon": "lucide:book-open" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-10 mb-8"> <section> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:clock", "class": "w-6 h-6 text-primary" })} <span>Timeline</span> </h2> <div class="bg-base-200 rounded-xl p-6 overflow-x-auto"> <div class="flex flex-col gap-8"> ${await Promise.all(
    sortedLogs.map(async (entry, i) => {
      const { Content } = await entry.render();
      return renderTemplate`<div class="relative flex gap-4 pb-2"> <!-- 时间轴左侧序号 --> <div class="flex flex-col items-center"> <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl"> ${i + 1} </div> <div class="w-0.5 flex-1 bg-base-300 mt-2"></div> </div> <!-- 日志内容摘要 --> <div class="flex-1"> <div class="text-sm text-base-content/60 mb-1"> ${entry.data.date.toISOString().slice(0, 10)} </div> <h3 class="text-lg font-bold">${entry.data.title}</h3> <article class="prose max-w-none text-base-content/80 mt-2 line-clamp-3"> ${renderComponent($$result3, "Content", Content, {})} </article> </div> <!-- 查看详情按钮 --> <div class="flex items-start"> <a${addAttribute(`/log/${entry.slug}/`, "href")} class="btn btn-sm btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:external-link", "class": "w-4 h-4" })}
查看详情
</a> </div> </div>`;
    })
  )} </div> </div> </section> </div> ` })} ` })}`;
}, "F:/Frosti/src/pages/log/index.astro", void 0);

const $$file = "F:/Frosti/src/pages/log/index.astro";
const $$url = "/log";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
