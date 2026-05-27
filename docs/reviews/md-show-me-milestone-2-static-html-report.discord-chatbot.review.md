---
id: md-show-me-milestone-2-static-html-report-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-2-static-html-report
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_review: md-show-me-milestone-2-static-html-report.discord-chatbot.review.md (revision 0, docs/ root)
updated: 2026-05-19
revision: 1
status: approve
---

# Review — md-show-me-milestone-2-static-html-report.md (discord_chatbot)

선행 revision 0 review 의 P0 3 건 (dist vs `.agent-output` 이름 불일치, M0 의존 누락, Windows path 회피) + P1 4 건 (excerpt 길이, major headings 갯수, `_cache/`/`reports/` 분리, `.gitignore` 자동 등록) 모두 충분 반영. *Full render opt-in* 도입은 새 강점 — M3 의 문장 단위 리뷰 전제.

## Verdict

**Approve.**

선행 P0 3 건 + P1 4 건 모두 충분 반영. 새 P0/P1 없음. discord_chatbot 환경 (Windows) 에서도 source link 동작 보장 (1 줄 정규화).

## P0

없음.

## P1

1. **excerpt view 에서 자연어 리뷰 시도 시 anchor 협소** — §"Excerpt 와 Full Render" 가 *기본 excerpt view, opt-in full render* 정책. 사용자가 excerpt view 에서 *80 자 첫 문장* 만 보이는 상태로 자연어 리뷰를 시도하면 anchor_quote 가 그 첫 문장으로 제한됨. M3 의 weak_anchor 가 보호하지만 *excerpt 안에서 리뷰 가능한 범위* 가 협소하다는 사실의 UI 안내 미정.

## 문서에서 고칠 위치

| 위치 | 문제 | 권장 |
|---|---|---|
| §"Excerpt와 Full Render" 끝 | full render 권장 UI hint 없음 | "문장 단위 리뷰가 필요하면 해당 문서를 `full` 로 요청 권장" 1 줄 |
| §"Source Link" Windows 정규화 | (강점, 유지) | — |
| §"입력과 출력" `_cache/` vs `reports/` 분리 | (강점, 유지) | — |
| §"입력과 출력" `.gitignore` 자동 등록 | (강점, 유지) | — |
| §"완료 기준" | (정상) | — |

## PRD 진입 가능 여부

**가능.** PRD 작성 중 위 P1 1 줄 hint 추가만 closeout. 그 외 본 milestone 은 *PRD-ready* 상태로 판단.
