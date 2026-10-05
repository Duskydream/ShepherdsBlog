// bangumi 数据的类型与共享常量。
//
// 这份文件之前是一份“完整的第二实现”（filterBangumi / normalizePayload），
// 但从来没有被 import 过 —— src/pages/anime.astro 把同样的逻辑内联了一份，
// 于是同一个文件有两套会各自漂移的过滤规则。现在这里只保留 anime.astro
// 真正用得上的类型和常量，过滤逻辑保持内联（页面需要按 URL query 实时过滤，
// 走 Astro.glob 的模块代码反而多一层间接）。
//
// 注意：/api/bangumi 和 functions/bangumi/index.ts 是 edge runtime，
// 不能 import 这个文件（它们是独立编译的部署单元）。

export type MediaType = "anime" | "game";
export type BangumiStatus = "watching" | "wish" | "watched";

export interface BangumiImageSet {
  large?: string;
  common?: string;
  medium?: string;
  small?: string;
}

export interface BangumiSubject {
  id: number;
  name: string;
  name_cn?: string;
  type: number;
  date?: string;
  score?: number;
  tags?: { name: string; count?: number }[];
  summary?: string;
  short_summary?: string;
  images?: BangumiImageSet;
}

export interface BangumiItem {
  subject: BangumiSubject;
  comment?: string;
  updated_at?: string;
  rate?: number;
}

export interface BangumiTimelineEntry {
  type?: string;
  subject?: BangumiSubject;
  summary?: string;
  date?: string;
}

export interface BangumiData {
  watching: BangumiItem[];
  wish: BangumiItem[];
  watched: BangumiItem[];
  timeline?: BangumiTimelineEntry[];
}

/** Bangumi API 的 subject.type 枚举里，动画=2，游戏=4。 */
export const MEDIA_SUBJECT_TYPE: Record<MediaType, number> = {
  anime: 2,
  game: 4,
};

export const MEDIA_LABEL: Record<MediaType, string> = {
  anime: "动画",
  game: "游戏",
};

export const STATUS_LABEL: Record<BangumiStatus, string> = {
  watching: "进行中",
  wish: "待补完",
  watched: "已完成",
};