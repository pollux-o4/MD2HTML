# ADR-009: Expression Caching Strategy

**Status**: Accepted
**Date**: 2025-04-19

## Context

ADR-008 성능 budget 달성 후에도 반복 식 (예: 사용자가 같은 식을 여러번 평가) 이 매번 재계산. 캐시 도입 검토.

## Decision

LRU 캐시 도입:

- **AST 캐시**: 토크나이즈+파싱 결과를 식 문자열 기준 LRU(256) 로 캐시
- **결과 캐시**: 순수 식 (변수 없음) 의 평가 결과 LRU(128) 캐시
- 변수 바인딩 변경 시 결과 캐시 무효화, AST 캐시는 유지

## Consequences

- 반복 식 평가 7ms → 0.2ms (35x)
- 메모리 +2MB 상한
- 캐시 무효화 버그 위험 (ADR-007 panic 복구와 상호작용 주의)

## Related

- ADR-008 (performance-tuning)
- ADR-010 (lazy-evaluation)
