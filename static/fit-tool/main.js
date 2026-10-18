// main.js — Fit Tool v1.2（静态站版）
// 地图：天地图；FIT：浏览器本地生成；定位：高精度 + 失败提示

const chinaBounds = L.latLngBounds(
  L.latLng(3.86, 73.66),
  L.latLng(53.55, 135.05)
);

const map = L.map("map", {
  maxBounds: chinaBounds,
  maxBoundsViscosity: 1.0,
  attributionControl: true
}).setView([26.083719, 119.246678], 13);

let vecLayer = null;
let cvaLayer = null;

// 作者的天地图密钥（配额充足，访客无需自备）
const TTD_KEY = "9fe5d147fae873e0dbf3633968097bfe";

function ttdUrl(layer, key) {
  return (
    "https://t{s}.tianditu.gov.cn/" + layer +
    "/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + layer.split("_")[0] +
    "&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + encodeURIComponent(key)
  );
}

// 底图：ttd-vec / ttd-sat / amap-vec / amap-sat（高德为 GCJ-02）
let mapBase = "amap-vec";
let baseLayer = null;
let labelLayer = null;

// 高德开放平台（Web JS Key；瓦片走公开切片，Key 备用于检索扩展）
const AMAP_KEY = "9f52b14494fddce980073932e9b3e9c6";
const AMAP_JS_CODE = "1b9575213e8e62e82337b4533fdf5bc5";

function ttdUrl(layer, key) {
  return (
    "https://t{s}.tianditu.gov.cn/" + layer +
    "/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + layer.split("_")[0] +
    "&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + encodeURIComponent(key)
  );
}

function applyMapBase() {
  if (baseLayer) map.removeLayer(baseLayer);
  if (labelLayer) map.removeLayer(labelLayer);

  const key = TTD_KEY;
  const common = {
    minZoom: 5,
    maxZoom: 20,
    attribution: "© 天地图 / © 高德地图 GS(2024) 590号"
  };

  if (mapBase === "ttd-vec" || mapBase === "ttd-sat") {
    const sat = mapBase === "ttd-sat";
    baseLayer = L.tileLayer(
      ttdUrl(sat ? "img_w" : "vec_w", key),
      Object.assign({}, common, {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxNativeZoom: 18
      })
    ).addTo(map);
    labelLayer = L.tileLayer(
      ttdUrl(sat ? "cia_w" : "cva_w", key),
      {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        minZoom: 5,
        maxZoom: 20,
        maxNativeZoom: 17
      }
    ).addTo(map);
    return;
  }

  // 高德：矢量 style=7，卫星 style=6+8 注记
  const sat = mapBase === "amap-sat";
  if (sat) {
    baseLayer = L.tileLayer(
      "https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
      Object.assign({}, common, {
        subdomains: ["1", "2", "3", "4"],
        maxNativeZoom: 18
      })
    ).addTo(map);
    labelLayer = L.tileLayer(
      "https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
      {
        subdomains: ["1", "2", "3", "4"],
        minZoom: 5,
        maxZoom: 20,
        maxNativeZoom: 17
      }
    ).addTo(map);
  } else {
    baseLayer = L.tileLayer(
      "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      Object.assign({}, common, {
        subdomains: ["1", "2", "3", "4"],
        maxNativeZoom: 18
      })
    ).addTo(map);
    labelLayer = null;
  }
}

function setMapBase(mode) {
  const allowed = ["ttd-vec", "ttd-sat", "amap-vec", "amap-sat"];
  mapBase = allowed.indexOf(mode) >= 0 ? mode : "amap-vec";
  applyMapBase();
  document.querySelectorAll("[data-mapbase]").forEach((el) => {
    el.classList.toggle("on", el.getAttribute("data-mapbase") === mapBase);
  });
}

// 与 map 交互时统一转成 WGS-84（FIT/定位用）
function mapClickToWgs(lat, lng) {
  if (mapBase === "amap-vec" || mapBase === "amap-sat") {
    return window.Coord.gcj02ToWgs84(lng, lat);
  }
  return { lng: lng, lat: lat };
}

