# Edge Cases

알려진 엣지 케이스 모음.

- `0^0` → 1 (수학적 관례)
- `log(0)` → `-Infinity` (IEEE 754)
- `0/0` → `DivisionByZeroError` (ADR-003)
- 매우 큰 지수 → `OverflowError` (ADR-004)
