# md-show-me

A Claude Code skill that turns `/show-me <query>` into a curated, interactive HTML view of the Markdown already in your repo.

Markdown stays the source of truth. HTML is the consumption layer.

## Quickstart (30-second setup)

1. Install via the [`skills` CLI](https://github.com/vercel-labs/skills):

   ```bash
   npx skills@latest add pollux-o4/MD2HTML
   ```

2. When prompted, pick `show-me` and `show-me-setting`.

3. Run `/show-me-setting` once in your project. It asks one question — where to put the output archive — and that's it.

4. Run `/show-me <anything>`. Done.

   ```
   /show-me how we ended up with the current auth flow
   /show-me ADR 1~5 가 코드에 끼친 영향
   /show-me handoff 정리해줘
   ```

The result lands in `.agent-output/show-me/reports/<slug>/index.html`. Double-click to open — no server, no build step.

## Why It Exists

Two failure modes break the loop between humans and AI-written docs. They reinforce each other.

### #1: People Don't Read AI Output

> "Same content, two formats: Markdown gets ~0% read-through, HTML gets ~95%."
>
> Thariq Shihipar, [HTML Effectiveness](https://github.com/ThariqS/html-effectiveness)

When an agent dumps a 600-line Markdown report into chat, almost nobody reads it. When the same agent produces an interactive HTML page, almost everyone does. Karpathy makes a related point: the natural next step for AI output is HTML, then interactive video.

**The fix**: generate query-shaped HTML, not generic Markdown. Each `/show-me` call produces a fresh layout chosen to match the question — a timeline for "how did we get here", a comparison table for "what's the difference", a graph for "what's connected to what".

### #2: In Big Repos, Nobody Knows Which `.md` Is Relevant

You have 50 Markdown files: ADRs, handoffs, scratch notes, reviews, references. You ask one question. Which 5 files actually matter?

Thariq's recipe ("here are the files, make me HTML") only works if you already know the files. In a dirty real-world repo, you don't.

**The fix**: a discovery agent runs in a sub-agent context (to protect the parent's tokens), uses Glob/Grep + head-previews to pick candidates, and writes a manifest. The HTML view cites every claim back to a source `.md` with deep links.

## How `/show-me` Differs From "Just Ask Claude For HTML"

|                          | Thariq's recipe              | `/show-me`                                       |
| ------------------------ | ---------------------------- | ------------------------------------------------ |
| Input                    | Explicit file list           | One-line query                                   |
| Works when               | You already know the files   | You don't (dirty repo with 50+ `.md`)            |
| HTML generation          | One-shot from LLM            | Same — borrowed from Thariq                      |
| Our addition             | —                            | Discovery + manifest + stale detection + review loop |

The skill exists precisely at the spot where Thariq's "no skill needed" recipe stops working.

## How It Works

Five milestones, mostly transparent to you:

1. **M1 — Discovery.** Sub-agent scans the repo, applies sensible excludes (`node_modules`, `dist`, `.agent-output`, anything flagged `AUTO-GENERATED`), extracts head-previews of candidate `.md`, picks the few worth a full read, and writes a manifest.
2. **M2 — Interactive HTML.** LLM picks a pattern that matches the query shape (timeline, table, graph, gallery, diff, …) and generates a single self-contained `index.html`. CSS is inlined from `assets/base.css`.
3. **M3 — Copy-as-prompt UX.** Every interactive element gets a `[Copy]` / `[Save]` overlay. `[Save]` uses an agent-mediated pattern: clipboard → paste into Claude → the skill spots a `SAVE_TO_REVIEW` marker and appends to `.agent-output/show-me/_review/<slug>.md`.
4. **M4 — Apply review.** Review comments are addressed against `anchor_status` (found / weak / ambiguous / missing) so the agent knows when an anchor has drifted.
5. **M5 — Lazy stale check.** Next time you run `/show-me` with the same query, it diffs the new file mtimes/sizes against the last manifest and shows a quiet banner if anything moved.

History is preserved in `_history/<ISO-timestamp>/`. The skill never auto-prunes.

## Constraints

Five non-negotiables, taken from the [PRD](./docs/md-show-me-prd.md):

1. **Cheap tokens.** No "dump the whole repo into context" moves. Discovery uses head-previews and an agent loop.
2. **Works in any project.** No assumptions about build systems or directory layouts. If there are `.md` files, the skill works.
3. **Extensible without core changes.** Adding a new HTML pattern is just adding a snippet to `assets/snippets/`.
4. **Doesn't break your repo.** Never auto-edits Markdown. Never force-commits. Atomic writes only (temp → rename).
5. **Zero install / zero network by default.** No auto-installed packages. No auto-downloaded models. CDN libraries (Tailwind, Vega-Lite, ECharts, Mermaid, …) are opt-in via a per-library confirm prompt; once you say yes, the choice is remembered in `.show-me.toml`.

## Skills In This Repo

| Skill                       | What it does                                                    |
| --------------------------- | --------------------------------------------------------------- |
| [`/show-me <query>`](./skills/show-me/SKILL.md)             | Discovery + interactive HTML curation. Stale detection runs on every call. |
| [`/show-me-setting`](./skills/show-me-setting/SKILL.md)     | One-time setup. Asks one question (archive path). That's it.    |

## Architecture & Decisions

The PRD, milestones, and research notes that drove the design live under `docs/`:

- **[PRD](./docs/md-show-me-prd.md)** — 13 decisions, 5 constraints, baseline + selector rubric. 4th revision (skill-minimal).
- **Milestones** — [M1 discovery](./docs/md-show-me-milestone-1-discovery.md), [M2 HTML](./docs/md-show-me-milestone-2-static-html-report.md), [M3 review context](./docs/md-show-me-milestone-3-natural-language-review-context.md), [M4 apply review](./docs/md-show-me-milestone-4-apply-review.md), [M5 refresh](./docs/md-show-me-milestone-5-refresh-rescan.md).
- **Research** — [HTML effectiveness license analysis](./docs/research/thariq-html-effectiveness-license.md), [41-pattern catalog evaluation](./docs/research/persona-evaluation-nadia-park.md), [skills CLI distribution](./docs/research/skills-cli-distribution.md).

## Attribution

The HTML-output direction borrows directly from Thariq Shihipar's [`html-effectiveness`](https://github.com/ThariqS/html-effectiveness) (Apache 2.0, © 2026 Anthropic PBC). We re-implemented the patterns from scratch rather than vendoring code; the conceptual debt is the important part.

## License

MIT — see [LICENSE](./LICENSE).

---

## 한국 사용자 (Korean users)

`/show-me <쿼리>` 한 줄로, repo 의 Markdown 중 *지금 질문에 답이 되는 것들만* 골라서 인터랙티브 HTML 페이지로 보여주는 Claude Code skill 이다.

핵심 아이디어 두 개:

- **Markdown 은 source of truth, HTML 은 소비 레이어.** 사람은 MD 안 읽고 HTML 은 읽는다 (Thariq 실측 0% vs 95%). 그래서 *원본은 MD 로 두고, 매 호출마다 질의 형태에 맞는 HTML 을 새로 만든다*.
- **Discovery 자동화.** 50개 `.md` 중 어떤 5개가 관련 있는지 사용자가 모르는 dirty repo 에서도 동작한다. sub-agent 가 Glob/Grep + head-preview 로 큐레이션.

한국어 쿼리 그대로 지원하고, 기본 CSS (`assets/base.css`) 에 `Noto Sans KR` / `Apple SD Gothic Neo` 폰트 스택이 들어 있어 한글 출력이 깨지지 않는다.

자세한 설계 근거는 한국어로 작성된 [PRD](./docs/md-show-me-prd.md) 와 milestone 문서들 참고.
