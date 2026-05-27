# ADR 0002 — Operator Precedence

**Status**: Accepted (2026-02-15)

## Context

표준 수학 우선순위 (PEMDAS) 를 따라야 함. `2 + 3 * 4 = 14` (not 20).
지수 연산자 (`^`) 는 right-associative — `2^3^2 = 2^9 = 512` (not `8^2 = 64`).

## Decision

Precedence climbing 알고리즘 사용. 각 연산자에 (precedence, associativity)
부여:

| 연산자 | Precedence | Associativity |
|--------|-----------|---------------|
| `+`, `-` (binary) | 1 | left |
| `*`, `/` | 2 | left |
| `^` | 3 | right |
| `-` (unary) | 4 | right |

Parser 가 precedence climbing 으로 AST 생성, evaluator 는 단순 post-order
순회.

## Consequences

- (+) 표준 수학과 일치
- (+) 새 연산자 추가 시 테이블만 수정
- (-) `^` right-associativity 처리가 약간 까다로움 — 추가 테스트 필요

## Affected Code

- `parser/precedence.ts` — 테이블 + climbing 알고리즘
- `parser/recursive_descent.ts` — `parseExpr` 가 precedence 사용
- `types/ast.ts` — `BinaryOp` 노드에 operator 필드
- `tests/precedence.test.ts` — 표준 케이스 + edge

## Alternatives Considered

- Shunting yard — postfix 변환 필요, AST 직접 생성이 더 단순
- 별도 grammar per precedence level — 코드 중복
