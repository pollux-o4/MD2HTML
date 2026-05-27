# MD-HTML Agent Workflow Strategy

작성일: 2026-05-18  
상태: 리뷰 요청 초안  
목적: 여러 LLM 에이전트와 여러 세션이 협업할 때 Markdown 산출물과 HTML 검토 화면을 함께 운용하기 위한 전략 정리

## 1. 배경

이 프로젝트의 출발점은 단순한 Markdown-to-HTML 변환이 아니다. 사용자는 여러 에이전트가 조사, 검증, 정리, 수정 작업을 병렬 또는 순차로 수행하는 환경에서 사람이 모든 Markdown 산출물을 직접 읽기 어렵다는 문제를 제기했다.

초기 조사에서는 Reddit, Andrej Karpathy, Simon Willison, Ethan Mollick, Armin Ronacher, Anthropic/OpenAI/Cognition 사례를 바탕으로 LLM agent 사용 패턴을 HTML 보고서로 정리했다. 이후 추가 심화 조사에서는 다음 네 가지 주제가 중요하게 다뤄졌다.

- 리서치 에이전트는 산출물 형식이 있을 때 더 검토하기 쉽다.
- 컨텍스트 파일은 에이전트용 작업 계약서 역할을 한다.
- 자동 평가 루프가 있으면 장시간 작업을 맡기기 쉽다.
- Ethan Mollick의 Claude Sonnet 4.5 경제학 논문 재현 사례는 구조화된 입력, 결과 비교, 교차검토의 중요성을 보여준다.

사용자의 문제의식은 다음과 같다.

- Markdown은 싸고 빠르며 여러 에이전트의 중간 작업 원장으로 적합하다.
- 하지만 사람이 많은 Markdown을 전부 읽고 결재하거나 검토하기는 어렵다.
- HTML은 읽고 검토하기 좋지만, LLM이 매번 직접 생성하면 오래 걸리고 토큰 비용이 크다.
- 사람은 완성된 HTML 화면에서 리뷰하고 수정 요청을 남기고 싶어 한다.
- 이후 에이전트는 전체 문서를 다시 읽기보다, 특정 블록과 리뷰 요청만 읽고 수정해야 한다.

따라서 목표는 "Markdown을 버리고 HTML로 간다"가 아니다. 목표는 Markdown을 저비용 작업 원장으로 유지하면서, HTML을 결재서와 리뷰 표면으로 사용하는 것이다.

## 2. 문제 정의

여러 에이전트가 협업할 때 산출물은 자연스럽게 많아진다.

- 조사 에이전트의 리서치 메모
- 검증 에이전트의 사실 확인 결과
- 구현 에이전트의 변경 요약
- 리뷰 에이전트의 위험 지적
- 상위 에이전트의 통합 요약

이 모든 파일을 사람이 직접 읽는 것은 팀장이 모든 팀원의 작업일지를 매번 처음부터 끝까지 읽는 것과 비슷하다. 실제 조직에서는 팀장이 결재서, 요약 보고서, 위험 목록, 의사결정 항목을 본다.

LLM 협업 환경에서도 같은 구조가 필요하다.

- 상세 작업 로그는 Markdown으로 남긴다.
- 상위 요약은 Markdown에서 자동 추출한다.
- 사람에게는 HTML 결재서로 보여준다.
- 사람의 코멘트는 원본 Markdown의 특정 블록에 연결한다.
- 다음 에이전트는 전체 컨텍스트가 아니라 해당 블록과 리뷰 요청만 읽는다.

## 3. 핵심 원칙

### 3.1 Markdown은 작업 원장이다

Markdown은 계속 유지해야 한다. 이유는 다음과 같다.

- 토큰 비용이 낮다.
- 사람이 터미널과 에디터에서 읽기 쉽다.
- git diff가 명확하다.
- 에이전트가 생성하고 수정하기 쉽다.
- 여러 세션의 중간 산출물을 보존하기 좋다.

다만 완전한 자유 텍스트 Markdown만으로는 자동 집계와 부분 수정이 어렵다. 따라서 최소한의 구조를 부여해야 한다.

### 3.2 HTML은 결재 및 리뷰 표면이다

HTML은 최종 진실 원본이 아니다. HTML은 사람이 검토하기 좋은 화면이다.

- 카드, 표, 콜아웃, 강조, 출처 표를 통해 가독성을 높인다.
- 모든 중간 산출물을 HTML로 만들 필요는 없다.
- 사람이 봐야 하는 승인용 요약 또는 위험 보고서만 HTML로 렌더링한다.
- HTML은 원본 Markdown과 review patch에서 재생성 가능해야 한다.

### 3.3 수정은 block id를 통해 원본으로 돌아가야 한다

