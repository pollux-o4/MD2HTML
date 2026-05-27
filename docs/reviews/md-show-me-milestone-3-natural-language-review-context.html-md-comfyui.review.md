---
id: review-md-show-me-milestone-3-natural-language-review-context
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-milestone-3-natural-language-review-context.md
verdict: approve-with-changes
prd_readiness: needs-2-patches
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
revision_round: 2 (1차 reject → 2차 approve-with-changes)
---

# Review: Milestone 3 — Natural Language Review Context

## verdict

**approve-with-changes** — 1차 reject에서 명확한 진전. P0 3건 중 2건 해소(anchor_quote 항상 캡처 + weak_anchor flag, apply-review를 M4로 분리) ✓. 1건은 완화만 됨 — 0-persistence가 페이지 내 누적 + 전체 복사로 1회 망각 가드는 됐으나 새로고침/탭 닫힘/실수 navigation/클립보드 덮어쓰기 4시나리오에서 여전히 손실 가능. 추가로 §5/CONTEXT.md와의 필수 필드 정합 충돌.

---

## P0

### P0-1 — 0-persistence 휴먼 에러 트랩 잔존

§"저장 정책" "localStorage 미사용, 디스크 저장 없음". 페이지 누적 표시는 단일 세션 작업 손실 완화하나:
- 새로고침(F5/Ctrl+R) → 30개 코멘트 소실
- 탭 닫힘(comfyui 8GB VRAM 환경에서 ComfyUI tab 옆 browser tab freeze 빈번)
- source link 클릭 → 같은 탭 navigation → back → 페이지 재로드 → 소실
- 다른 텍스트 복사 → 클립보드 덮어쓰기 → "전체 복사" 클릭 망각 시 영구 손실

**필요**: **sessionStorage** 도입(같은 탭 내 새로고침 안전, SoT 아님 명시). §"저장 정책"에 "sessionStorage는 같은 탭 새로고침 보호 buffer로 허용. SoT는 클립보드 + M4 입력". Strategy §6 MVP 제외 항목과도 짝(strategy 리뷰 P1-3).

추가 보강(선택): 페이지 unload 시 "복사 안 한 의견 N개" confirm.

### P0-2 — "필수 필드" 4개 vs Strategy §5 / CONTEXT.md 6개 불일치

§"Review Context 형식" 필수 필드: `source_path / heading / anchor_quote / comment` **4개**. 그러나:
- Strategy §5 Review Context: 6개 (위 4개 + `weak_anchor` + `created`)
- CONTEXT.md M3: 6개 명시

→ M3 본문만 4개로 단독. 구현자가 본문 따르면 `weak_anchor`/`created` 누락 → M4 anchor_status 신뢰도 + M5 stale 추적 깨짐.

**필요**: 필수 필드 4개 → 6개로 정합 (`weak_anchor`, `created` 추가).

---

## P1

### P1-1 — "viewport 중심 문장" 정의 불명

§"리뷰 입력" "현재 heading 아래 viewport 중심 문장 또는 첫 문장". Window scroll? heading section 내부 중앙? 사용자 위치별로 다른 anchor.

**필요**: "선택 없으면 heading 직후 첫 문장을 anchor로 캡처. viewport-aware는 후속" — 단순화 + 결정적.

### P1-2 — Excerpt-only 페이지에서 anchor 다양성 부족

M2 excerpt = heading 직후 80자(또는 패치 후 200자). 사용자 선택 안 하면 anchor도 동일 첫 문장 → 같은 heading 모든 review가 동일 anchor → M4 의미적 ambiguity.

**필요**: excerpt-only일 때 §"리뷰 입력" 안내를 강화 — "선택 없이 저장하면 weak_anchor 시각 경고. 정확한 review를 위해 full render 권장" 또는 선택 강제.

### P1-3 — 누적 의견 정렬 / 그룹화 정책

§"저장 정책" "페이지 안 누적 표시" — 정렬 순서 침묵. 30개 무작위면 가독성 낮음.

**필요**: "heading 위치 순(top-down) + 같은 heading 내 created asc" 한 줄.

### P1-4 — 의견 수정 / 삭제 정책

작성/복사만 다룸. 잘못 작성한 anchor를 어떻게 수정? 본문 침묵.

**필요**: "각 누적 의견 옆 [수정] [삭제] 버튼" 또는 MVP는 read-only after submission 명시.

### P1-5 — M3 prose Markdown parse 규칙 부재 (M3↔M4 contract)

M4가 prose를 받지만 split 규칙(`## Review comment` 헤딩? key:value 정규식? quote 안 newline?) 침묵. M3↔M4 어느 쪽 책임인지 결정 필요.

**필요**: §"Review Context 형식"에 "각 의견은 `## Review comment` 헤딩으로 시작, 다음 헤딩까지가 1 의견. multi-line quote는 `"""..."""`로 escape" 한 줄. M3 책임으로 권장 (출력 형식 주체).

---

## 문서에서 고칠 위치

| 위치 | 현재 | 권장 |
|---|---|---|
| §"저장 정책" | "localStorage 미사용" | "localStorage 미사용. sessionStorage는 같은 탭 새로고침 보호 buffer로 허용(SoT 아님)" |
| §"Review Context 형식" 필수 필드 | 4개 (source_path/heading/anchor_quote/comment) | 6개 (+ weak_anchor, created) — Strategy §5 / CONTEXT.md 정합 |
| §"리뷰 입력" viewport | "viewport 중심 문장 또는 첫 문장" | "heading 직후 첫 문장. viewport-aware 후속" |
| §"리뷰 입력" excerpt-only | (침묵) | + "excerpt-only는 weak_anchor 시각 경고 강화. 정확 review는 full render 권장" |
| §"저장 정책" 누적 표시 | "모든 의견 누적 표시" | + "정렬: heading 위치 top-down → created asc" |
| §"리뷰 입력" 의견 lifecycle | (침묵) | + "각 의견 [수정][삭제] 버튼" 또는 read-only after submission |
| §"Review Context 형식" parse | (침묵) | + "`## Review comment` 헤딩 split. multi-line quote는 `"""..."""` escape" |

---

## PRD 진입 가능 여부

**2건 패치 후 PRD 진입 가능**:
1. P0-1: sessionStorage 도입 + §"저장 정책" 1줄 정정.
2. P0-2: 필수 필드 4개 → 6개로 Strategy/CONTEXT.md와 정합.

P1 5건은 PRD 작성 중 본문 5-7줄로 해결.

comfyui 통용성: 한국어 본문 보존 ✓, M4 lifecycle 종결 ✓. 단 0-persistence 위험이 comfyui 8GB VRAM tab freeze 환경에서 더 큼 — sessionStorage 패치가 comfyui에서 더 절실.

추가 권고 (comfyui 한정): `--save` opt-in으로 `notes/reviews/YYYY-MM-DD-<slug>.review.md` 자동 저장. comfyui CLAUDE.md "Durable docs > inline summaries" 컨벤션 정합.
