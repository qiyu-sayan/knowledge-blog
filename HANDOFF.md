# HANDOFF — qiyu-library 知识站交接说明

> 给下一个 Agent：读完本文即可接手，无需重读全部聊天记录。  
> 工作区：`D:\mimo` · 博客项目：`D:\mimo\blog` · 语言：**中文回复**

---

## 1. 项目是什么

个人知识站 / 小工具站 **qiyu-library**，Hugo 静态博客 + 若干网页工具，部署在 Cloudflare，域名 **https://qiyu-library.com**（免备案）。

| 项 | 值 |
|----|-----|
| 本地路径 | `D:\mimo\blog` |
| Git 远程 | `https://github.com/qiyu-sayan/knowledge-blog.git`（main） |
| GitHub 用户 | `qiyu-sayan`（gh CLI 已登录；PAT **不能** `gh repo create`，只能 push） |
| 线上 | https://qiyu-library.com · https://www.qiyu-library.com |
| 旧测试域 | https://knowledge-blog.qimu4sayan.workers.dev（workers.dev 国内 DNS 常污染） |
| 本地预览 | http://127.0.0.1:1313/ |

---

## 2. 环境与常用命令

### 2.1 Hugo

- **必须 Extended**（Stack 主题编译 SCSS）。  
- 路径：`D:\mimo\tools\hugo-ext\hugo.exe`（v0.167.0+extended）  
- 另有非 Extended：`D:\mimo\tools\hugo\hugo.exe`（勿用于本项目构建）

```powershell
# 构建
D:\mimo\tools\hugo-ext\hugo.exe --source D:\mimo\blog

# 本地预览（热更新）
D:\mimo\tools\hugo-ext\hugo.exe server --source D:\mimo\blog --bind 127.0.0.1 --port 1313 --baseURL http://127.0.0.1:1313/
```

### 2.2 Git / 发布

```powershell
git -C D:\mimo\blog add -A
git -C D:\mimo\blog commit -m "..."
# 国内直连 GitHub 常失败；失败时用 Clash 代理端口（见下）重试
git -C D:\mimo\blog -c http.proxy=http://127.0.0.1:7897 -c https.proxy=http://127.0.0.1:7897 push origin main
```

推送成功后 **Cloudflare Workers Builds 自动构建部署**，约 1 分钟。

### 2.3 代理 / 网络

- 用户机器 Clash Verge：`http://127.0.0.1:7897`（可能不在线）  
- 下载 GitHub 资源优先国内镜像，例如：  
  `https://ghfast.top/https://github.com/...` 或 `https://ghproxy.net/https://github.com/...`  
- **ghfast 对 `/releases` 列表页可能报 Invalid input**，用 `/releases/latest` 或直链  
- **ghproxy.net 子域名注意**：`webst0{s}` 的 `{s}` 应为 `1..4`，不能写 `01`（会拼成 `webst001`）

---

## 3. Cloudflare 部署（重要）

项目类型是 **Workers + 静态资源**（不是老式 Pages UI）。

| 项 | 值 |
|----|-----|
| 项目名 | `knowledge-blog` |
| 构建命令 | `curl -fsSL https://github.com/gohugoio/hugo/releases/download/v0.167.0/hugo_extended_0.167.0_linux-amd64.tar.gz \| tar -xz -C /tmp hugo && /tmp/hugo` |
| 部署命令 | `npx wrangler deploy`（仓库已有 `wrangler.toml`，可跳过 interactive 配置） |
| 根目录 | `/` |
| 构建变量 | `HUGO_VERSION` = `0.167.0`（已在后台配置） |

仓库根目录：

- `wrangler.toml` — `name = "knowledge-blog"`，`assets.directory = "./public"`  
- `package.json` — 避免 wrangler 当 workspace  
- **不要删**这两个文件，否则 deploy 会进自动配置并跑 `npx hugo` 失败  

后台若构建失败：Workers 和 Pages → 项目 → **部署** → **重试构建**。

---

## 4. 站点结构

