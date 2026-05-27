---
id: md-html-agent-workflow-strategy-review-discord-chatbot
type: review-note
reviewer: claude (design reviewer)
target_document: md-html-agent-workflow-strategy
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
updated: 2026-05-18
status: needs-revision
verdict: approve-with-changes
---

# Design Review — md-html-agent-workflow-strategy.md (discord_chatbot 통용성 관점)

리뷰 컨텍스트: 여러 LLM 에이전트의 Markdown 산출물을 사람이 싸게 검토하고, 리뷰를 다시 원본 MD 의 작은 수정 작업으로 돌려보내는 시스템 설계 문서. cross-project 통용성 평가를 위해 `project_oneul/discord_chatbot` 의 `docs/meta/writing-guide.md`, `docs/handoff/_template.md`, ADR status lifecycle 을 함께 검토.

> 본 파일과 별도로 같은 디렉터리에 `E:\comfyui` 컨텍스트로 평가한 review 가 존재 (`md-html-agent-workflow-strategy.review.md`). 두 리뷰는 cross-project scope 가 달라 결론·MVP 가 일부 갈리므로 분리 보관.

---

## 총평

문제의식(§1, §11)은 진짜고 "Markdown 저비용 / HTML 검토 표면" 역할분리(§3.1–3.2)도 출발점으로 옳다. 그러나 이 문서는 **자기가 풀려는 문제를 이미 다른 layer 가 풀고 있는 환경**(discord_chatbot 의 Discord+RAG, GitHub PR review, ADR status lifecycle)을 전제로 두지 않아서, "review patch markdown" 같은 자체 발명이 GH PR review thread 와 기능 중복이다. 또 §3.3·§7 의 review patch UX 는 *사람이 markdown patch 를 손으로 쓴다* 는 비현실 가정을 빼고는 작동하지 않는데, 그 UI 레이어가 §1–15 어디에도 없다. §12.3 "block id 안정성" 외에 §12 가 동시편집·stale target·SSoT 충돌 같은 P0 위험을 통째로 누락한다. 결론: **방향성은 맞지만 범위가 비대하고, 한 단계 깊은 의문(이미 있는 layer 와 어떻게 공존?)을 회피했다**.

## 강점

- §3.4 "LLM 이 HTML 을 직접 길게 쓰지 않게 한다" — 토큰·일관성 측면에서 옳은 분리.
- §5 frontmatter + block id 표기법(`<!-- block:name -->`) 은 git diff 친화적이고 LLM 이 안정적으로 다룬다 (HTML span/data-attr 보다 안전).
- §7 의 review patch 가 `target_document` + `target` 식별을 명시한 점 — GH PR review thread 와 매핑하기 좋다.
- §8 의 "목적별 템플릿 4–6 개 + 재사용 가능한 소수만 남긴다" — 자체 검증 메커니즘 내장.
- §12.1 "구조 과잉" 을 자기 진단으로 적은 점 — 솔직함.
- §14 의 점진적 도입 순서 — 한 번에 만들지 말라는 신호는 옳다 (단 범위는 여전히 큼, 아래 P1).

## 주요 우려사항

### P0 — 구조적 결함

1. **동시 편집·stale target·충돌 처리 누락 (§12)**
   §6 의 review queue 가 `research-pattern-04.md#claims` 를 가리키는데, 그 사이 다른 에이전트가 `claims` block 을 rename 하거나 삭제하면? §12.3 은 "block rename 은 별도 migration" 한 줄로 끝낸다. detection 방법, dangling review patch 의 운명, multi-agent 의 write race 모두 미정의. apply-review.js (§9) 가 *target block 못 찾으면* 무엇을 하는지 명시 없음. → 실제 운용에서 가장 먼저 깨질 지점.

2. **SSoT 정의 불명 (§3.2 vs §6 vs §7)**
   §3.2 "HTML 은 최종 진실 원본이 아니다" 라고만 적고, **worklog MD ↔ approval MD ↔ review.md** 3 자 사이 SSoT 를 정의 안 했다. 사용자 본인이 §13 #3 에서 "approval MD 가 유용한가, JSON report object 가 더 나은가" 묻고 있다는 사실이 이 불명확성을 증명. discord_chatbot 의 `writing-guide.md` "Single Source of Truth" 표는 *어디에 두면 다른 곳은 링크만* 을 강제하는데, 이 design 은 같은 정보가 worklog/approval 양쪽에 풀어쓰임.

