---
id: md-show-me-prd
type: prd
status: skill-minimal
language: ko
updated: 2026-05-26
labels:
  - ready-for-agent
  - skill-paradigm
  - install-free
source:
  - md-show-me-skill-strategy
  - md-show-me-review-closeout
  - thariq-html-effectiveness
  - karpathy-ai-output-evolution
  - thariq-templates-analysis
  - ui-patterns-catalog
  - persona-evaluation-nadia-park
  - thariq-html-effectiveness-license
---

# md-show-me PRD

## Changelog

- **2026-05-26 (4차)** — `/grill-with-docs` 일대일 검토 정비. **M0 milestone → M1 흡수, M0 파일 archive.** profile.json cache 폐기. `unknown_markdowns` → M1 manifest top-level 필드. file_hash → mtime + size 휴리스틱. profile_hash / schema_version / match_strength 등급 / matched_fields / block_ids / abstract_source / excerpt 캐시 분기 / `external_sources` / `role_patterns` strict glob 표 / Conventional 경로 numbered list / `generated_markers` strict 키워드 list 모두 폐기. 41-패턴 strict 카탈로그 → 베이스라인 **3** strict (N1/N+5/N+4) + 선택 베이스라인 2 (N+1/N33, LLM 적합성 판단) + 추천 패턴 hint (즉석 생성 허용). M3 UI prescriptions (의견 버튼 / inline textarea / sessionStorage) 톤다운, LLM 자유. M4 contract (`anchor_status` enum found/weak/ambiguous/missing, `occurrence_index`, MD wire format) strict 유지. `major_headings` 유지 (M5 heading drift 감지). `.gitignore` 자동 처리 → confirm prompt y/n, 거부 시 알림만 + 다시 묻지 않음 (`gitignore_prompt_declined` 기록). `[Save]` → `_review/<slug>.md` block append (slug 당 1파일, dedup `source_path+anchor_quote+comment`, toast 누적 건수). slug 결정론적, history `_history/<ISO-timestamp>/` 누적, skill 은 auto-prune 안 함. M4 `surrounding_context` paragraph 규칙 폐기 (LLM 이 의미 단위 판단). Constraint #5 자동 모델 다운로드 opt-in 완전 폐기 (escape hatch 0).
- **2026-05-26 (3차)** — skill 패러다임 first-principles 정비. LLM 이 자연스럽게 잘 하는 것 (Glob/Grep 판단, 후보 선별, 매칭 reasoning, cluster 판단) 은 PRD 에서 *명세 제거*. 우리가 진짜 더하는 것만 남김 — HTML 템플릿 라이브러리, 패턴 가이드, copy-as-prompt UX, 출력 컨벤션, Constraints. file_hash / profile_hash / schema_version / match_strength 등급 / abstract 캐시 / 41-패턴 strict 카탈로그 강제 등 script 도구 관성 제거.
- **2026-05-26 (2차)** — over-engineering 정리 1차. BM25 + embedding 완전 제거, 자동 모델 다운로드 opt-in 제거, config split 폐기.
- **2026-05-26** — paradigm 재정의. 5번째 제약 (zero install / zero network) 추가, 41 패턴 라이브러리 + spec viz opt-in CDN 도입, D10–D13 추가.

## Problem Statement

사람과 AI 가 만든 문서 사이 루프를 망가뜨리는 문제가 둘 있다. 둘은 맞물려 악화된다.

**문제 1 — 사람은 AI 결과물을 읽지 않는다.** agent 가 Markdown 으로 리포트, 계획, 리뷰를 내놓으면 끝까지 읽는 비율이 0 에 수렴한다. Thariq 실측 = MD 0%, HTML 95%. Karpathy 도 AI 출력의 다음 단계가 HTML 이라고 본다.

**문제 2 — 큰 Markdown repo 에서는 뭐가 진짜 관련 있는지 모른다.** 50개 `.md` 가 쌓인 repo 에서 한 줄 질문을 던졌을 때 "이 5개만 보면 됨" 을 짚어줄 도구가 없다. Thariq 식 "파일 명시 + HTML 만들어줘" 는 사용자가 이미 파일을 알 때만 통한다.

우리 도구는 *질의 → discovery 자동 → 인터랙티브 HTML 큐레이션* 까지 한 번에 연결한다.

## Solution

`/show-me <쿼리>` 한 줄이 다음을 한다.

1. LLM 이 repo 를 스캔해 후보 `.md` 를 큐레이션 (*어떻게 = LLM 의 일*)
2. 큐레이션 결과를 질의 형태에 맞춘 인터랙티브 HTML 로 렌더링 (*어떻게 = 이 PRD 의 본질*)
3. 사용자가 HTML 안에서 클릭 / 조작 / 복사 → 다음 agent turn 으로 자연스럽게 연결

