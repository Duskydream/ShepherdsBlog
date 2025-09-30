import type { APIRoute } from "astro";

export const prerender = false; // 禁止预渲染，保证运行时执行

export const GET: APIRoute = async () => {
  try {
    const res = await fetch(
      "https://api.bgm.tv/v0/users/你的用户名/collections?type=watching",
      {
      },
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch Bangumi API" }), {
        status: 500,
      });
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
