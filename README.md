# 我的知识站

基于 Hugo 的个人博客：知识分享 + 收藏。目标是**免备案**部署到 Cloudflare Pages，国内尽量可访问。

## 目录

- `content/posts/`：知识文章（Markdown）
- `content/bookmarks/`：收藏条目（可带 `link` 外链）
- `content/about.md`：关于页
- `themes/paper/`：自定义轻量主题
- `public/`：构建产物（部署用）

## 本机环境

Hugo 已安装在：

```text
D:\mimo\tools\hugo\hugo.exe
```

若 PATH 未配置，命令请写全路径。

## 常用命令

```powershell
# 本地预览（热更新）
D:\mimo\tools\hugo\hugo.exe server --source D:\mimo\blog --bind 127.0.0.1 --port 1313

# 生成静态文件到 public/
D:\mimo\tools\hugo\hugo.exe --source D:\mimo\blog

# 新建知识文章
D:\mimo\tools\hugo\hugo.exe new content posts/my-post.md

# 新建收藏
D:\mimo\tools\hugo\hugo.exe new content bookmarks/my-bookmark.md
```

浏览器打开：<http://127.0.0.1:1313/>

## 写文章

知识文章 front matter 示例：

```yaml
---
title: 标题
date: 2026-10-01
description: 列表页摘要
tags: [标签1, 标签2]
---
```

收藏额外支持：

```yaml
link: https://example.com
```

## 发布到 Cloudflare Pages（免备案）

1. 注册 [Cloudflare](https://dash.cloudflare.com/)，再注册 GitHub 账号
2. 把本仓库推到 GitHub（私有也可）
3. Cloudflare → Workers & Pages → Create → Pages → Connect to Git
4. 构建设置：
   - **Framework preset**: Hugo
   - **Build command**: `hugo`
   - **Build output directory**: `public`
   - **Environment variable**: `HUGO_VERSION` = `0.167.0`
5. 绑定自定义域名（域名在任意注册商购买后，NS 指到 Cloudflare）
6. HTTPS 自动签发

### 国内访问说明

- 免备案节点无法像国内 CDN 满速，但日常浏览通常可用
- 若以后要提速，可考虑：Cloudflare 付费优化 / 境外中转，或再评估国内方案（需备案）

## 预算

| 项目 | 费用 |
|------|------|
| Hugo / Pages / GitHub | ¥0 |
| 域名 | 约 ¥30–80 / 年 |

## 下一步可做

- 站内搜索（Fuse.js）
- 标签页样式增强
- Giscus 评论
- 自定义域名与 SEO（sitemap / meta）