## 우리가 명세 vs LLM 이 알아서

| 이 PRD 에 담음 | LLM 이 알아서 |
|---|---|
| HTML / CSS 템플릿 라이브러리 (41 패턴 자산 풀, baseline 3 만 strict 강제) | Glob / Grep scope 판단 |
| 쿼리 → 패턴 매핑 가이드 (selector hint) | 어떤 파일을 read 할지 선택 |
| copy-as-prompt UX 약속 (`[Copy]` / `[Save]`) | 후보 cluster 판단, 매칭 reasoning |
| 출력 위치 / 구조 컨벤션 (`.agent-output/show-me/...`) | head-preview 추출 방식, agent loop 횟수 |
| atomic write, 안전한 파일 IO | manifest 구조 (LLM 이 매 호출 생성) |
| 슬래시 명령 표면 (2개) | 큐레이션 set 크기 결정 |
| Constraints (zero install, MD = source of truth) | stale 판단 (mtime + size 휴리스틱) |

**원칙**: skill = *LLM 행동 가이드 + 재사용 가능한 디자인 자산*. *프로세스 명세* 가 아니다. LLM 이 자연스럽게 잘 하는 것을 다시 받아 적지 않는다.

## Constraints

1. **저비용 토큰.** "repo 전체 LLM 에 던지기" 식 무지성 접근 금지.
2. **어떤 프로젝트에서도 동작.** 빌드 시스템, 디렉토리 layout 가정 X. `.md` 만 있으면 된다.
3. **확장성.** 패턴 / 템플릿 추가가 core 수정 없이 가능해야 한다 (skill 의 prompt 자산만 확장).
4. **repo 를 망가뜨리지 않는다.** 자동 MD 편집 X, 파괴적 동작 X, 강제 commit X.
5. **Zero install / zero network.** 자동 패키지 설치 — 금지. 자동 모델 다운로드 — 금지. CDN 라이브러리는 **per-library confirm prompt** 후 사용자가 허용한 경우만 (`.show-me.toml` 의 `enable_cdn_libs = [...]` 리스트). 한 번 허용하면 다시 묻지 않음.

## 슬래시 명령

| 명령 | 동작 |
|---|---|
| `/show-me <쿼리>` | discovery + HTML 큐레이션. stale 감지는 매 호출 자동. |
| `/show-me-setting` | 첫 실행 archive 경로 1개 질문 |

기존 `/show-me-refresh`, `/show-me-rescan` 은 제거 (lazy 자동 흐름이 대체).

## HTML 출력 — 이 PRD 의 본질

### 출력 위치

```
.agent-output/show-me/reports/<slug>/index.html
```

서버 없이 `file://` 더블클릭. `.agent-output/` 는 gitignored (첫 실행 때 y/n confirm prompt → 동의 시 자동 append, 거부 시 알림만 + 다시 묻지 않음 (`gitignore_prompt_declined` 기록)).

### 41 패턴 라이브러리

자세한 카탈로그는 `docs/research/persona-evaluation-nadia-park.md`. 본질만 요약:

- **베이스라인 3 (strict, 모든 호출에 포함)** — citation 답변 카드 (N1), source-of-truth back-link 배지 (N+5), copy-as-prompt 오버레이 (N+4)
- **선택 베이스라인 (LLM 적합성 판단)** — discovery transparency 패널 (N+1, 첫 사용 / 결과 의심 시 가치 ↑), 원문 주석 (N33, 본문 review 흐름일 때 가치 ↑)
- **P0 (M2 v1)** — vault 그래프, backlinks, 갤러리, 표, 비교, 타임라인, spec 차트, tabbed
- **P1 후속** — diff, kanban, 슬라이드, status, PR writeup, flowchart, wizard, manifest diff viewer (N+2), unknown markdowns triage (N+3), lazy stale banner (N+6), query refinement chips (N+7)
- **P2 / P3** — 도메인 특화 (v2)

LLM 이 쿼리 + 큐레이션된 source 보고 어떤 패턴을 쓸지 고른다. selector 는 라이브러리 단위가 아니라 **데이터 형태 × 시각화 표면** 매트릭스 (LLM 의 hint 이지 strict 카탈로그가 아니다).

### CDN 라이브러리 = per-library confirm prompt

LLM 이 쿼리 보고 *어떤 외부 라이브러리* 가 결과를 더 좋게 만들 수 있다 판단 (Vega-Lite, ECharts, Tailwind, Chart.js, Mermaid 등). `.show-me.toml` 의 `enable_cdn_libs` 리스트에 그 라이브러리가 없으면 confirm prompt:

```
이 결과에 Tailwind CSS (CDN, ~50KB) 를 쓰면 더 보기 좋아짐.
허용? (y/n, y → 앞으로 자동 사용)
```

