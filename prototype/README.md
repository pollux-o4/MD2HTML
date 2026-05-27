# md-show-me · M3 UI Prototype

정적 prototype. `file://` 로 `index.html` 더블클릭하면 열림. 5개 차원 토글로 60가지 조합 즉시 비교.

## 여는 법

1. `prototype/index.html` 더블클릭 (Chrome / Firefox)
2. 상단 toolbar 의 토글로 차원별 변형 전환
3. URL hash 자동 동기화 (예: `#1B2A3B4B5normal`) — 새로고침해도 유지, 공유 가능

## 5개 차원 trade-off

### 차원 1: Copy / Save 버튼

| 변형 | 설명 | 장점 | 단점 |
|------|------|------|------|
| A | 단일 `[Copy & Save]` | 결정 단순, 액션 1번 | "Save 만" / "Copy 만" 불가 |
| B | 분리 `[📋 Copy]` `[💾 Save]` | 의도 명확, 유연함 | 액션 늘어남, UI 가로 폭 더 씀 |
| C | 분리 + `[👁 View Saved]` | Saved 추적 쉬움 | 카드당 3버튼 = 시각적 노이즈 |

### 차원 2: Source-updated 알림

| 변형 | 설명 | 장점 | 단점 |
|------|------|------|------|
| A | Top banner | 첫눈에 인지, 강한 신호 | 매번 거슬림, 자주 변경 시 banner 피로 |
| B | Inline chip | 정확한 위치 (어느 카드?) 표시 | 모르고 지나갈 수 있음 |
| C | Corner toast | 비방해, 5초 자동 소멸 | 잠깐 보고 놓치면 끝 |
| D | Silent + footer | 가장 비방해, 노이즈 0 | stale 사실상 인지 불가 |

### 차원 3: Top 5 카드 레이아웃

| 변형 | 설명 | 장점 | 단점 |
|------|------|------|------|
| A | Vertical list | 가독성 best, excerpt 길어도 OK | 스크롤 길어짐 |
| B | 2-column grid | 한 화면에 다 보임 | excerpt 잘리거나 카드 높이 불균일 |
| C | Accordion | 매우 compact, 필요 시만 열기 | 클릭 1번 더 필요, excerpt preview 없음 |

### 차원 4: Match strength

| 변형 | 설명 | 장점 | 단점 |
|------|------|------|------|
| A | 라벨 + 색 (strong/medium/weak) | 색으로 즉시 인식, 한국어 친화 | 점수 정밀도 표현 X |
| B | 점수 + 막대 (0.87 + ▰▰▰▰▱) | 정확함, 비교 용이 | 숫자가 추상적 (0.87 = 강함?) |
| C | 별 (★★★) | 직관적, UI 깔끔 | 정밀도 낮음 (3단계만) |

### 차원 5: Empty / Error state

- **normal**: 정상 top 5
- **empty**: 0매치. 쿼리 개선 suggestion 표시
- **offline**: LLM rerank 실패. BM25+embedding fallback 결과 + 경고 banner
- **firstrun**: M0 profile 없음. `/show-me-setting init` CTA

## 기술 스택

- `marked` (CDN, markdown 렌더용 — 본 prototype 에서는 excerpt 만 평문 사용)
- `github-markdown-css` (CDN, body 스타일)
- Vanilla JS, no build step

## 코드 사이즈

| 파일 | 줄 수 |
|------|-------|
| index.html | 19 |
| style.css | 59 |
| app.js | 216 |
| mock-data.js | 136 |
| **합계** | **430줄** |

`< 600줄` 제약 충족.

## 추천 조합

`#1B2A3A4A5normal`

- 1B: Copy/Save 분리 (사용자 의도 명확)
- 2A: Top banner (stale 인지 안 놓치게)
- 3A: Vertical list (가독성 우선, M3 단계는 정보 밀도보다 신뢰감)
- 4A: 라벨 + 색 (한국어 사용자 친화, 점수 노이즈 X)
- 5normal: 정상 케이스 디폴트
