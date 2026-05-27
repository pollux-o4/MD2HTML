---
id: review-md-html-agent-workflow-strategy
type: review-note
reviewer: Claude (Opus 4.7, design-review mode)
updated: 2026-05-18
target_document: md-html-agent-workflow-strategy.md
verdict: approve-with-changes
cross_project_scope:
  - C:\Users\orix4\Documents\html-md (원 대상)
  - E:\comfyui (통용 검증 대상)
---

# Review: MD-HTML Agent Workflow Strategy

원문: `docs/md-html-agent-workflow-strategy.md` (작성일 2026-05-18, 리뷰 요청 초안)
리뷰 범위: 단순 문서 비평이 아니라, **다른 자연발생 프로젝트(`E:\comfyui`)에서도 통용 가능한 원칙**으로 추출 가능한가까지 평가.

---

## 0. E:\comfyui 통용 검증을 먼저 한 이유

원 문서의 시나리오는 "외부 리서치 노트 여러 개 → approval MD → HTML 결재서"라는 상대적으로 깔끔한 케이스다. 그러나 실제 운영 중인 멀티에이전트 프로젝트(`E:\comfyui`)는 다음과 같이 **이미 비슷한 시스템을 자연발생적으로 운영**하고 있다.

| 원 문서의 개념 | E:\comfyui의 자연발생 대응물 |
|---|---|
| worklog Markdown | `notes/issues/NNNN-*.md` (34개), `notes/sam3-smoke/`, `notes/sage-tests/RESULTS.md` |
| approval Markdown | `handoff.md` (세션 종료 시 덮어쓰기 — "현재 상태 + 다음 액션"의 결재서) |
| 결정 기록 | `docs/adr/NNNN-*.md` (7개, immutable except Status) |
| 참고 매뉴얼 | `docs/references/*.md` (`z-image.md`, `comfyui-windows-8gb.md`, ...) |
| 영구 학습 | `memory.md` (append-only) |
| block id / frontmatter | **없음** (파일명 prefix `NNNN-`만으로 식별, 본문은 자유 Markdown) |
| HTML 결재서 | **없음** (사용자가 직접 MD를 읽음) |
| review patch | **없음** (수정은 git diff로만 추적) |

즉 comfyui는 이미 "Markdown 원장 + handoff 결재서 + ADR" 구조를 갖고 있지만, **block id와 review patch가 빠진 상태**다. 원 문서가 제안하는 시스템이 comfyui에 그대로 이식되려면 다음 두 가지가 검증돼야 한다.

1. **이식 비용**: 34개 issue + 7개 ADR + 20여 개 reference 파일에 frontmatter와 block id를 소급 적용할 가치가 있는가?
2. **HTML 결재서의 부재가 본질적인 결함인가, 아니면 1:1(사람 1 + 에이전트 N) 환경에서는 불필요한가?**

이 두 질문이 리뷰 곳곳에 깔려 있다.

---

## 1. 총평 (5문장 이내)

역할 분리(Markdown=원장, HTML=결재 표면, review patch=피드백 채널)는 **개념적으로 타당하고 실제 멀티에이전트 협업의 핵심 병목을 정확히 짚었다**. 그러나 구체 설계에서는 (a) approval Markdown이 중간 산출물로 들어가면서 source of truth가 4단계로 늘어나는 문제, (b) block id의 drift/anchor 검증 메커니즘 부재, (c) HTML에서 review patch를 **어떻게** 작성하는지에 대한 도구 설계 누락 — 이 세 가지가 P0 수준의 결함으로 남아 있다. 6개 템플릿과 9개 권장 block id로 시작하자는 §8/§5는 명백히 과하며, **MVP는 frontmatter 최소 4필드 + block id 3개 + review patch 1포맷**으로 좁혀야 첫 한 사이클이 돌아간다. comfyui에 통용시키려면 "block id는 파일 내부 의미 단위, 파일 식별자는 파일명 prefix"라는 이중 ID 규약과 "결재서는 별도 산출이 아니라 derived view"라는 정정이 필요하다. 결론은 **approve with changes** — 핵심 아이디어는 유지하되 §6(approval MD)과 §9(스크립트 6종)는 MVP에서 빼고 §7(review patch)을 구체화해야 한다.

