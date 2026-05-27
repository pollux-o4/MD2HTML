# Thariq HTML Effectiveness — 템플릿 차용 카탈로그

## 1. 개요

조사 대상: https://thariqs.github.io/html-effectiveness/ (repo: https://github.com/ThariqS/html-effectiveness, Apache-2.0). 사이트는 "HTML 을 유연한 출력 포맷으로 쓰는 20가지 예시" 갤러리이며, 모든 파일은 self-contained 단일 HTML (빌드 의존성 0).

md-show-me 의 본질은 "사용자 쿼리에 맞는 적절한 표현 방식을 LLM 이 선택" 하는 것. 따라서 top 5 만 좁히지 않고 **20개 전부를 차용 후보** 로 두고 LLM 이 쿼리 → 템플릿 매핑할 수 있게 카탈로그화한다.

원본 분류 (repo README): Exploration / Code / Prototyping / Communication / Diagrams / Research / Editors — 7 카테고리. 본 문서는 G(Planning) 를 더해 8 카테고리로 재정리.

라이선스 / 차용 의무 관련은 별도 문서 `thariq-html-effectiveness-license.md` 참고.

조사 방법: 인덱스 페이지 + 20개 데모 페이지 전부 fetch 완료. 모든 항목에 데이터 형태 · 인터랙션 · 시각화 · 쿼리 매핑 · 차용 난이도 메타데이터 부여.

## 2. 템플릿 카탈로그

### 카테고리 A — Exploration (탐색·비교)

#### A1. Three code approaches

- **파일**: `01-exploration-code-approaches.html`
- **URL**: https://thariqs.github.io/html-effectiveness/01-exploration-code-approaches.html
- **데이터 형태**: 동일 문제에 대한 N개 구현 + 각각의 메트릭 (bundle / testability / reusability / SSR 등 4~6 dimension)
- **인터랙션**: 없음 (정적 문서)
- **시각화**: 코드블록 N개 병렬 + pro/con 리스트 + 비교 테이블 + 최종 추천 콜아웃
- **쿼리 매핑 예시**: "이 함수 구현 방법 3가지 비교", "X 라이브러리 vs Y", "접근 방식 트레이드오프 정리"
- **차용 난이도**: **easy** — 정적 HTML/CSS, JS 없음

#### A2. Visual design directions

- **파일**: `02-exploration-visual-designs.html`
- **URL**: https://thariqs.github.io/html-effectiveness/02-exploration-visual-designs.html
- **데이터 형태**: 동일 UI 컴포넌트의 N개 디자인 방향 (각각 톤·밀도·시각요소 다름, A~D 4안)
- **인터랙션**: 라이트/다크 토글, primary action 버튼 클릭
- **시각화**: 4분할 그리드, 각 셀에 작동하는 UI 미니 + "best for:" 캡션 + (옵션) 일러스트/모션
- **쿼리 매핑 예시**: "빈 상태 화면 4가지 톤", "랜딩 페이지 시안 3개", "에러 메시지 디자인 옵션"
- **차용 난이도**: **medium** — CSS 토글 + 일러스트/모션 일부

### 카테고리 B — Code (코드 리뷰·이해·디자인 시스템)

#### B1. Annotated pull request

- **파일**: `03-code-review-pr.html`
- **URL**: https://thariqs.github.io/html-effectiveness/03-code-review-pr.html
- **데이터 형태**: diff (file × hunk × line), 라인별 코멘트, 파일별 +/- 통계, 심각도 라벨
- **인터랙션**: jump-to-file 앵커, 심각도 필터
- **시각화**: 인라인 diff + 마진 노트 + severity badge (safe / worth a look / needs attention) + file stat bar
- **쿼리 매핑 예시**: "이 PR 리뷰 정리", "diff 에 코멘트", "변경사항 위험도별로 분류"
- **차용 난이도**: **medium** — diff 렌더링 + 앵커, JS 가벼움

#### B2. Module map

- **파일**: `04-code-understanding.html`
- **URL**: https://thariqs.github.io/html-effectiveness/04-code-understanding.html
- **데이터 형태**: 모듈/패키지 그래프 (노드 + 엣지), hot path, entry points, key files
- **인터랙션**: 노드 클릭 → 파일 위치
- **시각화**: 박스+화살표 다이어그램 + 콜스택 walkthrough (번호 단계) + SQL 스키마 코드블록 + key files 링크 리스트
- **쿼리 매핑 예시**: "이 코드베이스 구조", "auth flow 따라가줘", "module dependency map"
- **차용 난이도**: **medium** — SVG/CSS 다이어그램

