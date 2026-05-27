---
id: review-md-show-me-milestone-0-project-profile
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-milestone-0-project-profile.md
verdict: approve-with-changes
prd_readiness: needs-2-patches
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
revision_round: 2
---

# Review: Milestone 0 — Project Profile

## verdict

**approve-with-changes** — 1차 P0(의존성 역전)가 M0 신설로 정확히 해소. `_cache/`/`reports/` 분리, hash 기반 stale(mtime 회피), role-pattern 분류, 외부 source role-only는 모두 1차 권고 흡수 ✓. 남은 문제는 source 후보 범위가 comfyui에 부족한 것 1건.

---

## P0

### P0-1 — §"규칙 source 후보"에서 `docs/references/*.md` 누락

본문 step 2가 `docs/meta/*.md`만 명시. step 3에 `docs/adr/*.md` 추가됐으나 **`docs/references/*.md`는 빠짐**. comfyui에는 `meta/` 없고 `adr/`(7개) + **`references/`(17개)**만 있다. references는 z-image.md / comfyui-windows-8gb.md / workflow-authoring.md 같은 trusted source의 핵심 — comfyui CLAUDE.md §"Read these before doing anything substantive"에 references 3개가 5/6/7번 read 파일로 명시. 누락 시 17개 reference가 metadata-blind로 떨어짐.

**필요**: step 2를 휴리스틱으로 일반화 — `docs/{meta,adr,references,guides,rules,conventions,architecture}/*.md` 또는 `docs/*/` 1단계 디렉토리 전체 후보화.

### P0-2 — §"Profile 내용" example `trusted_sources` 자체 모순

example: `"trusted_sources": ["docs/adr/**", "docs/research/**"]`. 그러나 `docs/research/**`는 §"규칙 source 후보" step 1-4 어디에도 없음. 본문↔example 자체 모순.

**필요**: example의 `docs/research/**`를 `docs/references/**`로 교체 (위 P0-1과 짝).

---

## P1

### P1-1 — Redirect-stub 휴리스틱 false-positive 위험

§"규칙 source 후보": "루트 MD가 5줄 이하 + 다른 .md 경로를 가리키면 stub". 짧은 working note가 다른 .md 언급하면 오탐.

**필요**: 추가 조건 "본문 link 비율 50% 이상" 또는 frontmatter `redirect_to:` opt-in.

### P1-2 — ADR "처음 300자만" 인덱싱

§"규칙 source 후보": "ADR은 title, status, 처음 300자만 인덱싱". comfyui ADR(`# 000N` + `## Status` + `## Context` + ...)에서 Status가 300자 안에 있다는 보장 없음 — 긴 title이나 frontmatter 있으면 Status 잘림.

**필요**: "title + `## Status` heading 직후 텍스트 separately parse + 첫 800자".

### P1-3 — `.show-me.json` / `.show-me.toml` 스키마 미정

step 4가 명시 설정 파일을 받지만 스키마 정의 없음.

**필요**: §"Profile 내용" example 옆에 "`.show-me.json`은 이 example과 같은 스키마. profile cache는 derived, `.show-me.json`은 source — 사용자 직접 작성/유지" 한 줄.

### P1-4 — Hash 알고리즘 미정

§"Stale 처리" "content hash 저장" — sha256/md5/blake3 침묵. Strategy §5와도 짝.

**필요**: "sha256 (full hex)" 명시.

### P1-5 — `external_sources` role enum example과 본문 불일치

example에 `collaboration / code_review / task` 3개 — 본문은 6개 enum 나열(`collaboration, code_decision, code_review, task, issue_tracker, runtime_config`).

**필요**: example과 본문 enum 정합 (6개로 통일).

---

## 문서에서 고칠 위치

| 위치 | 현재 | 권장 |
|---|---|---|
| §"규칙 source 후보" step 2-3 | `docs/meta/*.md`, `docs/adr/*.md` | `docs/{meta,adr,references,guides,rules,conventions,architecture}/*.md` 휴리스틱 |
| §"Profile 내용" example trusted_sources | `["docs/adr/**", "docs/research/**"]` | `["docs/adr/**", "docs/references/**"]` |
| §"규칙 source 후보" redirect-stub | "5줄 이하 + 다른 .md 경로" | + "link 비율 50% 이상" 또는 frontmatter opt-in |
| §"규칙 source 후보" ADR 인덱싱 | "처음 300자만" | "title + `## Status` separately parse + 첫 800자" |
| §"규칙 source 후보" step 4 | `.show-me.json` 사용만 명시 | + 스키마 정의 1줄 (example과 동일) |
| §"Stale 처리" | "content hash 저장" | "content hash 저장 (sha256, full hex)" |
| §"Profile 내용" external_sources example | 3개 role | 6개 role enum 모두 또는 본문과 정합 |

CONTEXT.md M0 항목도 같이 `docs/references` 누락 — 본 milestone 패치 시 함께 정정.

---

## PRD 진입 가능 여부

**2건 패치 후 PRD 진입 가능**:
1. P0-1: §"규칙 source 후보" step 2를 휴리스틱으로 일반화.
2. P0-2: example trusted_sources 정합 (P0-1과 한 번에 처리 가능).

P1 5건은 PRD 작성 중 본문 1-3줄 추가로 해결.
