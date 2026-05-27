---
id: md-show-me-prd
type: prd
status: skill-minimal
language: ko
updated: 2026-05-27
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
  - research/user-discovery/synthesis-final
  - research/user-discovery/persona-h-leader-mode-vibe-coder
---

# md-show-me PRD

## Changelog

- **2026-05-27 (5차)** — 사용자 결정 4건 반영 (디자인 무관). (1) v1 primary 사용자 = 박서윤 (페르소나 H, 비CS 풀스택 학습자, 시각 학습자, AI 적극 활용) 으로 격상, 박지훈 (시니어 백엔드) 은 v1 secondary. 근거 = "도메인 지식 부족자도 큐레이션 결과로 의사결정 가능" 약속의 직접 검증자. (2) AI 답 톤 차단 5룰 (음차 무분별 금지, 어려운 한자어 금지, 번역체 종결어미 금지, em dash 단락당 1개 이내, 전문 용어 첫 등장 시 한글 풀이 의무) 을 M2 출력 본문 규칙으로 박음 — 색·폰트 같은 시각 결정과 독립이라 5차 정비에서 같이 처리. (3) 베스트셀러 4단계 흐름 (주의 끌기 → 소개 → 본문 → 적용) 을 view 기본 layout 으로 권장 — strict 강제 여부는 박서윤 dogfood 결과까지 보류. (4) "왜 우리 도구가 작동하는지" 의 학술 근거 사슬 (인지 → 기억 → 활용) 을 짧은 표로 박음 (Paivio / Sweller / Wittrock / Karpicke). 색 hex / 폰트 stack / 자세한 시각 결정은 Claude Design 결과 받고 별도 처리 (이 정비에서는 미포함).
- **2026-05-26 (4차)** — `/grill-with-docs` 일대일 검토 정비. **M0 milestone → M1 흡수, M0 파일 archive.** profile.json cache 폐기. `unknown_markdowns` → M1 manifest top-level 필드. file_hash → mtime + size 휴리스틱. profile_hash / schema_version / match_strength 등급 / matched_fields / block_ids / abstract_source / excerpt 캐시 분기 / `external_sources` / `role_patterns` strict glob 표 / Conventional 경로 numbered list / `generated_markers` strict 키워드 list 모두 폐기. 41-패턴 strict 카탈로그 → 베이스라인 **3** strict (N1/N+5/N+4) + 선택 베이스라인 2 (N+1/N33, LLM 적합성 판단) + 추천 패턴 hint (즉석 생성 허용). M3 UI prescriptions (의견 버튼 / inline textarea / sessionStorage) 톤다운, LLM 자유. M4 contract (`anchor_status` enum found/weak/ambiguous/missing, `occurrence_index`, MD wire format) strict 유지. `major_headings` 유지 (M5 heading drift 감지). `.gitignore` 자동 처리 → confirm prompt y/n, 거부 시 알림만 + 다시 묻지 않음 (`gitignore_prompt_declined` 기록). `[Save]` → `_review/<slug>.md` block append (slug 당 1파일, dedup `source_path+anchor_quote+comment`, toast 누적 건수). slug 결정론적, history `_history/<ISO-timestamp>/` 누적, skill 은 auto-prune 안 함. M4 `surrounding_context` paragraph 규칙 폐기 (LLM 이 의미 단위 판단). Constraint #5 자동 모델 다운로드 opt-in 완전 폐기 (escape hatch 0).
- **2026-05-26 (3차)** — skill 패러다임 first-principles 정비. LLM 이 자연스럽게 잘 하는 것 (Glob/Grep 판단, 후보 선별, 매칭 reasoning, cluster 판단) 은 PRD 에서 *명세 제거*. 우리가 진짜 더하는 것만 남김 — HTML 템플릿 라이브러리, 패턴 가이드, copy-as-prompt UX, 출력 컨벤션, Constraints. file_hash / profile_hash / schema_version / match_strength 등급 / abstract 캐시 / 41-패턴 strict 카탈로그 강제 등 script 도구 관성 제거.
- **2026-05-26 (2차)** — over-engineering 정리 1차. BM25 + embedding 완전 제거, 자동 모델 다운로드 opt-in 제거, config split 폐기.
- **2026-05-26** — paradigm 재정의. 5번째 제약 (zero install / zero network) 추가, 41 패턴 라이브러리 + spec viz opt-in CDN 도입, D10–D13 추가.

## Problem Statement

사람과 AI 가 만든 문서 사이 루프를 망가뜨리는 문제가 둘 있다. 둘은 맞물려 악화된다.

