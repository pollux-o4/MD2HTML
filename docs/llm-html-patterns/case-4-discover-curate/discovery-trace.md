# Discovery Trace — Stage 1

**Query**: *"성능 개선 관련 결정 — 인터랙티브 HTML 로 보여줘"*

## 입력 (LLM 이 받았다고 가정한 메타데이터)

50개 .md, 각각 *경로 + 제목 + 첫 200자*. 총 약 8KB.

## 신호 (signals) 사용

| 신호 | 가중치 | 비고 |
|---|---|---|
| 제목/파일명에 "performance" / "perf" / "slow" / "caching" / "lazy" / "tuning" | 강 | 명시적 키워드 |
| 본문 첫 200자에 "성능", "속도", "ms", "느림", "최적화", "벤치마크" | 중 | 본문 hint |
| 경로가 `docs/adr/` | 강 | "결정" 단어 = ADR 매칭 |
| 경로가 `docs/scratch/` 이고 perf 힌트 | 약 | 결정 아니지만 컨텍스트 |
| 경로가 `archive/legacy/` 이고 perf 힌트 | 약 | 폐기됐지만 컨텍스트 |
| handoff 에 "성능 개선" 명시 | 중 | 메타 narrative |

## 후보 선정 (7개)

| 순위 | 경로 | 점수 사유 |
|---|---|---|
| 1 | `docs/adr/ADR-008-performance-tuning.md` | 제목 직격 + ADR |
| 2 | `docs/adr/ADR-009-caching-strategy.md` | 캐싱 = 성능 + ADR |
| 3 | `docs/adr/ADR-010-lazy-evaluation.md` | lazy = 성능 + ADR |
| 4 | `docs/handoff/q2-handoff.md` | "성능 개선 1차" 명시 + 메트릭 |
| 5 | `docs/references/benchmark-results.md` | 벤치마크 = 성능 근거 |
| 6 | `docs/archive/legacy/legacy-004-old-perf.md` | 폐기된 시도 = 결정 배경 |
| 7 | `docs/scratch/idea-009-perf.md` | 미래 백로그 (Web Worker) |

탈락 예시:
- `idea-002-perf.md`, `idea-005-slow.md` — 너무 짧고 ADR 까지 안 간 메모. 우선순위 낮춤
- `ADR-001-decimal-precision.md` — 성능 *원인* 이지만 결정 자체는 정밀도 결정. 본문에 포함 가능성 있지만 1차에서 제외
- `architecture-overview.md` — 시각화 시 도움 되지만 메타데이터만으로는 perf 결정 판단 어려움

## 출력 (Stage 2 에 넘길 페이로드)

상위 7개 *전체 본문*. 총 약 5KB.
