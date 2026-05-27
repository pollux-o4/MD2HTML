---
id: md-show-me-milestone-0-project-profile-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-0-project-profile
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_review: md-show-me-milestone-4-project-rules-integration.discord-chatbot.review.md
updated: 2026-05-19
revision: 1
status: approve-with-minor-changes
---

# Review — md-show-me-milestone-0-project-profile.md (discord_chatbot)

선행 *ex-M4 project-rules-integration* review 의 P0 4 건 (M4→M1 순서, redirect-stub 미인지, docs/adr 누락, `.venv/` + `.claude/worktrees/` 미제외) 이 M0 신설로 모두 해소. discord_chatbot 환경에서 verified:

- AGENTS.md / GEMINI.md = 각 1 줄 stub → §"규칙 source 후보" "5 줄 이하 + reference" 정책으로 잡힘
- `docs/adr/` → §"규칙 source 후보" 3 번에 명시 + "title, status, 처음 300자만" 토큰 절제
- `.venv/`, `__pycache__/`, `.claude/worktrees/`, `.claude/scratch/` → §"Profile 내용" exclude_patterns 에 모두 포함

## Verdict

**Approve with minor changes.**

선행 P0 4 건 모두 충분 반영. handoff/draft/memory 를 *제외 하드코딩* 에서 *role 분류* 로 옮긴 결정이 핵심 진전 — discord_chatbot 의 `docs/handoff/YYYY-MM-DD-*.md` 같은 자생 layer 가 *명시 query* 로 포함 가능.

## P0

없음.

## P1

1. **external_sources 자동 발견 방법 미명시** — §"Profile 내용" external_sources 예시 (Discord / GitHub PR / ClickUp) 는 보이지만 *어떻게 발견* 인지 0 줄. 자동 (writing-guide LLM 추출 / heuristic) vs 수동 (`.show-me.toml`) 결정 미정. discord_chatbot CLAUDE.md 의 3 계층 모델 (Discord 협업 / ClickUp task / Code repo ADR) 이 자연어 평문이라 자동 추출은 NLP 비용 큼 — 수동 명시가 현실.

## 문서에서 고칠 위치

| 위치 | 문제 | 권장 |
|---|---|---|
| §"Profile 내용" external_sources | 발견 방법 0 | "1 차는 `.show-me.toml` 수동 only. 자동 heuristic 은 후속" 1 줄 |
| §"규칙 source 후보" redirect-stub | (강점, 유지) | — |
| §"Profile 내용" exclude_patterns | (강점, 유지) | — |
| §"Stale 처리" content hash + rebuild trigger 4 종 | (강점, 유지) | — |

## PRD 진입 가능 여부

**가능.** PRD §"Out of Scope" 에 "external_sources 자동 발견은 MVP 범위 외 — 1 차는 `.show-me.toml` 수동 명시 only" 1 줄 추가.

discord_chatbot 의 핵심 차단 요인 (redirect-stub, docs/adr, `.venv/`) 모두 닫혔으므로 *자동 적용 가능* 상태.
