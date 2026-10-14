---
title: "魔法工具"
slug: magic-tools
date: 2026-10-13
description: "Clash Verge 与 Sing-box 快速上手：安装、订阅、规则/全局模式说明与下载地址。"
tags: [工具, 教程, Clash, Sing-box]
categories: [工具]
---

电脑常用 **Clash Verge**，手机可用 **Clash 系 / Sing-box** 客户端。流程：装软件 → 导入订阅 → 选模式。

> 文末注册链接为**邀请链接**。软件请以**官网 / 官方 Release**为准。

## 模式：规则 vs 全局

| 模式 | 行为 | 适合 |
|------|------|------|
| **规则模式** | **国外网站**走代理，**国内**（淘宝、B站等）直连 | **日常推荐**，省流量、国内快 |
| **全局模式** | **所有流量**都走代理（含国内） | 排查问题、个别站规则未覆盖 |
| **直连** | 全部不走代理 | 关闭代理时 |

一句话：**平时用规则；个别网站打不开再临时切全局，完了改回规则。**

## 1. Clash Verge（Windows / Mac） / Clash Meta（手机）

图文步骤见专页：**[Clash 使用教程（电脑 + 手机）](/p/clash-tutorial/)**

1. 下载安装客户端（见文末下载表）  
2. **订阅** → 粘贴机场订阅 URL → **选中**配置  
3. 打开 **系统代理 / 启动**，模式选 **规则**  
4. 需要时在代理列表里切换节点  

**手机（Clash 系）**：Clash Meta for Android、FlClash 等，导入**同一订阅**即可；iOS 在 App Store 搜索相关客户端。

## 2. Sing-box（多端）

1. 装对应客户端（下表）  
2. 导入 **sing-box / 通用订阅**  
3. 启动；异常时再试全局  

| 端 | 客户端 |
|----|--------|
| Windows | SFI / GUI 版 |
| Android | **SFA** |
| iOS / macOS | App Store / SFM |

## 3. 节点网站（邀请链接）

| | 注册 |
|--|------|
| A | [注册链接](https://888by.baoyundl.com/#/register?code=ydXpOEJ1) |
| B | [注册链接](https://mitce.io/aff.php?aff=32697) |

先月付试用；站内复制**订阅链接**导入客户端即可。

## 4. 下载地址

### 4.1 怎么在国内下载（先看这个）

Clash / Sing-box 官方只发在 **GitHub**，国内直连常失败。常用办法：

1. **加速站**：浏览器打开的是加速域名（如 `ghfast.top`），由它去取文件，一般**不用打开 github.com**  
2. **节点网站自带下载**：很多机场官网有 **「客户端下载」** 页，直接下更省事（注册后看导航）  
3. **有代理之后**：打开官网 / GitHub Release **更新到最新版**（更安全）

### 4.2 电脑下载（点一下就开始下）

| 软件 | 版本 / 发布日 | 直接下载（Windows x64） | 备用：最新版页面 |
|------|---------------|-------------------------|------------------|
| Clash Verge | **v2.5.8** · 2026-10-09 | [下载 .exe](https://ghproxy.net/https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.8/Clash.Verge_2.5.8_x64-setup.exe) | [全部版本](https://ghproxy.net/https://github.com/clash-verge-rev/clash-verge-rev/releases/latest) |
| Sing-box | **v1.14.3** · 2026-10-09 | [下载 .exe](https://ghproxy.net/https://github.com/SagerNet/sing-box/releases/download/v1.14.3/SFW-1.14.3-x64.exe) | [官网](https://sing-box.sagernet.org/) |

Mac：Clash Verge [Intel .dmg](https://ghproxy.net/https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.8/Clash.Verge_2.5.8_x64.dmg) / [Apple 芯片 .dmg](https://ghproxy.net/https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.5.8/Clash.Verge_2.5.8_aarch64.dmg)。

### 4.3 手机下载（点一下就开始下 APK）

| 客户端 | 版本 / 发布日 | 直接下载 APK | 说明 |
|--------|---------------|--------------|------|
| Clash Meta for Android | **v2.11.35** · 2026-09-30 | [下载 APK](https://ghproxy.net/https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.35/cmfa-2.11.35-meta-universal-release.apk) | 通用包，多数手机可用 |
| FlClash | **v0.8.99** · 2026-10-03 | [下载 APK](https://ghproxy.net/https://github.com/chen08209/FlClash/releases/download/v0.8.99/FlClash-0.8.99-android-arm64-v8a.apk) | arm64，一般安卓手机 |
| SFA（sing-box） | **v1.14.3** · 2026-10-09 | [下载 APK](https://ghproxy.net/https://github.com/SagerNet/sing-box/releases/download/v1.14.3/SFA-1.14.3-arm64-v8a.apk) | Android 版 sing-box |

**iOS**：App Store 搜索 `sing-box`，无 apk 直链。

**装完后**：导入订阅 → 连接 → 模式选 **规则**。

**关于版本**：直链锁定上表版本，**不会自动跟新**。要升级时点「最新版页面 / 官网」，下**新版本号**的同名安装包；日期为该版本官方发布时间。

## 5. 排错

- 打不开网站 → 代理是否开、订阅是否过期、配置是否选中  
- 慢 → 换节点、测延迟  
- 还不行 → 规则 ↔ 全局切换试试  

---

**免责声明**：请遵守当地法律法规，仅用于合法网络访问与学习。