**문제 1 — 사람은 AI 결과물을 읽지 않는다.** agent 가 Markdown 으로 리포트, 계획, 리뷰를 내놓으면 끝까지 읽는 비율이 0 에 수렴한다. Thariq 실측 = MD 0%, HTML 95%. Karpathy 도 AI 출력의 다음 단계가 HTML 이라고 본다.

**문제 2 — 큰 Markdown repo 에서는 뭐가 진짜 관련 있는지 모른다.** 50개 `.md` 가 쌓인 repo 에서 한 줄 질문을 던졌을 때 "이 5개만 보면 됨" 을 짚어줄 도구가 없다. Thariq 식 "파일 명시 + HTML 만들어줘" 는 사용자가 이미 파일을 알 때만 통한다.

우리 도구는 *질의 → discovery 자동 → 인터랙티브 HTML 큐레이션* 까지 한 번에 연결한다.

## v1 사용자 정의

5차 정비 (2026-05-27) 에서 user-discovery 종합 결과 (`docs/research/user-discovery/synthesis-final.md`) 를 받아 primary / secondary 를 다음과 같이 박는다. 자세한 페르소나는 같은 폴더의 페르소나 문서.

| 우선순위 | 페르소나 | 한 줄 정체성 | 격상/배치 근거 |
|---|---|---|---|
| v1 primary | **박서윤** (페르소나 H) | 27세, 비CS 풀스택 학습자 (학부 생물학 → 부트캠프 + 풀스택 인턴), 시각 학습자, Claude Code / Obsidian / GitHub 적극 활용 | "도메인 지식 부족자도 큐레이션 결과로 의사결정 가능" 이라는 도구의 핵심 약속을 *직접 검증* 하는 사용자. dogfood 최단 loop (사용자 본인 정체성). |
| v1 secondary | 박지훈 | 34세, KR 시니어 백엔드 (10년차) | 정보 밀도·신뢰성·인용 추적 같은 *전문가 상한선* 검증. 두 사람이 학습자 ↔ 전문가 양 끝을 잡아주면 가운데 페르소나는 자연스럽게 포함. |

이 배치는 도구의 모든 design / UX 결정에서 우선 검증 대상이 박서윤이라는 뜻이다. *학습자가 끝까지 읽고 의사결정 가능한가* 가 1번 질문, *시니어가 정보 밀도에 만족하는가* 가 2번 질문.

## 왜 작동하는가 — 인지-기억-활용 사슬 (학술 근거)

도구의 모든 부위는 *학습자가 한 번에 인지하고 → 기억에 남기고 → 다음 작업에 활용* 하는 사슬 위에서 설계됐다. Markdown 만으로는 활용 단계가 무너진다 (사용자가 다시 안 봄). HTML 큐레이션이 그 빈 사슬을 메운다.

| 도구 부위 | 학술 근거 | 한 줄 설명 |
|---|---|---|
| 시각 큐레이션 (인용 카드 + 원본 발췌 인접) | Paivio (1971) 이중 부호화 (dual coding, 글과 그림을 동시에 노출하면 기억이 두 번 박힘) | 같은 화면에 글과 시각 정보가 같이 있어야 학습자 기억에 강하게 남음. |
| 적은 정보 + 정보 위계 시각화 | Sweller (1988) 인지 부하 이론 (cognitive load, 한 번에 처리 가능한 묶음 수의 상한) | 한 화면에 묶음 4±1개. 위계가 살아있으면 비CS 학습자도 머릿속 구조 (schema) 가 잡힘. |
| `[Copy]` / `[Save]` / copy-as-prompt 행위 | Wittrock (1974) 생성적 학습 (generative learning, 사용자가 직접 만들어내는 행위가 학습을 강화) | 사용자가 다음 prompt 를 *직접 만드는* 행위로 학습이 깊어짐. 그냥 읽기보다 손이 움직임. |
| 다시 호출 (`/show-me` 재실행) + 변경 안내 띠 | Karpicke (2008) 인출 연습 (retrieval practice, 기억에서 꺼내는 행위 자체가 가장 강한 학습) | 같은 주제를 다시 부를 때마다 기억에서 꺼내는 일 자체가 학습을 강화. |

이 사슬은 design 결정의 *왜* 다. 베이스라인 3 (N1 / N+5 / N+4) 이 strict 인 이유, 카드 3~5개 권장, 모든 인터랙션에 `[Copy]` / `[Save]` 가 따라붙는 이유 모두 위 표로 환원된다.

## 출력 본문 톤 차단 5룰 (M2 HTML 본문에 항상 적용)

