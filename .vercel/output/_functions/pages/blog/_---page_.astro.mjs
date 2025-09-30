/* empty css                                    */
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BSSrx8qw.mjs';
import { c as getMainBlogPaginationPaths, $ as $$PostCard, a as $$Pagination } from '../../chunks/paginationUtils_CIY_yndf.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$CardGroup } from '../../chunks/CardGroup_BfIh680b.mjs';
import { t } from '../../chunks/config_DCCOjQe-.mjs';
import { d as generatePageLinks } from '../../chunks/blogUtils_N_K5KEck.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://duskydream.icu");
async function getStaticPaths({ paginate }) {
  return getMainBlogPaginationPaths({ paginate });
}
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const totalPages = Math.ceil(page.total / page.size);
  const pageLinks = generatePageLinks(totalPages);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CardGroup", $$CardGroup, { "cols": "2" }, { "default": ($$result3) => renderTemplate`  ${maybeRenderHead()}<a href="/blog/archives" class="card bg-base-100 shadow-lg"> <div class="card-body p-4"> <div class="flex items-center gap-3"> <div class="rounded-full bg-accent/10 p-3"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:archive", "class": "w-6 h-6 text-accent" })} </div> <div> <h2 class="card-title text-lg">${t("label.archivePage")}</h2> <p class="text-sm opacity-75">${t("label.archivesPageDescription")}</p> </div> </div> </div> </a>  <a href="/blog/categories" class="card bg-base-100 shadow-lg"> <div class="card-body p-4"> <div class="flex items-center gap-3"> <div class="rounded-full bg-primary/10 p-3"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:folder", "class": "w-6 h-6 text-primary" })} </div> <div> <h2 class="card-title text-lg">${t("label.categoryPage")}</h2> <p class="text-sm opacity-75">${t("label.categoriesPageDescription")}</p> </div> </div> </div> </a>  <a href="/blog/tags" class="card bg-base-100 shadow-lg"> <div class="card-body p-4"> <div class="flex items-center gap-3"> <div class="rounded-full bg-secondary/10 p-3"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:tag", "class": "w-6 h-6 text-secondary" })} </div> <div> <h2 class="card-title text-lg">${t("label.tagPage")}</h2> <p class="text-sm opacity-75">${t("label.tagsPageDescription")}</p> </div> </div> </div> </a>  <a href="/blog/search" class="card bg-base-100 shadow-lg"> <div class="card-body p-4"> <div class="flex items-center gap-3"> <div class="rounded-full bg-info/10 p-3"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:search", "class": "w-6 h-6 text-info" })} </div> <div> <h2 class="card-title text-lg">${t("label.searchPage")}</h2> <p class="text-sm opacity-75">${t("label.searchPageDescription")}</p> </div> </div> </div> </a> ` })}  ${renderComponent($$result2, "CardGroup", $$CardGroup, { "cols": "1" }, { "default": ($$result3) => renderTemplate`${page.data.map((blog) => renderTemplate`${renderComponent($$result3, "PostCard", $$PostCard, { "title": blog.data.title, "image": blog.data.image, "description": blog.data.description, "url": "/blog/" + blog.slug, "pubDate": blog.data.pubDate, "badge": blog.data.badge, "categories": blog.data.categories, "tags": blog.data.tags, "word": blog.remarkPluginFrontmatter.totalCharCount, "time": blog.remarkPluginFrontmatter.readingTime })}`)}` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "page": page, "totalPages": totalPages, "pageLinks": pageLinks, "baseUrl": `/blog` })} ` })}`;
}, "F:/Frosti/src/pages/blog/[...page].astro", void 0);

const $$file = "F:/Frosti/src/pages/blog/[...page].astro";
const $$url = "/blog/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
