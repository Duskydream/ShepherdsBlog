/**
 * 从 markdown 正文抠出一段纯文本摘要。
 *
 * 4 篇 log 只有 title + date，没有 frontmatter description，于是它们在
 * `<meta name="description">`、`og:description` 和 RSS `<description>` 里
 * 都会退回站点通用描述（一页 8 处重复，SEO 上是典型的 duplicate meta）。
 * 这里剥掉 frontmatter / 图片 / 内联 HTML / 标题 / 链接语法后取前 N 个字符。
 *
 * 注意：这是「够用就好」的降级方案，不是渲染器。真正的正文 HTML 另有
 * `astro/container` 渲染（见 src/pages/rss.xml.js 的 content:encoded）。
 *
 * 标题只去掉 `#` 记号而保留文字，不能整行丢掉：几篇 log 的正文几乎全是用
 * `###` 写的短句（配图说明），连标题一起剥掉就什么都不剩，描述又退回站点默认值。
 */
export function excerptOf(body: string | undefined, max = 140): string {
  if (!body) return "";
  const text = body
    .replace(/^---\n[\s\S]*?\n---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
