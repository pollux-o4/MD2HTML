// md-show-me prototype controller
// Dimensions: 1 (Copy/Save), 2 (Notification), 3 (Layout), 4 (Strength), 5 (State)

const DIMENSIONS = {
  d1: ["A", "B", "C"],
  d2: ["A", "B", "C", "D"],
  d3: ["A", "B", "C"],
  d4: ["A", "B", "C"],
  d5: ["normal", "empty", "offline", "firstrun"],
};

const STATE = { d1: "A", d2: "A", d3: "A", d4: "A", d5: "normal" };

// ---- URL hash sync ----
function parseHash() {
  const h = location.hash.replace("#", "");
  // format: 1A2C3B4A5normal
  const m = h.match(/1([A-C])2([A-D])3([A-C])4([A-C])5(normal|empty|offline|firstrun)/);
  if (m) {
    STATE.d1 = m[1]; STATE.d2 = m[2]; STATE.d3 = m[3];
    STATE.d4 = m[4]; STATE.d5 = m[5];
  }
}
function writeHash() {
  location.hash = `1${STATE.d1}2${STATE.d2}3${STATE.d3}4${STATE.d4}5${STATE.d5}`;
}

// ---- Toggle UI ----
function renderToggles() {
  const root = document.getElementById("toggles");
  const groups = [
    { key: "d1", label: "1. Copy/Save", opts: { A: "단일", B: "분리", C: "분리+View" } },
    { key: "d2", label: "2. 알림", opts: { A: "Banner", B: "Chip", C: "Toast", D: "Silent" } },
    { key: "d3", label: "3. 레이아웃", opts: { A: "List", B: "Grid", C: "Accordion" } },
    { key: "d4", label: "4. Strength", opts: { A: "라벨", B: "점수+막대", C: "별★" } },
    { key: "d5", label: "5. State", opts: { normal: "정상", empty: "0매치", offline: "Offline", firstrun: "첫실행" } },
  ];

  root.innerHTML = groups.map(g => {
    const buttons = Object.entries(g.opts).map(([v, l]) =>
      `<button data-dim="${g.key}" data-val="${v}" class="${STATE[g.key] === v ? "active" : ""}">${v === STATE[g.key] ? `${v}: ${l}` : v}</button>`
    ).join("");
    return `<div class="toggle-group"><label>${g.label}</label><div class="btn-group">${buttons}</div></div>`;
  }).join("");

  root.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      STATE[btn.dataset.dim] = btn.dataset.val;
      writeHash();
      renderAll();
    });
  });
}

// ---- Strength display variants ----
function renderStrength(item) {
  if (STATE.d4 === "A") {
    return `<span class="strength-label ${item.strength}">${item.strength}</span>`;
  }
  if (STATE.d4 === "B") {
    const filled = Math.round(item.score * 5);
    const bar = "▰".repeat(filled) + "▱".repeat(5 - filled);
    return `<span class="strength-bar">${item.score.toFixed(2)} ${bar}</span>`;
  }
  // C: stars
  const stars = item.strength === "strong" ? "★★★" : item.strength === "medium" ? "★★" : "★";
  return `<span class="strength-stars">${stars}</span>`;
}

// ---- Action buttons variants ----
function renderActions() {
  if (STATE.d1 === "A") {
    return `<div class="actions"><button>Copy &amp; Save</button></div>`;
  }
  if (STATE.d1 === "B") {
    return `<div class="actions"><button>📋 Copy</button><button>💾 Save</button></div>`;
  }
  return `<div class="actions"><button>📋 Copy</button><button>💾 Save</button><button>👁 View Saved</button></div>`;
}

// ---- Card renderers ----
function renderCard(item) {
  const chip = (STATE.d2 === "B" && item.stale) ? `<span class="chip-stale">⚠ stale</span>` : "";
  return `
    <div class="card">
      ${chip}
      <div class="card-head">
        <span class="rank">#${item.rank}</span>
        <div class="card-title">${item.title}</div>
        ${renderStrength(item)}
      </div>
      <div class="card-path">${item.path}</div>
      <div class="excerpt">${item.excerpt}</div>
      ${renderActions()}
    </div>
  `;
}

