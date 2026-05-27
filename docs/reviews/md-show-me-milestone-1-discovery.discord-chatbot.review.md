---
id: md-show-me-milestone-1-discovery-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-1-discovery
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_review: md-show-me-milestone-1-discovery.discord-chatbot.review.md (revision 0, docs/ root)
updated: 2026-05-19
revision: 1
status: approve-with-minor-changes
---

# Review — md-show-me-milestone-1-discovery.md (discord_chatbot)

선행 revision 0 review 의 P0 4 건 (순서 모순, 매칭 알고리즘 미정, match_strength enum 미정, abstract fallback 미정) 중 3 건 충분 반영, 1 건 (매칭 알고리즘) 부분 반영. handoff/draft/memory 를 *role 분류* 로 옮긴 결정 + frontmatter 없는 문서를 *H1 뒤 key-value metadata* 로 추출하는 정책이 핵심 진전.

## Verdict

**Approve with minor changes.**

P0 0 건. multi-signal weight 1 건만 PRD 작성 중 closeout 필요.

## P0

없음.

## P1

1. **multi-signal weight 결정 미정** — §"Match Strength" enum (strong/medium/weak) + 단일 신호 분류만 명시. *복수 신호 hit* 케이스의 결정 규칙 0. 예: filename literal hit (strong) + abstract miss → strong 으로 확정? medium 2 개 hit → strong 으로 격상? 가능한 규칙 3 종 (strongest signal 채택 / hit count 누적 / priority list) 중 미정. *현재 본문 암묵 가정은 (strongest)* 으로 보이지만 명시 X.

## 문서에서 고칠 위치

| 위치 | 문제 | 권장 |
|---|---|---|
| §"Match Strength" | multi-signal 결정 규칙 0 | "복수 신호 hit 시 *가장 강한 단일 신호* 채택. medium 다수가 strong 으로 격상되지 않는다." 1 줄 |
| §"후보 찾기 방식" frontmatter 없으면 H1 뒤 key-value | (강점, 유지) | — |
| §"Role과 제외 규칙" handoff/draft/memory role 분류 | (강점, 유지) | — |
| §"실패와 과다 후보" tie-breaking | (강점, 유지) | — |

## PRD 진입 가능 여부

**가능 (조건부).** PRD §"Known Limitations" 또는 M1 본문에 multi-signal 결정 1 줄 명시. 이 한 줄 빠지면 첫 구현자가 (strongest / hit count / priority) 중 무엇이든 자기 해석으로 가서 결과가 분기됨.
