---
id: md-show-me-skill-strategy
type: design-note
status: revised
updated: 2026-05-19
owner: human-with-agent
target: codex-skill
supersedes:
  - dist/show-me output default
  - review patch YAML as user-facing review format
---

# MD Show-Me Skill Strategy

작성일: 2026-05-19  
상태: 후속 리뷰 반영본  
목적: 여러 프로젝트에 누적된 Markdown 문서를 사용자의 요청에 맞게 찾아서, 사람이 빠르게 검토할 수 있는 HTML view와 리뷰 연결 흐름을 제공한다.

<!-- block:exec-summary -->
## 1. 요약

`md-show-me`는 Markdown-to-HTML 변환기가 아니다. 목표는 다음 workflow를 안정적으로 나누는 것이다.

```text
프로젝트 규칙 파악
-> 관련 Markdown 후보 선택
-> static HTML report 생성
-> 자연어 리뷰 컨텍스트 생성
-> anchor 검증 후 다음 에이전트용 context package 생성
-> refresh/rescan으로 갱신
```

후속 리뷰 결과, 기존 4단계 milestone은 6단계로 재구성한다. Project Profile을 가장 앞에 두고, Apply Review와 Refresh/Rescan을 별도 milestone으로 둔다.
<!-- /block:exec-summary -->

<!-- block:principles -->
## 2. 핵심 원칙

### 2.1 Source of Truth는 Markdown과 프로젝트 협업 규칙이다

HTML report, manifest, project profile은 모두 파생물이다. 원본은 프로젝트 안의 Markdown과 프로젝트가 이미 정한 협업 규칙이다.

```text
Source of truth = persistent project documents + project collaboration rules
Derived artifact = project-profile.json + manifest.json + report.html + copied review context
```

### 2.2 Project Profile이 먼저다

Discovery가 제대로 작동하려면 먼저 프로젝트의 문서 규칙을 알아야 한다. 따라서 project profile 생성은 M1이 아니라 M0다.

### 2.3 HTML은 검토 화면이다

HTML은 원본을 대체하지 않는다. 기본은 excerpt view이고, 사용자가 명시한 문서만 full render한다.

### 2.4 리뷰는 자연어로 시작하고 anchor로 검증한다

사용자에게 YAML patch 작성을 요구하지 않는다. 대신 HTML에서 자연어 리뷰를 쓰게 하고, 시스템이 `source_path`, `heading`, `anchor_quote`, `weak_anchor`, `comment`, `created`가 포함된 review context를 만든다.

### 2.5 `dist/show-me/`는 폐기한다

출력 위치는 `.agent-output/show-me/`로 통일한다.

```text
.agent-output/show-me/_cache/        # project profile 같은 cache
.agent-output/show-me/reports/<slug>/ # manifest + report.html
```

### 2.6 Superseded Decisions

- `dist/show-me/<slug>/` output default: **Superseded by** `.agent-output/show-me/reports/<slug>/`.
- User-facing review patch YAML: **Superseded by** M3 natural-language review context.
- Direct review application from HTML: **Superseded by** M4 apply-review context package generation.
- Single `refresh` behavior: **Superseded by** M5 `refresh` and `rescan` split.
<!-- /block:principles -->

<!-- block:milestones -->
## 3. Milestone 구조

### M0. Project Profile

프로젝트 규칙을 먼저 읽어 profile cache를 만든다.

- root `*.md`, `docs/meta/*.md`, `docs/adr/*.md`, `docs/references/*.md`를 규칙 source 후보로 본다.
- 짧은 redirect-stub 문서는 참조한 실제 Markdown을 따라간다.
- `.show-me.json` 또는 `.show-me.toml`이 있으면 명시 설정으로 사용한다.
- 결과는 `.agent-output/show-me/_cache/project-profile.json`에 저장한다.
- 외부 협업 도구는 `.show-me.toml` 또는 `.show-me.json`에 수동 등록된 역할만 기록하고 API 연동이나 자동 탐색은 하지 않는다.

### M1. Discovery

사용자 요청에 맞는 Markdown 후보를 최대 5개 고른다.

- M0 profile을 입력으로 사용한다.
- `handoff`, `draft`, `memory`는 무조건 제외하지 않고 role로 분류한다.
- 기본 제외는 dependency/build/generated 중심이다.
- `match_strength: strong | medium | weak`를 사용한다.
- `match_strength`는 가장 강한 매칭 신호로 정하고, 동률은 `matched_fields` 개수, `updated`, filename 순으로 정렬한다.
- manifest에는 `major_headings`, 명시적 `block_ids`, `file_hash`, `abstract_source`를 포함한다.

### M2. Static HTML Report

M1 manifest를 받아 static HTML report를 만든다.

- 기본은 excerpt view다.
- 사용자가 명시한 문서만 full render한다.
- heading preview는 문서별 가장 낮은 non-H1 heading level을 최대 5개 쓰고, excerpt는 문장 경계 기준 최대 200자다.
- Windows 경로도 HTML link에서는 `/`로 정규화한다.
- report는 `.agent-output/show-me/reports/<slug>/`에 둔다.

