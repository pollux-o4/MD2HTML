# Slow log highlights

Pasted some pg_stat_statements output:

```
calls=12834  mean_exec=812ms  query="SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC ..."
calls=8910   mean_exec=2510ms query="SELECT * FROM orders WHERE status IN ('pending','processing') ..."
```

Fed into ADR 0014.
