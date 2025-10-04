import type { APIRoute } from "astro";

// Since the site is built with output: 'static', this endpoint will be prerendered at build time.
// It simply re-exports the prebuild static JSON under /api/bangumi to avoid 404s when the edge function
// (e.g., on Tencent EdgeOne) is not mapped. In a dynamic deployment you can remove this file and rely
// on your platform edge function instead.

// We import the JSON at build time. Using a relative path from project root's perspective is okay because
// Astro will bundle it. If size is large, consider streaming or trimming fields.
import bangumiData from "../../../public/data/bangumi.json";

export const prerender = true; // ensure static generation

export const GET: APIRoute = async ({ url }) => {
  // Provide a minimal shape similar to edge function output.
  // Accept optional force param (ignored here, always static data) so front-end logic stays consistent.
  const force = url.searchParams.get("force");
  const servedFrom = "static-prerender";
  // Attach a cachedAt if not present (the build time acts as timestamp)
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
