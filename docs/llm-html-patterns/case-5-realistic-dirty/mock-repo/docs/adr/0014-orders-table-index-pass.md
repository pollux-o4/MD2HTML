# ADR 0014: Index pass on the orders table

Status: Accepted

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