```text
D:\mimo\blog\
  hugo.toml                 # 主配置（含 languages.zh-cn）
  wrangler.toml / package.json
  content\
    post\                   # 博文
      fit-tool-guide.md     # 《运动轨迹模拟工具》date: 2026-10-13
      magic-tools.md        # 《魔法工具》date: 2026-10-13
      shipping-forwarders.md# 《海外转运平台推荐》date: 2026-10-14
      address-generator.md  # 《随机地址生成器》date: 2026-10-19
    page\
      about\index.md
      clash-guide\index.md  # Clash 图文教程（独立页 /clash-guide/）
      address-gen\index.md  # 地址生成器工具页（/address-gen/）
      archives.md / search.md
  static\
    fit-tool\               # 运动轨迹模拟器（/fit-tool/）
    js\address-gen.js       # 地址生成逻辑
    img\...                 # 头像、教程截图
  themes\stack\             # 主题 Stack（GH 协议，保留页脚 Theme credit）
  layouts\_partials\sidebar\left.html  # 头像不可点击等小改
```

**文章日期**：front matter `date` 应与 git 首次提交日一致（已核对过一次）。

---

## 5. 线上页面一览

| URL | 说明 |
|-----|------|
| `/` | Stack 主题首页，文章卡片 |
| `/p/fit-tool-guide/` | 运动轨迹模拟工具 · 使用教程 |
| `/p/magic-tools/` | 魔法工具（Clash/Sing-box + 下载） |
| `/p/shipping-forwarders/` | 海外转运平台推荐 |
| `/p/address-generator/` | 地址生成器说明文 |
| `/fit-tool/` | Fit Tool（地图画轨迹 → FIT） |
| `/clash-guide/` | Clash 电脑+手机图文教程（Stack 样式独立页） |
| `/address-gen/` | 随机地址生成器（Stack 样式） |

---

## 6. 密钥与账号（按你要求写全）

### 6.1 天地图（Fit Tool 底图 / 搜索 / 逆地理）

| 项 | 值 |
|----|-----|
| **tk** | `9fe5d147fae873e0dbf3633968097bfe` |
| 位置 | `static/fit-tool/main.js` → `const TTD_KEY` |
| 用途 | WMTS 瓦片、`api.tianditu.gov.cn` 搜索/地理编码 |

### 6.2 高德（Fit Tool 底图可选）

| 项 | 值 |
|----|-----|
| **Key** | `9f52b14494fddce980073932e9b3e9c6` |
| **安全密钥 securityJsCode** | `1b9575213e8e62e82337b4533fdf5bc5` |
| 位置 | `static/fit-tool/main.js` → `AMAP_KEY` / `AMAP_JS_CODE` |
| 用途 | 目前瓦片用公开切片 URL；Key 备用。坐标为 GCJ-02，FIT 前转 WGS-84（`static/fit-tool/coord.js`） |

### 6.3 GitHub

| 项 | 值 |
|----|-----|
| 仓库 | `qiyu-sayan/knowledge-blog` |
| gh 登录 | 是（keyring） |
| 限制 | PAT 无法 create repo；push 可用 |

### 6.4 Cloudflare

| 项 | 值 |
|----|-----|
| 账号邮箱 | （注册时用的 Gmail，见登录态） |
| 域名注册 | `qiyu-library.com` 在 Cloudflare Registrar |
| 项目 | `knowledge-blog` |

### 6.5 文章内推广 / 邀请链接（保留，须标「邀请链接」）

| 用途 | URL |
|------|-----|
| Tiptrans | `https://www.tiptrans.com/?ref=183361`（需代理） |
| 节点站 A | `https://888by.baoyundl.com/#/register?code=ydXpOEJ1` |
| 节点站 B | `https://mitce.io/aff.php?aff=32697` |

规则：**不可隐瞒推广性质**；可轻量标注「邀请链接」，禁止写「无利益关系」。

---

## 7. Fit Tool 要点（最复杂的一块）

路径：`static/fit-tool/`

| 模块 | 文件 | 说明 |
|------|------|------|
| 页面 | `index.html` | 侧栏参数、搜索、按钮 |
| 逻辑 | `main.js` | 地图、定位、轨迹、生成 |
| FIT | `fit-engine.js` | 浏览器内 `@garmin/fitsdk`（`vendor/fitsdk.js`） |
| 坐标 | `coord.js` | GCJ-02 ↔ WGS-84 |
| 依赖 | `vendor/leaflet.js|css`、`chart.umd.js` | 已本地化，避免 CDN |

