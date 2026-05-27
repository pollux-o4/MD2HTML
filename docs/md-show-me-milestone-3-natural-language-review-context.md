---
id: md-show-me-milestone-3-natural-language-review-context
type: milestone
status: install-free-revised
updated: 2026-05-26
supersedes:
  - md-show-me-skill-strategy.md#5.3-review-patch-yaml
---

# md-show-me Milestone 3: Copy-as-prompt 인터랙션 (리뷰 포함)

## 목적

Milestone 3 는 M2 인터랙티브 HTML 안에서 일어나는 **모든 사용자 인터랙션을 다음 agent turn 의 prompt 로 바꾼다** (PRD D7, D12 N+4 의 generalized copy-as-prompt).

자연어 리뷰는 이 일반화된 패턴의 **한 가지 응용** 일 뿐이다. slider 조작, drag-and-drop 결과, toggle 선택, 비교 선택, 작성한 코멘트 — 모두 같은 `[Copy]` / `[Save]` overlay 를 거쳐 다음 agent 입력이 된다 (PRD §Solution M3).

사용자가 YAML patch 양식을 직접 쓰지 않는다. 이 milestone 은 기존 strategy 의 review patch YAML 중심 흐름을 대체한다.

## Copy-as-prompt overlay (N+4) — 모든 인터랙션에 적용

M2 가 N+4 를 베이스라인으로 붙이므로, M3 는 그 overlay 의 **시맨틱 contract** 를 정의한다.

### Strict contract — 리뷰 코멘트만

M4 Apply Review 가 받는 wire format 이라 *필수 필드 고정*:

```
source_path, heading, anchor_quote, weak_anchor, comment, created
```

자세한 형식은 아래 §"리뷰 컨텍스트 Markdown 형식" 참고.

### LLM 자유 형식 — 그 외 인터랙션

slider, drag, toggle, 비교 선택 같은 인터랙션은 LLM 이 *인터랙션 의미에 맞게* 필드를 정한다. M4 입력이 아니라 사용자가 임의 agent 대화에 붙여 쓰는 일반화된 prompt 이므로 strict 스키마 불필요.

예시 (참고용, 강제 아님):

| 인터랙션 | 캡처 대상 | 예시 필드 |
|---|---|---|
| slider 값 변경 | 현재 값 + 의미 | `parameter`, `value`, `surrounding_context` |
| drag-and-drop | 최종 순서 | `ordering`, `grouping_rationale_blank` |
| toggle / 비교 | 선택된 option | `choice`, `alternatives`, `surrounding_context` |

이 표는 LLM 이 따라야 하는 게 아니다 — 인터랙션마다 자연스러운 필드 다르다.

모든 흐름에서:

- `[Copy]` → 클립보드 + 성공 toast.
- `[Save]` → `.agent-output/show-me/_review/<slug>.md` 에 **block append** + 클릭 가능한 경로 toast + 누적 건수 표시 (PRD D7).

두 버튼은 **별개로 동작한다**. 클립보드만 원할 때 디스크가 더럽혀지지 않고, 저장만 원할 때 클립보드가 덮어쓰이지 않는다.

### `[Save]` append 규칙 (spam click 방지)

slug 당 1개 파일에 누적. 매 save 마다 새 파일 만들지 않는다.

```
.agent-output/show-me/_review/리뷰.md
```

파일 내용:

```markdown
## Review comment
source_path: docs/auth.md
heading: 토큰 만료 정책
anchor_quote: "토큰은 1시간 후 만료된다."
weak_anchor: false
comment: 1시간 짧음. 24시간으로?
created: 2026-05-27T14:30:00+09:00

---

## Review comment
source_path: docs/auth.md
heading: 토큰 만료 정책
anchor_quote: "재발급은 refresh 토큰으로..."
weak_anchor: false
comment: refresh 토큰 회전 정책 필요
created: 2026-05-27T14:31:15+09:00
```

**Dedup**: 직전 block 과 `source_path + anchor_quote + comment` 가 동일하면 append 안 하고 "이미 저장됨" toast.

**Toast 형식**: `✅ 저장됨 → _review/리뷰.md (총 N건)` — 사용자가 *누적된 건수* 인지하게 함. spam click 인지 가능.

**파일 쓰기 방식**: atomic — temp 파일 쓰고 rename. 부분 손상 방지.

저장 / 복사된 결과물은 모두 **Markdown wire format** 이다 (HTML 아님). PRD D9 에 따라 내부 agent chain 의 wire format 은 MD 다.

## 리뷰 코멘트 흐름 (가장 흔한 응용)

사용자가 *어떤 식으로든 의견 입력 UI* 에 도달할 수 있어야 한다. 구체적 UI 형태 (heading 옆 버튼 / inline textarea / popover / modal 등) 는 *LLM 의 선택* — query 와 source 에 더 맞는 걸 고른다.

