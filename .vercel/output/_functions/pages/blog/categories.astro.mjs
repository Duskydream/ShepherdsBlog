/* empty css                                    */
import { a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$BaseCard } from '../../chunks/BaseCard_DE8-B8uH.mjs';
import { t, D as DATE_FORMAT } from '../../chunks/config_DCCOjQe-.mjs';
import '../../chunks/dayjs_0VK1EBxQ.mjs';
import { g as getAllPosts, b as getCategoriesWithPosts, c as getCategoryColorClass } from '../../chunks/blogUtils_N_K5KEck.mjs';
import dayjs from 'dayjs';
export { renderers } from '../../renderers.mjs';

const $$Categories = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getAllPosts();
  const categoryMap = getCategoriesWithPosts(allPosts);
  const categoryEntries = Array.from(categoryMap.entries());
  categoryEntries.sort((a, b) => a[0].localeCompare(b[0]));
  categoryEntries.forEach(([_, posts]) => {
    posts.sort(
      (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
    );
  });
  const totalCategories = categoryMap.size;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("label.categoryPage") }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "BaseCard", $$BaseCard, { "title": t("label.categoryPage") }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div class="flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:folder", "class": "w-6 h-6 text-primary" })} <h1 id="h1" class="text-2xl md:text-3xl font-bold">${t("label.categoryPage")}</h1> <div class="badge badge-primary">${totalCategories} ${t("label.totalCategories")}</div> </div> <a href="/blog" class="btn btn-outline btn-sm gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:book-open", "class": "w-4 h-4" })} <span>${t("label.backToBlog")}</span> </a> </div> <div class="divider my-2"></div> <p class="text-sm opacity-75">${t("label.categoriesPageDescription")}</p> ` })} ${renderComponent($$result2, "BaseCard", $$BaseCard, { "title": t("label.categoryPage") }, { "default": async ($$result3) => renderTemplate` <div class="categories-container"> ${categoryEntries.length > 0 ? renderTemplate`<div class="categories-grid"> ${categoryEntries.map(([category, posts], index) => renderTemplate`<div class="category-card"${addAttribute(index, "data-index")}> <div${addAttribute(`category-inner ${getCategoryColorClass(index)}`, "class")}> <div class="category-header"${addAttribute(category, "data-category")}> <div class="category-title"> <div class="category-icon"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:folder" })} </div> <h2>${category}</h2> <span class="category-count">${posts.length}</span> </div> <button class="toggle-btn" aria-label="Toggle category content"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "ri:arrow-down-s-line", "class": "toggle-icon" })} </button> </div> <div class="category-content scrollbar-none"> <div class="category-divider"></div> <ul class="post-list"> ${posts.map((post) => renderTemplate`<li class="post-item"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="post-link"> <span class="post-title">${post.data.title}</span> <span class="post-date">${dayjs(post.data.pubDate).format(DATE_FORMAT)}</span> </a> </li>`)} </ul> </div> </div> </div>`)} </div>` : renderTemplate`<div class="empty-state"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "ri:emotion-sad-line", "class": "empty-icon" })} <p class="empty-text">${t("label.noCategory")}</p> </div>`} </div> ` })} ` })} ${renderScript($$result, "F:/Frosti/src/pages/blog/categories.astro?astro&type=script&index=0&lang.ts")}`;
}, "F:/Frosti/src/pages/blog/categories.astro", void 0);

const $$file = "F:/Frosti/src/pages/blog/categories.astro";
const $$url = "/blog/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Categories,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
