---
id: review-md-show-me-milestone-4-project-rules-integration
type: review-note
reviewer: Claude (Opus 4.7, design-review mode) + sub-agent (general-purpose)
updated: 2026-05-19
target_document: md-show-me-milestone-4-project-rules-integration.md
verdict: reject-rework-required
prd_readiness: NOT-ready-needs-reordering
cross_project_scope:
  - C:\Users\orix4\Documents\html-md
  - E:\comfyui (통용 검증)
prior_reviews:
  - md-show-me-skill-strategy.html-md-comfyui.review.md
methodology: 2-pass (sub-agent fresh review + 검수자 검증/보강)
---

# Review: Milestone 4 — Project Rules Integration

원문: `docs/md-show-me-milestone-4-project-rules-integration.md`

---

## 1. 총평 (5문장)

Milestone 4는 "외부 협업 도구는 역할만 기록, API 연동 미실시"의 단계적 접근과 프로필 stale 처리(mtime/hash + 자동 갱신 + 갱신 이유 출력)가 strategy §5.2 refresh 논의에 일관되게 호응한다. **그러나 이 milestone도 reject 수준 — milestone 순서 재배열이 PRD 진입 전 필수**. 이유 둘: (a) 프로젝트 규칙(믿을 수 있는 경로, 임시 경로, 생성 파일 표시)은 **M1 discovery가 제외 정책을 적용하기 전에 필요한 정보**라 M4가 M1 뒤에 오는 현재 순서는 명백한 의존성 역전; (b) §규칙 찾는 순서가 `docs/meta`를 hardcoded로 가정하지만 comfyui에는 `docs/meta`가 없고 `docs/adr/`, `docs/references/`만 있음(검증 완료) → comfyui는 step 2를 통째로 skip → 프로필이 부실. 추가로 .gitignore 자동 등록 부재(M2와 동일 문제), 외부 협업 출처 스키마 미정, 예상 스크립트 2종 추가로 이전 리뷰의 "스크립트 3개로 축소" 권고 또 위배(P1). 결론: **reject (재배열 필요)** — M4를 M0로 앞당기고 `docs/meta` hardcoded 제거 + M1~M3와의 인터페이스 계약 명시 후 재제출.

---

## 2. 이전 리뷰 권고 흡수 검증

| 이전 리뷰 권고 | M4 본문 흡수 | 근거 |
|---|---|---|
| .gitignore 자동 등록 (이전 P1 §3.4) | ✗ | §프로필 위치는 "git에서 무시해도 된다"는 진술만, 자동 등록 없음 — M2와 동일 문제 |
| MVP 3개 스크립트로 축소 (이전 §3.1) | ✗ | M4가 `build-project-profile.js`, `check-project-profile.js` 2종 추가 — 총 4종 잠재 |
| comfyui 부분 채택 3가지 패치 | △ | "기존 문서만으로 부족하면 전용 설정 파일"이라는 fallback이 약함 — comfyui처럼 자생 메타데이터가 풍부한 케이스를 더 적극 활용해야 |

---

## 3. 강점

- "외부 협업 도구는 역할만 기록" 단계적 접근 — strategy §7.5 "skill이 너무 똑똑해지려 함" risk 대응에 정합.
- 프로필 stale 처리 (mtime/hash + 자동 갱신 + 갱신 이유 출력)가 strategy §5.2 refresh 논의에 직결.
- "프로필은 캐시이므로 다시 만들 수 있다" — derived artifact 원칙(strategy §3.1) 정합.
- §갱신 이유 예시(`Project profile refreshed: CONTEXT.md changed.`) — 사용자에게 변화 시각화의 모범.

---

## 4. 새로 발견한 우려사항

### P0 — 의존성 역전 (M4가 M1보다 뒤)

M4 §목적:
> "프로젝트마다 믿을 수 있는 문서 위치, 임시 문서 위치, 생성된 파일 위치가 다를 수 있다. show-me는 이 규칙을 먼저 알아야 잘못된 문서를 고르거나, 임시 파일을 중요한 문서처럼 다루는 일을 줄일 수 있다."

