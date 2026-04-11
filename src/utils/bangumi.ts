export type MediaType = "anime" | "game";
export type BangumiStatus = "watching" | "wish" | "watched";

export interface BangumiSubject {
  id: number;
  name: string;
  name_cn: string;
  type: number;
  date?: string;
  images?: {
    large?: string;
    common?: string;
  };
}

export interface BangumiItem {
  subject: BangumiSubject;
  comment: string;
}

export interface BangumiData {
  watching: BangumiItem[];
  wish: BangumiItem[];
  watched: BangumiItem[];
}

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

export function filterBangumi(
  data: BangumiData,
  status: BangumiStatus,
  mediaType: MediaType,
  keyword: string,
): BangumiItem[] {
  const source = data[status] || [];
  const typeFilter = MEDIA_SUBJECT_TYPE[mediaType];
  const kw = keyword.toLowerCase().trim();

  return source
    .filter((item) => item.subject?.type === typeFilter)
    .filter((item) => {
      if (!kw) return true;
      const title = item.subject?.name_cn || item.subject?.name || "";
      return title.toLowerCase().includes(kw);
    });
}

export function normalizePayload(payload: unknown): BangumiData {
  const obj = payload as Record<string, unknown> | null;
  return {
    watching: Array.isArray(obj?.watching)
      ? (obj.watching as BangumiItem[])
      : [],
    wish: Array.isArray(obj?.wish) ? (obj.wish as BangumiItem[]) : [],
    watched: Array.isArray(obj?.watched) ? (obj.watched as BangumiItem[]) : [],
  };
}
