# ADR-006: Parser Strategy

**Status**: Accepted
**Date**: 2025-03-10

## Context

손으로 작성한 재귀 하강 파서 vs 파서 생성기 (PEG.js 등).

## Decision

재귀 하강. 외부 의존성 최소화, 디버깅 용이.

## Consequences

- 파서 변경 시 수작업 필요
- 번들 크기 ~50KB 절약