사람이 HTML을 보며 남긴 수정 요청은 원본 Markdown의 특정 블록에 연결되어야 한다.

예:

```text
target: research-pattern-04.md#claim-summary
decision: revise
comment: "품질이 좋아진다는 표현은 강함. 검토 가능성으로 낮춰라."
```

이렇게 해야 다음 에이전트가 전체 문서를 다시 읽지 않고도 정확한 수정 범위를 알 수 있다.

### 3.4 LLM은 HTML을 직접 길게 쓰지 않아야 한다

HTML과 CSS를 매번 LLM이 직접 생성하면 토큰과 시간이 많이 든다. 대신 LLM은 Markdown 또는 구조화된 블록을 만들고, 렌더러가 HTML을 생성해야 한다.

권장 흐름:

```text
agent markdown artifacts
-> parser
-> approval markdown or report object
-> HTML renderer
-> human review
-> review patch
-> targeted markdown update
```

## 4. 제안 아키텍처

권장 디렉터리 구조:

```text
docs/
  worklog/
    agent-a.research.md
    agent-b.verification.md
    agent-c.implementation.md

  summaries/
    agent-patterns.approval.md

  reviews/
    agent-patterns.review.md

  html/
    agent-patterns.approval.html

report-tools/
  parse-md.js
  build-approval-md.js
  render-html.js
  apply-review.js
  validate-blocks.js

report-templates/
  evidence-report.html
  decision-memo.html
  reproduction-report.html
  technical-audit.html

report-schemas/
  markdown-frontmatter.schema.json
  review-patch.schema.json
  source-note.schema.json
```

현재 프로젝트에서는 이미 `docs/external-research/` 아래에 리서치 결과가 있으므로, 초기에는 다음처럼 작게 시작할 수 있다.

```text
docs/external-research/
  *.research.md
  *.review.md
  *.approval.md
  *.html

scripts/
  render-report.js
  validate-report.js
```

## 5. Markdown 파일 규약

각 Markdown 파일에는 frontmatter와 block id를 둔다.

예:

```markdown
---
id: research-pattern-04
type: research-note
status: draft
owner: research-agent-a
updated: 2026-05-18
risk: medium
needs_human_review: true
source_count: 6
---

# Pattern 04 조사

<!-- block:exec-summary -->
- 결정이 필요한 것: 산출물 형식을 표준화할지 여부
- 완료된 것: OpenAI, Anthropic, Simon Willison 근거 확인
- 불확실한 것: 리서치 품질 향상 일반화 가능성
- 위험한 것: 형식 준수와 사실 정확성을 혼동할 수 있음
- 다음 액션: 검증 에이전트가 주장 강도 확인
<!-- /block:exec-summary -->

<!-- block:claims -->
## Claims

- claim: 산출물 형식은 리서치 결과의 검토 가능성을 높인다.
  strength: medium
  sources: openai-prompting, anthropic-prompting
<!-- /block:claims -->

<!-- block:caveats -->
## Caveats

- 형식이 있다고 해서 출처 품질이 보장되지는 않는다.
- 품질 향상 일반론으로 쓰면 과장이다.
<!-- /block:caveats -->
```

### 필수 frontmatter

```yaml
id: unique-document-id
type: research-note | verification-note | implementation-note | approval-summary | review-note
status: draft | verified | needs-revision | approved | rejected
owner: agent-or-human-name
updated: YYYY-MM-DD
risk: low | medium | high
needs_human_review: true | false
```

### 권장 block id

```text
exec-summary
claims
sources
evidence
caveats
open-questions
decisions-needed
next-actions
human-review
```

모든 파일에 모든 블록이 필요하지는 않다. 하지만 상위 요약 생성에 필요한 `exec-summary`, `claims`, `caveats`, `open-questions`, `next-actions`는 가능하면 유지한다.

## 6. Approval Markdown

HTML을 바로 만들기 전에 approval Markdown을 만드는 것이 좋다. approval Markdown은 여러 작업 로그를 요약한 결재서 원본이다.

예:

```markdown
---
id: agent-patterns-approval
type: approval-summary
status: needs-review
updated: 2026-05-18
inputs:
  - docs/worklog/research-pattern-04.md
  - docs/worklog/research-pattern-06.md
  - docs/worklog/research-pattern-07.md
---

# Agent Patterns Approval Summary

<!-- block:decision-summary -->
## 결재 요약

- 승인 요청: Pattern 04/06/07 운영 모델 채택
- 핵심 위험: HTML 직접 편집 시 source of truth 붕괴
- 추천 결정: Markdown 원장 + HTML 리뷰 표면 + review patch 구조
<!-- /block:decision-summary -->

<!-- block:review-queue -->
## Human Review Queue

| target | decision | comment |
|---|---|---|
| research-pattern-04.md#claims | pending | 주장 강도 확인 필요 |
<!-- /block:review-queue -->
```

