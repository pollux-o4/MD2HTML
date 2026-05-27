# Self-Observation: Case 1 (단일 ADR → 인터랙티브 HTML)

## (a) 정보 매핑 — mock 섹션 → HTML 영역

| Mock 섹션 | HTML 영역 |
|---|---|
| 제목 + Status | `<header>` 의 h1 + accepted badge |
| Context (본문 + 인터뷰 수치) | 1문단 요약 + 대안 4개는 `<details>` 접힘 |
| Decision (텍스트 + ts 코드) | h2 + before/after 2-column diff |
| Consequences Positive/Negative | 2-column card grid (좌: 초록, 우: 빨강) |
| Neutral 항목 | 버림 (low signal) |
| Affected Code (5 bullet) | 5 개 collapsible 카드 (파일경로 = 헤드, 설명 = body) |
| Migration 4단계 | `<details>` 접힘 |
| References | 버림 |

## (b) 구조 패턴

`Header (title + status badge + actions) → Context (요약 + 접힘 디테일) → Decision (diff 블록) → Consequences (2-col grid) → Affected Code (아코디언 리스트) → Migration (접힘) → Toast`.

3단 정보 위계 = **항상 보이는 핵심** / **카드로 분리된 비교** / **접힘 디테일**.

## (c) 컴포넌트 종류

- Status badge (정적, 색상 코드)
- Copy / Share 버튼 (clipboard API + toast)
- Before/After diff (2-col grid, 색 배경)
- Pos/Neg consequence cards (좌측 border 색)
- Collapsible code-ref cards (JS toggle, chevron 회전)
- `<details>` 네이티브 접힘 (대안 검토, Migration)
- Toast (fixed bottom, 1.5s)

## (d) 입력 컨텍스트 처리 방식

**선택적 추출 + 요약 + 재배치**. 100줄 mock 의 약 60% 만 사용. Context 산문은 한 문단으로 압축, 대안 4개는 라벨만 보존. 코드 블록은 그대로 살림. References / Neutral 섹션은 버림. Migration 은 PR 번호 위주로 축약.

## (e) 토큰 효율 — 진짜 필요했던 부분

**필수 (50%)**: 제목, Status, Decision 한 줄, Positive/Negative 불릿, Affected Code 파일경로, before/after 코드.

**잘려도 OK (50%)**: Context 산문 (수치 1개만 살리면 됨), 대안 검토 4번 항목 설명, Migration 본문, References, Neutral, 각 Affected 항목의 부가 설명.

특히 *산문체 설명* — 카드/배지로 시각화하면 본문 텍스트가 잉여가 된다.

## (f) md-show-me 가 사전 가공할 만한 것

1. **시맨틱 라벨링** — ADR 의 표준 섹션 (Status / Context / Decision / Consequences / Affected) 을 frontmatter 나 구조화된 JSON 으로 추출해 LLM 에 넘기면, LLM 은 "어느 섹션이 카드, 어느 섹션이 접힘" 판단 비용을 절감.
2. **불릿 ↔ 카드 힌트** — Positive/Negative 같은 대조 쌍은 자동으로 "2-col grid 추천" 메타 부착.
3. **코드 참조 파싱** — `path:line-range` 패턴을 미리 추출해 배열로 전달 (LLM 이 정규식 파싱 안 해도 됨).
4. **버릴 섹션 사전 표시** — References / Migration 같은 보일러플레이트는 `display: optional` 태그 달아두면 LLM 이 토큰 안 쓰고 스킵.
5. **diff 후보 감지** — "X 대신 Y" / before-after 키워드 보이면 before/after 블록 슬롯 미리 마련.
6. **상태 배지 매핑** — Status 값 (Accepted/Proposed/Deprecated) → 색상 토큰 사전 정의.

핵심: LLM 의 일은 *디자인 결정* 이고, *파싱·추출* 은 도구가 미리 해주면 토큰 30~40% 절감 가능.