문제: M1 §기본 제외 대상이 "생성된 파일/build 결과물/dependency/scratch/handoff/draft"를 hardcoded로 박은 상태. M4가 그 뒤에 와서 "사실 다른 정책이었어"를 알려줘도 M1은 이미 hardcoded로 동작 중.

**즉 M4의 가치(프로필이 정책을 정의)는 M1을 override할 때만 발휘**. 현재 순서로는 잉여.

**근거 보강**:
- M4 본문이 "임시 문서 경로 패턴", "생성된 파일을 알아보는 표시"를 프로필에 저장한다고 명시. 이 두 항목은 정확히 M1 §기본 제외 대상의 대상.
- M1이 hardcoded 정책으로 동작하면, M4 프로필은 사용자에게 "이 프로필을 다음 실행 시 반영" 같은 미래 약속에 그침.

**수정 (필수)**:
- **옵션 A (강력 권장)**: Milestone 순서 재배열. M4 → M0 또는 M1 prelude. PRD에서 1번 milestone으로 옮김. M1~M3 본문에 "M0 프로필을 입력으로 받는다" 한 줄씩 추가.
- **옵션 B**: M4를 그대로 두되, M4 §목적에 "M4 프로필은 M5 이후 사용. 이전 milestone의 hardcoded 정책은 M4 도입 이후에도 fallback으로 유지"를 명시. 그러나 이건 strategy §3.4 "사용자 의도가 선택 기준" 원칙과 부분 충돌(프로필이 사용자 의도의 일부).

옵션 A가 정합. M4 본문 자체는 거의 그대로, milestone 번호만 M0 또는 M1으로 변경. M1~M3는 "프로필이 있으면 사용, 없으면 default" 한 줄씩.

### P0 — `docs/meta` hardcoded (comfyui 미지원)

§규칙 찾는 순서 step 2:
> "그다음 `docs/meta` 같은 메타 문서 폴더의 Markdown 파일을 본다."

검증: comfyui `docs/`에는 `adr/`, `references/`만 존재. `meta` 없음.

영향: comfyui에서 M4 실행 시 step 1(루트 MD)은 `README.md`, `CONTEXT.md`, `CLAUDE.md`, `handoff.md`, `memory.md` 등 풍부히 잡힘 — 매우 좋음. 그러나 step 2는 통째로 skip → `docs/adr/` (7개 ADR), `docs/references/` (17개 reference) 같은 핵심 메타 폴더가 프로필에 안 반영.

ADR은 "결정 기록"이라 프로필이 정확히 알아야 하는 정보 — 미스의 비용 큼.

**수정 (필수)**:
- step 2를 **휴리스틱**으로 변경: "프로젝트 `docs/` 또는 `documentation/` 하위에 `meta`, `adr`, `references`, `rules`, `conventions`, `architecture` 같은 폴더명이 있으면 후보".
- 또는 glob 패턴: `docs/{meta,adr,references,rules,conventions,architecture}/**/*.md`.
- 본문에 "프로젝트별 메타 폴더 이름은 다양함" 1줄 + 예시 3-4개.

### P0 — `.agent-output/show-me/project-profile.json` .gitignore 미보장

§프로필 위치 마지막 줄:
> "이 파일은 원본 문서가 아니라, 원본 문서에서 뽑아 만든 캐시이다. 그래서 필요하면 다시 만들 수 있고, git에서 무시해도 된다."

문제: "무시해도 된다"는 진술이지 보장이 아니다. comfyui `.gitignore`에 `.agent-output/` 없음(검증).

**시나리오**: 사용자 A가 자기 환경에서 프로필 생성 → git commit → 사용자 B가 다른 환경에서 그 프로필을 읽음 → 환경별 차이로 부정확.

**수정**: M2와 동일 패치 — skill 첫 실행 시 `.agent-output/`을 `.gitignore`에 자동 append + 사용자에게 알림. comfyui 컨벤션(idempotent scripts) 정합.

### P1 — 예상 스크립트 2종 추가로 MVP 비대화

§오래된 프로필 처리:
- `build-project-profile.js`
- `check-project-profile.js`

