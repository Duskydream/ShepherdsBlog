/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BSSrx8qw.mjs';
import { a as $$Icon, $ as $$BaseLayout } from '../chunks/BaseLayout_KMbkoCGG.mjs';
import { $ as $$MainCard } from '../chunks/MainCard_DU4c7EEu.mjs';
import { $ as $$GitHubStats } from '../chunks/GitHubStats_Drh2v5E-.mjs';
import '../chunks/index_MaT6fT73.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_Bt0X4mJE.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://duskydream.icu");
const $$RepositoryCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RepositoryCard;
  const { repo, image, isPinned = false } = Astro2.props;
  const [_, repoName] = repo.split("/");
  return renderTemplate`${renderComponent($$result, "repository-card", "repository-card", { "class": "card bg-base-100 shadow-md hover:shadow-xl overflow-hidden border border-base-200 transition-transform duration-300 ease-in-out", "data-repo": repo, "data-pinned": isPinned ? "true" : "false", "data-astro-cid-imm6gg76": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="relative" data-astro-cid-imm6gg76> ${image ? renderTemplate`<div class="aspect-video w-full overflow-hidden" data-astro-cid-imm6gg76> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": repoName || repo, "width": 600, "height": 315, "format": "webp", "loading": "lazy", "class": "w-full h-full object-cover", "data-astro-cid-imm6gg76": true })} </div>` : renderTemplate`<div class="aspect-video w-full overflow-hidden bg-gradient-to-br from-base-300 to-base-100 flex items-center justify-center repo-placeholder" data-astro-cid-imm6gg76> <div class="text-4xl font-bold text-primary opacity-30" data-astro-cid-imm6gg76> ${(repoName || repo).substring(0, 2).toUpperCase()} </div> </div>`} ${isPinned && renderTemplate`<div class="absolute top-3 right-3" data-astro-cid-imm6gg76> <div class="badge badge-primary gap-1" data-astro-cid-imm6gg76> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:pin", "class": "w-3 h-3", "data-astro-cid-imm6gg76": true })}
