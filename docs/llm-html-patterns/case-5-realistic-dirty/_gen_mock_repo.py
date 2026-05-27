"""Generate a dirty mock repo of ~150 .md files for Case 5."""
import os
import textwrap
from pathlib import Path

ROOT = Path(__file__).parent / "mock-repo"

FILES = {}

# ============== Top-level ==============
FILES["README.md"] = """\
# Phoenix Platform

Internal platform for order ingestion and fulfillment.

## Layout
- `services/` — runtime services (not in this docs repo)
- `docs/` — design notes, ADRs, references
- `scratch/` — junk drawer, do not rely on
- `archive/` — old stuff kept for history

Owner: platform-core team. Ping #phoenix-platform on Slack.
"""

FILES["CLAUDE.md"] = """\
# CLAUDE.md

Notes for AI agents working in this repo.

- ADRs live in `docs/adr/`. Numbered, immutable once accepted.
- Anything in `scratch/`, `experiments/`, or `archive/` is **not** authoritative.
- When summarizing decisions, prefer accepted ADRs over notes.
- Performance work has been a recurring theme — see ADRs 0008, 0011, 0014.
"""

FILES["CONTEXT.md"] = """\
# Project context

Phoenix handles ~2M orders/day. P99 latency on the hot path matters more than
throughput. Storage is Postgres + Redis. Background work via SQS + workers.

Domain glossary:
- **Order** — a customer purchase. Has line items.
- **Fulfillment** — the process of getting an order to the customer.
- **Hot path** — order placement -> ack. SLA 200ms P99.
"""

FILES["CHANGELOG.md"] = """\
# Changelog

Loose, manually maintained. See git log for authoritative history.

- 2025-Q1: caching layer rolled out (ADR 0008)
- 2025-Q2: lazy evaluation on cart pricing (ADR 0011)
- 2025-Q3: db index pass on orders table (ADR 0014)
- 2025-Q4: minor refactors, see PRs
"""

# ============== docs/ ==============
FILES["docs/overview.md"] = """\
# Docs overview

- `adr/` — Architecture Decision Records, the source of truth for design decisions.
- `references/` — external links, vendor docs, RFC excerpts.
- `meta/` — process notes (how we write ADRs, etc.).
- `handoff/` — agent handoff documents.
"""

FILES["docs/glossary.md"] = """\
# Glossary

- SLA: service-level agreement
- P99: 99th percentile latency
- TTL: time-to-live (cache)
- WAL: write-ahead log
"""

FILES["docs/onboarding.md"] = """\
# Onboarding

1. Get prod access via the access portal.
2. Clone `phoenix-core` and `phoenix-workers`.
3. Read CONTEXT.md, then skim ADRs 0001-0014.
4. Pair with a buddy on your first PR.
"""

