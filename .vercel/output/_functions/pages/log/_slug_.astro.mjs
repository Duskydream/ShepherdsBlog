/* empty css                                    */
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$MainCard } from '../../chunks/MainCard_DU4c7EEu.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://duskydream.icu");
async function getStaticPaths() {
  const { getCollection } = await import('../../chunks/_astro_content_gv3P6M0L.mjs');
  const logs = await getCollection("log");
  return logs.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": entry.data.title, "isPost": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MainCard", $$MainCard, { "title": entry.data.title, "description": entry.data.date.toISOString().slice(0, 10), "textOverlay": "LOG", "infoIcon": "lucide:book-open" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <!-- 标题 --> <section> <h1 class="text-3xl font-bold mb-2">${entry.data.title}</h1> <p class="text-base-content/60 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:calendar", "class": "w-4 h-4" })} ${entry.data.date.toISOString().slice(0, 10)} </p> </section> <!-- 正文 --> <section> <article class="prose max-w-none text-base-content/80"> ${renderComponent($$result3, "Content", Content, {})} </article> </section> <!-- 返回列表 --> <section> <a href="/log/" class="btn btn-sm btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:arrow-left", "class": "w-4 h-4" })}
返回日志列表
</a> </section> </div> ` })} ` })}`;
}, "F:/Frosti/src/pages/log/[slug].astro", void 0);

const $$file = "F:/Frosti/src/pages/log/[slug].astro";
const $$url = "/log/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