Pinned
</div> </div>`} </div> <div class="card-body p-4" data-astro-cid-imm6gg76> <div class="flex flex-col justify-between h-full" data-astro-cid-imm6gg76> <div data-astro-cid-imm6gg76> <h2 class="card-title text-lg font-bold line-clamp-1 repo-title" data-astro-cid-imm6gg76> <span class="loading loading-dots loading-xs" data-astro-cid-imm6gg76></span> </h2> <p class="text-base-content/70 text-sm my-2 line-clamp-2 repo-description" data-astro-cid-imm6gg76> <span class="loading loading-dots loading-xs" data-astro-cid-imm6gg76></span> Loading repository information...
</p> </div> <div class="mt-4 pt-2 border-t border-base-200" data-astro-cid-imm6gg76> <div class="flex flex-wrap gap-3 justify-between items-center text-sm" data-astro-cid-imm6gg76> <div class="flex items-center gap-1 repo-language" data-astro-cid-imm6gg76> <span class="w-3 h-3 rounded-full bg-base-300" data-astro-cid-imm6gg76></span> <span class="text-base-content/70" data-astro-cid-imm6gg76> <span class="loading loading-dots loading-xs" data-astro-cid-imm6gg76></span> </span> </div> <div class="flex items-center gap-3" data-astro-cid-imm6gg76> <div class="flex items-center gap-1 text-base-content/70 repo-stars" data-astro-cid-imm6gg76> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:star", "class": "w-4 h-4", "data-astro-cid-imm6gg76": true })} <span data-astro-cid-imm6gg76><span class="loading loading-spinner loading-xs" data-astro-cid-imm6gg76></span></span> </div> <div class="flex items-center gap-1 text-base-content/70 repo-forks" data-astro-cid-imm6gg76> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:git-fork", "class": "w-4 h-4", "data-astro-cid-imm6gg76": true })} <span data-astro-cid-imm6gg76><span class="loading loading-spinner loading-xs" data-astro-cid-imm6gg76></span></span> </div> <div class="flex items-center gap-1 text-base-content/70 repo-issues" data-astro-cid-imm6gg76> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:circle-dot", "class": "w-4 h-4", "data-astro-cid-imm6gg76": true })} <span data-astro-cid-imm6gg76><span class="loading loading-spinner loading-xs" data-astro-cid-imm6gg76></span></span> </div> </div> </div> </div> </div> </div> ` })} ${renderScript($$result, "F:/Frosti/src/components/mdx/RepositoryCard.astro?astro&type=script&index=0&lang.ts")} `;
}, "F:/Frosti/src/components/mdx/RepositoryCard.astro", void 0);

const $$Astro = createAstro("https://duskydream.icu");
const $$Project = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Project;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Projects" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainCard", $$MainCard, { "title": "Projects", "description": "A showcase of my open-source projects and contributions on GitHub.", "textOverlay": "PROJECTS", "infoIcon": "lucide:code-2" }, { "default": ($$result3) => renderTemplate`  ${maybeRenderHead()}<section class="py-4"> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:star", "class": "w-6 h-6 text-primary" })} <span>Featured Projects</span> </h2> ${renderComponent($$result3, "GitHubStats", $$GitHubStats, { "username": "EveSunMaple", "repositoryName": "Frosti", "showLanguages": true, "showContributors": true })} </section>  <section class="py-4"> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:folder", "class": "w-6 h-6 text-primary" })} <span>My Repositories</span> </h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> ${renderComponent($$result3, "RepositoryCard", $$RepositoryCard, { "repo": "EveSunMaple/Frosti", "isPinned": true })} ${renderComponent($$result3, "RepositoryCard", $$RepositoryCard, { "repo": "EveSunMaple/SaroProck", "isPinned": true })} ${renderComponent($$result3, "RepositoryCard", $$RepositoryCard, { "repo": "EveSunMaple/astion-static" })} ${renderComponent($$result3, "RepositoryCard", $$RepositoryCard, { "repo": "EveSunMaple/astro-update-theme" })} ${renderComponent($$result3, "RepositoryCard", $$RepositoryCard, { "repo": "EveSunMaple/Word-testing-application" })} ${renderComponent($$result3, "RepositoryCard", $$RepositoryCard, { "repo": "EveSunMaple/Smooth-Snake-Game" })} </div> <div class="flex justify-center mt-10"> <a href="https://github.com/EveSunMaple?tab=repositories" target="_blank" rel="noopener noreferrer" class="btn btn-outline gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:github", "class": "w-5 h-5" })} <span>View More on GitHub</span> </a> </div> </section>  <section class="py-4"> <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:git-pull-request", "class": "w-6 h-6 text-primary" })} <span>Open Source Contributions</span> </h2> <div class="card bg-base-200 p-6"> <ul class="space-y-6"> ${[
    {
      project: "Astro",
      description: "Contributed to performance improvements and bug fixes",
      url: "https://github.com/withastro/astro"
    },
    {
      project: "TailwindCSS",
      description: "Added new utility classes and documentation improvements",
      url: "https://github.com/tailwindlabs/tailwindcss"
    },
    {
      project: "DaisyUI",
      description: "Contributed component enhancements and theme improvements",
      url: "https://github.com/saadeghi/daisyui"
    }
  ].map((contrib) => renderTemplate`<li class="flex items-start gap-4"> <div class="flex-shrink-0 bg-base-300 p-2 rounded-full"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:git-commit", "class": "w-6 h-6 text-primary" })} </div> <div> <h3 class="text-lg font-bold"> <a${addAttribute(contrib.url, "href")} target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors flex items-center gap-1"> ${contrib.project} ${renderComponent($$result3, "Icon", $$Icon, { "name": "lucide:external-link", "class": "w-4 h-4" })} </a> </h3> <p class="text-base-content/80">${contrib.description}</p> </div> </li>`)} </ul> </div> </section> ` })} ` })}`;
}, "F:/Frosti/src/pages/project.astro", void 0);

const $$file = "F:/Frosti/src/pages/project.astro";
const $$url = "/project";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Project,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
