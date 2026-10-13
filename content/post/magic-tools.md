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

## 1. Clash Verge（Windows / Mac）

1. 下载安装 → 打开  
2. **订阅** → 粘贴机场订阅 URL → 导入并**选中**  
3. 打开 **系统代理**，模式选 **规则**  
4. 节点列表可测延迟，选稳定线路  

**手机（Clash 系）**

| 系统 | 说明 |
|------|------|
| Android | 可用 Clash Meta 类 / FlClash 等，导入**同一订阅** |
| iOS | App Store 搜 Clash / 通用代理类客户端（部分需外区账号） |

逻辑与电脑相同：导入订阅 → 开启连接 → 规则/全局。

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

### 4.2 软件下载（含手机版）

当前测试：**ghproxy.net 可用**，ghfast 可能打不开。

| 软件 | 端 | 国内加速（ghproxy 优先） | 官方 |
|------|----|--------------------------|------|
| Clash Verge | 电脑 | [ghproxy](https://ghproxy.net/https://github.com/clash-verge-rev/clash-verge-rev/releases/latest) | [GitHub](https://github.com/clash-verge-rev/clash-verge-rev/releases) |
| FlClash（Clash 系） | **Android** | [ghproxy](https://ghproxy.net/https://github.com/chen08209/FlClash/releases/latest) | [GitHub](https://github.com/chen08209/FlClash/releases) |
| Clash Meta for Android | **Android** | [ghproxy](https://ghproxy.net/https://github.com/MetaCubeX/ClashMetaForAndroid/releases/latest) | [GitHub](https://github.com/MetaCubeX/ClashMetaForAndroid/releases) |
| Sing-box | 电脑 | [ghproxy](https://ghproxy.net/https://github.com/SagerNet/sing-box/releases/latest) | [官网](https://sing-box.sagernet.org/) |
| SFA（sing-box） | **Android** | [ghproxy](https://ghproxy.net/https://github.com/SagerNet/sing-box/releases/latest) | [GitHub](https://github.com/SagerNet/sing-box) |
| sing-box 等 | **iOS** | 无法 sideload 直链 | **App Store** 搜索 `sing-box` / 代理类客户端（部分需外区账号） |

- **电脑**：Clash Verge 或 Sing-box GUI  
- **手机 Android**：FlClash、Clash Meta、SFA 任选其一，导入**同一订阅**即可  
- **iOS**：以 App Store 为准，没有「加速 apk」这种直链  
- **更新**仍建议：有代理后用官网 / 官方 Release

## 5. 排错

- 打不开网站 → 代理是否开、订阅是否过期、配置是否选中  
- 慢 → 换节点、测延迟  
- 还不行 → 规则 ↔ 全局切换试试  

---

**免责声明**：请遵守当地法律法规，仅用于合法网络访问与学习。
