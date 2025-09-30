/* empty css                                 */
import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, b as renderTemplate, e as renderScript } from '../chunks/astro/server_BSSrx8qw.mjs';
import { a as $$Icon, $ as $$BaseLayout, b as $$Card } from '../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$MainCard } from '../chunks/MainCard_DU4c7EEu.mjs';
import '../chunks/index_MaT6fT73.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_Bt0X4mJE.mjs';
/* empty css                                  */
import { $ as $$CardGroup } from '../chunks/CardGroup_BfIh680b.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro("https://duskydream.icu");
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const {
    title,
    img,
    desc,
    url,
    badge,
    target = "_blank",
    icon = "lucide:link",
    categories = []
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="not-prose card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 animate-fade-in-up border border-base-200" data-astro-cid-allout54> <a${addAttribute(url, "href")}${addAttribute(target, "target")} class="card-body p-4 md:p-6"${addAttribute(`Visit ${title}: ${desc}`, "aria-label")}${addAttribute(target === "_blank" ? "noopener noreferrer" : void 0, "rel")} data-astro-cid-allout54> <div class="flex flex-col md:flex-row gap-4 items-center" data-astro-cid-allout54> <div class="w-full md:w-[120px] h-[120px] flex-shrink-0 bg-base-200 rounded-lg overflow-hidden" data-astro-cid-allout54> ${img ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": img, "width": 120, "height": 120, "format": "webp", "alt": title, "loading": "lazy", "class": "w-full h-full object-cover", "data-astro-cid-allout54": true })}` : renderTemplate`<div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-base-300 to-base-100" data-astro-cid-allout54> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-8 h-8 text-primary opacity-80", "aria-hidden": "true", "data-astro-cid-allout54": true })} </div>`} </div> <div class="flex-1 space-y-2 w-full" data-astro-cid-allout54> <div class="flex items-center gap-2 flex-wrap" data-astro-cid-allout54> <h2 class="card-title text-xl" data-astro-cid-allout54>${title}</h2> ${badge && renderTemplate`<div class="badge badge-secondary badge-md font-medium" data-astro-cid-allout54>${badge}</div>`} </div> ${categories.length > 0 && renderTemplate`<div class="flex flex-wrap gap-1 my-1" data-astro-cid-allout54> ${categories.map((category) => renderTemplate`<span class="badge badge-outline badge-sm" data-astro-cid-allout54>${category}</span>`)} </div>`} <p class="text-base-content/80 line-clamp-2 text-sm" data-astro-cid-allout54>${desc}</p> <div class="card-actions justify-end mt-2" data-astro-cid-allout54> <div class="flex items-center gap-1 text-primary hover:text-primary-focus transition-colors" data-astro-cid-allout54> <span class="text-sm font-medium" data-astro-cid-allout54>Visit ${title}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:external-link", "class": "w-3.5 h-3.5", "aria-hidden": "true", "data-astro-cid-allout54": true })} </div> </div> </div> </div> </a> </div> `;
}, "F:/Frosti/src/components/mdx/LinkCard.astro", void 0);

const $$Astro$2 = createAstro("https://duskydream.icu");
const $$FriendCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FriendCard;
  const { name, avatar, description, url, type = "friend" } = Astro2.props;
  const typeConfig = {
    friend: {
      bgClass: "bg-gradient-to-br from-primary/20 to-base-100",
      iconName: "lucide:users",
      borderClass: "border-primary/30"
    },
    tech: {
      bgClass: "bg-gradient-to-br from-secondary/20 to-base-100",
      iconName: "lucide:code-2",
      borderClass: "border-secondary/30"
    },
    contributor: {
      bgClass: "bg-gradient-to-br from-accent/20 to-base-100",
      iconName: "lucide:git-pull-request",
      borderClass: "border-accent/30"
    }
  };
  const { bgClass, iconName, borderClass } = typeConfig[type];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1.5 border ${borderClass} overflow-hidden animate-fade-in-up`, "class")} data-astro-cid-qgpm3szh> <a${addAttribute(url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-qgpm3szh> <div${addAttribute(`${bgClass} p-4 flex flex-col items-center`, "class")} data-astro-cid-qgpm3szh> <div class="avatar mb-3" data-astro-cid-qgpm3szh> <div class="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden" data-astro-cid-qgpm3szh> ${avatar ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": avatar, "width": 64, "height": 64, "format": "webp", "alt": name, "loading": "lazy", "class": "object-cover", "data-astro-cid-qgpm3szh": true })}` : renderTemplate`<div class="flex items-center justify-center w-full h-full bg-primary" data-astro-cid-qgpm3szh> <span class="text-xl font-bold text-primary-content" data-astro-cid-qgpm3szh>${name.charAt(0)}</span> </div>`} </div> </div> <h3 class="font-bold text-center" data-astro-cid-qgpm3szh>${name}</h3> <div class="divider my-1" data-astro-cid-qgpm3szh></div> <p class="text-sm text-center text-base-content/70 line-clamp-2 leading-normal h-[3em]" data-astro-cid-qgpm3szh>${description}</p> </div> <div class="card-footer p-2 flex justify-center border-t border-base-200" data-astro-cid-qgpm3szh> <div class="flex items-center gap-1 text-primary text-xs" data-astro-cid-qgpm3szh> ${renderComponent($$result, "Icon", $$Icon, { "name": iconName, "class": "w-3.5 h-3.5", "data-astro-cid-qgpm3szh": true })} <span data-astro-cid-qgpm3szh>Visit</span> </div> </div> </a> </div> `;
}, "F:/Frosti/src/components/mdx/FriendCard.astro", void 0);

const $$Astro$1 = createAstro("https://duskydream.icu");
const $$Showcase = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Showcase;
  const { name, url } = Astro2.props;
  const domain = new URL(url).hostname;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} target="_blank" rel="noopener noreferrer" class="website-badge btn btn-sm btn-outline gap-2"${addAttribute(`Website: ${name} (${domain})`, "title")}> <div class="status-dot flex h-3 w-3 items-center justify-center rounded-full bg-gray-200" title="Checking status..."> <div class="h-2 w-2 rounded-full"></div> </div> <span class="font-medium">${name}</span> </a> ${renderScript($$result, "F:/Frosti/src/components/mdx/Showcase.astro?astro&type=script&index=0&lang.ts")}`;
}, "F:/Frosti/src/components/mdx/Showcase.astro", void 0);

const $$Astro = createAstro("https://duskydream.icu");
const $$Friend = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Friend;
  const sites = [{ name: "Frosti Demo", url: "https://frosti.saroprock.com/" }];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Friends" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardGroup", $$CardGroup, { "cols": "1" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "MainCard", $$MainCard, { "title": "Friends & Resources", "description": "A collection of links to friends, technologies, and contributors to the Frosti project.", "textOverlay": "FRIENDS", "infoIcon": "lucide:link" }, { "default": ($$result4) => renderTemplate` ${maybeRenderHead()}<div class="space-y-10"> <!-- Friends Section --> <section> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result4, "Icon", $$Icon, { "name": "lucide:users", "class": "w-6 h-6 text-primary" })} <span>Friends</span> </h2> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "Rock Zhang", "avatar": "https://github.com/Algacez.png", "description": "UESTC CS Student", "url": "https://blog.282994.xyz/", "type": "friend" })} </div> </section> <!-- Contributors Section --> <section> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result4, "Icon", $$Icon, { "name": "lucide:git-pull-request", "class": "w-6 h-6 text-primary" })} <span>Contributors</span> </h2> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "EveSunMaple", "avatar": "https://github.com/EveSunMaple.png", "description": "Coding is my hobby, not my career.", "url": "https://github.com/EveSunMaple", "type": "contributor" })} ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "Loping151", "avatar": "https://github.com/Loping151.png", "description": "Loping151", "url": "https://github.com/Loping151", "type": "contributor" })} ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "Tianxiang Roxiyater", "avatar": "https://github.com/TNXG.png", "description": "\u660E\u65E5\u5C1A\u672A\u5230\u6765\uFF0C\u5E0C\u671B\u51DD\u4E8E\u5FC3\u4E0A", "url": "https://github.com/TNXG", "type": "contributor" })} ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "Yaoqx", "avatar": "https://github.com/YaoqxCN.png", "description": "A lazy junior high school student who likes coding!", "url": "https://github.com/YaoqxCN", "type": "contributor" })} ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "Yao Tutu", "avatar": "https://github.com/yaotutu.png", "description": "Graduated student of SHMTU, CS major.", "url": "https://github.com/yaotutu", "type": "contributor" })} ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "WRXinYue", "avatar": "https://github.com/WRXinYue.png", "description": "Technology is not just a tool; it is a joy and an art.", "url": "https://github.com/WRXinYue", "type": "contributor" })} ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "\u9F99\u4E00", "avatar": "https://github.com/linglilongyi.png", "description": "linglilongyi", "url": "https://github.com/linglilongyi", "type": "contributor" })} ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "Youngestar", "avatar": "https://github.com/youngestar.png", "description": "Just go ahead!", "url": "https://github.com/youngestar", "type": "contributor" })} ${renderComponent($$result4, "FriendCard", $$FriendCard, { "name": "Liks", "avatar": "https://github.com/Liksone.png", "description": "Liks", "url": "https://github.com/Liksone", "type": "contributor" })} </div> </section> <!-- Useful Resources Section --> <section> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result4, "Icon", $$Icon, { "name": "lucide:bookmark", "class": "w-6 h-6 text-primary" })} <span>Useful Resources</span> </h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${renderComponent($$result4, "LinkCard", $$LinkCard, { "title": "Astro Documentation", "desc": "The official documentation for Astro, covering everything from getting started to advanced techniques.", "url": "https://docs.astro.build", "icon": "simple-icons:astro", "categories": ["Docs", "Learning", "Reference"] })} ${renderComponent($$result4, "LinkCard", $$LinkCard, { "title": "Tailwind CSS Documentation", "desc": "Learn how to use Tailwind's utility classes to style your website without writing CSS.", "url": "https://tailwindcss.com/docs", "icon": "simple-icons:tailwindcss", "categories": ["Docs", "CSS", "Reference"] })} ${renderComponent($$result4, "LinkCard", $$LinkCard, { "title": "DaisyUI Components", "desc": "Browse DaisyUI's component library and learn how to use them in your project.", "url": "https://daisyui.com/components/", "icon": "simple-icons:daisyui", "categories": ["Components", "UI", "Reference"] })} ${renderComponent($$result4, "LinkCard", $$LinkCard, { "title": "TypeScript Handbook", "desc": "The TypeScript Handbook is a comprehensive guide to the TypeScript language.", "url": "https://www.typescriptlang.org/docs/handbook/intro.html", "icon": "simple-icons:typescript", "categories": ["Docs", "TypeScript", "Reference"] })} </div> </section> <div class="divider my-8"> ${renderComponent($$result4, "Icon", $$Icon, { "name": "lucide:heart", "class": "w-10 h-10 text-primary" })} </div> <div class="text-center"> <p class="text-base-content/80 mb-4">
