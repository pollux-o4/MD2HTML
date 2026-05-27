# ADR 0004: SQS for background work

Status: Accepted

Considered SQS, Kafka, RabbitMQ. Background jobs are mostly fire-and-forget
with retry; we don't need Kafka's ordering or replay.

Decision: SQS standard queues, with DLQs.

Consequences: at-least-once semantics; workers must be idempotent.
