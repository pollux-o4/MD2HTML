# Postgres tuning notes

External resource excerpts. Not authoritative for our config, just notes.

- `shared_buffers` ~25% of RAM
- `work_mem` per-operation, beware multipliers
- `effective_cache_size` ~50-75% of RAM

See AWS RDS docs for our actual config.
