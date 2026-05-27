# ADR 0003: Redis for session state

Status: Accepted

Session state needs sub-ms reads. Postgres is too heavy.

Decision: Redis cluster (ElastiCache). TTL-based eviction. No persistence —
sessions can be recreated from JWT if lost.

Consequences: another piece of infra to operate. Acceptable given the latency
win.
