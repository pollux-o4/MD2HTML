# Tariq 20 demo × 쿼리 매핑

LLM 이 사용자 쿼리 보고 아래 표에서 적합한 demo 1개 또는 여러 개를 선택해, 그 *layout 패턴* 을 차용해서 우리 inline HTML/CSS 로 재구현한다. **HTML 자체를 vendoring 하지 않고 패턴만 차용.**

원본: https://github.com/ThariqS/html-effectiveness (Apache 2.0, © 2026 Anthropic PBC).
사용자 환경에 clone 되어 있다면 `external/html-effectiveness/` 에서 직접 확인 가능.

## 매핑 표

| Tariq demo | 우리 도구 쿼리 예시 | 차용 핵심 |
|---|---|---|
| 01 exploration-code-approaches | "X 구현 방식 비교 / 옵션 트레이드오프 / N가지 방법" | N-up 비교 컬럼 (헤더 num pill + 본문 + chip footer + 추천 좌측 띠) |
| 02 exploration-visual-designs | "디자인 옵션 / 여러 안 보여줘" | sticky 토글 + 2×2 아트보드 (테마 토큰 swap) |
| 03 code-review-pr | "이 PR 리뷰 / 코드 diff / 변경점 영향도" | diff 헝크 3-col grid (라인번호 / +- / 코드) + risk-map chip (safe/medium/attention) + 마진 코멘트 |
| 04 code-understanding (Module map) | "이 패키지 구조 / 인증 흐름 / X 어떻게 동작" | main+sidebar grid + SVG 박스 다이어그램 (hot 강조) + 단계 배지 타임라인 + gotchas callout (좌측 띠) |
| 05 design-system | "디자인 토큰 / palette / type scale" | 스와치 그리드 + 타입스케일 row + 스페이싱 자 |
| 06 component-variants | "컴포넌트 변형 / state matrix" | sticky 토글 toolbar + 3×N 카드 그리드 + 라이브 토큰 슬라이더 |
| 07 prototype-animation | "애니메이션 / micro-interaction / 이징 조정" | micro-interaction stage + easing 패널 + 슬라이더 |
| 08 prototype-interaction | "드래그 UX / 클릭 흐름 / 화면 전환" | drag 핸들 + drop indicator (clay 줄) + open questions 박스 |
| 09 slide-deck | "발표용 / 슬라이드 / 진행 상황 슬라이드" | scroll-snap 풀스크린 슬라이드 + invert(dark) 섹션 + ship list + 진행률 |
| 10 svg-illustrations | "일러스트 / 다이어그램 figure / 도식" | figure + figcaption + download 액션 + 팔레트 strip |
| 11 status-report | "주간 보고 / 진행 상황 / 이번주 / 통계" | auto-pill + summary band (stat 카드 4-up, warn 좌측 띠) + highlights bullet + shipped table |
| 12 incident-report | "장애 보고 / post-mortem / timeline" | inc-id mono + sev/resolved/neutral pill + dark TL;DR 블록 + 세로 timeline (dot 색 다름) |
| 13 flowchart-diagram | "X 흐름 / 파이프라인 / 배포 절차" | SVG flow node (term 둥근 / gate 다이아) + 색 edge (yes olive / no rust dashed) + 우측 sticky aside |
| 14 research-feature-explainer | "X 어떻게 동작 (긴 설명서) / rate limiting / explainer" | 좌측 sticky nav (l1/l2 들여쓰기 + files mono) + TL;DR 좌측 띠 + details collapsible + mono 탭바 + callout |
| 15 research-concept-explainer | "개념 설명 / 가르쳐줘 / consistent hashing" | glossary aside (term 점선 hover → highlight) + 인터랙티브 SVG ring + 슬라이더 + readout + 비교 table |
| 16 implementation-plan | "이거 어떻게 만들 거야 / 마일스톤 / 계획 / data flow / risks" | prompt-box 헤더 + summary 4-cell + 수직 milestone 타임라인 (dot done/pending) + data-flow diagram + tag chip + open questions |
| 17 pr-writeup | "이 PR 설명 / motivation / before-after / file tour" | pr-meta mono + add/del 통계 + TL;DR + before/after 2-panel (after olive border) + file-tour details + 우측 TOC |
| 18 editor-triage-board | "이슈 triage / 칸반 / 할 일 정리 / now-next-later-cut" | 4-column kanban (컬럼 상단 컬러 띠) + drag dragover dashed outline + filter chip + copy 버튼 |
| 19 editor-feature-flags | "feature flag 상태 / 토글 / 의존성" | flag row + 토글 스위치 + warn 좌측 띠 + req-chip 의존성 + warning banner |
| 20 editor-prompt-tuner | "프롬프트 다듬기 / 변수 슬롯 / template tuning" | contenteditable editor + slot 하이라이트 (oat / warn dashed) + legend chips + copy(copied state) |

## 차용 규칙

1. **패턴만 차용, HTML 자체 vendoring X** — 우리 inline HTML/CSS 로 재구현. 우리 토큰 (color/typography/spacing) 적용.
2. **베이스라인 3 항상 inject** — 인용 카드 (N1) + 역참조 배지 (N+5) + copy-as-prompt 오버레이 (N+4). Tariq 패턴은 위 베이스라인 위에 얹는다.
3. **AI 답 톤 차단 5룰 적용** — 음차 / 한자어 / 번역체 / em dash / 지식의 저주 차단. SKILL.md "출력 글 톤" 섹션 참조.
4. **한 페이지 = 1 demo 또는 여러 demo 조합** 자유. LLM 이 쿼리 보고 판단.
5. **라이트 디폴트** + `prefers-color-scheme: dark` 자동 감지.
6. **인라인 only** — 외부 호출 0. CDN 라이브러리는 사용자 명시 허용 시만.

## 매핑 예시

- "이 ADR 적용 후 코드 어디 변함?" → demo 03 (diff hunk) + demo 17 (before/after) 조합
- "이번 주 진행 상황 알려줘" → demo 11 (status report) — stat 카드 + shipped table
- "이 인증 어떻게 동작해?" → demo 04 (module map) + demo 14 (explainer 좌측 nav) 조합
- "이거 만들려면 어떻게?" → demo 16 (implementation plan) — milestone + data flow + risks
- "이 PR 의 변경점 / 위험도" → demo 03 (PR review) — risk-map chip + diff hunk
- "장애 정리해줘" → demo 12 (incident timeline) — TL;DR + 세로 timeline + 상태 pill

원본 demo 가 사용자 환경에 없으면 패턴 이름만 보고 LLM 이 추론. 단 시각 reference 가 있으면 일관성 ↑.
