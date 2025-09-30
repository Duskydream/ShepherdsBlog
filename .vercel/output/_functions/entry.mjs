import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DPKdCoR1.mjs';
import { manifest } from './manifest_Dxdvo1SS.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/anime.astro.mjs');
const _page3 = () => import('./pages/blog/archives.astro.mjs');
const _page4 = () => import('./pages/blog/categories.astro.mjs');
const _page5 = () => import('./pages/blog/category/_category_/_---page_.astro.mjs');
const _page6 = () => import('./pages/blog/search.astro.mjs');
const _page7 = () => import('./pages/blog/tag/_tag_/_---page_.astro.mjs');
const _page8 = () => import('./pages/blog/tags.astro.mjs');
const _page9 = () => import('./pages/blog/_---page_.astro.mjs');
const _page10 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page11 = () => import('./pages/friend.astro.mjs');
const _page12 = () => import('./pages/home.astro.mjs');
const _page13 = () => import('./pages/log/_slug_.astro.mjs');
const _page14 = () => import('./pages/log.astro.mjs');
const _page15 = () => import('./pages/log.astro2.mjs');
const _page16 = () => import('./pages/project.astro.mjs');
const _page17 = () => import('./pages/robots.txt.astro.mjs');
const _page18 = () => import('./pages/rss.xml.astro.mjs');
const _page19 = () => import('./pages/sitemap.xml.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.13.7_@types+node@24_b69b688b9f5144617a17b4e98068d105/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/anime.astro", _page2],
    ["src/pages/blog/archives.astro", _page3],
    ["src/pages/blog/categories.astro", _page4],
    ["src/pages/blog/category/[category]/[...page].astro", _page5],
    ["src/pages/blog/search.astro", _page6],
    ["src/pages/blog/tag/[tag]/[...page].astro", _page7],
    ["src/pages/blog/tags.astro", _page8],
    ["src/pages/blog/[...page].astro", _page9],
    ["src/pages/blog/[...slug].astro", _page10],
    ["src/pages/friend.astro", _page11],
    ["src/pages/home.astro", _page12],
    ["src/pages/log/[slug].astro", _page13],
    ["src/pages/log/index.astro", _page14],
    ["src/pages/log.astro", _page15],
    ["src/pages/project.astro", _page16],
    ["src/pages/robots.txt.ts", _page17],
    ["src/pages/rss.xml.ts", _page18],
    ["src/pages/sitemap.xml.ts", _page19],
    ["src/pages/index.astro", _page20]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "948a5c26-bf1a-4d8b-a3aa-3c45eccecd56",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
