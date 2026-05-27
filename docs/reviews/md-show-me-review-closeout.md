---
id: md-show-me-review-closeout
type: review-closeout
status: closed
updated: 2026-05-20
scope: md-show-me-prd-readiness
---

# md-show-me Review Closeout

## Summary

Active review files still contain historical P0 findings, but the current md-show-me design documents have absorbed the PRD-blocking items. Treat the active reviews as stale input snapshots and this closeout as the handoff record for PRD readiness.

## Closed PRD Blockers

| Review blocker | Resolution |
| --- | --- |
| M0 omitted `docs/references/**` and used `docs/research/**` in examples | M0 and strategy now include `docs/references/*.md` as rule/source candidates and use `docs/references/**` in trusted source examples. |
| M0 `external_sources` could imply automatic external discovery | M0 and strategy now state that external sources are manually configured through `.show-me.toml` or `.show-me.json`; API integration and automatic discovery are out of MVP. |
| M1 manifest envelope conflicted with strategy flat field list | M1, strategy, and CONTEXT now use the same top-level `query`, `created`, `profile_hash`, `sources[]` envelope. |
| M1 multi-signal matching was underspecified | M1 and strategy now define strongest-signal `match_strength`, then tie-break by `matched_fields` count, `updated`, and filename. |
| M2 heading preview used fixed H2/H1 fallback | M2 and strategy now use each document's lowest non-H1 heading level, capped at five headings, with an H1-only state. |
| M2 excerpt cap was too short and unclear | M2 and strategy now cap excerpts at 200 characters on sentence boundaries, with a 200-character fallback. |
| M3 review context required fields differed across docs | M3, strategy, and CONTEXT now require `source_path`, `heading`, `anchor_quote`, `weak_anchor`, `comment`, and `created`. |
| M3 zero-persistence created reload-loss risk | M3, strategy, and CONTEXT now allow same-tab `sessionStorage` draft buffering while keeping copied review context as the only source of truth. |
| M4 ambiguous anchor behavior was undefined | M4 and strategy now require occurrence index for ambiguous anchors; otherwise M4 returns `anchor_ambiguous` and does not auto-select. |
| M4 `surrounding_context` size and shape were undefined | M4 and strategy now define unique, weak/ambiguous, and missing-anchor context branches. |
| M5 refresh/profile freshness conflicted across docs | M5, strategy, and CONTEXT now require refresh and rescan to check M0 profile freshness first. |
| M5 rescan did not warn about stale review context | M5, strategy, and CONTEXT now require manifest diff plus dangling review context warning after rescan. |
| Canonical output path was historically mixed with `dist/show-me/` | Current docs keep `.agent-output/show-me/` canonical; `dist/show-me/` appears only as superseded/deprecated history. |

## PRD Readiness Decision

PRD can proceed from the current strategy and six milestone documents.

Remaining historical review files should not be reinterpreted as active blockers unless a new review round is run against the current documents.

