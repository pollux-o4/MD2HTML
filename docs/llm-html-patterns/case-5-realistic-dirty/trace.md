# Trace — Case 5 (실제 LLM 도구 사용)

쿼리: *"이 repo 의 성능 개선 결정 인터랙티브 HTML 로 만들어 줘"*

대상: `mock-repo/` 138개 .md (구조 사전 정보 없음).

---

## 시간 순서 도구 호출

| # | 도구 | 인자 | 결과 | 의도 |
|---|------|------|------|------|
| 1 | Glob | `**/*.md` (mock-repo) | 138 경로 (104까지만 truncated 표시, 실제 138개) | "어떤 디렉토리 구조인가?" repo 지형 파악. |
| 2 | Read | `mock-repo/CLAUDE.md` (9줄) | "ADRs in `docs/adr/`. perf = ADRs 0008/0011/0014" 직접 명시 | repo 루트의 agent 안내 파일 — 가장 신뢰도 높은 entry point. |
| 3 | Grep | `performance\|perf\|latency\|caching\|P99\|throughput\|index\|lazy` (-i, files_with_matches) | 28 파일 매치 | CLAUDE.md 의 힌트를 *검증* + 누락된 결정 없는지 cross-check. |
| 4 | Read | `mock-repo/CONTEXT.md` (10줄) | 도메인: Phoenix, 2M orders/day, P99 hot path 200ms SLA | 결정의 *왜* (성능 컨텍스트) 이해. |
| 5 | Read | `mock-repo/CHANGELOG.md` (9줄) | 2025-Q1 caching (ADR 0008), Q2 lazy eval (0011), Q3 index (0014) | Triangulation — CLAUDE.md 와 일치 확인. |
| 6 | Read | `docs/adr/0008-caching-strategy.md` (38줄) | 본문 확보 | 핵심 결정 1. |
| 7 | Read | `docs/adr/0011-lazy-evaluation-cart-pricing.md` (40줄) | 본문 확보 | 핵심 결정 2. |
| 8 | Read | `docs/adr/0014-orders-table-index-pass.md` (41줄) | 본문 확보 | 핵심 결정 3. |
| 9 | Read | `docs/handoff/2025-02-perf-investigation.md` (16줄) | Maya, ADR 0008 origin 노트 | 결정의 사람·일정 색칠. |
| 10 | Read | `docs/handoff/2025-05-cart-pricing.md` (11줄) | Joon, ADR 0011 loose ends | 결정의 사람·일정 색칠. |
| 11 | Read | `docs/handoff/2025-08-orders-index.md` (10줄) | Priya, ADR 0014 followups | 결정의 사람·일정 색칠. |
| 12 | Read | `scratch/perf-notes.md` (12줄) | 세 ADR 모두의 origin idea — 한 사람의 1차 노트 | 결정의 "씨앗" 확인. |
| 13 | Read | `experiments/2025/rust-rewrite-pricing.md` (4줄) | "기각, lazy eval 선택" | grep 매치 후보 — 결정인지 확인 → 아님 (대안). |
| 14 | Read | `experiments/2025/cache-warmup-on-deploy.md` (4줄) | "filed, 추구 안 함" | 동상 — 결정 아님. |
| 15 | Read | `archive/legacy-2023/perf-2023-q4-postmortem.md` (5줄) | "DEPRECATED" | 동상 — 명시적으로 deprecated. |

---

## 잘못 간 길

**0회**. CLAUDE.md 가 entry point 로서 정확한 ADR 번호를 지목했고, grep 으로 cross-check 됐으므로 false trail 없음.

엄밀히는 13~15 (3회 Read) 는 *"무관임을 확인하기 위한 negative check"* — 잘못 간 길은 아니지만 "원래 결정인지 의심됐던 파일을 직접 열어 기각"하는 비용은 발생.

## 합산

- 도구 호출: **15회** (Glob 1 + Grep 1 + Read 13)
- 읽은 파일: 13개 (.md)
- 총 읽은 줄 수: 약 **220줄**
- Glob 결과: 138 경로 (≈ 8KB)
- Grep 결과: 28 파일명 (≈ 2KB)

대략 토큰: Glob+Grep 출력 합 ≈ 2,500 토큰, Read 220줄 ≈ 2,000 토큰, 총 입력 측 **≈ 4,500 토큰**.

## 만약 CLAUDE.md 안내가 없었다면?

추정 시나리오:
- Grep 28 매치 중 `scratch/`, `weekly/`, `notes/` 다수 — 일일이 Read 해서 노이즈 vs 결정 분류 필요했을 것 (추가 10~15 Read).
- `docs/adr/` 디렉토리 발견 후에도 ADR 15개 중 perf 관련 3개 선별하려면 각 ADR 의 첫 줄/title 정도는 봐야 함.
- 최소 **+15 Read**, **+1,500 줄** 정도 더 소비 추정.