function renderAccordionItem(item) {
  const chip = (STATE.d2 === "B" && item.stale) ? `<span class="chip-stale" style="position:static;margin-left:auto">⚠ stale</span>` : "";
  return `
    <details ${item.rank === 1 ? "open" : ""}>
      <summary>
        <span class="rank">#${item.rank}</span>
        <span>${item.title}</span>
        ${renderStrength(item)}
        ${chip}
      </summary>
      <div class="acc-body">
        <div class="card-path">${item.path}</div>
        <div class="excerpt">${item.excerpt}</div>
        ${renderActions()}
      </div>
    </details>
  `;
}

function renderResults() {
  if (STATE.d3 === "C") {
    return `<div class="accordion">${MOCK_RESULTS.map(renderAccordionItem).join("")}</div>`;
  }
  const cls = STATE.d3 === "B" ? "results grid-2" : "results";
  return `<div class="${cls}">${MOCK_RESULTS.map(renderCard).join("")}</div>`;
}

// ---- Notification variants ----
function renderBanner() {
  if (STATE.d2 !== "A") return "";
  const count = MOCK_STALE_FILES.length;
  return `<div class="banner-warn">⚠️ ${count}개 파일이 인덱싱 이후 변경됨 — 재스캔 권장</div>`;
}

function renderToast() {
  if (STATE.d2 !== "C") return "";
  return `<div class="toast">⚠️ ${MOCK_STALE_FILES.length}개 파일 변경됨 (재스캔 권장)</div>`;
}

function renderFooter() {
  if (STATE.d2 !== "D") return "";
  return `<div class="footer-meta">마지막 스캔: ${MOCK_SCAN_TIME} · ${MOCK_STALE_FILES.length}개 파일 변경됨 (silent)</div>`;
}

// ---- State variants (empty / offline / firstrun) ----
function renderEmptyState() {
  return `
    <div class="state-card">
      <div class="state-icon">🔍</div>
      <div class="state-title">${STATE_EMPTY.message}</div>
      <div class="state-detail">쿼리: "${STATE_EMPTY.query}"</div>
      <ul>${STATE_EMPTY.suggestions.map(s => `<li>${s}</li>`).join("")}</ul>
    </div>
  `;
}

function renderOfflineState() {
  return `
    <div class="banner-warn">⚠️ ${STATE_OFFLINE.reason} — ${STATE_OFFLINE.detail}</div>
    ${renderResults()}
  `;
}

function renderFirstRunState() {
  return `
    <div class="state-card">
      <div class="state-icon">🚀</div>
      <div class="state-title">${STATE_FIRSTRUN.message}</div>
      <div class="state-detail">${STATE_FIRSTRUN.detail}</div>
      <a class="cta">${STATE_FIRSTRUN.cta}</a>
    </div>
  `;
}

// ---- Main render ----
function renderQueryBar() {
  return `
    <div class="query-bar">
      <span class="q-icon">💭</span>
      <span class="q-text">${STATE.d5 === "empty" ? STATE_EMPTY.query : MOCK_QUERY}</span>
      <span class="q-meta">project: <code>${MOCK_PROJECT}</code> · top 5</span>
    </div>
  `;
}

function renderAll() {
  renderToggles();
  const main = document.getElementById("app");

  let body = "";
  if (STATE.d5 === "empty") {
    body = renderQueryBar() + renderEmptyState();
  } else if (STATE.d5 === "firstrun") {
    body = renderFirstRunState();
  } else if (STATE.d5 === "offline") {
    body = renderQueryBar() + renderOfflineState() + renderFooter();
  } else {
    body = renderQueryBar() + renderBanner() + renderResults() + renderFooter();
  }
  main.innerHTML = body;

  // Toast must mount outside main (re-render replaces)
  const existingToast = document.getElementById("toast-host");
  if (existingToast) existingToast.remove();
  if (STATE.d5 !== "firstrun" && STATE.d5 !== "empty") {
    const host = document.createElement("div");
    host.id = "toast-host";
    host.innerHTML = renderToast();
    document.body.appendChild(host);
  }
}

window.addEventListener("hashchange", () => { parseHash(); renderAll(); });
window.addEventListener("DOMContentLoaded", () => {
  parseHash();
  writeHash();
  renderAll();
});
