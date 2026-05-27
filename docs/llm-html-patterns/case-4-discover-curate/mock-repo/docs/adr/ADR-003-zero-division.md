# ADR-003: Zero Division Handling

**Status**: Accepted
**Date**: 2025-02-03

## Context

`x / 0` 처리 — throw vs Infinity vs NaN.

## Decision

`DivisionByZeroError` throw. UI 에서 "정의되지 않음" 표시.

## Consequences

- 명시적 에러 처리 강제
- IEEE 754 Infinity 호환성 손실
