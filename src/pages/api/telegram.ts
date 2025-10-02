import type { APIRoute } from "astro";

const BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

// 缓存，避免频繁拉取
let cache: { posts: any[]; timestamp: number } | null = null;

// 获取 Telegram 文件下载 URL
function getFileUrl(filePath: string) {
  return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
}

// 分页函数
function paginate(posts: any[], page: number, limit: number) {
  const start = (page - 1) * limit;
  return {
    page,
    limit,
    total: posts.length,
    posts: posts.slice(start, start + limit),
  };
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const limit = Number(url.searchParams.get("limit") || "10");

  try {
    // 缓存 2 分钟
    if (cache && Date.now() - cache.timestamp < 2 * 60 * 1000) {
      return new Response(JSON.stringify(paginate(cache.posts, page, limit)), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // 调用 Telegram getUpdates
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    const data = await res.json();

    const posts = await Promise.all(
      (data.result || [])
        .filter((m: any) => {
          const chat = m.channel_post?.chat || m.message?.chat;
          return chat && chat.id.toString() === CHAT_ID;
        })
        .map(async (m: any) => {
          const msg = m.channel_post || m.message;
          let imageUrl = null;

          if (msg.photo) {
            const biggest = msg.photo[msg.photo.length - 1];
            const fileRes = await fetch(
              `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${biggest.file_id}`,
            );
            const fileData = await fileRes.json();
            imageUrl = getFileUrl(fileData.result.file_path);
          }

          return {
            id: msg.message_id,
            text: msg.text || msg.caption || "",
            date: new Date(msg.date * 1000).toISOString(),
            image: imageUrl,
          };
        }),
    );

    const sorted = posts.reverse();
    cache = { posts: sorted, timestamp: Date.now() };

    return new Response(JSON.stringify(paginate(sorted, page, limit)), {
      headers: { "Content-Type": "application/json" },
    });
  }
  catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};