5차 정비에서 박서윤 페르소나의 명시 pain ("한글 사이 영어 단어 박혀 읽다 멈춤", "한자어 남발", "번역체") 을 받아, M2 가 만들어내는 HTML 본문에 다음 5룰을 *항상* 적용한다. 시각 디자인 (색·폰트) 과 독립이라 5차 정비에서 같이 박는다. SKILL.md 의 같은 룰과 일관.

1. **영어 단어 음차 무분별 섞기 금지** — "baseline", "anti-pattern", "framework", "context", "trace" 같이 일반어로 대체 가능한 단어는 한글로 풀이 ("기본 패턴", "해서는 안 되는 것", "구조", "맥락", "추적"). 대체 불가 전문 용어만 원어 유지 + 한글 풀이 병기.
2. **어려운 한자어 남발 금지** — "당사는", "본 도구는", "수행하다", "활용하다", "구현하다" → "저희가", "이 도구는", "한다", "쓴다", "만든다" 로 풀어 쓰기.
3. **번역체 종결어미 금지** — "~에 의해", "~할 수 있습니다", "~되어집니다" 금지. "~할 수 있어요", "~돼요" 같은 자연스러운 한국어 어미.
4. **em dash (—) 한 단락당 1개 이내** — 콤마·괄호로 대체 가능하면 대체. 2025년 AI 글 식별 신호 중 하나라 절제.
5. **지식의 저주 (curse of knowledge) 차단 — 전문 용어 첫 등장 시 한글 풀이 의무** — 도메인 약어, 3글자 이하 영문, 학습자가 모를 단어는 첫 등장 시 괄호 안 또는 hover 풀이 1줄. 같은 페이지 안에서 재등장 시 풀이 생략 (반복 정보가 인지 부하를 늘림).

근거 — `docs/research/user-discovery/synthesis-final.md` §12 의 anti-pattern 룰, `academic-communication-korean.md`, 토스 라이팅 가이드, Pinker (2014) *curse of knowledge*.

## v1 view 기본 layout — 베스트셀러 4단계 흐름 (권장)

박서윤 페르소나가 "베스트셀러 책 톤" 을 ideal 로 짚었고, Gawande / Gladwell / 김상욱 / 정재승 같은 popular science 저자들이 공통으로 따르는 4단계 흐름이 도구의 view 기본형으로 자연스럽다.

```
1. 주의 끌기 (lead)       ← 한 줄 결론 또는 도발적 질문 (첫 viewport)
2. 소개 (premise)         ← 이 답이 왜 필요한지 1~2문장 (맥락 다리)
3. 본문 (worked example)  ← 인용 카드 3~5개 (베이스라인 1, Cowan 4±1)
4. 적용 (transfer)        ← copy-as-prompt + 다음 질문 chip (베이스라인 N+4)
```

베이스라인 1 (citation 답변 카드) 과 베이스라인 N+4 (copy-as-prompt) 가 본문·적용 단계와 직접 정렬되므로 *추가 비용 거의 없음*. 단지 layout 의 기본 순서를 박는 것.

**사용자 결정 보류** — 이 4단계를 strict 강제로 박을지, 짧은 lookup 질의에는 생략하게 LLM 적합성 판단으로 둘지는 **박서윤 dogfood 결과 받고 결정**. 5차 정비에서는 권장으로만 표시.

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
- **P0 (M2 v1)** — vault 그래프, backlinks, 갤러리, 표, 비교, 타임라인, spec 차트, 탭 전환 (tabbed)
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
| D14 | v1 primary = 박서윤 (페르소나 H, 비CS 풀스택 학습자, 시각 학습자, AI 적극 활용), v1 secondary = 박지훈 (시니어 백엔드) | new (5차) |
| D15 | M2 HTML 본문에 톤 차단 5룰 항상 적용 (음차 무분별 / 한자어 / 번역체 / em dash / 지식의 저주) | new (5차) |
| D16 | View 기본 layout = 베스트셀러 4단계 흐름 (주의 끌기 → 소개 → 본문 → 적용). strict vs 옵션 여부는 박서윤 dogfood 결과까지 보류 | new (5차, 사용자 결정 대기) |

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
- **본문 톤 차단 5룰 (D15)**: M2 HTML 본문 표본 검사 — em dash 단락당 1개 이내, 첫 등장 전문 용어에 한글 풀이 동반, 음차 무분별·번역체 종결어미 부재. 학습자 페르소나 (박서윤) 가 *멈춤 없이* 끝까지 읽는지 dogfood 로 확인.

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
