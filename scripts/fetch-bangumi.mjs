/**
 * Prebuild script: fetch Bangumi data and write to public/data/bangumi.json.
 * Used as a static fallback when the runtime function fails.
 */
import fs from "node:fs/promises";
import path from "node:path";

const USER_ID = "duskydream";
const BASE = `https://api.bgm.tv/v0/users/${USER_ID}/collections`;
const LIMIT = 30;
const DEBUG_MAX_BODY = 400;

function truncateForDebug(value) {
  return value.length > DEBUG_MAX_BODY ? `${value.slice(0, DEBUG_MAX_BODY)}...` : value;
}

async function fetchCollection(type) {
  let page = 1;
  const all = [];

  while (true) {
    const url = `${BASE}?type=${type}&limit=${LIMIT}&offset=${(page - 1) * LIMIT}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)" },
    });

    if (!res.ok) {
      const detail = truncateForDebug(await res.text());
      throw new Error(`Bangumi upstream ${res.status} for type=${type} page=${page}: ${detail}`);
    }

    const json = await res.json();
    if (!json.data || json.data.length === 0) break;
    all.push(...json.data);
    if (json.data.length < LIMIT) break;
    page++;
  }

  return all;
}

async function enrichSummaries(items, existingMap) {
  const BATCH_SIZE = 5;
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (item) => {
        const id = item.subject_id || item.subject?.id;
        if (!id) return;
        if (existingMap.has(id)) {
          item.subject.summary = existingMap.get(id);
          return;
        }
        try {
          const res = await fetch(`https://api.bgm.tv/v0/subjects/${id}`, {
            headers: { "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)" },
          });
          if (res.ok) {
            const data = await res.json();
            if (data.summary) {
              item.subject.summary = data.summary;
              existingMap.set(id, data.summary);
            }
          }
        } catch {
          // ignore network failure for individual subject
        }
      })
    );
  }
}

async function fetchTimeline() {
  try {
    const url = `https://bgm.tv/feed/user/${USER_ID}/timeline`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)" },
    });
    if (!res.ok) return [];
    const text = await res.text();
    const items = [];
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g);
    for (const m of itemMatches) {
      const raw = m[1];
      const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/);
      const descMatch = raw.match(/<description>([\s\S]*?)<\/description>/);
      const pubDateMatch = raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const guidMatch = raw.match(/<guid[^>]*>([\s\S]*?)<\/guid>/);

      const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
      const desc = descMatch ? descMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
      const guid = guidMatch ? guidMatch[1].trim() : '';

      const subjectMatch = desc.match(/href="https?:\/\/bgm\.tv\/subject\/(\d+)"/);
      const subjectId = subjectMatch ? Number(subjectMatch[1]) : 0;
      const cnNameMatch = desc.match(/data-subject-name-cn="([^"]*)"/);
      const subjectNameCn = cnNameMatch ? cnNameMatch[1] : '';

      const actionMatch = title.match(/^(在玩|读过|在读|想读|看过|在看|想看|想玩|搁置|抛弃)/);
      const action = actionMatch ? actionMatch[1] : '更新了';
      const cleanTitle = title.replace(/^(在玩|读过|在读|想读|看过|在看|想看|想玩|搁置|抛弃)\s*/, '');

      items.push({
        guid,
        title,
        action,
        cleanTitle,
        subjectId,
        subjectNameCn,
        pubDate,
        dateFormatted: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : '',
      });
    }
    return items;
  } catch (err) {
    console.warn('[bangumi] 抓取时间胶囊失败:', err.message);
    return [];
  }
}

async function fetchUserProfile() {
  const bio = [
    "杉菜水姫、松本文纪、深泽秀行、MANYO",
    "永久眷恋着天国的音乐妖精",
    "Innocent Grey、貴方へ捧ぐ戀紅色の花",
    "直观>印象>分析、随缘百合",
    "关于如何对抗遗忘",
  ];
  try {
    const url = `https://api.bgm.tv/v0/users/${USER_ID}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ShepherdBlog/1.0 (+github.com/Duskydream)" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      nickname: data.nickname || "Lxzm",
      username: data.username || "duskydream",
      avatar: data.avatar?.large || data.avatar?.medium || "",
      sign: data.sign || "Everything that rises must converge",
      bio,
      url: data.url || `https://bgm.tv/user/${USER_ID}`,
    };
  } catch (err) {
    console.warn("[bangumi] 获取用户资料失败:", err.message);
    return null;
  }
}

async function main() {
  console.log("[bangumi] 开始抓取...");

  const outDir = path.resolve(process.cwd(), "public", "data");
  const jsonPath = path.join(outDir, "bangumi.json");
  const existingMap = new Map();
  let existing = {};

  try {
    const existingRaw = await fs.readFile(jsonPath, "utf-8");
    existing = JSON.parse(existingRaw);
    for (const list of [existing.watching, existing.wish, existing.watched]) {
      if (Array.isArray(list)) {
        for (const it of list) {
          const id = it.subject_id || it.subject?.id;
          if (id && it.subject?.summary) {
            existingMap.set(id, it.subject.summary);
          }
        }
      }
    }
  } catch {
    // ignore if file does not exist
  }

  const [watching, wish, watched, timeline, user] = await Promise.all([
    fetchCollection(3),
    fetchCollection(1),
    fetchCollection(2),
    fetchTimeline(),
    fetchUserProfile(),
  ]);

  const totalItems = watching.length + wish.length + watched.length;
  if (totalItems === 0) {
    throw new Error("Bangumi upstream returned an empty payload for all collections");
  }

  console.log(`[bangumi] 正在获取完整简介 (${totalItems} items)...`);
  await enrichSummaries([...watching, ...wish, ...watched], existingMap);

  const defaultBio = [
    "杉菜水姫、松本文纪、深泽秀行、MANYO",
    "永久眷恋着天国的音乐妖精",
    "Innocent Grey、貴方へ捧ぐ戀紅色の花",
    "直观>印象>分析、随缘百合",
    "关于如何对抗遗忘",
  ];

  const payload = {
    user: user || existing.user || {
      nickname: "Lxzm",
      username: "duskydream",
      avatar: "https://lain.bgm.tv/pic/user/l/000/85/16/851657_upVeN.jpg?r=1781703517&hd=1",
      sign: "Everything that rises must converge",
      bio: defaultBio,
      url: "https://bgm.tv/user/duskydream",
    },
    watching,
    wish,
    watched,
    timeline: timeline.length > 0 ? timeline : (existing.timeline || []),
    cachedAt: Date.now(),
  };

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    jsonPath,
    JSON.stringify(payload, null, 2),
    "utf-8",
  );

  console.log(`[bangumi] 写入完成 public/data/bangumi.json (${totalItems} items, ${payload.timeline.length} timeline events)`);
}

main().catch((error) => {
  console.error("[bangumi] 抓取失败，保留现有 public/data/bangumi.json:", error);
});
