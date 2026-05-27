# ADR 0004: 오버플로우 처리 — i64 범위 검사

## Status

Accepted (2026-03-15)

## Context

내부 정수 연산은 i64 범위 (`-2^63 ~ 2^63-1`) 를 채택했다.
JavaScript number 는 안전 정수 범위가 `2^53-1` 이므로,
i64 시뮬레이션을 위해 `BigInt` 를 사용한다. 그러나 표시는
일반 number 로 다운캐스트한다.

문제: 누적 곱셈이 `2^53` 을 넘는 순간 `Number(bigint)` 가
정밀도를 잃는다. `9007199254740993n` 을 number 로 캐스트하면
`9007199254740992` 가 된다 — silently lossy.

기존 처리는 *경고 없음*. 사용자는 잘못된 큰 수를 그대로 보게
된다. 회계 사용 사례를 고려하면 silent lossy 는 절대 안 된다.

## Decision

**모든 연산 결과를 i64 범위 검사 후 number 캐스트 전 검증**한다.
초과 시 `OverflowError` 를 throw 한다.

- `engine/number.ts::checkI64Range(x: bigint)` 신규
- 모든 산술 연산 (`add/sub/mul/div/pow`) 결과에 호출
- 표시 단계에서는 *이미 검증된 값* 만 다룸

대안 (BigInt 끝까지 유지) 은 표시·복사·외부 API 호환성
때문에 기각.

## Consequences

긍정: silent lossy 제거. 회계·재무 사용자 신뢰 확보.

부정: i64 도 결국 유한. `2^63` 초과 시 동일 문제 반복 —
하지만 일반 계산기 사용자에게 i64 는 사실상 무한. 과학
표기법 (`1.23e20`) 지원은 별도 ADR 0008 로 분리.

## Affected Code

- `src/engine/number.ts` — `checkI64Range`, `I64_MAX/MIN` 상수
- `src/engine/operators.ts` — 5개 연산 함수 결과 검증
- `src/engine/errors.ts` — `OverflowError` 신규
- `src/ui/error-display.ts` — *"수가 너무 큽니다 (i64 초과)"*
- `tests/engine/overflow.spec.ts` — 14 케이스 (경계 포함)
