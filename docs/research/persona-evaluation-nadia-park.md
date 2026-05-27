---
id: persona-evaluation-nadia-park
type: persona-evaluation
persona: Nadia Park (Principal UX/UI Architect)
status: draft
updated: 2026-05-26
sources:
  - thariq-templates-analysis.md
  - ui-patterns-catalog.md
  - thariq-html-effectiveness-license.md
  - md-show-me-prd.md
  - md-show-me-milestone-1-discovery.md
  - md-show-me-milestone-5-refresh-rescan.md
---

# md-show-me UI/UX 평가 — Nadia Park 의 시선

## 1. 페르소나 인사

나는 박나디아다. Vega 시절부터 *spec 으로 표현 가능한 인터랙션은 코드로 짠 인터랙션보다 늘 안전했다* 는 신념을 가지고 살아왔고, Observable 에서 4년 동안 notebook UX 를 잡으면서 *"손이 짧은 LLM 이 그릴 수 있는 viz 의 표면은 무엇인가"* 라는 질문에 매달렸다. 지금은 md-show-me 의 Principal UX 로 들어와, 우리가 막 받아든 두 개의 카탈로그 — Tarik 의 큐레이션된 20개 (`docs/research/thariq-templates-analysis.md`) 와 외부에서 긁어모은 203개 (`docs/research/ui-patterns-catalog.md`) — 를 합쳐서 *우리 도구의 selector* 가 어떤 어휘로 말해야 하는지 정리한다.

원칙은 단순하다. *함부로 자르지 않는다*. 하지만 각 패턴이 *왜 살아남아야 하는지* 의 use case 매핑은 명시한다. 의문이 드는 패턴은 §6 에 따로 적시한다 — cut 은 사용자 영역이다.

## 2. 통합 인벤토리 — 본질 패턴 추출

두 카탈로그를 합치면 raw 로는 223개 (Tarik 20 + 외부 203) 지만, *중복/변형/본질* 의 시선으로 다시 묶으면 본질 패턴은 **34개** 로 수렴한다. 묶음의 기준은 *"LLM selector 의 어떤 행 하나로 들어가야 의미가 있는가"* 다.

3축 분류 — `데이터 형태 × 인터랙션 강도 × 시각화 표면`.