- `y` → `.show-me.toml` 의 `enable_cdn_libs` 에 append, 이번 호출에 사용
- `n` → 인라인 CSS/JS 만, 다시 묻지 않음 (declined 기록)

기본 = inline SVG / CSS / vanilla JS. 외부 라이브러리는 한 번도 안 거치고 만들 수 있다 (D13).

### copy-as-prompt UX

HTML 안 모든 인터랙션 (slider, drag, toggle, 코멘트) 옆에 두 버튼:

- `[Copy]` — 클립보드, toast 알림
- `[Save]` — `.agent-output/show-me/_review/<slug>.md` 에 block append (slug 당 1파일, dedup key = `source_path + anchor_quote + comment`). toast = "✅ 저장됨 → ... (총 N건)".

리뷰 코멘트는 이 패턴의 한 응용. wire format = Markdown (HTML 아님).

### Source back-link

각 인용 옆에 원본 `.md` 링크. Windows 경로는 `/` 통일.

## 옵션 config

기본적으로 config 는 **필요 없다**. LLM 이 매 호출 repo 스캔.

override 가 필요한 경우만 repo root 에 `.show-me.toml` 하나. 기본 gitignored. 팀이 공유하려면 `.gitignore` 에서 빼고 commit. 모든 필드 옵션 (`trusted_sources`, `role_patterns`, `exclude_patterns`, `enable_cdn_viz` 등).

## Implementation Decisions

13개 결정. 자세한 근거는 milestone 문서 참고.

| ID | 결정 | 상태 |
|---|---|---|
| D1 | MD = source of truth, 나머지 = derived 결과물 | survived |
| D2 | Stale 감지 = lazy mtime + size 휴리스틱, 매 `/show-me` 호출 자동 | modified (hash → mtime + size) |
| D3 | 슬래시 명령 2개만 (`/show-me`, `/show-me-setting`) | survived |
| D4 | BM25 / embedding **완전 제거** | removed |
| D5 | abstract 필드 (frontmatter `abstract` 또는 head 5~10줄) | modified (캐시 분기 `original`/`excerpt`/`abstract_source` 폐기, 단일 `abstract` 필드만 유지, mtime/size diff 시 갱신) |
| D6 | `match_strength` 등급 (strong / medium / weak) | removed (LLM free-form reason) |
| D7 | `[Copy]` vs `[Save]` 분리 | survived |
| D8 | setting flow = 질문 1개 (archive 경로) | survived |
| D9 | atomic write / 확장 exclude / `.gitattributes` 파싱 / 옵션 단일 config | modified (split config 폐기) |
| D10 | head-preview + agent loop (LLM 자율, hard cap 없음) | survived |
| D11 | zero install / zero network | survived |
| D12 | 41 패턴 라이브러리 (LLM hint) | modified (strict 카탈로그 → 가이드) |
| D13 | CDN 라이브러리 = per-library confirm prompt + `enable_cdn_libs[]` 리스트 (spec viz 만이 아니라 *모든* CDN 자산에 일반화) | modified (단일 flag → 리스트) |

**삭제된 over-engineering**: `project-profile.json` cache 파일 (+ M0 milestone 흡수), `file_hash` (→ mtime+size), `profile_hash`, `schema_version`, `match_strength` 등급, `matched_fields`, `abstract_source`, `excerpt` 캐시 분기, `block_ids` 필드, `external_sources` 필드, `role_patterns` strict glob 표, Conventional 경로 numbered list, `generated_markers` strict 키워드 list, 41 패턴 strict 카탈로그 강제, config split, 자동 모델 다운로드 opt-in, M3 UI prescriptions (의견 버튼 / textarea / sessionStorage), M4 `surrounding_context` paragraph 규칙.

**4차 정비에서 살아남은 contract**: `major_headings` (M5 heading drift), `anchor_status` enum (found/weak/ambiguous/missing) + `occurrence_index` (M4 contract), MD wire format (M4), `unknown_markdowns` (M1 manifest top-level), slug 결정론적 + `_history/<ISO-timestamp>/` 누적 (auto-prune X).

## 차별화

| | Thariq | 우리 |
|---|---|---|
| 입력 | 파일 명시 | 쿼리 한 줄 |
| 통하는 조건 | 사용자가 이미 파일을 알아야 | dirty repo 에서도 통함 |
| HTML 생성 | one-shot | 같음 (생성 단계는 차용) |
| 차별화 | — | discovery 자동화 레이어 |

skill 의 존재 이유 = Thariq 의 "skill 필요 없음" 레시피가 깨지는 지점.

