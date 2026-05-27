# ADR 0001 — Decimal Precision

**Status**: Accepted (2026-02-10)

## Context

JavaScript 의 `Number` 는 IEEE 754 binary64 — `0.1 + 0.2 !== 0.3`. 계산기
사용자는 십진수 직관에 따라 동작하길 기대. 금융/회계 도메인 사용 가능성도
고려.

## Decision

`bignumber.js` 의 `BigNumber` 를 `Decimal` 로 wrapping. 모든 산술 연산은
`Decimal` 위에서만 수행. 입력 파싱 시 즉시 `Decimal` 로 변환, 출력 시에만
string 변환.

기본 precision = 20 자리. config 로 조정 가능.

## Consequences

- (+) `0.1 + 0.2 === '0.3'` 보장
- (+) 금융 도메인 적용 가능
- (-) native Number 대비 ~50x 느림 — 벤치마크로 검증 필요
- (-) 번들 크기 +120KB

## Affected Code

- `types/decimal.ts` — wrapper 정의
- `evaluator/binary_op.ts` — 모든 산술이 Decimal 사용
- `parser/tokenizer.ts` — NUMBER 토큰을 Decimal 로 즉시 변환
- `tests/decimal_precision.test.ts` — property tests

## Alternatives Considered

- `decimal.js` — 비슷, BigNumber 보다 약간 느림
- 자체 구현 — 유지보수 부담
