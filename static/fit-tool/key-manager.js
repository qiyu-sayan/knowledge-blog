// key-manager.js — 天地图密钥弹窗、校验、本地记忆（免重复登录）
(function () {
  const KEY_TTD = "fit_ttd_key";
  const KEY_USER = "fit_user_name";
  const KEY_REMEMBER = "fit_remember";

  function $(id) {
    return document.getElementById(id);
  }

  function getStoredKey() {
    return localStorage.getItem(KEY_TTD) || "";
  }

  function getStoredUser() {
    return localStorage.getItem(KEY_USER) || "";
  }

  function rememberEnabled() {
    return localStorage.getItem(KEY_REMEMBER) !== "0";
  }

  function saveSession(key, name, remember) {
    if (remember) {
      localStorage.setItem(KEY_TTD, key);
      localStorage.setItem(KEY_USER, name || "");
      localStorage.setItem(KEY_REMEMBER, "1");
    } else {
      sessionStorage.setItem(KEY_TTD, key);
      sessionStorage.setItem(KEY_USER, name || "");
      localStorage.removeItem(KEY_TTD);
      localStorage.removeItem(KEY_USER);
      localStorage.setItem(KEY_REMEMBER, "0");
    }
  }

  function clearSession() {
    localStorage.removeItem(KEY_TTD);
    localStorage.removeItem(KEY_USER);
    sessionStorage.removeItem(KEY_TTD);
    sessionStorage.removeItem(KEY_USER);
  }

  function activeKey() {
    return sessionStorage.getItem(KEY_TTD) || localStorage.getItem(KEY_TTD) || "";
  }

  // 用天地图瓦片请求验证 key 是否可用
  async function validateTtdKey(key) {
    const k = (key || "").trim();
    if (!k) return { ok: false, message: "请输入天地图开发者密钥（tk）" };
    if (!/^[a-f0-9]{32}$/i.test(k)) {
      return { ok: false, message: "密钥格式不对：应为 32 位十六进制字符串" };
    }
    const url =
      "https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0" +
      "&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      "&TILEMATRIX=5&TILEROW=10&TILECOL=26&tk=" + encodeURIComponent(k);
    try {
      const res = await fetch(url, { method: "GET", mode: "cors" });
      // 天地图无论 key 是否有效常返回 200 图片；用内容类型辅助判断
      const type = res.headers.get("content-type") || "";
      if (!res.ok) {
        return { ok: false, message: "密钥校验失败（HTTP " + res.status + "）" };
      }
      if (type.includes("json") || type.includes("text")) {
        const text = await res.text();
        if (/key|非法|无效|not|error|invalid/i.test(text)) {
          return { ok: false, message: "天地图拒绝了该密钥，请检查是否开通「浏览器端」服务" };
        }
      }
      return { ok: true, message: "密钥可用" };
    } catch (e) {
      // 网络受限时不阻塞：仍允许使用，由地图加载结果兜底
      return { ok: true, message: "无法在线校验，将直接尝试加载地图", soft: true };
    }
  }

  function applyKeyToMap(key) {
    // 由 main.js 注册的回调：用新 key 重建瓦片图层
    if (typeof window.__applyTtdKey === "function") {
      window.__applyTtdKey(key);
    }
    window.dispatchEvent(new CustomEvent("ttd-key-ready", { detail: { key } }));
  }

  function showModal(force) {
    const modal = $("keyModal");
    if (!modal) return Promise.resolve();
    if (!force && activeKey()) {
      modal.classList.remove("show");
      applyKeyToMap(activeKey());
      return Promise.resolve(activeKey());
    }
    modal.classList.add("show");
    $("keyInput").value = activeKey() || "";
    $("userNameInput").value = getStoredUser() || "";
    $("rememberCheck").checked = rememberEnabled();
    $("keyStatus").textContent = "";
    $("keyStatus").className = "key-status";

    return new Promise((resolve) => {
      const form = $("keyForm");
      const onValidate = async (e) => {
        e.preventDefault();
        const key = $("keyInput").value.trim();
        const name = $("userNameInput").value.trim();
        const remember = $("rememberCheck").checked;
        const status = $("keyStatus");
        status.textContent = "正在校验密钥…";
        status.className = "key-status pending";
        const btn = $("keySubmitBtn");
        btn.disabled = true;
        try {
          const result = await validateTtdKey(key);
          if (!result.ok) {
            status.textContent = result.message;
            status.className = "key-status error";
            return;
          }
          status.textContent = result.message + "，正在进入工具…";
          status.className = "key-status ok";
          saveSession(key, name, remember);
          applyKeyToMap(key);
          setTimeout(() => {
            modal.classList.remove("show");
            form.removeEventListener("submit", onValidate);
            resolve(key);
          }, result.soft ? 0 : 350);
        } finally {
          btn.disabled = false;
        }
      };
      form.addEventListener("submit", onValidate);

      $("keySkipBtn")?.addEventListener(
        "click",
        () => {
          const key = $("keyInput").value.trim();
          if (key) {
            saveSession(key, $("userNameInput").value.trim(), $("rememberCheck").checked);
            applyKeyToMap(key);
          }
          modal.classList.remove("show");
          resolve(key);
        },
        { once: true }
      );
    });
  }

  window.KeyManager = {
    show: showModal,
    getKey: activeKey,
    clear: clearSession,
    getStoredUser
  };

  document.addEventListener("DOMContentLoaded", () => {
    $("changeKeyBtn")?.addEventListener("click", () => showModal(true));
    $("logoutBtn")?.addEventListener("click", () => {
      clearSession();
      location.reload();
    });
  });
})();