#### B3. Living design system

- **파일**: `05-design-system.html`
- **URL**: https://thariqs.github.io/html-effectiveness/05-design-system.html
- **데이터 형태**: 디자인 토큰 (color · typography scale · spacing · radius · elevation) + 컴포넌트 예시
- **인터랙션**: swatch 클릭 → 토큰명 copy, 컴포넌트 상태 토글
- **시각화**: 색 swatch 그리드, 타이포 specimen, 토큰 테이블, 작동하는 컴포넌트 쇼케이스
- **쿼리 매핑 예시**: "디자인 토큰 정리", "design system reference", "팔레트 + 컴포넌트 갤러리"
- **차용 난이도**: **easy** — CSS variable + grid

#### B4. Component variants

- **파일**: `06-component-variants.html`
- **URL**: https://thariqs.github.io/html-effectiveness/06-component-variants.html
- **데이터 형태**: 단일 컴포넌트의 N개 prop 조합 (size × state × intent matrix)
- **인터랙션**: hover → props 미리보기, padding 슬라이더, border/shadow 토글
- **시각화**: 6분할 그리드 (A~F variants), 각 카드 + "best for" + JSX code preview pane
- **쿼리 매핑 예시**: "이 버튼 모든 변형", "Card 컴포넌트 matrix"
- **차용 난이도**: **medium** — 슬라이더/토글 JS, hover code preview

### 카테고리 C — Prototyping (인터랙션 시제품)

#### C1. Animation sandbox

- **파일**: `07-prototype-animation.html`
- **URL**: https://thariqs.github.io/html-effectiveness/07-prototype-animation.html
- **데이터 형태**: 단일 micro-interaction 의 상태 머신 (done/undone) + 타이밍 시퀀스
- **인터랙션**: 클릭 → 애니메이션 재생, easing 드롭다운 (linear/ease-out/spring), duration 슬라이더
- **시각화**: 작동하는 컴포넌트 + 키프레임 타임라인 + copy-paste CSS 블록
- **쿼리 매핑 예시**: "체크박스 애니메이션", "loading spinner 변주", "transition 실험"
- **차용 난이도**: **medium** — CSS keyframes + 슬라이더

#### C2. Clickable flow

- **파일**: `08-prototype-interaction.html`
- **URL**: https://thariqs.github.io/html-effectiveness/08-prototype-interaction.html
- **데이터 형태**: 사이드바 리스트 (Inbox/Today/Upcoming/Projects/Archive/Trash + 카운트)
- **인터랙션**: drag-to-reorder (grip dots), drop indicator snap, hover 강조, 드래그 중 35% opacity 틸트
- **시각화**: 사이드바 리스트 + 드래그 핸들
- **쿼리 매핑 예시**: "리스트 reorder 인터랙션", "drag UX 데모", "N개 화면 시퀀스 클릭"
- **차용 난이도**: **hard** — Native DnD API + drop calc

### 카테고리 D — Communication (보고·발표·인시던트)

#### D1. Arrow-key slide deck

- **파일**: `09-slide-deck.html`
- **URL**: https://thariqs.github.io/html-effectiveness/09-slide-deck.html
- **데이터 형태**: 슬라이드 N장 (title + body + 옵션 chart/list)
- **인터랙션**: ←/→ 키보드 네비, 페이지 인디케이터
- **시각화**: 단일 HTML 파일에 슬라이드 stack, full-viewport
- **쿼리 매핑 예시**: "5장 슬라이드 만들어줘", "발표 자료", "한 페이지에 deck"
- **차용 난이도**: **easy** — keyboard listener + CSS transform, 100줄 미만

#### D2. Weekly status

- **파일**: `11-status-report.html`
- **URL**: https://thariqs.github.io/html-effectiveness/11-status-report.html
- **데이터 형태**: shipped/in-progress/next 섹션 + 메트릭 (count · trend · pp 변화) + 결정 항목 (poll)
- **인터랙션**: PR 링크 클릭, decision poll 옵션 선택
- **시각화**: 메트릭 카드 (KPI + 화살표) + 막대 차트 (PRs merged per day) + shipped 테이블 (title/author/risk)
- **쿼리 매핑 예시**: "이번 주 status report", "weekly digest", "팀 업데이트 요약"
- **차용 난이도**: **easy** — CSS bar chart + 카드 그리드

