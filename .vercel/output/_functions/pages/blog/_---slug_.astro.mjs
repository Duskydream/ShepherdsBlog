/* empty css                                    */
import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderComponent, d as addAttribute, b as renderTemplate } from '../../chunks/astro/server_BSSrx8qw.mjs';
import { a as $$Icon, $ as $$BaseLayout } from '../../chunks/BaseLayout_KMbkoCGG.mjs';
import '../../chunks/dayjs_0VK1EBxQ.mjs';
import { D as DATE_FORMAT, U as USER_NAME, t } from '../../chunks/config_DCCOjQe-.mjs';
import { a as $$PostFilter, $ as $$PostInfo } from '../../chunks/PostFilter_DhU9C-tY.mjs';
/* empty css                                     */
import dayjs from 'dayjs';
import { getCollection } from '../../chunks/_astro_content_gv3P6M0L.mjs';
import { $ as $$MainCard } from '../../chunks/MainCard_DU4c7EEu.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://duskydream.icu");
const $$License = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$License;
  const { title, url, pubDate, badge, categories = [], tags = [], word, time } = Astro2.props;
  const displayDate = pubDate ? dayjs(pubDate).format(DATE_FORMAT) : "";
  const socialLinks = [
    {
      name: "X (Twitter)",
      icon: "ri:twitter-x-line",
      class: "bg-black hover:bg-gray-800",
      url: `https://twitter.com/intent/tweet/?text=${title}&url=${url}`
    },
    {
      name: "Telegram",
      icon: "ri:telegram-line",
      class: "bg-[#26a5e4] hover:bg-[#1e96d1]",
      url: `https://telegram.me/share/url?text=${title}&url=${url}`
    },
    {
      name: "Reddit",
      icon: "ri:reddit-line",
      class: "bg-[#ff4500] hover:bg-[#e63e00]",
      url: `https://reddit.com/submit/?url=${url}&title=${title}`
    },
    {
      name: "Facebook",
      icon: "ri:facebook-circle-line",
      class: "bg-[#0866ff] hover:bg-[#0755d6]",
      url: `https://facebook.com/sharer/sharer.php?u=${url}`
    },
    {
      name: "Email",
      icon: "ri:mail-line",
      class: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${title}&body=${url}`
    }
  ];
  return renderTemplate`${maybeRenderHead()}<hr data-astro-cid-zux26muy> <div class="container p-0" data-astro-cid-zux26muy> <div class="text-right text-sm text-base-content/60 italic mb-2" data-astro-cid-zux26muy> ${renderComponent($$result, "Icon", $$Icon, { "name": "ri:heart-line", "class": "w-4 h-4 inline-block align-text-bottom text-error", "data-astro-cid-zux26muy": true })} Thanks for reading!
</div> <div class="card bg-base-200 overflow-visible" data-astro-cid-zux26muy> <div class="card-body relative p-4 sm:p-6 lg:p-8" data-astro-cid-zux26muy> <!-- License Icon --> <div class="absolute -top-8 left-8" data-astro-cid-zux26muy> <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg" data-astro-cid-zux26muy> ${renderComponent($$result, "Icon", $$Icon, { "name": "ri:creative-commons-line", "class": "w-10 h-10 text-primary-content", "data-astro-cid-zux26muy": true })} </div> </div> <!-- Article Metadata --> <div class="space-y-4" data-astro-cid-zux26muy> <h3 class="text-lg sm:text-xl lg:text-2xl font-bold" data-astro-cid-zux26muy>${title}</h3> <!-- Stats Row --> <div class="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm opacity-75" data-astro-cid-zux26muy> ${displayDate && renderTemplate`<span class="flex items-center gap-1" data-astro-cid-zux26muy> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:calendar", "class": "h-4 w-4", "data-astro-cid-zux26muy": true })} ${displayDate} </span>`} ${badge && renderTemplate`<span class="flex items-center gap-1" data-astro-cid-zux26muy> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:bookmark", "class": "h-4 w-4", "data-astro-cid-zux26muy": true })} ${badge} </span>`} ${word && time && renderTemplate`<div class="flex items-center gap-1" data-astro-cid-zux26muy> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:book-open", "class": "h-4 w-4", "data-astro-cid-zux26muy": true })} <span data-astro-cid-zux26muy> ${word} ${t("label.wordCount")} · ${time} ${t("label.readTime")} </span> </div>`} <a${addAttribute(url, "href")} class="flex items-center gap-1 hover:text-primary transition-colors" data-astro-cid-zux26muy> ${renderComponent($$result, "Icon", $$Icon, { "name": "ri:links-line", "class": "w-4 h-4", "data-astro-cid-zux26muy": true })} </a> </div> <!-- Categories and Tags --> <div class="mt-4" data-astro-cid-zux26muy> ${renderComponent($$result, "PostFilter", $$PostFilter, { "categories": categories, "tags": tags, "data-astro-cid-zux26muy": true })} <!-- License Info --> <hr class="my-4" data-astro-cid-zux26muy> <p class="text-sm opacity-75" data-astro-cid-zux26muy></p>
© ${USER_NAME} |
<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors" data-astro-cid-zux26muy>
CC BY-NC-SA 4.0
</a> </div> </div> <!-- Share Button --> <div class="flex justify-end mt-4" data-astro-cid-zux26muy> <button class="btn btn-primary btn-outline" onclick="share_modal.showModal()" data-astro-cid-zux26muy> ${t("label.share")} ${renderComponent($$result, "Icon", $$Icon, { "name": "ri:share-line", "class": "w-5 h-5", "data-astro-cid-zux26muy": true })} </button> </div> </div> </div> <!-- Share Modal --> <dialog id="share_modal" class="modal modal-bottom sm:modal-middle" data-astro-cid-zux26muy> <div class="modal-box max-w-2xl rounded-none sm:rounded-xl" data-astro-cid-zux26muy> <h3 class="font-bold text-lg sm:text-xl mb-6 text-center" data-astro-cid-zux26muy> ${t("label.shareCard")} </h3> <div class="flex flex-wrap gap-4 justify-center" data-astro-cid-zux26muy> ${socialLinks.map(({ name, icon, class: bgClass, url: url2 }) => renderTemplate`<a${addAttribute(url2, "href")}${addAttribute(`btn btn-circle btn-lg transition-transform hover:scale-110 ${bgClass}`, "class")} target="_blank" rel="noopener noreferrer"${addAttribute(name, "title")} data-astro-cid-zux26muy> <span class="sr-only" data-astro-cid-zux26muy>${name}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-6 h-6 text-white", "data-astro-cid-zux26muy": true })} </a>`)} </div> <div class="modal-action" data-astro-cid-zux26muy> <form method="dialog" data-astro-cid-zux26muy> <button class="btn btn-ghost hover:scale-105 transition-transform" data-astro-cid-zux26muy> ${t("label.close")} </button> </form> </div> </div> <form method="dialog" class="modal-backdrop" data-astro-cid-zux26muy> <button data-astro-cid-zux26muy>${t("label.close")}</button> </form> </dialog> </div> `;
}, "F:/Frosti/src/components/widgets/License.astro", void 0);

