/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../chunks/BaseLayout_KMbkoCGG.mjs';
import { t } from '../chunks/config_DCCOjQe-.mjs';
import { $ as $$MainCard } from '../chunks/MainCard_DU4c7EEu.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://duskydream.icu");
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  Astro2.response.status = 404;
  const pathname = Astro2.url.pathname;
  let title;
  let description;
  let textOverlay;
  let primaryAction;
  if (pathname.startsWith("/blog/tag/")) {
    const attemptedValue = decodeURIComponent(pathname.split("/")[3] || "");
    title = `${t("label.tagPage")} "${attemptedValue}" ${t("label.notFound")}`;
    description = t("label.tagNotFoundDescription");
    textOverlay = "404";
    primaryAction = {
      href: "/blog/tags",
      text: t("label.allTags"),
      icon: "lucide:tags"
    };
  } else if (pathname.startsWith("/blog/category/")) {
    const attemptedValue = decodeURIComponent(pathname.split("/")[3] || "");
    title = `${t("label.categoryPage")} "${attemptedValue}" ${t("label.notFound")}`;
    description = t("label.categoryNotFoundDescription");
    textOverlay = "404";
    primaryAction = {
      href: "/blog/categories",
      text: t("label.allCategories"),
      icon: "lucide:folders"
    };
  } else {
    title = t("label.404title");
    description = t("label.404description");
    textOverlay = "404";
    primaryAction = {
      href: "/",
      text: t("label.404backHome"),
      icon: "lucide:home"
    };
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "isIndexed": false }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainCard", $$MainCard, { "title": title, "description": description, "textOverlay": textOverlay, "infoIcon": "lucide:help-circle" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col sm:flex-row gap-4 justify-center my-8"> <a${addAttribute(primaryAction.href, "href")} class="btn btn-primary gap-2 btn-shine-effect"> ${renderComponent($$result3, "Icon", $$Icon, { "name": primaryAction.icon, "class": "w-5 h-5" })} <span>${primaryAction.text}</span> </a> <button id="goBackBtn" class="btn btn-outline gap-2" onclick="history.back()"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:corner-up-left", "class": "w-5 h-5" })} <span>${t("label.404goBack")}</span> </button> </div> <div class="divider my-6"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:map", "class": "w-10 h-10" })} </div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4"> <a href="/blog" class="card bg-base-200 p-4 hover-lift text-center transition-all duration-300"> <div class="text-info mb-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:book-open", "class": "w-8 h-8 mx-auto" })} </div> <h3 class="font-semibold">${t("label.404exploreBlog")}</h3> </a> <a href="/blog/archives" class="card bg-base-200 p-4 hover-lift text-center transition-all duration-300"> <div class="text-info mb-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:archive", "class": "w-8 h-8 mx-auto" })} </div> <h3 class="font-semibold">${t("label.404browseArchives")}</h3> </a> <a href="/blog/search" class="card bg-base-200 p-4 hover-lift text-center transition-all duration-300"> <div class="text-info mb-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:search", "class": "w-8 h-8 mx-auto" })} </div> <h3 class="font-semibold">${t("label.404searchContent")}</h3> </a> </div> ` })} ` })}`;
}, "F:/Frosti/src/pages/404.astro", void 0);

const $$file = "F:/Frosti/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