### M3. Natural Language Review Context

HTML report에서 자연어 리뷰를 쓰고 복사 가능한 review context를 만든다.

- 사용자는 YAML patch를 직접 쓰지 않는다.
- context에는 항상 `source_path`, `heading`, `anchor_quote`, `weak_anchor`, `comment`, `created`가 들어간다.
- 선택 텍스트가 없으면 선택을 권장하고, fallback anchor에는 `weak_anchor: true`를 붙인다.
- 리뷰는 기본 저장하지 않고 페이지 안에 누적 표시한 뒤 전체 복사한다. 같은 탭 reload 보호용 `sessionStorage` draft buffer는 허용하지만 source of truth는 아니다.

### M4. Apply Review

M3 review context를 받아 원본 Markdown 위치를 검증하고 다음 에이전트용 context package를 만든다.

- `anchor_quote`가 현재 source 안에 있는지 확인한다.
- 실패하면 `source_missing`, `heading_missing`, `anchor_missing`, `anchor_ambiguous` 같은 상태를 출력한다.
- `anchor_ambiguous`는 occurrence index가 있을 때만 해당 occurrence를 사용하고, 없으면 자동 선택하지 않는다.
- `surrounding_context`는 unique anchor면 이전/현재/다음 paragraph, weak/ambiguous면 후보 paragraph 목록, missing이면 heading block excerpt를 포함한다.
- 원본 Markdown은 자동 수정하지 않는다.

### M5. Refresh and Rescan

갱신 동작을 둘로 나눈다.

```text
refresh = 기존 manifest의 source 목록을 유지하고 최신 내용만 다시 렌더링
rescan  = 기존 query를 다시 해석해 source 목록부터 다시 선택
```

`refresh`와 `rescan`은 모두 먼저 M0 project profile freshness를 확인한다. `rescan`은 manifest diff를 출력하고 기존 review context가 dangling 될 수 있음을 경고한다.
<!-- /block:milestones -->

<!-- block:workflow -->
## 4. 기본 Workflow

### 최초 실행

```text
/show-me 설계와 리뷰
```

동작:

1. M0 project profile이 없거나 stale이면 생성/갱신한다.
2. M1이 후보 최대 5개와 manifest를 만든다.
3. M2가 report를 만든다.
4. 사용자는 report를 읽는다.

### 리뷰

```text
HTML report에서 자연어 의견 작성
-> review context 전체 복사
-> M4 Apply Review 또는 외부 agent 대화에 전달
```

### 갱신

```text
/show-me refresh  # 같은 source를 다시 렌더링
/show-me rescan   # source 목록부터 다시 선택
```
<!-- /block:workflow -->

<!-- block:contracts -->
## 5. 주요 Contract

### Project Profile

```text
.agent-output/show-me/_cache/project-profile.json
```

포함:

- trusted source patterns
- role patterns
- exclude patterns
- generated markers
- output directories
- external source roles
- source hashes

### Manifest

M1 manifest는 M2/M3/M4가 다시 원본을 과도하게 추측하지 않도록 다음을 포함한다.

Top-level envelope:

- query
- created
- profile_hash
- sources[]

각 source 항목:

- path
- title
- abstract
- abstract_source
- role
- matched_fields
- match_strength
- reason
- major_headings
- block_ids
- file_hash
- updated

### Review Context

M3 review context는 자연어 Markdown prose지만, 다음 필드는 항상 포함한다.

- source_path
- heading
- anchor_quote
- weak_anchor
- comment
- created
<!-- /block:contracts -->

<!-- block:mvp -->
## 6. MVP 범위

MVP에 포함:

- M0 project profile 생성과 stale 감지
- M1 rule-based discovery
- M2 static HTML report
- M3 자연어 review context
- M4 anchor 검증과 context package 출력
- M5 refresh/rescan 분리

MVP에서 제외:

- LLM ranking
- 외부 API 연동
- GitHub/Discord/ClickUp 자동 읽기/쓰기
- HTML에서 원본 Markdown 자동 수정
- 실시간 서버 저장
- localStorage 또는 disk를 source of truth로 쓰는 review 저장
- 여러 명 동시 리뷰
<!-- /block:mvp -->

<!-- block:success -->
## 7. 성공 기준

- 원하는 Markdown 후보를 최대 5개 안에서 설명 가능하게 고른다.
- frontmatter 없는 문서도 H1 + key-value fallback으로 찾을 수 있다.
- HTML report의 source link가 Windows/macOS/Linux에서 깨지지 않는 상대 URL을 쓴다.
- 자연어 리뷰 context는 anchor 없이 만들어지지 않는다.
- Apply Review는 anchor drift를 fail-loud로 알려준다.
- refresh와 rescan의 차이가 사용자에게 명확하다.
<!-- /block:success -->