# ============== docs/adr/ ==============
ADRS = [
    ("0001-record-architecture-decisions.md", "Record architecture decisions", "Accepted", """\
We will use Architecture Decision Records (ADRs) to capture significant
architectural decisions. Format: short markdown files, numbered, immutable.

Inspired by Michael Nygard's original post. Each ADR has Context, Decision,
Consequences sections.

Decision: adopt ADRs starting now.
Consequences: every architecturally-significant change should produce one.
"""),
    ("0002-postgres-primary-store.md", "Use Postgres as primary store", "Accepted", """\
We need a primary OLTP store. Considered Postgres, MySQL, CockroachDB.

Decision: Postgres 15. Operational maturity in our team, JSONB support,
good extension ecosystem (pg_stat_statements, pg_partman).

Consequences: vertical scaling for now, horizontal sharding deferred to a
future ADR if/when needed.
"""),
    ("0003-redis-for-session-state.md", "Redis for session state", "Accepted", """\
Session state needs sub-ms reads. Postgres is too heavy.

Decision: Redis cluster (ElastiCache). TTL-based eviction. No persistence —
sessions can be recreated from JWT if lost.

Consequences: another piece of infra to operate. Acceptable given the latency
win.
"""),
    ("0004-sqs-for-background-work.md", "SQS for background work", "Accepted", """\
Considered SQS, Kafka, RabbitMQ. Background jobs are mostly fire-and-forget
with retry; we don't need Kafka's ordering or replay.

Decision: SQS standard queues, with DLQs.

Consequences: at-least-once semantics; workers must be idempotent.
"""),
    ("0005-json-logging.md", "JSON structured logging", "Accepted", """\
Plaintext logs are hard to query in Athena/CloudWatch.

Decision: all services emit JSON logs with a shared schema (service, env,
trace_id, level, msg, extra).

Consequences: minor CPU overhead, big win for observability.
"""),
    ("0006-feature-flags-launchdarkly.md", "LaunchDarkly for feature flags", "Accepted", """\
We need controlled rollouts. Built-in flag systems considered, but ops cost
high.

Decision: LaunchDarkly. Cost is justified by velocity.

Consequences: vendor dependency. Mitigated by a thin wrapper interface.
"""),
    ("0007-graphql-internal-gateway.md", "GraphQL for the internal gateway", "Proposed", """\
The mobile team wants GraphQL. Web is happy with REST.

Decision (proposed): expose a GraphQL gateway internally, keep REST for
external partners.

Status: proposed. Not yet accepted — concerns about N+1 and operational
complexity.
"""),
    ("0008-caching-strategy.md", "Caching strategy for the hot path", "Accepted", """\
## Context

The order placement hot path was breaching its 200ms P99 SLA. Profiling
showed 60% of time spent in repeated catalog and pricing lookups for the
same SKUs within a single request batch, plus across consecutive requests
from the same user.

## Decision

Adopt a two-tier caching strategy:

1. **Request-scoped memoization** for catalog/pricing lookups within a
   single request, keyed by SKU.
2. **Redis-backed shared cache** with a 30-second TTL for catalog metadata
   and a 5-second TTL for prices. Use cache-aside; writes invalidate.

Negative caching (60s) for known-missing SKUs to avoid hammering the
catalog service during incidents.

## Consequences

- Estimated 40% reduction in P99. Validated in load test (see perf-test
  notes from 2025-02).
- New failure mode: stale prices for up to 5s. Product accepted.
- Operational: a Redis outage now degrades the hot path. Mitigated by a
  short circuit breaker that falls back to direct lookups.

## Alternatives considered

- CDN-level caching: rejected, can't key by user.
- Longer TTL: rejected, pricing freshness.
- In-process cache only: rejected, doesn't help cross-request.

Status: **Accepted**, rolled out 2025-Q1.
"""),
    ("0009-tracing-otel.md", "Adopt OpenTelemetry for tracing", "Accepted", """\
Multiple ad-hoc tracing libraries in use. Standardize.

Decision: OpenTelemetry SDKs, OTLP export to our backend.

Consequences: migration effort. Worth it for vendor flexibility.
"""),
    ("0010-secret-management-vault.md", "Vault for secret management", "Accepted", """\
Decision: HashiCorp Vault. AppRole auth for services.

Consequences: HA Vault cluster to operate.
"""),
    ("0011-lazy-evaluation-cart-pricing.md", "Lazy evaluation on cart pricing", "Accepted", """\
## Context

Cart pricing was eagerly computing all promotional rules on every cart
mutation. With 20+ active promotions and carts averaging 5 items, this was
~150ms of CPU per mutation. Most mutations don't display the final price
immediately — the UI shows item subtotals and only fetches the full cart
on checkout view.

## Decision

Switch cart pricing to lazy evaluation:

- Cart mutations only invalidate a `pricing_dirty` flag.
- Full pricing is computed on-demand: on `GET /cart/summary`, or when the
  client explicitly requests it.
- Per-line subtotals (cheap) remain eager.

Memoize the computed price for the current cart version so repeated reads
in a session don't recompute.

## Consequences

- Cart mutation latency dropped from ~180ms to ~30ms P99.
- Checkout view latency essentially unchanged (the cost moved, didn't
  vanish).
- New invariant: never trust a `total` field on a cart unless the response
  is from a `/summary` endpoint. Documented in the API spec.

## Alternatives considered

- Cache full pricing keyed by cart hash: rejected, cache hit rate would be
  near zero (carts mutate constantly).
- Compute pricing async after mutation: rejected, race conditions on
  checkout.

Status: **Accepted**, rolled out 2025-Q2.
"""),
    ("0012-blue-green-deploys.md", "Blue/green deploys for the API tier", "Accepted", """\
Rolling deploys caused occasional connection blips. Move to blue/green.

Decision: blue/green at the ALB layer. Old fleet drained for 5 minutes.

Consequences: 2x compute during deploy window. Cost acceptable.
"""),
    ("0013-rate-limiting-token-bucket.md", "Token-bucket rate limiting", "Accepted", """\
Decision: token-bucket per-API-key, enforced at the gateway.

Consequences: customers may see 429s during bursts. Documented in API docs.
"""),
    ("0014-orders-table-index-pass.md", "Index pass on the orders table", "Accepted", """\
## Context

The orders table is the most-queried table in the system (~80% of read
traffic on the primary DB). EXPLAIN ANALYZE on the slow query log showed
several recurring patterns doing seq scans on a 200M-row table:

1. Lookup by `(customer_id, created_at DESC)` — customer order history.
2. Lookup by `(status, updated_at)` — worker poll for stuck orders.
3. Lookup by `external_ref` for partner reconciliation.

## Decision

Add three indexes:

- `idx_orders_customer_created` on `(customer_id, created_at DESC)`,
  partial: `WHERE deleted_at IS NULL`.
- `idx_orders_status_updated` on `(status, updated_at)` partial:
  `WHERE status IN ('pending', 'processing')`.
- `idx_orders_external_ref` on `(external_ref)` — full, used by ops.

Build all indexes `CONCURRENTLY` during low-traffic window.

## Consequences

- Customer-history query: 800ms -> 12ms P99.
- Worker poll: 2.5s -> 40ms P99. Removed the secondary "stuck order"
  dashboard alert because it stopped firing.
- Write amplification: ~8% slower inserts on `orders`. Acceptable.
- Disk: ~12GB additional. Acceptable.

## Alternatives considered

- Materialized view for customer history: rejected, freshness requirements.
- Splitting `status` column into a separate table: rejected, too invasive
  for the gain.

Status: **Accepted**, rolled out 2025-Q3.
"""),
    ("0015-deprecate-legacy-cart-v1.md", "Deprecate legacy cart-v1 endpoints", "Accepted", """\
cart-v1 was replaced by cart-v2 in 2024. Long deprecation window.

Decision: remove cart-v1 endpoints in 2026-Q1.

Consequences: partners need to migrate. Comms plan tracked separately.
"""),
]

