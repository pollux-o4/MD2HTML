---
id: review-md-show-me-milestone-1-discovery
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-milestone-1-discovery.md
verdict: approve-with-changes
prd_readiness: needs-1-patch
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
revision_round: 2
---

# Review: Milestone 1 — Discovery

## verdict

**approve-with-changes** — 1차 P0 2건(handoff 기본 제외, manifest 스키마 부정합) 모두 해소. handoff/draft/memory가 `role_patterns`로 분류되고 manifest에 `major_headings`/`block_ids`/`file_hash`/`abstract_source` 추가로 M2/M3/M4 다운스트림 원본 재파싱 면제. 1차 P1(frontmatter fallback, match_strength enum) 흡수 ✓. 남은 결함은 strategy §5와의 표기 충돌 1건.

---

## P0

### P0-1 — Manifest envelope vs strategy §5 flat 표기 충돌

M1 §"Manifest" example: `{query, created, sources: [...]}` envelope 구조. Strategy §5는 13 필드 **flat 나열**. 두 표기가 같은 구조를 가리키는 약속인지 모호.

→ 구현자가 두 해석 모두 합리적으로 봐 contract 누수.

**필요**: strategy §5를 envelope 표기로 정정(권장) 또는 M1 §"Manifest"에 "envelope 구조이며 strategy §5의 13 필드는 envelope + sources 원소 필드의 합산" 한 줄.

---

## P1

### P1-1 — M2 excerpt/full opt-in 결과를 manifest에 저장 안 함

어떤 source가 full render 대상인지가 manifest에 없음. M2가 사용자 요청 재파싱 필요. M5 refresh 시 view 일관성 깨짐 위험.

**필요**: source 원소에 `render_mode: excerpt | full` 필드 추가. 기본 `excerpt`, 사용자 명시 시 `full`.

### P1-2 — "동률일 때 match_strength 우선" 자기참조 모순

§"Match Strength" 마지막 문장 — `match_strength`가 1차 정렬키인데 동률 시 "match_strength 우선"이 모순.

**필요**: "정렬: 1차 match_strength desc, 2차 updated desc, 3차 filename asc. 5개 cap 후 truncated count 표시."

### P1-3 — 6번째 strong 후보 시 truncated count 미명시

5개 cap 후 strong이 더 있는지 사용자가 알 수 없음.

**필요**: §"실패와 과다 후보"에 "5개 cap 후 truncated total count 함께 표시" 한 줄.

### P1-4 — 정형 schema 부재

example JSON만 있고 JSON Schema / TypeScript interface 없음. 필드 optional/required 모호.

**필요**: §"Manifest" 끝에 5-7줄 필드 명세 표 — 필드명 | 타입 | required/optional | 설명.

### P1-5 — 성능 기준 / 입력 인터페이스 미명시

CLI arg vs skill invoke param, 1000+ 파일 시한 침묵.

**필요**: §"입력"에 "사용자 요청은 skill invoke param 또는 `--query` CLI arg" + "10000 파일 시 60초 이내 SLA" 한 줄.

---

## 문서에서 고칠 위치

| 위치 | 현재 | 권장 |
|---|---|---|
| §"Manifest" / Strategy §5 | envelope vs flat 표기 충돌 | strategy §5를 envelope 표기로 정정 |
| §"Manifest" sources 원소 | render_mode 필드 없음 | + `render_mode: excerpt \| full` 필드 |
| §"Match Strength" 마지막 줄 | "동률일 때 match_strength 우선" | "정렬: match_strength desc → updated desc → filename asc, 5개 cap + truncated count" |
| §"실패와 과다 후보" | "더 좁은 요청 예시 제안" | + "truncated total count 함께 표시" |
| §"Manifest" 끝 | example JSON만 | + 필드 명세 표 (필드/타입/required/설명) |
| §"입력" | 3종 입력 명시 | + 입력 인터페이스 (skill param / CLI arg) + 성능 SLA |

---

## PRD 진입 가능 여부

**1건 패치 후 PRD 진입 가능**:
1. P0-1: Strategy §5 또는 M1 §"Manifest" envelope/flat 표기 정합.

P1 5건은 PRD 작성 중 본문 5-7줄 추가로 해결 가능.

comfyui 통용성: 패치 없이 작동 (frontmatter fallback이 34 issue + 7 ADR 모두 매칭). M0 패치가 references 포함하면 references 17개도 매칭.
