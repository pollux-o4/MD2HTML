# UI/UX 패턴 카탈로그 — md-show-me HTML 생성기를 위한 외부 소스 조사

> 작성: 2026-05-26 / 대상 agent: md-show-me M2 (Query-shaped Interactive HTML) 의 LLM selector
> 자매 문서: `thariq-templates-analysis.md` (Tarik 의 19개 데모 분석)

## 1. 개요

본 문서는 Tarik (Thariq Shihipar) 사이트 *외부* 의 소스에서 수집한 인터랙티브 UI/UX 패턴을 정리한다. 카테고리는 5개 — (A) AI/LLM 산출물, (B) 시각화 라이브러리, (C) 문서→인터랙티브 UI, (D) 분석/대시보드 UI, (E) AI agent 결과 UI. 총 130+ 개별 패턴을 수집했고, 각 패턴은 *데이터 형태 → 인터랙션 → 시각화 → 우리 도구 잠재 매핑* 4-tuple 로 정규화했다. Tarik 카탈로그가 "큐레이션된 19개 reference" 라면 본 문서는 "넓은 surface area 의 raw inventory" — M3 prompt 에 selector hint 로 들어가는 *룰* 은 Tarik 분석을 따르되, *어휘* 와 *novelty* 는 본 카탈로그에서 보충하는 게 설계 의도다.

조사 범위 한계: fetch 실패한 곳 (madewithclaude.com 403, D3 gallery 직접 페이지, ECharts examples 인덱스 — JS 렌더링 사이트는 정적 fetch 가 안 됨) 은 검색 결과 + 2차 소스로 보완했고 *추정* 표시. Anthropic Artifacts 공개 갤러리는 madewithclaude.com 차단 때문에 직접 인벤토리는 못 만들었고, 카테고리 정보만 검색 요약으로 수집.

---

## 2. 카테고리별 패턴 카탈로그

### A. AI/LLM 산출물 인터랙티브 HTML 패턴

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| A1 | Claude Artifacts — Live Dashboard | claude.com/blog/artifacts, madewithclaude.com (직접 fetch 실패, 검색 요약 근거) | KPI set + 데이터소스 | 데이터 새로고침, 클릭 드릴다운 | 카드 + 차트 그리드 | 정기 리포트 (주간 status) | medium | proprietary (Anthropic) |
| A2 | Claude Artifacts — Architecture Diagram | madewithclaude.com (요약) | 코드베이스 의존성 | 클릭 펼침, 줌 | SVG 박스+화살표 | repo 구조 viz, ADR 영향 | medium | proprietary |
| A3 | Claude Artifacts — Interactive Prototype | madewithclaude.com (요약) | UI 화면 set | 클릭 네비, hover | iframe sandbox | 디자인 검토 (참고만) | hard | proprietary |
| A4 | Claude Artifacts — Campaign / Pipeline Dashboard | madewithclaude.com (요약) | 시계열 + 카테고리 | 필터, 토글 | 멀티 차트 | 마케팅/세일즈 분석 | medium | proprietary |
| A5 | ChatGPT Canvas — HTML/React preview | help.openai.com/canvas | 단일 컴포넌트 + props | 인라인 편집, 라이브 렌더 | split-view (코드 ↔ 프리뷰) | 우리 도구에는 부적합 (편집기 류) | hard | proprietary |
| A6 | ChatGPT Canvas — Python emulator output | openai.com/canvas | 코드 + 실행결과 | Run 버튼 | 코드 + 출력 영역 | 인라인 코드 데모 (참고) | hard | proprietary |
| A7 | v0.dev — generative full-page UI | v0.app | 자연어 prompt | 자연어 iter, 라이브 프리뷰 | shadcn/ui 풀페이지 | 우리 도구는 LLM 한방 생성이라 직접 매핑은 어렵지만 *결과물 스타일* (Tailwind + shadcn) 은 직접 차용 | medium | OSS 컴포넌트 (MIT 등) |
| A8 | Simon Willison HTML tools — 단일목적 utility | tools.simonwillison.net (150+ tools) | 단일 입력 → 단일 출력 | 파일 업로드, 텍스트 paste, 슬라이더 | 결과 영역 + 다운로드 | "X 를 Y 로 변환" 패턴 — quick utility | easy | 대부분 Apache 2.0 (simonw 기본) |
| A9 | Simon Willison — JSON schema builder (visual) | tools.simonwillison.net/json-schema | 스키마 spec | 클릭 + 폼 입력 | 트리 + 폼 패널 | YAML/JSON config 시각 편집 | medium | Apache 2.0 |
| A10 | Simon Willison — YAML Explorer (collapsible tree) | tools.simonwillison.net | nested YAML | 클릭 펼침/접기 | 들여쓰기 트리 | 프로파일/manifest 탐색 | easy | Apache 2.0 |
| A11 | tldraw "Make Real" — sketch→HTML | tldraw.com | 손그림 sketch | LLM 호출 | 생성된 HTML 프리뷰 | LLM-as-render 패턴 참고 | hard | Apache 2.0 (tldraw) |
| A12 | Karpathy ConvNetJS / TransformerExplainer | poloclub.github.io/transformer-explainer | 모델 + 입력 | 슬라이더, hover, step | 다이어그램 + 인라인 메트릭 | 알고리즘/개념 explainer | hard | MIT (대부분 Karpathy demos) |
| A13 | distill.pub — interactive article | distill.pub (11개 article 확인) | 모델/시뮬레이션 + 파라미터 | 슬라이더, drag, 애니메이션 step | 인라인 SVG/Canvas widget | "왜 인터랙티브" 의 reference 표준 | hard | CC-BY (distill 표준) |
| A14 | Bret Victor Tangle — reactive document | worrydream.com / Tangle.js | 텍스트 + 변수 binding | 드래그 (숫자), 인라인 클릭 | 텍스트 자체가 widget | "문장 안에 슬라이더" — 마이크로 인터랙션 | medium | MIT (Tangle) |
| A15 | Streamlit / Gradio 데모 패턴 (8 patterns) | gradio.app, medium 가이드 | 모델 입력/출력 | 파일/텍스트/오디오 입력, 슬라이더 | 폼 + 결과 + 차트 | ML/LLM 결과 viewer | easy | Apache 2.0 (Streamlit), Apache 2.0 (Gradio) |