#### D3. Incident timeline

- **파일**: `12-incident-report.html`
- **URL**: https://thariqs.github.io/html-effectiveness/12-incident-report.html
- **데이터 형태**: 메타 (severity · duration · owner) + 타임라인 이벤트 (timestamp + 설명) + root cause diff + impact 메트릭 + action items
- **인터랙션**: 섹션 앵커 네비, 접기/펴기 (TL;DR / Timeline / Root Cause / Action Items)
- **시각화**: 수직 timestamp 리스트 + YAML diff 코드블록 + impact 테이블
- **쿼리 매핑 예시**: "post-mortem 작성", "incident report", "장애 회고", "ADR 결정 임팩트"
- **차용 난이도**: **easy** — 정적 구조 + 타임라인 CSS

#### D4. PR writeup for reviewers

- **파일**: `17-pr-writeup.html`
- **URL**: https://thariqs.github.io/html-effectiveness/17-pr-writeup.html
- **데이터 형태**: TL;DR + rationale + file-by-file tour + 리뷰 포커스 + 테스트 전략 + rollout 계획
- **인터랙션**: 섹션 앵커, before/after 코드 expand, 외부 링크
- **시각화**: before/after 비교 테이블 + 코드 블록 + 단계별 rollout 타임라인 (alert threshold)
- **쿼리 매핑 예시**: "PR 설명 잘 써줘", "리뷰어 시간 아끼는 writeup", "큰 변경 description"
- **차용 난이도**: **easy** — 앵커 + 코드블록

### 카테고리 E — Diagrams (시각 산출물)

#### E1. SVG figure sheet

- **파일**: `10-svg-illustrations.html`
- **URL**: https://thariqs.github.io/html-effectiveness/10-svg-illustrations.html
- **데이터 형태**: 다이어그램 N개, 팔레트 6색 고정
- **인터랙션**: 다이어그램별 "Download SVG" 버튼
- **시각화**: 인라인 SVG (720×320, 1.5~2px stroke, 10px radius) — queue / timeline / fan-out 패턴 3종
- **쿼리 매핑 예시**: "blog 용 다이어그램", "system architecture SVG", "extractable figure"
- **차용 난이도**: **medium** — SVG 직접 작성, 디자인 감각 필요

#### E2. Annotated flowchart

- **파일**: `13-flowchart-diagram.html`
- **URL**: https://thariqs.github.io/html-effectiveness/13-flowchart-diagram.html
- **데이터 형태**: 노드 (process/decision/terminal) + 엣지 (success/failure) + 단계별 메타 (duration, what runs)
- **인터랙션**: 노드 클릭 → 상세 패널 (what executes, duration, short-circuit)
- **시각화**: 박스+화살표 플로우차트 + healthy/failed 색 인디케이터 + canary 단계 progressive 표시
- **쿼리 매핑 예시**: "CI 파이프라인 시각화", "deploy flow", "interactive 워크플로 다이어그램"
- **차용 난이도**: **hard** — SVG/HTML 박스 + 화살표 라우팅 + 클릭 핸들러

### 카테고리 F — Research / Explainer (학습·해설)

#### F1. How a feature works

- **파일**: `14-research-feature-explainer.html`
- **URL**: https://thariqs.github.io/html-effectiveness/14-research-feature-explainer.html
- **데이터 형태**: TL;DR + 단계 (collapsible) + 탭 코드 샘플 (여러 파일) + FAQ + HTTP 헤더/메트릭
- **인터랙션**: 4단계 request path expand, TOC 네비, 코드 탭 전환
- **시각화**: 텍스트 플로우차트 + 다중 파일 코드 블록 + FAQ Q&A
- **쿼리 매핑 예시**: "이 기능 어떻게 작동", "신규 멤버 온보딩 문서", "rate limit explainer"
- **차용 난이도**: **medium** — 탭 + collapsible

#### F2. Concept explainer (interactive)

