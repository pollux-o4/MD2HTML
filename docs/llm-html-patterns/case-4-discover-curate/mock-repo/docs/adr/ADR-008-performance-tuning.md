# ADR-008: Performance Tuning Baseline

**Status**: Accepted
**Date**: 2025-04-05

## Context

`decimal.js` 도입 (ADR-001) 이후 연산이 10배 느려짐. 평균 식 평가 시간이 2ms → 21ms 로 증가하여 UI 가 끊김. 성능 개선 목표 설정 필요.

## Decision

성능 budget 도입:

- 단순 식 (10 토큰 이하): **< 5ms**
- 복잡 식 (100 토큰 이하): **< 50ms**
- 매 PR 마다 벤치마크 회귀 테스트 자동 실행

핫패스 (`Decimal.add`, `Decimal.mul`) 는 별도 fast-path 로 네이티브 number 사용 — 정밀도 손실 허용 범위에서.

## Consequences

- 평균 평가 시간 21ms → 7ms 회복
- fast-path 분기로 코드 분기 증가
- 일부 edge case 에서 정밀도 살짝 손실 (문서화됨)

## Related

- ADR-001 (decimal-precision)
- ADR-009 (caching-strategy)
- ADR-010 (lazy-evaluation)
