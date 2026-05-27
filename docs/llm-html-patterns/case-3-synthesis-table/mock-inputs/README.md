# Calculator Engine

소수점 정밀도와 연산자 우선순위를 정확히 처리하는 임베디드 계산 엔진.

## Goals

- IEEE 754 부동소수점 오차 회피 (decimal 기반)
- 표준 수학 우선순위 (PEMDAS)
- 0 나누기, overflow, 잘못된 입력에 대해 graceful degradation
- 파싱 / 평가 / 에러 처리가 깔끔히 분리된 architecture

## Modules

| 모듈 | 책임 |
|------|------|
| `parser/` | 토큰화 + AST 생성 (recursive descent) |
| `evaluator/` | AST 순회, decimal 산술 |
| `errors/` | 사용자 친화적 에러 메시지, recovery hints |
| `types/` | `Decimal`, `Token`, `ASTNode` 정의 |
| `tests/` | property-based + unit |

## Quick Start

```bash
npm install
npm test
node ./bin/calc "2 + 3 * (4 - 1)"  # → 11
```

## Architecture Decisions

상세 결정은 `docs/adr/` 참조. 핵심 결정 7개:

1. Decimal precision (0001)
2. Operator precedence (0002)
3. Zero division (0003)
4. Overflow (0004)
5. Input validation (0005)
6. Parser strategy (0006)
7. Error recovery (0007)

## Status

v0.4 — parser/evaluator 안정, error recovery 개선 중.