// WGS-84 显示到当前底图
function wgsToMapLatLng(lat, lng) {
  if (mapBase === "amap-vec" || mapBase === "amap-sat") {
    return window.Coord.wgs84ToGcj02(lng, lat);
  }
  return { lng: lng, lat: lat };
}

window.__applyTtdKey = function () { applyMapBase(); };
window.__setMapBase = setMapBase;
window.__mapClickToWgs = mapClickToWgs;
window.__wgsToMapLatLng = wgsToMapLatLng;
window.__AMAP_KEY = AMAP_KEY;
window.__AMAP_JS_CODE = AMAP_JS_CODE;


map.attributionControl.setPrefix(
  '<div style="text-align: right; margin-bottom: 4px;">' +
  '<a href="https://www.tianditu.gov.cn" target="_blank" title="天地图" style="display: inline-block; line-height: 0;">' +
  '<img src="https://www.tianditu.gov.cn/assets/logo-Tuu47PEg.svg" alt="天地图" style="height: 60px;">' +
  "</a></div>"
);

// ========== 定位（反查地名 + 用户确认，防缓存错位） ==========
let currentLocationMarker = null;

function updateMessage(text, isError = false) {
  const el = document.getElementById("message");
  if (!el) return;
  el.textContent = text || "";
  el.className = "message" + (isError ? " error" : "");
}

function resetLocBtn() {
  const btn = document.getElementById("getLocationBtn");
  if (btn) {
    btn.disabled = false;
    btn.textContent = "尝试获取当前位置";
  }
}

// 参数为 WGS-84；高德底图会转 GCJ-02 再显示
function placeLocationMarker(lat, lng, accuracy, title, jump) {
  const show = wgsToMapLatLng(lat, lng);
  if (currentLocationMarker) map.removeLayer(currentLocationMarker);
  currentLocationMarker = L.marker([show.lat, show.lng], {
    icon: L.divIcon({
      className: "current-location-marker",
      html: '<div class="location-pulse"></div>',
      iconSize: [20, 20]
    })
  }).addTo(map);
  currentLocationMarker.bindPopup(
    `<b>${title}</b><br>纬度: ${lat.toFixed(6)}<br>经度: ${lng.toFixed(6)}<br>精度: ±${Math.round(accuracy)} 米`
  ).openPopup();
  if (jump !== false) map.setView([show.lat, show.lng], 16);
}

function routeToMapLLs(points) {
  return (points || []).map(function (p) {
    const s = wgsToMapLatLng(p.lat, p.lng);
    return [s.lat, s.lng];
  });
}