- **파일**: `15-research-concept-explainer.html`
- **URL**: https://thariqs.github.io/html-effectiveness/15-research-concept-explainer.html
- **데이터 형태**: 개념 파라미터 (예: nodes=4, keys=32) + 비교 대상 (consistent hashing vs mod N) + 메트릭 (keys moved, lookup cost) + 용어
- **인터랙션**: 노드/키 수 슬라이더, "add node" / "remove node" / "reset", 실시간 재계산
- **시각화**: 원형 ring 다이어그램 (색 arc 노드 + dot 키) + 비교 테이블 + glossary
- **쿼리 매핑 예시**: "이 알고리즘 만져보면서 이해", "interactive 시뮬레이션", "consistent hashing / Raft 같은 개념"
- **차용 난이도**: **hard** — 수학 시뮬레이션 + SVG 인터랙션 + state

### 카테고리 G — Planning (계획·로드맵)

#### G1. Implementation plan

- **파일**: `16-implementation-plan.html`
- **URL**: https://thariqs.github.io/html-effectiveness/16-implementation-plan.html
- **데이터 형태**: 마일스톤 + slice (schema/UI/realtime/notifications 4개) + 데이터플로우 다이어그램 + 위험 코드 섹션 + risk assessment 테이블
- **인터랙션**: 섹션 앵커, mockup 이미지
- **시각화**: 데이터플로우 다이어그램 (solid=optimistic / dashed=realtime), risk 테이블, 마일스톤 타임라인
- **쿼리 매핑 예시**: "feature 구현 계획", "slice 별로 쪼개서", "implementation roadmap + 위험도"
- **차용 난이도**: **medium** — 다이어그램 + 테이블 조합

### 카테고리 H — Editors (사용자 입력 → 결과 카피)

#### H1. Ticket triage board

- **파일**: `18-editor-triage-board.html`
- **URL**: https://thariqs.github.io/html-effectiveness/18-editor-triage-board.html
- **데이터 형태**: N개 티켓 (id + title + 메타) 초기 카테고리 할당
- **인터랙션**: drag-drop 컬럼 이동 (Now/Next/Later/Cut), 태그 필터, Reset, "Copy as markdown"
- **시각화**: 칸반 4컬럼 + 카드 + 상단 액션바
- **쿼리 매핑 예시**: "30개 이슈 우선순위 (드래그)", "triage UI", "list → kanban 변환"
- **차용 난이도**: **hard** — DnD + 카피 export, JS 많음

#### H2. Feature flag editor

- **파일**: `19-editor-feature-flags.html`
- **URL**: https://thariqs.github.io/html-effectiveness/19-editor-feature-flags.html
- **데이터 형태**: 플래그 N개 (이름 + on/off + 의존성 + area 그룹) + 변경 카운터
- **인터랙션**: 토글 스위치, dependency 경고, "Copy diff" / "Copy full JSON" / Reset
- **시각화**: 그룹별 토글 리스트 + 경고 alert + JSON 코드블록 (변경분 highlight)
- **쿼리 매핑 예시**: "feature flag 편집 UI", "config 일부 켜고 diff"
- **차용 난이도**: **medium** — 토글 + JSON diff

#### H3. Prompt tuner

- **파일**: `20-editor-prompt-tuner.html`
- **URL**: https://thariqs.github.io/html-effectiveness/20-editor-prompt-tuner.html
- **데이터 형태**: 프롬프트 템플릿 (`{{slot}}` 문법) + 샘플 입력 N개 + 토큰 카운트
- **인터랙션**: 좌측 편집 → 우측 N개 sample 실시간 재렌더, slot highlight, Copy / Reset
- **시각화**: 2분할 (editor / preview) + slot underline + 토큰 카운터
- **쿼리 매핑 예시**: "프롬프트 편집기 + 미리보기", "템플릿 테스트", "변수 슬롯 채워서 결과"
- **차용 난이도**: **medium** — template 파싱 + 라이브 렌더

## 3. 분류 매트릭스 — 데이터 형태 × 시각화

LLM 이 사용자 쿼리에서 (a) 입력 데이터의 형태와 (b) 원하는 시각화를 식별한 후, 이 표로 후보 템플릿을 빠르게 좁힌다.