| # | 본질 패턴 | 데이터 형태 | 인터랙션 강도 | 시각화 표면 | 통합 출처 (Tarik / Catalog) | 도구 매핑 우선순위 |
|---|---|---|---|---|---|---|
| **N1** | Answer-with-citations 카드 | 단일 답변 + 5~10 source | hover (citation), click (chip) | 본문 + horizontal source strip + follow-up chips | (Tarik 직접 없음) / `ui-patterns-catalog.md` §E E1, E2, E3 | **P0 — default layout** |
| **N2** | Vault link graph | md ↔ md wikilink set | drag, zoom, search filter, group color | force-directed graph | (Tarik #04 module map 의 *vault* 변형) / §C C20 | **P0** |
| **N3** | Backlinks / outgoing panel | 단일 노트 + incoming/outgoing | click 점프, hover preview | 리스트 + context line | (Tarik 직접 없음) / §C C21, C22 | **P0** |
| **N4** | Gallery / card grid | 동질 item ≥5, cover/abstract 보유 | click, hover, sort | mosaic 카드 | (Tarik 직접 없음, #11 partial) / §D D3 | **P0** |
| **N5** | Table view (sort/filter/group) | 동질 row + properties (frontmatter) | sort, filter, group by | 행렬 표 | (Tarik 직접 없음) / §D D1, D7 | **P0** |
| **N6** | Three-approaches 비교 | 동일 문제 × N개 옵션 × 4~6 dim | (정적) | 코드/UI 병렬 + pro/con + 추천 콜아웃 | Tarik A1, A2 / §A A8 (스타일) | **P0** |
| **N7** | Diff (inline + sidebar) | before/after, file × hunk × line | hunk navigate, severity filter | diff + 마진 노트 + severity badge | Tarik B1, D4 / §E E7, E8 | **P1** (M4 review) |
| **N8** | Module / dependency graph | 노드 + 엣지 + entry points + hot path | 노드 click → 파일, layout switch | 박스+화살표 또는 force-directed | Tarik B2 / §B B14, B17 | **P0** |
| **N9** | Design system / token gallery | 토큰 set + 컴포넌트 예시 | swatch click copy, 상태 토글 | swatch grid + typo specimen + 컴포넌트 쇼케이스 | Tarik B3, B4 / §E E15 (shadcn 어휘) | **P2** |
| **N10** | Animation / parameter sandbox | 상태머신 + 타이밍 | easing dropdown, duration slider | 작동 컴포넌트 + 키프레임 timeline + copy CSS | Tarik C1 / §A A14, A12 | **P2** |
| **N11** | Drag-reorder / Kanban board | item set + status/order | drag, column collapse, copy-as-md | 4컬럼 카드 또는 sidebar list | Tarik C2, H1 / §D D2, D36, D9 | **P1** |
| **N12** | Slide deck (keyboard nav) | N장 슬라이드 (title + body + opt chart) | ←/→ key, page indicator | full-viewport stack | Tarik D1 / (외부 직접 없음) | **P1** |
| **N13** | Weekly status / KPI dashboard | shipped/in-progress/next + 메트릭 + poll | 링크 click, poll 선택 | KPI 카드 + bar chart + shipped 테이블 | Tarik D2 / §A A1, §D D19~D28 | **P1** |
| **N14** | Incident / event timeline | 메타 + timestamp 이벤트 + root cause + impact | 섹션 anchor, 접기/펴기 | 수직 timestamp 리스트 + YAML diff + impact 테이블 | Tarik D3 / §C C12 (mermaid), §D D24, D31 | **P0** |
| **N15** | PR writeup (TL;DR → tour → rollout) | summary + rationale + file tour + 테스트/rollout | section anchor, before/after expand | before/after 표 + 코드 + 단계 timeline | Tarik D4 / §E E11 | **P1** |
| **N16** | Extractable SVG figure sheet | 다이어그램 N개 (queue/timeline/fan-out) | "Download SVG" 버튼 | 인라인 SVG, 720×320, palette 6색 고정 | Tarik E1 / (외부 직접 없음) | **P2** |
| **N17** | Annotated flowchart | 노드(process/decision/terminal) + 엣지 + 단계 메타 | 노드 click → 상세 패널, healthy/failed 색 | 박스+화살표 + canary progressive | Tarik E2 / §C C5~C19 (mermaid), §B B17 | **P1** |
| **N18** | Feature explainer (단계 + 탭 코드 + FAQ) | TL;DR + collapsible steps + multi-file 코드 + FAQ | step expand, TOC nav, code 탭 | 텍스트 플로우 + 다중 코드 + FAQ | Tarik F1 / §C C29 (toggle), §C C2 (tabs) | **P1** |
| **N19** | Interactive concept explainer | 파라미터 + 비교 대상 + 실시간 메트릭 | slider, add/remove, reset | 동작 시뮬레이션 (SVG ring 등) + 비교 표 + glossary | Tarik F2 / §A A12, A13, A14 (distill/Karpathy/Tangle) | **P2** |
| **N20** | Implementation plan (slice + 위험) | 마일스톤 + slice + 데이터플로우 + risk 표 | section anchor, mockup expand | flow 다이어그램 + risk 표 + timeline | Tarik G1 / §D D6 (gantt), §D D11 | **P1** |
| **N21** | Feature flag / config editor | flag set + dependency + change count | toggle, dependency 경고, copy diff/full JSON | 그룹별 토글 + 경고 alert + JSON diff highlight | Tarik H2 / §A A9 (json schema), §D D40 | **P2** |
| **N22** | Prompt / template tuner | template + slot + sample 입력 N개 | live edit → live re-render, slot highlight | 2분할 (editor / preview) + token counter | Tarik H3 / §A A5, A6 | **P2** |
| **N23** | Spec-driven chart (Vega-Lite / ECharts) | tidy data + spec JSON | hover, brush, signal | grammar of graphics 차트 | (Tarik 직접 없음) / §B B11 (Vega-Lite), B3 (ECharts), B2 (Plot) | **P0** — LLM 안전한 spec 출력 |
| **N24** | Hierarchy (treemap / sunburst / tidy tree) | nested ≥3 depth | hover, zoom in | Observable hierarchy gallery 12종 | (Tarik 직접 없음) / §B Observable hierarchy | **P1** |
| **N25** | Heatmap (item × bin / cohort) | 2D matrix (시간 × 카테고리) | hover row/col | 격자 heatmap | (Tarik 직접 없음) / §D D16, D23, §C C18 (quadrant) | **P2** |
| **N26** | Sankey / funnel (flow + weight) | step + flow + weight | hover, click drill | sankey 또는 깔때기 | (Tarik 직접 없음) / §D D14, D15, §C C16, §D D18 | **P2** |
| **N27** | Calendar / month grid | event + date | click date, view month/week | 월 캘린더 | (Tarik 직접 없음) / §D D5, §D D32 | **P3** |
| **N28** | Scrollytelling (long-form + sticky viz) | long-form + step + 사이드 그래픽 | scroll-driven step trigger | text + 고정 viz, progress-driven anim | (Tarik 직접 없음) / §C C31, C32, §A A13 | **P2** |
| **N29** | Tabbed / collapsible container | content set | tab click, accordion | 탭 / accordion | (Tarik 직접 없음) / §C C2, C3, §D D37, D38 | **P0** (primitive) |
| **N30** | Steps / wizard (progress indicator) | step + state (complete/active/pending) | next/prev | numbered horizontal bar | (Tarik 직접 없음, F1 partial) / §D D41, D39 | **P1** |
| **N31** | Quadrant (2×2 priority) | item + 2D 좌표 | (정적) | 2×2 매트릭스 | (Tarik 직접 없음) / §C C18 | **P2** |
| **N32** | Radar / parallel coordinates (다축 비교) | item × ≥3 axis | hover, brush | radar / parallel | (Tarik 직접 없음) / §C C19, §B Observable parallel | **P2** |
| **N33** | Annotated text (anchor + comment) | text + span + comment | hover annotation | inline highlight + 마진 노트 | Tarik B1 (partial) / §D D44, §E E1 (citation 변형) | **P0** — M3/M4 의 wire 표면 |
| **N34** | Command palette (Cmd+K) | 액션 set | fuzzy search | overlay | (Tarik 직접 없음) / §D D13 | **P3** — 한 HTML 안 view 다수일 때 |

검증: 통합 *전* 223 → 통합 *후* 34 본질 패턴. 우선순위 분포는 §5 끝에 정리.

## 3. md-show-me 도메인 평가 — 패턴별 매핑

여기서부터는 *우리* 도구에 박힌 시선이다. PRD (`docs/md-show-me-prd.md`) §Solution 의 M0~M5 와 §User Stories 27~31 의 5개 Thariq 시나리오를 기준으로, 위 34 본질 패턴 각각에 (a) *우리 use case 시나리오*, (b) *LLM selection rule 후보*, (c) *차용 결정*, (d) *우선순위* 4-tuple 을 부여한다.

### 3-A. P0 — discovery 직후 즉시 보여줄 default 표면

**N1. Answer-with-citations 카드** — *우리 도구의 가장 강력한 default 후보*.
- 시나리오: 사용자가 `/show-me "retry policy 어떻게 했어?"` → discovery 가 5개 md 후보 → 답변 본문 + 5개 source 카드 + 2~3 follow-up chip 으로 surface.
- selection rule: `query_intent == "explainer"` AND `candidate_count == 1..7` AND `cross_link_count < N4 threshold`. 즉 *질문에 답이 있을 때* 의 기본.
- 차용: **재구현** (§E E1~E3 는 SaaS, 디자인 패턴만). shadcn `Card` + 본문 `prose` + horizontal `Chip` strip.
- 우선순위: **P0 — M2 의 default fallback layout 으로 못 박는 게 좋다**.

**N2. Vault link graph** — *우리 도구가 md vault 를 source 로 한다는 점에서 native 한 표면*.
- 시나리오: `/show-me "ADR 0001~0010 의 의존성"` → 10개 md 의 wikilink 그래프. Tarik #04 module map 은 *코드베이스* 가 source 였지만 우리는 *md vault* 가 source 라서 Obsidian/Logseq 의 link 그래프가 더 native (`ui-patterns-catalog.md` §C C20).
- selection rule: `discovery.sources[*].outgoing_links.length > 0` AND `len(sources) >= 3` AND (`query` 가 "관계", "의존성", "구조", "연결", "map" 류 포함 OR `cross_link_density > threshold`).
- 차용: **부분 차용** — Cytoscape.js (`§B B14`) 또는 vis-network (`§B B15`) 의 force layout + 우리가 link 추출 로직. Obsidian 자체는 재구현 (closed source).
- 우선순위: **P0** — md-show-me 가 *graph-native* 라는 정체성의 깃발.

**N3. Backlinks / outgoing panel** — *N2 가 macro 라면 이건 micro*.
- 시나리오: discovery 가 1개 md 만 선택했을 때, 그 md 의 "이 문서를 참조하는 곳" / "이 문서가 참조하는 곳" 리스트. M1 manifest 의 `block_ids`, `headings` 와 직접 호환.
- selection rule: `len(sources) == 1` AND `total_link_count > 0`. *단일 노트 deep-dive* 신호.
- 차용: **재구현** — closed source 패턴, 디자인만 차용. shadcn `Card` + `ScrollArea`.
- 우선순위: **P0**.

**N4. Gallery / card grid** — *N1 이 "한 답변" 이면 N4 는 "여러 후보"*.
- 시나리오: `/show-me "최근 ADR 모두"` → 5~10개 md 를 카드 모자이크 (제목 + abstract + role badge + updated date). M1 manifest 의 `original`/`excerpt` 필드와 직결.
- selection rule: `len(sources) >= 3` AND `query_intent == "enumerate"` AND `cross_link_density < N2 threshold` (즉 link 없이 그냥 *모음* 일 때).
- 차용: **재구현** — Notion/Airtable 패턴, 디자인만.
- 우선순위: **P0**.

**N5. Table view** — *frontmatter 표준화된 set 의 default*.
- 시나리오: `/show-me "trusted folder 의 모든 ADR status"` → ADR 들의 frontmatter 를 표로. sort by `updated`, filter by `status`.
- selection rule: `all(sources have frontmatter)` AND `len(sources) >= 5` AND `query_intent == "compare meta"`.
- 차용: **재구현** — shadcn `DataTable`.
- 우선순위: **P0**.

**N6. Three-approaches 비교** — *대안 set 의 표준 reference*.
- 시나리오: 사용자 쿼리가 "X 와 Y 중에", "옵션 비교" 류 → 5개 md 가 N개 옵션의 spec 이거나 LLM 이 답변 안에서 옵션을 추출. Tarik A1 의 정적 4-dim 비교 표.
- selection rule: `query` 가 "vs", "비교", "options", "trade-off", "approaches" 류 포함 OR LLM 이 추출한 답변이 2~5개 alternative 일 때.
- 차용: **재구현** (Tarik §4 권고와 일치).
- 우선순위: **P0**.

**N8. Module / dependency graph** — *코드 구조 시나리오용*.
- 시나리오: `/show-me "이 코드베이스 구조"` 가 md (architecture.md, README) 를 source 로 골랐을 때, md 안의 코드 reference 를 박스+화살표로. Tarik B2 의 *md-source* 적용.
- selection rule: discovery 가 architecture/structure 키워드 hit + sources 가 코드 reference 다수 포함.
- 차용: **부분 차용** — Mermaid C5 (`flowchart`) 가 가장 가볍고, 복잡하면 React Flow §B B17, 더 복잡하면 Cytoscape §B B14.
- 우선순위: **P0** (PRD User Story 28 "PR / code review surfaces").

**N14. Incident / event timeline** — *시계열 default*.
- 시나리오: ADR 결정 임팩트, post-mortem, "최근 한 달 변화", changelog. Tarik D3 가 직접 매핑.
- selection rule: source 중 ≥1 개에 timestamp 가 dense (≥5 events) OR query 가 "history", "timeline", "post-mortem", "incident", "changelog" 류.
- 차용: **재구현** (정적 구조 + CSS timeline). Mermaid C12 도 fallback.
- 우선순위: **P0**.

**N23. Spec-driven chart (Vega-Lite / ECharts)** — *나의 신념과 가장 가까운 패턴*.
- 시나리오: 어떤 차트가 필요하든 LLM 이 *JSON spec* 만 출력 → 라이브러리가 렌더. "auth API 의 latency p50/p95" 같은 통계 viz.
- selection rule: source 에 tidy data (table or csv-like) 가 있을 때 → 다른 어떤 차트 패턴보다 *spec 생성이 안전*. LLM 이 coding 으로 차트 짜다가 버그내는 것보다 spec 한 줄 출력하고 라이브러리 부르는 게 압도적으로 안전.
- 차용: **spec-라이브러리 활용** (재구현 아님). Vega-Lite 가 spec 표면적이 가장 작아 LLM-친화. ECharts 가 chart 종류 가장 많음. 둘 다 후보.
- 우선순위: **P0** — 모든 차트 시나리오의 *underlying 표면* 으로 못 박을 것.

**N29. Tabbed / collapsible container** — *primitive*.
- 시나리오: 한 HTML 에 여러 view (예: timeline + table + graph) 를 같이 보여줄 때. 또는 긴 답변의 디테일 숨김.
- selection rule: *항상 갖고 있는 primitive*. selector 결정은 아니고 layout primitive.
- 차용: **부분 차용** — shadcn `Tabs`, `Accordion`.
- 우선순위: **P0** (primitive).

**N33. Annotated text (anchor + comment)** — *M3/M4 의 wire 표면*.
- 시나리오: PRD User Story 19~22 (선택 텍스트 → anchor → 코멘트). 우리가 *어차피 만들어야 하는 표면* — discovery 답변 어디든 inline 코멘트 가능해야 한다.
- selection rule: *항상 활성화*. 모든 M2 surface 의 underlying 인터랙션 layer.
- 차용: **재구현** — §D D44 (Retool annotated text) 의 디자인만. 자체 anchor 추출 로직 필요.
- 우선순위: **P0** — M3 의 핵심 기능.

### 3-B. P1 — v1 에 같이 가야 할 패턴

**N7. Diff (inline + sidebar)**
- 시나리오: M4 apply-review 가 변경 만들 때 *human-facing 미리보기* (PRD 는 M4 가 wire 는 MD 라 했지만, 사용자가 review 결과를 *볼* 때는 HTML diff 가 좋다).
- selection rule: query 가 "PR", "diff", "변경", "review" + source 가 git ref 가능.
- 차용: **부분 차용** — Tarik B1 의 diff CSS. 또는 §E E7, E8 의 Cursor 패턴 디자인.
- 우선순위: **P1**.

**N11. Drag-reorder / Kanban board**
- 시나리오: `/show-me "discovery 후보 5개 우선순위로"` → 사용자가 drag 로 reorder → copy-as-markdown 으로 다음 agent 에. PRD User Story 25 (generalized copy-as-prompt) 와 직결.
- selection rule: query 가 "triage", "우선순위", "정렬", "kanban" + sources 가 동질 set.
- 차용: **부분 차용 또는 fork** — Tarik H1 의 DnD 코드는 검증값 높음 (Tarik §4 와 일치).
- 우선순위: **P1**.

**N12. Slide deck**
- 시나리오: `/show-me "이 기능 5장 슬라이드로"` — 짧은 보고용. 100줄 키보드 nav 패턴.
- selection rule: query 가 "슬라이드", "deck", "발표", "presentation".
- 차용: **부분 차용** — Tarik D1 의 keyboard listener + CSS transform.
- 우선순위: **P1**.

**N13. Weekly status / KPI dashboard**
- 시나리오: `/show-me "이번 주 status"` → shipped/in-progress/next 카드 + 메트릭 + 막대 차트. PRD User Story 30 ("research reports rendered with embedded tables, charts").
- selection rule: query 가 "status", "weekly", "report", "summary" + sources 가 시계열 metric 포함.
- 차용: **재구현** (구조만 참고). Chart 부분은 N23 (Vega-Lite/ECharts).
- 우선순위: **P1**.

**N15. PR writeup**
- 시나리오: `/show-me "이 PR 어떻게 설명할까"` — TL;DR + rationale + file tour.
- selection rule: query 가 "PR", "writeup", "리뷰어용" + source 가 PR description 포함.
- 차용: **재구현** (Tarik §4 권고와 일치).
- 우선순위: **P1**.

**N17. Annotated flowchart**
- 시나리오: CI 파이프라인, deploy flow, agent chain. Tarik E2 의 *md-source* 적용.
- selection rule: source 에 step + decision 구조 있을 때 + query 가 "flow", "workflow", "파이프라인".
- 차용: **부분 차용** — 단순하면 Mermaid C5 (flowchart), 복잡하면 React Flow §B B17.
- 우선순위: **P1**.

**N18. Feature explainer (단계 + 탭 코드 + FAQ)**
- 시나리오: 신규 멤버 온보딩 문서, "이 기능 어떻게 작동". PRD User Story 27 ("scannable HTML with diagrams and decision trees").
- selection rule: source 가 explainer/onboarding/tutorial role + 코드 sample 포함.
- 차용: **재구현** + N29 (tabs) primitive.
- 우선순위: **P1**.

**N20. Implementation plan**
- 시나리오: `/show-me "M2 구현 계획 + 위험"` — slice + dataflow + risk 표. PRD M2 자체 회고에 유용.
- selection rule: query 가 "plan", "implementation", "roadmap" + source 가 milestone 구조.
- 차용: **재구현** (구조만).
- 우선순위: **P1**.

**N24. Hierarchy (treemap / sunburst / tidy tree)**
- 시나리오: vault 폴더 구조 한눈에, 또는 ADR 카테고리 비율. Observable hierarchy gallery 12종.
- selection rule: source 가 nested ≥3 depth + query 가 "structure", "전체 그림", "overview".
- 차용: **spec-라이브러리 활용** — Observable Plot 의 hierarchy spec, 또는 D3 (BSD-3).
- 우선순위: **P1**.

**N30. Steps / wizard**
- 시나리오: "이렇게 하면 됩니다 1→2→3" 같은 setup/tutorial.
- selection rule: source 가 numbered procedure 있을 때.
- 차용: **재구현** — shadcn 컴포넌트 조합으로 100줄.
- 우선순위: **P1**.

### 3-C. P2 — v2 또는 옵션

**N9. Design system / token gallery** — 우리 도구가 design system 도구가 아니므로 P2. 단 *내부 디자인 토큰 자체 docs* 시나리오에서 유용 (`/show-me "우리 도구 디자인 토큰"`).

**N10. Animation / parameter sandbox** — md vault 에서 *애니메이션 디자인* 쿼리가 드물 것. 단 PRD User Story 29 ("design-token prototypes I can tweak with sliders and export") 와 결합되면 N9+N10 묶음으로 P1 후보.

**N16. Extractable SVG figure sheet** — *blog 용 figure 다운로드* 시나리오. 도메인 fit 약함, P2.

**N19. Interactive concept explainer** — distill.pub/Karpathy 류. ML/알고리즘 concept 시나리오에 강함, 일반 md vault 에는 P2. 단 "이 알고리즘 이해" 류 쿼리면 P1 으로 승격.

**N21. Feature flag / config editor** — `.show-me.toml` 편집 시나리오에서 유용 (`/show-me-setting` 의 GUI 변형). PRD §9 "split configuration" 과 결합 가능.

**N22. Prompt / template tuner** — PRD M3 의 *generalized copy-as-prompt* 와 가까운 패턴. 우리 도구가 prompt 자체 편집기로 진화한다면 P1 승격.

**N25. Heatmap** — "ADR status × month" 류 메타 분석. 데이터 dense 할 때만.

**N26. Sankey / funnel** — "discovery → review → 채택" 의 conversion. 우리 도구 자체의 *self-funnel* 분석 시 P1 후보.

**N28. Scrollytelling** — long-form ADR 또는 "왜 이 결정을 했는지" narrative. 일반 시나리오에는 P2.

**N31. Quadrant** — 2×2 priority matrix. 가끔 유용.

**N32. Radar / parallel** — 다축 비교. N6 (3-approaches) 의 차트 변형.

### 3-D. P3 — 옵션 / 도메인 fit 약함

**N27. Calendar** — md vault 에 날짜 dense 시나리오 드묾.

**N34. Command palette (Cmd+K)** — *한 HTML 안에 여러 view 가 있을 때만* 의미. M3 의 view-switcher 가 명확해지면 P1 승격 후보. 지금은 P3.

## 4. 패턴 공백 + 새 제안

위 34 패턴은 *외부* 카탈로그의 본질 추출이다. 그런데 우리 도구의 *고유 use case* 에는 외부 카탈로그에서 안 풀리는 시나리오가 몇 개 있다. *vault 가 source 라는 점*, *discovery 가 LLM 결과 to 사람 사이에 끼어있다는 점*, *M5 lazy stale detection 결과를 보여줘야 한다는 점* — 이 셋은 외부에 reference 가 거의 없다.

### 새 제안 7개 패턴

**N+1. Discovery transparency panel ("이렇게 찾았어요")**
- 시나리오: 답변 surface 어딘가에 "BM25 hit: 12 → MiniLM filter: 5 → 채택" 같은 3-tier discovery 의 *왜* 를 expand 로 보여주기. Perplexity Pro Search (§E E4) 의 *md-show-me 변형*.
- 데이터: M1 manifest 의 `matched_fields`, `match_strength`, `reason` 필드와 직결.
- selection rule: *항상 갖고 있는 underlying meta layer*. 사용자가 click 으로만 펼침.
- 우선순위: **P0** — discovery 가 우리 도구 차별화의 핵심이므로 *투명성* 자체가 default 요소.

**N+2. Manifest diff viewer (rescan 결과)**
- 시나리오: `/show-me rescan` 의 결과 (`docs/md-show-me-milestone-5-refresh-rescan.md` §Rescan) — `added_sources`, `removed_sources`, `changed_sources` 3-section.
- 데이터: 이전 manifest vs 새 manifest.
- 차용: Tarik B1 (PR diff) 의 *manifest-level* 변형 + N7 디자인.
- 우선순위: **P1** — M5 의 직접 표면.

**N+3. Unknown markdowns triage panel**
- 시나리오: PRD §9 `unknown_markdowns` 필드 → "trusted folder 에 새로 발견된 N개 파일, 분류 안 됨" 카드 + accept/reject/role assign.
- 데이터: M5 lazy stale check 결과의 unknown set.
- 차용: §D D9 Linear Triage queue 패턴.
- 우선순위: **P1** — M5 가 lazy 인 만큼 *매 invocation 마다* 사용자 눈에 띌 수 있어야 함.

**N+4. Generalized copy-as-prompt overlay**
- 시나리오: PRD §7 의 *generalized copy-as-prompt* — 어떤 인터랙션이든 (slider, drag, toggle) `[Copy]` / `[Save]` 가 떠야 함. 단일 컴포넌트가 아니라 *overlay primitive*.
- 데이터: 현재 HTML state → prompt-shaped Markdown.
- 차용: Tarik H1 의 "Copy as markdown" + H2 의 "Copy diff/JSON" 패턴의 일반화. 외부 카탈로그에는 직접 매칭 없음.
- 우선순위: **P0** — M3 의 정의 자체.

**N+5. Source-of-truth back-link badge**
- 시나리오: PRD User Story 18 ("HTML 이 underlying Markdown 으로 link back"). 모든 surface 의 모든 source-derived 블록에 "→ ADR-0003.md#decision" 같은 *클릭 가능한 source 배지*.
- 데이터: M1 manifest 의 `path` + `block_ids` + `major_headings`.
- 차용: Perplexity citation (§E E2) 의 변형, 단 *우리는 file path 가 인용 단위*.
- 우선순위: **P0** — PRD 가 못 박은 "Markdown 이 source of truth" 약속의 UI 구현.

**N+6. Lazy stale detection toast / banner**
- 시나리오: `/show-me` 매 invocation 시 lazy stale check (M5) 결과를 *눈에 띄지 않게* 상단 banner. "3 files changed since last run · 1 new unknown" + click → N+2 패널.
- 데이터: M5 의 added/removed/changed/unknown.
- 차용: shadcn `Alert` + click-through to N+2/N+3.
- 우선순위: **P1**.

**N+7. Query refinement chip rail**
- 시나리오: discovery 가 5개 후보로 좁혔는데 사용자가 더 좁히고 싶을 때 — frontmatter property 별 chip (예: `role: handoff` chip click → 후보 2개로 좁힘). PRD User Story 5 (role 기반 분류) + §D D29 (Tags) + §D D40 (Filter) 의 *discovery-시간* 적용.
- 데이터: M1 manifest 의 모든 source `frontmatter`, `role`, `matched_fields` aggregation.
- 차용: **재구현** — chip primitive (§D D29).
- 우선순위: **P1**.

## 5. M3 selector 룰북 초안

LLM 이 *discovery 결과 + 사용자 query* 를 보고 어떤 surface 를 생성할지 고르는 결정 트리. *가장 안전한 default 는 N1 (Answer-with-citations 카드) 다.* 다른 모든 결정은 N1 에서 *upgrade* 한다는 멘탈 모델.

### 5-1. 결정 트리 (text form)

```
input:
  query                      = 사용자 자연어 쿼리
  sources                    = M1 manifest sources[]  (1~5개)
  query_intent               = LLM 1-shot 분류 결과
  cross_link_density         = sources 간 wikilink 수 / sources 수
  has_timeseries             = sources 중 timestamp dense 한 것 있나
  has_tidy_data              = sources 중 csv/table 있나
  has_diff                   = sources 가 git ref / before-after 형태
  has_numbered_procedure     = sources 가 step/wizard 구조
  alternatives_extracted     = LLM 추출 답변이 2~5 옵션인가
  has_nested_hierarchy       = sources 가 ≥3 depth nested 구조
  manifest_diff_present      = rescan 이라 added/removed/changed 있나

step 1: meta layers (항상)
  always add: N+1 (discovery transparency, collapsed)
  always add: N+5 (source-of-truth back-link badges)
  always add: N33 (annotated text underlying)
  always add: N+4 (copy-as-prompt overlay)
  if M5 stale detected: add N+6 (banner) → optional N+2, N+3 panels

step 2: primary surface 결정
  if manifest_diff_present:
    primary = N+2 (manifest diff viewer)

  elif query matches "vs|비교|trade-off|approaches" OR alternatives_extracted:
    primary = N6 (3-approaches)
    if numeric multi-axis: add N32 (radar) inline

  elif query matches "관계|의존성|구조|연결|map|graph" AND cross_link_density > 1.0 AND len(sources) >= 3:
    primary = N2 (vault link graph)
    optional companion: N3 (per-node backlinks panel on click)

  elif query matches "structure|아키텍처|architecture" AND sources have code reference:
    primary = N8 (module/dependency graph)
    fallback complexity: Mermaid (C5) → React Flow (B17) → Cytoscape (B14)

  elif query matches "history|timeline|incident|post-mortem|changelog" OR (has_timeseries AND len(sources) >= 1):
    primary = N14 (incident/event timeline)

  elif query matches "PR|diff|변경|review" OR has_diff:
    primary = N7 (diff inline+sidebar)
    if "writeup" 톤: combine with N15

  elif query matches "이번 주|status|weekly|summary":
    primary = N13 (weekly status)
    KPI 부분은 N23 (Vega-Lite spec)

  elif query matches "implementation|plan|roadmap|slice":
    primary = N20 (implementation plan)
    if 의존성 있는 일정: add N24 fallback Mermaid C9 gantt

  elif query matches "어떻게 작동|onboarding|tutorial|explainer":
    primary = N18 (feature explainer)
    if 알고리즘/시뮬레이션 어휘: add N19 (concept explainer)

  elif query matches "슬라이드|deck|발표|presentation":
    primary = N12 (slide deck)

  elif query matches "triage|우선순위|정렬|kanban":
    primary = N11 (Kanban / drag-reorder)

  elif query matches "flow|workflow|파이프라인" OR has step+decision structure:
    primary = N17 (annotated flowchart)
    Mermaid C5 default; upgrade to B17 if interactive

  elif query matches "structure|overview|전체 그림" AND has_nested_hierarchy:
    primary = N24 (treemap/sunburst/tidy tree)
    spec source = Observable Plot

  elif has_tidy_data AND query_intent in {"explain a metric", "show distribution"}:
    primary = N23 (Vega-Lite / ECharts spec)

  elif len(sources) == 1:
    primary = N3 (backlinks/outgoing single-doc deep-dive)
    optional: N18 if explainer-shaped

  elif len(sources) >= 3 AND all have frontmatter AND query_intent == "compare meta":
    primary = N5 (table view)

  elif len(sources) >= 3 AND query_intent == "enumerate":
    primary = N4 (gallery / card grid)

  else:
    # 가장 안전한 default
    primary = N1 (Answer-with-citations 카드)

step 3: layout primitives (선택적)
  if multiple companion surfaces needed: wrap in N29 (Tabs/Accordion)
  if many actions: N34 (Cmd+K palette) — P3, default off

step 4: re-query loop
  always add: follow-up chips (§E E3 패턴, N1 내장)
  if discovery 가 너무 좁혔다 싶으면: add N+7 (query refinement chip rail)
```

### 5-2. 가장 안전한 default — *N1 + N+1 + N+5 + N33 + N+4 묶음*

내가 한 줄로 못 박는다. **N1 (Answer-with-citations 카드) + N+1 (transparency) + N+5 (back-link 배지) + N33 (annotated text underlying) + N+4 (copy-as-prompt overlay)** — 이 5개 묶음이 *모든 M2 출력의 baseline* 이다. 다른 모든 결정은 이 위에 *primary surface* 한 개를 더 얹는 형태로 정의한다.

이유: (a) N1 은 쿼리 형태 무관 work, (b) N+1 은 우리 차별점 (discovery) 의 투명성, (c) N+5 는 PRD 의 "MD source of truth" 약속의 UI 구현, (d) N33 은 M3 의 코멘트 anchor 가 *어디서든* 가능해야 한다는 제약, (e) N+4 는 M3 의 generalized copy-as-prompt 의 정의 그 자체.

### 5-3. 우선순위 분포 최종

- **P0 (즉시, M2 v1)**: N1, N2, N3, N4, N5, N6, N8, N14, N23, N29, N33, N+1, N+4, N+5 → **14개**
- **P1 (v1 후속)**: N7, N11, N12, N13, N15, N17, N18, N20, N24, N30, N+2, N+3, N+6, N+7 → **14개**
- **P2 (v2)**: N9, N10, N16, N19, N21, N22, N25, N26, N28, N31, N32 → **11개**
- **P3 (옵션)**: N27, N34 → **2개**

총 41개 (외부 34 + 신규 7). P0 14 / P1 14 / P2 11 / P3 2.

## 6. 의문 있는 패턴 리스트 (cut 하지 않음, 사용자 결정용)

다음 패턴들은 다른 패턴으로 *대체 가능해 보인다*. 의문은 적시하되 cut 은 사용자 영역이다.

| 패턴 | 의문 — 무엇으로 대체 가능해 보이는가 | 살릴 근거 (있다면) |
|---|---|---|
| **N16** (Extractable SVG figure sheet) | N23 (Vega-Lite spec) + Mermaid C5~C19 로 figure 거의 대체 가능. md vault 시나리오에서 *blog용 다운로드 SVG* 가 얼마나 자주 일어나나? | "고정 palette + 720×320 의 일관된 figure sheet" 는 spec 기반에서 나오기 어려운 디자인 통일성을 준다 — *디자인 통일성을 따로 챙기는 시나리오* 가 있으면 살림. |
| **N19** (Interactive concept explainer) | N23 + N10 + N29 조합으로 distill.pub 류 90% 재현 가능. Karpathy/distill 톤은 ML 콘셉트에 특화. | md vault 가 *알고리즘 문서* 도 가지는 도구라면 살림. 그렇지 않은 일반 dev 팀이면 의문. |
| **N22** (Prompt tuner) | N+4 (generalized copy-as-prompt) + N29 (split tabs) + N33 (annotated text) 로 prompt 편집 UX 대체 가능. | *우리 도구 자체가 prompt 편집 도구로 진화한다면* (즉 LLM API 키 받아서 live re-render 한다면) N22 살릴 가치 큼. 지금 PRD §Out of Scope 와 충돌. |
| **N25** (Heatmap) | N23 (Vega-Lite 의 heatmap spec) 로 100% 대체. 별도 패턴으로 selector 에 column 추가할 이유가 약함. | "시간 × 카테고리" 가 *high-frequency* use case 면 selector hint 로 따로 두는 게 LLM 한테 친절. |
| **N26** (Sankey / funnel) | N23 (Vega-Lite sankey) + Mermaid C16 으로 대체. | "사용자 여정/conversion" 이 우리 도구의 *self-meta* 분석에 자주 등장한다면 살림. |
| **N27** (Calendar) | N24 (timeline 변형) + N23 으로 대체. md vault 시나리오에서 *날짜 dense* 가 얼마나? | 일정 중심 vault (예: 일기, OKR) 면 살림. |
| **N31** (Quadrant) | N32 (radar 2-axis 변형) 또는 N23 으로 대체. | "2×2 priority matrix" 가 빈번한 *팀 의사결정* 시나리오면 살림. |
| **N32** (Radar / parallel) | 다축 비교가 N6 (3-approaches) + N23 (parallel coordinates spec) 으로 대체 가능. | 다변량 비교가 *디자인 시스템 평가* 등 specific 도메인이면 살림. |
| **N34** (Cmd+K) | N29 (Tabs) 로 view 전환 거의 대체. *우리 도구의 view 수가 적으면* Cmd+K 는 over-engineering. | 한 HTML 에 view 수 ≥ 5 가 되면 살림. |
| **B7** (Highcharts) 카탈로그 라이브러리 의문 | non-commercial 제한 라이선스 + N23 (Vega-Lite/ECharts) 가 *free + Apache 2.0* 으로 동일 표면 커버. 굳이 우리 도구가 Highcharts 옵션을 갖고 갈 이유? | 엔터프라이즈 도입을 노린다면 살림. 지금 PRD 톤에서는 의문. |
| **B16** (Sigma.js 100k+ 노드) | md vault 가 100k 노드까지 갈 일이 거의 없음. N2 (Cytoscape/vis-network) 로 충분. | *vault scale 이 ≥ 10k 파일* 인 사용자 (예: research lab) 있으면 살림. |
| **B19~B22** (지도 라이브러리 묶음) | md vault 가 지리 데이터 source 일 일이 드묾. | iNaturalist 류 *지리 vault* 사용자 있으면 살림. 일반 dev 팀에는 의문. |
| **C27, C28** (Excalidraw, tldraw 캔버스) | 우리 도구가 *손그림 톤* 을 채택할 가능성 낮음. PRD 톤은 *professional* 쪽. | 디자인 회의록/스케치 vault 면 살림. |
| **A5, A6, A7, A11** (ChatGPT Canvas / v0 / tldraw Make Real) | 우리 도구가 *서버리스 단일 HTML* 제약이라 *편집기 류* 패턴 직접 적용 어려움. PRD §Solution M2 "opens without a server" 와 충돌. | 결과 *스타일* (Tailwind + shadcn) 만 차용 — A7 (v0) 의 컴포넌트 패턴은 살릴 가치. |
| **E13, E14** (ChatGPT/LangChain Canvas split) | 동일 — 우리는 *one-shot HTML* 이므로 split-view + live regen 패턴 직접 적용 어려움. | 부분 차용 (split layout 자체) 만 살림. |

**의문 적시 후 종합 평가**: 외부 카탈로그의 *시각화 라이브러리* 부분 (`§B`) 은 spec-driven (N23) 으로 거의 다 흡수 가능해서, selector 룰북에는 *카테고리 단위* 가 아니라 *spec 패턴 단위* 로 들어가는 게 LLM 한테 친절하다. 라이브러리는 *구현 백엔드* 로 남기고 selector 는 *데이터 형태 × 시각화 표면* 만 본다 — 이게 내 spec-first 신념의 우리 도구 적용이다.

## 7. 종합 제안 — 사용자가 다음에 결정해야 할 질문

여기까지 패턴 카탈로그를 *우리 도구* 의 시선으로 정렬했다. 이제 *사용자 (PM/리드)* 가 답해야 다음 단계가 풀린다.

1. **Q1 — Vault graph (N2) 를 P0 로 못 박을 것인가?** 나는 우리 도구의 정체성 깃발로 P0 추천. 단, *대부분 vault 가 link 가 sparse* 하면 N1+N4 default 가 더 자주 hit. P0 추천 유지하려면 vault 의 *평균 link density* 통계가 필요.

2. **Q2 — N+4 (generalized copy-as-prompt overlay) 의 UI 표현은 무엇인가?** PRD §7 은 "any HTML interaction" 이라 했는데, 실제 UI 는 (a) 우측 floating action button, (b) hover 시 마진에 나타나는 ghost button, (c) 모든 인터랙티브 위젯 우상단 고정 — 3안 중 무엇? 나는 (b) ghost button 추천 (Tangle (§A A14) 톤의 *눈에 안 띄지만 항상 있음*).

3. **Q3 — N23 (spec-driven chart) 의 spec 라이브러리는 Vega-Lite / ECharts / Plot 중?** 나는 *Vega-Lite* 강추 — spec 표면적 가장 작아 LLM 생성 안전. 단 ECharts 가 차트 종류 가장 많고 한국어 docs 도 강함. 결정 필요.

4. **Q4 — §6 의 의문 패턴들 중 cut 할 것은?** 특히 N16, N19, N22, N27, N31, N32, B7, B16, B19~B22, C27, C28, A5/A6/A7/A11, E13, E14 — 사용자 결정 영역. 나는 *cut 하지 않고 selector 의 P2/P3 에 두는 것* 권장 (다양성 보존).

5. **Q5 — M3 "여러 view 한 HTML 에" 시나리오를 v1 에 넣을 것인가?** 만약 yes → N29 (Tabs) + N34 (Cmd+K) 모두 P1 승격. 만약 no → 한 HTML = 한 primary surface 로 단순화. PRD 가 명시 안 함 — 결정 필요.

6. **Q6 — Tarik 의 H1 triage 보드 (N11) 를 fork 할 것인가, 부분 차용할 것인가?** Tarik §4 는 fork 후보로 적시. 나는 *부분 차용* 추천 — DnD 코드만 떼서 우리 디자인 시스템에 맞춤. Apache 2.0 attribution 1줄로 의무 완료 (라이선스 문서 §2.b 와 일치).

7. **Q7 — discovery 의 "왜 이 5개" (N+1) 를 default expanded 로 보일 것인가, collapsed 로 시작할 것인가?** 나는 *collapsed* 추천 — 신뢰가 쌓이면 사용자가 안 펼침. 단 *3-tier discovery 가 처음 도입되는 v1* 에서는 *처음 N회 default expanded* 도 고려.

8. **Q8 — N+5 (back-link 배지) 의 입자도 — 문서 단위 vs 헤딩 단위 vs 블록 단위?** M1 manifest 가 `block_ids` 갖고 있으니 *블록 단위* 가능. 단 모든 블록에 배지 달면 noisy. 나는 *기본 헤딩 단위, hover 시 블록 단위* 추천.

---

내가 *함부로 자르지 않는다* 한 약속은 §6 의 의문 적시로 지켰다. 다음 결정은 사용자 영역이다. 결정만 나오면 selector 룰북 §5 를 *코드로 옮길 수 있는 매트릭스 형태* 로 다시 정리하겠다.

— Nadia
