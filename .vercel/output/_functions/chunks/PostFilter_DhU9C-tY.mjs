import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, d as addAttribute } from './astro/server_BSSrx8qw.mjs';
import { a as $$Icon } from './BaseLayout_KMbkoCGG.mjs';
import { t } from './config_DCCOjQe-.mjs';

const $$Astro$1 = createAstro("https://duskydream.icu");
const $$PostInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostInfo;
  const { pubDate, badge, word, time } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col sm:flex-row sm:justify-between gap-y-2 mb-4 text-xs sm:text-sm opacity-75"> <div class="flex flex-wrap items-center gap-x-4 gap-y-2"> ${pubDate && renderTemplate`<span class="flex items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:calendar", "class": "h-4 w-4 flex-shrink-0" })} <span class="truncate">${pubDate}</span> </span>`} ${badge && renderTemplate`<span class="flex flex-wrap items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:bookmark", "class": "h-4 w-4 flex-shrink-0" })} <span class="truncate">${badge}</span> </span>`} </div> <div class="flex flex-wrap items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:book-open", "class": "h-4 w-4 flex-shrink-0" })} <span class="truncate">${word} ${t("label.wordCount")} · ${time} ${t("label.readTime")}</span> </div> </div>`;
}, "F:/Frosti/src/components/widgets/PostInfo.astro", void 0);

const $$Astro = createAstro("https://duskydream.icu");
const $$PostFilter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostFilter;
  const { categories = [], tags = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-wrap items-center gap-2"> ${categories.map((category) => renderTemplate`<a${addAttribute(`/blog/category/${category}`, "href")} class="btn btn-xs btn-category"> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:folder", "class": "w-4 h-4" })} <span>${category}</span> </a>`)} ${tags.map((tag) => renderTemplate`<a${addAttribute(`/blog/tag/${tag}`, "href")} class="btn btn-xs btn-tag"> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:tag", "class": "w-4 h-4" })} <span>${tag}</span> </a>`)} ${categories.length === 0 && renderTemplate`<span class="btn btn-xs btn-ghost opacity-60 gap-1"> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:folder", "class": "w-4 h-4" })} <span>${t("label.noCategory")}</span> </span>`} ${tags.length === 0 && renderTemplate`<span class="btn btn-xs btn-ghost opacity-60 gap-1"> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:tag", "class": "w-4 h-4" })} <span>${t("label.noTag")}</span> </span>`} </div>`;
}, "F:/Frosti/src/components/widgets/PostFilter.astro", void 0);

export { $$PostInfo as $, $$PostFilter as a };
