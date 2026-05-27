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
