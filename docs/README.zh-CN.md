<pre align="center">
一个简洁、优雅、快速的静态博客模板！🚀 使用 Astro 开发
</pre>

<div align="center">
<img alt="Frosti Logo" src="https://github.com/EveSunMaple/Frosti/blob/main/docs/logo.png" width="280px">
</div>

[![license](https://badgen.net/github/license/EveSunMaple/Frosti)](https://github.com/EveSunMaple/Frosti/blob/main/LICENSE)&nbsp;&nbsp;&nbsp;[![release](https://badgen.net/github/release/EveSunMaple/Frosti)](https://github.com/EveSunMaple/Frosti/releases)&nbsp;&nbsp;&nbsp;[![stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/EveSunMaple/Frosti)

[**🖥️ Frosti Demo**](https://frosti.saroprock.com)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;[**🌏 中文 README**](https://github.com/EveSunMaple/Frosti/blob/main/docs/README.zh-CN.md)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;[**❤️ My Blog**](https://www.saroprock.com)

## 📷 Preview

![preview](./preview-light.png)

## ✨ 特点

- ✅ **白天** / **黑夜** 模式可用
- ✅ 极速的访问速度与优秀的 SEO
- ✅ 视图过渡动画（使用 ClientRouter）
- ✅ 您可以搜索您的文章（使用 Pagefind）
- ✅ 使用 [Tailwind CSS](https://tailwindcss.com/) 与 [daisyUI](https://daisyui.com/) 构建自适应页面
- ✅ RSS 订阅支持
- 🛠️ 博客易上手
  - 可以在 `frosti.config.yaml` 自定义您博客的内容

## ✒️ 文章信息

|    名称     |   含义   | 是否必要 |
| :---------: | :------: | :------: |
|    title    | 文章标题 |    是    |
| description | 文章简介 |    是    |
|   pubDate   | 文章日期 |    是    |
|    image    | 文章封面 |    否    |
| categories  | 文章分类 |    否    |
|    tags     | 文章标签 |    否    |
|    badge    | 文章徽标 |    否    |
|    draft    | 草稿状态 |    否    |

> [!TIP]
>
> - 您可以通过把 `badge` 属性设置为 `Pin` 来置顶您的文章
> - 设置 `draft: true` 可将文章标记为草稿，草稿文章不会在列表显示

## ⬇️ 使用方法

1. 安装pnpm包管理器（如果您没有安装过的话）

```sh
npm i -g pnpm
```

2. 克隆项目

```sh
git clone https://github.com/EveSunMaple/Frosti.git Frosti
```

3. 进入项目文件夹

```sh
cd Frosti
```

4. 安装依赖

```sh
pnpm i
```

5. 调试、运行项目

**首次运行或更新内容后**，请先执行 `search:index` 来生成搜索索引：

```sh
# 生成搜索索引以供开发时使用
pnpm run search:index

pnpm run dev
```

## 🔧 配置

Frosti 使用 `frosti.config.yaml` 作为配置文件，您可以在此文件中配置网站的基本信息、导航栏、页脚等内容。

### 网站基本信息 (site)

```yaml
site:
  tab: Frosti # 浏览器标签栏上显示的文本
  title: Frosti # 网站的主标题
  description: A clean, elegant, and fast static blog template! # 网站描述，用于SEO
  language: en # 网站的语言代码，如"en"表示英文，"zh"表示中文
  favicon: /favicon.ico # 网站图标路径
```

### 主题设置 (theme)

```yaml
theme:
  light: winter # 浅色模式的主题，基于daisyUI的主题
  dark: dracula # 深色模式的主题，基于daisyUI的主题
  code: github-dark # 代码块的主题样式
```

- 主题基于 [daisyUI](https://daisyui.com/docs/themes/) 提供的主题选项
- 代码块主题使用 [Shiki](https://shiki.style/themes) 提供的样式

### 日期格式 (date_format)

```yaml
date_format: ddd MMM DD YYYY # 日期显示格式
```

### 菜单配置 (menu)

```yaml
menu:
  - id: home # 菜单项唯一标识符
    text: Home # 菜单显示的文本
    href: / # 链接地址
    svg: "material-symbols:home-outline-rounded" # 图标
    target: _self # 链接打开方式
```

每个菜单项包含以下属性：

- `id`: 唯一标识符
- `text`: 显示的文本
- `href`: 链接地址
- `svg`: 图标代码，使用 [Iconify](https://icon-sets.iconify.design/) 的图标集
- `target`: 链接打开方式(`_self`当前窗口或`_blank`新窗口)

#### 子菜单项 (subItems)

您可以通过添加 `subItems` 配置子菜单项，格式与主菜单项相同。

### 用户信息 (user)

```yaml
user:
  name: EveSunMaple # 用户名称
  site: "https://example.com" # 用户网站
  avatar: /profile.png # 用户头像
```

### 社交媒体配置 (social)

侧边栏和页脚可以配置不同的社交媒体链接：

```yaml
sidebar:
  social:
    - href: "https://github.com/username" # 链接地址
      ariaLabel: Github # 无障碍标签
      title: Github # 鼠标悬停时的提示
      svg: "ri:github-line" # 图标代码
```

### 图标设置 (icon)

Frosti 使用 [Iconify](https://icon-sets.iconify.design/) 作为图标库。您可以在其网站上搜索您喜欢的图标，然后复制图标的代码到配置文件中的 `svg` 字段。

### 语言设置 (language)

Frosti 支持多语言，通过以下方式配置：

1. 在 `frosti.config.yaml` 中设置网站默认语言：

```yaml
site:
  language: zh # 设置为 "zh" 使用中文，"en" 使用英文
```

2. 通过 `src/i18n/translations.yaml` 文件管理所有界面文本翻译：

```yaml
en: # 英文翻译
  label:
    noTag: No tags assigned
    tagCard: Tags
    # 其他英文标签...

zh: # 中文翻译
  label:
    noTag: 未分配标签
    tagCard: 标签
    # 其他中文标签...
```

#### 添加或修改翻译

要添加新的语言支持或修改现有翻译：

1. 在 `translations.yaml` 文件中添加新的语言代码和对应翻译，或修改现有翻译
2. 在 `frosti.config.yaml` 中更改 `site.language` 为您要使用的语言代码

## 🚀 自动更新

为了让您的项目与 Frosti 的最新版本保持同步，您可以使用我们提供的更新脚本。

```sh
bash frosti.update.sh
```

该脚本将：

1.  **克隆最新版本** 的 Frosti 仓库。
2.  **安全地更新** 您的项目文件，根据 `.updateignore` 文件添加和覆盖文件。
3.  **智能地删除** 官方仓库中已移除的文件，而不会影响您忽略的文件。
4.  **清理** 任何残留的空文件夹和临时文件。
5.  使用 `pnpm` **安装或更新** 依赖项。

## � 动态数据（Bangumi 追番）部署与缓存策略

本模板支持在完全静态构建的前提下，为追番页（`/anime`）提供“云函数 + 静态回退 + 前端缓存”三层数据获取机制，保证：

1. 页面永远可渲染：即使云函数暂时不可用，也能展示上一次构建时的静态数据。
2. 用户可手动刷新：点击“刷新”按钮强制绕过前端缓存与云端内存缓存。
3. 自动定时更新：前端每 15 分钟尝试重新拉取一次。

### 目录与文件

| 路径                                 | 作用                                             |
| ------------------------------------ | ------------------------------------------------ |
| `edgeone/functions/bangumi/index.ts` | 腾讯 EdgeOne 云函数（可按平台适配导出签名）      |
| `public/data/bangumi.json`           | 预构建静态回退 JSON，`pnpm build` 前通过脚本生成 |
| `scripts/fetch-bangumi.mjs`          | 预构建脚本，写入上方静态 JSON                    |
| `src/pages/anime.astro`              | 前端渲染与数据三层获取逻辑                       |

### 构建前预抓取

`package.json` 中的 `prebuild` 会执行：

```jsonc
{
  "scripts": {
    "prebuild": "node ./scripts/fetch-bangumi.mjs"
  }
}
```

脚本流程：

1. 并发抓取三种收藏：在看(type=3)、想看(type=1)、看过(type=2)
2. 全量翻页直到返回不足 `limit` 条
3. 生成结构 `{ watching, wish, watched, cachedAt }`
4. 输出到 `public/data/bangumi.json`

> 如果云函数不可部署，也可以只依赖该静态 JSON，前端仍能展示构建时的数据。

### 云函数缓存策略

`edgeone/functions/bangumi/index.ts`：

- 内存缓存（冷启动清空）默认 15 分钟：`CACHE_TTL = 15 * 60 * 1000`
- 查询参数 `?force=1` 可绕过缓存并强制更新
- 响应头：
  - `Cache-Control: no-store` 禁止中间层缓存
  - `X-Bangumi-Served-From: memory|fetch|force-fetch` 指示来源

### 前端三层回退逻辑

1. 读取 `localStorage`（客户端缓存，1 小时 TTL）
2. 请求云函数 `/api/bangumi`
3. 云函数失败则回退静态 `/data/bangumi.json`

刷新按钮动作：

- 删除本地缓存 key：`bangumi_front_cache_v1`
- 调用 `/api/bangumi?force=1&t=时间戳`
- 成功后写入新缓存并更新“更新时间”显示

### 环境变量 / 自定义 API 路径

`anime.astro` 中允许通过以下方式覆盖默认的 `/api/bangumi`：

1. 构建时注入 `PUBLIC_BANGUMI_API`（例如 `PUBLIC_BANGUMI_API=/edge/bgm`）
2. 部署时在 HTML `<head>` 里注入：

```html
<script>
  window.__BANGUMI_API__ = "/edge/bgm";
</script>

```

（运行时代码优先级：`window.__BANGUMI_API__` > `import.meta.env.PUBLIC_BANGUMI_API` > `/api/bangumi`）

### 常见问题（FAQ）

| 现象                 | 可能原因                     | 解决                                                                                |
| -------------------- | ---------------------------- | ----------------------------------------------------------------------------------- |
| 页面一直显示 Loading | 云函数与静态 JSON 都获取失败 | 打开网络面板检查 `/api/bangumi` 与 `/data/bangumi.json` 状态码；确认构建时生成 JSON |
| 每次刷新都不变       | 命中内存缓存                 | 使用“刷新”按钮（带 `force=1`）或等待缓存 TTL 过期                                   |
| 想自定义函数路径     | 部署平台路径不同             | 使用环境变量或注入 `window.__BANGUMI_API__`                                         |
| 静态 JSON 过旧       | 长时间未重新构建             | 重新执行 `pnpm build`（会重新抓取）                                                 |

### 调试建议

1. 本地仅测试静态：先运行 `node scripts/fetch-bangumi.mjs`，再 `pnpm dev`，前端会直接走静态 JSON。
2. 联调云函数：在本地提供一个简单代理（如果平台支持本地仿真）或直接部署后抓包。
3. 观察响应头 `X-Bangumi-Served-From` 判断来源。

### 安全 & 限速

- 公开 API 仅聚合公开收藏数据，不包含敏感信息
- 若需添加鉴权，可在云函数层添加 `Authorization` 校验并在前端按需附加

---

如果你不需要追番页，可以：

1. 删除 `src/pages/anime.astro`
2. 删除 `edgeone/functions/bangumi` 目录与脚本 `scripts/fetch-bangumi.mjs`
3. 从 `package.json` 移除 `prebuild` 钩子

这样构建将完全静态且无额外数据抓取。

## �👀 问题

如果您有任何问题或建议，可以通过提交 Issues 来反馈或同开发者交流！

## 🎉 感谢

@[Saicaca](https://github.com/saicaca) 他的启迪是我制作此主题的主要原因

@[WRXinYue](https://github.com/WRXinYue) 在我前期入门时帮助了我很多
