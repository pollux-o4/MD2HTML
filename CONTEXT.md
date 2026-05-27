# html-md Context

이 문서는 *용어집 (glossary)* 이다. 구현 세부는 각 milestone 문서가 책임진다.

## Glossary

### MD Show-Me

Markdown discovery + 인터랙티브 HTML 큐레이션 skill. `/show-me <쿼리>` 한 줄로 repo 의 관련 `.md` 를 찾아 질의 형태에 맞춘 HTML 로 보여준다.

### Derived Artifact

생성된 결과물 (manifest, HTML, review context package 등). Markdown 이 source of truth 이고 derived artifact 는 언제든 재생성 가능하다.

### Discovery (M1)

`/show-me` 가 쿼리를 받아 trusted folder 를 head-preview + agent loop 로 큐레이션하는 단계. hard cap 없음, LLM 이 매 호출 적정 set 크기를 정한다.

### Manifest

Discovery 결과를 담는 JSON envelope. `query`, `created`, `sources[]`, `unknown_markdowns[]` 가 top-level 필드. mtime + size 휴리스틱으로 stale 판단.

### Curated HTML (M2)

쿼리 형태에 맞춰 LLM 이 매번 새로 만드는 인터랙티브 화면. 같은 source set 이라도 query 가 다르면 다른 HTML 이 나온다. 사용자 대상 출력에만 HTML 을 쓴다.

### Baseline 3

모든 `/show-me` 호출 출력에 strict 포함되는 3 패턴: citation 답변 카드 (N1), source-of-truth back-link 배지 (N+5), copy-as-prompt 오버레이 (N+4).

### Copy-as-prompt (M3)

HTML 안 모든 인터랙션 (slider, drag, toggle, review comment) 옆에 `[Copy]` / `[Save]` 버튼이 붙어 다음 agent turn 의 prompt 가 된다. wire format = Markdown.

### Review Context

`[Save]` 가 누적하는 사용자 코멘트 block. `source_path`, `heading`, `anchor_quote`, `weak_anchor`, `comment`, `created` 필수. 저장 위치 = `.agent-output/show-me/_review/<slug>.md` (slug 당 1파일, dedup).

### Apply Review (M4)

review context 를 받아 원본 Markdown 에서 anchor 를 검증하고, 다음 agent 가 바로 작업할 수 있는 context package (MD) 를 만드는 단계. 자동 MD 편집은 하지 않는다. `anchor_status` enum (found/weak/ambiguous/missing) + `occurrence_index` 가 contract.

### Lazy Stale Check (M5)

`/show-me` 매 호출마다 mtime + size diff 로 manifest 의 source 가 stale 한지 자동 감지하고 HTML banner 로 알린다. 별도 refresh / rescan 명령은 없다.

### `.show-me.toml`

옵션 사용자 설정 파일. repo root, 기본 gitignored. 모든 필드 옵션 (`trusted_sources`, `role_patterns`, `exclude_patterns`, `enable_cdn_viz` 등). config 없이도 동작.

### `<slug>`

쿼리에서 결정론적으로 만들어지는 출력 폴더 식별자. `reports/<slug>/`, `_review/<slug>.md` 등에 공통으로 쓰인다.

## Output Policy

```text
.agent-output/show-me/
  reports/<slug>/
    index.html
    manifest.json
    _history/<ISO-timestamp>/   ← 직전 호출 결과 archive (slug 마다)
      index.html
      manifest.json
  _review/<slug>.md             ← [Save] 누적 (slug 당 1파일)
```

`.agent-output/` 는 첫 실행 시 `.gitignore` confirm prompt (y/n). 거부 시 알림만 + 다시 묻지 않음.