---

## 2. 강점

- **문제 정의(§2)가 정확하다**: "팀장이 모든 작업일지를 처음부터 끝까지 읽지 않는다"는 비유는 멀티에이전트 협업의 비대칭(생산은 싸고, 사람 검토는 비싸다)을 한 문장으로 포착했다. comfyui에서도 이미 34개 issue가 쌓이면서 같은 문제가 발생하고 있고, `handoff.md`가 자생적으로 결재서 역할을 떠맡았다는 사실이 §2의 진단을 뒷받침한다.
- **§3.4 "LLM이 HTML을 직접 길게 쓰지 않는다"**: 토큰/시간 비용 관점에서 정확하다. 템플릿 + 데이터 분리는 비용 최적화의 정석이다.
- **§7 review patch의 target/decision/comment 트리플**: 단순하고 파싱하기 쉬우며 사람도 직접 쓸 수 있다. comfyui의 PR review 코멘트 패턴과 자연스럽게 일치한다.
- **§12.3 block id 안정성에 대한 자각**: 문제를 인식하고 있다는 점은 좋다(다만 해법이 약하다 — 후술).
- **§14 점진적 도입 제안**: "처음부터 완전한 시스템 만들 필요 없다"는 톤이 살아있다. 다만 단계 1~7이 너무 많아 실제 MVP는 더 좁혀야 한다.
- **자체 dogfood 가능성**: 이 전략 문서 자체에 frontmatter와 block id를 붙여 첫 사례로 쓸 수 있다는 점에서, 추상적 설계가 아니라 즉시 검증 가능한 구조다.

---

## 3. 주요 우려사항

### P0 — block id drift와 anchor 검증 부재 (§12.3 부분적 인식, 해법 미흡)

§5는 `<!-- block:claims -->` 같은 explicit id를 권장하고, §12.3은 "사람이 안정적인 이름을 지으면 된다"는 정도로 마무리한다. 그러나 실제 위험은 **id가 바뀌는 것이 아니라 id 안의 내용이 바뀌는 것**이다.

시나리오: 검증 에이전트가 `research-pattern-04.md#claims`를 향해 "주장 강도가 강함"이라는 review patch를 남긴 사이, 다른 에이전트가 그 block의 문장을 일부 수정했다고 하자. review patch는 여전히 같은 id를 향하지만, 비판하던 그 문장은 이미 사라지거나 톤이 바뀌었다. 수정 에이전트는 stale review를 보고 잘못된 수정을 가한다.

**필요한 보강**:
- block id에 더해 **anchor hash** (block 내용의 sha256 앞 8자) 또는 anchor quote (수정 시점에 인용한 원문 한 문장)를 review patch에 함께 적는다. apply-review가 이 hash/quote와 현재 내용이 다르면 reviewer에게 다시 확인하도록 fail-loud 처리.
- §5 권장 block id 9개에 anchor hash 컨벤션을 추가하거나, §7 review patch 스키마에 `anchor_quote:` 필드 필수화.

이것이 빠지면 review patch는 "코드가 바뀌어도 옛날 라인 번호를 가리키는 주석"과 같아진다.

### P0 — HTML에서 review patch를 **어떻게** 만드는지 누락 (§7 + §12.2 사이의 구멍)

§7은 "HTML 하단에 human review 섹션을 둔다"고 하고, §12.2는 "HTML에서 직접 본문 수정은 허용하지 않고 review note만 작성한다"고 한다. 그런데 **사람이 review note를 정확히 어떤 도구로 작성하는가**가 비어 있다.

가능한 옵션:
1. HTML 안에 inline `<textarea>` + "review patch 텍스트를 클립보드에 복사" 버튼. 사람은 그걸 `.review.md`에 붙여넣음.
2. 정적 HTML이 아니라 작은 Node 서버를 띄워 form submit → `.review.md` 자동 생성.
3. 그냥 사람이 에디터에서 `.review.md`를 직접 손으로 작성.

