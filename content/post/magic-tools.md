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
| Android | **Clash Meta for Android** / FlClash 等，导入**同一订阅** |
| iOS | App Store 搜 Clash / 通用代理类客户端（部分需外区账号） |

### 手机图文教程（以 Clash Meta for Android 为例）

**1. 打开 App，进入「配置」**（添加订阅）

![步骤1：进入配置](/img/magic-tools/clash-android/step-1.jpg)

**2. 点右上角「+」新建配置**

![步骤2：新建配置](/img/magic-tools/clash-android/step-2.jpg)

**3. 选择「URL」从订阅链接导入**

![步骤3：选择 URL](/img/magic-tools/clash-android/step-3.jpg)

**4. 填写配置**：名称随意；URL 粘贴机场**订阅链接**；自动更新建议 **1440 分钟**（1 天）→ 保存

![步骤4：填写名称与订阅URL](/img/magic-tools/clash-android/step-4.jpg)

**5. 回到主页，点启动**。默认多为**规则模式**；改模式、选节点见下一步

![步骤5：启动运行](/img/magic-tools/clash-android/step-5.jpg)

**6. 进「代理」→ 右上角菜单**，可切换**规则 / 全局 / 直连**

![步骤6：切换模式](/img/magic-tools/clash-android/step-6.jpg)

**7. 全局模式下，点选节点**（如香港 / 新加坡）；日常更建议用**规则模式**

![步骤7：选择节点](/img/magic-tools/clash-android/step-7.jpg)

电脑版步骤与手机一致：导入订阅 → 选配置 → 系统代理 → 规则/全局。

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
