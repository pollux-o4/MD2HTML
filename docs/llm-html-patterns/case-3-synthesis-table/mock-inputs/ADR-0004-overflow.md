# ADR 0004 — Overflow Handling

**Status**: Accepted (2026-03-01)

## Context

`Decimal` 은 임의 정밀도지만 *임의 크기* 는 아님 — 메모리/시간 한계.
`2^1000000` 같은 입력은 계산하면 안 됨. native `Number.MAX_VALUE` 처럼
명시적 cap 필요.

## Decision

최대 자릿수 = 10000 (config). 산술 결과가 이를 초과하면 `Overflow` 에러
throw. `pow` 는 지수 평가 전 결과 자릿수 추정 후 사전 차단.

음의 overflow (underflow) 는 0 으로 round, 에러 없음.

## Consequences

- (+) DoS 방지 (악의적 큰 지수 입력)
- (+) UX 명확 (`Infinity` 대신 에러)
- (-) 자릿수 추정 로직 복잡 — `log10(base) * exp` 휴리스틱

## Affected Code

- `evaluator/decimal_ops.ts` — `pow`, `mul` 에 overflow check
- `errors/overflow.ts` — 에러 클래스
- `types/decimal.ts` — `MAX_DIGITS` 상수
- `tests/overflow.test.ts` — `2^10000000`, `(10^5000)^2`

## Alternatives Considered

- 시간 제한 (setTimeout) — 비결정적
- silent Infinity — ADR 0003 과 일관성 어긋남
