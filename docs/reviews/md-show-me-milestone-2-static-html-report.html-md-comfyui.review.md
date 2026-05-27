---
id: review-md-show-me-milestone-2-static-html-report
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-milestone-2-static-html-report.md
verdict: approve-with-changes
prd_readiness: needs-2-patches
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
revision_round: 2
---

# Review: Milestone 2 — Static HTML Report

## verdict

**approve-with-changes** — 1차 P0 2건(M3 inline review 충돌, .gitignore 자동 등록) 모두 해소. excerpt 기본 + full opt-in으로 M3와 정합되고, Windows path 정규화도 §"Source Link"에 흡수 ✓. 남은 결함은 한 페이지 내 heading 깊이 일관성과 excerpt cap 의미 전달 2건.

---

## P0

### P0-1 — "최대 5개 H2, H2 없으면 H1" 시각 일관성 위반

§"Excerpt와 Full Render" 본문. 한 report 안에 ADR(H2 4개) + Issue(H1만, comfyui 0027처럼) + 매뉴얼(H2 5개)이 섞이면 같은 navigation 의미를 다른 깊이로 노출. 검증된 comfyui 케이스 3종 모두 다른 패턴.

**필요**: "각 문서의 최저 non-H1 heading level까지 5개. H2 없으면 H3 시도. 둘 다 없으면 H1만 + '(no subheadings)' 표기".

### P0-2 — "각 heading 직후 첫 문장 최대 80자" 의미 전달 부족

한국어 평균 1문장 60-90자, 영어 80-120자. 영어 문서 첫 문장에서 mid-sentence cut. comfyui CLAUDE.md 첫 문장이 80자 안에 안 끝남. "..." trailing이 노이즈.

**필요**: "200자 cap + 가장 가까운 문장 경계(`. ` / `다.` / `요.`)에서 종료".

---

## P1

### P1-1 — `.gitignore` "자동 추가하거나 알린다" 기본 동작 미정

§"입력과 출력". 자동 추가는 git diff 발생, 알림은 사용자 무시 가능.

**필요**: 기본은 알림 + confirm. `--auto-gitignore` opt-in으로 자동.

### P1-2 — slug 정책 미정

`<slug>` 정의 본문에 없음.

**필요**: "slug = query에서 alphanumeric 추출(공백 → `-`) 또는 ISO timestamp(`2026-05-19T1430`). 충돌 시 timestamp suffix" 한 줄.

### P1-3 — `block_ids` ↔ M3 anchor 결합 미정

`block_ids` 빈 배열인 문서에서 M3 anchor가 어디 걸리는지 manifest 정보 없음. M3는 "viewport 중심 문장" 또는 "첫 문장" — paragraph-level인가 character-level인가.

**필요**: §"Manifest 매핑"에 "block_id 없는 문서는 anchor가 paragraph 단위. Markdown→HTML 변환 시 각 paragraph에 sequential id(`p-1`, `p-2`) 부여" 한 줄.

### P1-4 — Full render paragraph 분리 정책 미정

§"Excerpt와 Full Render"가 "Full render는 M3에서 문장 단위 리뷰" 명시 — 그러나 Markdown→HTML 변환 시 paragraph 단위 어떻게 분리하는지 침묵.

**필요**: "Markdown → HTML 시 paragraph `<p>` 보존 + 각 `<p>`에 sequential id 부여. M3 anchor 매칭에 사용".

---

## 문서에서 고칠 위치

| 위치 | 현재 | 권장 |
|---|---|---|
| §"Excerpt와 Full Render" major headings | "최대 5개 H2. H2 없으면 H1" | "각 문서의 최저 non-H1 level 5개까지. 없으면 H3 시도. 둘 다 없으면 H1 + '(no subheadings)'" |
| §"Excerpt와 Full Render" excerpt | "첫 문장 최대 80자" | "200자 cap + 가장 가까운 문장 경계(`. ` / `다.` / `요.`)" |
| §"입력과 출력" gitignore | "자동으로 추가하거나 1회 알린다" | 기본은 알림+confirm, `--auto-gitignore`로 자동 |
| §"입력과 출력" output 위치 | `<slug>` 미정의 | + "slug = query alphanumeric → kebab-case 또는 ISO timestamp. 충돌 시 timestamp suffix" |
| §"Manifest 매핑" block_ids | "heading/block anchor 후보" | + "block_id 없으면 paragraph 단위 anchor. 각 `<p>`에 sequential id 부여" |
| §"Excerpt와 Full Render" full render | "문장 단위 리뷰" | + Markdown→HTML paragraph 분리 + id 부여 1줄 |

---

## PRD 진입 가능 여부

**2건 패치 후 PRD 진입 가능**:
1. P0-1: Heading 깊이 통일 — 각 문서 최저 non-H1 level 5개 + H1만 케이스 표기.
2. P0-2: Sentence cap 200자 + 문장 경계.

P1 4건은 PRD 작성 중 본문 5-7줄로 해결.

comfyui 통용성: Windows path 정규화 명시되어 패치 없이 작동. 단 P0 2건이 comfyui 한국어 본문에서 실제 문제 — 패치 후 매끄러움.
