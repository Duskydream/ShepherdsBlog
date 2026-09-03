# 祈りの花庭 · Shepherd's Blog

> お持ちなさい\
> あなたの望んだその星を\
> \
> And it shall be bestowed upon you,\
> the Star which you have longed for—

一个以文字、记忆与作品记录为中心的个人博客。

**祈りの花庭（Inori no Hananiwa）**建立在 Astro 与 Starlight 之上，经过深度重构后，保留文档站稳定、快速的内容基础，同时加入更具个人气质的编辑式排版、花枝装饰和舞台感交互。

## 关于这个空间

这里收录三种不同的书写：

- **Essay · 散文随笔**：关于情绪、阅读、记忆与生活的长文。
- **Notes · 月累笔记**：编程、算法和学习过程中的整理与思考。
- **Log · 岁月手记**：日常片段、阶段性记录和当下的留痕。

此外，`Anime Reviews` 页面连接 Bangumi 数据，记录正在观看、待补完和已经完成的动画与游戏。

## 视觉与交互

博客的设计以“安静阅读的花庭”和“文章展开的舞台”为核心意象：

- 首页是一个内容仪表盘，包含个人介绍、快捷导航、近作列表、提交记录和标签云。
- 深色海蓝色调、细边框、宋体标题和克制的留白共同构成主要视觉语言。
- 桌面端保留左侧目录与右侧文章目录，移动端提供独立的目录抽屉和适配后的阅读布局。
- 侧栏、目录和部分卡片使用藤蔓、花朵与星点作为轻量装饰，不影响正文阅读。
- 页面跳转使用 Astro View Transitions，导航保持连续、自然的舞台换幕感。
- 动画遵循 `prefers-reduced-motion`，在用户要求减少动态效果时自动降低装饰动画。
- 评论区使用 Giscus，并通过 Intersection Observer 延迟加载，避免影响文章首屏速度。

## 技术栈

- [Astro](https://astro.build/) 6：静态生成与页面构建。
- [Starlight](https://starlight.astro.build/)：内容集合、文档布局、搜索和导航基础。
- TypeScript：客户端交互、数据处理和云函数类型约束。
- MDX：支持更灵活的文章内容与组件表达。
- `remark-math`、`rehype-katex`：数学公式渲染。
- `sharp`：图片处理与优化。
- EdgeOne Functions：提供 `/bangumi` 数据接口。
- View Transitions API、CSS `:has()`、Intersection Observer：实现页面转场、内容状态和延迟加载交互。

## 内容与数据

文章位于 `src/content/docs/`，按照栏目分目录：

```text
src/content/docs/
├─ blog/             # Essay · 散文随笔
├─ coding-notes/     # Notes · 编程与学习笔记
├─ log/              # Log · 岁月手记
└─ links.md          # 友链
```

文章的标题、日期、标签等信息由 Frontmatter 管理。栏目首页会自动读取内容集合并按日期整理，不需要手动维护文章列表。

Bangumi 页面采用“动态接口 + 静态兜底 + 浏览器缓存”的方式：

- `functions/bangumi/index.ts` 与 `edgeone/functions/bangumi/index.ts` 提供云函数入口。
- `public/data/bangumi.json` 保存构建时生成的静态数据。
- 页面优先使用本地缓存和接口数据，接口不可用时回退到静态 JSON。
- 番组数据由 `scripts/fetch-bangumi.mjs` 更新，包括收藏列表、简介、时间胶囊和用户资料。

## 项目结构

```text
.
├─ public/
│  ├─ data/bangumi.json          # Bangumi 静态兜底数据
│  └─ favicon.svg
├─ functions/
│  └─ bangumi/index.ts           # 函数源码
├─ edgeone/
│  └─ functions/bangumi/index.ts # EdgeOne 函数入口
├─ scripts/
│  ├─ fetch-bangumi.mjs          # 更新 Bangumi 数据
│  ├─ sync-commits.mjs           # 更新首页提交统计
│  ├─ deploy.mjs                 # 提交并推送部署变更
│  └─ clean-astro.mjs            # 清理 Astro 缓存
├─ src/
│  ├─ components/                # 页面框架、导航、目录与页脚组件
│  ├─ content/docs/              # 博客文章与友链
│  ├─ pages/                     # 首页、栏目页、Bangumi 页和标签页
│  ├─ styles/custom.css          # 全站视觉与响应式样式
│  ├─ utils/bangumi.ts           # Bangumi 数据类型与过滤逻辑
│  └─ utils/floral-vine.ts       # 藤蔓装饰绘制与状态同步
├─ astro.config.mjs
└─ package.json
```

## 本地开发

项目使用 pnpm：

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在 `http://localhost:4321/`。

如果新建文章后页面没有立即出现，可以重启开发服务器，让 Astro 重新同步内容集合。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动本地开发服务器 |
| `pnpm check` | 执行 Astro、TypeScript 与内容诊断 |
| `pnpm build` | 更新提交统计和 Bangumi 数据后构建站点 |
| `pnpm build:fast` | 使用现有本地数据，直接快速构建站点 |
| `pnpm refresh:bangumi` | 单独刷新 Bangumi 静态数据 |
| `pnpm sync:commits` | 单独更新首页提交统计 |
| `pnpm build:functions` | 编译云函数 TypeScript |
| `pnpm preview` | 预览构建后的站点 |
| `pnpm run deploy` | 先执行检查，再运行部署脚本提交并推送变更 |

`pnpm build` 会访问 Bangumi API；如果只是检查页面布局或本地样式，优先使用 `pnpm build:fast`。

## 写作约定

新增文章时，将 Markdown 文件放入对应栏目目录，并补充必要的 Frontmatter。例如：

```md
---
title: 一篇文章的标题
date: 2026-09-03
tags:
  - writing
  - memory
---

正文从这里开始。
```

文章标题、日期和标签会被首页时间线、栏目索引和标签页共同使用。日期建议统一使用 `YYYY-MM-DD` 格式。

## 版权说明

项目中的代码、组件结构和样式实现可供学习 Astro、Starlight 与个人博客重构时参考。

博客中的文章、日志、笔记、原创图片及其他内容默认保留所有权利。未经许可，请勿转载、搬运或在其他公开页面复用。
