import { getCollection, type CollectionEntry } from "astro:content";

export type DocsEntry = CollectionEntry<"docs">;
export type ContentSection = "blog" | "log" | "coding-notes";

export const CONTENT_SECTIONS: readonly ContentSection[] = ["blog", "log", "coding-notes"];

export const SECTION_LABELS: Record<ContentSection, string> = {
  blog: "Essay",
  log: "Log",
  "coding-notes": "Notes",
};

/**
 * 判断 docs 集合条目是否为正式内容文章（排除聚合索引页与非文章页）。
 */
export function isContentPost(entry: DocsEntry, section?: ContentSection | string): boolean {
  if (entry.id.endsWith("/index.md") || entry.id.endsWith("/index")) return false;
  if (section) return entry.id.startsWith(`${section}/`);
  return CONTENT_SECTIONS.some((prefix) => entry.id.startsWith(`${prefix}/`));
}

/**
 * 按发布日期倒序（日期相同时按 id 倒序）获取文章列表。
 */
export async function getSortedPosts(section?: ContentSection | string): Promise<DocsEntry[]> {
  const entries = await getCollection("docs", (entry) => isContentPost(entry, section));
  return entries.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA || b.id.localeCompare(a.id);
  });
}

/**
 * 获取文章所属分类的展示名称与视觉层级（1~3）。
 */
export function getSectionMeta(entryOrId: DocsEntry | string) {
  const id = typeof entryOrId === "string" ? entryOrId : entryOrId.id;
  const sectionSlug = id.split("/")[0] as ContentSection;
  const index = CONTENT_SECTIONS.indexOf(sectionSlug);
  return {
    sectionSlug,
    sectionLabel: SECTION_LABELS[sectionSlug] ?? sectionSlug,
    sectionLevel: (index < 0 ? 3 : index) + 1,
  };
}

/**
 * 生成带尾斜杠的规范化文章路由。
 */
export function getPostHref(entryOrId: DocsEntry | string): string {
  const rawId = typeof entryOrId === "string" ? entryOrId : entryOrId.id;
  const clean = rawId
    .replace(/\.(md|mdx)$/i, "")
    .replace(/\/index$/i, "")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  return `/${clean}/`;
}

/**
 * 生成带尾斜杠的标签路由。
 */
export function getTagHref(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`;
}

/**
 * 将日期格式化为 YYYY-MM-DD。
 */
export function formatIsoDate(value: Date | undefined): string {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

export interface TagStat {
  tag: string;
  count: number;
  level: number;
  size: number;
  fontWeight: number;
}

/**
 * 统计文章集合中的标签频次与标签云排版权重。
 */
export function collectTagStats(posts: DocsEntry[]): TagStat[] {
  const tagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const maxCount = Math.max(...tagCounts.values(), 1);
  return [...tagCounts.entries()]
    .map(([tag, count]) => {
      const ratio = count / maxCount;
      const level = count === 1 ? 1 : Math.min(5, Math.ceil(ratio * 5));
      const size = 0.72 + ratio * 0.38;
      const fontWeight = 400 + Math.round(ratio * 3) * 100;
      return { tag, count, level, size, fontWeight };
    })
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
