/* empty css                                    */
import { a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$BaseCard } from '../../chunks/BaseCard_DE8-B8uH.mjs';
import { t } from '../../chunks/config_DCCOjQe-.mjs';
export { renderers } from '../../renderers.mjs';

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("label.searchPage") }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "BaseCard", $$BaseCard, { "title": t("label.searchPage") }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div class="flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:search", "class": "w-6 h-6 text-info" })} <h1 id="h1" class="text-2xl md:text-3xl font-bold">${t("label.searchPage")}</h1> </div> <a href="/blog" class="btn btn-outline btn-sm gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:book-open", "class": "w-4 h-4" })} <span>${t("label.backToBlog")}</span> </a> </div> <div class="divider my-2"></div> <p class="text-sm opacity-75">${t("label.searchPageDescription")}</p> ` })} ${renderComponent($$result2, "BaseCard", $$BaseCard, {}, { "default": async ($$result3) => renderTemplate` <div id="search-container" class="w-full"> <div id="pagefind-search"></div> </div> ` })} ` })} ${renderScript($$result, "F:/Frosti/src/pages/blog/search.astro?astro&type=script&index=0&lang.ts")}`;
}, "F:/Frosti/src/pages/blog/search.astro", void 0);

const $$file = "F:/Frosti/src/pages/blog/search.astro";
const $$url = "/blog/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
