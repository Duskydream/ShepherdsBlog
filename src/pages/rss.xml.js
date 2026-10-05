import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';
import starlightConfig from 'virtual:starlight/user-config';
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

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);

export async function GET(context) {
  const site = context.site ?? new URL(context.url.origin);
  const allDocs = await getCollection('docs');
  const posts = allDocs.filter(
    (entry) =>
      (entry.id.startsWith('blog/') ||
        entry.id.startsWith('log/') ||
        entry.id.startsWith('coding-notes/')) &&
      !entry.id.endsWith('index.md'),
  );

  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

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
      const url = new URL(`/${post.id}/`, site).href;
      const description = post.data.description || excerptOf(post.body);
      const categories = [post.data.categories ?? [], post.data.tags ?? []].flat();
      const author = post.data.author;
      // 全文只给最新几篇。8 篇里有单篇 7 万字的翻译，全塞进 feed 会变成
      // 600 KB 原始 / 115 KB gzip，而订阅器每轮询一次都要重下整个 feed。
      const body = index < FULL_TEXT_LIMIT
        ? await render(post)
            .then(({ Content }) => container.renderToString(Content, { props: {} }))
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