**四底图**：`amap-vec` / `amap-sat` / `ttd-vec` / `ttd-sat`，默认 `amap-vec`。  
高德瓦片：`webst0{s}` + `s=1..4`（卫星）等。

**定位**：`watchPosition` + `maximumAge:0`；精度差会**拒绝跳图**（防「安义县」IP 缓存）；反查地名后**用户确认**再采用。  
**地点搜索**（推荐）：天地图 geocode，跳到城市后画轨迹。  
**轨迹存储一律 WGS-84**，显示时按当前底图转换。

生成 FIT：`FitEngine.generateFitBytes`，前端下载 `run.fit`，不经服务器。

---

## 8. 其它工具页

### Clash 图文 `/clash-guide/`

- 图片：`static/img/magic-tools/clash-pc/step-1..3.jpg`、`clash-android/step-1..7.jpg`  
- **顺序**：电脑 123=订阅/新建配置/首页；手机 1–7 已按用户红字对齐（勿再猜文件名）  
- 文内《魔法工具》Clash 节有链接到此页  

### 地址生成 `/address-gen/`

- 逻辑：`static/js/address-gen.js`  
- **15 国**：美英中德法日澳加新印韩巴意西荷  
- 模式：真实街道（真实城+路名，**门牌随机**）/ 公开地标（精确公开地址）  
- 样式对齐 Stack：`#34495e` 强调色、卡片变量  
- **不做**：真实住户姓名+宅址库  

---

## 9. 用户硬性规则（必须遵守）

1. **中文回复**  
2. **界面必须手机适配**（响应式、触控友好）  
3. **免备案**优先；国内访问尽量可接受  
4. **少用代理**；下载走国内镜像  
5. **工具 UI 尽量与主站 Stack 配色/排版一致**（独立工具页也要像主站）  
6. 推广链接**标明邀请**，不伪装中立  
7. 不对第三方站点做渗透/攻击；可复刻「产品形态」自建  
8. 不处理：真实私人住户档案、代聊 TG userbot 等高风险方案  

---

## 10. 已完成 vs 待办

### 已完成

- 博客 + 域名 + Cloudflare 自动部署  
- 四篇博文 + 两个教程/工具页 + Fit Tool（四底图、定位、搜索、FIT）  
- Stack 主题；头像「撒盐Yo」不可点；GitHub 图标 → `https://github.com/qiyu-sayan`  

### 可能的待办

- [ ] 第四篇若有修订继续改地址生成器  
- [ ] 友链 / 最近更新侧栏组件（可选）  
- [ ] magic-tools 安装包版本号过期时更新直链（固定版本不会自动升）  
- [ ] 线上 Cloudflare 构建失败时：看部署日志，优先查 `wrangler.toml` / hugo extended  
- [ ] 用户偏好：界面要和主站一致；改 UI 先问是否要手机布局细节  

---

## 11. 历史坑（别踩）

| 坑 | 结论 |
|----|------|
| CF 默认 Hugo 0.147 | 需 extended 0.167；构建命令已写死下载 extended |
| `languages.toml` 中文损坏 | 语言配置已合并进 `hugo.toml` |
| wrangler auto-config | 必须保留 `wrangler.toml` |
| GitHub push 失败 | 试 `http.proxy=127.0.0.1:7897` 或过一会儿重试 |
| 高德卫星空白 | `webst0` + `1,2,3,4` |
| 定位飞到安义县 | IP/缓存；已改确认制 + 拒跳低精度 |
| 工具页字体/配色不像主站 | 用 Stack 的 CSS 变量重写控件 |
| `releases` 直链 | 用 `/releases/latest` 或 `.../download/vX/file` |

---

## 12. 一句话接手流程

1. 读本文 → 打开 `D:\mimo\blog`  
2. `hugo-ext` 本地预览改内容  
3. `git add && commit && push`（必要时加 proxy）  
4. 等 Cloudflare 构建，验证 https://qiyu-library.com  

—— 交接完毕。