| 데이터 형태 \ 시각화 | 텍스트+코드 | 표/매트릭스 | 차트 (bar/timeline) | 다이어그램 (graph/flow) | 인터랙티브 (toggle/slider) | 라이브 캔버스 (DnD/Sim) |
|---|---|---|---|---|---|---|
| **N개 옵션 비교** | A1 | A1, B4 | — | — | A2, B4 | — |
| **코드 변경/diff** | B1, D4 | D4 | — | — | B1 | — |
| **시스템 구조/플로우** | F1 | — | — | B2, E1, E2, G1 | E2 | — |
| **시계열 이벤트** | D3 | D2 | D2 (bar) | D3 (timeline) | — | — |
| **계층/그룹 목록** | — | D2 | — | — | H2 | H1 |
| **상태 머신/애니메이션** | C1 | — | — | — | C1 | C2 |
| **알고리즘/시뮬레이션** | F2 | F2 | — | F2 (ring) | F2 | F2 |
| **디자인 토큰/컴포넌트** | — | B3 | — | — | B3, B4 | — |
| **템플릿+샘플 입력** | H3 | — | — | — | H3 | — |
| **계획/마일스톤** | G1 | G1 | G1 (timeline) | G1 | — | — |
| **N개 화면 시퀀스** | — | — | — | — | D1 | C2 |
| **장식·삽화 자체** | — | — | — | E1 | — | — |

읽는 법: 쿼리에서 "비교"가 핵심 + 출력이 표 형태면 → A1 / B4 후보. "장애 회고" 면 시계열+다이어그램 행 → D3. 한 셀에 여러 템플릿이 있으면 데이터 도메인으로 추가 좁힘 (예: "코드 비교"면 A1, "디자인 비교"면 A2).

## 4. 재구현 vs 차용 결정 가이드

기본 원칙 (라이선스 문서의 권장 (c) 와 일치): **컨셉 참고 + 재구현이 디폴트**. 단 아래 경우 (b) 부분 차용 또는 (a) 통째 fork 가 더 효율적.

| 템플릿 | 권장 경로 | 이유 |
|---|---|---|
| A1 Three approaches | **재구현** | 정적 구조, 매번 다르게 짜는 게 자연스러움 |
| A2 Visual directions | **재구현** | 사용자 도메인 톤에 맞춰 매번 새로 |
| B1 PR diff | **부분 차용** | diff 렌더링 CSS 는 검증된 패턴, 재발명 비효율 |
| B2 Module map | **재구현** | 다이어그램은 매번 다른 구조 |
| B3 Design system | **부분 차용** | swatch / typo specimen 패턴 표준화 가치 |
| B4 Component variants | **부분 차용** | hover→code preview 패턴 유용 |
| C1 Animation sandbox | **부분 차용** | easing/duration 슬라이더 + copy CSS 구조 재사용 |
| C2 Clickable flow (DnD) | **부분 차용** | DnD 로직 매번 재작성하면 버그 위험 높음 |
| D1 Slide deck | **부분 차용** | 키보드 nav 100줄 패턴, 안정성 가치 |
| D2 Weekly status | **재구현** | 매주 데이터 다름, 구조만 참고 |
| D3 Incident timeline | **재구현** | 매 사건마다 구조 다름 |
| D4 PR writeup | **재구현** | 정적 문서, 매번 다른 PR |
| E1 SVG figures | **재구현** | 그림은 매번 다르게 |
| E2 Flowchart | **부분 차용** | 박스/화살표 라우팅은 재사용 |
| F1 Feature explainer | **재구현** | 콘텐츠 위주, 구조만 참고 |
| F2 Concept explainer | **부분 차용** | 시뮬레이션 셸 (slider + reset + 비교 테이블) 패턴 재사용 |
| G1 Implementation plan | **재구현** | 매번 다른 plan, 구조만 참고 |
| H1 Triage board | **부분 차용 또는 fork** | DnD + Copy-as-markdown 검증된 코드 가치 큼 |
| H2 Feature flags | **부분 차용** | 토글 + JSON diff 패턴 재사용 |
| H3 Prompt tuner | **부분 차용** | 템플릿 파서 + live render 재사용 |

**fork 후보 (통째 가져올만한 것)**: H1 (triage 보드 — DnD 코드가 가장 무겁고 검증값 높음). 나머지는 단일 파일이라 부분 차용으로 충분.

**부분 차용 시 의무** (라이선스 문서 §2.b): 파일 헤더 출처 주석 + repo 루트 `THIRD_PARTY_LICENSES.md` 또는 README 섹션 1개.

**재구현 시 매너**: README 에 "Inspired by ThariqS/html-effectiveness" 한 줄 권장 (라이선스 의무 0).

**전체 분포**: 재구현 11개 / 부분 차용 8개 / fork 후보 1개 — 디폴트는 컨셉 참고지만, "검증값 높은 인터랙션 로직" (DnD, 슬라이더+sim, JSON diff, 키보드 nav) 은 부분 차용 추천.
