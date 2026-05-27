---
id: md-show-me-milestone-3-natural-language-review-loop-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-3-natural-language-review-loop
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_reviews:
  - md-show-me-skill-strategy.discord-chatbot.review.md
  - md-html-agent-workflow-strategy.discord-chatbot.review.md
updated: 2026-05-19
status: needs-revision
verdict: approve-with-changes
---

# Review — Milestone 3: Natural Language Review Loop (discord_chatbot 통용성 관점)

대상: `docs/md-show-me-milestone-3-natural-language-review-loop.md`. HTML 보고서 안에서 사용자가 자연어로 리뷰 의견을 남기고 *복사 가능한 컨텍스트* 만 출력하는 단계. 저장 없음.

---

## 총평

이 milestone 은 **strategy doc §5.3 의 review patch YAML 형식 (target / anchor_quote / decision / priority / reviewer / created) 을 자연어로 통째 뒤집는 큰 결정**이다. 그러나 (1) 그 *방향 전환* 이 선행 strategy doc 의 어떤 결정을 supersede 하는지 명시 0, (2) 선행 두 review 가 권고한 *anchor_quote 필수화 + fail-loud* 가 자연어 흐름 안에서 *선택 텍스트가 있으면 포함, 없으면 heading 만* 으로 약화 — anchor drift 검증의 deopt, (3) "나중에 에이전트가 해석" 책임 떠넘기기가 *어느 milestone* 인지 미정. 반면 결정의 *방향* 자체 (사용자 마찰 0 + 저장 X + SSoT 분산 차단) 는 선행 리뷰의 P0 #2 (review patch ↔ GH PR thread 변환 부재) 를 *근본 회피* 한다는 점에서 강한 진전이다. 결론: **approve with changes** — 자연어 결정은 유지할 만하지만 supersede 기록, anchor drift 처리, "나중 에이전트" 의 owner 를 닫아야 한다.

## 강점

