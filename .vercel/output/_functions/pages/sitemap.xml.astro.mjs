import rss from '@astrojs/rss';
import { b as SITE_DESCRIPTION, c as SITE_TITLE } from '../chunks/config_DCCOjQe-.mjs';
import { getCollection } from '../chunks/_astro_content_gv3P6M0L.mjs';
export { renderers } from '../renderers.mjs';

async function GET(context) {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sortedPosts.map((blog) => ({
      ...blog.data,
      link: `/blog/${blog.slug}/`
    }))
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
