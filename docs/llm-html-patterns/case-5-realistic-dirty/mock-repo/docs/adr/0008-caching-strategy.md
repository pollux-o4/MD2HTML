# ADR 0008: Caching strategy for the hot path

Status: Accepted

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
