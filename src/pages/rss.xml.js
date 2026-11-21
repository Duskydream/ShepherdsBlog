import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { render } from 'astro:content';
import starlightConfig from 'virtual:starlight/user-config';
import { getPostHref, getSortedPosts } from '../utils/content';
import { excerptOf } from '../utils/excerpt';

// 站点名/描述要和其他地方（Head.astro、页面 meta、页脚）保持一致，
// 所以直接从 Starlight 配置取，不要在这里再写一份。
//
// 坑：config.title 是按语言分组的记录（{ "zh-CN": "祈りの花庭" }），但
// config.description 在 schemas 里是 z.string()（node_modules/@astrojs/starlight/
// utils/user-config.ts:37），直接 Object.values() 会拿到首字符——之前 feed 的
// <description> 就是字面一个 "I"。两种形态都要兼容。
const localized = (value, fallback) => {
  if (typeof value === 'string' && value) return value;
  if (value && typeof value === 'object') return Object.values(value)[0] ?? fallback;
  return fallback;
};
const siteTitle = localized(starlightConfig.title, '祈りの花庭');
const siteDescription = localized(starlightConfig.description, 'Inori no Hananiwa · The Garden of Prayer');

const FALLBACK_SITE = 'https://www.lxzm.space';

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);

/**
 * 清理 Starlight 渲染出的正文 HTML，使其适合外部 RSS 阅读器：
 * 1. 去掉标题旁的锚点链接（`.sl-anchor-link`）、屏幕阅读器提示（`.sr-only`）以及外层 `.sl-heading-wrapper`；
 * 2. 把站内根相对路径（`src="/..."`、`href="/..."`、`srcset="/... 800w"`）重写为绝对 URL。
 */
function sanitizeRssHtml(html, site) {
  const baseUrl = site ?? FALLBACK_SITE;
  return html
    .replace(/<a\b[^>]*\bclass=(["'])[^"']*\bsl-anchor-link\b[^"']*\1[^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<span\b[^>]*\bclass=(["'])[^"']*\bsr-only\b[^"']*\1[^>]*>[\s\S]*?<\/span>/gi, '')
    .replace(
      /<div\b[^>]*\bclass=(["'])[^"']*\bsl-heading-wrapper\b[^"']*\1[^>]*>\s*(<h[1-6]\b[\s\S]*?<\/h[1-6]>)\s*<\/div>/gi,
      '$2',
    )
    .replace(/\b(src|href)=(["'])(\/(?!\/)[^"']*)\2/gi, (_, attr, quote, relPath) => {
      return `${attr}=${quote}${new URL(relPath, baseUrl).href}${quote}`;
    })
    .replace(/\bsrcset=(["'])([^"']*)\1/gi, (_, quote, value) => {
      const rewritten = value.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g, (_, prefix, relPath) => {
        return `${prefix}${new URL(relPath, baseUrl).href}`;
      });
      return `srcset=${quote}${rewritten}${quote}`;
    });
}

export async function GET(context) {
  const site = context.site ?? new URL(FALLBACK_SITE);
  const sortedPosts = await getSortedPosts();

  // 无日期的条目不能用 new Date()（= 构建时刻），否则每次构建 feed 都会变，
  // 而且比站点内容还“新”。干脆跳过，并在排序时沉到末尾。
  const dated = sortedPosts.filter((post) => post.data.date);
  const undated = sortedPosts.filter((post) => !post.data.date);

  /** 带全文（<content:encoded>）的最新条目数。 */
  const FULL_TEXT_LIMIT = 5;

  // 正文 HTML 要真渲染出来才能进 <content:encoded>。注意不能写成
  // `render(post).then(({ Content }) => Content())`：在 .js endpoint（没有 Astro
  // 渲染上下文）里直接调用组件会抛 "Invalid arguments passed to component."，
  // 之前被 .catch(() => null) 静默吃掉，导致 feed 里 0 个 content:encoded。
  // astro/container 是官方允许在页面外渲染组件的入口。
  const container = await AstroContainer.create();

  const items = await Promise.all(
    [...dated, ...undated].map(async (post, index) => {
      const url = new URL(getPostHref(post), site).href;
      const description = post.data.description || excerptOf(post.body);
      const categories = [post.data.categories ?? [], post.data.tags ?? []].flat();
      const author = post.data.author;
      // 全文只给最新几篇。长篇译文全塞进 feed 会导致体积暴涨，
      // 而订阅器每轮询一次都要重下整个 feed。
      const body = index < FULL_TEXT_LIMIT
        ? await render(post)
            .then(({ Content }) => container.renderToString(Content, { props: {} }))
            .then((html) => sanitizeRssHtml(html, site))
            .catch((error) => {
              console.warn(`[rss] ${post.id} 正文渲染失败，只输出摘要：${error.message}`);
              return null;
            })
        : null;
      return {
        title: post.data.title,
        // 没有 date 就不写 pubDate（RSS 2.0 里它是可选的），
        // 早于写一个假的"今天"。
        ...(post.data.date ? { pubDate: new Date(post.data.date) } : {}),
        link: url,
        ...(description ? { description } : {}),
        ...(body ? { content: body } : {}),
        ...(categories.length ? { categories } : {}),
        ...(author ? { author } : {}),
        customData: [
          `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
          `<dc:creator>${escapeXml(author ?? 'Shepherd Meng')}</dc:creator>`,
        ].join(''),
      };
    }),
  );

  const latest = dated.reduce(
    (max, post) => Math.max(max, new Date(post.data.date).getTime()),
    0,
  );

  return rss({
    title: siteTitle,
    description: siteDescription,
    site,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom', dc: 'http://purl.org/dc/elements/1.1/' },
    items,
    customData: [
      `<language>zh-cn</language>`,
      `<generator>Astro + @astrojs/starlight</generator>`,
      `<lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>`,
      `<atom:link href="${escapeXml(new URL('/rss.xml', site).href)}" rel="self" type="application/rss+xml"/>`,
      `<docs>https://www.rssboard.org/rss-specification</docs>`,
    ].join(''),
  });
}