세 가지 비용/UX가 완전히 다른데 문서는 선택을 안 했다. **3번을 고를 거면 §7의 "HTML 하단 human review 섹션"이라는 표현이 거짓말이 되고**, 1/2번을 고를 거면 그 도구가 사실상 MVP의 핵심 산출물이다. §13의 질문 2번이 정확히 이걸 짚었지만 본문에서 답을 내지 않았다.

**필요한 결정**: MVP 첫 사이클에서는 1번(클립보드 복사 버튼)을 추천. 정적 HTML이라 인프라 비용이 0이고, 사람이 우회하기 쉬워 채택 마찰이 적다. 2번은 멀티유저 환경에서 필요해질 때 도입.

### P0 — source of truth 4단(§15 vs §6)의 모순

§15 결론은 "Markdown 원장이 진실"이라고 한다. 그러나 §6은 approval Markdown을 별도 산출물로 두고, §4 디렉토리 구조는 `worklog/`, `summaries/`, `reviews/`, `html/` 4계층으로 나뉜다.

worklog가 변경되면 approval은 stale이 되고, review는 approval을 향해 쓰였으므로 review도 의미가 흔들린다. 즉 **진실은 1개**가 아니라 **시간차로 stale 가능한 4개 산출물**이 된다. §13의 질문 8번이 이걸 묻지만 본문이 답하지 않는다.

**필요한 정정**:
- approval Markdown을 **별도 산출물(git에 commit)이 아니라 derived view(빌드 캐시)**로 위치를 바꾼다. JSON 빌드 산출물(`build/approval.json`)이거나, 매번 `build-approval.js`를 돌려 재생성하는 일회용 MD.
- 그래야 source of truth가 명확히 `worklog/*.md` + `reviews/*.review.md` 2개로 줄어든다. 둘 다 사람/에이전트가 직접 쓰는 입력. 나머지(approval MD, HTML)는 derived.
- §6 제목을 "Approval Markdown (derived)"으로 바꾸고, "이 파일은 git에 커밋하지 말고 build 산출물 디렉토리에만 둔다"는 한 문장을 명시.

이 정정이 들어가면 §15 결론의 "Markdown 원장이 진실"이 일관성을 갖는다.

### P1 — 6개 템플릿(§8)과 9개 권장 block id(§5)는 명백히 과하다

§5는 9개 block id(`exec-summary`, `claims`, `sources`, `evidence`, `caveats`, `open-questions`, `decisions-needed`, `next-actions`, `human-review`)를 나열하고 §8은 6개 템플릿을 제안한다. 그러나:

- comfyui의 34개 issue를 훑어보면 자생적으로 쓰이는 의미 단위는 사실상 **"현재 상태", "발견사항/결과", "다음 액션"** 3개가 95%다. ADR도 마찬가지로 Status/Context/Decision/Consequences 4개로 정착한다.
- 9개 block을 강제하면 에이전트가 빈 블록을 채우려고 hallucination을 생성하는 부작용이 발생한다(원 문서 §12.1이 인식하지만 권장 최소가 여전히 5개 + frontmatter).

**필요한 정정**:
- block id MVP는 **3개로 축소**: `exec-summary`, `findings`(claims/evidence/caveats 통합), `next-actions`. 나머지는 필요할 때 ad-hoc로 추가하되 권장 표준은 아님.
- 템플릿 MVP는 **1개**: `evidence-report` 하나. 다른 5개는 첫 사이클을 돌린 후 실제 부족함이 드러나면 추가. §8 표를 "초기 후보"가 아니라 "**evidence-report 하나로 시작, 나머지는 후보 풀**"로 명확히.

### P1 — frontmatter `status` 상태머신 미정의 (§5)

`draft → verified → needs-revision → approved → rejected` 5개 상태를 나열했지만 전이 규칙이 없다. 의문:

- `rejected` 후 다시 `draft`로 돌아갈 수 있나? (재작업 케이스)
- `needs-revision`은 누가 설정하나? 사람? review patch가 자동으로?
- `verified`와 `approved`의 차이는? 전자는 검증 에이전트가, 후자는 사람이?

