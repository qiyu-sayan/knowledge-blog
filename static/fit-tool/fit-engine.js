// fit-engine.js — 浏览器端预览 + FIT 生成（替代原 Node /api）
// 依赖：CDN 加载的 @garmin/fitsdk（见 index.html）

function toSemicircles(deg) {
  return Math.round((deg * 2147483648) / 180);
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function offsetPointMeters(point, offsetLatMeters, offsetLonMeters) {
  const metersPerDegLat = 111320;
  const metersPerDegLon = 111320 * Math.cos((point.lat * Math.PI) / 180);
  return {
    lat: point.lat + offsetLatMeters / metersPerDegLat,
    lng: point.lng + offsetLonMeters / metersPerDegLon
  };
}

function buildClosedBasePoints(points) {
  if (!points || points.length < 2) return points || [];
  const first = points[0];
  const last = points[points.length - 1];
  const d = haversineDistance(first.lat, first.lng, last.lat, last.lng);
  if (d < 5) return points;
  return points.concat([{ lat: first.lat, lng: first.lng }]);
}

function simulateCadence(speed) {
  const base = 170;
  const speedEffect = (speed - 2.5) * 8;
  const noise = (Math.random() - 0.5) * 6;
  return Math.max(150, Math.min(200, Math.round(base + speedEffect + noise)));
}

function computeSamples(allPoints, distances, totalDist, paceSecondsPerKm, hrRestVal, hrMaxVal) {
  const totalDistanceKm = totalDist / 1000;
  const targetDurationSec = totalDistanceKm * paceSecondsPerKm;
  const avgSpeedTarget = totalDist / targetDurationSec;
  const baseSpeedFactor = 0.98 + Math.random() * 0.06;
  const phase1 = Math.random() * Math.PI * 2;
  const phase2 = Math.random() * Math.PI * 2;
  const n = allPoints.length;
  const instSpeedRaw = new Array(n);
  const hrValues = new Array(n);
  let currentHr = hrRestVal;

  for (let i = 0; i < n; i++) {
    const frac = totalDist > 0 ? distances[i] / totalDist : 0;
    const longWave = 0.04 * Math.sin(frac * Math.PI * 2 + phase1);
    const shortWave = 0.02 * Math.sin(frac * Math.PI * 6 + phase2);
    const speedRaw = avgSpeedTarget * baseSpeedFactor * (1 + longWave + shortWave);
    instSpeedRaw[i] = speedRaw;
    const effort = Math.min(1, Math.max(0, speedRaw / (avgSpeedTarget || 1e-6)));
    let intensityBase;
    if (frac < 0.1) intensityBase = 0.4 + 0.4 * (frac / 0.1);
    else if (frac < 0.8) intensityBase = 0.8 + 0.05 * Math.sin(((frac - 0.1) / 0.7) * Math.PI * 2);
    else intensityBase = 0.85 + 0.1 * ((frac - 0.8) / 0.2);
    const intensity = Math.min(1, Math.max(0, 0.7 * intensityBase + 0.3 * effort));
    const hrTarget = hrRestVal + (hrMaxVal - hrRestVal) * intensity;
    currentHr += (hrTarget - currentHr) * 0.15;
    const hrJitter = (Math.random() - 0.5) * 3;
    hrValues[i] = Math.round(Math.min(hrMaxVal, Math.max(hrRestVal, currentHr + hrJitter)));
  }

  const segDurationsRaw = new Array(Math.max(0, n - 1));
  let rawDuration = 0;
  for (let i = 1; i < n; i++) {
    const ds = distances[i] - distances[i - 1];
    const v = instSpeedRaw[i] > 0 ? instSpeedRaw[i] : avgSpeedTarget;
    const dt = ds / v;
    segDurationsRaw[i - 1] = dt;
    rawDuration += dt;
  }
  const scale = rawDuration > 0 ? targetDurationSec / rawDuration : 1;

  const samples = [];
  let t = 0;
  samples.push({
    timeSec: 0,
    distance: distances[0],
    speed: instSpeedRaw[0] / scale,
    heartRate: hrValues[0],
    lat: allPoints[0].lat,
    lng: allPoints[0].lng
  });
  for (let i = 1; i < n; i++) {
    t += segDurationsRaw[i - 1] * scale;
    samples.push({
      timeSec: t,
      distance: distances[i],
      speed: instSpeedRaw[i] / scale,
      heartRate: hrValues[i],
      lat: allPoints[i].lat,
      lng: allPoints[i].lng
    });
  }
  const totalDurationSec = samples.length ? samples[samples.length - 1].timeSec : targetDurationSec;
  return { samples, totalDurationSec };
}

function prepareRun(input) {
  const {
    startTime,
    points,
    paceSecondsPerKm,
    hrRest,
    hrMax,
    lapCount,
    variantIndex,
    weightKg
  } = input || {};

  const weight =
    Number.isFinite(Number(weightKg)) && weightKg > 30 && weightKg < 150 ? Number(weightKg) : 65;

  if (!startTime || !points || !Array.isArray(points) || points.length < 2) {
    throw new Error("缺少参数：需要 startTime、至少两个轨迹点");
  }
  const startDate = new Date(startTime);
  if (Number.isNaN(startDate.getTime())) throw new Error("startTime 格式不正确");

  const pace = Number(paceSecondsPerKm) > 0 ? Number(paceSecondsPerKm) : 360;
  const hrRestVal = Number.isFinite(Number(hrRest)) ? Number(hrRest) : 60;
  const hrMaxVal = Number.isFinite(Number(hrMax)) ? Number(hrMax) : 180;
  const lapsRaw = Number(lapCount);
  const laps = Number.isFinite(lapsRaw) && lapsRaw > 0 ? Math.floor(lapsRaw) : 1;
  const variantRaw = Number(variantIndex);
  const variant = Number.isFinite(variantRaw) && variantRaw > 0 ? Math.floor(variantRaw) : 1;

  const basePoints = buildClosedBasePoints(points);
  const allPoints = [];
  for (let lapIndex = 0; lapIndex < laps; lapIndex++) {
    const radiusMeters = 5 + Math.random() * 10;
    const angle = Math.random() * Math.PI * 2;
    const offsetLatMeters = radiusMeters * Math.cos(angle);
    const offsetLonMeters = radiusMeters * Math.sin(angle);
    for (let i = 0; i < basePoints.length; i++) {
      const p = basePoints[i];
      allPoints.push(laps === 1 ? p : offsetPointMeters(p, offsetLatMeters, offsetLonMeters));
    }
  }

  const distances = [0];
  let totalDist = 0;
  for (let i = 1; i < allPoints.length; i++) {
    totalDist += haversineDistance(allPoints[i - 1].lat, allPoints[i - 1].lng, allPoints[i].lat, allPoints[i].lng);
    distances.push(totalDist);
  }
  if (totalDist === 0) throw new Error("轨迹距离为 0，请绘制更长的路线");

  const calories = Math.round(weight * (totalDist / 1000) * 1.036);
  const { samples, totalDurationSec } = computeSamples(
    allPoints, distances, totalDist, pace, hrRestVal, hrMaxVal
  );
  return { startDate, allPoints, distances, totalDist, totalDurationSec, samples, calories, variant };
}

function buildPreview(input) {
  const run = prepareRun(input);
  return {
    totalDistanceMeters: run.totalDist,
    totalDurationSec: run.totalDurationSec,
    samples: run.samples,
    calories: run.calories
  };
}

function generateFitBytes(input) {
  const sdk = window.GarminFitSdk;
  if (!sdk || !sdk.Encoder) {
    throw new Error("FIT SDK 尚未加载完成，请稍候再试");
  }
  const { Encoder, Profile } = sdk;
  const run = prepareRun(input);
  const encoder = new Encoder();

  encoder.onMesg(Profile.MesgNum.FILE_ID, {
    manufacturer: "development",
    product: 1,
    timeCreated: run.startDate,
    type: "activity"
  });
  encoder.onMesg(Profile.MesgNum.DEVICE_INFO, {
    timestamp: run.startDate,
    manufacturer: "development",
    product: 1,
    serialNumber: 1
  });

  const avgSpeed = run.totalDist / run.totalDurationSec;
  const sessionEnd = new Date(run.startDate.getTime() + run.totalDurationSec * 1000);

  encoder.onMesg(Profile.MesgNum.SESSION, {
    timestamp: sessionEnd,
    startTime: run.startDate,
    totalElapsedTime: run.totalDurationSec,
    totalTimerTime: run.totalDurationSec,
    totalDistance: run.totalDist,
    totalCalories: run.calories,
    sport: "running",
    subSport: "generic",
    avgSpeed
  });

  encoder.onMesg(Profile.MesgNum.ACTIVITY, {
    timestamp: sessionEnd,
    totalTimerTime: run.totalDurationSec,
    numSessions: 1,
    type: "manual"
  });

  for (let i = 0; i < run.samples.length; i++) {
    const s = run.samples[i];
    const timestamp = new Date(run.startDate.getTime() + s.timeSec * 1000);
    const cadence = simulateCadence(s.speed);
    encoder.onMesg(Profile.MesgNum.RECORD, {
      timestamp,
      positionLat: toSemicircles(run.allPoints[i].lat),
      positionLong: toSemicircles(run.allPoints[i].lng),
      distance: s.distance,
      speed: s.speed,
      heartRate: s.heartRate,
      cadence: Math.round(cadence / 2),
      runningCadence: cadence
    });
  }

  return encoder.close();
}

window.FitEngine = { buildPreview, generateFitBytes, haversineDistance };
