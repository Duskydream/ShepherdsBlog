import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allDocs = await getCollection('docs');
  const posts = allDocs.filter((entry) => 
    (entry.id.startsWith("blog/") || entry.id.startsWith("log/") || entry.id.startsWith("coding-notes/")) &&
    !entry.id.endsWith("index.md")
  );

  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  return rss({
    title: 'Shepherd\'s Blog',
    description: 'Learning notes and personal logs',
    site: context.site || 'https://duskydream.icu',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date ? new Date(post.data.date) : new Date(),
      description: post.data.description || '',
      link: `/${post.id}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