**A 카테고리 합계: 15 패턴**

### B. 시각화 패턴 라이브러리

#### B-1. 차트 라이브러리

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| B1 | D3.js gallery | d3js.org | 매우 다양 (≥50 종) | 모든 종류 | 모든 종류 | "최후의 보루" — 다른 라이브러리에 없으면 D3 | hard | BSD-3 |
| B2 | Observable Plot | observablehq.com | tidy data | hover, brush | 30+ 차트 (grammar of graphics) | "tidy" 한 데이터에 가장 빨리 차트 | easy | ISC |
| B3 | Apache ECharts | echarts.apache.org | 시계열, 카테고리, 지리, 관계망 등 | zoom, brush, dataZoom, tooltip, legend toggle | 30+ 차트 (Line/Bar/Pie/Scatter/Candlestick/Radar/Boxplot/Heatmap/Graph/Tree/Treemap/Sunburst/Map/Lines/Parallel/Sankey/Funnel/Gauge/Pictorial/ThemeRiver/Calendar) | "한 라이브러리로 다 커버" — 중대형 viz 표준 | medium | Apache 2.0 |
| B4 | Plotly.js | plotly.com/javascript | 통계, 과학, 재무, 3D | hover, click, zoom, lasso, slider, dropdown | scatter, line, bar, pie, bubble, errorbar, box, hist, density, contour, heatmap, ternary, parallel, log, waterfall, candle, funnel, time, tile map, choropleth, density heatmap, 3D scatter/ribbon/surface/mesh, subplots, inset | 통계/재무/과학 데이터 | medium | MIT |
| B5 | Chart.js | chartjs.org | 시계열, 카테고리 | hover, click | bar, line, pie, doughnut, radar, polar, bubble, scatter | "간단한 차트, 한 줄" | easy | MIT |
| B6 | ApexCharts | apexcharts.com | 시계열, 카테고리 | smooth zoom, animated update | line, area, bar, column, pie, scatter, mixed | 부드러운 애니메이션 차트 | easy | MIT |
| B7 | Highcharts | highcharts.com | 시계열, 카테고리, 3D, polar | zoom, drilldown, export | line, bar, pie, bubble, heatmap, polar, 3D 등 | 엔터프라이즈 차트 표준 | medium | proprietary (free for non-commercial), commercial license 필요 |
| B8 | Recharts (React) | recharts.org | tidy data | hover, click | 표준 차트 | React 환경 | easy | MIT |
| B9 | nivo (React) | nivo.rocks | tidy data | rich tooltip, animation | 풍부한 차트 + 캘린더/sankey | React + 디자인 강함 | medium | MIT |
| B10 | Victory (React) | formidable.com/victory | tidy data | hover | 표준 차트 | React 컴포저블 | easy | MIT |
| B11 | Vega / Vega-Lite | vega.github.io | tidy data | brush, selection, signal | grammar of graphics | LLM 이 *spec* 으로 생성하기 쉬움 (JSON) — **md-show-me 잠재 핫스팟** | medium | BSD-3 |
| B12 | G2 (Alibaba AntV) | g2.antv.vision | tidy data | hover, brush | grammar of graphics | Vega 와 유사한 spec 기반 | medium | MIT |
| B13 | billboard.js | naver.github.io/billboard.js | 시계열, 카테고리 | hover | D3 기반 일반 차트 | "D3 simpler" | easy | MIT |

#### B-2. 그래프/네트워크

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| B14 | Cytoscape.js | js.cytoscape.org | 노드-엣지 (방향/무향/multi/compound) | drag, layout switch, 알고리즘 (BFS, PageRank) | force/circular/grid/hierarchy 등 | repo 의존성 그래프, ADR cross-ref | medium | MIT |
| B15 | vis-network | visjs.org | 노드-엣지 + physics | drag, clustering, manipulation | force-directed + cluster | 작은 네트워크에 빠르게 | easy | Apache 2.0 / MIT |
| B16 | Sigma.js (+ graphology) | sigmajs.org | 노드-엣지 (대규모) | pan, zoom, hover | WebGL force-directed | 100k+ 노드 (md-show-me 에는 over-spec) | hard | MIT |
| B17 | React Flow / Svelte Flow (xyflow) | reactflow.dev | 노드-엣지 + 커스텀 노드 | drag, connect, zoom, pan, multi-select | flow chart / node editor | 워크플로우, dataflow, **agent chain 시각화** | medium | MIT |
| B18 | Cola.js | ialab.it.monash.edu/webcola | 노드-엣지 + 제약 | constraint-based drag | 제약 기반 레이아웃 | 정렬된 다이어그램 | hard | MIT |

#### B-3. 지도 / 지리

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| B19 | Leaflet | leafletjs.com | geo-coord | pan, zoom, popup | tile map | 지리 데이터 (md-show-me 에서는 드물) | easy | BSD-2 |
| B20 | Deck.gl | deck.gl | 대규모 geo + layer | 3D, hover, click | WebGL layers | 빅데이터 지리 | hard | MIT |
| B21 | Cesium | cesium.com | 3D globe | rotate, fly-to | 3D 지구본 | 3D 시각화 (드물) | hard | Apache 2.0 |
| B22 | datasette-cluster-map / iNaturalist (simonw) | tools.simonwillison.net | CSV + lat/lng | pan, zoom, cluster | 클러스터링 마커 | observation 데이터 | easy | Apache 2.0 |

