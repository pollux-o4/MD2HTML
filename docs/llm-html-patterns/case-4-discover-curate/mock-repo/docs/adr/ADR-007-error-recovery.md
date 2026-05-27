# ADR-007: Parser Error Recovery

**Status**: Accepted
**Date**: 2025-03-22

## Context

파싱 중 에러 발생 시 즉시 중단 vs 복구 후 계속.

## Decision

panic-mode 복구. 다음 안전 토큰까지 스킵 후 재개.

## Consequences

- 여러 에러를 한번에 보고 가능
- 일부 케이스에서 잘못된 복구로 혼란
