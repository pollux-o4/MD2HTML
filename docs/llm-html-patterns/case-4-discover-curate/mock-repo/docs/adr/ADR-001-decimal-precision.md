# ADR-001: Decimal Precision

**Status**: Accepted
**Date**: 2025-01-12

## Context

계산기 엔진의 부동소수점 정밀도 손실 (0.1 + 0.2 = 0.30000000000000004) 문제 해결 필요.

## Decision

`decimal.js` 도입. 28자리 정밀도 유지.

## Consequences

- 정확도 향상
- 연산 속도 ~10x 저하 (네이티브 float 대비)
