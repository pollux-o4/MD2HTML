---
id: md-show-me-milestone-4-apply-review-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-4-apply-review
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_review: none (M4 신규)
updated: 2026-05-19
revision: 1
status: approve-with-minor-changes
---

# Review — md-show-me-milestone-4-apply-review.md (discord_chatbot)

신규 milestone (revision 0 의 *ex-M4 project-rules-integration* 과 다른 책임). M3 의 자연어 review context 를 받아 원본 Markdown 의 anchor 검증 + 다음 에이전트용 context package 생성. 4 실패 상태 enum (`source_missing` / `heading_missing` / `anchor_missing` / `anchor_ambiguous`) 과 weak_anchor 전파 + occurrence index 처리는 깔끔.

## Verdict

**Approve with minor changes.**

신규 milestone 으로서 책임 명확. P0 0 건. 3 가지 구현 detail 명세 필요.

## P0

없음.

## P1

1. **§"Context Package" `surrounding_context` 범위 미정** — `surrounding_context: ...` 만 적혀 있고 *몇 줄* 인지 *heading 전체* 인지 *anchor ± N 문장* 인지 0. 다음 에이전트의 컨텍스트 비용·정확도에 직접 영향.
2. **§"동작" 2 번 heading 매칭 알고리즘 미정** — "`heading` 아래 영역을 찾는다" 만. exact match? case-sensitive? markdown inline (`**bold**`) 처리? slug 비교? 명시 X.
3. **§"동작" 5 번 stale/dangling 표시 위치·형식 미정** — "stale 또는 dangling으로 표시하고 자동 적용하지 않는다" 만. stdout 의 context package 자리? 별도 형식? 동일 stdout 형식 (anchor_status enum + 재시도 메시지) 이 자연스러운데 명시 X.

## 문서에서 고칠 위치

| 위치 | 문제 | 권장 |
|---|---|---|
| §"Context Package" `surrounding_context` | 범위 미정 | "anchor 가 속한 paragraph 전체 + 직전·직후 paragraph 1 개씩, 최대 N 줄" 또는 "heading 다음 다음 heading 까지" 둘 중 하나 |
| §"동작" 2 번 heading 매칭 | 알고리즘 미정 | "heading 문자열의 trimmed slug 비교 (lowercase, 공백 → `-`, markdown inline 제거). slug 불일치 → `heading_missing`" |
| §"동작" 5 번 stale 출력 | 위치·형식 미정 | "동일 stdout 에 `anchor_status: <enum>` + 실패 이유 1 줄 + 권장 재시도 메시지" |
| §"실패 처리" 4 enum | (강점, 유지) | — |
| §"목적" 원본 자동 수정 X | (강점, 유지) | — |
| §"동작" weak_anchor 낮은 확신 표시 + occurrence index | (강점, 유지) | — |

## PRD 진입 가능 여부

**가능 (조건부).** 위 3 가지 P1 모두 PRD 작성 중 closeout 가능. 단 PRD §"Implementation Notes" 또는 M4 본문에 3 가지 spec (paragraph 범위 / slug 비교 / dangling stdout 형식) 모두 들어가야 첫 구현자가 분기되지 않음.

discord_chatbot 적용성: ADR 같은 *frontmatter `status:` 필드 갱신* 이 필요한 의견의 경우 context package 가 *content 변경 hint* 만 보내고 *frontmatter 변경* 은 다음 에이전트의 판단 — 의도된 절제로 본다 (M4 가 *원본 수정 X* 정책). 별도 frontmatter side-effect hint 메타는 post-MVP 후보.
