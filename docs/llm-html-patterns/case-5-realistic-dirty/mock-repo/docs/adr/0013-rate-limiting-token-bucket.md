# ADR 0013: Token-bucket rate limiting

Status: Accepted

Decision: token-bucket per-API-key, enforced at the gateway.

Consequences: customers may see 429s during bursts. Documented in API docs.
