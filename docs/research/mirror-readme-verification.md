# Mirror + README 검증 보고서

검증일: 2026-05-27
검증자: 검수 sub-agent
대상: `C:\Users\orix4\Documents\html-md\skills\` (mirror) + `README.md`

## 1. Mirror 검증 — PASS

`diff -r` 결과 차이 0건. `sha256sum` 6개 파일 전부 byte-identical.

| 파일 | SHA256 (앞 12자) |
|---|---|
| `show-me-setting/SKILL.md` | `6baa2c99eb72` |
| `show-me/SKILL.md` | `ecac09219b0d` |
| `show-me/assets/base.css` | `7cbb9da54425` |
| `show-me/assets/snippets/n1-answer-card.html` | `173e8603fbf8` |
| `show-me/assets/snippets/n4-copy-as-prompt.html` | `2a2289088688` |
| `show-me/assets/snippets/n5-back-link-badge.html` | `4f19a97faf86` |

폴더 구조 = source 와 동일. 카테고리 폴더 없이 flat (`skills/<name>/SKILL.md` + `assets/`). `skills-cli-distribution.md` §3 의 권장 구조와 일치.

## 2. README 섹션별 검증

| 섹션 | 결과 | 비고 |
|---|---|---|
| Frontmatter / 헤딩 | OK | H1 1개 + H2 7개 + H3 2개. 깔끔. |
| Pitch (L3~5) | OK | "query → curated HTML view" + "MD source of truth" 2줄 즉시 이해. |
| Quickstart | OK | 4 step, 30초 안에 install + 첫 호출 가능. |
| Why It Exists #1 (안 읽음) | OK | Thariq 0%/95% 인용 + Karpathy 언급. |
| Why It Exists #2 (dirty repo) | OK | 50개 MD → "어떤 5개?" 시나리오 명확. |
| Differentiation table | OK | 4행 (Input/Works when/HTML gen/Addition). Thariq=파일, 우리=쿼리 정확. |
| How It Works | **불일치** | 본문 "Six milestones" 라고 적었지만 실제는 M1~M5 5개. (오타로 보임) |
| Constraints | OK | 5개 모두 PRD §Constraints 와 자구 단위로 일치. |
| Skills 표 | OK | 2개 + 설명. SKILL.md 상대링크 정확. |
| Architecture 링크 | OK | 8개 모두 실파일 존재 확인 (PRD + M1~M5 + 3개 research). |
| 한국어 섹션 | OK | 약 12% 분량. 두 핵심 아이디어 압축 양호. |
| License | OK | TBD (Apache 2.0 vs MIT) 명시. |
| 톤 | OK | "Five non-negotiables", "doesn't break your repo" 등 pragmatic. 마케팅 톤 없음. |

## 3. PRD 정합성

| PRD 4차 결정 | README 반영 | 결과 |
|---|---|---|
| baseline 3 (N1/N+5/N+4) | "Five non-negotiables" 와 별개로 baseline 수치는 README 에 안 적힘 | 누락 아님 (Constraints 와 별 개념) |
| mtime + size (hash X) | "diffs the new file mtimes/sizes" (L70) | OK |
| M0 → M1 흡수 | M1~M5 5개만 | OK |
| `[Save]` = block append | "appends to `.agent-output/show-me/_review/<slug>.md`" (L68) | OK |
| slug + `_history/<ts>/` | "History is preserved in `_history/<ISO-timestamp>/`" (L72) | OK |
| CDN per-library confirm | "opt-in via a per-library confirm prompt" (L82) | OK |
| 13 decisions | "13 decisions, 5 constraints" (L95) | OK |
| skill 2개만 | `/show-me` + `/show-me-setting` 표 | OK |

PRD 4차 결정 8개 항목 전부 일치. 1개 issue (`Six milestones` 오타) 외 정합성 문제 없음.

## 4. 외부 링크

| URL | 결과 |
|---|---|
| `github.com/ThariqS/html-effectiveness` | live, Apache 2.0 (`gh repo view` 확인) |
| `github.com/vercel-labs/skills` | live, "The open agent skills tool - npx skills" |

내부 상대링크 8개 (PRD + M1~M5 + research 3개) 모두 실파일 존재.

## 5. 다른 파일 변경 여부

`git status` — `master` branch, no commits yet. Untracked: `.claude/`, `CONTEXT.md`, `README.md`, `docs/`, `handoff.md`, `prototype/`, `prototype-b2/`, `skills/`.

수정/삭제 0건. PRD/milestone/archive/prototype-b2 등 다른 파일 일절 안 건드림.

## 6. 종합 평가 + 권장안

**전체 PASS**, issue 1건 (low severity).

**Issue #1 (low)** — README L64 "Six milestones, mostly transparent to you:" → 실제 list 는 5개 (M1~M5).
- **권장**: `Six` → `Five` 로 1단어 수정.
- 위치: `README.md:64`.

**사용자 결정 사항**:
- License TBD — Apache 2.0 (upstream 매치) vs MIT 중 택1.
- 외 결정 필요 항목 없음.
