---
id: review-md-show-me-skill-strategy
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-skill-strategy.md
verdict: approve-with-changes
prd_readiness: needs-2-patches
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
revision_round: 2 (revised strategy)
---

# Review: MD Show-Me Skill Strategy (Revised)

## verdict

**approve-with-changes** — 1차 리뷰의 핵심 권고(6 milestone 재구성, M0 의존성 역전 해소, dist/ 폐기, anchor_quote 항상 캡처, apply-review/refresh 신설)가 모두 흡수. §2.6 Superseded Decisions 명시는 회귀 방지의 모범. 남은 결함은 **§5 contract 표기와 milestone 본문 사이 3-way 정합 충돌**과 **§7 성공 기준 6번 중 2건이 milestone 본문 패치 후에야 충족**되는 정도.

---

## P0

### P0-1 — §5 Manifest 표기가 M1 envelope과 충돌

§5는 `query, created, path, title, abstract, ..., file_hash` 13개 필드를 **flat 나열**. 그러나 M1 §"Manifest"는 envelope 구조(`{query, created, sources: [{path, title, ...}]}`). M2 §"Manifest 매핑"은 envelope 가정으로 source 원소 필드만 매핑.

→ 구현자가 두 해석 모두 합리적으로 받아들일 수 있어 contract 누수.

**필요**: §5 Manifest를 envelope 표기로 정정 — "top-level: query, created. sources[]: path, title, abstract, abstract_source, role, matched_fields, match_strength, reason, major_headings, block_ids, file_hash".

### P0-2 — §5 Review Context 필수 6개 ↔ M3 본문 필수 4개 불일치

§5는 `source_path, heading, anchor_quote, weak_anchor, comment, created` **6개** 명시. CONTEXT.md M3도 6개. 그러나 M3 §"Review Context 형식"의 "필수 필드" 목록은 `source_path, heading, anchor_quote, comment` **4개**만.

→ M3 구현자가 본문 따르면 `weak_anchor` / `created` 누락 → M4 anchor_status 신뢰도 + M5 stale 추적 깨짐.

**필요**: M3 본문에 2개 추가 (M3 책임 패치). Strategy §5는 ground truth 유지.

---

## P1

### P1-1 — §2.5 `dist/show-me/` 폐기 시 legacy migration 절차 없음

`dist/show-me/<slug>/`가 이미 존재하는 사용자 환경에서 어떻게 정리하나? skill이 자동 삭제? 사용자 책임? 침묵.

**필요**: §2.5에 "기존 `dist/show-me/` 디렉토리가 있으면 첫 실행 시 사용자에게 알리고 `.agent-output/show-me/reports/`로 안내 또는 삭제 옵션 제안" 한 줄.

### P1-2 — §5 Project Profile contract에 hash 알고리즘 미정

"source hashes" 명시되나 sha256/md5/blake3 침묵. M0 §"Stale 처리"와 M5 stale 검사가 일관 비교 위해 필요.

**필요**: §5 Project Profile 단락에 "source hashes: sha256 (full hex)" 한 줄. M0 본문 P1-4와 짝.

### P1-3 — §6 MVP 제외와 M3 sessionStorage 정책 모호

§6 "MVP 제외"에 "실시간 서버 저장" 명시. 그러나 M3는 "localStorage 미사용"만 다루고 sessionStorage 침묵. 사용자가 sessionStorage를 "실시간 서버 저장"의 일부로 해석할 위험.

**필요**: §6 MVP 제외에 "localStorage / 디스크 SoT 저장 미사용. sessionStorage는 같은 탭 새로고침 보호 buffer로 허용(SoT 아님)" 한 줄. M3 본문 P0-1과 짝.

---

## 문서에서 고칠 위치

| 위치 | 현재 | 권장 |
|---|---|---|
| §5 Manifest | 13 필드 flat 나열 | envelope 구조 — top-level 2 (query, created) + sources 원소 11 필드 |
| §5 Review Context | 6 필드 (Strategy 자체는 정합) | M3 본문 4 → 6으로 정합 (책임 M3, Strategy는 ground truth 유지) |
| §2.5 | "`dist/show-me/`는 폐기한다" | + legacy 디렉토리 migration 1줄 |
| §5 Project Profile | "source hashes" | "source hashes: sha256 (full hex)" |
| §6 MVP 제외 | "실시간 서버 저장 미사용" | + "sessionStorage는 같은 탭 새로고침 보호 buffer로 허용 (SoT 아님)" |
| §7 성공 기준 5번 | "Apply Review anchor drift fail-loud" | M4 본문에 `surrounding_context` 정의 + `anchor_ambiguous` 선택 규칙 보강 필요 (cross-ref) |
| §7 성공 기준 6번 | "refresh와 rescan 차이 명확" | M5 본문에 refresh도 profile-fresh 검사 명시 필요 (cross-ref) |

---

## PRD 진입 가능 여부

**Strategy 자체는 P0 2건 패치 후 PRD 진입 가능.**

단 Strategy §7 성공 기준 6항목 중 2건(5번 Apply Review / 6번 Refresh/Rescan)이 milestone 본문 패치 의존:
- M4 P0-2 (`surrounding_context` 정의)
- M5 P0-1 (refresh도 profile-fresh 검사)

이 둘이 milestone 본문에서 해결되어야 strategy contract 100% 충족.

**전체 7개 리뷰 종합 P0 카운트**:
- Strategy: 2건
- M0: 2건
- M1: 1건
- M2: 2건
- M3: 2건
- M4: 2건
- M5: 2건
- **합계 13건 P0 패치 후 PRD 작성 진입 가능 (≈85%)**

§2.6 Superseded Decisions 4건 명시는 1차 리뷰 권고의 정확한 흡수. PRD에서도 같은 supersede 표기 컨벤션 유지 권장 — silent 회귀(예: 이전 M3 anchor_quote 회귀) 재발 방지.
