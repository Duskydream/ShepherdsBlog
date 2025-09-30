/* empty css                                 */
import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_BSSrx8qw.mjs';
import { a as $$Icon, $ as $$BaseLayout } from '../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$MainCard } from '../chunks/MainCard_DU4c7EEu.mjs';
import { $ as $$GitHubStats } from '../chunks/GitHubStats_Drh2v5E-.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://duskydream.icu");
const $$FeatureCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeatureCard;
  const {
    title,
    description,
    icon,
    color = "oklch(0.6 0.2 250)"
    // Default blue color
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card bg-base-100 shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-1 border border-base-200"> <div class="card-body p-6"> <div class="flex flex-col items-center text-center sm:items-start sm:text-left"> <div class="mb-4 p-3 rounded-lg"${addAttribute(`background-color: color-mix(in oklch, ${color}, transparent 90%); color: ${color};`, "style")}> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-8 h-8" })} </div> <h3 class="text-xl font-bold mb-2">${title}</h3> <p class="text-base-content/70">${description}</p> </div> </div> </div>`;
}, "F:/Frosti/src/components/mdx/FeatureCard.astro", void 0);

const $$Astro = createAstro("https://duskydream.icu");
const $$Home = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Home;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Shepherd's Blog" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainCard", $$MainCard, { "title": "Welcome to Shepherd's Blog", "description": "A modern, responsive, feature-rich blog theme for Astro with dark/light mode and customizable options.", "textOverlay": "Blog", "infoIcon": "lucide:info" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8"> <!-- Hero Section --> <section class="py-6"> <div class="flex flex-col items-center text-center"> <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-loose">
🌟 Frosti Blog Theme
</h1> <p class="text-xl text-base-content/80 max-w-3xl mb-8">
A minimal, responsive, and feature-rich Astro blog theme designed for creators who value beautiful content
            presentation and exceptional performance.
</p> <div class="flex flex-wrap gap-4 justify-center"> <a href="/blog" class="btn btn-primary gap-2 btn-shine-effect"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:book-open", "class": "w-5 h-5" })} <span>Explore Blog</span> </a> <a href="https://github.com/EveSunMaple/Frosti" target="_blank" class="btn btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:github", "class": "w-5 h-5" })} <span>Star on GitHub</span> </a> </div> </div> </section> <!-- Features Section --> <section class="py-6"> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:sparkles", "class": "w-6 h-6 text-primary" })} <span>Features</span> </h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${renderComponent($$result3, "FeatureCard", $$FeatureCard, { "title": "Responsive Design", "description": "Fully responsive design that looks great on all devices from mobile to desktop.", "icon": "lucide:smartphone", "color": "oklch(0.7 0.2 30)" })} ${renderComponent($$result3, "FeatureCard", $$FeatureCard, { "title": "Dark/Light Mode", "description": "Toggle between light and dark themes with a beautiful transition effect.", "icon": "lucide:moon", "color": "oklch(0.65 0.2 280)" })} ${renderComponent($$result3, "FeatureCard", $$FeatureCard, { "title": "MDX Support", "description": "Write your content in MDX with full support for React components and JSX.", "icon": "lucide:file-code", "color": "oklch(0.6 0.2 160)" })} ${renderComponent($$result3, "FeatureCard", $$FeatureCard, { "title": "SEO Optimized", "description": "Built-in SEO optimization with meta tags, OpenGraph, and JSON-LD.", "icon": "lucide:search", "color": "oklch(0.6 0.2 200)" })} ${renderComponent($$result3, "FeatureCard", $$FeatureCard, { "title": "Fast Performance", "description": "Optimized for speed with lazy loading, code splitting, and minimal JavaScript.", "icon": "lucide:zap", "color": "oklch(0.8 0.2 80)" })} ${renderComponent($$result3, "FeatureCard", $$FeatureCard, { "title": "Customizable", "description": "Easily customize the theme to match your personal brand and preferences.", "icon": "lucide:palette", "color": "oklch(0.7 0.2 10)" })} </div> </section> <!-- GitHub Stats --> <section class="py-6"> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:github", "class": "w-6 h-6 text-primary" })} <span>Repository Stats</span> </h2> ${renderComponent($$result3, "GitHubStats", $$GitHubStats, { "username": "EveSunMaple", "repositoryName": "Frosti", "showLanguages": true, "showContributors": true })} </section> </div> ` })} ` })}`;
}, "F:/Frosti/src/pages/home.astro", void 0);

const $$file = "F:/Frosti/src/pages/home.astro";
const $$url = "/home";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Home,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