#### B-4. Observable D3/Plot 갤러리 패턴 (개별 종류)

Observable Notebook 2.0 Gallery 69개 직접 fetch 확인. 카테고리화하면:

- **계층 (hierarchy)**: Treemap, Animated treemap, Hierarchical bar, Tidy tree, Radial tidy tree, Collapsible tree, Circle packing, Zoomable circle packing, Sunburst, Zoomable sunburst, Icicle, Zoomable icicle
- **네트워크**: Force-directed graph, Disjoint FDG, Force-directed tree, Temporal FDG, Arc diagram, Chord diagram, Hierarchical edge bundling (×2), Mobile patent suits
- **시계열**: Bar chart race, Bar chart transitions, Connected scatterplot, Horizon chart, Index chart, Streamgraph transitions, Pannable area chart, Zoomable area chart, Marey's trains, Walmart's growth
- **통계/분포**: Brushable scatterplot (+matrix), Density contours, Ridgeline, Scatterplot matrix, Pie chart update, Stacked-to-grouped bars, Bubble chart, Wealth & health of nations
- **지리**: Choropleth, Bivariate choropleth, Hexbin map, Antimeridian cutting, Projection transitions, Orthographic-to-equirectangular, World tour, Versor dragging
- **물리/특수**: Collision detection, Epicyclic gearing, Parabolic arcs, Voronoi labels, Voronoi stippling
- **시간/캘린더**: Calendar
- **천체**: Hertzsprung-Russell diagram, PSR B1919+21, Star map, Tree of life
- **flow**: Sankey diagram, Parallel coordinates, Brushable parallel coordinates, Parallel sets
- **navigation primitive**: Smooth zooming, Zoom to bounding box, Zoomable bar chart

각 패턴은 *Observable Plot* 또는 *D3* 로 구현 가능 — 라이선스 모두 ISC/BSD-3 계열.

**B 카테고리 합계: 22 라이브러리 + 69 individual viz 패턴 = 91 패턴**

### C. 문서 → 인터랙티브 UI 패턴

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| C1 | MDX (React in markdown) | mdxjs.com, Docusaurus | md + React 컴포넌트 | 컴포넌트별 | 인라인 위젯 | md-show-me 가 직접 채택할 만한 출력 포맷 (단, 우리는 한 파일 HTML 이라 빌드 의존성 없는 vanilla 권장) | hard | MIT |
| C2 | Docusaurus 인터랙티브 컴포넌트 | docusaurus.io | docs site | Live code block, FAQ, Tabs | 코드 에디터, accordion, 탭 | 문서 데모 패턴 — *Tabs*, *Live Code* 는 차용 후보 | medium | MIT |
| C3 | VitePress markdown extensions | vitepress.dev | md + Vue | code group, container | 탭, 알림 박스 | "container" 박스 (info/warn/tip) 패턴은 가벼움 + 가독성 ↑ | easy | MIT |
| C4 | mdBook | rust-lang.github.io/mdBook | md books | 검색, theme toggle, 사이드바 | 책 레이아웃 | 책 같은 큰 md 모음 (참고만) | medium | MPL-2.0 |
| C5 | Mermaid — flowchart | mermaid.js.org | DAG text | (정적) | flowchart | 가벼운 다이어그램 | easy | MIT |
| C6 | Mermaid — sequence diagram | mermaid.js.org | actor + message | (정적) | 시퀀스 | API/agent 상호작용 | easy | MIT |
| C7 | Mermaid — class diagram | mermaid.js.org | 클래스 + 관계 | (정적) | UML class | 코드 구조 viz | easy | MIT |
| C8 | Mermaid — ER diagram | mermaid.js.org | entity + relation | (정적) | ER | DB 스키마 | easy | MIT |
| C9 | Mermaid — Gantt | mermaid.js.org | task + date | (정적) | Gantt | 일정/roadmap | easy | MIT |
| C10 | Mermaid — git graph | mermaid.js.org | commit + branch | (정적) | git tree | git 히스토리 | easy | MIT |
| C11 | Mermaid — user journey | mermaid.js.org | step + actor + score | (정적) | journey | UX 흐름 | easy | MIT |
| C12 | Mermaid — timeline | mermaid.js.org | date + event | (정적) | timeline | 이벤트 연대기 | easy | MIT |
| C13 | Mermaid — mindmap | mermaid.js.org | nested concept | (정적) | mindmap | 아이디어 그루핑 | easy | MIT |
| C14 | Mermaid — kanban | mermaid.js.org | task + status | (정적) | kanban | 작업 board (정적) | easy | MIT |
| C15 | Mermaid — C4 diagram | mermaid.js.org | system + container | (정적) | C4 | 시스템 아키텍처 | easy | MIT |
| C16 | Mermaid — Sankey | mermaid.js.org | flow + weight | (정적) | sankey | 흐름 데이터 | easy | MIT |
| C17 | Mermaid — XY chart | mermaid.js.org | 2D 데이터 | (정적) | xy plot | 가벼운 scatter | easy | MIT |
| C18 | Mermaid — quadrant chart | mermaid.js.org | 항목 + 2D 좌표 | (정적) | 2×2 매트릭스 | 우선순위 매트릭스 | easy | MIT |
| C19 | Mermaid — radar chart | mermaid.js.org | 다변량 항목 | (정적) | radar | 다축 비교 | easy | MIT |
| C20 | Obsidian Graph View | obsidian.md/help/plugins/graph | md vault + wikilink | search filter, group color, animate timeline, drag, zoom | force-directed graph | **md-show-me 의 메인 use case 직격탄** — md 들의 link 그래프 | medium | (재구현) |
| C21 | Obsidian Backlinks panel | obsidian.md | 단일 노트 + incoming link | 클릭 점프, 미리보기 | 리스트 + context line | "이 문서를 참조하는 곳" | easy | (재구현) |
| C22 | Obsidian Outgoing links panel | obsidian.md | 단일 노트 + outgoing link | 클릭 점프 | 리스트 | "이 문서가 참조하는 곳" | easy | (재구현) |
| C23 | Obsidian Canvas | obsidian.md/canvas | 노트 + 위치 + 그룹 | drag, group, connect | 무한 캔버스 + 카드 | 노트 매핑 (참고) | hard | (재구현) |
| C24 | Logseq/Roam — block embed/transclusion | logseq.com | block + reference | 클릭으로 inline embed | 인라인 노트 | "이 블록을 여기 끼워넣기" — 단순 참조 너머 | medium | (재구현) |
| C25 | Logseq/Roam — query block | logseq.com | tag/property/keyword | 쿼리 작성 → 자동 리스트 | dynamic list | 자동 인덱스 (예: "이번 주 ADR 모두") | medium | (재구현) |
| C26 | Logseq/Roam — bidirectional backlink counter | logseq.com | block + ref count | 카운터 클릭 → 사이드바 | 인라인 숫자 + 사이드바 | "이 블록 6번 참조됨" — UI hint | easy | (재구현) |
| C27 | Excalidraw library shapes | libraries.excalidraw.com | 그림 + 도형 | drag in, 편집 | hand-drawn diagram | 캐주얼 다이어그램 (md-show-me 가 손그림 톤 채택 안 한다면 skip) | medium | MIT |
| C28 | tldraw — multipage canvas | tldraw.com | 캔버스 + 도형 | drag, snap, multipage | 무한 캔버스 | 디자인 캔버스 (참고) | hard | Apache 2.0 |
| C29 | Notion-style toggle / callout | (다수 OSS 재구현) | 단일 블록 | 클릭 펼침 | accordion | 긴 md 의 디테일 숨김 | easy | (재구현) |
| C30 | GitBook page sidebar + breadcrumb | gitbook.com | 페이지 트리 | 클릭 네비 | 사이드바 + 본문 | 큰 문서 모음 navigation | easy | (재구현) |
| C31 | Scrollama — scrollytelling step trigger | github.com/russellsamora/scrollama | step + 사이드 그래픽 | scroll, sticky graphic | text + 고정 viz | "스토리텔링" 모드 — long-form 리포트 | medium | MIT |
| C32 | Scrollama step progress (0-100%) | scrollama | step + 진행도 | scroll progress | progress-driven animation | "스크롤하면 차트 변화" | medium | MIT |