// 天地图逆地理：把坐标变成「省市区」，让用户肉眼确认是否靠谱
async function reverseGeocode(lat, lng) {
  const postStr = encodeURIComponent(JSON.stringify({ lon: lng, lat: lat, ver: 1 }));
  const url = `https://api.tianditu.gov.cn/geocoder?postStr=${postStr}&type=geocode&tk=${TTD_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const addr =
      data?.result?.formatted_address ||
      data?.result?.addressComponent?.address ||
      data?.result?.addressComponent?.town ||
      "";
    const comp = data?.result?.addressComponent || {};
    const brief = [comp.province, comp.city, comp.district, comp.town]
      .filter(Boolean)
      .join("");
    return brief || addr || "";
  } catch (e) {
    return "";
  }
}

function confirmPlaceUI(lat, lng, acc, placeName) {
  const box = document.getElementById("locConfirm");
  if (!box) {
    // 无确认框 DOM 时退回 window.confirm
    const ok = window.confirm(
      `定位到：${placeName || "未知地点"}（±${Math.round(acc)} 米）\n\n这是你的当前位置吗？\n选「取消」则不跳转，请在地图上手动点击。`
    );
    if (ok) {
      placeLocationMarker(lat, lng, acc, placeName || "您的当前位置", true);
      updateMessage(`已使用定位：${placeName}（±${Math.round(acc)} 米）`);
    } else {
      updateMessage("已忽略该定位（可能是缓存/错误位置）。请在地图上点击选择真实起点。", true);
    }
    return;
  }

  box.querySelector("#locConfirmText").textContent =
    `定位到：${placeName || "未知地点"}（±${Math.round(acc)} 米）`;
  box.classList.add("show");

  const yes = box.querySelector("#locYes");
  const no = box.querySelector("#locNo");

  const cleanup = () => {
    box.classList.remove("show");
    yes.replaceWith(yes.cloneNode(true));
    no.replaceWith(no.cloneNode(true));
  };

  box.querySelector("#locYes").addEventListener("click", () => {
    placeLocationMarker(lat, lng, acc, placeName || "您的当前位置", true);
    updateMessage(`已使用定位：${placeName || "当前位置"}（±${Math.round(acc)} 米）`);
    cleanup();
    resetLocBtn();
  });
  box.querySelector("#locNo").addEventListener("click", () => {
    updateMessage("已忽略该定位。请在地图上点击选择真实起点。", true);
    cleanup();
    resetLocBtn();
  });
}

async function acceptPosition(pos) {
  const acc = pos.coords.accuracy || 9999;
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  updateMessage("正在识别地名，请确认是否正确…");
  const placeName = await reverseGeocode(lat, lng);
  if (acc > 1500) {
    updateMessage(
      `拒绝使用：精度约 ${Math.round(acc / 1000)} 公里（IP 粗定位）。` +
        `识别为「${placeName || "未知"}」。请直接点地图选起点。`,
      true
    );
    resetLocBtn();
    return;
  }
  confirmPlaceUI(lat, lng, acc, placeName);
}

function startLocate() {
  const btn = document.getElementById("getLocationBtn");
  if (!navigator.geolocation) {
    updateMessage("您的浏览器不支持定位，请在地图上点击选择位置", true);
    return;
  }

  btn.disabled = true;
  btn.textContent = "定位中...";
  updateMessage("正在获取位置（强制刷新，不用旧缓存）…请允许定位权限");

  // maximumAge: 0 必须新算；watchPosition 以拿到更稳的一次
  const options = { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 };
  let watchId = null;
  let best = null;
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    if (watchId != null) {
      try { navigator.geolocation.clearWatch(watchId); } catch (e) {}
      watchId = null;
    }
    resetLocBtn();
  }

  function handlePosition(pos) {
    const acc = pos.coords.accuracy || 9999;
    if (!best || acc < (best.coords.accuracy || 9999)) best = pos;
    if (acc <= 50) {
      finish();
      acceptPosition(pos);
    }
  }

  function handleError(error) {
    let msg = "定位失败，请在地图上手动点击选择位置";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        msg = "定位失败：位置权限被拒绝。请点地址栏左侧「锁/权限」→ 允许定位后重试。";
        break;
      case error.POSITION_UNAVAILABLE:
        msg = "定位失败：当前位置不可用。请检查 Windows「定位服务」，或直接点地图。";
        break;
      case error.TIMEOUT:
        msg = "定位超时：可重试，或直接点地图选点。";
        break;
    }
    updateMessage(msg, true);
    finish();
  }

  watchId = navigator.geolocation.watchPosition(handlePosition, handleError, options);

  setTimeout(() => {
    if (finished) return;
    if (!best) {
      updateMessage("未能获取位置。请直接在地图上点击选择起点。", true);
      finish();
      return;
    }
    finish();
    acceptPosition(best);
  }, 8000);
}

// ========== 地点搜索（不依赖 GPS 的推荐定位方式） ==========
function renderPlaceResults(items) {
  const box = document.getElementById("placeResults");
  if (!box) return;
  box.innerHTML = "";
  if (!items || items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "place-hint";
    empty.textContent = "没找到地点，换个关键词试试（如：XX大学）";
    box.appendChild(empty);
    return;
  }
  items.forEach((it) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "place-item";
    const name = it.name || "未知地点";
    const addr = it.address || it.province || "";
    btn.innerHTML = `<span class="place-name"></span><span class="place-addr"></span>`;
    btn.querySelector(".place-name").textContent = name;
    btn.querySelector(".place-addr").textContent = addr;
    btn.addEventListener("click", () => {
      const lat = Number(it.lat ?? it.pointY);
      const lng = Number(it.lon ?? it.pointX);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      placeLocationMarker(lat, lng, 20, name, true);
      updateMessage(`已跳转到「${name}」，可在附近点击绘制轨迹。`);
      box.innerHTML = "";
      const q = document.getElementById("placeQuery");
      if (q) q.value = name;
    });
    box.appendChild(btn);
  });
}

async function searchPlaces() {
  const input = document.getElementById("placeQuery");
  const q = (input?.value || "").trim();
  if (!q) {
    updateMessage("请先输入要搜索的地点名，例如：XX大学", true);
    return;
  }
  updateMessage(`正在搜索「${q}」…`);
  try {
    const postStr = encodeURIComponent(
      JSON.stringify({
        keyWord: q,
        level: 12,
        mapBound: "70,3,140,55",
        queryType: 7,
        count: 8,
        start: 0
      })
    );
    const url = `https://api.tianditu.gov.cn/v2/search?postStr=${postStr}&type=query&tk=${TTD_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const pois = data?.pois || [];
    const parsed = pois.map((p) => {
      const xy = (p.lonlat || "").split(",");
      return {
        name: p.name,
        address: p.address || p.district || "",
        lon: Number(xy[0]),
        lat: Number(xy[1])
      };
    }).filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lon));

    // 也支持单点地理编码（输入完整地址时）
    if (parsed.length === 0) {
      const gpost = encodeURIComponent(JSON.stringify({ keyWord: q, level: 12 }));
      const gres = await fetch(
        `https://api.tianditu.gov.cn/geocoder?postStr=${gpost}&type=geocode&tk=${TTD_KEY}`
      );
      const gdata = await gres.json();
      const loc = gdata?.result?.location;
      if (loc && Number.isFinite(loc.lat) && Number.isFinite(loc.lon)) {
        parsed.push({
          name: q,
          address: gdata?.result?.formatted_address || "",
          lon: loc.lon,
          lat: loc.lat
        });
      }
    }

    renderPlaceResults(parsed);
    if (parsed.length > 0) {
      updateMessage(`找到 ${parsed.length} 个结果，点选即可跳转。`);
    }
  } catch (e) {
    console.error(e);
    updateMessage("搜索失败，请检查网络后重试", true);
  }
}

