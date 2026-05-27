---
id: md-show-me-skill-strategy-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-skill-strategy
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
updated: 2026-05-19
revision: 1
status: approve-with-minor-changes
---

# Review — md-show-me-skill-strategy.md (discord_chatbot)

선행 revision 0 review 가 지적한 P0 (dist 폐기 + supersede 결정 기록, source-of-truth 4 단 모순, GH PR thread 변환, 기존 layer 공존) 가 모두 frontmatter `supersedes:` + §2.5 + §2.6 + §3 의 6 milestone 구조로 반영됨. revision 0 → revision 1 의 의미 있는 진전.

## Verdict

**Approve with minor changes.**

선행 P0 4 건 충분 반영. §2.6 Superseded Decisions 표가 ADR-style 결정 기록의 좋은 사례. cross-project 통용성 차단 요인 모두 해소.

## P0

없음.

## P1

1. **§7 성공 기준 6 종이 모두 정성적** — pass/fail 검증 가능하지만 *정량 측정* 없음. 1 사이클 후 *진짜 가치를 본 건가* 확인 어려움.
2. **frontmatter `status` enum 의미 명세 부재** — M0/M1/M2/M3 = `revised`, M4/M5 = `proposed`. 의도된 차이 같지만 명시 정책 없음. discord_chatbot 의 ADR status lifecycle 패턴 (`proposed | accepted | superseded by NNNN`) 과 비교하면 enum 의미가 흐림.

## 문서에서 고칠 위치

| 위치 | 문제 | 권장 |
|---|---|---|
| §7 성공 기준 | 정성 6 종만, 정량 0 | 정량 1 종 추가 — 예: "discord_chatbot 의 7 개 ADR 기준 query → strong/medium hit rate 0.7 이상" |
| frontmatter `status:` (전 milestone) | enum 의미 미정 | CONTEXT.md 에 enum 4 종 명세 (`proposed/revised/accepted/superseded by <id>`) |
| §2.6 Superseded Decisions | (강점, 유지) | — |
| §3 milestone 구조 | (강점, 유지) | — |

## PRD 진입 가능 여부

**가능.** PRD §"Known Limitations" 또는 §"Success Metrics" 에 다음 2 건 명시:

- 정량 측정 지표 1 종 추가 (1 사이클 후 평가용)
- status enum 의미 (CONTEXT.md 로 위임 가능)

위 2 건은 PRD 작성 중 닫을 수 있는 minor 사항.
