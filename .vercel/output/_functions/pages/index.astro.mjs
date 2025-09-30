/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BSSrx8qw.mjs';
import { $ as $$BaseLayout, a as $$Icon } from '../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$MainCard } from '../chunks/MainCard_DU4c7EEu.mjs';
import { $ as $$GitHubStats } from '../chunks/GitHubStats_Drh2v5E-.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://duskydream.icu");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainCard", $$MainCard, { "title": "About Shepherd Meng", "description": "XMU Computer Science Student", "textOverlay": "ABOUT", "infoIcon": "lucide:user" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-10 mb-8"> <!-- Profile Section --> <section class="flex flex-col md:flex-row gap-8 items-center md:items-start"> <div class="avatar"> <div class="w-32 h-32 md:w-40 md:h-40 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"> <img src="https://pic1.imgdb.cn/item/65c1c9269f345e8d03080e8d.jpg" alt="Shepherd" width="160" height="160" loading="eager"> </div> </div> <div class="flex-1 text-center md:text-left"> <h1 class="text-3xl md:text-4xl font-bold mb-2">Shepherd</h1> <p class="text-xl text-base-content/80 mb-4">CS Undergraduate & Developer</p> <div class="flex flex-wrap gap-3 justify-center md:justify-start mb-6"> <a href="https://github.com/Duskydream" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:github", "class": "w-4 h-4" })} <span>GitHub</span> </a> <a href="https://x.com/Lxzm1211" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "ri:twitter-x-fill", "class": "w-4 h-4" })} <span>X(twitter)</span> </a> <a href="https://www.zhihu.com/people/ba-er-nian-lin-xi-zhi-meng" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "ri:zhihu-fill", "class": "w-4 h-4" })} <span>Zhihu</span> </a> <a href="https://space.bilibili.com/198625051?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "ri:bilibili-fill", "class": "w-4 h-4" })} <span>Bilibili</span> </a> <a href="mailto:lxzm1211@outlook.com" class="btn btn-sm btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:mail", "class": "w-4 h-4" })} <span>Email</span> </a> </div> <p class="text-base-content/80">
Hello! I'm Shepherd Meng, a student at Xiamen University majoring in Computer Science.
</p> </div> </section> <!-- GitHub Stats --> <section> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:github", "class": "w-6 h-6 text-primary" })} <span>GitHub Statistics</span> </h2> ${renderComponent($$result3, "GitHubStats", $$GitHubStats, { "username": "Duskydream", "showLanguages": false, "showCommitGraph": true })} </section> <!-- Tech Stack --> <section> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:code-2", "class": "w-6 h-6 text-primary" })} <span>Tech Stack</span> </h2> <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"> ${[
    { name: "Astro", icon: "simple-icons:astro", color: "oklch(0.5 0.2 300)" },
    { name: "JavaScript", icon: "simple-icons:javascript", color: "oklch(0.8 0.2 80)" },
    //{ name: "TypeScript", icon: "simple-icons:typescript", color: "oklch(0.6 0.2 250)" },
    //{ name: "React", icon: "simple-icons:react", color: "oklch(0.7 0.2 200)" },
    { name: "Node.js", icon: "simple-icons:nodedotjs", color: "oklch(0.7 0.2 140)" },
    //{ name: "TailwindCSS", icon: "simple-icons:tailwindcss", color: "oklch(0.6 0.2 220)" },
    //{ name: "HTML5", icon: "simple-icons:html5", color: "oklch(0.7 0.2 30)" },
    //{ name: "CSS3", icon: "simple-icons:css3", color: "oklch(0.7 0.2 220)" },
    { name: "Git", icon: "simple-icons:git", color: "oklch(0.7 0.2 30)" },
    { name: "C++", icon: "simple-icons:cplusplus", color: "oklch(0.6 0.2 240)" },
    //{ name: "C#", icon: "simple-icons:csharp", color: "oklch(0.6 0.2 160)" },
    { name: "Python", icon: "simple-icons:python", color: "oklch(0.7 0.2 250)" }
  ].map((tech) => renderTemplate`<div class="flex flex-col items-center justify-center p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"> <div class="text-3xl mb-2"${addAttribute(`color: ${tech.color}`, "style")}> ${renderComponent($$result3, "Icon", $$Icon, { "name": tech.icon, "class": "w-10 h-10" })} </div> <span class="text-sm font-medium">${tech.name}</span> </div>`)} </div> </section> <!-- Contribution Activity --> <section> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:activity", "class": "w-6 h-6 text-primary" })} <span>Recent Activity</span> </h2> <div class="bg-base-200 rounded-xl p-6 overflow-x-auto"> <div class="flex flex-col md:flex-row gap-8 md:gap-4 md:overflow-x-auto md:pb-2"> ${[
    {
      date: "September 2025",
      title: "Web Development",
      desc: "Developed the blog by Astro and TailwindCSS, themed by SunMaple"
    }
  ].map((item, i) => renderTemplate`<div class="relative flex gap-4 pb-2 md:pb-0 md:min-w-[250px]"> <div class="flex flex-col items-center"> <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl"> ${i + 1} </div> <div class="w-0.5 h-16 bg-base-300 mt-2 md:hidden"></div> </div> <div> <div class="text-sm text-base-content/60 mb-1">${item.date}</div> <h3 class="text-lg font-bold">${item.title}</h3> <p class="text-base-content/80 mt-1">${item.desc}</p> </div> </div>`)} </div> </div> </section> </div> ` })} ` })}`;
}, "F:/Frosti/src/pages/index.astro", void 0);

const $$file = "F:/Frosti/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
