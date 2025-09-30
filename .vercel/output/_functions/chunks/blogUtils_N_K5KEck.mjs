import { getCollection } from './_astro_content_gv3P6M0L.mjs';

async function getAllPosts() {
  const allBlogPosts = await getCollection("blog");
  return allBlogPosts.filter((post) => !post.data.draft) ;
}
function sortPostsByDate(posts) {
  return [...posts].sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}
function sortPostsByPinAndDate(posts) {
  const topPosts = posts.filter((blog) => blog.data.badge === "Pin");
  const otherPosts = posts.filter((blog) => blog.data.badge !== "Pin");
  const sortedTopPosts = sortPostsByDate(topPosts);
  const sortedOtherPosts = sortPostsByDate(otherPosts);
  return [...sortedTopPosts, ...sortedOtherPosts];
}
function getTagsWithCount(posts) {
  const tagMap = /* @__PURE__ */ new Map();
  posts.forEach((post) => {
    if (post.data.tags) {
      post.data.tags.forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    }
  });
  return tagMap;
}
function getCategoriesWithPosts(posts) {
  const categoryMap = /* @__PURE__ */ new Map();
  posts.forEach((post) => {
    if (post.data.categories) {
      post.data.categories.forEach((category) => {
        if (!categoryMap.has(category)) {
          categoryMap.set(category, []);
        }
        categoryMap.get(category).push(post);
      });
    }
  });
  return categoryMap;
}
function getPostsByYearAndMonth(posts) {
  const postsByDate = /* @__PURE__ */ new Map();
  posts.forEach((post) => {
    const date = new Date(post.data.pubDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    if (!postsByDate.has(year)) {
      postsByDate.set(year, /* @__PURE__ */ new Map());
    }
    const yearMap = postsByDate.get(year);
    if (!yearMap.has(month)) {
      yearMap.set(month, []);
    }
    yearMap.get(month).push(post);
  });
  return postsByDate;
}
function generatePageLinks(totalPages) {
  const pages = {
    active: [],
    hidden: []
  };
  if (totalPages > 3) {
    pages.active.push("1");
    pages.active.push("...");
    pages.active.push(totalPages.toString());
    for (let i = 2; i <= totalPages - 1; i++) {
      pages.hidden.push(i.toString());
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.active.push(i.toString());
    }
  }
  return pages;
}
async function getPostsWithStats(posts) {
  return Promise.all(
    posts.map(async (blog) => {
      const { remarkPluginFrontmatter } = await blog.render();
      return {
        ...blog,
        remarkPluginFrontmatter: {
          readingTime: remarkPluginFrontmatter.readingTime,
          totalCharCount: remarkPluginFrontmatter.totalCharCount
        }
      };
    })
  );
}
function getTagColorClass(count, max) {
  const ratio = count / max;
  if (ratio > 0.8)
    return "tag-high";
  if (ratio > 0.6)
    return "tag-medium-high";
  if (ratio > 0.4)
    return "tag-medium";
  if (ratio > 0.2)
    return "tag-medium-low";
  return "tag-low";
}
function getTagFontSize(count, max, min) {
  const normalized = (count - min) / (max - min || 1);
  return 0.9 + normalized * 1.1;
}
function getCategoryColorClass(index) {
  const colorClasses = [
    "category-primary",
    "category-secondary",
    "category-accent",
    "category-info",
    "category-success",
    "category-warning",
    "category-error"
  ];
  return colorClasses[index % colorClasses.length];
}

export { getPostsByYearAndMonth as a, getCategoriesWithPosts as b, getCategoryColorClass as c, generatePageLinks as d, getTagsWithCount as e, getTagColorClass as f, getAllPosts as g, getTagFontSize as h, getPostsWithStats as i, sortPostsByPinAndDate as j, sortPostsByDate as s };
