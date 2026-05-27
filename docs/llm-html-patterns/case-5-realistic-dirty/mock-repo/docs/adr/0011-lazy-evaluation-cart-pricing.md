# ADR 0011: Lazy evaluation on cart pricing

Status: Accepted

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
