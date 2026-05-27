---
id: md-show-me-milestone-2-static-html-report
type: milestone
status: install-free-revised
updated: 2026-05-26
---

# md-show-me Milestone 2: Query-shaped Interactive HTML

## 목적

Milestone 2 는 M1 manifest 와 큐레이션된 원본 Markdown 을 받아 **사람이 실제로 끝까지 읽는 인터랙티브 HTML artifact** 를 만든다. 더 이상 발췌만 보여주는 정적 리뷰 화면이 아니다 (paradigm shift, PRD §Solution / §Further Notes 참고).

- 같은 source 5개라도 query 가 바뀌면 다른 HTML 이 나와야 한다 (query 형태에 맞춰 만들지, 고정 template 으로 찍어내지 않는다).
- 매 호출마다 LLM 을 부른다. cache 한 결과나 고정 template 으로 대체할 수 없다 (PRD D5).
- 출력은 server 없이 열린다 (file:// 로 더블클릭).
- Markdown 은 여전히 source of truth, HTML 은 소비 레이어다.

## 입력과 출력

입력:

- M1 manifest (큐레이션된 set, 보통 3~10개, 상한 없음)
- 원본 Markdown 파일 (full Read)
- M1 의 스캔 규칙 / 옵션 `.show-me.toml` 의 출력 정책 (출력 경로 등)
- 사용자 query
- `.show-me.toml` 의 `enable_cdn_viz` 플래그 (기본값 `false`)

출력:

```text
.agent-output/show-me/reports/<slug>/
  index.html                              ← 최신 결과 (매 호출 overwrite)
  manifest.json                           ← 최신 manifest
  _history/
    2026-05-26T10-00-00/index.html        ← 직전 호출 결과 archive
    2026-05-26T10-00-00/manifest.json
    2026-05-26T14-15-30/index.html
    2026-05-26T14-15-30/manifest.json
```

### `<slug>` 생성 규칙

- query 결정론적. 같은 쿼리 → 같은 slug → 같은 폴더.
- 한글 / 공백 / 특수문자는 url-safe slugify (예: `"리뷰 정리"` → `리뷰-정리`).
- 다른 쿼리가 같은 slug 로 떨어지면 (희귀) 짧은 hash 4자 붙임 (`리뷰-정리-a3f2`).

### History 보존 규칙

매 새 호출:

1. 기존 `index.html` + `manifest.json` 을 `_history/<ISO-timestamp>/` 로 옮긴다.
2. 새 결과를 `index.html` + `manifest.json` 에 atomic write 한다.

- timestamp 형식: Windows safe (`:` 안 씀). 예: `2026-05-26T14-15-30/`.
- skill 은 **history 를 자동 삭제하지 않는다** (D1 원칙: repo 망가뜨리지 않음). 누적 부담스러우면 사용자가 `.agent-output/` 또는 `_history/` 를 직접 비운다.
- M5 lazy stale diff = 최신 `manifest.json` ↔ `_history/` 의 가장 최근 폴더 manifest 비교.

`dist/show-me/` 는 더 이상 정식 출력 위치가 아니다. 정식 위치는 `.agent-output/show-me/` 다.

### `.gitignore` 자동 처리

첫 실행 때 `.agent-output/` 이 `.gitignore` 에 없으면 **confirm prompt** 로 사용자 동의 받음:

```
⚠️  .agent-output/ 이 .gitignore 에 없음. 자동 추가할까? (y/n)
```

- `y` → `.gitignore` 끝에 `.agent-output/` 한 줄 append (atomic write).
- `n` → 알림만, 사용자가 직접 처리. skill 은 다음 호출에도 다시 묻지 않는다 (`.show-me.toml` 에 `gitignore_prompt_declined = true` 기록).

사용자 모르게 git tracked 파일을 추가하지 않는다 (D11 신뢰 원칙).


## Zero install / zero network 기본값

PRD Constraint #5 와 D11 을 그대로 적용한다. M2 의 출력은 **기본적으로 self-contained** 여야 한다.

- 인라인 CSS / 인라인 JS / 인라인 SVG → **기본 허용**.
- CDN `<script>` 태그 → **opt-in 전용** (`enable_cdn_viz = true` 일 때만). 기본 출력에는 어떤 CDN 도 들어가면 안 된다.
- 자동 패키지 설치, 자동 모델 다운로드 → **금지**.
- spec 기반 차트 (Vega-Lite / ECharts / Observable Plot, N23) → opt-in 일 때만 쓴다. opt-in 이 켜진 경우 Vega-Lite 를 1순위로 추천한다 (spec 표면이 가장 작고, BSD-3 라이선스). ECharts 가 2순위 (Apache 2.0, 한국어 문서가 풍부). Plot 도 허용 (ISC).
- `enable_cdn_viz = false` 인데 query 가 차트를 요구하면, LLM 은 인라인 SVG, CSS, vanilla JS 로 대체한다.

테스트에서는 기본 모드 출력에 `<script src="https?://` 가 0개라는 점을 검증해야 한다 (PRD Testing Decisions).

## 화면 구성 — 더 이상 "정적 리뷰 화면" 이 아니다

이전 revision 의 "검색 / 필터 / 정렬 / 접기·펼치기 제외" 항목은 **폐기한다**. 이 milestone 의 본질은 인터랙티브 HTML 이다. Thariq 의 20개 예시 (design-token slider, PR 리뷰 + 위험도 색상 diff, 비교 매트릭스, 인터랙티브 explainer, 일회용 에디터) 와 41 패턴 라이브러리가 그 본보기다.

대신 다음 규칙을 따른다.

- 인라인 이미지, 인라인 링크, 최소한의 애니메이션 모두 허용한다. 단 애니메이션은 주의를 흩뜨리는 용도가 아니라 affordance 를 알려주는 용도에 한정한다 (focus highlight, toast 등).
- 구체적 UI 형태 (인라인 UI / modal / popover 등) 는 LLM 이 query 와 source 에 맞게 고른다. *단 M5 의 stale banner 같은 특정 패턴 contract 는 그 패턴 명세를 따른다* (예: banner = 비차단).
- HTML 은 dashboard 가 아니라 **query 한 개에 답하는 단일 artifact** 다. 여러 query 를 한 화면에 모으지 않는다.

## 패턴 라이브러리 (PRD D12)

세 층으로 나눈다. **베이스라인 3 (strict)**, **선택 베이스라인 (LLM 적합성 판단)**, **추천 패턴 (LLM hint, 강제 아님)**.

### 베이스라인 3 — 모든 호출 출력에 포함 (UX 약속, strict)

| 패턴 | 역할 |
|---|---|
| N1 citation 포함 답변 카드 | 핵심 답을 인용과 함께 상단에 둔다 |
| N+5 source-of-truth back-link 배지 | 각 인용에 원본 Markdown 링크를 단다 |
| N+4 copy-as-prompt 오버레이 | 모든 인터랙션에 `[Copy]` / `[Save]` 를 단다 (M3 일반화 패턴) |

이 3개는 *항상* 포함된다. *"무엇이 답인지 / 원본은 어디인지 / 다음 agent turn 으로 어떻게 이어가는지"* 가 매 출력에서 보여야 도구를 신뢰한다.

### 선택 베이스라인 — LLM 이 적합성 판단

| 패턴 | 가치가 높은 경우 |
|---|---|
| N+1 discovery transparency 패널 | 첫 사용 / dirty repo 결과 의심 / 큐레이션 의도 설명 필요 |
| N33 원문 주석 | 본문 review 흐름 / 사용자가 길게 읽고 코멘트 다는 시나리오 |

이 2개는 *strict 가 아니다*. 단순 답변 / 차트 / kanban 같은 query 에는 노이즈가 된다. LLM 이 query 보고 적합 여부 판단.

### 추천 패턴 (Nadia 평가 §2~§5, LLM 의 메뉴판)

selector 는 **data-shape × visualization-surface 매트릭스** (라이브러리 단위 아님). LLM 이 쿼리 + 큐레이션된 source 보고 적절한 패턴을 고른다. 자세한 결정 트리는 `docs/research/persona-evaluation-nadia-park.md` §5-1.

- **P0 우선 추천** — vault 그래프 (N2), backlinks (N3), 갤러리 (N4), 표 (N5), three-approaches (N6), 모듈 그래프 (N8), 타임라인 (N14), spec 차트 (N23, **opt-in CDN**), tabbed (N29)
- **P1 후속** — diff (N7), kanban (N11), 슬라이드 (N12), status (N13), PR writeup (N15), flowchart (N17), 기능 설명 (N18), 구현 계획 (N20), 계층 (N24), wizard (N30), manifest diff viewer (N+2), unknown markdowns triage (N+3), lazy stale banner (N+6), query refinement chips (N+7)
- **P2 / P3** — 디자인 시스템, 애니메이션 sandbox, scrollytelling, 캘린더, quadrant, radar, command palette 등 (도메인 특화)

**41 이라는 숫자에 박히지 않는다**. 카탈로그에 없는 패턴이 쿼리에 더 맞으면 LLM 이 즉석 생성해도 된다. 카탈로그는 *체크리스트* 가 아니라 *경험의 압축* 이다.

## Source 링크와 back-link 배지 (N+5)

각 인용·주장·발췌 옆에 source-of-truth back-link 배지를 둔다.

- 경로는 프로젝트 루트 기준 상대 경로다.
- Windows 의 backslash 는 반드시 `/` 로 통일한다 (`docs\example.md` → `docs/example.md`).
- 배지를 클릭하면 원본 Markdown 의 해당 heading anchor 로 이동한다 (가능한 경우).
- OS 별 editor deep link 는 다음 UX 개선 때 다룬다.

## Manifest 매핑

- `path` → source 링크와 back-link 배지의 이동 대상
- `title` → 인용 섹션 제목
- `abstract` → 인용 카드의 1줄 보조 요약 (frontmatter `abstract` 또는 head 5~10줄)
- `reason` → discovery transparency 패널 (N+1) 에 노출
- `major_headings` → 문서 안쪽 anchor 후보 (heading slug 로 deep link)
- `mtime`, `size` → report 를 만들 때 찍은 source 메타. 이후 M5 의 lazy stale 검출 기준이 된다 (mtime 또는 size 가 바뀌었으면 re-render)

## Copy-as-prompt 와 M3 의 관계

N+4 copy-as-prompt 오버레이는 베이스라인이다. 그래서 M2 단계에서 이미 모든 인터랙티브 기본 요소 (slider, drag, toggle, 비교, 사용자가 쓴 코멘트) 에 `[Copy]` / `[Save]` 가 붙어 있어야 한다. M3 의 리뷰 코멘트는 이 일반화된 패턴의 **한 가지 응용**일 뿐이다.

- `[Copy]` → 클립보드에 복사 + toast.
- `[Save]` → `.agent-output/show-me/_review/<slug>.md` 에 *block append* + 클릭 가능한 경로 toast + 누적 건수 표시 (PRD D7).

## 완료 기준

- `index.html` 이 server 없이 file:// 로 열린다.
- 같은 source set + 다른 query → 다른 HTML 이 나온다 (query 형태에 맞춰 만들어지는지 검증).
- 베이스라인 3 (N1, N+5, N+4) 이 모든 호출 출력에 strict 포함된다. N+1, N33 은 LLM 적합성 판단으로 선택.
- `enable_cdn_viz = false` (기본) 일 때 출력 HTML 의 CDN `<script>` 태그가 0개다.
- `enable_cdn_viz = true` 일 때 Vega-Lite / ECharts spec 이 실제로 렌더된다.
- back-link 배지 (N+5) 가 원본 Markdown 으로 이어지고, Windows 경로가 `/` 로 통일된다.
- discovery transparency 패널 (N+1) 이 M1 의 selection reason 을 그대로 보여준다.
- 모든 인터랙션 기본 요소에 `[Copy]` / `[Save]` 오버레이 (N+4) 가 붙는다.
- 출력이 `.agent-output/show-me/reports/<slug>/` 아래에 생긴다.
- `.gitignore` 처리: 첫 실행 때 confirm prompt → 사용자 `y` 면 atomic write 로 append, `n` 면 알림만 + 거부 기록 (다시 묻지 않음).
- M2 를 부를 때 zero install / 외부 네트워크 호출 0건이 검증된다 (기본 모드).
