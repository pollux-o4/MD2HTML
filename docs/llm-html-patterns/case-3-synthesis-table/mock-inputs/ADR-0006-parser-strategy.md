# ADR 0006 — Parser Strategy

**Status**: Accepted (2026-03-20)

## Context

파서 구현 방식 선택. 옵션: recursive descent, Pratt parser, parser
generator (PEG.js, nearley), shunting yard. 우선순위 (ADR 0002) 와 에러
recovery (ADR 0007 예정) 와 잘 맞아야 함.

## Decision

Recursive descent + precedence climbing. 수동 구현 — 외부 의존성 최소화,
에러 위치 추적 정밀.

각 비터미널마다 함수 1개: `parseExpr`, `parseUnary`, `parseAtom`,
`parseGroup`. 토큰 stream 은 lookahead-1.

## Consequences

- (+) 의존성 0
- (+) 에러 메시지에서 정확한 위치 보고 가능
- (+) recovery 시점 제어 쉬움
- (-) right-associative 연산자 (`^`) 처리 어색 (handoff 참조)
- (-) 새 문법 추가 시 코드 수정 (vs grammar 파일)

## Affected Code

- `parser/recursive_descent.ts` — 메인 파서
- `parser/tokenizer.ts` — 토큰 stream
- `parser/precedence.ts` — climbing 알고리즘
- `tests/parser.test.ts` — 모든 문법 케이스

## Alternatives Considered

- Pratt — recursive descent 의 변형, 큰 차이 없음
- PEG.js — 빌드 단계 추가, 에러 메시지 제어 어려움
