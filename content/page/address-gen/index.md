---
title: "随机地址生成器"
slug: address-gen
date: 2026-10-19
description: "真实城市街道 / 公开地标地址生成，用于测试与演示。"
---

<script src="/js/address-gen.js" defer></script>

<style>
  .addr-wrap { margin: 0.25rem 0 1.5rem; }
  .addr-tabs { display: flex; gap: 8px; margin: 0.85rem 0; flex-wrap: wrap; }
  .addr-tabs button {
    padding: 8px 16px;
    border-radius: var(--card-border-radius, 10px);
    border: 1px solid var(--card-separator-color, rgba(218,218,218,0.5));
    background: var(--card-background, #fff);
    cursor: pointer;
    font-size: 14px;
    color: var(--card-text-color-main, #000);
    font-family: inherit;
  }
  .addr-tabs button.on {
    background: var(--accent-color, #34495e);
    border-color: var(--accent-color, #34495e);
    color: var(--accent-color-text, #fff);
    font-weight: 600;
  }
  .addr-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin: 0.85rem 0;
    padding: var(--card-padding, 20px);
    background: var(--card-background, #fff);
    border-radius: var(--card-border-radius, 10px);
  }
  .addr-toolbar input[type="number"],
  .addr-toolbar select {
    padding: 8px 12px;
    border: 1px solid var(--card-separator-color, rgba(218,218,218,0.5));
    border-radius: 8px;
    font-size: 15px;
    background: var(--card-background, #fff);
    color: var(--card-text-color-main, #000);
    font-family: inherit;
  }
  .addr-toolbar input[type="number"] { width: 96px; }
  .addr-toolbar label {
    font-size: 14px;
    color: var(--card-text-color-secondary, #747474);
  }
  .addr-toolbar label.chk {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--card-text-color-main, #000);
  }
  .addr-toolbar .btn {
    padding: 10px 18px;
    font-size: 15px;
    border-radius: var(--card-border-radius, 10px);
    cursor: pointer;
    border: none;
    background: var(--accent-color, #34495e);
    color: var(--accent-color-text, #fff);
    font-family: inherit;
  }
  .addr-toolbar .btn-ghost {
    padding: 10px 18px;
    font-size: 15px;
    border-radius: var(--card-border-radius, 10px);
    cursor: pointer;
    border: 1px solid var(--card-separator-color, rgba(218,218,218,0.5));
    background: transparent;
    color: var(--card-text-color-main, #000);
    font-family: inherit;
  }
  .addr-stat {
    background: var(--card-background, #fff);
    border-radius: var(--card-border-radius, 10px);
    padding: 14px var(--card-padding, 20px);
    margin: 0.85rem 0;
    font-size: 14px;
    color: var(--card-text-color-secondary, #747474);
  }
  .addr-card {
    background: var(--card-background, #fff);
    border-radius: var(--card-border-radius, 10px);
    padding: var(--card-padding, 20px);
    margin: 0.75rem 0;
  }
  .addr-card h3 {
    margin: 0 0 0.65rem;
    font-size: 1.05rem;
    color: var(--card-text-color-main, #000);
    font-weight: 600;
  }
  .addr-row {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 8px 14px;
    font-size: 15px;
  }
  .addr-k { color: var(--card-text-color-tertiary, #767676); font-size: 13px; }
  .addr-v { color: var(--card-text-color-main, #000); word-break: break-all; }
  .addr-actions {
    display: flex;
    gap: 8px;
    margin-top: 1rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--card-separator-color, rgba(218,218,218,0.5));
    flex-wrap: wrap;
  }
  .addr-actions .btn {
    padding: 8px 14px;
    font-size: 13px;
    border-radius: 8px;
    border: 1px solid var(--card-separator-color, rgba(218,218,218,0.5));
    background: transparent;
    color: var(--card-text-color-main, #000);
    cursor: pointer;
    font-family: inherit;
  }
  .addr-actions .btn:hover {
    background: var(--card-background-selected, #eaeaea);
  }
  @media (max-width: 640px) {
    .addr-toolbar { flex-direction: column; align-items: stretch; }
    .addr-toolbar .btn, .addr-toolbar .btn-ghost { width: 100%; }
    .addr-row { grid-template-columns: 1fr; }
  }
  .addr-note { font-size: 13px; color: var(--card-text-color-secondary, #747474); margin-top: 1.25rem; }
</style>

<div class="addr-wrap">
  <p>用<strong>真实城市、真实路名</strong>或<strong>公开地标</strong>生成地址；门牌为示意号段。说明见 <a href="/p/address-generator/">文章</a>。</p>

  <div class="addr-tabs">
    <label style="align-self:center">国家</label>
    <select id="country"></select>
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

  <p class="addr-note">
    真实街道：城市与路名为真实地名，门牌随机，不保证精确到户。公开地标：官方公开地址。仅供测试演示。
  </p>
</div>
