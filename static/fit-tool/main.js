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

function applyTtdKey(key) {
  if (vecLayer) map.removeLayer(vecLayer);
  if (cvaLayer) map.removeLayer(cvaLayer);
  vecLayer = L.tileLayer(ttdUrl("vec_w", key), {
    subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
    minZoom: 5,
    maxZoom: 20,
    maxNativeZoom: 18,
    attribution: "© 天地图 GS (2025) 1508号 - 甲测资字11110974 | 数据来源: 自然资源部 & NavInfo"
  }).addTo(map);
  cvaLayer = L.tileLayer(ttdUrl("cva_w", key), {
    subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
    minZoom: 5,
    maxZoom: 20,
    maxNativeZoom: 17
  }).addTo(map);
}

window.__applyTtdKey = applyTtdKey;

map.attributionControl.setPrefix(
  '<div style="text-align: right; margin-bottom: 4px;">' +
  '<a href="https://www.tianditu.gov.cn" target="_blank" title="天地图" style="display: inline-block; line-height: 0;">' +
  '<img src="https://www.tianditu.gov.cn/assets/logo-Tuu47PEg.svg" alt="天地图" style="height: 60px;">' +
  "</a></div>"
);

// ========== 定位（修复 IP 飘到外地） ==========
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

function placeLocationMarker(lat, lng, accuracy, title) {
  if (currentLocationMarker) map.removeLayer(currentLocationMarker);
  currentLocationMarker = L.marker([lat, lng], {
    icon: L.divIcon({
      className: "current-location-marker",
      html: '<div class="location-pulse"></div>',
      iconSize: [20, 20]
    })
  }).addTo(map);
  currentLocationMarker.bindPopup(
    `<b>${title}</b><br>纬度: ${lat.toFixed(6)}<br>经度: ${lng.toFixed(6)}<br>精度: ±${Math.round(accuracy)} 米`
  ).openPopup();
  map.setView([lat, lng], 15);
}

const getLocationBtn = document.getElementById("getLocationBtn");
if (getLocationBtn) {
  getLocationBtn.addEventListener("click", () => {
    getLocationBtn.disabled = true;
    getLocationBtn.textContent = "定位中...";
    updateMessage("正在获取您的位置…请允许浏览器定位权限");

    if (!navigator.geolocation) {
      updateMessage("您的浏览器不支持定位，请在地图上点击选择位置", true);
      resetLocBtn();
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy || 9999;

        // 精度太差（桌面 IP 定位）时明确警告，避免「安义县」误导
        if (accuracy > 2000) {
          placeLocationMarker(lat, lng, accuracy, "低精度位置（可能是 IP 大致位置）");
          updateMessage(
            `已定位到大致位置，但精度仅约 ${Math.round(accuracy / 1000)} 公里，可能不在您真实位置。` +
              `建议：手机打开本页并允许定位，或直接在地图上点击选择起点。`,
            true
          );
        } else {
          placeLocationMarker(lat, lng, accuracy, "您的当前位置");
          updateMessage(`定位成功！精度约 ${Math.round(accuracy)} 米。点击地图可从当前位置开始画轨迹。`);
        }
        resetLocBtn();
      },
      (error) => {
        let errorMsg = "定位失败，请在地图上手动点击选择位置";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg =
              "定位失败：您拒绝了位置权限。请在浏览器地址栏左侧「锁/权限」图标中允许定位，然后重试；" +
              "手机请到系统设置打开「定位服务」并允许浏览器使用。";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg =
              "定位失败：当前位置不可用。电脑端常因无 GPS 导致失败/飘移，请改用手机打开，或在地图上点击选择位置。";
            break;
          case error.TIMEOUT:
            errorMsg = "定位超时：信号弱或网络慢。可重试，或直接在地图上点击选择位置。";
            break;
        }
        updateMessage(errorMsg, true);
        resetLocBtn();
      },
      options
    );
  });
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
  routePoints.push({ lat: e.latlng.lat, lng: e.latlng.lng });
  if (polyline) polyline.setLatLngs(routePoints);
  else polyline = L.polyline(routePoints, { color: "#ff5722" }).addTo(map);
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

// 登录通过后加载地图
document.addEventListener("DOMContentLoaded", () => {
  const bootMap = () => applyTtdKey(TTD_KEY);
  if (document.body.classList.contains("app-unlocked")) {
    bootMap();
  } else {
    window.addEventListener("fit-auth-ready", bootMap, { once: true });
    // 若登录门在本脚本后才绑 DOMContentLoaded，兜底再听一次
    setTimeout(() => {
      if (document.body.classList.contains("app-unlocked") && !vecLayer) bootMap();
    }, 800);
  }
});