3. **이미 존재하는 layer 와의 중복 (cross-project 적용 시 치명)**
   - discord_chatbot 은 "협업 layer = Discord + RAG(BGE-M3+Qdrant), task = ClickUp, 코드 강결합 결정 = ADR" 3계층이 SSoT (writing-guide.md). 이 design 의 worklog MD 는 **discord_chatbot 의 안티패턴 "일회성 보고서를 코드 repo 에 두지 말 것"** 과 정면 충돌.
   - "여러 에이전트 산출물을 사람이 싸게 검토" 문제는 **Discord 정리메시지 + 봇 RAG 검색** 이 이미 해결. HTML 결재서를 추가하면 layer 4 가 부풀어오른다.
   - review patch 형식(§7)은 **GH PR review thread + line comment** 와 거의 동등 기능. 별도 `.review.md` 발명 이유 없음.
   → 이 design 을 discord_chatbot 에 *그대로* 통용시키면 기존 SSoT 표가 무너진다. (통용 원칙 → 아래 "설계 수정 제안" 참조)

4. **사람의 review 입력 UX 레이어 누락 (§3.3, §7)**
   §3.3 예시는 사람이 `target: ... decision: revise comment: "..."` 를 직접 쓰는 모습. HTML 화면에서 *클릭/코멘트 박스 → review patch markdown 자동 생성* 의 변환 레이어 없이는 비현실. §4 디렉터리 구조에 그 UI 코드가 없다. "HTML 직접편집 금지" (§12.2) 만으론 부족 — *대체할 입력 수단*이 없으면 사람은 그냥 원본 MD 를 직접 고친다.

### P1 — 검증/측정 결여

5. **§11 의 효과 주장이 모두 가설**
   "전체 문서를 안 읽어도 된다", "토큰 절감" 모두 측정 계획 없음. LLM 은 *주변 컨텍스트 안 주면 잘못 고친다* 가 실측치(예: Aider, Cursor 의 partial-edit failure rate). block id 만 주고 수정시키면 caveats/claims block 과 모순 생기는 케이스를 catch 할 단계가 §9 의 어디에도 없음. → MVP 에 측정 게이트 필요.

6. **템플릿 6 개 동시 도입 (§8)**
   사용자 본인 §13 #6 에서 "2–3 개부터 시작" 을 묻고 있는데 §8 은 6 개를 표로 나열. §14 MVP 단계엔 *어느 1 개부터* 가 빠짐. 사용자 묻는 질문에 답을 안 한 채 표만 제시.

7. **frontmatter 7 필드의 비용 (§5)**
   `id/type/status/owner/updated/risk/needs_human_review` 모두 강제하면 작성 비용 큼. discord_chatbot ADR 은 `status:` 하나만. **점진적 도입 정책 없음** — §12.1 "최소 규약" 이 frontmatter 자체는 그대로 두고 block 만 줄임. frontmatter 도 phase-1 = `id`+`status` 만, 나머지는 phase-2 같은 식이 빠짐.

8. **approval MD 가 build artifact 인지 source 인지 불명 (§6)**
   §6 예시는 `inputs:` 로 worklog 를 참조 — 즉 *derived*. 그런데 §4 디렉터리는 `docs/summaries/agent-patterns.approval.md` 로 두고 git 추적 전제. derived artifact 를 git 에 두면 diff noise + merge conflict. **commit 정책 (artifact dir 분리 + .gitignore)** 명시 필요.

### P2 — 표현/완성도

9. **§1 "초기 조사에서는 Reddit, Karpathy, Simon Willison ..." 는 이 design 문서의 일부가 되기엔 출처 추적이 약하다.** Mollick "Claude Sonnet 4.5 경제학 논문 재현" 도 link 없음. design doc 본체에서 인용하려면 §3 의 "본문" 이거나 별도 evidence-report 로 분리.

10. **§13 의 8 개 self-question 이 본문(§1–12) 와 풀리지 않은 채 남음.** 리뷰어가 묻는 질문이 곧 문서가 답해야 할 질문 — self-Q 가 8 개면 본문이 결정을 미뤘다는 신호. 그중 #1, #3, #6 정도는 본문에서 닫아야 한다.

11. **block id 명명 규칙 부재 (§3.3, §5)**
    - 영어 강제? 한국어 콘텐츠와 영문 id 의 cognitive switch.
    - 중복 방지? §9 parse-md 가 "중복 감지" 만 함 — 그러면 누가 unique id 부여? LLM 이 짓다 충돌나면? 자동 suffix 정책 없음.

12. **§9 validate-blocks.js 의 정책이 너무 야심차다**
    "source 없는 strong claim 감지" 는 사실상 NLI 모델 필요. MVP 에서 못 만든다. *그 단계는 "linter" 가 아니라 "LLM 검증 에이전트"* — 별도 단계로 분리해야.

## 설계 수정 제안

### A. 범위 축소 — "결재 game" 만, "worklog game" 은 분리