comfyui의 ADR은 단순히 `Status: Accepted` 한 줄로 끝난다. 5상태 상태머신은 도입 비용 대비 효익이 불명확.

**필요한 정정**:
- MVP는 3상태로: `draft`, `needs-review`, `approved`. 거부는 새 문서를 만들거나 supersede 링크로.
- 전이 다이어그램을 문서에 추가하거나, 아니면 상태머신 자체를 빼고 freeform Status 1줄로 대체.

### P1 — 멀티에이전트 동시 수정 정책 부재 (§12에 없음)

§12는 구조 과잉, HTML 편집 유혹, block id 안정성, 요약 손실을 다루지만 **두 에이전트가 동시에 같은 MD를 수정**하는 케이스가 빠졌다. 사용자 질문 6번이 정확히 이걸 묻는다.

시나리오: 검증 에이전트가 `research-pattern-04.md#claims`를 수정하는 사이, 다른 검증 에이전트가 같은 파일의 `#caveats`를 수정한다. git은 line-level merge로 처리하지만, frontmatter `updated:`가 충돌하거나 두 패치가 같은 block을 건드리면 깨진다.

**필요한 정정** (단순한 1차 답):
- "한 시점에 한 파일은 한 에이전트만 쓴다"는 **파일 단위 advisory lock** 규약을 명시. 락은 frontmatter에 `lock: agent-b-2026-05-18T12:00` 형식으로 표시, 만료시간 포함.
- block-level 동시 수정은 MVP 범위 밖. 필요해지면 그때 도입.

### P1 — approval MD vs JSON report 선택 (§13 질문 3에 답 없음)

§13에서 묻기만 하고 본문이 답하지 않는다. 이건 아키텍처 결정이라 답이 있어야 한다.

**제안 답**:
- 사람-읽기 가능한 derived view는 MD로(`build/approval.md`).
- 기계-소비 중간 표현은 JSON(`build/approval.json`)으로, render-html이 소비.
- 두 산출물 모두 `build/`에 두고 git ignore. 입력(worklog + reviews)만 커밋.

이 분리가 들어가면 §9의 `build-approval-md.js`와 `render-html.js`가 깨끗하게 갈라진다.

### P1 — comfyui 적용 시 비대칭 (cross-project 검증)

문서의 예시는 외부 리서치(`research-pattern-04.md`)에 강하게 묶여 있다. comfyui에 옮기면 다음 비대칭이 드러난다.

| 항목 | 원 문서 가정 | comfyui 현실 |
|---|---|---|
| 파일 식별자 | frontmatter `id:` | 파일명 prefix `NNNN-` (이미 안정적) |
| 진실 원장 | `worklog/*.md` | `notes/issues/*.md` + `docs/adr/*.md` + `docs/references/*.md` (3계층) |
| 결재서 | approval MD (별도 산출) | `handoff.md` (이미 존재, 매 세션 덮어쓰기) |
| HTML 결재서 | 핵심 산출 | **부재, 그리고 1:1 환경에서 정말 필요한지 검증 안 됨** |
| 리뷰 채널 | review patch | git commit message + handoff "Last by:" 줄 |
| 사용 언어 | 한국어 본문 + 영어 id 가능성 | 한국어 본문, 한국어 issue 제목 다수 |

특히 **HTML 결재서의 필요성**이 1:1 환경에서는 약하다. 사용자(사람 1명) + 에이전트 N의 구조에서, 사용자가 매번 보는 건 `handoff.md` 1개다. HTML 렌더링이 가치를 더하는 시점은 (a) 리뷰어가 여러 명일 때, (b) 결재서가 길어져 navigation/콜아웃/표가 필요할 때다.

**필요한 정정**: §1 또는 §11에 **"HTML 결재서가 가치 있는 임계점"**을 명시. 예: "리뷰어가 2명 이상이거나 결재서 한 화면이 1000줄을 넘는 시점에 HTML 도입을 추천. 그 전에는 잘 구성된 MD가 더 싸다." 이 한 줄이 들어가면 comfyui처럼 작은 프로젝트는 HTML 단계를 스킵하고 frontmatter/block id/review patch만 도입하는 부분 채택이 가능해진다.

