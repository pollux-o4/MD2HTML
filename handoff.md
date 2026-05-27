# Handoff

Updated: 2026-05-19

## Current Goal

Design an `md-show-me` Codex skill.

The skill should let a user say something like `/show-me 설계랑 리뷰 보여줘`, then collect relevant Markdown files from the current project and render them into a static HTML review report. The HTML is only a review surface. Persistent Markdown remains the source of truth.

## Important Files

- `docs/md-html-agent-workflow-strategy.md`: original MD/HTML workflow strategy.
- `docs/md-html-agent-workflow-strategy.review.md`: review from the `E:\comfyui` cross-project perspective.
- `docs/md-html-agent-workflow-strategy.review.discord-chatbot.md`: review from the `discord_chatbot` cross-project perspective.
- `docs/md-html-agent-workflow-strategy.review-report.html`: integrated HTML review report from those reviews.
- `docs/md-show-me-skill-strategy.md`: new follow-up design note for the actual `md-show-me` skill. This is the next review target.

## Decisions So Far

- Markdown is the source of truth.
- HTML is a derived artifact for human review.
- Users should not directly edit generated HTML body content.
- Reviews should flow back to the source Markdown through a review patch, `.review.md`, or GitHub PR review thread.
- `/show-me` is treated as a skill trigger phrase, not necessarily a real app-level slash command.
- `SKILL.md` alone is not enough for this skill. The skill should bundle scripts, templates, styles, and small client-side JS.
- MVP should be limited to: Markdown discovery, source selection, manifest generation, static HTML rendering, review patch generation, and refresh.

## Recommended Skill Shape

```text
md-show-me/
  SKILL.md
  scripts/
    discover-md.js
    parse-md.js
    build-show-manifest.js
    render-html.js
    apply-review.js
  assets/
    templates/
      show-me.html
    styles/
      show-me.css
    client/
      review-patch.js
  references/
    conventions.md
```

`SKILL.md` should stay short and procedural. Deterministic work should live in bundled scripts and reusable templates.

## Intended Workflow

```text
user request
-> discover candidate Markdown files
-> parse frontmatter/headings/block ids
-> select relevant files and blocks
-> write dist/show-me/<slug>/manifest.json
-> render dist/show-me/<slug>/report.html
-> allow review patch generation from HTML
-> refresh from manifest when Markdown changes
```

Recommended output:

```text
dist/show-me/<slug>/
  manifest.json
  report.html
  reviews.review.md
```

`reviews.review.md` is optional and mainly for local/non-PR workflows.

## Open Questions

- Where should the skill be created: `$CODEX_HOME/skills/md-show-me`, this repo, or another skill workspace?
- Should output always go to `dist/show-me/<slug>/`, or follow each project's existing `build/` or `dist/` convention?
- Should Markdown selection start as rule-based metadata matching, LLM ranking, or a hybrid?
- Should `apply-review.js` in MVP only output a context package, or should it patch source Markdown directly?
- Is PR review thread -> local `.review.md` the right review source priority?
- Should refresh reuse the original manifest source list, or rerun selection from the original query each time?

## Next Recommended Step

Ask another agent to review `docs/md-show-me-skill-strategy.md`.

Focus the review on:

- whether bundled scripts/templates are mandatory or optional,
- whether `/show-me` as a trigger phrase is enough,
- whether source of truth and derived artifact boundaries are clear,
- whether the refresh flow handles changed or missing Markdown correctly,
- whether review patches prevent stale target mistakes with `anchor_quote`,
- whether the MVP is still too large.

## Do Not Lose

This is not a generic Markdown-to-HTML converter.

The important workflow is:

```text
accumulated project Markdown
-> user-intent-based selection
-> static HTML review view
-> review patch
-> targeted Markdown follow-up
```

The skill succeeds only if it helps users quickly inspect the Markdown they care about and keeps review feedback traceable back to the original source files.
