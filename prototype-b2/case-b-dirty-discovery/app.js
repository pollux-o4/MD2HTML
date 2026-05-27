// md-show-me · Prototype B2 Case B 컨트롤러
// 핵심 검증 포인트:
//  1) Agent loop (BM25 → embedding → LLM 자체 평가 → 큐레이션) 시뮬레이션
//  2) hard cut 없음 — 사용자가 슬라이더로 cut-off 조정
//  3) parent context 격리 — sub-agent 작업 로그는 console 에만 (main UI 에는 메타만)
//  4) Tarik 식 인터랙티브 HTML — copy-as-prompt, 카드 펼치기, 추가 탐색 버튼

(function () {
  const FILES = window.MOCK_FILES || [];
  const QUERY = window.MOCK_QUERY || "리뷰";
  const TRACE = window.AGENT_TRACE || [];

  // ---------- 1) BM25 1차 (점수 > 0 필터) ----------
  // sub-agent 영역. parent context 에는 결과 메타만 노출.
  console.groupCollapsed("%c[sub-agent] BM25 1차 시작", "color: #16a34a; font-weight: bold");
  const bm25Hits = FILES.filter(f => f.bm25 > 0).sort((a, b) => b.bm25 - a.bm25);
  console.log(`  BM25 hits: ${bm25Hits.length}/${FILES.length}`);
  console.log(`  top 3:`, bm25Hits.slice(0, 3).map(f => `${f.path} (${f.bm25.toFixed(2)})`));
  console.groupEnd();

  // ---------- 2) Embedding 2차 ----------
  console.groupCollapsed("%c[sub-agent] Embedding 2차 정렬", "color: #16a34a; font-weight: bold");
  // 후보 풀: BM25 hit 이거나 embedding 점수가 의미있는 노이즈도 일부 포함 (recall)
  let candidates = bm25Hits.slice();
  // 추가 recall: BM25=0 이지만 embedding 이 우연히 높은 케이스 (실제 시스템과 비슷하게)
  const extraRecall = FILES.filter(f => f.bm25 === 0 && f.emb > 0.20).slice(0, 8);
  candidates = candidates.concat(extraRecall);
  candidates.sort((a, b) => b.emb - a.emb);
  console.log(`  candidates after recall fan-out: ${candidates.length}`);
  console.log(`  emb score 분포:`,
    `min=${candidates[candidates.length-1].emb.toFixed(2)}`,
    `max=${candidates[0].emb.toFixed(2)}`,
    `median≈${candidates[Math.floor(candidates.length/2)].emb.toFixed(2)}`);
  console.groupEnd();

  // ---------- 3) LLM 자체 평가 (시뮬레이션) ----------
  console.groupCollapsed("%c[sub-agent] LLM 자체 평가", "color: #16a34a; font-weight: bold");
  const cluster = candidates.filter(c => c.emb >= 0.55);
  const llmVerdict = cluster.length >= 15
    ? "0.55 이상 군집이 충분히 큼. 추가 탐색 불필요."
    : "군집 작음. 사용자가 슬라이더로 cut-off 조정 권장.";
  console.log(`  cluster size (emb≥0.55): ${cluster.length}`);
  console.log(`  verdict: ${llmVerdict}`);
  console.groupEnd();

  console.log("%c[main agent ← sub-agent] 받은 것: 카드 메타 N개. 본문 raw 는 안 받음.", "color: #2563eb; font-weight: bold");

  // ---------- UI 렌더 ----------
  document.getElementById("qMeta").textContent =
    `— 138개 .md 중 BM25 ${bm25Hits.length}개 hit → embedding 으로 정렬 → 큐레이션 ${candidates.length}개 후보`;

  renderTrace(candidates.length, cluster.length, llmVerdict);
  renderDistChart(candidates);
  bindControls(candidates);
  applyCutoff(candidates, parseFloat(document.getElementById("cutoff").value));

  // ---------- trace 렌더 ----------
  function renderTrace(candCount, clusterCount, verdict) {
    const root = document.getElementById("traceBody");
    document.getElementById("traceHint").textContent =
      `5단계 — 모든 단계가 sub-agent 안에서 일어남 (main context 격리)`;
    root.innerHTML = TRACE.map((t, i) => {
      let result = t.result;
      if (i === 0) result = `BM25 > 0 인 후보 ${bm25Hits.length}개 발견.`;
      if (i === 1) result = `${candCount}개 후보 (recall fan-out 포함). 점수 0.02 ~ ${candidates[0].emb.toFixed(2)}`;
      if (i === 2) result = `cluster(emb≥0.55) = ${clusterCount}개. 판단: ${verdict}`;
      const iso = (i >= 0 && i <= 3) ? `<span class="iso-badge">parent 격리</span>` : '';
      return `
        <div class="trace-step ${i === 2 ? 'active' : ''} ${iso ? 'isolated' : ''}">
          <b>${t.step}. ${t.name}</b>${iso}
          <div class="detail">${t.detail}</div>
          <div class="result">→ ${result}</div>
        </div>
      `;
    }).join("");
  }

  // ---------- 분포 차트 (수동 dot plot) ----------
  function renderDistChart(candidates) {
    const chart = document.getElementById("distChart");
    chart.innerHTML = "";
    // 같은 x 근처에 점이 겹치지 않게 jitter
    candidates.forEach((c, i) => {
      const x = c.emb * 100; // %
      const y = 15 + ((i * 17) % 70); // jitter
      const dot = document.createElement("div");
      dot.className = "dist-dot" + (c.isReview ? " review" : "");
      dot.style.left = x + "%";
      dot.style.top = y + "%";
      dot.title = `${c.title || c.fileName} · emb=${c.emb.toFixed(2)} · ${c.path}`;
      dot.dataset.idx = i;
      chart.appendChild(dot);
    });
    // cut line
    const line = document.createElement("div");
    line.className = "cut-line";
    line.id = "cutLine";
    line.dataset.label = "cut-off 0.40";
    line.style.left = (parseFloat(document.getElementById("cutoff").value) * 100) + "%";
    chart.appendChild(line);
  }

  // ---------- controls ----------
  function bindControls(candidates) {
    const slider = document.getElementById("cutoff");
    const valEl = document.getElementById("cutoffVal");
    slider.addEventListener("input", () => {
      const v = parseFloat(slider.value);
      valEl.textContent = v.toFixed(2);
      const line = document.getElementById("cutLine");
      if (line) {
        line.style.left = (v * 100) + "%";
        line.dataset.label = `cut-off ${v.toFixed(2)}`;
      }
      applyCutoff(candidates, v);
    });

    document.getElementById("moreBtn").addEventListener("click", () => {
      simulateExtraExploration(candidates);
    });
  }

  // ---------- cut-off 적용 (hard cut 아님 — 사용자 통제) ----------
  function applyCutoff(candidates, cutoff) {
    const passed = candidates.filter(c => c.emb >= cutoff);
    document.getElementById("listCount").textContent =
      `— ${passed.length}/${candidates.length} 후보 (cut-off ${cutoff.toFixed(2)} 이상)`;

    // parent context delta 시뮬레이션 (카드 메타만 — 본문 X)
    const delta = passed.reduce((sum, c) =>
      sum + (c.title || c.fileName).length + c.path.length + 30, 0);
    document.getElementById("ctxDelta").textContent = `≈${delta}`;

    // dot 색상 업데이트
    document.querySelectorAll(".dist-dot").forEach((dot) => {
      const idx = parseInt(dot.dataset.idx, 10);
      const c = candidates[idx];
      if (!c) return;
      dot.classList.toggle("below", c.emb < cutoff);
    });

    renderCards(passed);
  }

  // ---------- 카드 렌더 ----------
  function renderCards(list) {
    const root = document.getElementById("cardList");
    if (list.length === 0) {
      root.innerHTML = `<div class="empty">cut-off 가 너무 높음 — 슬라이더를 왼쪽으로 옮기거나 "더 탐색해줘" 를 눌러봐.</div>`;
      return;
    }
    root.innerHTML = list.map((c) => {
      const titleClass = c.hasH1 ? "" : "no-h1";
      const displayTitle = c.hasH1 ? c.title : `(제목 없음) ${c.fileName}`;
      const snippet = (c.snippet || "본문 없음").replace(/</g, "&lt;");
      // sub-agent 가 봤던 raw 본문 (시뮬레이션) — parent context 에는 안 들어가던 것
      const fakeBody = snippet + "\n\n" + (c.isReview
        ? "(이하 sub-agent 가 본 raw 본문 — 펼치기 전엔 main context 에 노출 안 됨)\n• review 관련 키워드 다수 등장\n• 작성일 추정: 최근 6개월\n• 관련 문서 후보: 동일 폴더 내 다른 review 노트"
        : "(이하 sub-agent 메모리)\n• 쿼리와 직접 관련 낮음\n• embedding 만으로 cluster 외곽에 위치\n• 사용자가 필요하면 'copy-as-prompt' 로 follow-up");
      const reviewBadge = c.isReview
        ? `<span class="meta-pill review-yes">review 관련</span>`
        : `<span class="meta-pill review-no">관련 낮음</span>`;
      return `
        <div class="doc-card ${c._isNew ? 'added' : ''}" data-id="${c.id}">
          <div class="dc-head">
            <span class="dc-title ${titleClass}" title="${displayTitle}">${displayTitle}</span>
            <span class="dc-score">${c.emb.toFixed(2)}</span>
          </div>
          <div class="dc-path">${c.path}</div>
          <div class="dc-snippet">${snippet}</div>
          <div class="dc-extended">
            <div class="dc-meta-row">
              <span class="meta-pill">BM25 ${c.bm25.toFixed(2)}</span>
              <span class="meta-pill">emb ${c.emb.toFixed(3)}</span>
              ${reviewBadge}
            </div>
            <pre class="dc-body">${fakeBody.replace(/</g, "&lt;")}</pre>
          </div>
          <div class="dc-actions">
            <button data-act="expand"><span class="expand-label">펼치기</span></button>
            <button data-act="copy">copy-as-prompt</button>
          </div>
        </div>
      `;
    }).join("");

    root.querySelectorAll(".doc-card").forEach(card => {
      const id = parseInt(card.dataset.id, 10);
      const c = list.find(x => x.id === id);
      card.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const act = btn.dataset.act;
          if (act === "expand") {
            card.classList.toggle("expanded");
            const lbl = btn.querySelector(".expand-label");
            if (lbl) lbl.textContent = card.classList.contains("expanded") ? "접기" : "펼치기";
          }
          if (act === "copy") copyAsPrompt(c);
        });
      });
      card.addEventListener("click", () => card.classList.toggle("expanded"));
    });

    // _isNew 표시 1회용
    list.forEach(c => delete c._isNew);
  }

  // ---------- copy-as-prompt ----------
  function copyAsPrompt(c) {
    const prompt = `아래 문서를 더 자세히 분석해줘:

- 경로: ${c.path}
- 제목: ${c.title || '(없음 · 파일명: ' + c.fileName + ')'}
- 검색 쿼리: "${QUERY}"
- embedding 점수: ${c.emb.toFixed(3)}

발췌:
"""
${c.snippet}
"""

질문:
1. 이 문서가 "${QUERY}" 와 관련된 핵심 주장은?
2. 다른 review 관련 문서와 어떻게 묶일 수 있나?
3. 액션 아이템이 있다면?`;
    navigator.clipboard.writeText(prompt).then(() => {
      showToast(`copied — "${(c.title || c.fileName).slice(0, 28)}" prompt`);
    }).catch(() => {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = prompt; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); ta.remove();
      showToast(`copied (fallback)`);
    });
  }

  // ---------- "더 탐색해줘" — sub-agent 추가 탐색 시뮬레이션 ----------
  function simulateExtraExploration(candidates) {
    console.groupCollapsed("%c[sub-agent] 추가 탐색 시작 (동의어 확장)", "color: #ca8a04; font-weight: bold");
    // BM25 + emb 둘 다 낮았지만 review 관련 키워드 일부 매칭 가능한 노이즈에서 살림
    const pool = FILES.filter(f =>
      !candidates.find(c => c.id === f.id) &&
      (f.snippet.includes('회고') || f.snippet.includes('피드백') ||
       f.snippet.includes('점검') || f.snippet.includes('검토') ||
       f.emb > 0.15)
    );
    const more = pool.slice(0, 4).map(f => {
      // 동의어 매칭으로 emb 살짝 부스트 (sub-agent 의 LLM rerank 시뮬레이션)
      const boosted = { ...f, emb: Math.min(0.95, f.emb + 0.20), _isNew: true };
      return boosted;
    });
    if (more.length === 0) {
      console.log("  더 발견할 만한 후보 없음.");
      console.groupEnd();
      showToast("추가 탐색 — 새 후보 없음");
      return;
    }
    console.log(`  + ${more.length}개 추가 (동의어 부스트 적용)`);
    more.forEach(m => console.log(`    + ${m.path} (emb ${m.emb.toFixed(2)})`));
    console.groupEnd();

    // candidates 배열 자체에 추가하고 재정렬
    candidates.push(...more);
    candidates.sort((a, b) => b.emb - a.emb);
    renderDistChart(candidates);
    applyCutoff(candidates, parseFloat(document.getElementById("cutoff").value));
    showToast(`+ ${more.length}개 추가됨 (노란 카드 = 새로 들어옴)`);
  }

  // ---------- toast ----------
  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }
})();