const $$Astro = createAstro("https://duskydream.icu");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((blog) => ({
    params: { slug: blog.slug },
    props: { blog }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { blog } = Astro2.props;
  const { Content, remarkPluginFrontmatter, headings } = await blog.render();
  const displayDate = blog.data.pubDate ? dayjs(blog.data.pubDate).format(DATE_FORMAT) : "";
  const image = new URL(`/og/${blog.slug}.png`, Astro2.site).toString();
  const url = new URL(`/${blog.slug}`, Astro2.url.origin);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": blog.data.title, "description": blog.data.description, "image": image, "headings": headings, "showTOC": true, "isPost": true, "<!--": true, "\u2B50": true, "\u8FD9\u91CC\u52A0\u4E0A\uFF0C\u544A\u8BC9": true, "BaseLayout": true, "\u8FD9\u662F\u6587\u7AE0\u9875": true, "--": true }, { "default": async ($$result2) => renderTemplate`
>
${renderComponent($$result2, "MainCard", $$MainCard, { "title": blog.data.title, "description": blog.data.description, "image": blog.data.image, "infoIcon": "lucide:info" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "PostInfo", $$PostInfo, { "pubDate": displayDate, "badge": blog.data.badge, "word": remarkPluginFrontmatter.totalCharCount, "time": remarkPluginFrontmatter.readingTime })} ${maybeRenderHead()}<div class="mb-6"> ${renderComponent($$result3, "PostFilter", $$PostFilter, { "categories": blog.data.categories, "tags": blog.data.tags })} </div> <div class="mt-8"> <div id="content" class="prose max-w-none prose-headings:scroll-mt-20 prose-img:rounded-xl prose-img:mx-auto"> ${renderComponent($$result3, "Content", Content, {})} ${renderComponent($$result3, "License", $$License, { "url": url, "title": blog.data.title, "image": blog.data.image, "pubDate": blog.data.pubDate, "badge": blog.data.badge, "categories": blog.data.categories, "tags": blog.data.tags, "word": remarkPluginFrontmatter.totalCharCount, "time": remarkPluginFrontmatter.readingTime })} </div> </div> ` })} ` })}`;
}, "F:/Frosti/src/pages/blog/[...slug].astro", void 0);

const $$file = "F:/Frosti/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
