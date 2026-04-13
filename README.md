# Starlight

一个基于 Astro + Starlight 搭建、并按我自己的写作习惯深度客制化的个人博客。

这里不只是文章归档，也包含了日志、编程笔记、追番/游戏记录，以及一套更贴近个人表达的侧边栏、页面组织和数据同步流程。

## 预览

- 站点地址：<https://duskydream.icu>
- 框架：Astro + Starlight
- 语言：中文为主

## 这个博客和默认模板不一样的地方

- 按内容类型拆分为 `Blog`、`Coding Notes`、`Log` 三个主要栏目。
- 侧边栏不是手写固定顺序，而是根据文章 frontmatter 中的 `date` 自动排序生成。
- 单独做了 `Anime` 页面，用来展示 Bangumi 上的动画 / 游戏收藏与简评。
- `Anime` 页面支持媒体类型切换、状态筛选、关键词搜索、展开详情和本地缓存。
- 使用云函数实时拉取 Bangumi 数据，同时保留 `public/data/bangumi.json` 作为静态降级兜底。
- 友链作为独立分组挂在侧边栏里，而不是单独写死一个普通页面。
- 博客正文页隐藏编辑链接，日志和笔记页保留更新时间等站点元信息。
- 支持数学公式渲染，适合记录算法、笔记和技术类内容。
- 在 Starlight 基础上接入了 `starlight-theme-rapide`，并配合自定义样式继续调整。

## 技术栈

- Astro 6
- Starlight
- TypeScript
- remark-math + rehype-katex
- Tencent EdgeOne Functions

## 项目结构

```text
.
├─ public/
│  └─ data/bangumi.json        # Bangumi 静态兜底数据
├─ functions/
│  └─ bangumi/index.ts         # Bangumi 云函数
├─ scripts/
│  ├─ fetch-bangumi.mjs        # 构建前抓取 Bangumi 数据
│  ├─ clean-astro.mjs
│  ├─ deploy.mjs
│  ├─ migrate-logs.mjs
│  └─ migrate-posts.mjs
├─ src/
│  ├─ components/              # 自定义 Sidebar / Footer 等组件
│  ├─ content/docs/
│  │  ├─ blog/
│  │  ├─ coding-notes/
│  │  └─ log/
│  ├─ data/friend-links.js     # 友链配置
│  ├─ pages/anime.astro        # 追番 / 游戏页面
│  └─ styles/custom.css
├─ astro.config.mjs
└─ package.json
```

## 本地开发

```bash
pnpm install
pnpm dev
```

默认会在本地启动 Astro 开发服务器。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动本地开发环境 |
| `pnpm check` | 运行 Astro 类型检查 |
| `pnpm build` | 构建站点，构建前会先抓取 Bangumi 数据 |
| `pnpm build:functions` | 编译云函数 |
| `pnpm preview` | 本地预览构建结果 |
| `pnpm run deploy` | 执行完整部署流程 |

## 内容维护方式

### 1. 写文章

把 Markdown 文件放到以下目录即可：

- `src/content/docs/blog/`
- `src/content/docs/coding-notes/`
- `src/content/docs/log/`

建议在 frontmatter 中至少填写：

```md
---
title: 标题
date: 2026-04-13
description: 一句话简介
---
```

其中 `date` 会直接影响侧边栏排序。

### 2. 维护友链

直接修改 [src/data/friend-links.js](/f:/Starlight/src/data/friend-links.js)。

### 3. 更新 Bangumi 数据

项目有两套数据来源：

- 运行时通过 `/bangumi` 云函数实时拉取
- 构建前通过脚本生成 `public/data/bangumi.json` 作为降级数据

这样即使云函数暂时不可用，`Anime` 页面也不会完全空白。

## 部署说明

`pnpm run deploy` 会按下面流程执行：

1. 清理 Astro 构建缓存
2. 构建站点
3. 编译云函数
4. 自动提交当前变更
5. 推送到当前分支对应的所有远程仓库

这套流程更适合我现在的个人博客更新方式：写完即发，尽量减少重复操作。

## 适合拿来做什么

如果你也想做一个偏个人表达、而不只是文档站风格的 Starlight 博客，这个项目可以作为一个参考：

- 如何把 Starlight 改造成个人博客
- 如何按日期自动整理侧边栏
- 如何把外部服务数据接到独立页面里
- 如何给静态站补一层函数接口和降级缓存

## License

项目代码仅作为个人博客实现参考。

文章、日志、笔记及其它原创内容默认保留所有权利；如需转载或引用，请先联系我。
