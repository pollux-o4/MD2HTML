---
id: md-show-me-milestone-0-project-profile
type: milestone
status: cache-free-revised
updated: 2026-05-26
---

# md-show-me Milestone 0: Project Scanning Rules

## 목적

M0 는 *cache 파일* 이 아니라 *스캔 규칙 가이드* 다. 매 `/show-me` 호출 때마다 LLM 이 이 규칙으로 repo 를 새로 본다. 별도 `project-profile.json` cache 는 두지 않는다.

이전 revision 까지 `.agent-output/show-me/_cache/project-profile.json` 을 생성했지만 폐기됐다. 모든 필드가 `.show-me.toml` (사용자 명시) 또는 LLM 이 매 호출 derive 가능한 값이라 cache 가 죽은 상태였다. stale 감지는 직전 M1 manifest 와 비교로 충분하다 (PRD D2).

zero install / zero network 원칙은 그대로 유지한다 (PRD Constraints §5, D11). 모든 스캔 작업은 로컬 파일 읽기와 Glob / Grep 만으로 처리한다.

## 신뢰 source 의 conventional 경로

LLM 이 매 호출 다음 순서로 본다:

1. root `*.md`
2. `docs/meta/*.md`
3. `docs/adr/*.md`
4. `docs/references/*.md`
5. root `.show-me.toml` (있을 때만 — 아래 "옵션 config" 참고)
6. `.gitattributes` 의 `linguist-generated=true` 라인 — exclude set 에 자동으로 합친다

짧은 redirect-stub 도 인식한다. 루트 MD 가 5줄 이하이고 다른 Markdown 경로를 가리키면, 그 문서를 따라가서 실제 source 로 본다.

ADR 같은 후보 문서의 가벼운 preview 는 M1 의 head-preview 와 같은 형식 (PRD D10): filename, H1, frontmatter (있을 때), 본문 첫 5~10줄, 옵션 `##` heading.

`docs/references/**` 처럼 도메인 참고 문서를 모아두는 경로는 trusted source 후보. 프로젝트별 비표준 경로는 `.show-me.toml` 에 적어 추가.

## 옵션 config (`.show-me.toml`)

기본적으로 config 는 **필요 없다**. LLM 이 매 호출마다 repo 를 스캔하고, 위 conventional 경로를 우선 본다. 비표준 layout 이거나 override 가 필요할 때만 `.show-me.toml` 한 파일을 둔다 (PRD D9).

- 위치: repo root.
- 기본: **gitignored**. 팀이 공유하려면 `.gitignore` 에서 빼고 commit.
- 내용 (모든 필드 옵션):

```toml
trusted_sources = ["docs/adr/**", "docs/references/**", "meta/choices/**"]
role_patterns = [
  { pattern = "handoff.md", role = "handoff" },
  { pattern = "**/handoff/**", role = "handoff" },
  { pattern = "*.draft.md", role = "draft" },
  { pattern = "memory.md", role = "working-memory" },
]
exclude_patterns = ["custom-build/**"]
generated_markers = ["AUTO-GENERATED", "DO NOT EDIT MANUALLY"]
enable_cdn_viz = false

[[external_sources]]
name = "Discord"
role = "collaboration"
integration = "not-implemented"
```

config 가 없으면 LLM 이 conventional 경로 + `.gitattributes` + 휴리스틱으로 동작. 있으면 그 값이 default 를 덮어쓴다.

## 기본 exclude 휴리스틱

`.show-me.toml` 명시가 없을 때 LLM 이 기본으로 제외하는 패턴:

- dependency: `node_modules/**`, `.venv/**`, `__pycache__/**`, `*.egg-info/**`
- generated / build: `dist/**`, `build/**`, `coverage/**`, `.next/**`, `.nuxt/**`, `target/**`, `vendor/**`
- tool worktree: `.claude/worktrees/**`, `.claude/scratch/**`, `.agent-output/**`
- generated marker (본문 검색): `AUTO-GENERATED`, `DO NOT EDIT MANUALLY`, frontmatter `auto_generated: true`
- `.gitattributes` 의 `linguist-generated=true` 경로

handoff, draft, memory 는 **제외 아니라 role 분류**. 사용자 요청과 맞으면 후보로 올라간다.

## Role 분류 휴리스틱

`.show-me.toml` 의 `role_patterns` 명시가 없을 때 LLM 이 기본으로 적용:

| 파일명 / 경로 패턴 | role |
|---|---|
| `handoff.md`, `**/handoff/**` | `handoff` |
| `*.draft.md` | `draft` |
| `memory.md` | `working-memory` |
| `docs/adr/*.md` | `decision` |
| `docs/references/*.md` | `reference` |

## 외부 source role

GitHub, Discord, ClickUp 같은 외부 도구는 *사용자가 `.show-me.toml` 에 등록한 역할 정보만* 인식. API 연동이나 자동 탐색은 하지 않는다.

role enum 예시: `collaboration`, `code_decision`, `code_review`, `task`, `issue_tracker`, `runtime_config`.

## Stale 처리 — manifest diff 기반

별도 profile cache 가 없으므로 stale 판정도 다르다. M5 의 lazy check 가 *직전 M1 manifest* 와 *현재 repo 상태* 를 비교:

- `.md` 파일 추가 / 삭제 → manifest diff (`added_sources`, `removed_sources`)
- 파일 mtime 또는 size 변경 → manifest 의 `changed_sources`
- `.show-me.toml` mtime / size 변경 → 전체 재스캔 (role 규칙이 바뀌었을 수 있음)
- `.gitattributes` mtime / size 변경 → exclude set 재계산

이때 새로 발견된 미분류 `.md` 는 manifest 의 `unknown_markdowns` 필드에 들어간다 (M1 manifest top-level 필드).

## 완료 기준

- M1 이 실행되기 전에 M0 의 스캔 규칙이 적용된다 (별도 cache 파일 없이).
- root, meta, ADR, references, stub 문서를 conventional 경로로 본다.
- dependency, build, generated, tool 출력물을 기본 exclude 휴리스틱으로 잡는다.
- `.gitattributes` 의 `linguist-generated=true` 경로가 자동으로 exclude set 에 들어간다.
- handoff, draft, memory 는 제외하지 않고 role 로 분류한다.
- 외부 협업 도구는 수동 등록된 역할만 기록한다.
- `.show-me.toml` 옵션 config 가 있을 때 그 값이 default 를 덮어쓴다. 없으면 LLM 이 conventional + 휴리스틱으로 동작한다.
- `project-profile.json` cache 파일을 생성하지 않는다.
- M0 스캔 동안 패키지 자동 설치, 모델 자동 다운로드, 외부 network 호출이 일어나지 않는다.
