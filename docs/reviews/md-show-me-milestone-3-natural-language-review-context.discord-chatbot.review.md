---
id: md-show-me-milestone-3-natural-language-review-context-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-3-natural-language-review-context
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_review: md-show-me-milestone-3-natural-language-review-loop.discord-chatbot.review.md (revision 0, docs/ root — 구 doc 이름)
updated: 2026-05-19
revision: 1
status: approve-with-minor-changes
---

# Review — md-show-me-milestone-3-natural-language-review-context.md (discord_chatbot)

선행 revision 0 review (구 doc 이름 `*-loop`) 의 P0 3 건 (strategy §5.3 supersede 명시 부재, anchor deopt, "나중 에이전트" owner 미정) 모두 충분 반영. M3 frontmatter `supersedes: md-show-me-skill-strategy.md#5.3-review-patch-yaml` 명시 + UI 안내 흐름 ("선택해 주세요" → 그래도 없으면 weak_anchor: true) + "M4 가 보장 흐름" 명시.

## Verdict

**Approve with minor changes.**

P0 0 건. 페이지 reload 시 의견 손실 정책의 *명시* 만 추가 필요.

## P0

없음.

## P1

1. **페이지 reload 시 의견 손실 vs localStorage 미사용 결정의 명시 부재** — §"저장 정책" "리뷰는 기본적으로 source of truth로 저장하지 않는다 ... 페이지 안에 모든 의견을 누적 표시" + "localStorage는 MVP에서 사용하지 않는다." 함의: *복사 안 한 의견은 페이지 reload 시 모두 손실*. 사용자가 5 개 작성 중 실수로 refresh 누르면 0. 이게 의도된 *제약* 인지 사용자에게 명시 X.

## 문서에서 고칠 위치

| 위치 | 문제 | 권장 |
|---|---|---|
| §"저장 정책" 끝 | reload 시 의견 손실 경고 0 | "복사하지 않은 의견은 페이지 reload 시 손실된다. 작성 중 reload 위험이 있으면 *전체 복사* 를 자주 사용." 1 줄 |
| §"리뷰 입력" UI 흐름 (선택 권장 → weak_anchor) | (강점, 유지) | — |
| §"Review Context 형식" 필수 필드 6 종 | (강점, 유지) | — |
| §"다음 단계와 책임" "M4 가 보장 흐름" | (강점, 유지) | — |
| frontmatter `supersedes:` | (강점, 유지) | — |

## PRD 진입 가능 여부

**가능.** PRD §"Known Limitations" 에 "복사하지 않은 자연어 의견은 페이지 reload 시 손실. localStorage 사용은 post-MVP" 1 줄 명시.

discord_chatbot 측 통용성: Claude Code / Codex / Cursor 대화 붙여넣기 흐름 자연. Discord 정리메시지·GH PR thread 는 *사용자가 한 번 더 복사* — M0 `integration: not-implemented` 와 정합된 *의도된 디자인*.