for fname, title, status, body in ADRS:
    num = fname.split("-")[0]
    FILES[f"docs/adr/{fname}"] = f"# ADR {num}: {title}\n\nStatus: {status}\n\n{body}"

# ============== docs/references/ ==============
FILES["docs/references/postgres-tuning.md"] = """\
# Postgres tuning notes

External resource excerpts. Not authoritative for our config, just notes.

- `shared_buffers` ~25% of RAM
- `work_mem` per-operation, beware multipliers
- `effective_cache_size` ~50-75% of RAM

See AWS RDS docs for our actual config.
"""

FILES["docs/references/redis-best-practices.md"] = """\
# Redis best practices (notes from a conference talk)

- Pipeline aggressively
- Avoid KEYS in prod
- Watch for big keys
"""

FILES["docs/references/oauth2-rfc6749-excerpt.md"] = """\
# OAuth2 (RFC 6749) — excerpt

Local copy of the bits we reference most. Authoritative source: ietf.org.
"""

FILES["docs/references/grpc-vs-rest.md"] = """\
# gRPC vs REST notes

Notes from an internal tech talk, 2024. Not a decision — see ADRs for that.
"""

FILES["docs/references/postgres-explain.md"] = """\
# EXPLAIN cheat sheet

`EXPLAIN (ANALYZE, BUFFERS)` is your friend. Look for Seq Scan on large
tables. See ADR 0014 for a real index pass we did.
"""