### P2 — `apply-review.js`가 "다음 에이전트 컨텍스트 절약"을 정말 만드는가? (§9, §11)

사용자 질문 3/7에 연결. 문서는 "block과 review patch만 읽으면 된다"고 주장한다. 그러나 LLM이 작은 수정을 정확히 하려면 **block 주변 문맥**(앞 블록의 결론, 출처 표, 인접 caveats)을 같이 봐야 하는 경우가 많다. 예: `claims` 수정을 위해 `sources`와 `caveats`도 함께 읽어야 일관성이 유지된다.

즉 컨텍스트 절약은 **block-level이 아니라 "block + 의존하는 다른 block들"** 수준이며, 절감폭은 문서가 암시하는 만큼 크지 않을 수 있다(아마 30~60% 수준, 90%는 아님).

**필요한 정정**: §11 기대효과의 "전체 문서를 읽지 않아도 된다"를 "관련 block들만 읽으면 된다"로 톤다운하고, apply-review.js가 target block에 더해 **선언적 dependency block**(예: claims를 수정할 때는 sources도 자동 포함)을 따라가는 옵션을 §9에 추가.

### P2 — frontmatter `needs_human_review: bool`은 ternary가 필요 (§5)

`true | false`만으로는 "이미 사람이 본 적 있음(addressed)" 상태를 표현할 수 없다. review patch가 들어왔지만 아직 반영 안 됨, 반영 완료 등의 라이프사이클이 묻힌다.

**필요한 정정**: `needs_human_review: pending | in_progress | addressed | skipped` 4상태 또는 `human_review_status`로 명명 변경.

### P2 — 다국어 컨텐츠와 id 컨벤션 (문서 누락)

원 문서 예시는 한국어 본문이지만 block id는 영어(`exec-summary`, `claims`). 일관성과 검색성 측면에서 좋은 선택이지만 **컨벤션으로 명시되어 있지 않다**. 다른 에이전트가 한국어 block id (`<!-- block:요약 -->`)를 만들기 시작하면 파싱과 검색이 깨진다.

**필요한 정정**: §5에 "block id는 영어 kebab-case로 고정, 본문은 자유 언어"라는 한 줄 추가.

---

## 4. 설계 수정 제안 (구체)

### 4.1 디렉토리 구조 정정 (§4)

```text
docs/
  worklog/                       # 입력 (git commit)
    *.md
  reviews/                       # 입력 (git commit)
    *.review.md

build/                           # derived (git ignore)
  approval.md
  approval.json
  approval.html
```

기존 §4의 `summaries/`와 `html/`은 모두 `build/`로 합친다. 이게 §15 "Markdown이 진실"과 정합한다.

### 4.2 frontmatter MVP 스키마 (§5 축소)

```yaml
id: <kebab-case-or-filename>     # 필수
type: worklog | review | adr     # 필수, 3종
status: draft | needs-review | approved   # 필수, 3종
updated: YYYY-MM-DD              # 필수
# 아래는 선택
owner: <agent-or-human>
risk: low | medium | high
supersedes: <id>                 # rejected 대신 사용
```

`needs_human_review`, `source_count`, `verified` 등은 MVP에서 빼고 필요해지면 추가.

### 4.3 block id MVP (§5 축소)

```text
exec-summary    # 한 화면 요약
findings        # claims + evidence + caveats 통합
next-actions    # 다음 할 일
```

이 3개를 권장 표준으로 하고, 나머지는 ad-hoc 허용하되 표준 아님. 첫 사이클 후 부족하면 `decisions-needed`, `open-questions` 추가.

### 4.4 review patch 스키마 강화 (§7 + P0 해결)

```yaml
target: research-pattern-04.md#claims
anchor_quote: "산출물 형식은 리서치 결과의 검토 가능성을 높인다."   # 필수, drift 검증용
decision: revise | approve | reject | needs-clarification
priority: high | medium | low
comment: "..."
reviewer: human | <agent-id>     # 필수, drift attribution
created: YYYY-MM-DDTHH:MM
```

