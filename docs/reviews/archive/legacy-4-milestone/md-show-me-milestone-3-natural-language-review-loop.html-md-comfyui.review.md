---
id: review-md-show-me-milestone-3-natural-language-review-loop
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-milestone-3-natural-language-review-loop.md
verdict: reject-rework-required
prd_readiness: NOT-ready-needs-redesign
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
prior_reviews:
  - md-show-me-skill-strategy.html-md-comfyui.review.md
methodology: 2-pass (sub-agent fresh review + 검수자 검증/보강)
---

# Review: Milestone 3 — Natural Language Review Loop

원문: `docs/md-show-me-milestone-3-natural-language-review-loop.md`

---

## 1. 총평 (5문장)

Milestone 3는 "YAML 패치 스키마 강요 안 함" 결정으로 사용자 마찰을 크게 줄였고 이는 strategy §3.4 ambiguity prompt 정신과 정합한다. **그러나 이 milestone은 reject 수준 — PRD 진입 전 재설계가 필요하다**. 이유 셋: (a) 이전 리뷰가 P0로 짚고 흡수 ✓로 평가했던 **anchor_quote 기반 drift 검증이 사라졌고**, "선택한 텍스트가 있으면" optional로 후퇴; (b) "디스크/localStorage/reviews.json 전부 안 함"이라는 0-persistence 결정이 30개 코멘트 작성 후 브라우저 사고/F5 한 번에 전부 소실되는 휴먼 에러 노출; (c) strategy §10 성공 기준의 "리뷰가 HTML에 갇히지 않고 원본 Markdown으로 돌아갈 수 있는가"가 **이 milestone에서도 다른 milestone에서도 미달성** — `apply-review.js`가 4개 milestone 어디에도 없다. M3는 입력 UX는 견고하나 lifecycle 종결이 빠져 단독 milestone으로 닫히지 않는다. 결론: **reject (재작업 필요)** — anchor 캡처 정책 + 최소 persistence + apply-review 연결 추가 후 재제출.

---

## 2. 이전 리뷰 권고 흡수 검증

| 이전 리뷰 권고 | M3 본문 흡수 | 근거 |
|---|---|---|
| anchor_quote 기반 drift 검증 (이전 P0-2 ✓로 평가) | ✗ **후퇴** | M3는 anchor_quote 용어 없음. "선택한 텍스트가 있으면 함께 포함"이 optional이라 stale 검증 불가 — **이전 P0 회귀** |
| review-patch.js 최소 spec (이전 P0-3 △ 잔여) | ✗ | M3는 "복사 가능한 리뷰 컨텍스트" 추상만 — 포맷/스키마 미정 |
| MVP 3개 스크립트 중 apply-review (이전 §3.1) | ✗ | M3에 apply-review 없음. 4개 milestone 어디에도 없음 |
| 한국어 trigger 추가 (이전 §3.7) | n/a | M3는 trigger 무관 |

**이 milestone은 이전 리뷰 권고 흡수에서 명백한 후퇴**가 있다. P0 회귀 1건 + P0 잔여 1건 + 핵심 lifecycle 누락 1건.

---

## 3. 강점

- §사용자가 쓰는 내용: YAML 스키마 강요 부재 — 사용자 마찰 최소화의 정직한 결정.
- §단순하게 유지하는 이유: "지금 단계에서 복잡한 규칙을 HTML에 넣기보다, 위치 정보와 선택 텍스트만 붙여서 사람이 쓰기 쉬운 리뷰 흐름을 먼저 만든다" — 의도는 명확.
- §범위 밖: "자동 적용/외부 도구/DB" 3가지를 명시 제외 — scope 차단.

---

## 4. 새로 발견한 우려사항

### P0 — anchor_quote 검증 명시적 후퇴 (이전 P0 회귀)

이전 리뷰는 P0-2(block id drift / anchor 검증)를 ✓로 평가했다. 근거: strategy §4.2 apply-review.js("anchor_quote가 현재 block 안에 없으면 stale"), §5.3 review patch 예시의 `anchor_quote:` 필드, §7.3 stale/dangling 표시.

M3 본문은 **anchor_quote 용어 자체를 쓰지 않고**, §완료 기준의 "선택한 텍스트가 있으면 리뷰 컨텍스트에 함께 포함된다"로 후퇴.