# ============== docs/meta/ ==============
FILES["docs/meta/how-we-write-adrs.md"] = """\
# How we write ADRs

- Number sequentially.
- Status: Proposed | Accepted | Superseded.
- Sections: Context, Decision, Consequences, Alternatives.
- Immutable once Accepted. Supersede with a new ADR.
"""

FILES["docs/meta/review-process.md"] = """\
# Review process

PRs touching architecture should reference an ADR (existing or new).
Two senior engineer approvals required for new ADRs.
"""

FILES["docs/meta/release-cadence.md"] = """\
# Release cadence

Weekly to staging, biweekly to prod, modulo freezes.
"""

# ============== docs/handoff/ ==============
FILES["docs/handoff/2025-02-perf-investigation.md"] = """\
# Handoff: perf investigation (2025-02)

Wrapping up the hot-path perf investigation. Findings led to the caching
ADR (0008).

## What I did
- Profiled order placement under realistic load.
- Identified catalog + pricing as the hot spots.
- Drafted caching ADR, sent to review.

## What's next
- Roll out caching to staging week of Feb 17.
- Add Redis dashboards (see ops backlog).
- Revisit lazy eval for cart pricing — separate work, separate ADR likely.

— Maya
"""

FILES["docs/handoff/2025-05-cart-pricing.md"] = """\
# Handoff: cart pricing lazy eval (2025-05)

Lazy eval ADR (0011) is accepted and rolled out. Numbers in the ADR.

## Loose ends
- API spec update: in flight, PR #3421.
- Need to remove a few stale tests that assumed eager pricing.
- Watch for client teams that read `cart.total` outside of /summary —
  flagged android team, web team is fine.

— Joon
"""

FILES["docs/handoff/2025-08-orders-index.md"] = """\
# Handoff: orders index pass (2025-08)

Index pass landed (ADR 0014). Big wins, see ADR for numbers.

## Followups
- Consider similar pass on `order_items` next quarter.
- DBA wants to review the partial-index predicates in 3 months — calendar
  reminder set.

— Priya
"""

FILES["docs/handoff/2024-12-graphql-spike.md"] = """\
# Handoff: graphql spike (2024-12)

Spike done. Mixed results. Wrote ADR 0007 as a proposal, didn't push for
acceptance — too many open questions on N+1.

Next person: decide whether to pursue or shelve.

— Diego
"""

FILES["docs/handoff/2025-09-misc.md"] = """\
# Handoff: misc cleanups (2025-09)

Random small things, none architecturally significant:
- Bumped a few deps.
- Fixed a flaky test in workers.
- Updated onboarding doc with new VPN flow.

— Sam
"""

# ============== scratch/ — junk drawer, some perf-related ==============
FILES["scratch/README.md"] = """\
# scratch/

Junk drawer. Not authoritative. Do not link from production code or ADRs.
"""

FILES["scratch/perf-notes.md"] = """\
# perf notes (random)

Stuff I noticed while profiling, may or may not turn into ADRs.

- Catalog lookup is hot. Caching should help (-> later: ADR 0008).
- The pricing engine recomputes on every cart mutation. Wasteful.
  Lazy eval candidate (-> later: ADR 0011).
- Orders table doing seq scans on customer_id queries. Need an index.
  (-> later: ADR 0014).
- Worker poll for stuck orders is also slow, probably same index fix.
- Random: the JSON serializer we use is slow on big payloads, but not on
  the hot path so leaving it.
"""

FILES["scratch/perf-ideas-brain-dump.md"] = """\
# Perf ideas brain dump (Feb 2025)

Throwing ideas at the wall:
- Cache warm-up on deploy?
- Connection pool tuning, current numbers feel arbitrary
- Async logging? Probably premature
- Move pricing to a separate service? Big lift, parking
- Pre-compute customer cohorts for marketing queries — not hot path though
"""

FILES["scratch/redis-experiment.md"] = """\
# Redis experiment

Tried local-cache + redis-cache pattern. Numbers were OK but not amazing.
Filed for later. Eventually became ADR 0008.
"""

FILES["scratch/cart-pricing-musings.md"] = """\
# Cart pricing musings

If we evaluate lazily we sidestep the recompute cost. Need to think about
invariants. -> followed up in ADR 0011.
"""