Want to be featured on this page? Feel free to reach out or contribute to the project!
</p> <a href="https://github.com/EveSunMaple/Frosti" target="_blank" rel="noopener noreferrer" class="btn btn-primary gap-2"> ${renderComponent($$result4, "Icon", $$Icon, { "name": "lucide:github", "class": "w-5 h-5" })} <span>Contribute on GitHub</span> </a> </div> </div> ` })} ${renderComponent($$result3, "Card", $$Card, {}, { "default": ($$result4) => renderTemplate` <div class="p-4 sm:p-6"> <div class="space-y-10"> <section> <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2"> <h2 class="text-2xl font-bold flex items-center gap-2"> ${renderComponent($$result4, "Icon", $$Icon, { "name": "lucide:layout-template", "class": "w-6 h-6 text-primary" })} <span>Sites Using Frosti</span> </h2> <a href="https://github.com/EveSunMaple/Frosti/edit/main/src/pages/friend.astro" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline btn-primary gap-2"> ${renderComponent($$result4, "Icon", $$Icon, { "name": "lucide:plus-circle", "class": "w-4 h-4" })}
Add Your Site
</a> </div> <p class="text-base-content/70 mb-6">
Here is a list of sites built with Frosti. Want to get your site listed? Click the "Add Your Site" button
              in the top right to edit this page by submitting a Pull Request!
</p> <div class="flex flex-wrap items-center gap-3"> ${sites.map((site) => renderTemplate`${renderComponent($$result4, "Showcase", $$Showcase, { "name": site.name, "url": site.url })}`)} </div> </section> </div> </div> ` })} ` })} ` })}`;
}, "F:/Frosti/src/pages/friend.astro", void 0);

const $$file = "F:/Frosti/src/pages/friend.astro";
const $$url = "/friend";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Friend,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