document.getElementById("placeSearchBtn")?.addEventListener("click", searchPlaces);
document.getElementById("placeQuery")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchPlaces();
  }
});
// ========== 地点搜索 END ==========
const getLocationBtn = document.getElementById("getLocationBtn");
if (getLocationBtn) {
  getLocationBtn.addEventListener("click", startLocate);
}
// ========== 定位 END ==========

const weightInput = document.getElementById("weightInput");
const savedWeight = localStorage.getItem("fit_weight");
weightInput.value = savedWeight ? savedWeight : 65;
weightInput.addEventListener("change", () => {
  localStorage.setItem("fit_weight", weightInput.value);
});

let routePoints = [];
let polyline = null;
let paceChart = null;
let hrChart = null;

function haversineDistance(lat1, lon1, lat2, lon2) {
  return window.FitEngine.haversineDistance(lat1, lon1, lat2, lon2);
}

function computeDistanceMeters(points) {
  if (!points || points.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineDistance(points[i - 1].lat, points[i - 1].lng, points[i].lat, points[i].lng);
  }
  return total;
}

function updateDistanceInfo() {
  const el = document.getElementById("distanceInfo");
  if (!el) return;
  if (!routePoints || routePoints.length < 2) {
    el.textContent = "总距离约：0 公里";
    return;
  }
  const baseKm = computeDistanceMeters(routePoints) / 1000;
  const lapInput = document.getElementById("lapCount");
  const laps = Math.max(1, parseInt(lapInput?.value, 10) || 1);
  const totalKm = baseKm * laps;
  el.textContent =
    laps > 1
      ? `总距离约：${totalKm.toFixed(2)} 公里（基础：${baseKm.toFixed(2)} 公里 × ${laps} 圈）`
      : `总距离约：${baseKm.toFixed(2)} 公里`;
}

