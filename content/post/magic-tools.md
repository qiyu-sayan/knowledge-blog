---
title: "魔法工具"
slug: magic-tools
date: 2026-10-13
description: "Clash Verge 与 Sing-box 电脑版、手机版使用教程，以及节点站点与官方下载地址汇总。"
tags: [工具, 教程, Clash, Sing-box]
categories: [工具]
---

一站式整理 **Clash Verge**（桌面）与 **Sing-box**（多端）的安装、导入订阅、日常使用，文末附下载地址与注册入口。

> 文中部分注册链接为**邀请链接**。软件请从 **GitHub / 官网** 下载，勿用来路不明的安装包。

## 一、先弄清概念

| 名称 | 是什么 |
|------|--------|
| **客户端** | 本机软件：Clash Verge、Sing-box、手机 App 等 |
| **节点 / 机场** | 提供代理线路的服务商，你去买「订阅」 |
| **订阅链接** | 一段 URL，导入客户端后自动更新节点列表 |
| **规则** | 决定哪些网站走代理、哪些直连 |

Clash Verge 与 Sing-box 都是**壳**，真正决定能上什么网站的是你买的**节点**。

## 二、Clash Verge（电脑：Windows / macOS）

### 1. 安装

从官方 GitHub 的 **Releases** 下载安装包（见文末），安装后打开。

### 2. 导入订阅

1. 在机场网站复制 **订阅链接**（Clash / 通用订阅）  
2. Clash Verge → **订阅 / Profiles** → **新建 / 粘贴 URL** → **导入**  
3. 点击刚导入的配置，确保已选中（高亮）

### 3. 基本使用

| 功能 | 建议 |
|------|------|
| **系统代理** | 打开，浏览器等应用即可走代理 |
| **TUN 模式** | 游戏 / 命令行也能走代理；需要管理员权限 |
| **规则模式** | 日常推荐：国内直连、国外走节点 |
| **全局模式** | 排查问题时用，费流量 |
| **节点测速** | 列表里可延迟测试，选 **延迟低、稳定** 的 |

### 4. 小技巧

- 订阅更新：Profiles 里 **更新** 卡片配置  
- 节点不好用：换地区（日 / 新 / 港）再测延迟  
- 打不开网页：先看是否开了 **系统代理**、配置是否选中  

## 三、Sing-box（电脑 / 手机）

Sing-box 内核更现代，**SFI（Windows）/ SFA（Android）/ SFM（macOS）/ iOS 客户端** 同一套配置思路。

### 1. 安装对应客户端

见文末下载表，按系统选：

- **Windows**：GUI 版或命令行版（GUI 更省事）  
- **Android**：SFA（sing-box for Android）  
- **iOS**：App Store 搜 sing-box（或其它支持 sing-box 的客户端）  

### 2. 导入配置

1. 在服务商后台复制 **sing-box 订阅 / 通用订阅**  
2. 客户端 → **配置 / Profiles** → 粘贴 URL 或 **从文件导入**  
3. 选择配置 → **启动 / 连接**

### 3. 和 Clash 的差异

| | Clash Verge | Sing-box |
|--|-------------|----------|
| 配置生态 | `.yaml` 订阅为主 | JSON / 专用订阅，机场支持越来越多 |
| 手机 | 用第三方 Clash 类 App | SFA / iOS 客户端较统一 |
| 上手 | 图形界面友好 | GUI 已比较成熟 |
| 建议 | **电脑首选** | **手机 / 多端** 可优先 |

## 四、手机版（简要）

| 系统 | 推荐客户端 | 说明 |
|------|------------|------|
| **Android** | SFA（sing-box）、或 Clash Meta 类 | 导入订阅同电脑逻辑 |
| **iOS** | 需自行在 App Store 搜索可用客户端 | 部分地区需外区 Apple ID |

步骤与电脑相同：**复制订阅 → 客户端导入 → 开启连接 → 打开「按规则」或「全局」**。

## 五、节点站点

以下为注册入口（含**邀请链接**），套餐与稳定性请自行比较，建议先月付试用。

| 站点 | 注册 |
|------|------|
| 站点 A | [注册链接](https://888by.baoyundl.com/#/register?code=ydXpOEJ1) |
| 站点 B | [注册链接](https://mitce.io/aff.php?aff=32697) |

> 链接为邀请注册，注册后多数站点会赠送流量或折扣，也算支持本站。

**选站小建议**

1. 先买 **月付**，稳定再续年付  
2. 看是否有 **IEPL / 中转**、流媒体解锁说明  
3. 支持 **Clash / sing-box 多格式订阅** 更方便  

## 六、官方下载地址

### Clash Verge

| 平台 | 地址 |
|------|------|
| Windows / macOS / Linux | [clash-verge-rev Releases](https://github.com/clash-verge-rev/clash-verge-rev/releases) |

（尽量从 GitHub 官方 Release 下载，避免第三方「修改版」。）

### Sing-box

| 平台 | 地址 |
|------|------|
| 全端内核 / 文档 | [sing-box 官网](https://sing-box.sagernet.org/) |
| 源码 / Release | [GitHub · sing-box](https://github.com/SagerNet/sing-box/releases) |
| Android 客户端 | [SFA 仓库](https://github.com/SagerNet/sing-box) 相关页面 / 应用商店搜索 |
| iOS | App Store 搜索 **sing-box** 或相关客户端 |

## 七、简单排错

1. **上不了外网**：系统代理或 TUN 是否开、订阅是否过期  
2. **很慢**：换节点 / 测延迟，避开高峰期拥堵节点  
3. **部分网站打不开**：切规则 / 全局试一下，再检查 DNS  
4. **手机能电脑不能**：对比是否同一配置，电脑是否仅开了「直连」模式  

---

**免责声明**：请遵守所在地区法律法规，仅用于合法的网络访问与学习研究；账号与节点风险自负。
