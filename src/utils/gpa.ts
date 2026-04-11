export interface Course {
  id: string;
  name: string;
  credit: number;
  score: number;
}

export type GPAScale = "4.0" | "4.3" | "5.0";

interface GradeRule {
  min: number;
  max: number;
  grade: string;
  gp: Record<GPAScale, number>;
}

export const GRADE_RULES: GradeRule[] = [
  { min: 90, max: 100, grade: "A", gp: { "4.0": 4.0, "4.3": 4.0, "5.0": 5.0 } },
  { min: 85, max: 89, grade: "A-", gp: { "4.0": 3.7, "4.3": 3.7, "5.0": 4.5 } },
  { min: 82, max: 84, grade: "B+", gp: { "4.0": 3.3, "4.3": 3.3, "5.0": 4.0 } },
  { min: 78, max: 81, grade: "B", gp: { "4.0": 3.0, "4.3": 3.0, "5.0": 3.5 } },
  { min: 75, max: 77, grade: "B-", gp: { "4.0": 2.7, "4.3": 2.7, "5.0": 3.0 } },
  { min: 72, max: 74, grade: "C+", gp: { "4.0": 2.3, "4.3": 2.3, "5.0": 2.5 } },
  { min: 68, max: 71, grade: "C", gp: { "4.0": 2.0, "4.3": 2.0, "5.0": 2.0 } },
  { min: 64, max: 67, grade: "C-", gp: { "4.0": 1.5, "4.3": 1.5, "5.0": 1.5 } },
  { min: 60, max: 63, grade: "D", gp: { "4.0": 1.0, "4.3": 1.0, "5.0": 1.0 } },
  { min: 0, max: 59, grade: "F", gp: { "4.0": 0, "4.3": 0, "5.0": 0 } },
];

export function getGradeInfo(
  score: number,
  scale: GPAScale,
): { grade: string; gp: number } {
  const rule = GRADE_RULES.find((r) => score >= r.min && score <= r.max);
  if (!rule) return { grade: "F", gp: 0 };
  return { grade: rule.grade, gp: rule.gp[scale] };
}

export interface GPAStats {
  totalCredits: number;
  courseCount: number;
  gpa: number;
  avgScore: number;
}

export function calculateStats(courses: Course[], scale: GPAScale): GPAStats {
  if (courses.length === 0) {
    return { totalCredits: 0, courseCount: 0, gpa: 0, avgScore: 0 };
  }

  let totalCredits = 0;
  let totalGradePoints = 0;
  let totalScore = 0;

  for (const course of courses) {
    const { gp } = getGradeInfo(course.score, scale);
    totalCredits += course.credit;
    totalGradePoints += course.credit * gp;
    totalScore += course.credit * course.score;
  }

  return {
    totalCredits,
    courseCount: courses.length,
    gpa: totalCredits > 0 ? totalGradePoints / totalCredits : 0,
    avgScore: totalCredits > 0 ? totalScore / totalCredits : 0,
  };
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function exportToMarkdown(courses: Course[], scale: GPAScale): string {
  const stats = calculateStats(courses, scale);
  const scaleNames: Record<GPAScale, string> = {
    "4.0": "4.0制（标准）",
    "4.3": "4.3制",
    "5.0": "5.0制",
  };
  const date = new Date().toLocaleDateString("zh-CN");

  let md = `# GPA 成绩单\n\n`;
  md += `> 导出时间：${date}\n`;
  md += `> 绩点制度：${scaleNames[scale]}\n\n`;
  md += `## 统计信息\n\n`;
  md += `| 项目 | 数值 |\n| --- | --- |\n`;
  md += `| 总学分 | ${stats.totalCredits.toFixed(1)} |\n`;
  md += `| 课程数 | ${stats.courseCount} |\n`;
  md += `| 综合GPA | **${stats.gpa.toFixed(2)}** |\n`;
  md += `| 加权平均分 | ${stats.avgScore.toFixed(1)} |\n\n`;
  md += `## 课程明细\n\n`;
  md += `| 课程名称 | 学分 | 成绩 | 等级 | 绩点 |\n| --- | :---: | :---: | :---: | :---: |\n`;

  for (const course of courses) {
    const { grade, gp } = getGradeInfo(course.score, scale);
    md += `| ${course.name} | ${course.credit} | ${course.score} | ${grade} | ${gp.toFixed(1)} |\n`;
  }

  return md;
}