이전 리뷰 §3.1(skill-strategy 리뷰)는 "MVP 스크립트 3개(collect-md + render-html + apply-review)로 축소" 권고. M4는 여기에 2종 추가 → 총 5종(+ apply-review 없으니 4종) 잠재.

이미 milestone 단위로 분리되어 호출되므로 별도 스크립트가 꼭 필요하지 않을 수도. `collect-md`에 `--build-profile` 플래그로 통합 가능.

**수정**:
- §오래된 프로필 처리의 예상 스크립트 2종을 collect-md의 sub-command로 통합 — `collect-md profile build`, `collect-md profile check`.
- 또는 "예상 스크립트"를 "예상 기능"으로 톤다운하고 구현 분리는 PRD에서 결정.

### P1 — 외부 협업 출처 "역할 이름" 스키마 미정

§프로필에 저장:
> "GitHub PR, Discord, ClickUp 같은 외부 협업 출처의 역할 이름"

스키마 미정. 무슨 필드? 예시 없음.

**수정**: 스키마 예시 1개 — 예:
```json
"external_sources": [
  {"name": "GitHub PR", "role": "review-canonical", "url_pattern": "https://github.com/..."},
  {"name": "Discord #design", "role": "casual-discussion"}
]
```

`role` enum 후보도 명시(예: `review-canonical`, `casual-discussion`, `decision-log`, `bug-tracker`).

### P1 — 프로필 빌드 자체가 LLM인지 rule-based인지 미정

§목적: "show-me는 기존 문서에서 프로젝트 규칙을 먼저 찾는다." — `README.md` / `CONTEXT.md` 등을 읽고 "믿을 수 있는 문서 경로 패턴"을 추출하는 작업이 LLM 호출인가, rule-based인가?

이전 리뷰 §3.11 / Milestone 1 §abstract fallback과 동일 패턴 — 정책 누락.

**수정**: MVP는 **rule-based + 사용자 확인**:
- 루트 MD에서 "docs/", "notes/", "ComfyUI/" 같은 path mention을 grep으로 추출 → 후보 목록.
- 사용자에게 1회 확인 → 프로필 저장.
- LLM 추출은 후속.

이게 strategy §3.4 "사용자 의도가 선택 기준" + comfyui CLAUDE.md "File ownership map" 같은 명시적 정책 존중에 정합.

### P2 — M1~M3에 프로필 주입 인터페이스 미정

§완료 기준이 "M1~M3가 프로필을 사용"한다는 결과만 명시. 어떻게:
- collect-md가 프로필 path를 CLI arg로 받는가?
- 자동 탐색(`.agent-output/show-me/project-profile.json`)인가?
- 환경 변수?

구현자 추측 필요.

**수정**: §완료 기준에 인터페이스 1줄 — 권장 "skill이 호출 시 자동으로 `.agent-output/show-me/project-profile.json` 존재 확인 + load. 없으면 build 모드 진입."

---

## 5. comfyui 통용성 평가

**막힘. `docs/meta` hardcoded 패치 후엔 매우 적합.**

### 가능한 부분 (패치 후)

comfyui는 M4 프로필 빌드의 거의 이상적 케이스:
- **루트 MD 풍부**: `README.md`, `CONTEXT.md`, `CLAUDE.md`, `handoff.md`, `memory.md` — 모두 명시적 메타 문서.
- **CLAUDE.md "File ownership map"** (line 19-37): 각 path별 "When to touch" 정책이 이미 사람이 정의해 둠 → M4 프로필이 거의 그대로 추출 가능.
- **`docs/adr/` 7개 ADR**: 결정 기록의 모범.
- **`docs/references/` 17개**: 참고 매뉴얼.

### 막히는 부분
1. **`docs/meta` hardcoded (P0)**: comfyui는 `docs/adr/`, `docs/references/`로 분산. 휴리스틱 변경 필수.
2. **.gitignore 자동 등록 부재 (P0)**: M2와 동일.

### 부분 채택 시 추천
1. M4를 M0로 재배열.
2. `docs/meta` → 휴리스틱 폴더명 매칭.
3. comfyui CLAUDE.md "File ownership map"을 프로필 빌드의 1순위 입력으로 — comfyui 같은 프로젝트는 이미 명시적 정책이 있으므로 그대로 따르면 됨.