discord_chatbot 적용성을 살리는 핵심:

- **worklog 레이어 자체는 도입하지 않는다.** 작업기록은 git log + PR description + (discord_chatbot 에서) Discord 정리메시지 + RAG 가 처리. 이 design 시스템이 *추가* layer 가 아니라 *기존 ADR/research/handoff 의 구조화 강화* 가 되도록 한다.
- 대상 문서를 다음 3 가지로 한정:
  1. **ADR** (`docs/adr/NNNN-*.md`) — 이미 frontmatter `status:` 있음, block id 와 review patch 만 추가
  2. **외부 리서치** (`docs/research/*.md`) — evidence-report 템플릿이 가장 자연스럽게 맞음
  3. **handoff** (`docs/handoff/YYYY-MM-DD-*.md`) — 이미 sectioned, frontmatter 만 얹으면 됨

→ 이 3 곳에서 *공통 동작하는 원칙* 이 곧 cross-project 통용 원칙.

### B. SSoT 표 명시 (P0 #2 해소)

| 객체 | SSoT | 파생물 |
|---|---|---|
| 원본 문서 (ADR/research/handoff) | `*.md` | — |
| approval/요약 | derived (build artifact) | `dist/*.html`, `dist/*.approval.md` — `.gitignore` |
| review (사람) | GH PR review thread (1순위) / `*.review.md` (2순위, PR 없을 때) | HTML 결재서의 review queue 영역 |

**기본은 GH PR review thread.** 별도 `.review.md` 는 *PR 없는 운영 결재* (예: nutri 협약서 결재) 같은 specific 케이스에만. — 이 한 줄로 §7 의 발명품과 GH 기능 중복 해소.

### C. review 입력 UX 명시 (P0 #4 해소)

§7 에 다음 추가:

- HTML 결재서의 각 block 옆에 `[코멘트]` 버튼.
- 클릭 시 form 으로 `decision/priority/comment` 입력 → 클라이언트 JS 가 review patch markdown 으로 직렬화 → "복사 후 PR review thread 또는 `.review.md` 에 붙여넣기" (MVP) → 추후 webhook (post-MVP).
- 사람이 patch markdown 을 *맨손으로 쓰는 case 는 없다* 가 정책.

### D. block id 정책 명시 (P2 #11)

- id 는 영문 kebab-case (한국어 자연어와 분리, git diff 친화).
- 부여 주체: 1차는 템플릿이 미리 박아둠(`exec-summary` 등 §5 권장 목록), 추가 block 만 LLM/사람이 지음.
- collision → parser 가 reject (작성자가 rename).
- rename → ADR-style "이전 id" 주석(`<!-- block:claims (was: assertions) -->`) 유지 1 cycle.

### E. 동시 편집·stale target 처리 (P0 #1)

- apply-review.js 가 target 못 찾으면: 1) stale flag 로 review patch 에 `status: dangling` 기록, 2) 작성자에게 재지정 요청, 3) **자동 force-apply 금지**.
- worklog MD 동시 수정은 git merge 에 위임. *approval MD 는 derived* 라 충돌 없음(자동재생성).
- block-level lock 같은 건 만들지 말 것 — 과잉.

### F. frontmatter 단계적 도입

- phase-1: `id`, `status` 만 필수.
- phase-2: `risk`, `needs_human_review` (validate 가 의미 가지기 시작할 때).
- phase-3: `owner`, `type`, `updated` (자동 git log 에서 도출 가능하므로 후순위).
- discord_chatbot 의 ADR 은 phase-1 단계에서 멈춰도 충분.

## MVP 제안

§14 의 7 단계는 너무 큼. 진짜 MVP:

1. **`docs/research/` 1 개 파일에 block id 시범 적용** (frontmatter 는 기존 ADR 와 동등하게 `id`+`status` 만).
2. **`scripts/parse-md.js` (Node 또는 Python uv)**: frontmatter + block id 추출, 중복/필수 누락만 검사. linter 1 개로 시작.
3. **`scripts/render-html.js` + evidence-report 템플릿 1 개**: 1 개 파일 → 1 개 HTML. CSS 는 정적 파일 1 개.
4. **HTML 결재서 하단에 review queue 표시** (단순 표; 입력 UI 는 phase-2).
5. **3 회 실제 사용 후 게이트**: 토큰 절감 실측, 사람 review 부담 변화, block id 안정성 — 측정 후 진행 여부 결정.

스크립트 확장(build-approval-md, validate-blocks, apply-review)은 위 1–5 검증 후. **approval MD 자체를 MVP 에 안 넣는다** — 1 개 문서 → 1 개 HTML 흐름이 먼저 자생력 갖는지 확인.

