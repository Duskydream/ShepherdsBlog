export interface Course {
  id: string;
  name: string;
  teacher: string;
  location: string;
  weekStart: number; // 起始周
  weekEnd: number; // 结束周
  dayOfWeek: number; // 星期几 (1-7)
  periodStart: number; // 开始节次
  periodCount: number; // 持续节次
  color: string; // 卡片颜色主题
  weekType?: 'all' | 'odd' | 'even'; // 周次类型：全周/单周/双周
  weeks?: number[]; // 具体上课周（可选，用于单双周等）
}

export interface TimeSlot {
  period: number;
  startTime: string;
  endTime: string;
}

export interface ScheduleConfig {
  name: string;
  semester: string;
  weekCount: number; // 总周数
  currentWeek: number; // 当前周
  timeSlots: TimeSlot[];
  courses: Course[];
  startDate?: string; // 学期开始日期
}

export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  courses: Course[];
}

export interface AIRecognitionResult {
  success: boolean;
  courses?: Course[];
  timeSlots?: TimeSlot[];
  error?: string;
}

// 默认时间段配置
export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { period: 1, startTime: "08:00", endTime: "08:50" },
  { period: 2, startTime: "09:00", endTime: "09:50" },
  { period: 3, startTime: "10:10", endTime: "11:00" },
  { period: 4, startTime: "11:10", endTime: "12:00" },
  { period: 5, startTime: "13:30", endTime: "14:20" },
  { period: 6, startTime: "14:30", endTime: "15:20" },
  { period: 7, startTime: "15:40", endTime: "16:30" },
  { period: 8, startTime: "16:40", endTime: "17:30" },
  { period: 9, startTime: "18:30", endTime: "19:20" },
  { period: 10, startTime: "19:30", endTime: "20:20" },
  { period: 11, startTime: "20:30", endTime: "21:20" },
  { period: 12, startTime: "21:30", endTime: "22:20" },
];

// 预设颜色主题
export const COLOR_THEMES = [
  {
    name: "粉红",
    bg: "bg-pink-500",
    light: "bg-pink-200",
    text: "text-pink-500",
    border: "border-pink-600",
  },
  {
    name: "红色",
    bg: "bg-red-500",
    light: "bg-red-200",
    text: "text-red-500",
    border: "border-red-600",
  },
  {
    name: "橙色",
    bg: "bg-orange-500",
    light: "bg-orange-200",
    text: "text-orange-500",
    border: "border-orange-600",
  },
  {
    name: "黄色",
    bg: "bg-yellow-500",
    light: "bg-yellow-200",
    text: "text-yellow-500",
    border: "border-yellow-600",
  },
  {
    name: "绿色",
    bg: "bg-green-500",
    light: "bg-green-200",
    text: "text-green-500",
    border: "border-green-600",
  },
  {
    name: "青色",
    bg: "bg-cyan-500",
    light: "bg-cyan-200",
    text: "text-cyan-500",
    border: "border-cyan-600",
  },
  {
    name: "蓝色",
    bg: "bg-blue-500",
    light: "bg-blue-200",
    text: "text-blue-500",
    border: "border-blue-600",
  },
  {
    name: "紫色",
    bg: "bg-purple-500",
    light: "bg-purple-200",
    text: "text-purple-500",
    border: "border-purple-600",
  },
  {
    name: "靛蓝",
    bg: "bg-indigo-500",
    light: "bg-indigo-200",
    text: "text-indigo-500",
    border: "border-indigo-600",
  },
  {
    name: "玫瑰",
    bg: "bg-rose-500",
    light: "bg-rose-200",
    text: "text-rose-500",
    border: "border-rose-600",
  },
];

export const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];
export const MONTHS = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
