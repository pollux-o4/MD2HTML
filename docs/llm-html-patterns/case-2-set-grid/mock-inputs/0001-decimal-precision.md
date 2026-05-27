# ADR 0001: 소수점 정밀도 — Round Half Even

## Status

Accepted (2026-02-14)

## Context

계산기 엔진은 부동소수점 누적 오차를 사용자에게 노출하면 안 된다.
`0.1 + 0.2 == 0.30000000000000004` 같은 IEEE 754 표면화는
사용자 신뢰를 직접 깎는다. 기존 prototype 은 표시 시점에만
`toFixed(2)` 를 적용했고, 내부 누적 계산은 그대로 raw double 로
흘렸기 때문에 (a + b) + c 와 a + (b + c) 가 다른 결과를 내는
케이스가 QA 에서 4건 보고됐다.

회계용 계산기가 아니므로 BigDecimal 전면 도입은 과하다.
하지만 표시 정밀도와 내부 정밀도가 일치하지 않는 현재 구조는
디버깅을 어렵게 만들고, 회귀 테스트 작성도 까다롭다.

## Decision

내부 누적과 표시 모두 **소수점 5자리, banker's rounding
(round half to even)** 로 통일한다.

- 5자리는 일반 공학용 계산기 관행 (Casio fx-991 기본값)
- Banker's rounding 은 통계적 편향 최소화
- 모든 연산 결과는 `round5(x)` 를 거쳐 다음 연산에 투입

## Consequences

긍정: 결합법칙이 사용자 관찰 수준에서 성립. 회귀 테스트 작성 가능
(`expect(round5(0.1+0.2)).toBe(0.3)`).

부정: 누적 5자리 절단으로 인한 손실이 100 회 이상 연쇄 연산 시
가시화 가능. 과학 계산 모드에서는 별도 ADR 로 재논의 필요.

## Affected Code

- `src/engine/number.ts` — `round5()` 신규
- `src/engine/operators.ts` — `add/sub/mul/div` 4개 함수에 적용
- `src/ui/display.ts` — `toFixed(2)` 호출 제거
- `tests/engine/precision.spec.ts` — 회귀 테스트 12케이스
