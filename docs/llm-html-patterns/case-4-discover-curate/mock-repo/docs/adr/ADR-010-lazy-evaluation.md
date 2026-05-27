# ADR-010: Lazy Evaluation for Conditional Expressions

**Status**: Accepted
**Date**: 2025-05-08

## Context

`if(cond, then, else)` 같은 조건식이 양쪽 분기를 모두 평가하고 있어 비효율. 특히 then/else 가 무거운 식일 때 성능 손실 큼.

## Decision

조건 분기는 lazy 평가:

- `if`, `and`, `or` 는 short-circuit
- 사용자 정의 함수 인자는 기본 eager (호환성)
- `lazy(...)` 래퍼로 명시적 lazy 선언 가능

## Consequences

- 조건식 평균 35% 성능 개선
- AST 노드에 thunk 개념 추가 — 디버깅 어려움
- 캐시 키 계산에 thunk 평가 여부 포함 필요 (ADR-009 와 상호작용)

## Related

- ADR-008 (performance-tuning)
- ADR-009 (caching-strategy)