FILES["scratch/postgres-slow-log.md"] = """\
# Slow log highlights

Pasted some pg_stat_statements output:

```
calls=12834  mean_exec=812ms  query="SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC ..."
calls=8910   mean_exec=2510ms query="SELECT * FROM orders WHERE status IN ('pending','processing') ..."
```

Fed into ADR 0014.
"""

FILES["scratch/random-todo.md"] = """\
# todo

- update slack channel topic
- ask infra about the new bastion
- buy snacks for offsite
"""

FILES["scratch/meeting-2025-03-11.md"] = """\
# Meeting 2025-03-11

Talked about Q2 OKRs. Not much to record.
"""

FILES["scratch/snippet-curl.md"] = """\
# curl snippet

`curl -H 'authorization: bearer $TOKEN' https://api.local/orders/123`
"""

FILES["scratch/snippet-jq.md"] = """\
# jq snippet

`jq '.orders[] | select(.total > 100)'`
"""

FILES["scratch/wip-refactor-plan.md"] = """\
# Refactor plan (WIP, DO NOT REVIEW YET)

Going to clean up the order state machine. Notes in private doc, this is
just a placeholder.
"""

# A bunch of short scratch notes
for i in range(1, 21):
    FILES[f"scratch/note-{i:03d}.md"] = f"""\
# note {i}

Random short note. {"Mentions caching in passing." if i in (3, 7, 14) else ""}
{"Wondered about an index here." if i == 11 else ""}
"""

# ============== experiments/ ==============
FILES["experiments/2024/README.md"] = """\
# experiments/2024

Old experiments. Mostly abandoned. Kept for posterity.
"""

FILES["experiments/2024/graphql-poc.md"] = """\
# GraphQL POC (2024)

Built a tiny gateway. Performance was meh. Notes only.
"""

FILES["experiments/2024/wasm-edge-pricing.md"] = """\
# WASM edge pricing experiment

Tried running pricing rules at the edge in WASM. Cold start was painful.
Abandoned.
"""

FILES["experiments/2024/eventsourcing-spike.md"] = """\
# Event sourcing spike

Modeled orders as event-sourced. Cool but big rewrite. Filed away.
"""

FILES["experiments/2025/README.md"] = """\
# experiments/2025
"""

FILES["experiments/2025/rust-rewrite-pricing.md"] = """\
# Rust rewrite of the pricing engine (spike)

Got 3x perf on a microbenchmark but real-world gain unclear. Team decided
to do lazy eval (ADR 0011) instead — cheaper.
"""

FILES["experiments/2025/bloom-filter-dedup.md"] = """\
# Bloom filter dedup experiment

For idempotency keys. Worked OK. Not pursued — current SQL approach is
fine.
"""

FILES["experiments/2025/cache-warmup-on-deploy.md"] = """\
# Cache warm-up on deploy

Tried warming the catalog cache on deploy. Modest improvement. Filed.
Mentioned in scratch/perf-ideas-brain-dump.md.
"""

# ============== archive/ ==============
FILES["archive/README.md"] = """\
# archive/

Old design docs. Superseded or obsolete. Kept for history.
"""

FILES["archive/legacy-2023/cart-v1-design.md"] = """\
# Cart v1 design (2023)

Superseded by cart-v2 (no ADR — predates ADR adoption).
"""

FILES["archive/legacy-2023/monolith-decomp-plan.md"] = """\
# Monolith decomposition plan (2023)

Old plan, mostly executed by end of 2024.
"""

FILES["archive/legacy-2023/old-caching-thoughts.md"] = """\
# Old caching thoughts (2023)

DEPRECATED. Predates ADR 0008. Don't follow this; ADR 0008 is the truth.
"""

FILES["archive/legacy-2023/perf-2023-q4-postmortem.md"] = """\
# Perf postmortem 2023-Q4

DEPRECATED. We had a P99 incident, root caused to a single bad query.
Pre-dates the systematic perf work in 2025.
"""

FILES["archive/old-design/order-state-machine-v1.md"] = """\
# Order state machine v1

DEPRECATED. Replaced by v2 in mid-2024.
"""

