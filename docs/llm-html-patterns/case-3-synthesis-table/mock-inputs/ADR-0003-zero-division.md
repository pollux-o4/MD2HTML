# ADR 0003 — Zero Division Handling

**Status**: Accepted (2026-02-20)

## Context

`x / 0` 를 어떻게 처리할지. JavaScript 는 `Infinity` 반환 — 사용자에게
혼란. 수학적으로 *"undefined"*. 계산기 UX 는 명확한 에러 메시지를 기대.

## Decision

`DivisionByZero` 에러 throw. evaluator 에서 division 직전 0 체크.
에러 메시지: `"Cannot divide by zero at position N"` + RecoveryHint
`"check the denominator expression"`.

`0 / 0` 도 동일 처리 (NaN 대신).

## Consequences

- (+) 사용자에게 명확
- (+) Infinity propagation 방지
- (-) division 마다 분기 — 마이크로 성능 영향 (무시 가능)

## Affected Code

- `evaluator/binary_op.ts` — division 케이스에 zero check
- `errors/division_by_zero.ts` — 에러 클래스
- `errors/recovery.ts` — RecoveryHint 매핑
- `tests/zero_division.test.ts` — `x/0`, `0/0`, `0/(1-1)`

## Alternatives Considered

- Infinity 반환 — JS 기본 동작이지만 UX 나쁨
- NaN 반환 — silent failure, 디버깅 어려움