문제:
- **"있으면" optional** — 사용자가 텍스트를 선택하지 않으면 anchor 없음.
- §기본 흐름이 "사용자가 텍스트를 선택하지 않았다면 리뷰 위치는 현재 제목을 기본값으로 삼는다" — heading만으로는 같은 heading 아래 여러 문장 중 어디인지 구분 불가.
- apply 단계(어디로 갔는지 미정)에서 stale 검증을 못 함 → strategy §7.3의 drift 위험 그대로 노출.

**수정 (필수)**: §완료 기준에 다음 추가:
- "선택 텍스트가 없으면 시스템이 현재 viewport 중앙 문장 또는 현재 heading 아래 첫 문장을 자동 anchor로 캡처한다."
- "리뷰 컨텍스트에는 항상 source path + heading + anchor_quote가 포함된다 (anchor_quote는 항상 비어있지 않음)."

용어도 strategy §5.3의 `anchor_quote`로 통일.

### P0 — 0-persistence의 휴먼 에러 노출

§저장하지 않는 것:
> "디스크에 리뷰 파일을 만들지 않는다. 브라우저 저장소나 localStorage를 쓰지 않는다. reviews.json 같은 리뷰 데이터베이스 파일을 만들지 않는다."

§기본 흐름:
> "5. 사용자는 그 리뷰 컨텍스트를 에이전트 대화나 스크립트에 붙여 넣는다."

**시나리오**:
- 사용자가 5개 문서 보고서에서 30분 동안 코멘트 30개 작성.
- 브라우저 탭 사고로 닫힘 / F5 / 노트북 절전 → 전부 소실.
- 복사 잊고 다른 페이지로 이동 → 전부 소실.

이건 **MVP의 정직한 좁히기가 아니라 명백한 휴먼 에러 트랩**. 0-persistence가 보장하는 가치(단순함, 저장 위치 분쟁 회피)가 사용자 작업 손실 위험보다 작다.

**수정 (둘 중 하나)**:
- **옵션 A**: localStorage **자동 draft 저장**(저장 자체는 SoT 아님, 단순히 "다음 새로고침까지 버퍼"). §저장하지 않는 것의 "localStorage 안 함"을 "localStorage는 draft 버퍼로만 사용, SoT 아님"으로 정정.
- **옵션 B**: "리뷰 컨텍스트" 텍스트가 페이지 안 **항상 누적 표시** + 코멘트 추가 시 즉시 갱신 → 사용자는 어느 시점에서든 "전체 컨텍스트" 통째로 복사 가능. localStorage 없이도 사용자가 의식적으로 한 번에 복사하는 디자인이 가능.

옵션 B가 SoT 원칙(strategy §3.1)과 정합. 옵션 A는 그 SoT 박스를 "localStorage = transient buffer"로 한 줄 추가 필요.

### P0 — `apply-review` lifecycle 완성 부재 (4개 milestone 통틀어 누락)

Strategy §4.2가 명시한 `apply-review.js` (target block 찾기 + anchor_quote 검증 + 다음 에이전트 context package 출력)가 **M3에 없고, 4개 milestone 어디에도 없다**.

Strategy §10 성공 기준 5개 중:
- ✓ "사용자가 원하는 Markdown을 잘 찾는가" — M1
- ✓ "사람이 HTML에서 빠르게 이해할 수 있는가" — M2
- ✓ "어떤 내용이 어떤 원본에서 왔는지 추적 가능한가" — M2 source link
- ✗ "refresh가 쉬운가" — 4개 milestone에 없음
- ✗ **"리뷰가 HTML에 갇히지 않고 원본 Markdown으로 돌아갈 수 있는가" — 4개 milestone에 없음**

M3가 "복사 가능한 리뷰 컨텍스트"까지 만들고 끝이면, 그 다음 단계(클립보드 → Claude/Codex 대화 → 수동 적용)는 사용자/에이전트의 즉흥 협업이지 skill의 보장된 흐름이 아니다. strategy §10이 정의한 핵심 가치가 미달성.