**C 카테고리 합계: 32 패턴 (Mermaid 15종 포함)**

### D. 분석/대시보드 UI 패턴

#### D-1. Database views (Notion / Airtable / Linear)

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| D1 | Table view (sortable, filterable) | Notion/Airtable | 동질 row + properties | sort, filter, group | 행렬 표 | "md 들의 frontmatter 표" — 가장 기본 | easy | (재구현) |
| D2 | Board view (Kanban) | Notion/Airtable/Linear | item + status property | drag, column collapse, filter | column 카드 | 우선순위/상태 분류 — Tarik #18 과 동치 | medium | (재구현) |
| D3 | Gallery view (card grid) | Notion/Airtable | item + cover image/preview | click, hover | mosaic 카드 | "문서 카드" — abstract + 메타 | easy | (재구현) |
| D4 | Timeline view | Notion/Airtable/Linear | item + start/end date | drag, zoom level | horizontal bar 차트 | 프로젝트/이벤트 일정 | medium | (재구현) |
| D5 | Calendar view | Notion/Airtable | item + date | click date, view month/week | 월 캘린더 | 날짜 기반 (ADR, post-mortem) | easy | (재구현) |
| D6 | Gantt view | Airtable Pro | item + start/end + depend | drag, dependency line | gantt | 의존성 있는 일정 | medium | (재구현) |
| D7 | List view (grouped by property) | Notion/Linear | item + group key | expand/collapse group | indented list | "기본 트리" | easy | (재구현) |
| D8 | Form view | Airtable | schema | 입력 → DB write | 폼 | 우리 도구는 read-only 라 skip | easy | (재구현) |
| D9 | Linear Triage queue | linear.app | issue + status=triage | accept/reject, assign | review queue | "정리 안 된 noted 들 분류" — discovery 결과 검토 | medium | (재구현) |
| D10 | Linear Cycle (sprint) | linear.app | issue + cycle | progress chart | timeline + 진행률 | "이번 주에 닫힌 것들" | medium | (재구현) |
| D11 | Linear Project Roadmap | linear.app | project + status + target date | timeline | roadmap | 마일스톤 viz | medium | (재구현) |
| D12 | Linear Insights | linear.app | issue metric | filter | KPI 카드 + 트렌드 | 메트릭 요약 | easy | (재구현) |
| D13 | Linear Command palette (Cmd+K) | linear.app | 모든 액션 | fuzzy search | overlay | navigation primitive — md-show-me 에서 "다른 viz 로 이동" 트리거 | medium | (재구현) |