map.on("click", (e) => {
  // 统一存 WGS-84，生成 FIT 用；显示时再转到当前底图
  const w = mapClickToWgs(e.latlng.lat, e.latlng.lng);
  routePoints.push({ lat: w.lat, lng: w.lng });
  const ll = routeToMapLLs(routePoints);
  if (polyline) polyline.setLatLngs(ll);
  else polyline = L.polyline(ll, { color: "#ff5722" }).addTo(map);
  updateMessage(`已添加点数：${routePoints.length}`);
  updateDistanceInfo();
});

document.getElementById("clearRoute").addEventListener("click", () => {
  routePoints = [];
  if (polyline) {
    map.removeLayer(polyline);
    polyline = null;
  }
  updateMessage("轨迹已清除");
  updateDistanceInfo();
});

function dateToLocalInputValue(d) {
  const tzOffset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - tzOffset * 60000);
  return local.toISOString().slice(0, 16);
}

function rebuildExportTimes() {
  const container = document.getElementById("exportTimes");
  const exportInput = document.getElementById("exportCount");
  if (!container || !exportInput) return;
  const count = Math.max(1, Math.min(10, parseInt(exportInput.value, 10) || 1));
  const now = new Date();
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const row = document.createElement("div");
    row.className = "export-time-row";
    const label = document.createElement("span");
    label.textContent = `第 ${i + 1} 份`;
    const timeInput = document.createElement("input");
    timeInput.type = "datetime-local";
    timeInput.className = "export-time-input";
    timeInput.value = dateToLocalInputValue(new Date(now.getTime() + i * 86400000));
    const paceMinInput = document.createElement("input");
    paceMinInput.type = "number";
    paceMinInput.className = "export-pace-min";
    paceMinInput.min = "0";
    paceMinInput.step = "0.1";
    paceMinInput.value = "6";
    const paceSecInput = document.createElement("input");
    paceSecInput.type = "number";
    paceSecInput.className = "export-pace-sec";
    paceSecInput.min = "0";
    paceSecInput.max = "59.9";
    paceSecInput.step = "0.1";
    paceSecInput.value = "0";
    row.appendChild(label);
    row.appendChild(timeInput);
    row.appendChild(paceMinInput);
    row.appendChild(paceSecInput);
    container.appendChild(row);
  }
}

function readExportConfig(exportCount) {
  const container = document.getElementById("exportTimes");
  const timeInputs = container ? Array.from(container.querySelectorAll(".export-time-input")) : [];
  const paceMinInputs = container ? Array.from(container.querySelectorAll(".export-pace-min")) : [];
  const paceSecInputs = container ? Array.from(container.querySelectorAll(".export-pace-sec")) : [];
  const rows = [];
  for (let i = 0; i < exportCount; i++) {
    const input = timeInputs[i];
    if (!input || !input.value) throw new Error(`请为第 ${i + 1} 份设置开始日期时间`);
    const fileStart = new Date(input.value);
    if (Number.isNaN(fileStart.getTime())) throw new Error(`第 ${i + 1} 份的开始时间无效`);
    const pm = parseFloat(paceMinInputs[i]?.value);
    const ps = parseFloat(paceSecInputs[i]?.value);
    const sec = (Number.isFinite(pm) ? pm : 0) * 60 + (Number.isFinite(ps) ? ps : 0);
    if (!sec || sec <= 0) throw new Error(`第 ${i + 1} 份的配速无效`);
    rows.push({ fileStart, paceSecondsPerKm: sec });
  }
  return rows;
}

function collectCommon() {
  return {
    hrRest: parseInt(document.getElementById("hrRest").value, 10) || 60,
    hrMax: parseInt(document.getElementById("hrMax").value, 10) || 180,
    lapCount: Math.max(1, parseInt(document.getElementById("lapCount")?.value, 10) || 1),
    weightKg: Number(document.getElementById("weightInput").value) || 65
  };
}

