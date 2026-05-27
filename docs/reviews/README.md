# Review File Guidelines

## Active Review Location

Active review files live directly in this directory:

```text
docs/reviews/
```

Do not place new active review files in `docs/`.

## Naming

Use this format:

```text
<target-document>.<scope>.review.md
```

Examples:

```text
md-show-me-milestone-0-project-profile.discord-chatbot.review.md
md-show-me-milestone-0-project-profile.html-md-comfyui.review.md
md-show-me-skill-strategy.overall.review.md
```

Use one of these scope names unless there is a clear reason to add another:

```text
discord-chatbot
html-md-comfyui
overall
```

## Expected Review Set

For a full md-show-me review pass, provide these files:

```text
md-show-me-milestone-0-project-profile.<scope>.review.md
md-show-me-milestone-1-discovery.<scope>.review.md
md-show-me-milestone-2-static-html-report.<scope>.review.md
md-show-me-milestone-3-natural-language-review-context.<scope>.review.md
md-show-me-milestone-4-apply-review.<scope>.review.md
md-show-me-milestone-5-refresh-rescan.<scope>.review.md
md-show-me-skill-strategy.<scope>.review.md
```

With two scopes, this is 14 active files.

## Required Sections

Each review should include:

```text
verdict
P0
P1
document changes
PRD readiness
```

Keep P0 for blockers that must be fixed before PRD or implementation. Put nice-to-have polish in P2 only if needed.

## Archive

Outdated reviews go under:

```text
docs/reviews/archive/
```

Archived files are kept for history but should not be counted as active review input.