#### D-2. Mixpanel / Amplitude

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| D14 | Funnel — step conversion | mixpanel.com | step + count | hover | 깔때기 막대 | "discovery → review → 채택" 같은 우리 도구 자체 funnel | medium | (재구현) |
| D15 | Funnel — Sankey 변형 | mixpanel.com | step + user flow | hover, click | Sankey | 사용자가 step 간 어떻게 흐르는지 | medium | (재구현) |
| D16 | Retention curve + table heatmap | mixpanel.com | cohort × period | hover row/col | line chart + heatmap | "리뷰 후 N일 후 재방문" 메타 분석 | medium | (재구현) |
| D17 | Cohort grouping by property | mixpanel.com | user + property | group by, filter | 카테고리 + 메트릭 | "어떤 종류의 문서가 인기 있나" | medium | (재구현) |
| D18 | Path analysis | amplitude.com | event sequence | drill into path | Sankey/tree | 사용자 여정 viz | hard | (재구현) |

#### D-3. Grafana / Datadog dashboard panels

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| D19 | Time series panel | grafana.com | (t, value) series | pan, zoom (drag-select 후 zoom in, dbl-click zoom out) | 선/면 차트 | 시계열 메트릭 | easy | AGPLv3 (Grafana) |
| D20 | Stat panel (big number + sparkline) | grafana.com | scalar + history | hover | 큰 숫자 + 작은 라인 | KPI 1개 | easy | AGPLv3 |
| D21 | Gauge panel | grafana.com | scalar + threshold | (정적) | gauge | 임계값 모니터 | easy | AGPLv3 |
| D22 | Bar gauge (multi-row) | grafana.com | item set + value | (정적) | 가로/세로 bar | top-N | easy | AGPLv3 |
| D23 | Heatmap (시간 × bucket) | grafana.com | time × bin × count | hover | 격자 heatmap | "시간대별 분포" | medium | AGPLv3 |
| D24 | State timeline | grafana.com | t + state | hover | 색 변화 bar | 상태 변화 추적 | medium | AGPLv3 |
| D25 | Status history | grafana.com | t + periodic state | hover | 점선 status | 주기적 상태 | medium | AGPLv3 |
| D26 | XY chart | grafana.com | arbitrary x, y | hover | scatter | 일반 산점도 | easy | AGPLv3 |
| D27 | Dashboard variable / template | grafana.com | dropdown selector → query | dropdown change | 전체 dashboard 리렌더 | "필터 한 번에 모든 차트 변경" | medium | AGPLv3 |

#### D-4. Retool / ToolJet 컴포넌트

Retool 컴포넌트 표 직접 fetch 확인 (40+ 컴포넌트). 우리 도구에 *차용 가능한 패턴* 만 추출:

| # | 패턴 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|
| D28 | Statistic (큰 숫자 + trend) | scalar + delta | hover tooltip | 카드 | KPI 1개 | easy | (재구현) |
| D29 | Tags (다중 카테고리) | string set | click toggle | pill chip | 카테고리 라벨 | easy | (재구현) |
| D30 | Progress bar / Progress circle | scalar 0-100 | (정적) | bar/circle | 단일 진행률 | easy | (재구현) |
| D31 | Timeline (event list) | event + timestamp | scroll | vertical timeline | 연대기 narrative | easy | (재구현) |
| D32 | Calendar (event display) | event + date | click | month grid | 일정 viz | medium | (재구현) |
| D33 | Event list (sortable) | event set | sort, filter | list | 이벤트 nav | easy | (재구현) |
| D34 | JSON Explorer | nested object | expand | tree | 복잡 객체 탐색 | easy | (재구현) |
| D35 | Key-Value display | dict | (정적) | label-value 쌍 | metadata 표시 | easy | (재구현) |
| D36 | Reorderable list (drag-sort) | item set | drag | list | 우선순위 정렬 | medium | (재구현) |
| D37 | Tabs / Tabbed Container | content set | click tab | 탭 | 여러 view 토글 | easy | (재구현) |
| D38 | Collapsible Container | content + open state | click toggle | accordion | 디테일 숨김 | easy | (재구현) |
| D39 | Stepped Container / Wizard | step sequence | next/prev | step indicator + body | 다단계 흐름 | medium | (재구현) |
| D40 | Filter (multi-property) | property set | input + dropdown | 폼 + chip | "이 표 필터링" | medium | (재구현) |
| D41 | Steps (progress indicator) | step + state (complete/active/pending) | (정적) | numbered horizontal bar | 진행 상태 | easy | (재구현) |
| D42 | Breadcrumbs | path | click ancestor | "A > B > C" | 위치 표시 | easy | (재구현) |
| D43 | Segmented Control | 옵션 2-5개 | click | 토글 그룹 | view 모드 전환 | easy | (재구현) |
| D44 | Annotated Text | text + spans | hover annotation | inline 하이라이트 | 코멘트 anchored 텍스트 | medium | (재구현) |
| D45 | Bounding Box (image annotation) | image + box | drag rect | image + overlay | 이미지 영역 표시 | medium | (재구현) |
| D46 | Comment Thread | message + author + time | scroll, reply | 채팅 스타일 | 리뷰 코멘트 모음 | medium | (재구현) |
| D47 | Status (badge) | enum value | (정적) | colored pill | "draft/review/published" | easy | (재구현) |
| D48 | Rating | 1-N | click | star/dot row | 평가 표시 | easy | (재구현) |
| D49 | Range Slider | (min, max) | drag handles | 더블 핸들 슬라이더 | "X 부터 Y 까지" 필터 | easy | (재구현) |
| D50 | Cascader (nested select) | nested options | drill | 다단계 dropdown | 카테고리 트리 선택 | medium | (재구현) |

**D 카테고리 합계: 50 패턴**

### E. AI agent 결과 UI

