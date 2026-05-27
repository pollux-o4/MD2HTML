# Project context

Phoenix handles ~2M orders/day. P99 latency on the hot path matters more than
throughput. Storage is Postgres + Redis. Background work via SQS + workers.

Domain glossary:
- **Order** — a customer purchase. Has line items.
- **Fulfillment** — the process of getting an order to the customer.
- **Hot path** — order placement -> ack. SLA 200ms P99.
