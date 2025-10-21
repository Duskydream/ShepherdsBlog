import type { APIRoute } from "astro";
import bangumiData from "../../../public/data/bangumi.json";

export const prerender = true;
export const GET: APIRoute = async ({ url }) => {
  const force = url.searchParams.get("force");
  const servedFrom = "static-prerender";
  const now = Date.now();
  const json: any = bangumiData;
  if (!json.cachedAt) {
    json.cachedAt = now;
  }
  json.servedFrom = servedFrom + (force ? "+force-ignored" : "");

  return new Response(JSON.stringify(json), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
      "X-Bangumi-Served-From": servedFrom,
      "Vary": "*",
    },
  });
};
