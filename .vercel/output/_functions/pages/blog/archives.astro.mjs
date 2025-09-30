/* empty css                                    */
import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$BaseCard } from '../../chunks/BaseCard_DE8-B8uH.mjs';
import { t, D as DATE_FORMAT } from '../../chunks/config_DCCOjQe-.mjs';
import '../../chunks/dayjs_0VK1EBxQ.mjs';
import { g as getAllPosts, s as sortPostsByDate, a as getPostsByYearAndMonth } from '../../chunks/blogUtils_N_K5KEck.mjs';
import dayjs from 'dayjs';
export { renderers } from '../../renderers.mjs';

const $$Archives = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getAllPosts();
  const sortedPosts = sortPostsByDate(allPosts);
  const postsByDate = getPostsByYearAndMonth(sortedPosts);
  const years = Array.from(postsByDate.keys()).sort((a, b) => parseInt(b) - parseInt(a));
  const getMonthName = (month) => {
    const monthIndex = parseInt(month);
    return t(`months.${monthIndex}`);
  };
  const totalPosts = allPosts.length;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("label.archivePage") }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "BaseCard", $$BaseCard, { "title": t("label.archivePage") }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div class="flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:archive", "class": "w-6 h-6 text-accent" })} <h1 id="h1" class="text-2xl md:text-3xl font-bold">${t("label.archivePage")}</h1> <div class="badge badge-accent">${totalPosts} ${totalPosts === 1 ? t("label.post") : t("label.posts")}</div> </div> <a href="/blog" class="btn btn-outline btn-sm gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:book-open", "class": "w-4 h-4" })} <span>${t("label.backToBlog")}</span> </a> </div> <div class="divider my-2"></div> <p class="text-sm opacity-75">${t("label.archivesPageDescription")}</p> ` })} ${renderComponent($$result2, "BaseCard", $$BaseCard, { "title": t("label.archivePage") }, { "default": async ($$result3) => renderTemplate` <div class="archives-container"> ${years.length > 0 ? renderTemplate`<div class="archives-timeline"> ${years.map((year) => renderTemplate`<div class="timeline-year"> <div class="year-header"> <div class="year-badge">${year}</div> </div> <div class="year-content"> ${Array.from(postsByDate.get(year).entries()).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([month, posts]) => renderTemplate`<div class="timeline-month"> <h3 class="month-title"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:calendar", "class": "month-icon" })} <span> ${getMonthName(month)} ${year} </span> <span class="month-count">${posts.length}</span> </h3> <ul class="archive-posts"> ${posts.map((post) => renderTemplate`<li class="archive-item"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="archive-card"> <time class="archive-date">${dayjs(post.data.pubDate).format(DATE_FORMAT)}</time> <h4 class="archive-title">${post.data.title}</h4> ${post.data.description && renderTemplate`<p class="archive-description">${post.data.description}</p>`} </a> </li>`)} </ul> </div>`)} </div> </div>`)} </div>` : renderTemplate`<div class="empty-state"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "ri:emotion-sad-line", "class": "empty-icon" })} <p class="empty-text">${t("label.noPosts")}</p> </div>`} </div> ` })} ` })}`;
}, "F:/Frosti/src/pages/blog/archives.astro", void 0);

const $$file = "F:/Frosti/src/pages/blog/archives.astro";
const $$url = "/blog/archives";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Archives,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
