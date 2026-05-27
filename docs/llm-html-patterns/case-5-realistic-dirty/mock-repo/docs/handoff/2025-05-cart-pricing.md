# Handoff: cart pricing lazy eval (2025-05)

Lazy eval ADR (0011) is accepted and rolled out. Numbers in the ADR.

## Loose ends
- API spec update: in flight, PR #3421.
- Need to remove a few stale tests that assumed eager pricing.
- Watch for client teams that read `cart.total` outside of /summary —
  flagged android team, web team is fine.

— Joon
