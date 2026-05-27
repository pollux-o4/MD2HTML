# ADR 0002: Use Postgres as primary store

Status: Accepted

We need a primary OLTP store. Considered Postgres, MySQL, CockroachDB.

Decision: Postgres 15. Operational maturity in our team, JSONB support,
good extension ecosystem (pg_stat_statements, pg_partman).

Consequences: vertical scaling for now, horizontal sharding deferred to a
future ADR if/when needed.