---

## 6. Cross-cutting: 4개 milestone 통합 평가 (이 리뷰가 종합 담당)

### 의존성 정합성

| from → to | 평가 | 비고 |
|---|---|---|
| M4 → M1 | **부정합 (의존성 역전)** | 위 P0 |
| M1 → M2 | 부정합 | M1 manifest에 heading/block id 없음. Milestone 1 리뷰 §4 P0 |
| M2 → M3 | 부정합 | M2 "전체 렌더링 없음" + M3 "HTML inline 리뷰" 충돌. Milestone 2 리뷰 §4 P0 |
| M3 → (apply) | 미존재 | apply-review가 4 milestone 어디에도 없음. Milestone 3 리뷰 §4 P0 |
| M4 → M2 | 부정합 | M2 "기본 출력 폴더"가 M4 프로필에서 와야 하는데 M4가 뒤에 옴 |

### 빌드 순서 재배열 (권장)

```
M0 (구 M4): Project Profile  ← 의존성 역전 해소
  ↓
M1: Discovery (프로필 consume)
  ↓
M2: Static HTML Report
  ↓
M3: Natural Language Review Loop (anchor_quote 항상 캡처)
  ↓
M4 (신규): Apply-Review — 원본 Markdown 연결, strategy §10 미충족 해소
  ↓
M5 (신규): Refresh Cycle — strategy §5.2 미충족 해소
```

→ **6개 milestone 권장**. 4개 → 6개로 확장. 추가 2개는 strategy §10 성공 기준의 미달성 2항목("리뷰가 원본으로 돌아가는가", "refresh가 쉬운가") 충족용.

### 각 milestone 단독 가치 (이 리뷰의 종합)

| Milestone | 단독 종료 시 사용자 가치 | 1주 단발 적정성 |
|---|---|---|
| M0 (구 M4) | 프로필 파일 생성. 그 자체는 사용자 가치 없음 (다음 milestone 입력) | 적정 |
| M1 | 후보 목록 (텍스트). 검토용으로 약함 | 적정 |
| M2 | HTML 보고서 1장 → **진짜 MVP 라인** | 적정 |
| M3 | HTML 내 자연어 리뷰 입력 UX | 적정 (작은 편) |
| M4 신규 (apply-review) | 리뷰 → 원본 Markdown 연결 | 적정 |
| M5 신규 (refresh) | 변경 감지 + 재생성 | 적정 (작은 편) |

→ M0~M5 6개 milestone이 strategy 100% 충족.

### Strategy §10 성공 기준 점검

| 기준 | 충족 milestone | 4개 milestone 상태 | 6개 권장 후 |
|---|---|---|---|
| 원하는 Markdown을 잘 찾는가 | M1 + M0 프로필 | ✓ (M0 재배열 후) | ✓ |
| HTML에서 빠르게 이해 | M2 | ✓ | ✓ |
| 어떤 원본에서 왔는지 추적 | M2 source link | ✓ | ✓ |
| refresh가 쉬운가 | 없음 | ✗ | M5 |
| 리뷰가 원본으로 돌아가는가 | 없음 | ✗ | M4 신규 (apply-review) |

**4개 milestone으로는 60% 충족, 6개로 100%.**

---

## 7. 완료 기준 충분성 평가

| 기준 | 평가 |
|---|---|
| "외부 통합보다 프로젝트 문서 규칙 먼저" | ✓ |
| "루트 MD + `docs/meta`" | ✗ `docs/meta` hardcoded (P0) |
| "전용 설정 파일 가능" | ✓ |
| "`.agent-output/show-me/project-profile.json` 캐시" | △ .gitignore 미보장 (P0) |
| "원본 변경 감지 + 자동 갱신" | ✓ |
| "갱신 이유 출력" | ✓ |
| "외부 협업 도구 역할만 기록" | △ 스키마 미정 (P1) |
| **누락**: M1~M3 주입 인터페이스 | ✗ (P2) |
| **누락**: 프로필 빌드 방식 (LLM vs rule-based) | ✗ (P1) |
| **누락**: 첫 실행 시 1회 알림 (.gitignore append) | ✗ (M2와 동일) |