- **사용자 마찰 0 의 입력 흐름**: YAML 양식·패치 스키마 학습 없음. §"사용자가 쓰는 내용" 의 *반례 박스* (`file: heading: action:` 양식을 사용자가 채우지 않음) 가 결정 명확.
- **§"저장하지 않는 것" 의 3 종 명시**: 디스크 / localStorage / `reviews.json` 모두 X — SSoT 4 단 모순 (선행 리뷰 P0 #2) 의 *근본 회피*. 본 skill 이 *저장 layer 가 아님* 으로 책임 범위 축소.
- **선택 텍스트 자동 포함**: drag 만으로 anchor_quote 의 *내용 캡처* 가 사용자 input 없이 자동. 자연어 흐름 안에서 anchor 의 핵심 기능 (어느 부분에 대한 의견인지) 을 유지하는 우아한 설계.
- **§"기본 흐름" 5 단계의 명료함**: HTML 읽기 → heading 아래 의견 → 위치 정보 부착 → 컨텍스트 복사 → 에이전트 대화 붙여넣기. 각 단계가 *사람이 이해할 수 있는 정밀도*.
- **§"범위 밖" 3 종 (자동 적용 / 외부 협업 연결 / DB)**: feature creep 차단. 선행 리뷰의 "review patch UI 가 MVP 에 너무 일찍 들어옴" 권고의 정직한 응답.

## 주요 우려사항

### P0

#### 1. Strategy doc §5.3 의 review patch YAML 을 supersede 하는데 명시 0

선행 strategy doc §5.3:
```yaml
target: docs/example.md#findings
anchor_quote: "..."
decision: revise
priority: medium
reviewer: human
created: 2026-05-19T00:00:00+09:00
comment: "..."
```

M3 §"사용자가 쓰는 내용" 은 위 양식을 *반례* 로 명시 거부:
> 예를 들어 사용자가 직접 이런 식의 패치 양식을 채울 필요가 없다.
> ```yaml
> file: docs/example.md
> heading: Some heading
> action: replace
> ```
> 대신 사용자는 자연어로 의견만 쓴다.

이건 *작은 정정* 이 아니라 **선행 strategy doc 의 핵심 design 결정 중 하나를 뒤집는 결정**. 그러나:
- M3 doc 어디에도 "strategy doc §5.3 은 superseded" 같은 명시 없음
- *왜* 자연어로 결정했는지 근거 (사용자 마찰 / 학습 비용 / 양식의 fragility 중 어느 것?) 본문 0 줄
- strategy doc 의 reviewer / created / decision / priority 메타데이터가 *어디로 가는지* 미정 — 자연어에 묻혀 사라지는가, 별도 메타 데이터로 부착되는가?

선행 리뷰의 anti-pattern 진단 ("ADR 적 결정 기록 없이 design 결정 뒤집기") 의 정확한 재현.

→ **권장**: M3 doc 머리에 *Decision* 섹션 또는 별도 ADR 추가:
- "Supersedes: strategy doc §5.3 의 review patch YAML 형식"
- Rationale 3 줄 (사용자 마찰 + 학습 비용 + 양식 fragility)
- 메타데이터 (reviewer / priority / decision) 의 운명 — *복사된 컨텍스트* 에 자동 부착되는가, 사라지는가

#### 2. anchor_quote 검증의 deopt — 선택 텍스트 없으면 heading 만

선행 두 리뷰 P0:
- comfyui 리뷰 §4.4: "anchor_quote 필수 (없으면 patch reject)"
- discord_chatbot 리뷰 §C: "anchor_quote 필수 (없으면 patch reject) + status: dangling 라이프사이클"

M3 §"기본 흐름" 단계 17:
> 사용자가 텍스트를 선택하지 않았다면 리뷰 위치는 현재 제목을 기본값으로 삼는다.

즉 anchor 가 *heading literal* 로만 표시. heading 은 안정적이지만 *문장 수정* 에 영향 받지 않는다 — 사용자가 "이 문장은 짧게" 라고 적었을 때 *어느 문장* 인지 *나중 에이전트* 가 추측해야 함.

discord_chatbot 적용 예: ADR-0005 "## Context" 헤딩 아래에 자연어 의견 "근본 원인 부분은 단순화" — *근본 원인* 단어가 본문에 있긴 하지만 *어느 문장* 인지는 LLM 해석 의존. heading drift 가 *문장 drift* 보다 약한 검증이라는 사실.

선행 리뷰의 anchor_quote 필수화 권고를 *자연어 흐름 안에서 어떻게 살릴 것인가* 의 답이 빠짐.

→ **권장**: 선택 텍스트 *없는* 케이스의 fallback 강화:
- 사용자에게 "어느 문장에 대한 의견인지 선택해주세요" UI hint (텍스트 0.5초 멈춤 후)
- 또는 자연어 의견 안에서 *인용 따옴표* `"..."` 또는 backtick `` `...` `` 자동 detect → anchor_quote 로 캡처
- 또는 *heading 만* 케이스를 명시적으로 `weak_anchor: true` 메타로 부착해 나중 에이전트가 *deopt 경고* 표시

#### 3. "나중에 에이전트가 해석" 의 owner 미정 (§"단순하게 유지하는 이유")

§"단순하게 유지하는 이유":
> 또한 자연어 의견은 나중에 에이전트나 스크립트가 해석할 수 있다. 지금 단계에서 복잡한 규칙을 HTML 에 넣기보다, 위치 정보와 선택 텍스트만 붙여서 사람이 쓰기 쉬운 리뷰 흐름을 먼저 만든다.

§"사용자가 쓰는 내용":
> 실제로 그 의견을 어떻게 해석하고 Markdown 에 반영할지는 나중에 에이전트나 스크립트가 맡는다.

**이 *나중 에이전트* 가 어느 milestone 인가?** M4 가 외부 협업 도구 연동도 *역할 이름만* 으로 미루는 상태에서, *자연어 → markdown 수정* 의 책임은 누가 가지는가:

- (a) `/show-me` skill 의 미래 milestone (M5+) — 본 doc 미명시
- (b) 사용자가 직접 다른 skill / agent 대화에 컨텍스트를 붙여 별도 처리 — 본 doc 의 §"기본 흐름" 5 단계 함의지만 명시 X
- (c) 외부 스크립트 — 본 doc 미명시

선행 리뷰의 P0 #2 (review patch ↔ GH PR thread 변환) 가 M3 에서 *근본 회피* 됐지만, 그 회피의 *대가* 가 명시되지 않음 — "*나중 에이전트* 의 책임 떠넘기기" 가 그 대가다.

→ **권장**: §"단순하게 유지하는 이유" 또는 §"범위 밖" 에 "*나중 에이전트* = 사용자가 본 컨텍스트를 붙여넣는 외부 agent 대화 (Claude Code, Codex, Cursor 등). md-show-me skill 의 미래 milestone 이 아님" 명시.

### P1

#### 4. "복사 가능한 리뷰 컨텍스트" 의 형식 미정

§"기본 흐름" 단계 4: "복사할 수 있는 리뷰 컨텍스트를 만든다." 형식 0 줄. 후보:

- (a) Markdown 코드블록 — heading + 의견 + 선택 텍스트
- (b) 자연어 prose — "`docs/example.md` 의 *설계 배경* 섹션에서 사용자가 다음 의견을 남겼습니다: ..."
- (c) JSON — `{ "source": "...", "heading": "...", "selection": "...", "comment": "..." }`

각 형식이 *나중 에이전트* 의 처리 비용·정확도에 큰 차이. M3 §"완료 기준" 의 "리뷰 컨텍스트에는 source path 와 heading 이 포함된다" 만으론 형식 미결정.

→ **권장**: 형식 (b) 자연어 prose 권장 — 사용자가 그대로 읽을 수 있고, 에이전트도 prose 의 source/heading 부분만 추출하면 됨. 1 줄 명세.

#### 5. 사용자가 의견 N 개 작성 → 일괄 복사 UX 미정

§"기본 흐름" 은 *의견 1 개* 기준 흐름만 적는다. 사용자가 한 보고서에 10 개 의견을 남기면:
- 매번 *"복사"* 버튼 누르고 별도 paste — 10 번
- *전체 복사* 버튼 — 한 번
- *선택한 의견만 복사* — UI 복잡도

§"완료 기준" 어디에도 *복수 의견* 처리 명시 0.

→ **권장**: §"기본 흐름" 에 "복수 의견 → 보고서 하단 *전체 복사* 버튼이 모든 의견을 한 prose 블록으로 묶음. 개별 의견 복사 버튼은 각 의견 옆에" 1 줄.

#### 6. 자연어 의견의 *순서* 보존 정책 미정

사용자가 보고서 위에서 아래로 의견 5 개 작성. 복사 컨텍스트의 순서가:
- (a) 사용자 작성 시간 순
- (b) 보고서 안의 위치 (heading 순) 순
- (c) 우선순위 추정 (자연어 분석)

자연어 흐름 안에서 (a) 가 자연스럽지만 *나중 에이전트* 가 markdown 수정할 때 (b) 가 더 유용. 미정.

→ **권장**: 기본 (b) 보고서 위치 순. 의견의 작성 시간은 메타로만 부착.

### P2

#### 7. 선택 텍스트 duplicate 처리 미정

사용자가 *같은 문장이 본문에 여러 번 나오는* 케이스에서 한 곳을 드래그 → 선택 텍스트가 anchor_quote 로 캡처될 때, *나중 에이전트* 가 그 문장을 *어느 등장 위치* 로 매핑할 것인가? 선행 리뷰 §C 의 *anchor drift* 와 다른 결: drift 가 아니라 *ambiguous match*.

→ **권장**: 메타에 *heading 위치* + *해당 heading 아래의 occurrence index* (1, 2, ...) 자동 부착.

#### 8. HTML 의 "리뷰 입력 UI" 형식 미정

§"기본 흐름" 단계 2 "현재 보고 있는 제목 아래에 자연어 리뷰 의견을 쓴다" — 입력 UI 가 `<textarea>` 인가, contenteditable `<div>` 인가, modal 인가? §"완료 기준" 의 *기능 요구* 만 있고 *UI 명세* 없음. M2 의 "정적 HTML" 정책과 *상호작용* 의 경계 미정.

→ **권장**: 각 heading 옆 [+ 의견] 버튼 → 그 자리에 inline `<textarea>` 펼침 (modal 아님, 보고서 흐름 유지). 1 줄.

## discord_chatbot 적용성 평가

| 항목 | 호환성 | 비고 |
|---|---|---|
| 복사 → Claude Code 대화 붙여넣기 | ✅ | 가장 자연스러운 흐름. discord_chatbot 의 작업 방식과 정합 |
| 복사 → Codex / Cursor | ✅ | reference_codex_gemini_cli 메모리: codex stdin pipe 자연 paste 가능 |
| 복사 → Discord 정리메시지 | ⚠️ 한 번 더 사람 손 | Discord 가 SSoT 인 *협업 결정* 의견을 사용자가 복사해서 Discord 채널에 붙여야 함. 선행 리뷰 §6.4 의 격차 — M3 가 *자동 연결* 을 §"범위 밖" 으로 두므로 의도된 디자인. OK |
| 복사 → GH PR review thread | ⚠️ 형식 불일치 | GH PR review thread 는 *코드 라인* 단위. M3 출력은 *markdown heading* 단위. 사용자가 PR 코멘트 본문에 *prose* 를 붙이면 GH 의 line-comment 기능과 분리됨. 선행 리뷰 §A 의 두 옵션 중 "PR thread 채택 시 review patch 형식 미생성" 옵션과 정합 (M3 가 그쪽으로 결정한 셈) |
| 자연어 의견의 ADR 적용 | ⚠️ ADR `status:` 갱신 | discord_chatbot ADR 은 `status: proposed → accepted → superseded by NNNN` lifecycle. 자연어 의견 "이 ADR 은 superseded 되어야 함" 을 *나중 에이전트* 가 status 갱신으로 변환 — 추가 변환 layer 필요 |
| handoff doc 의 자연어 리뷰 | ⚠️ disposable 정책 | session-discipline.md L75-77: handoff 는 "작업 끝나면 폐기, commit 안 해도 됨". M3 가 handoff doc 에 의견 → *나중 에이전트* 가 그 의견 반영하려는 시점에 handoff 이미 폐기 가능성 → orphan review. M1 의 handoff 기본 제외와 정합하므로 *명시 query* 시만 발생 — 그 케이스에 경고 필요 |

## MVP 추가 정정 제안

1. **P0 #1 supersede ADR 작성** — strategy doc §5.3 review patch YAML 형식이 자연어로 대체됨을 명시. discord_chatbot 의 ADR status lifecycle 패턴을 본 milestone doc 들도 채택.
2. **P0 #2 weak anchor 케이스 명시** — 선택 텍스트 없으면 컨텍스트 메타에 `weak_anchor: true` + 사용자에게 *선택을 권장* 하는 UI hint.
3. **P0 #3 "나중 에이전트" owner 명시** — 외부 agent 대화 (Claude Code 등), md-show-me 의 미래 milestone 아님.
4. **P1 #4 컨텍스트 형식 1 줄** — 자연어 prose, source path + heading + selection + comment 순.
5. **P1 #5 복수 의견 일괄 복사** — 보고서 하단 *전체 복사* 버튼 1 개 추가.

## 문서에서 모호하거나 고쳐야 할 섹션

| 위치 | 문제 | 권장 |
|---|---|---|
| 머리말 | strategy doc §5.3 supersede 결정 부재 | "Supersedes: strategy doc §5.3 (review patch YAML 형식)" + Rationale 3 줄 |
| §"목적" | "나중에 에이전트, 스크립트, 서브에이전트가" | 그 owner 가 *외부 agent 대화* 인지 *미래 milestone* 인지 명시 |
| §"기본 흐름" 단계 4 "복사할 수 있는 리뷰 컨텍스트" | 형식 0 | 자연어 prose 형식 1 줄 예시 |
| §"기본 흐름" 단계 17 "선택하지 않았다면 현재 제목 기본값" | weak anchor 케이스 처리 미정 | `weak_anchor: true` 메타 + UI hint |
| §"사용자가 쓰는 내용" 반례 YAML | (강점, 유지) | — |
| §"사용자가 쓰는 내용" "나중에 에이전트나 스크립트가 맡는다" | owner 미정 | "외부 agent 대화 (Claude Code, Codex 등)" 명시 |
| §"저장하지 않는 것" | (강점, 유지) | — |
| §"범위 밖" | (강점, 유지) | "미래 milestone 에서 자동 적용 layer 추가 가능성" 한 줄 추가 — 사용자 기대 관리 |
| §"완료 기준" | 형식 / 복수 의견 / 순서 / weak anchor / UI 모두 누락 | 위 P1 5 종 추가 |

## 최종 판단

**Approve with changes.**

자연어 결정 + 저장 X + 컨텍스트만 복사 의 *방향* 은 선행 리뷰의 SSoT 모순 회피와 사용자 마찰 0 의 정직한 답. 그러나 (a) strategy doc §5.3 supersede 의 명시적 결정 기록 (ADR 또는 본 doc 머리말), (b) anchor 검증의 deopt 처리 — 선택 텍스트 없는 케이스의 weak anchor 메타화, (c) *나중 에이전트* 의 owner 가 외부 agent 대화임을 명시 — 세 가지를 닫아야 자연어 결정이 *근거 있는 진전* 으로 굳혀진다.

discord_chatbot 적용성은 Claude Code / Codex / Cursor 흐름은 자연하고, Discord / GH PR thread 는 *한 번 더 사람 손* 이 들어가는 것이 의도된 디자인 (자동 연결을 §"범위 밖" 으로 두므로) — 받아들일 만하다.
