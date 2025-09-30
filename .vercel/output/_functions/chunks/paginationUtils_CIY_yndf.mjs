import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent, g as renderTransition, F as Fragment } from './astro/server_BSSrx8qw.mjs';
import './index_MaT6fT73.mjs';
import { $ as $$Image } from './_astro_assets_Bt0X4mJE.mjs';
import './dayjs_0VK1EBxQ.mjs';
import { D as DATE_FORMAT, t, B as BLOG_PAGE_SIZE } from './config_DCCOjQe-.mjs';
import { $ as $$PostInfo, a as $$PostFilter } from './PostFilter_DhU9C-tY.mjs';
import { b as $$Card, a as $$Icon } from './BaseLayout_KMbkoCGG.mjs';
import dayjs from 'dayjs';
/* empty css                          */
import { g as getAllPosts, s as sortPostsByDate, i as getPostsWithStats, j as sortPostsByPinAndDate } from './blogUtils_N_K5KEck.mjs';

const $$Astro$5 = createAstro("https://duskydream.icu");
const $$Heading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Heading;
  const { url, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} target="_self" class="block hover:-translate-y-0.5 transition-transform duration-300"> <h2${addAttribute(title, "id")} class="frosti-heading"> ${title} </h2> </a>`;
}, "F:/Frosti/src/components/widgets/Heading.astro", void 0);

const $$Astro$4 = createAstro("https://duskydream.icu");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PostCard;
  const {
    title,
    image,
    pubDate,
    description,
    badge,
    categories = [],
    tags = [],
    word = "0",
    time = "0",
    url = decodeURIComponent(Astro2.url.toString())
  } = Astro2.props;
  const displayDate = pubDate ? dayjs(pubDate).format(DATE_FORMAT) : "";
  return renderTemplate`${renderComponent($$result, "Card", $$Card, { "class": "overflow-hidden" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col lg:flex-row"> <!-- Content Section --> <div class="flex-1 p-6 overflow-hidden bg-base-100 lg:order-1 order-2 flex flex-col justify-between"> <div> ${renderComponent($$result2, "PostInfo", $$PostInfo, { "pubDate": displayDate, "badge": badge, "word": word, "time": time })} ${renderComponent($$result2, "Heading", $$Heading, { "url": url, "title": title }, { "default": ($$result3) => renderTemplate`${title}` })} <p class="text-sm text-base-content/70 mb-4">${description}</p> </div> ${renderComponent($$result2, "PostFilter", $$PostFilter, { "categories": categories, "tags": tags })} </div> <!-- Image Section --> ${image && renderTemplate`<a${addAttribute(url, "href")} class="relative lg:w-2/5 aspect-video lg:aspect-auto overflow-hidden lg:order-2 order-1 group"> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 z-10 transition-all duration-300 flex items-center justify-center"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lucide:arrow-right", "class": "w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2" })} </div> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": title, "width": 800, "height": 400, "format": "webp", "loading": "eager", "class": "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" })} </a>`} </div> ` })}`;
}, "F:/Frosti/src/components/PostCard.astro", void 0);

const $$Astro$3 = createAstro("https://duskydream.icu");
const $$PaginationArrow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PaginationArrow;
  const { url, direction, label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url || "#", "href")}${addAttribute(["btn bg-base-100 shadow-xl", !url && "btn-disabled"], "class:list")}> ${direction === "prev" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "ri:arrow-left-s-line", "class": "h-6 w-6 md:h-8 md:w-8" })}`} <span class="hidden lg:inline">${label}</span> ${direction === "next" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "ri:arrow-right-s-line", "class": "h-6 w-6 md:h-8 md:w-8" })}`} </a>`;
}, "F:/Frosti/src/components/widgets/PaginationArrow.astro", void 0);

const $$Astro$2 = createAstro("https://duskydream.icu");
const $$PaginationNumber = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PaginationNumber;
  const { number, current, baseUrl, isOnly = false } = Astro2.props;
  const href = number == 1 ? baseUrl : `${baseUrl}/${number}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(`Page ${number}`, "title")}${addAttribute(`Page ${number}`, "aria-label")}${addAttribute(["join-item btn bg-base-100", number === current && "btn-active", isOnly && "rounded-btn"], "class:list")}> ${number} </a>`;
}, "F:/Frosti/src/components/widgets/PaginationNumber.astro", void 0);

