# perf notes (random)

Stuff I noticed while profiling, may or may not turn into ADRs.

- Catalog lookup is hot. Caching should help (-> later: ADR 0008).
- The pricing engine recomputes on every cart mutation. Wasteful.
  Lazy eval candidate (-> later: ADR 0011).
- Orders table doing seq scans on customer_id queries. Need an index.
  (-> later: ADR 0014).
- Worker poll for stuck orders is also slow, probably same index fix.
- Random: the JSON serializer we use is slow on big payloads, but not on
  the hot path so leaving it.
