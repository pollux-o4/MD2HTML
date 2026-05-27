---
id: md-show-me-milestone-4-apply-review
type: milestone
status: install-free-revised
updated: 2026-05-26
---

# md-show-me Milestone 4: Apply Review Context Package

## 목적

M4 는 M3 에서 복사하거나 저장한 review context (Markdown) 를 받는다. 원본 Markdown 에서 해당 위치를 검증한 다음, **다음 agent 가 바로 작업할 수 있는 context package (Markdown)** 를 만든다.

이 단계에서는 원본 Markdown 을 자동으로 수정하지 않는다 (PRD Constraint #4, Out of Scope: "HTML-initiated automatic Markdown modification"). 자동 수정은 사용자가 별도로 요청해야 도는 agent 작업이다.

## Wire format 은 Markdown (PRD D9, Thariq 4-question framework)

M4 context package 는 **HTML 이 아니라 Markdown** 으로 만든다. 이유는 셋이다.

- M4 를 받아 쓰는 쪽이 사람이 아니라 다음 agent 다 (Thariq 4-question Q2 = "another agent processes this" = yes → MD).
- HTML 은 M2 의 사용자 대상 화면 전용이다 (PRD §Solution M4).
- 내부 agent chain 의 wire format 은 계속 MD 다 (PRD D9, Out of Scope: "HTML as wire format for internal agent chains").

이 선택은 install-free / zero network 원칙과도 자연스럽게 맞물린다. file system 의 MD 를 읽어서 MD context package 를 stdout 또는 파일로 내보낼 뿐이라 네트워크 호출이 끼어들 자리가 없다.

## 입력

M3 review context (Markdown prose, M3 §Review Context Markdown 형식). 두 형태 모두 지원:

- 클립보드 paste — 단일 `## Review comment` block.
- 파일 (`.agent-output/show-me/_review/<slug>.md`) — *여러 block 누적* (`---` 로 구분). M4 가 각 block 을 순회하며 처리.

각 block 의 필수 필드:

- `source_path`
- `heading`
- `anchor_quote`
- `weak_anchor`
- `comment`
- `created`
- optional: `occurrence_index` (같은 문장이 여러 번 나올 때)

## 동작

1. `source_path` 의 Markdown 파일을 연다.
2. `heading` 아래 영역을 찾는다.
3. `anchor_quote` 가 그 영역 안에 있는지 확인한다.
4. 찾으면 target block, 주변 문맥, 사용자 comment 를 묶어 context package 로 stdout 에 내보낸다.
5. 못 찾으면 stale 또는 dangling 으로 표시하고 자동 적용하지 않는다 (PRD User Story 35: "fail loudly").

`weak_anchor: true` 인 경우에는 매칭에 성공해도 확신이 낮다고 표시한다.

같은 문장이 여러 번 나올 때는 먼저 occurrence index 가 들어왔는지 본다. 있으면 그 occurrence 를 쓴다. 없으면 **임의로 하나를 고르지 않고** `anchor_ambiguous` 상태를 돌려준다 (PRD User Story 36).

## Context Package 형식

출력은 다음 agent 가 바로 받아 작업할 수 있는 Markdown prose 다.

```markdown
## Apply review context

source_path: docs/example.md
heading: 5.3 리뷰
anchor_quote: "HTML은 사람이 보기 위한 파생물이다."
anchor_status: found
weak_anchor: false

surrounding_context:
...

user_comment:
이 표현이 너무 강하니 톤다운.
```

`surrounding_context` 는 anchor 상태에 따라 다르게 짠다. 단위는 paragraph 가 아니라 *anchor 주변의 의미 단위* — LLM 이 현재 source 보고 결정한다 (paragraph / list item / code block / table row 등).

- **unique anchor**: anchor 가 들어 있는 의미 단위 + 앞뒤 의미 단위 (LLM 판단).
- **weak 또는 ambiguous anchor**: 후보 의미 단위 목록과 각 occurrence index.
- **missing anchor**: heading block 의 짧은 excerpt 와 실패 상태.

이전 revision 의 *paragraph 고정 규칙* 은 폐기. prose 가 아닌 source (코드, 표, 리스트) 에서 paragraph 단위가 부자연스러워 LLM 판단으로 격하했다.

## `anchor_status` enum

context package 의 `anchor_status` 는 다음 4가지 중 하나다.

- `found` — anchor 가 유일하게 매칭됨.
- `weak` — 매칭은 됐지만 `weak_anchor: true` 라 확신이 낮음.
- `ambiguous` — anchor 가 여러 occurrence 에 매칭. `occurrence_index` 가 들어왔으면 그걸로 해소, 없으면 실패.
- `missing` — anchor 가 영역 안에 없음.

## 실패 처리

- 파일 없음: `source_missing`
- heading 없음: `heading_missing`
- anchor 없음: `anchor_missing` (위 `missing` 의 출력 형태)
- anchor 여러 개에 occurrence index 가 없음: `anchor_ambiguous` (위 `ambiguous` 의 출력 형태)

실패하면 원본을 건드리지 않고, 사용자가 review context 를 다시 만들도록 안내한다.

M2 의 lazy stale banner (N+6) 가 같은 mtime / size drift 를 잡아낼 수 있다. M4 실패가 stale 때문이라면 사용자에게 M2 재생성을 권한다.

## review 가 아닌 인터랙션과의 관계

M3 의 copy-as-prompt 일반화 (N+4) 가 만들어 내는 review 가 아닌 snapshot (slider, drag, toggle 결과) 은 **M4 의 입력이 아니다**. M4 는 review comment 흐름만 처리한다. review 가 아닌 prompt 는 사용자가 임의 agent 대화에 그대로 붙여 쓰는 generalized output 이다 (PRD M3).

## 완료 기준

- M3 review context (Markdown) 를 입력으로 받는다.
- `anchor_quote` 를 검증한다.
- 실패 상태 (`source_missing`, `heading_missing`, `anchor_missing`, `anchor_ambiguous`) 를 명시적으로 출력한다.
- ambiguous anchor 는 occurrence index 가 없으면 자동으로 고르지 않는다.
- `surrounding_context` 는 anchor 주변의 의미 단위 (LLM 판단) 로 짜며 unique / weak / ambiguous / missing 상태별로 다르게 구성된다.
- 원본 Markdown 을 자동으로 수정하지 않는다.
- context package 의 wire format 은 Markdown 이다 (HTML 아님).
- 어떤 흐름에서도 자동 install 이나 자동 outbound network 가 일어나지 않는다 (PRD Constraint #5).