FILES["archive/old-design/old-deploy-runbook.md"] = """\
# Old deploy runbook

DEPRECATED. Pre-blue/green (see ADR 0012).
"""

FILES["archive/old-design/auth-v0.md"] = """\
# Auth v0

DEPRECATED. We use OIDC now.
"""

# ============== team-notes/ ==============
FILES["team-notes/README.md"] = """\
# team-notes/

Loose team-internal notes. Not authoritative.
"""

FILES["team-notes/onboarding-buddies.md"] = """\
# Onboarding buddies

- Maya buddies for backend
- Diego buddies for mobile
- Priya buddies for data
"""

FILES["team-notes/oncall-tips.md"] = """\
# Oncall tips

- Check Grafana first
- Caching dashboard is the new go-to (since 2025-Q1)
- Don't bounce Redis without warning Slack
"""

FILES["team-notes/team-values.md"] = """\
# Team values

Be kind. Write things down. Bias toward small PRs.
"""

FILES["team-notes/lunch-orders.md"] = """\
# Lunch orders

Wednesdays: poke. Fridays: tacos.
"""

FILES["team-notes/book-club.md"] = """\
# Book club

Currently reading: Designing Data-Intensive Applications.
"""

# ============== weekly/ — meeting notes, mostly noise ==============
WEEKLY_TOPICS = [
    "sprint planning",
    "retro",
    "demo day",
    "OKR review",
    "incident review",
    "hiring sync",
    "platform sync",
    "roadmap chat",
    "tech debt review",
    "perf review",  # one of these mentions perf for real
]

for i in range(1, 16):
    topic = WEEKLY_TOPICS[i % len(WEEKLY_TOPICS)]
    extra = ""
    if topic == "perf review" and i == 9:
        extra = "\n\nDiscussed the caching rollout (ADR 0008). Numbers look good.\n"
    if topic == "incident review" and i == 4:
        extra = "\n\nP99 spike on the hot path. Believed to be cache-warmup related. Adding alert.\n"
    FILES[f"weekly/2025-w{i:02d}.md"] = f"""\
# Weekly 2025-w{i:02d}

Topic: {topic}.

Attendees: the usual.

Notes: short.
{extra}"""

# ============== notes/ — idea files, mostly noise ==============
IDEAS = [
    "auto-tag PRs by area",
    "weekly perf email digest",
    "shared snippet library",
    "post-incident template",
    "ADR linter",
    "deploy bot in slack",
    "flaky test bot",
    "internal status page",
    "cost dashboard",
    "API changelog generator",
    "release notes from commits",
    "PR description template",
    "code coverage badge",
    "build cache experiment",
    "monorepo trial",
    "lockfile auditor",
    "doc search bot",
    "oncall handoff template",
    "team radar",
    "blameless postmortems",
]

for i, idea in enumerate(IDEAS, start=1):
    FILES[f"notes/idea-{i:03d}.md"] = f"""\
# Idea {i:03d}: {idea}

Quick thought. {"Could help us catch perf regressions." if "perf" in idea else ""}
{"Probably needs an ADR if we pursue." if i % 7 == 0 else ""}
"""

# ============== auto-generated noise ==============
for i in range(1, 6):
    FILES[f"docs/generated/api-ref-{i}.md"] = f"""\
<!-- AUTO-GENERATED -->
# API reference (auto-generated, part {i})

Do not edit. Regenerated by `tools/gen_api_docs.py`.

## Endpoints
- GET /v2/orders/{{id}}
- POST /v2/orders
- ...
"""

# ============== drafts ==============
for i in range(1, 11):
    FILES[f"drafts/draft-{i:03d}.md"] = f"""\
# Draft {i:03d}

WIP. Don't review. Author: someone.

{"Probably about caching." if i == 4 else ""}
{"Thinking about the order pipeline." if i == 7 else ""}
"""

# Write everything
ROOT.mkdir(parents=True, exist_ok=True)
written = 0
for relpath, content in FILES.items():
    path = ROOT / relpath
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    written += 1

print(f"Wrote {written} files under {ROOT}")
