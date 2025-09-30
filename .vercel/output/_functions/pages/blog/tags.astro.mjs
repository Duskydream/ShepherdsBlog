/* empty css                                    */
import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$BaseCard } from '../../chunks/BaseCard_DE8-B8uH.mjs';
import { t } from '../../chunks/config_DCCOjQe-.mjs';
import { g as getAllPosts, e as getTagsWithCount, f as getTagColorClass, h as getTagFontSize } from '../../chunks/blogUtils_N_K5KEck.mjs';
export { renderers } from '../../renderers.mjs';

const $$Tags = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getAllPosts();
  const tagMap = getTagsWithCount(allPosts);
  const tagEntries = Array.from(tagMap.entries());
  tagEntries.sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...tagMap.values());
  const minCount = Math.min(...tagMap.values());
  const totalTags = tagMap.size;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("label.tagPage") }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "BaseCard", $$BaseCard, { "title": t("label.tagPage") }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div class="flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:tag", "class": "w-6 h-6 text-secondary" })} <h1 id="h1" class="text-2xl md:text-3xl font-bold">${t("label.tagPage")}</h1> <div class="badge badge-secondary">${totalTags} ${t("label.totalTags")}</div> </div> <a href="/blog" class="btn btn-outline btn-sm gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:book-open", "class": "w-4 h-4" })} <span>${t("label.backToBlog")}</span> </a> </div> <div class="divider my-2"></div> <p class="text-sm opacity-75">${t("label.tagsPageDescription")}</p> ` })} ${renderComponent($$result2, "BaseCard", $$BaseCard, { "title": t("label.tagPage") }, { "default": async ($$result3) => renderTemplate` <div class="tags-container"> ${tagEntries.length > 0 ? renderTemplate`<div class="tags-cloud"> ${tagEntries.map(([tag, count], index) => renderTemplate`<a${addAttribute(`/blog/tag/${tag}`, "href")}${addAttribute(`tags-item ${getTagColorClass(count, maxCount)}`, "class")}${addAttribute(`font-size: ${getTagFontSize(count, maxCount, minCount)}rem;`, "style")}${addAttribute(count, "data-count")}${addAttribute(index, "data-index")}> <span class="tags-content"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:tag" })} <span class="tags-text">${tag}</span> <span class="tags-count">${count}</span> </span> </a>`)} </div>` : renderTemplate`<div class="empty-state"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "ri:emotion-sad-line", "class": "empty-icon" })} <p class="empty-text">${t("label.noTag")}</p> </div>`} </div> ` })} ` })}`;
}, "F:/Frosti/src/pages/blog/tags.astro", void 0);

const $$file = "F:/Frosti/src/pages/blog/tags.astro";
const $$url = "/blog/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tags,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