다음만 명시한다:

- 의견 입력 UI 는 *언제든 닫고 다시 열 수 있다* (사용자가 잃지 않게).
- 입력 후 `[Copy]` / `[Save]` 둘 다 노출.

선택 텍스트 → anchor 매핑 규칙은 다음과 같다 (이건 strict — M4 contract).

1. 사용자가 텍스트를 선택한 상태에서 의견을 쓰면 그 선택 텍스트가 `anchor_quote` 가 된다.
2. 선택 텍스트가 없으면 UI 가 먼저 "어느 문장에 대한 의견인지 선택해 주세요" 라고 안내한다 (PRD User Story 23).
3. 그래도 선택 없이 저장하면 현재 heading 아래 viewport 중심 문장 또는 첫 문장을 `anchor_quote` 로 자동 캡처하고 `weak_anchor: true` 를 붙인다 (PRD User Story 24).

## 리뷰 컨텍스트 Markdown 형식

복사 / 저장되는 리뷰 컨텍스트는 사람이 읽기 쉬운 Markdown 본문 형태다. 각 의견은 다음 필드를 담는다.

```markdown
## Review comment

source_path: docs/example.md
heading: 5.3 리뷰
anchor_quote: "HTML은 사람이 보기 위한 파생물이다."
weak_anchor: false
comment: 이 표현이 너무 강하니 "검토 화면" 정도로 톤다운.
created: 2026-05-26T10:00:00+09:00
```

필수 필드는 `source_path`, `heading`, `anchor_quote`, `weak_anchor`, `comment`, `created` 다.

사용자 입력 언어는 그대로 보존한다.

## 리뷰가 아닌 인터랙션의 prompt 형식

slider, drag, toggle 도 같은 Markdown 본문 형태로 묶는다. slider 예시는 다음과 같다.

```markdown
## Interaction snapshot

source_view: design-token-explorer (M2 artifact)
interaction: slider
parameter: spacing.base
value: 12px
surrounding_context: |
  관련 token: spacing.lg = 24px, spacing.sm = 6px
  근거 source: docs/design-tokens.md heading "Spacing scale"
created: 2026-05-26T10:00:00+09:00
```

이 prompt 를 다음 agent turn 에 그대로 붙이면 "spacing.base 를 12px 로 바꾸면 어떻게 될지" 같은 후속 작업을 이어갈 수 있다.

## 저장 정책

- source of truth 에 자동으로 저장하지 않는다 (PRD Constraint #4, D11).
- 페이지 안에서는 모든 의견과 인터랙션 snapshot 을 누적해서 보여준다.
- 전체를 한 번에 복사 / 저장하는 [전체 복사] / [전체 저장] 버튼을 제공한다.
- 페이지 안 의견은 *session 한정* 으로 산다 (탭 닫으면 사라짐). source of truth 로 취급 안 한다. 구체적 구현 (sessionStorage / in-memory / IndexedDB session 모드 등) 은 LLM 자유.
- `reviews.json`, PR / Discord 외부 전송은 하지 않는다 (PRD Out of Scope).

## 다음 단계와 책임

- 리뷰 코멘트 흐름의 출력은 M4 Apply Review 의 입력이다.
- 리뷰가 아닌 인터랙션 snapshot 은 M4 의 입력이 아니다. 사용자가 임의의 agent 대화에 직접 붙여 쓰는 일반화된 prompt 다.
- 두 경우 모두 wire format 은 Markdown 이다.

## 완료 기준

- 사용자가 자연어 리뷰를 쓸 수 있고, 모든 리뷰 컨텍스트에 비어 있지 않은 `anchor_quote` 가 들어간다.
- 선택 없이 작성된 리뷰는 `weak_anchor: true` 로 표시된다.
- 페이지 안에 의견과 인터랙션 snapshot 이 누적해서 표시된다.
- `[Copy]` 와 `[Save]` 가 별개로 동작한다 (클립보드와 atomic write).
- `[Save]` 는 `.agent-output/show-me/_review/<slug>.md` 에 block append (slug 당 1파일, dedup 적용) 하고 클릭 가능한 경로 toast + 누적 건수를 표시한다.
- 모든 출력은 Markdown wire format 이다. HTML 은 M2 화면에서만 쓴다.
- 리뷰가 아닌 인터랙션 (예: slider 값) 에서도 최소 하나는 [Copy] / [Save] 가 동작한다 (PRD Testing Decisions 의 copy-as-prompt 일반화 검증).
- 의견은 session 한정 (탭 닫으면 사라짐). 구체적 저장 방식은 LLM 자유, source of truth 로 취급하지 않는다.
- 사용자에게 YAML patch 작성을 요구하지 않는다.
- 어떤 흐름에서도 자동 install 이나 자동 outbound network 호출이 일어나지 않는다.
