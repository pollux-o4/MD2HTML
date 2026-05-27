# ADR-005: Input Validation

**Status**: Accepted
**Date**: 2025-02-28

## Context

사용자 입력 검증 시점 — 입력 시 vs 평가 시.

## Decision

토크나이저 단계에서 lexical validation. 의미 검증은 파서.

## Consequences

- 빠른 에러 피드백
- 두 단계 분리로 코드 복잡도 증가
