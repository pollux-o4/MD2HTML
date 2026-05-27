# Benchmark Results (Q2 2025)

ADR-008/009/010 적용 후 측정.

| 케이스 | Before | After |
|---|---|---|
| 단순 식 | 21ms | 4ms |
| 캐시 히트 | 21ms | 0.2ms |
| 조건식 (lazy) | 35ms | 22ms |