const $$Astro$1 = createAstro("https://duskydream.icu");
const $$PaginationDropdown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PaginationDropdown;
  const { hiddenPages, current, baseUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="dropdown dropdown-top join-item"> <div tabindex="0" role="button" class="btn join-item bg-base-100">...</div> <ul class="dropdown-content z-[100] menu p-2 shadow-xl bg-base-100 rounded-box w-auto mx-auto mt-1"> ${hiddenPages.map((page) => renderTemplate`<li class="w-full"> <a${addAttribute(page === 1 ? baseUrl : `${baseUrl}/${page}`, "href")}${addAttribute(["text-center py-1 px-3", page === current && "bg-primary text-primary-content"], "class:list")}> ${page} </a> </li>`)} </ul> </div>`;
}, "F:/Frosti/src/components/widgets/PaginationDropdown.astro", void 0);

const $$Astro = createAstro("https://duskydream.icu");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { page, totalPages, pageLinks, baseUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between items-center w-full gap-2 order-4"${addAttribute(renderTransition($$result, "onpcddfd", "", "pagination"), "data-astro-transition-scope")}> ${renderComponent($$result, "PaginationArrow", $$PaginationArrow, { "direction": "prev", "url": page.url.prev, "label": t("label.prevPage") })} <div class="join"> ${totalPages > 3 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${pageLinks.active.map(
    (link) => link === "..." ? renderTemplate`${renderComponent($$result2, "PaginationDropdown", $$PaginationDropdown, { "hiddenPages": pageLinks.hidden, "current": page.current, "baseUrl": baseUrl })}` : renderTemplate`${renderComponent($$result2, "PaginationNumber", $$PaginationNumber, { "number": link, "current": page.current, "baseUrl": baseUrl })}`
  )}` })}` : pageLinks.active.map((link) => renderTemplate`${renderComponent($$result, "PaginationNumber", $$PaginationNumber, { "number": link, "current": page.current, "baseUrl": baseUrl, "isOnly": totalPages === 1 })}`)} </div> ${renderComponent($$result, "PaginationArrow", $$PaginationArrow, { "direction": "next", "url": page.url.next, "label": t("label.nextPage") })} </div>`;
}, "F:/Frosti/src/components/widgets/Pagination.astro", "self");

async function getMainBlogPaginationPaths({ paginate }) {
  const allPosts = await getAllPosts();
  const sortedPosts = sortPostsByPinAndDate(allPosts);
  const postsWithStats = await getPostsWithStats(sortedPosts);
  return paginate(postsWithStats, { pageSize: BLOG_PAGE_SIZE });
}
async function getTagPaginationPaths({ paginate }) {
  const allPosts = await getAllPosts();
  const sortedPosts = sortPostsByDate(allPosts);
  const allTags = [...new Set(sortedPosts.flatMap((blog) => blog.data.tags || []))];
  const postsWithStats = await getPostsWithStats(sortedPosts);
  return allTags.flatMap((tag) => {
    const filteredPosts = postsWithStats.filter((blog) => blog.data.tags?.includes(tag));
    return paginate(filteredPosts, {
      params: { tag },
      pageSize: BLOG_PAGE_SIZE
    });
  });
}
async function getCategoryPaginationPaths({ paginate }) {
  const allPosts = await getAllPosts();
  const sortedPosts = sortPostsByDate(allPosts);
  const allCategories = [...new Set(sortedPosts.flatMap((blog) => blog.data.categories || []))];
  const postsWithStats = await getPostsWithStats(sortedPosts);
  return allCategories.flatMap((category) => {
    const filteredPosts = postsWithStats.filter((blog) => blog.data.categories?.includes(category));
    return paginate(filteredPosts, {
      params: { category },
      pageSize: BLOG_PAGE_SIZE
    });
  });
}

export { $$PostCard as $, $$Pagination as a, getTagPaginationPaths as b, getMainBlogPaginationPaths as c, getCategoryPaginationPaths as g };
