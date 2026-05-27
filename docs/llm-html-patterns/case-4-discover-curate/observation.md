# Self-Observation — Case 4

## (a) 디스커버리 단계

50 .md 의 *경로 + 제목 + 첫 200자* (~8KB) 만 보고 좁혔다. 사용한 신호:

1. **파일명 키워드 매칭** (가장 강) — `performance`, `caching`, `lazy`, `perf`, `slow`, `tuning`. 4개 ADR + 3개 scratch 즉시 후보.
2. **경로 prefix 가중** — `docs/adr/` = "결정" 쿼리에 직격. `docs/scratch/` 는 메모라 약함. `archive/legacy/` 는 폐기됐어도 컨텍스트.
3. **본문 prefix 의미 매칭** — "성능 개선 1차" (q2-handoff), "p95 21ms → 4ms" (benchmark) 같은 정량 표현이 hits.
4. **상호 참조 hint** — ADR-008 첫 200자에 "ADR-001 이후 10x 느려짐" 이 명시되어 ADR-001 을 *원인 컨텍스트* 로 묶음.

탈락은 *길이 + ADR 미승격* 으로 결정: idea-002/005 는 짧은 메모라 7위 안에서 잘림.

## (b) 큐레이션 단계

선정 7개 전체 본문을 받아 *역할* 을 분류했다:

- **핵심 결정 3개** (ADR-008/009/010) — 시간순 의존 체인
- **메트릭 근거 2개** (q2-handoff, benchmark) — 임팩트 정량화
- **배경 1개** (legacy-004) — 폐기 시도, fold 처리
- **미래 1개** (idea-009) — 백로그, 점선 박스로 시각 구분

통합 키는 *시간축* + *의존 그래프*. ADR 간 "Related" 섹션이 그래프 edge 의 ground truth 였다.

## (c) 형식 추론

모호 쿼리 *"성능 개선 결정 보여줘"* 에서 추론:

- "결정" 복수 → **타임라인** (시간 흐름 자연)
- 결정 간 인과 ("ADR-001 → ADR-008") → **의존 그래프**
- "성능" + 정량 데이터 (ms, x배) → **메트릭 strip** 상단
- "인터랙티브" 명시 → **뷰 스위처** (timeline/graph/list 3 모드)

단일 형식 (예: 표) 으로 가면 시간 또는 관계 중 하나가 잘려서 멀티뷰 선택.

## (d) 컴포넌트 종류

- 상단 metric strip (4 카드, before→after)
- 뷰 스위처 (탭 3개)
- 타임라인 (수직 선 + 색 dot + 카드)
- SVG 의존 그래프 (노드 + 화살표)
- 접힘 details (전체 본문, 폐기 배경)
- 클릭 highlight + 뷰 간 jump

CDN: Tailwind 만. JS 는 vanilla, ~20 줄.

## (e) 토큰 효율 (핵심)

| 단계 | 입력 크기 | 비고 |
|---|---|---|
| Raw repo 전체 | ~25KB (50 .md) | LLM 에 전부 주면 낭비 + 노이즈 |
| Stage 1 메타데이터 | ~8KB | 경로+제목+첫 200자 |
| Stage 2 큐레이션 입력 | ~5KB | 후보 7개 전체 본문 |
| HTML 생성 출력 | ~12KB | 인터랙티브 |

**관찰**: 25KB → 8KB → 5KB 의 funnel 이 핵심. 메타데이터만으로 86% 잘라내고, 본문은 14% 만 풀로 본다. 모호 쿼리일수록 메타데이터 quality 가 결정적.

## (f) 우리 도구가 사전 가공할 만한 것

`md-show-me` BM25+embedding 이 LLM 에 넘길 때 *이 형식* 이 가장 효율적:

```yaml
candidates:
  - path: docs/adr/ADR-008-...md
    title: Performance Tuning Baseline
    score: 0.92  # BM25+cosine 결합
    excerpt: "decimal.js 도입 이후 21ms..."  # 첫 200자
    refs: [ADR-001, ADR-009, ADR-010]  # 본문에서 추출된 cross-link
    kind: adr  # 경로 기반 분류 (adr/scratch/handoff/...)
    date: 2025-04-05  # frontmatter or git log
```

특히 `refs` 와 `kind` 두 필드가 LLM 의 *큐레이션 + 형식 추론* 을 단축시킨다 — LLM 이 본문 안에서 "Related" 섹션을 다시 파싱 안 해도 그래프 edge 가 즉시 나옴. `kind` 는 "ADR 결정 vs scratch 아이디어" 의 시각 위계 (실선 vs 점선) 를 자동화.

또한 BM25 후보 top-N 에 *항상* `kind: handoff` 1개 + `kind: archive` 1개 를 보장 inject 하면 LLM 이 "메트릭 근거" 와 "폐기 배경" 같은 narrative layer 를 빠뜨리지 않는다.
