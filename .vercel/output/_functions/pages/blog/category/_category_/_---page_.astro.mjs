/* empty css                                          */
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_BSSrx8qw.mjs';
import { g as getCategoryPaginationPaths, $ as $$PostCard, a as $$Pagination } from '../../../../chunks/paginationUtils_CIY_yndf.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../../../../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$BaseCard } from '../../../../chunks/BaseCard_DE8-B8uH.mjs';
import { $ as $$CardGroup } from '../../../../chunks/CardGroup_BfIh680b.mjs';
import { t } from '../../../../chunks/config_DCCOjQe-.mjs';
import { d as generatePageLinks } from '../../../../chunks/blogUtils_N_K5KEck.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://duskydream.icu");
async function getStaticPaths({ paginate }) {
  return getCategoryPaginationPaths({ paginate });
}
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const params = Astro2.params;
  const totalPages = Math.ceil(page.total / page.size);
  const pageLinks = generatePageLinks(totalPages);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${t("label.categoryPage")} - ${params.category}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BaseCard", $$BaseCard, { "title": t("label.categoryPage") }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div class="flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:folder", "class": "w-6 h-6 text-primary" })} <h1 id="h1" class="text-2xl md:text-3xl font-bold">${params.category}</h1> <div class="badge badge-primary">${page.total} ${page.total === 1 ? t("label.post") : t("label.posts")}</div> </div> <a href="/blog/categories" class="btn btn-outline btn-sm gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:folder", "class": "w-4 h-4" })} <span>${t("label.allCategories")}</span> </a> </div> <div class="divider my-2"></div> <p class="text-sm opacity-75">${t("label.categoryDescription")}</p> ` })} ${renderComponent($$result2, "CardGroup", $$CardGroup, { "cols": "1", "gap": "6" }, { "default": ($$result3) => renderTemplate`${page.data.map((blog) => renderTemplate`${renderComponent($$result3, "PostCard", $$PostCard, { "title": blog.data.title, "image": blog.data.image, "description": blog.data.description, "url": "/blog/" + blog.slug, "pubDate": blog.data.pubDate, "badge": blog.data.badge, "categories": blog.data.categories, "tags": blog.data.tags, "word": blog.remarkPluginFrontmatter.totalCharCount, "time": blog.remarkPluginFrontmatter.readingTime })}`)}` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "page": page, "totalPages": totalPages, "pageLinks": pageLinks, "baseUrl": `/blog/category/${params.category}` })} ` })}`;
}, "F:/Frosti/src/pages/blog/category/[category]/[...page].astro", void 0);

const $$file = "F:/Frosti/src/pages/blog/category/[category]/[...page].astro";
const $$url = "/blog/category/[category]/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
