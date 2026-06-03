# Shepherd's Blog (Starlight)

お持ちなさい  

あなたの望んだその星を  

And it shall be bestowed upon you,  

the Star which you have longed for—  

---

一个基于 Astro + Starlight 深度重构的个人博客空间。

摒弃了传统文档站的扁平和圆润，本项目在视觉和交互上全面践行了**「古川知宏美学」与「极简构成主义」**。这里不仅是文章的归档所，更是以「舞台档案」与「剧本」为隐喻构建的极客自留地。

## ✧ 核心视觉与交互特色 (Aesthetics & UI)

- **极简构成主义 (Constructivist Design)**
  - 全站抹除常规的圆角（Border Radius）与药丸按钮，使用极简的几何切线、硬朗的直角和细锐的边框构建 UI。
  - 采用粗细错落的等宽字体（Monospace）与无衬线字体形成鲜明的排版秩序感。
- **舞台与剧本隐喻 (Stage Metaphors)**
  - 左侧边栏去除了繁杂的折叠逻辑，呈现为如同机密档案目录般的纯平列表（Flat List）。
  - 右侧原生 TOC（Table of Contents）回归，构建出经典的双栏舞台。
  - **聚光灯效应 (Spotlight Effect)：** 在 Anime 页面中，点击某部作品详情时，背景卡片会瞬间褪色并压暗，视线如被追光灯般强制锁定于当前内容，提供极致的沉浸阅读体验。
- **动态寻址系统 (Dynamic Routing)**
  - 顶栏的分类（BLOG, LOG, CODING）不再依赖生硬的静态目录，而是通过接口自动检索并空降至**该分类下的最新一篇文章**。
- **无缝转场 (View Transitions)**
  - 接入了 `astro:transitions`，全站页面跳转顺滑无缝，如同舞台幕布的自然切换。

## ✧ 栏目架构 (Architecture)

本站抛弃了默认模板的陈规，按个人书写习惯划分出了分明的模块：

- **`BLOG` & `LOG` & `CODING`**
  - 三个主要文章流分类。侧边栏通过读取 Frontmatter 的 `date` 自动降序排列，无需手动维护目录树。
- **`ANIME` (Bangumi 档案室)**
  - 一个独立构建的动画 / 游戏追踪页。
  - 支持本地 fallback 数据与云函数接口动态拉取双端并行。
  - 使用带有舞台术语隐喻的构成主义筛选器（如 `[ ANIMATION ]`、`▶ ON STAGE`）。
- **`LINKS` (友链区)**
  - 纯粹的 Markdown 页面记录友链，不再将其强行塞入导航栏死角。

## ✧ 技术栈 (Tech Stack)

- **Astro 6 + Starlight**：提供坚如磐石的 SSG 基础架构。
- **TypeScript**：严谨的类型约束（包括客户端脚本的严格检查）。
- **Tencent EdgeOne Functions**：用于部署 `/bangumi` 数据流转云函数。
- **CSS :has() & View Transitions API**：使用现代 Web 标准实现纯 CSS 的交互奇观。

## ✧ 项目结构

```text
.
├─ public/
│  └─ data/bangumi.json        # Bangumi 静态兜底数据
├─ functions/
│  └─ bangumi/index.ts         # Bangumi 云函数
├─ src/
│  ├─ components/              # 深度重构的 Sidebar / SiteTitle / Head 等组件
│  ├─ content/docs/
│  │  ├─ blog/
│  │  ├─ coding-notes/
│  │  ├─ log/
│  │  └─ links.md              # 独立的友链页面
│  ├─ pages/anime.astro        # 追番 / 游戏构成主义档案页
│  └─ styles/custom.css        # 古川美学核心样式表
├─ astro.config.mjs
└─ package.json
```

## ✧ 开发与部署 (Dev & Deploy)

### 本地开发
```bash
pnpm install
pnpm dev
```
*(注：如果新建了 `.md` 文件遇到 404，请重启 dev server 清理 Astro 缓存。)*

### 常用命令
| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动本地开发环境 |
| `pnpm check` | 运行严苛的 Astro TypeScript 检查 |
| `pnpm build` | 构建站点，构建前会先拉取 Bangumi 最新数据 |
| `pnpm build:functions` | 编译云函数 |
| `pnpm run deploy` | 构建 -> 编译 -> 提交 -> 多端推送 的一键自动化部署流程 |

## ✧ 协议与声明 (License)

项目代码（样式与重构后的组件结构）供各位想爆改 Starlight 的开发者参考。

**文章、日志、笔记及其它原创图文内容默认保留所有权利**；未经许可，请勿随意搬运或在其他公开页面复用我的文字。
