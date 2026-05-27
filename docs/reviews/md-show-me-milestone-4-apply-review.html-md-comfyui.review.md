---
id: review-md-show-me-milestone-4-apply-review
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-milestone-4-apply-review.md
verdict: approve-with-changes
prd_readiness: needs-2-patches
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
revision_round: 2 (신설 milestone)
---

# Review: Milestone 4 — Apply Review

## verdict

**approve-with-changes** — 1차 P0 "apply-review가 4 milestone 어디에도 없음" 정확히 해소. anchor 검증 + 4 실패 enum + 자동 수정 금지 모두 Strategy §3.4/§7.3 정합. Strategy §7 성공 기준 5번 충족 라인 확보. 남은 결함은 ambiguous 시 결정 규칙과 context package 크기 정의 2건.

---

## P0

### P0-1 — `anchor_ambiguous` 시 occurrence 선택 규칙 부재

§"동작" 5번 + §"실패 처리". "같은 문장이 여러 번 나오면 occurrence index를 함께 출력"이라고만 함 — 다음 에이전트가 어느 occurrence를 선택해야 하는지 미정 → 비결정적.

검증: comfyui `CLAUDE.md`에 `## Hard rules` 두 번 등장(Z-Image-specific / 프로젝트 conventions) — 실제 발생 케이스.

**필요**: "`weak_anchor: false`이면 first occurrence 자동 적용 + heading 가장 가까운(line distance 최소) 선호. `weak_anchor: true`이면 `anchor_ambiguous` fail로 간주, occurrence 후보 N개 출력 + 사용자가 review context 재작성 안내". 결정성+안전 균형.

### P0-2 — `surrounding_context` 정의 부재

§"Context Package" example에 `surrounding_context: ...` placeholder만 있고 정의 없음. anchor paragraph만? 앞뒤 1 paragraph? heading section 전체? block 전체?

검증: comfyui `docs/adr/0001-distribution-choice.md`의 `## Decision` section ~2000자 — heading 전체 dump 시 다음 에이전트 token 부담 큼. `notes/issues/0027-*.md`처럼 작은 section은 다른 처리 필요.

**필요**: 3분기 규칙 — "block_id 있으면 block 전체. 없으면 anchor 포함 paragraph + 앞뒤 1 paragraph (최대 600자). heading section 자체가 1000자 이내면 section 전체".

---

## P1

### P1-1 — M3 prose Markdown parse 규칙 부재 (M3↔M4 contract)

§"입력"이 6개 필드를 prose에서 받지만 parse 규칙 침묵 — `## Review comment` 헤딩 split? key:value 정규식? quote 안 newline?

**필요**: M3 책임으로 명시(M3 §"Review Context 형식"에 parse 컨벤션 추가) 또는 M4 §"입력"에 "`## Review comment` 헤딩으로 split, 각 block의 `^key: value$` 라인 parse" 한 줄.

### P1-2 — Heading 매칭 정책 부재

§"동작" 2번 "heading 아래 영역 찾는다" — exact text? trimmed? slug? 중복 heading 처리?

검증: comfyui `CLAUDE.md`의 `## Hard rules` 중복 — P0-1과 같은 케이스.

**필요**: "heading 매칭은 trimmed exact text. 중복 시 `heading_occurrence` 필드 사용, 없으면 first" — M3 review context에 `heading_occurrence: int` optional 필드 추가와 짝.

### P1-3 — `anchor_status` enum 정의

§"Context Package" example의 `anchor_status: found` — `found` 외 enum 값이 §"실패 처리" 4 enum과 같은지 침묵.

**필요**: "anchor_status enum: found | source_missing | heading_missing | anchor_missing | anchor_ambiguous" 명시.

### P1-4 — Multi-comment 처리 명시

§"입력"이 단일 의견인지 다중인지 모호. M3 §"저장 정책" "전체 의견 복사" 권장이라 다중 가능성 큼.

**필요**: "M4는 multi-comment input 지원. 각 comment 차례로 검증, context package도 multi-section 출력" 한 줄.

---

## 문서에서 고칠 위치

| 위치 | 현재 | 권장 |
|---|---|---|
| §"동작" 5번 + §"실패 처리" anchor_ambiguous | "occurrence index 함께 출력" | + "weak_anchor=false면 first occurrence + heading 최근접 자동, weak_anchor=true면 fail + 후보 N개 출력" |
| §"Context Package" surrounding_context | `...` placeholder | "block_id 있으면 block 전체. 없으면 anchor 포함 paragraph + 앞뒤 1 paragraph (max 600자). section 1000자 이내면 section 전체" |
| §"입력" prose parse | (침묵) | M3 책임 또는 + "`## Review comment` 헤딩 split, `^key: value$` 정규식" |
| §"동작" 2번 heading 매칭 | "heading 아래 영역 찾는다" | + "trimmed exact text. 중복 시 `heading_occurrence` 사용, 없으면 first" |
| §"입력" heading_occurrence | (없음) | + `heading_occurrence: int` optional 필드 (M3 review context에도 짝) |
| §"Context Package" example | `anchor_status: found` | + enum 정의 (found / source_missing / heading_missing / anchor_missing / anchor_ambiguous) |
| §"입력" / §"동작" multi-comment | (침묵) | + "multi-comment 지원. context package도 multi-section" |

---

## PRD 진입 가능 여부

**2건 패치 후 PRD 진입 가능**:
1. P0-1: `anchor_ambiguous` 선택 규칙 명시.
2. P0-2: `surrounding_context` 3분기 규칙 명시.

P1 4건은 PRD 작성 중 본문 3-5줄로 해결.

comfyui 통용성: 중복 heading + 긴 ADR Decision section이 P0 2건의 실제 발생 케이스. 패치 후 comfyui ADR/CLAUDE.md/Issue 모두 정상 처리.
