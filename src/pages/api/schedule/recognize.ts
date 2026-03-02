import type { APIRoute } from "astro";
import { Buffer } from "node:buffer";

export const prerender = false;

interface RecognizedCourse {
  name: string;
  teacher?: string;
  location?: string;
  weekStart?: number;
  weekEnd?: number;
  dayOfWeek?: number;
  periodStart?: number;
  periodCount?: number;
}

const COLOR_FALLBACKS = [
  "bg-pink-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-rose-500",
];

function normalizeCourses(raw: unknown): any[] {
  if (!Array.isArray(raw))
    return [];

  return raw
    .map((course, index) => {
      const item = (course || {}) as RecognizedCourse;
      const weekStart = Number(item.weekStart || 1);
      const weekEnd = Number(item.weekEnd || Math.max(16, weekStart));
      const periodStart = Number(item.periodStart || 1);
      const periodCount = Number(item.periodCount || 2);
      const dayOfWeek = Number(item.dayOfWeek || 1);

      return {
        id: `api-${Date.now()}-${index}`,
        name: String(item.name || "未命名课程").trim(),
        teacher: String(item.teacher || "待确认").trim(),
        location: String(item.location || "待确认").trim(),
        weekStart: Number.isFinite(weekStart) ? Math.max(1, weekStart) : 1,
        weekEnd: Number.isFinite(weekEnd) ? Math.max(1, weekEnd) : Math.max(16, weekStart),
        dayOfWeek: Number.isFinite(dayOfWeek) ? Math.min(7, Math.max(1, dayOfWeek)) : 1,
        periodStart: Number.isFinite(periodStart) ? Math.max(1, periodStart) : 1,
        periodCount: Number.isFinite(periodCount) ? Math.max(1, periodCount) : 2,
        color: COLOR_FALLBACKS[index % COLOR_FALLBACKS.length],
      };
    })
    .filter((course) => course.name && course.name !== "未命名课程");
}

function extractJson(text: string): any {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  }
  catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match)
      return null;
    try {
      return JSON.parse(match[0]);
    }
    catch {
      return null;
    }
  }
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File)) {
    return new Response(JSON.stringify({ success: false, error: "缺少图片文件" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userApiKey = request.headers.get("x-user-ai-token")?.trim();
  const apiKey = userApiKey || import.meta.env.OPENAI_API_KEY;
  const apiBaseUrl = import.meta.env.SCHEDULE_AI_BASE_URL || "https://api.openai.com/v1";
  const model = import.meta.env.SCHEDULE_AI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    return new Response(JSON.stringify({ success: false, error: "未配置可用 API Token（本地或服务器）" }), {
      status: 501,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const bytes = Buffer.from(await image.arrayBuffer()).toString("base64");
    const mimeType = image.type || "image/png";

    const prompt = [
      "你是专业的课表识别助手。请仔细分析图片中的课程表，提取所有课程信息。",
      "",
      "**分析要点：**",
      "- 图片可能是课表截图、表格、或手写课表",
      "- 横轴通常是星期（周一到周日），纵轴是节次（第1-12节）",
      "- 每个单元格可能包含：课程名、教师、教室、周次范围",
      "- 周次格式示例：1-16周、单周、双周、1-8,10-16周",
      "",
      "**输出格式（纯 JSON，不要markdown代码块）：**",
      "{\"courses\":[{\"name\":\"高等数学\",\"teacher\":\"张三\",\"location\":\"东教108\",\"weekStart\":1,\"weekEnd\":16,\"dayOfWeek\":1,\"periodStart\":1,\"periodCount\":2}]}",
      "",
      "**字段说明：**",
      "- name: 课程名称（必填）",
      "- teacher: 教师姓名（不清楚填\"待确认\"）",
      "- location: 上课地点（不清楚填\"待确认\"）",
      "- weekStart: 起始周（1-20）",
      "- weekEnd: 结束周（1-20）",
      "- dayOfWeek: 星期几（1=周一, 7=周日）",
      "- periodStart: 开始节次（1-12）",
      "- periodCount: 持续节数（1-4，连续上几节）",
      "",
      "**注意：**",
      "- 如果看到\"1-16周\"这样的范围，提取为 weekStart:1, weekEnd:16",
      "- 如果一门课跨多个单元格（如上午2节），periodCount 设为 2",
      "- 尽可能提取所有能看到的课程",
      "- 输出纯 JSON，不要包含 ```json 这样的标记",
    ].join("\n");

    const response = await fetch(`${apiBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${bytes}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return new Response(JSON.stringify({ success: false, error: "上游识别服务调用失败", detail }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = extractJson(typeof content === "string" ? content : "");
    const courses = normalizeCourses(parsed?.courses);

    if (courses.length === 0) {
      return new Response(JSON.stringify({ success: false, error: "未识别到有效课程" }), {
        status: 422,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, source: userApiKey ? "api-user-token" : "api", courses }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "识别过程异常",
        detail: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