Tool-native 패턴 4개 (discovery transparency N+1, manifest diff viewer N+2, unknown markdowns triage N+3, copy-as-prompt overlay N+4) 는 외부 reference 가 없음 = 우리 차별화 핵심.

## Testing (요지)

- **install-free contract**: clean checkout 첫 `/show-me` = 0 네트워크 호출, 0 패키지 설치.
- **baseline 3 always-on**: N1, N+5, N+4 모든 호출 포함. N+1, N33 은 LLM 적합성 판단.
- **query-shaped**: 같은 source set + 다른 query → 다른 HTML.
- **CDN opt-in**: `enable_cdn_viz = false` 면 출력의 `<script src="https?://` 가 0개.
- **dirty repo**: frontmatter 없는 노트, handoff, generated snapshot, Windows 경로, 중복 anchor, unknown `.md` 모두에서 동작.
- **Apply Review (M4) wire format**: MD 출력. `anchor_status` enum (found / weak / ambiguous / missing) + `occurrence_index` 상태별 처리.
- **stale 감지**: mtime / size 변경 후 호출에서 자동 banner. `major_headings` 변경 시 M5 heading drift 감지.

## Out of Scope

- BM25, MiniLM, 그 외 모델 기반 discovery — 어느 규모에서도 안 씀
- 자동 패키지 설치, 자동 모델 다운로드, 자동 외부 네트워크 호출
- 외부 API 읽기 / 쓰기 (GitHub, Discord, ClickUp). 4차 정비에서 `external_sources` 수동 등록 필드도 폐기 (죽은 메타였음). 진짜 외부 통합은 v2 검토
- HTML 트리거 자동 MD 변경 — M2 HTML 은 prompt / 리뷰 export 만, source 편집 X
- 다중 사용자 동시 리뷰 + conflict 해결
- 백그라운드 파일 watcher (slash 명령 기반이라 백그라운드 프로세스 불가)
- HTML 을 내부 agent chain 의 wire format 으로 쓰기 (M4 = MD)
- Markdown 을 source of truth 자리에서 밀어내기
- Template 형태 M2 출력 (질의마다 다시 모양 잡음)

## Background

이전 PRD 는 *discovery 단계 agent context 낭비* 를 문제로 잡았고, M2 를 발췌만 보여주는 정적 리뷰 화면으로 다뤘다. 두 외부 신호가 문제를 다시 잡아 줬다.

1. **Thariq 의 HTML effectiveness writeup** — 같은 agent 작성 콘텐츠에서 MD 0% vs HTML 95% 완독률.
2. **Karpathy 의 AI 출력 진화 관점** — text → MD → **HTML (지금)** → 인터랙티브 neural video.

새 M2 는 두 신호를 흡수해 *질의 형태에 맞춰 매번 다시 만드는 큐레이션 HTML* 로 재정의됐다.

### 비용은 솔직하게 인정한다

HTML 출력은 MD 보다 비싸다 (토큰 ~6배, 시간 3–4배). Thariq 도 인정하고, 완독률 가치가 비용을 압도한다고 본다. 우리는 M2 에 한해 같은 거래를 받아들이고, discovery 는 싸게 유지한다 (head-preview + agent loop). 그래서 총비용에 상한이 잡힌다.

### 약점도 같이 인정한다

- Anthropic 의 토큰 가격 인센티브가 "HTML 기본값" 관점을 편향시킬 수 있다. 우리는 discovery 를 싸게 유지하고 MD 를 오래가는 자리에 둠으로써 이 문제를 줄인다.
- HTML 은 MD 보다 손으로 편집하기 어렵다. archive 를 MD 로 유지 (M4 wire format) 해서 이 문제를 줄인다.
- "HTML 이 항상 더 낫다" 는 과잉 일반화다. 우리는 HTML 을 M2 사용자 대상 큐레이션에만 쓴다. 그 외 모든 곳 (profile, manifest, 리뷰 컨텍스트, apply 패키지) 은 MD 또는 구조화된 데이터로 남긴다.

### Thariq attribution

원천 repo (`ThariqS/html-effectiveness`) = Apache 2.0 (© 2026 Anthropic PBC). 기본 권장 = 컨셉 차용 + Claude 로 직접 재구현 (라이선스 의무 0). 부분 코드 차용 시 README 한 줄 attribution.

## References

- `docs/research/thariq-templates-analysis.md` — Thariq 20 템플릿
- `docs/research/ui-patterns-catalog.md` — 외부 203 패턴
- `docs/research/thariq-html-effectiveness-license.md` — Apache 2.0 분석
- `docs/research/persona-evaluation-nadia-park.md` — 41 패턴 평가, P0~P3, selector rulebook
- `docs/md-show-me-milestone-1..5-*.md` — milestone 별 light spec (M0 는 4차 정비에서 M1 으로 흡수, archive)