| # | 패턴 | 출처 | 데이터 형태 | 인터랙션 | 시각화 | 잠재 매핑 | 난이도 | 라이선스 |
|---|---|---|---|---|---|---|---|---|
| E1 | Perplexity Answer card | perplexity.ai (designmd.co 분석) | 답변 텍스트 + 인용 + sources | hover citation 으로 source 카드 하이라이트, source 카드 클릭으로 새 창, 후속 질문 chip 클릭 | 720px 본문 + horizontal source strip + 인라인 superscript [n] + follow-up pill | **md-show-me 의 기본 layout 후보** — discovery 답변 + 소스 카드 + "더 물어보기" chip | easy | (재구현) |
| E2 | Perplexity 인용 hover tooltip | perplexity.ai | citation index | hover | source snippet preview | 출처를 신뢰감 있게 보여주기 | easy | (재구현) |
| E3 | Perplexity follow-up question chips | perplexity.ai | suggested queries | click → 새 query | pill row | "다음에 이거 물어봐" — 우리 도구의 *re-query* loop | easy | (재구현) |
| E4 | Perplexity Pro Search (step-by-step expand) | perplexity.ai | 검색 step 시퀀스 | click step → detail | expandable timeline | "이렇게 찾았어요" 투명성 | medium | (재구현) |
| E5 | Phind visual answer (inline images/diagrams) | phind.com | 답변 + 멀티미디어 | hover, click | 답변 안에 widget 직접 임베드 | "generative UI" — Tarik 노선과 정확히 같음 | medium | (재구현) |
| E6 | Phind multi-step reasoning trace | phind.com | reasoning chain | expand step | 트리 + 박스 | reasoning trace viz | medium | (재구현) |
| E7 | Cursor — diff preview (inline) | cursor.com | before / after code | accept/reject hunk | inline diff (red/green) | 코드 변경 viz (md-show-me 도 *m4 review* 에서 차용 가능) | easy | (재구현) |
| E8 | Cursor — multi-file diff aggregator | cursor.com | file set + diff per file | file 토글, hunk navigate | 사이드바 (파일) + 본문 (diff) | "이 review 가 영향 주는 파일들" | medium | (재구현) |
| E9 | Cursor — checkpoint list | cursor.com | iteration set | revert to checkpoint | vertical timeline | agent 작업 history | medium | (재구현) |
| E10 | Devin — full replay timeline | devin.ai | action sequence (terminal/file/browser) | scrub timeline | scrubbable timeline + screen | agent 작업 replay (heavy 한 viz) | hard | (재구현) |
| E11 | Devin — PR-as-result | devin.ai | PR (title/body/files) | GitHub-style review | PR 페이지 | 표준 review surface | easy | (재구현) |
| E12 | Sweep — virtualized large tool result | sweep.dev (changelog) | 매우 큰 출력 | scroll, lazy load | 가상화 리스트 | 큰 output viewer | medium | (재구현) |
| E13 | ChatGPT message + Canvas split | chatgpt.com/canvas | conversation + artifact | inline edit, regenerate | left chat + right artifact | "대화하면서 옆에 viz" — md-show-me 가 *서버 없이 정적* 이라는 제약 때문에 부분 차용만 | hard | (재구현) |
| E14 | LangChain Open Canvas | github.com/langchain-ai/open-canvas | open-source ChatGPT Canvas clone | (위와 동일) | OSS 참고 구현 | self-host 가능 | hard | MIT |
| E15 | shadcn/ui 표준 컴포넌트 (Card, Dialog, Drawer, Sheet, Tooltip, Toast, Command, Popover, Tabs, Accordion, Skeleton, Calendar, Combobox, Data Table 등) | ui.shadcn.com | 범용 | 범용 | 범용 | **md-show-me HTML 출력의 baseline 컴포넌트** — LLM 이 prompt 에서 이 이름들로 호출하기 쉬움 | easy | MIT |

**E 카테고리 합계: 15 패턴**

---

## 3. 패턴 분류 매트릭스

### 3-1. 데이터 형태 × 시각화 형태 매트릭스

| 데이터 형태 ↓ \\ 시각화 → | 카드/그리드 | 타임라인 | 그래프(network) | 매트릭스/표 | 차트(통계) | 트리/계층 | 지도 | split-view | 단일 widget |
|---|---|---|---|---|---|---|---|---|---|
| 단일 문서 (long-form) | — | — | — | — | — | — | — | C31 (scroll), C32 | D44 (annotated text) |
| 동질 item set (≥5) | D3, D7 | — | — | D1 | B1-B13 | — | — | — | — |
| 시계열 (timestamp) | — | A1, C12, C9, D4, D5, D6, D31, D32 | B17 (temporal) | D24, D25 | B1-B13, D19 | — | — | — | — |
| 관계망 (cross-ref/link) | — | — | C20, B14-B18, A2 | — | — | — | — | — | — |
| 매트릭스 (item × dim) | — | — | — | D1, B3 (heatmap), D23 | — | — | — | — | — |
| 카테고리 라벨 set | D2 (kanban), D29 (tags), D47 | — | — | — | B5 (pie), C18 (quadrant) | C13 (mindmap) | — | — | — |
| 대안 set (2~5) | A12, B11 | — | — | — | — | — | — | A5, E13 | D43 (segmented) |
| 파라미터화된 개념 | — | — | — | — | A14, B11 | — | — | — | A12, A13, A14 |
| flow / sequence | — | — | C5, C6, B17 | — | C16 (sankey), D14, D15 | — | — | — | — |
| 메타데이터 (key-value) | — | — | — | D35 | — | A10 (YAML tree), D34 | — | — | — |
| 코드 diff | — | — | — | — | — | — | — | E7, E8 | — |
| 지리 + 좌표 | — | — | — | — | — | — | B19-B22 | — | — |
| 답변 + 출처 set | E1 (sources strip) | — | — | — | — | — | — | — | E2 (citation hover) |

### 3-2. 인터랙션 강도 × 구현 난이도 매트릭스

