---
id: review-md-show-me-milestone-5-refresh-rescan
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-milestone-5-refresh-rescan.md
verdict: approve-with-changes
prd_readiness: needs-2-patches
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
revision_round: 2 (신설 milestone)
---

# Review: Milestone 5 — Refresh and Rescan

## verdict

**approve-with-changes** — 1차 P0 "refresh가 신규 파일 silent miss" 정확히 해소. refresh/rescan 분리로 사용자 멘탈모델 정합, Strategy §7 성공 기준 6번 충족 라인 확보. source 삭제/hash 변경/heading 깨짐 경고 ✓. 남은 결함은 본문 vs CONTEXT.md 3-way 정합 충돌과 rescan 후 dangling review 사용자 알림 부재 2건.

---

## P0

### P0-1 — Refresh의 profile-fresh 검사 여부 3-way 불일치

본문 §"Refresh" 동작 1-5번에 **profile 검사 단계 없음**. 그러나:
- §"완료 기준" 마지막 "M0 profile이 stale이면 먼저 자동 갱신한다" — refresh/rescan 둘 다인지 rescan만인지 모호.
- CONTEXT.md M5: "Both first ensure the project profile is fresh" — 둘 다.
- Strategy §3 M5: profile 언급 없음.

→ 본문 vs CONTEXT.md 충돌. 의미 분석: profile stale인데 refresh만 하면 role-aware filtering이 옛 정책으로 동작 → 깨짐. **refresh도 profile 검사가 맞음**.

**필요**: §"Refresh" 동작 0번 추가 — "M0 profile stale 검사 (hash 비교, full rebuild는 stale 시만)". 또는 §"공통 prelude" 신설. §"완료 기준" 마지막 줄 "두 명령 모두" 명시. CONTEXT.md와 정합.

### P0-2 — Rescan 후 dangling review 사용자 경고 없음

§"Rescan" 동작은 source 목록 변경 명시. 그러나 기존 M3 review가 사라진 source 가리키면 dangling — M4 `source_missing` fail로 잡히지만 **rescan 시점에 사용자 경고 없음**. M3가 0-persistence라 다시 작성도 불가.

**필요**: §"Rescan" 또는 §"완료 기준"에 "rescan 결과에 manifest diff(removed/added/changed sources)와 removed sources에 대한 pending review가 있을 수 있다는 알림 포함".

---

## P1

### P1-1 — Heading/block 깨짐 검출 임계 미정

§"Refresh" 4번 "heading/block 깨졌으면 경고" — 1개만 사라져도? 모두? 깨짐 시 refresh 진행 vs 중단?

**필요**: "manifest 기록 `major_headings` / `block_ids` 중 사라진 항목 모두 나열. refresh는 진행, 해당 anchor는 stale 표시".

### P1-2 — 삭제된 source 보존 vs 제거 정책

기존 source 삭제 시 manifest에서 즉시 빼는지 유지하며 경고만인지 침묵.

**필요**: "삭제된 source는 manifest에 `removed: true` 표시. 다음 rescan에서만 실제 제거" — M4 `source_missing` fail과 짝.

### P1-3 — 결과 표시 방식 미정

§"완료 기준" "두 명령 결과 차이가 사용자에게 표시" — CLI stdout? HTML banner? 침묵.

**필요**: "refresh 결과: '5개 source 중 2개 갱신, 1개 heading 깨짐'. rescan 결과: '7개 중 3개 추가, 1개 제거, 1개 pending review dangling'. stdout + report.html 상단 banner".

### P1-4 — `render_mode` 보존 (M1 의존)

M1 manifest에 `render_mode` 필드 추가되면(M1 P1-1) M5 refresh가 보존해야 사용자 명시 full render 유지됨.

**필요**: §"Refresh" 3번에 "기존 source의 `render_mode`를 보존한 채 갱신" — M1 패치와 짝.

---

## 문서에서 고칠 위치

| 위치 | 현재 | 권장 |
|---|---|---|
| §"Refresh" 동작 | 1-5번 (profile 검사 없음) | 0번 신설 "M0 profile stale 검사 (hash 비교, full rebuild는 stale 시만)" — CONTEXT.md와 정합 |
| §"완료 기준" 마지막 줄 | "M0 profile stale이면 먼저 갱신" | "두 명령 모두 M0 profile fresh 검사" |
| §"Rescan" 동작 | 1-4번 | + "manifest diff 출력 (removed/added sources). removed에 대한 pending review 경고" |
| §"Refresh" 4번 | "heading/block 깨졌으면 경고" | + "manifest의 `major_headings` / `block_ids` 중 사라진 항목 모두 나열. refresh 진행, 해당 anchor stale 표시" |
| §"Refresh" 5번 | "새 문서 포함하지 않는다" | + "삭제된 source는 `removed: true` 표시. 다음 rescan에서만 실제 제거" |
| §"완료 기준" 결과 표시 | "차이가 사용자에게 표시" | + stdout + report.html 상단 banner 구체화 |
| §"Refresh" 3번 | "excerpt/full render 다시" | + "기존 source `render_mode` 보존" (M1 패치와 짝) |

---

## PRD 진입 가능 여부

**2건 패치 후 PRD 진입 가능**:
1. P0-1: §"Refresh" 동작에 profile-fresh 검사 0번 추가 — CONTEXT.md / Strategy / 본문 3-way 정합.
2. P0-2: §"Rescan"에 manifest diff + dangling review 경고 1줄 추가.

P1 4건은 PRD 작성 중 본문 2-3줄로 해결.

comfyui 통용성: `notes/issues/`에 issue 빈번 추가, `notes/sage-tests/RESULTS.md` 자주 갱신 — refresh/rescan 분리의 실제 가치 케이스. 단 두 명령 차이 결과 표시(P1-3) 보강이 comfyui PowerShell stdout 환경에서 절실.
