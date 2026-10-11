---
title: 欢迎使用知识站
date: 2026-10-01
description: 站点结构说明，以及如何添加知识与收藏。
tags: [指南, 知识]
---

这里用来沉淀**知识**和**收藏**。所有文章都是 Markdown，写完推送到仓库就会自动发布。

## 站点结构

| 目录 | 用途 |
|------|------|
| `content/posts/` | 知识文章 |
| `content/bookmarks/` | 收藏与推荐 |
| `content/about.md` | 关于页 |

## 怎么写知识文章

1. 在 `content/posts/` 新建 `我的标题.md`
2. 写好 front matter 和正文
3. 本地预览，确认后发布

```yaml
title: 我的标题
date: 2026-10-11
tags: [标签A]
```

## 怎么加收藏

在 `content/bookmarks/` 新建文件，并填上 `link` 字段，页面会出现「打开链接」按钮。

开始写你的第一篇吧。