**수정**:
- **옵션 A**: M3에 §"apply-review 출력" 추가 — "리뷰 컨텍스트를 클립보드 복사 외에 `apply-review --from-clipboard` 같은 entry point로 받아 target file의 anchor 검증 + 다음 에이전트용 context package(target block + 주변 문맥) stdout 출력".
- **옵션 B**: M5 신설 — "원본 연결 (apply-review)". M3는 리뷰 입력 UX에 집중, M5가 원본 Markdown 연결 lifecycle 담당.

옵션 B 권장. M3 본문이 이미 70줄로 좁고 단발 작업 적정이라 추가 부담을 주면 단발성 깨짐.

### P1 — "복사 가능한 리뷰 컨텍스트" 포맷 미정

§기본 흐름 4번 "사용자가 복사할 수 있는 리뷰 컨텍스트를 만든다" — 포맷 미정. Markdown? YAML? plain text?

이 포맷은 다운스트림(apply-review 또는 다음 에이전트)이 파싱할 수 있어야 한다. 에이전트가 자연어 의견을 다시 받아 해석할 수 있는 구조가 필요.

**수정**: §완료 기준에 포맷 명시. 권장:
```markdown
## Review context

source: docs/example.md
heading: 3.1 Source of Truth
anchor_quote: "HTML은 사람이 보기 위한 파생물이다."
selected: "HTML은 사람이 보기 위한 파생물이다."  # 사용자가 선택한 텍스트 (anchor와 같거나 다를 수 있음)
comment: 이 표현이 너무 강하니 검토 표면 정도로 톤다운.
```

Markdown + YAML-like 헤더가 에이전트 친화적 + 사람 친화적.

### P1 — 다중 코멘트의 contextify

사용자가 5개 문서에서 30개 코멘트를 단 경우 — 클립보드 복사가 30번 개별 복사인가, 1번 통합 복사인가? 본문 침묵.

**수정**: "현재 페이지의 모든 코멘트를 1회 클립보드 복사" 단일 버튼 + 개별 복사 옵션 둘 다. 위 P0 옵션 B(페이지 안 항상 누적 표시)와 자연스럽게 결합.

### P2 — 한국어 / 영어 자연어 혼용

comfyui 사용자(한국어 working language)는 코멘트를 한국어로 작성. 에이전트가 받아 해석할 때 anchor_quote가 한국어, comment가 한국어. 다국어 정책 본문에 없음.

**수정**: §완료 기준에 "리뷰 컨텍스트는 사용자 입력 언어를 그대로 보존" 한 줄.

---

## 5. comfyui 통용성 평가

**가능하나 약함. 0-persistence가 comfyui 컨벤션과 충돌.**

### 가능한 부분
- comfyui는 PR culture 약함 → PR review thread 의존 없는 M3는 오히려 적합.
- 사용자 1인 + Claude N agents 환경에서 "클립보드 → Claude 대화창" 패턴이 자연스러움.

### 막히는 부분
- **0-persistence vs `handoff.md` 갱신 컨벤션**: comfyui CLAUDE.md는 매 세션 종료 시 `handoff.md` 덮어쓰기를 권장. 즉 **세션 간 작업 추적이 강제 컨벤션**. M3의 0-persistence는 이와 충돌 — 30개 코멘트가 디스크에 안 남으면 다음 세션이 그 작업을 모름.
- **comfyui issue 34개 누적 리뷰**: 각 issue에 코멘트를 단 후 다음 세션에서 추적할 방법이 M3에는 없음.

**패치**: M3 결과 컨텍스트를 **선택적으로** `notes/reviews/YYYY-MM-DD-<slug>.review.md`로 저장하는 옵션. 0-persistence를 default로 유지하되 `/show-me ... --save` 같은 명시적 opt-in 도입. 이는 comfyui의 "high autonomy + durable docs" 원칙(CLAUDE.md "Durable docs > inline summaries")과 정합.

---

## 6. Cross-cutting: M3가 끼친 누적 결함

### M2 ↔ M3 (Milestone 2 리뷰 P0에서 다룸)
M2 "전체 렌더링 안 함" + M3 "HTML에서 inline 리뷰"가 모순. M3의 "현재 보고 있는 제목"이 excerpt 범위 안일 때만 작동.

