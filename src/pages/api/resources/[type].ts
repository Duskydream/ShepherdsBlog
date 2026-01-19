import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";

export const GET: APIRoute = ({ params }) => {
  const type = params.type as "pdf" | "ppt";

  try {
    const publicDir = path.join(process.cwd(), "public", "resources", type);

    if (!fs.existsSync(publicDir)) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const extensions = type === "pdf" ? [".pdf"] : [".ppt", ".pptx"];
    const files = fs
      .readdirSync(publicDir)
      .filter((file) => extensions.some((ext) => file.endsWith(ext)));

    const fileInfos = files.map((file) => {
      const filePath = path.join(publicDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        modified: stats.mtime.toISOString(),
      };
    });

    return new Response(JSON.stringify(fileInfos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  catch (error) {
    console.error("读取文件列表失败:", error);
    return new Response(JSON.stringify({ error: "读取失败" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