apply-review.js는 `anchor_quote`가 현재 block 내용에 substring으로 존재하지 않으면 **fail loud, 자동 적용 거부**.

### 4.5 HTML 결재서의 review 작성 UX (P0 해결)

MVP 결정: HTML에 inline `<textarea>` + "review-patch 텍스트 생성 → 클립보드 복사" 버튼. 사람이 복사 후 에디터에서 `.review.md`에 붙여넣음. 인프라 비용 0, 우회 가능성이 도구 채택 마찰을 낮춤.

### 4.6 cross-project 통용 원칙 (E:\comfyui 적용 가이드)

문서 §11 또는 §14 뒤에 다음 섹션 추가 권장:

> **이 전략을 다른 프로젝트에 부분 채택할 때**:
> 1. **최소 채택**: frontmatter 4필드(id/type/status/updated) + block id 3개(exec-summary/findings/next-actions) + review patch 1포맷.
> 2. **HTML 결재서는 임계점 도달 후 도입**: 리뷰어 2명 이상이거나 결재서가 1000줄을 넘기 전엔 잘 구성된 MD가 더 싸다.
> 3. **기존 파일명 식별자(`NNNN-` prefix 등)가 안정적이면 frontmatter `id:`는 그대로 파일명 stem을 쓰면 된다**. 새 ID 체계를 강요하지 않는다.
> 4. **기존에 자생한 결재서(`handoff.md`, `STATUS.md` 등)가 있으면 그것을 approval MD로 승격**하고 별도 derived 산출물을 만들지 않는다.

이 4줄이 들어가야 comfyui처럼 이미 자생한 프로젝트가 큰 마이그레이션 없이 점진 도입할 수 있다.

---

## 5. MVP 제안 (사용자 질문 9)

원 문서 §14는 7단계지만, 첫 한 사이클을 돌려보기엔 너무 많다. 다음 4단계로 축소 권장.

1. **샘플 1개에 frontmatter + block id 수동 적용** — 원 문서 자기 자신(`md-html-agent-workflow-strategy.md`)을 첫 dogfood로. 이 문서 §1~§15에 frontmatter와 `<!-- block:exec-summary -->` 등 3개 block을 손으로 붙인다.
2. **`scripts/render-html.js` 정적 변환기** — markdown-it 또는 marked + 1개 CSS 템플릿(evidence-report). approval MD를 받지 않고 worklog MD를 직접 렌더. approval 단계는 일단 스킵.
3. **HTML 하단에 inline review textarea + 클립보드 복사 버튼** — 정적, 인프라 0. 사람이 복사해 에디터에 붙여넣음.
4. **`scripts/apply-review.js`** — review-patch를 읽어 target block + anchor_quote 검증, 일치 시 다음 에이전트용 컨텍스트 패키지(target block + 이름이 같은 인접 block들)를 stdout으로 출력.

이 4단계가 한 사이클이다. 끝나고 나서 다음을 추가:
- `build-approval-md.js` (여러 worklog 통합) — 실제로 한 화면에 다 안 들어올 만큼 worklog가 쌓인 시점.
- `validate-blocks.js` — 에이전트가 frontmatter나 block 규약을 어기기 시작하는 시점.
- 추가 템플릿 5개 — evidence-report만으로 표현이 어색한 케이스가 2회 이상 나오는 시점.

**핵심**: build-approval, validate, 6개 템플릿, 9개 block id를 모두 1차에 만드는 것은 over-investment. 한 사이클을 돌려본 후 자동화 가치가 검증된 부분만 코드로 옮긴다.

---

## 6. 문서에서 모호하거나 고쳐야 할 문장/섹션