### M3 → ??? (lifecycle 종결 미정)
"복사된 컨텍스트 → 다음" 흐름이 어느 milestone 소관인지 침묵. apply-review 누락(위 P0 세 번째)이 이 침묵의 정확한 원인.

### Strategy §10 성공 기준 점검
M3가 끝나도 성공 기준 5개 중 2개("refresh가 쉬운가", "리뷰가 원본으로 돌아가는가")가 미달성. **4개 milestone 합산으로도 strategy 목표 60% 달성**에 그침. M5(원본 연결) + M6(refresh) 또는 M3 확장이 필수.

---

## 7. 완료 기준 충분성 평가

| 기준 | 평가 |
|---|---|
| "자연어 리뷰 쓸 수 있다" | ✓ |
| "source path와 heading 포함" | ✓ |
| "선택한 텍스트가 있으면 함께 포함" | ✗ **이전 P0 회귀**, 항상 anchor 캡처로 정정 필요 |
| "복사해 에이전트에 전달" | ✓ |
| "저장되지 않는다" | △ 휴먼 에러 노출 (P0), localStorage 또는 페이지 내 누적 표시 필요 |
| "YAML 안 요구" | ✓ |
| **누락**: 리뷰 컨텍스트 포맷 | ✗ Markdown? YAML 헤더? plain? |
| **누락**: 다중 코멘트 통합 복사 | ✗ |
| **누락**: 한국어 트리거/포맷 | ✗ |
| **누락**: 다음 단계 인터페이스 | ✗ apply-review 또는 클립보드 결과 사용 매뉴얼 |

---

## 8. PRD 진입 준비도

**NOT ready. 재설계 필요**.

PRD 작성 전 반드시 결정해야 할 사항:
1. P0: anchor_quote 항상 캡처 정책 (§기본 흐름 + §완료 기준 수정).
2. P0: persistence 옵션 — localStorage draft 또는 페이지 내 항상 누적 표시 (옵션 B 권장).
3. P0: apply-review가 어디(M3 확장 vs M5 신설)에 들어가는지 결정 — strategy §10 성공 기준 충족.
4. P1: 리뷰 컨텍스트 포맷 명시.

이 4건은 본문 5-15줄 수정으로 해결 가능. 다만 P0 세 번째(apply-review 위치)는 milestone 개수 4→5 변경 가능성이라 PRD 구조 자체에 영향.

---

## 9. 최종 판단

**Reject (재작업 필요).**

입력 UX 디자인(YAML 강요 안 함)은 견고하나 lifecycle 종결이 빠져 단독 milestone으로 닫히지 않음. 위 P0 3건 수정 + Strategy §10 미충족 항목 보강 후 재제출.

---

## Appendix A — sub-agent와의 합의/이견

**합의**: anchor_quote 후퇴 P0, 0-persistence 휴먼 에러 P0, apply-review lifecycle 누락 P0, 리뷰 컨텍스트 포맷 미정 P1, 자연어 의견의 다음 단계 해석 누락.

**검수자 보강**:
- 이전 리뷰가 P0-2를 ✓로 평가했다는 정황 — **이전 평가 자체가 거꾸로 회귀**됐다는 추적 가능성(이건 review system의 dogfood 가치).
- localStorage **vs** 페이지 내 누적 표시(옵션 B) 차이 — 옵션 B가 SoT 원칙과 더 정합.
- comfyui `handoff.md` 컨벤션과 0-persistence 충돌의 구체 시나리오.
- 한국어 자연어 컨텐츠 보존 정책 P2 추가.

---

## Appendix B — 본 milestone과 이전 리뷰의 회귀 추적

이 리뷰는 다음을 발견했다:
- 이전 리뷰(`md-show-me-skill-strategy.html-md-comfyui.review.md`)가 strategy 문서를 평가하며 **P0-2 anchor_quote 검증 흡수 ✓**라고 판정.
- 그 strategy 문서를 milestone으로 분할하면서 M3가 **anchor_quote를 명시 부재 상태로 환원**.
- 즉 strategy 문서 → milestone 분할 과정에서 **P0 권고가 silent하게 약화**됨.

이건 본 review system의 1차 dogfood가 발견한 회귀. PRD 작성 시 "이전 리뷰 권고 흡수 검증"을 PRD 검토 항목으로 추가하면 같은 회귀 방지 가능.