async function generateFit() {
  if (routePoints.length < 2) {
    updateMessage("请至少在地图上选择两个点形成轨迹", true);
    return;
  }
  const common = collectCommon();
  const exportCount = Math.max(1, Math.min(10, parseInt(document.getElementById("exportCount")?.value, 10) || 1));
  try {
    const rows = readExportConfig(exportCount);
    for (let i = 0; i < rows.length; i++) {
      updateMessage(`正在生成第 ${i + 1}/${rows.length} 个 FIT 文件，请稍候…`);
      const bytes = window.FitEngine.generateFitBytes({
        startTime: rows[i].fileStart.toISOString(),
        points: routePoints,
        paceSecondsPerKm: rows[i].paceSecondsPerKm,
        ...common,
        variantIndex: i + 1
      });
      const blob = new Blob([bytes], { type: "application/vnd.ant.fit" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = rows.length > 1 ? `run_${i + 1}.fit` : "run.fit";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    updateMessage(`已生成 ${rows.length} 个 FIT 文件并开始下载`);
  } catch (e) {
    console.error(e);
    updateMessage(e.message || "生成失败", true);
  }
}

document.getElementById("generateFit").addEventListener("click", generateFit);
document.getElementById("lapCount")?.addEventListener("input", updateDistanceInfo);
document.getElementById("exportCount")?.addEventListener("input", rebuildExportTimes);

function renderPreviewCharts(preview) {
  if (!preview || !Array.isArray(preview.samples) || preview.samples.length === 0) {
    updateMessage("预览数据为空", true);
    return;
  }
  const labels = preview.samples.map((s) => (s.timeSec / 60).toFixed(1));
  const paceData = preview.samples.map((s) => {
    const speed = s.speed > 0 ? s.speed : 0.01;
    return 1000 / speed / 60;
  });
  const hrData = preview.samples.map((s) => s.heartRate);

  const paceCtx = document.getElementById("paceChart").getContext("2d");
  const hrCtx = document.getElementById("hrChart").getContext("2d");

  if (paceChart) paceChart.destroy();
  if (hrChart) hrChart.destroy();

  paceChart = new Chart(paceCtx, {
    type: "line",
    data: {
      labels,
      datasets: [{ label: "配速 min/km", data: paceData, borderColor: "#ff5722", tension: 0.25, pointRadius: 0 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  hrChart = new Chart(hrCtx, {
    type: "line",
    data: {
      labels,
      datasets: [{ label: "心率 bpm", data: hrData, borderColor: "#1976d2", tension: 0.25, pointRadius: 0 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  const live = document.getElementById("liveInfo");
  if (live) {
    const km = (preview.totalDistanceMeters / 1000).toFixed(2);
    const min = (preview.totalDurationSec / 60).toFixed(1);
    live.innerHTML =
      `距离：${km} km　时长：${min} min　卡路里：${preview.calories || "-"} kcal`;
  }
}

document.getElementById("previewBtn").addEventListener("click", () => {
  if (routePoints.length < 2) {
    updateMessage("请至少在地图上选择两个点形成轨迹", true);
    return;
  }
  const common = collectCommon();
  const exportCount = Math.max(1, parseInt(document.getElementById("exportCount")?.value, 10) || 1);
  try {
    const rows = readExportConfig(exportCount);
    const preview = window.FitEngine.buildPreview({
      startTime: rows[0].fileStart.toISOString(),
      points: routePoints,
      paceSecondsPerKm: rows[0].paceSecondsPerKm,
      ...common,
      variantIndex: 1
    });
    renderPreviewCharts(preview);
    updateMessage("预览曲线已更新");
  } catch (e) {
    updateMessage(e.message || "预览失败", true);
  }
});

updateDistanceInfo();
rebuildExportTimes();

// 直接加载地图（无登录门）
document.addEventListener("DOMContentLoaded", () => {
  applyTtdKey(TTD_KEY);
});

// 底图切换按钮
document.querySelectorAll("[data-mapbase]").forEach((btn) => {
  btn.addEventListener("click", () => setMapBase(btn.getAttribute("data-mapbase")));
});
