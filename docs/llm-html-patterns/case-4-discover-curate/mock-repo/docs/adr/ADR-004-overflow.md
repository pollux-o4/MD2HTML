# ADR-004: Overflow Detection

**Status**: Accepted
**Date**: 2025-02-15

## Context

매우 큰 수 계산 시 메모리/시간 폭증.

## Decision

지수 자리수 1000 초과 시 `OverflowError` throw.

## Consequences

- 무한 루프 방지
- 일부 천체물리 계산 불가