이 파일은 사람이 읽을 수 있고, HTML renderer가 그대로 사용할 수 있으며, git diff도 명확하다.

## 7. Human Review 방식

HTML 하단에는 human review 섹션을 둔다. 이 섹션은 단순 자유 텍스트가 아니라 block id와 연결된 구조여야 한다.

권장 review patch 형식:

```markdown
---
id: review-agent-patterns-2026-05-18
type: review-note
reviewer: human
updated: 2026-05-18
target_document: agent-patterns-approval
---

# Human Review

<!-- review:001 -->
target: research-pattern-04.md#claims
decision: revise
priority: high
comment: "품질 향상이라는 표현은 강하다. 검토 가능성 향상으로 낮춰라."
<!-- /review -->

<!-- review:002 -->
target: research-pattern-07.md#caveats
decision: revise
priority: medium
comment: "평가 기준이 틀릴 때 에이전트가 잘못 최적화하는 예시를 추가하라."
<!-- /review -->
```

HTML 내부에는 같은 내용을 화면으로 보여줄 수 있다. 하지만 source of truth는 `.review.md` 또는 별도 review data 파일이어야 한다.

## 8. 템플릿 전략

모든 보고서가 같은 구조를 가질 필요는 없다. 대신 목적별 템플릿을 미리 만들어두고, 사람이 검토해 재사용 가능한 소수만 남기는 방식이 좋다.

초기 템플릿 후보:

| 템플릿 | 용도 | 기본 구조 |
|---|---|---|
| evidence-report | 외부 리서치 | 주장, 근거, 출처 강도, 반례, 시사점 |
| decision-memo | 의사결정 | 선택지, 장단점, 리스크, 추천안 |
| reproduction-report | 논문/데이터 재현 | 원 결과, 재현 결과, 차이, 실패 원인 |
| technical-audit | 코드/아키텍처 검토 | 발견사항, 심각도, 증거, 수정 권고 |
| learning-brief | 학습 자료 | 개념, 쉬운 예시, 오해, 연습문제 |
| implementation-summary | 구현 요약 | 변경 파일, 테스트, 위험, 후속 작업 |

LLM이 매번 HTML 디자인을 새로 만들지 않고 다음 정도만 선택하게 한다.

```yaml
template: evidence-report
density: medium
audience: technical-manager
include_human_review: true
```

## 9. 스크립트 역할

### parse-md.js

- frontmatter를 읽는다.
- block id를 추출한다.
- 중복 block id를 감지한다.
- 필수 블록 누락을 보고한다.

### build-approval-md.js

- 여러 worklog Markdown에서 `exec-summary`, `claims`, `caveats`, `next-actions`를 모은다.
- 결재용 approval Markdown을 만든다.
- 원본 파일과 블록 id 링크를 유지한다.

### render-html.js

- approval Markdown 또는 report object를 HTML로 렌더링한다.
- CSS와 레이아웃은 템플릿에서 재사용한다.
- LLM이 HTML/CSS를 직접 생성하지 않게 한다.

### validate-blocks.js

- source 없는 strong claim을 감지한다.
- `needs_human_review: true`인데 review queue가 없으면 실패시킨다.
- stale `updated` 값을 경고한다.
- 위험도가 high인데 승인 게이트가 없으면 경고한다.

### apply-review.js

- review patch를 읽는다.
- target block을 찾아 수정 대상 컨텍스트를 만든다.
- 다음 에이전트에게 전체 파일 대신 target block과 주변 문맥만 넘긴다.

## 10. 에이전트 작업 계약 예시

조사 에이전트:

```text
docs/worklog/{topic}.research.md만 작성하라.
frontmatter와 block id 규약을 지켜라.
HTML을 직접 만들지 마라.
주장에는 source id와 claim strength를 붙여라.
```

검증 에이전트:

```text
대상 research.md의 claims와 sources만 검증하라.
검증 결과는 {topic}.verification.md에 작성하라.
수정 요청은 review patch 형식으로 남겨라.
원본 research.md를 직접 고치지 마라.
```

렌더 에이전트 또는 스크립트:

```text
approval.md를 HTML로 렌더링하라.
템플릿을 재사용하라.
HTML에는 generated 주석을 넣고 직접 편집 금지 표시를 넣어라.
```

수정 에이전트:

```text
review.md의 target block만 읽고 수정하라.
수정 후 해당 block의 상태와 updated 값을 갱신하라.
관련 없는 파일은 수정하지 마라.
```

## 11. 기대 효과

