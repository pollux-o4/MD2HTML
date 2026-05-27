# ADR-002: Operator Precedence

**Status**: Accepted
**Date**: 2025-01-20

## Context

`2 + 3 * 4` 같은 식의 우선순위 파싱 방식 결정.

## Decision

Shunting-yard 알고리즘. 단항/이항 연산자 모두 지원.

## Consequences

- 표준 수학 우선순위 보장
- 파서 코드 ~200줄 추가