## 문서에서 모호하거나 고쳐야 할 섹션

- **§1**: 인용한 외부 사례에 링크 없음. design doc 본체에 평문 인용은 §3 의 근거로 약함. `docs/research/<topic>.md` 로 분리하고 링크만 남기는 게 discord_chatbot writing-guide 와도 맞음.
- **§3.4 권장 흐름 도식**: "agent markdown artifacts → parser → approval markdown" — parser 가 approval 을 만든다? 그 단계는 build-approval-md 이지 parser 가 아님. naming 혼동.
- **§4 디렉터리 구조**: `report-tools/`, `report-templates/`, `report-schemas/` 가 repo 루트에 있는데, discord_chatbot 처럼 이미 `scripts/`, `docs/` 가 있는 repo 에 도입하면 충돌. *기존 repo 의 관습에 맞춰 위치하라* 는 한 줄 추가.
- **§5 "필수 frontmatter" 7 필드**: 위 F 처럼 단계화. 현재 표현은 "다 필수" 처럼 읽힘.
- **§7 review patch 예시**: source of truth 가 `.review.md` 라고 적었는데 §3.2 "HTML 은 최종 진실 원본이 아니다" 와 함께 *review 의 SSoT* 를 명시 (위 B 표 권장).
- **§9 validate-blocks.js**: "source 없는 strong claim 감지" 는 NLI 급. MVP linter 와 *LLM 검증 에이전트* 분리 표기.
- **§12.3 block id 안정성**: "별도 migration" 한 줄로 끝남. P0 #1 의 처리정책 필요.
- **§13 self-question 8 개**: #1·#3·#6 은 본문이 답할 수 있는 질문 — 본문으로 이동 또는 ADR proposed status 명시.
- **§14 step 7 "수정 에이전트가 target block 만 읽고 원본 MD 수정"**: 위 P1 #5 의 측정 게이트 추가 필요.

## 최종 판단

**approve with changes.**

방향(§3 의 역할분리)과 도입순서(§14 의 점진성)는 옳다. 그러나 (1) SSoT 정의(P0 #2), (2) 이미 존재하는 layer 와의 공존 정책(P0 #3) — discord_chatbot 의 Discord+RAG·ADR·GH PR review 와 *대체가 아니라 강화* 로 자리잡기, (3) 사람 review UX 레이어(P0 #4), (4) 동시편집/stale target 처리(P0 #1) 4 개는 머지 전 채워야 한다. 채우면 cross-project 통용 원칙으로 ADR/research/handoff 강화에 충분히 쓸 수 있다.

cross-project 통용 원칙으로 뽑아낼 한 줄 정리:

> **"새로운 worklog layer 를 만들지 말고, 기존 영구문서(ADR/research/handoff)에 frontmatter + block id + review patch 를 얹는다. review SSoT 는 GH PR review thread 가 1순위, `.review.md` 는 fallback. HTML 은 build artifact 로 git 밖."**

---

## Appendix — comfyui 리뷰(같은 디렉터리)와의 차이 요약

| 항목 | comfyui 리뷰 (`*.review.md`) | 본 리뷰 (`*.review.discord-chatbot.md`) |
|---|---|---|
| cross-project scope | `E:\comfyui` (handoff.md 자생 결재서, ADR 7개) | `discord_chatbot` (Discord+RAG 협업 layer, ADR status lifecycle, "일회성 보고서 금지" 안티패턴) |
| 핵심 P0 차이 | block id drift + anchor_quote 부재, review 작성 UX, source of truth 4단 | 위 + **기존 layer 중복** (GH PR review thread vs `.review.md`, Discord+RAG vs HTML 결재서) |
| 통용 원칙 한 줄 | "frontmatter 4필드 + block id 3개 + review patch 1포맷부터, HTML 은 리뷰어 2명·1000줄 임계점 이후" | "새 worklog layer 만들지 말고 ADR/research/handoff 강화로. review SSoT 는 GH PR review thread 1순위" |
| MVP 첫 dogfood | 원 문서 자체 | `docs/research/` 1 개 파일 |
| 결론 | approve with changes | approve with changes |

두 리뷰가 동일한 verdict 에 도달했지만, *어느 layer 를 가장 먼저 깨야 하는가* 의 진단이 다르다. discord_chatbot 처럼 협업 layer 가 이미 분화된 환경에선 "기존 layer 와의 공존" 이 가장 큰 P0, comfyui 처럼 1:1 환경에선 "block id drift 와 작성 UX" 가 가장 큰 P0. 같은 design 이 환경별로 부서지는 지점이 다름 — 원 문서 §14 뒤에 "환경별 부분 채택 가이드" 섹션이 필요한 이유.