- Markdown을 유지하므로 여러 에이전트의 중간 산출물이 싸게 남는다.
- HTML은 결재서 역할을 하므로 사람의 검토 부담이 줄어든다.
- block id 덕분에 수정 범위가 작아진다.
- 다음 에이전트가 전체 문서를 읽지 않아도 된다.
- review patch가 남으므로 사람의 판단이 추적 가능하다.
- 템플릿 재사용으로 HTML 생성 토큰과 시간이 줄어든다.
- claim strength, source type, risk 같은 필드를 검증할 수 있다.

## 12. 주요 리스크

### 12.1 구조 과잉

너무 많은 frontmatter와 block 규칙을 강제하면 에이전트 작성 비용이 올라간다. 초기에는 최소 규약만 도입해야 한다.

권장 최소 규약:

- frontmatter
- `exec-summary`
- `claims`
- `caveats`
- `next-actions`
- review patch target id

### 12.2 HTML 직접 편집의 유혹

사람은 HTML 화면에서 바로 고치고 싶어 한다. 하지만 HTML을 직접 수정하면 원본 Markdown과 동기화가 깨진다.

대안:

- HTML에서 직접 본문 수정은 허용하지 않는다.
- HTML에서 review note만 작성한다.
- review note가 원본 Markdown block으로 돌아가게 한다.

### 12.3 block id 안정성

block id가 자주 바뀌면 review patch가 깨진다.

대안:

- block id는 사람이 읽을 수 있고 안정적인 이름으로 둔다.
- 자동 생성 id보다는 명시적 id를 선호한다.
- block rename은 별도 migration으로 처리한다.

### 12.4 요약 손실

approval Markdown이나 HTML 결재서가 원본 작업의 중요한 뉘앙스를 잃을 수 있다.

대안:

- 결재서의 각 항목은 원본 파일과 block id를 링크한다.
- `open-questions`, `caveats`, `risk`를 결재서에 반드시 포함한다.
- high-risk 항목은 원문 발췌 또는 근거 링크를 포함한다.

## 13. 리뷰어에게 묻고 싶은 질문

다른 에이전트 또는 사람이 이 문서를 리뷰할 때 다음 질문을 봐야 한다.

1. Markdown frontmatter와 block id 규약이 최소한인가, 아니면 과한가?
2. HTML을 직접 편집하지 않고 review patch만 남기는 방식이 실제 사용자 경험을 충분히 만족시키는가?
3. approval Markdown을 중간에 두는 것이 유용한가, 아니면 report object JSON이 더 나은가?
4. claim strength, source type, risk를 Markdown 안에 둘지 별도 JSON/YAML로 분리할지?
5. 처음 구현할 스크립트 범위는 어디까지가 적절한가?
6. 템플릿은 어떤 2-3개부터 시작해야 하는가?
7. block id 기반 부분 수정이 실제 에이전트 컨텍스트 절약에 얼마나 도움이 될까?
8. 사람의 리뷰 코멘트를 HTML 하단에 렌더링하는 것과 별도 `.review.md`로 보관하는 것 중 어느 쪽이 낫나?

## 14. 초기 구현 제안

처음부터 완전한 시스템을 만들 필요는 없다. 다음 순서가 현실적이다.

1. `docs/external-research/*.md`에 frontmatter와 block id 규약을 적용한다.
2. `scripts/parse-md.js`로 frontmatter와 block을 추출한다.
3. `scripts/build-approval-md.js`로 여러 MD에서 `exec-summary`만 모아 approval Markdown을 만든다.
4. `scripts/render-html.js`로 approval Markdown을 HTML로 렌더링한다.
5. HTML 하단에 Human Review Queue를 표시한다.
6. 사람이 남긴 review를 `.review.md`로 저장한다.
7. 수정 에이전트는 `.review.md`의 target block만 읽고 원본 MD를 수정한다.

최소 viable workflow:

```text
research.md
-> approval.md
-> approval.html
-> review.md
-> targeted research.md patch
```

## 15. 결론

이 전략의 핵심은 Markdown과 HTML의 역할을 분리하는 것이다.

Markdown은 여러 에이전트가 싸게 작성하는 상세 원장이다. HTML은 사람이 부담 없이 읽고 결재하는 화면이다. 사람의 수정 요청은 HTML에 묻히지 않고 review patch로 구조화되어 원본 Markdown의 특정 block으로 돌아가야 한다.

이렇게 하면 LLM은 모든 문서를 매번 다시 읽지 않아도 되고, 사람은 수많은 Markdown 대신 결재서 HTML을 볼 수 있으며, 에이전트는 작고 명확한 수정 범위만 다룰 수 있다.

요약하면 다음 세 가지가 핵심 기술이다.

- Markdown frontmatter
- stable block id
- human review patch

이 세 가지를 먼저 도입하면, 이후 템플릿 렌더러, 검증 스크립트, 목적별 HTML 결재서 시스템으로 자연스럽게 확장할 수 있다.