| 인터랙션 강도 ↓ \\ 난이도 → | easy | medium | hard |
|---|---|---|---|
| **none (정적 render)** | C5-C19 (Mermaid), D20, D21, D22, D35, D41, D42, D47 | C4 (mdBook), D19 | E10 (replay) |
| **click / hover** | A8, A10, B5, B6, B8, C2 (tabs), C3, D1, D3, D5, D29, D33, D37, D38, D43, D48, D49, E1, E2, E3, E7 | A2, B3, B4, B9, B11, B14-B16, C20, C22, D2, D7, D11, D13, D17, E5, E11 | A3, B1, B7, B16, B17 |
| **drag** | C22, D49 | D2 (kanban drag), D6 (gantt), C27, C28, D36, D45 | B16, B17 (xyflow), B18 |
| **slider / parameter** | B5, B6 | A14, B3 (dataZoom), B4 (slider), D49 | A12, A13 |
| **edit / live editing** | A8 | A9 (json schema), C2 (live code), D44, D46 | A5, A6, A7, A11, C28, E13, E14 |
| **scroll-driven (scrollytelling)** | — | C31, C32 | — |
| **multi-view linked selection** | — | B4 (linked brushing), D27 (dashboard var) | B1 (custom brush) |
| **copy-as-X / export** | A8, A10, C26 | (Tarik #18, #20 패턴 — 외부 카탈로그에는 흔치 않음) | — |

### 3-3. M3 selector hint 룰 보충 (Tarik 분석 5개 룰 위에 추가)

Tarik 분석에서 도출한 5개 룰 (timestamp→timeline, cross-ref→graph, item-set+category→kanban/grid, 대안→side-by-side, 파라미터화 개념→슬라이더) 외에 본 카탈로그에서 추가 도출:

6. **단일 답변 + 인용 sources** → Perplexity-style 카드 (E1) — *md-show-me 의 default layout 후보*
7. **flow / sequence (step + 흐름)** → Sankey (C16) 또는 funnel (D14) — 사용자 여정/conversion 패턴
8. **계층 (nested tree, ≥3 깊이)** → Treemap / Sunburst / Tidy tree (B-Observable hierarchy 카테고리) — 폴더/카테고리 viz
9. **매트릭스 (item × 시간 bin)** → Heatmap (D23) — "시간대별 활동"
10. **단일 long-form 문서 + 사이드 viz** → Scrollytelling (C31, C32) — 길이 ≥ 3000 chars 이고 데이터 차트가 본문에 종속될 때
11. **다변량 비교 (≥3 axis)** → Radar (C19) 또는 Parallel coordinates (Observable) — "이 옵션들이 4축에서 어떻게 다른가"
12. **2×2 우선순위/positioning** → Quadrant chart (C18) — "중요도×난이도"
13. **상태 변화 시계열** → State timeline (D24) 또는 git graph (C10) — "PR 의 status 흐름"
14. **다단계 워크플로우** → Steps (D41) 또는 Wizard (D39) — "이렇게 하면 됩니다 1→2→3"
15. **답변 + "다음 질문"** → Follow-up chips (E3) — *md-show-me 의 re-query loop 의 UI 표현*

---

## 4. md-show-me 도메인 적용 후보 long-list

각 후보 = (패턴, *어떤 query 시나리오에 어울리는가*, *왜 Tarik 카탈로그만으로 부족한가*) 3-tuple.

### 4-A. Discovery 결과 surface 후보

- **E1 Perplexity Answer card**: "이 repo 에서 retry policy 어떻게 했어?" — 답변 텍스트 + 5개 source 카드. Tarik 19개 중 직접 대응 없음 (#16 implementation plan 이 가장 가깝지만 source 카드 없음). 본 도구의 *기본 layout 후보 #1*.
- **D3 Gallery view**: discovery 결과 5개 md 를 카드 모자이크로. Tarik #18 kanban 의 비-status 버전.
- **C20 Obsidian Graph View**: "이 5개 문서가 서로 어떻게 연결돼 있나" — discovery 결과의 link 그래프. md-show-me 의 가장 직접적인 매칭. Tarik #04 module map 보다 *md vault* 컨텍스트에 더 맞음.
- **C21 Obsidian Backlinks panel**: "이 한 문서를 참조하는 다른 문서들" — discovery 시 *왜 이게 선택됐는지* 의 한 종류.
- **D29 Tags + D40 Filter**: discovery 후 후보 5개를 사용자가 좁히게 (role, status, freshness 등으로).

### 4-B. Timeline / 시계열 시나리오

- **C12 Mermaid timeline**: "최근 ADR 50개 timeline" — Tarik #12 incident timeline 의 *가벼운* 버전 (정적, Mermaid).
- **A1 Live dashboard**: "주간 status 리포트" — 시계열 + KPI. Tarik #11 weekly status 의 동적 버전.
- **D24 State timeline**: "이 ADR 들의 status 변화" — accept/superseded 흐름.
- **C10 git graph (Mermaid)**: "이 기능의 PR 들 branching 흐름".
- **D31 Event list (Retool style)**: 단순한 연대기 (Mermaid 보다 더 텍스트 중심).
- **C31/C32 Scrollytelling**: "이 기능의 진화" 같은 long-form narrative + 사이드 timeline 차트.

### 4-C. 그래프 / 네트워크 시나리오

- **B14 Cytoscape.js**: "ADR 의존성 그래프" — Tarik #04 module map 의 *진짜 graph theory* 버전 (cluster, BFS, 알고리즘).
- **B17 React Flow (xyflow)**: "agent chain 시각화" / "데이터 파이프라인" — Tarik #04 보다 *editable* 한 워크플로우 viz.
- **C20 Obsidian Graph View 재구현**: "이 vault 전체 link 그래프".
- **C5 Mermaid flowchart**: 단순 DAG (cytoscape 필요 없을 때).

### 4-D. 분류 / 우선순위 시나리오

- **D2 Kanban**: "TODO/리뷰 코멘트 모음" — Tarik #18 과 동치.
- **D36 Reorderable list**: "이 후보들 우선순위로 정렬해줘".
- **C18 Mermaid quadrant**: "중요도 × 긴급도 매트릭스".
- **C13 Mermaid mindmap**: "이 주제들 그루핑" — 자동 클러스터.
- **D17 Cohort grouping**: "어떤 종류의 문서가 자주 stale 되나" — 메타 분석.

### 4-E. 비교 / 대안 시나리오

- **A12 Tarik #01 (외부 ref: TransformerExplainer 류)**: "이 함수 리팩토링 옵션 3가지".
- **D43 Segmented Control**: 옵션 2-5개 토글로 빠르게 비교.
- **C19 Mermaid radar**: "이 옵션들의 4축 비교".
- **E7 Cursor diff preview**: "before / after 코드 비교" — review 결과 viz.

### 4-F. 개념 / 알고리즘 설명 시나리오 (Tarik #15 ring 카테고리 확장)

- **A12 Karpathy / Transformer Explainer**: ML 개념 인터랙티브 explainer.
- **A13 distill.pub style article**: 깊이 있는 단일 개념 explainer.
- **A14 Bret Victor Tangle**: "이 문장 안의 숫자 드래그" — 마이크로 인터랙션.
- **B11 Vega-Lite spec**: 파라미터 spec 만 LLM 이 생성, 인터랙션은 라이브러리가.

### 4-G. 대시보드 / 메트릭 시나리오

- **D19 Time series panel** + **D20 Stat** + **D27 Dashboard variable**: "이 repo 의 health dashboard".
- **B3 ECharts 멀티 차트**: 한 페이지에 다양한 viz.
- **D23 Heatmap**: "시간대 × 카테고리" 활동.
- **D28 Statistic 카드**: KPI 1개씩 카드로.

### 4-H. Long-form / 스토리텔링 시나리오

- **C31/C32 Scrollama**: "왜 이 architecture 결정을 했는지" long-form.
- **A13 distill.pub article**: 깊이 있는 reasoning 글.
- **C29 toggle/callout**: 긴 글에서 디테일 숨김.

### 4-I. Review / 리뷰 흐름 시나리오 (M3/M4 직접 매핑)

- **E7 Cursor diff**: 리뷰 변경사항 시각화.
- **D44 Annotated text**: 리뷰 코멘트 anchored to text — *md-show-me 의 review anchor 기능과 정확히 같은 구조*.
- **D46 Comment Thread**: 리뷰 코멘트 묶음.
- **A8 simonw HTML tool 스타일**: "선택한 텍스트 → 클립보드 prompt" 같은 단일목적 인터랙션.

### 4-J. Navigation primitive (모든 viz 의 helper)

- **D13 Linear Command palette (Cmd+K)**: "다른 viz 로 전환" — 한 HTML 안에 여러 view 가 있을 때.
- **C2 Tabs / D37 Tabbed Container**: view 모드 전환.
- **D42 Breadcrumbs**: 드릴다운 path.
- **D7 Grouped list**: 기본 트리.
- **C29 Toggle/Callout**: accordion.

### 4-K. 메타 / re-query 후보

- **E3 Perplexity follow-up chips**: "다음에 이거 물어봐" — 우리 도구의 *연쇄 query loop* 의 UI.
- **E2 Citation hover**: source 카드 hover preview.
- **E4 Pro Search step expand**: "discovery 가 이렇게 찾았어요" 투명성.

### 4-L. Baseline 컴포넌트 (모든 출력의 공통 어휘)

- **E15 shadcn/ui**: Card, Dialog, Drawer, Sheet, Tooltip, Toast, Command, Popover, Tabs, Accordion, Skeleton, Calendar, Combobox, Data Table — *LLM prompt 에 컴포넌트 이름으로 호출하기 쉬운 표준 어휘*. md-show-me 의 baseline 디자인 시스템 후보 #1.
- **B11 Vega-Lite**: LLM 이 *JSON spec* 으로 생성 → 라이브러리가 렌더. "코드 생성" 보다 "spec 생성" 이 LLM 에 더 안전.

---

## 5. 부록 — fetch 실패 / 추정 표시

- madewithclaude.com 403 — Anthropic Artifacts 갤러리 직접 인벤토리 못 만듦. 검색 결과 + Anthropic blog 로만 카테고리 추정.
- D3 gallery 페이지 (observablehq.com/@d3/gallery) — JS 렌더 사이트라 정적 fetch 시 navigation 만 보임. d3js.org 홈에서 차트 카테고리 확인으로 보완.
- ECharts examples 인덱스 — 동일 이유로 직접 fetch 실패. 다른 비교 사이트 참조.
- ToolJet 컴포넌트 카탈로그 — 두 URL 모두 404. Retool 카탈로그를 *재구현 가능한 컴포넌트* 의 reference 로 사용.
- Distill.pub — 11개 article 만 직접 fetch 확인. 더 많은 article 이 있을 수 있음.

라이선스 "(재구현)" 표시: 원본 SaaS/closed source 의 *디자인 패턴* 만 차용 — 본 카탈로그는 vanilla HTML+JS 로 *재구현* 한다는 가정.

---

## 6. 카테고리별 수집 통계

- A (AI/LLM 산출물): 15 패턴
- B (시각화 라이브러리): 22 라이브러리 + 69 individual viz = 91 패턴
- C (문서→인터랙티브 UI, Mermaid 15종 포함): 32 패턴
- D (분석/대시보드): 50 패턴
- E (AI agent 결과 UI): 15 패턴
- **합계: 203 패턴 (라이브러리 22개 별도 카운트)**