| 위치 | 원 표현 | 문제 | 권장 수정 |
|---|---|---|---|
| §3.2 | "HTML은 원본 Markdown과 review patch에서 재생성 가능해야 한다" | review patch가 HTML 재생성의 입력이라는 표현은 source of truth 4단 혼란의 시작 | "HTML은 worklog Markdown에서 재생성 가능하다. review patch는 다음 사이클의 입력이지 HTML의 입력이 아니다." |
| §4 | `summaries/`, `html/` 별도 디렉토리 | derived와 input이 같은 트리에 섞임 | `build/` 단일 트리로 통합, gitignore |
| §5 9개 block id | 너무 많음 | 에이전트가 빈 block 채우려고 hallucination | MVP 3개로 축소(§4.3 참조) |
| §5 frontmatter `status` 5상태 | 전이 규칙 없음 | 실제 운영 불명확 | 3상태 + 전이 다이어그램 또는 freeform 1줄 |
| §6 "approval Markdown" 위치 | 별도 산출물로 git에 commit하는 듯 보임 | source of truth 혼란 | "derived view, build/에만 둔다" 명시 |
| §7 "HTML 하단에는 human review 섹션을 둔다" | 작성 도구 미정 | 사람이 어떻게 쓰는지 모호 | inline textarea + 클립보드 복사 버튼(§4.5) |
| §8 6개 템플릿 | 1차 도입에 과함 | over-investment | evidence-report 1개로 시작, 나머지는 후보 풀 |
| §9 5개 스크립트 | 같은 사이클에 다 만든다는 톤 | 검증되지 않은 자동화 | MVP는 render-html + apply-review 2개 |
| §11 "전체 문서를 읽지 않아도 된다" | 과장 가능 | block 의존성 무시 | "관련 block들만 읽으면 된다. 절감폭은 30-60% 수준" |
| §12 동시 수정 | 항목 부재 | 멀티에이전트 핵심 위험 누락 | §12.5 추가: 파일 단위 advisory lock |
| §13 질문 3, 8 | 본문에서 답 없음 | 결정 미뤄짐 | 본문에서 답하기 (approval MD = derived, source of truth = worklog + reviews) |
| §15 결론의 "3가지 핵심 기술" | frontmatter / block id / review patch | block id의 drift 검증(anchor_quote) 빠짐 | "frontmatter, stable block id + anchor verification, review patch" |

---

## 7. 최종 판단

**Approve with changes.**

핵심 아이디어(역할 분리, review patch, 토큰 비용 의식적 설계)는 유지할 만하고, 실제로 비슷한 구조가 comfyui에서 자생했다는 사실이 설계의 방향성을 검증한다. 다만 P0 3건(block id drift / review patch 작성 UX / source of truth 4단)이 해결되지 않으면 첫 사이클을 돌리는 순간 깨진다. MVP 범위를 §5의 절반, §8의 1/6, §9의 2/5로 좁히면 가벼운 첫 사이클이 가능하고, 그 결과를 본 뒤 나머지 확장은 데이터에 근거해 결정할 수 있다.

comfyui 같은 기존 프로젝트로 통용시키려면, 본 리뷰 §4.6의 "부분 채택 원칙" 4줄이 원 문서에 들어가야 한다. 그렇지 않으면 기존 프로젝트는 "전부 도입 or 전혀 도입 안 함"의 이분법에 갇혀, 결국 후자를 고를 것이다.

---

## Appendix A — 이 리뷰 자체의 dogfood 메모

이 문서는 의도적으로 다음을 따랐다:
- frontmatter 5필드(id/type/reviewer/updated/target_document) + verdict + cross_project_scope.
- block id는 사용하지 않음 (검토 결과 review patch 자체가 block 분할 효익보다 비용이 클 만큼 짧음 — 이 결정이 §4.3 "block 3개 MVP" 권장과 정합).
- 섹션 번호로 원 문서 인용(§n.n 형식).
- 한국어 본문, 영어 id, 한국어 verdict 키워드(approve-with-changes는 예외 — 다국어 혼용은 정책적으로 영어 enum 유지).

원 문서 저자가 이 리뷰를 받아 §4.6 부분 채택 원칙을 본문에 흡수하면, 본 리뷰 자체가 "review patch가 어떻게 원본 MD의 작은 수정 작업으로 환원되는가"의 첫 실제 사례가 된다.
