# ADR 0005: JSON structured logging

Status: Accepted

Plaintext logs are hard to query in Athena/CloudWatch.

Decision: all services emit JSON logs with a shared schema (service, env,
trace_id, level, msg, extra).

Consequences: minor CPU overhead, big win for observability.
