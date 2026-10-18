---
title: "随机地址生成器"
slug: address-gen
date: 2026-10-14
description: "真实城市街道 / 公开地标地址生成，用于测试与演示。"
---

<script src="/js/address-gen.js" defer></script>

<style>
  .addr-wrap { margin: 0.5rem 0 1.5rem; }
  .addr-tabs { display: flex; gap: 8px; margin: 0.75rem 0; flex-wrap: wrap; }
  .addr-tabs button {
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid var(--card-border, #e4dccf);
    background: var(--card-bg, #fffdf9);
    cursor: pointer;
    font-size: 14px;
    color: inherit;
  }
  .addr-tabs button.on {
    background: #0f766e;
    border-color: #0f766e;
    color: #fff;
    font-weight: 600;
  }
  .addr-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin: 0.85rem 0;
  }
  .addr-toolbar input[type="number"],
  .addr-toolbar select {
    padding: 10px 12px;
    border: 1px solid var(--card-border, #e4dccf);
    border-radius: 10px;
    font-size: 15px;
    background: var(--card-bg, #fff);
    color: inherit;
  }
  .addr-toolbar input[type="number"] { width: 100px; }
  .addr-toolbar label.chk {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  .addr-toolbar .btn,
  .addr-toolbar .btn-ghost {
    padding: 10px 16px;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background: #0f766e;
    color: #fff;
  }
  .addr-toolbar .btn-ghost {
    background: var(--card-bg, #fffdf9);
    border: 1px solid var(--card-border, #e4dccf);
    color: inherit;
  }
  .addr-stat {
    background: #fff7ed;
    border: 1px solid #fdba74;
    color: #9a3412;
    border-radius: 10px;
    padding: 0.75rem 1rem;
    margin: 0.75rem 0;
    font-size: 0.92rem;
  }
  .addr-card {
    background: var(--card-bg, #fffdf9);
    border: 1px solid var(--card-border, #e4dccf);
    border-radius: 12px;
    padding: 1rem 1.15rem;
    margin: 0.75rem 0;
  }
  .addr-card h3 { margin: 0 0 0.55rem; font-size: 1.02rem; }
  .addr-row {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 6px 12px;
    font-size: 0.95rem;
  }
  .addr-k { color: var(--muted, #6b645c); }
  .addr-v { word-break: break-all; }
  .addr-actions { display: flex; gap: 8px; margin-top: 0.75rem; flex-wrap: wrap; }
  .addr-actions .btn {
    padding: 8px 14px;
    font-size: 13px;
    border-radius: 8px;
    border: 1px solid var(--card-border, #e4dccf);
    background: var(--card-bg, #fffdf9);
    color: inherit;
    cursor: pointer;
  }
  @media (max-width: 640px) {
    .addr-toolbar { flex-direction: column; align-items: stretch; }
    .addr-toolbar .btn, .addr-toolbar .btn-ghost { width: 100%; }
    .addr-row { grid-template-columns: 1fr; }
    .addr-k { font-size: 0.82rem; }
  }
</style>

<div class="addr-wrap">
  <p>用<strong>真实城市、真实路名</strong>或<strong>公开地标</strong>生成地址；门牌为示意号段。说明见 <a href="/p/address-generator/">文章</a>。</p>

  <div class="addr-tabs" id="regionTabs">
    <button type="button" class="on" data-region="us">美国</button>
    <button type="button" data-region="uk">英国</button>
    <button type="button" data-region="cn">中国</button>
  </div>

  <div class="addr-toolbar">
    <label>模式</label>
    <select id="mode">
      <option value="street">真实街道（随机门牌）</option>
      <option value="landmark">公开地标（精确）</option>
    </select>
    <label>条数</label>
    <input id="count" type="number" min="1" max="50" value="8" />
    <label class="chk"><input id="withName" type="checkbox" /> 附加随机人名</label>
    <button class="btn" id="genBtn">生成</button>
    <button class="btn btn-ghost" id="copyAll">复制全部</button>
    <button class="btn btn-ghost" id="clearBtn">清空</button>
  </div>

  <div id="stat" class="addr-stat"></div>
  <div id="list"></div>

  <p style="color:var(--muted,#6b645c);font-size:0.88rem">
    真实街道：城市与路名为真实地名，门牌随机，不保证精确到户。公开地标：官方公开地址。仅供测试演示。
  </p>
</div>