---

## 8. PRD 진입 준비도

**NOT ready. 재배열 + 패치 필요**.

PRD 작성 전 반드시 결정해야 할 사항:
1. **P0 milestone 순서 재배열** — M4 → M0. PRD 1번 milestone으로.
2. **P0 `docs/meta` → 휴리스틱 폴더명 매칭** — 본문 1줄 + glob 패턴 명시.
3. **P0 `.gitignore` 자동 등록** — M2와 동일 패치.
4. **P1 외부 협업 출처 스키마 예시** — JSON 5-7줄 추가.
5. **P1 프로필 빌드 방식 결정** — rule-based + 사용자 확인 권장.
6. **신규 milestone 2개 도입 결정** — M4 신규(apply-review) + M5 신규(refresh). PRD 구조 영향.

6번이 PRD 자체에 영향이라 milestone 개수 4→6 변경 vs 4개 고수 + strategy §10 부분 충족 인정의 사용자 결정 필요.

---

## 9. 최종 판단

**Reject (재작업 필요).**

M4 본문 자체의 결함은 P0 2건(docs/meta hardcoded, .gitignore 미보장) + P1 2건이지만, **milestone 순서 재배열과 신규 milestone 2개 도입은 PRD 구조 결정**이라 본문 patch만으로 해결 안 됨. M4 내용 자체는 가치 있고 strategy §5.2 stale 처리에 호응하는 견고한 milestone — 단지 위치와 인터페이스를 재정의해야 함.

---

## Appendix A — sub-agent와의 합의/이견

**합의**: M4 의존성 역전 P0, `docs/meta` hardcoded P0, .gitignore 미보장 P0, 외부 협업 출처 스키마 부재 P1, 예상 스크립트 2종이 MVP 권고 위배 P1.

**검수자 보강**:
- comfyui CLAUDE.md "File ownership map"이 이미 사람이 정의한 project profile이라는 관찰 → comfyui는 M4의 거의 이상적 케이스 (sub-agent 일반론으로만 언급).
- M1~M3에 프로필 주입 인터페이스 미정 P2 추가.
- 6개 milestone 권장 구조 (cross-cutting) — sub-agent도 "신규 milestone 필요"는 언급, 검수자가 6개 매핑 표로 종합.
- Strategy §10 성공 기준 정량 평가 (60% → 100%).
- 프로필 빌드 방식(LLM vs rule-based) 결정 누락 P1 추가.

---

## Appendix B — 본 리뷰의 종합 권고

**PRD 작성 전 사용자가 결정해야 할 3가지**:

1. **Milestone 개수**: 4개 유지(strategy 60% 충족) vs 6개로 확장(100% 충족)?
   - 권장: 6개. apply-review/refresh가 strategy의 핵심 가치.
   
2. **Milestone 순서**: 현재(M1→M2→M3→M4) vs 재배열(M0→M1→M2→M3→M4_new→M5_new)?
   - 권장: 재배열. M4(프로필)가 M0가 되어야 M1 정확.

3. **이전 리뷰 권고의 회귀 점검을 PRD 검토 항목에 포함할지**:
   - 권장: 포함. M3 anchor_quote 회귀 사례가 이 review system의 dogfood. PRD에서 같은 회귀 방지.

---

## Appendix C — 4개 milestone 통합 verdict 종합

| Milestone | Verdict | PRD 진입 필요 패치 |
|---|---|---|
| M1 Discovery | approve-with-changes | 3건 (handoff 정책, manifest 스키마 확장, frontmatter fallback) |
| M2 Static HTML | approve-with-changes | 2건 (M3와 충돌 해소, .gitignore 자동 등록) |
| M3 Review Loop | **reject** | 3건 (anchor 항상 캡처, persistence 옵션, apply-review 위치) |
| M4 Project Rules | **reject** | 재배열 + 2건 (docs/meta 휴리스틱, .gitignore) |

**전체 종합**: 4개 milestone 중 2개 reject. PRD 작성 전 milestone 구조 자체를 재검토 권장(M0 재배열 + 신규 M4/M5 도입). 패치 후 PRD 진입 가능.
