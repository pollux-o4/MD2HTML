# ADR 0003: 0 나눗셈 — DivisionByZeroError 예외

## Status

Accepted (2026-03-02)

## Context

JavaScript 의 기본 동작은 `1/0 === Infinity`, `0/0 === NaN` 이다.
이 값들이 그대로 디스플레이에 노출되면 사용자는 *"계산기가
망가졌다"* 고 인식한다. 베타 피드백에서 *"왜 Infinity 가 떠?"*
가 가장 자주 보고된 이슈였다 (12건).

기존 처리는 표시 레이어에서 `Number.isFinite()` 체크 후 `Error`
문자열로 치환하는 임시 패치였다. 문제는 후속 연산이 `Infinity`
를 그대로 받아 *오염된 누적* 을 만든다는 것. `(1/0) - (1/0)`
이 `NaN` 으로 끝나면 사용자는 첫 연산의 0 나눗셈을 인지하지
못한 채 두 번째 단계에서 의문의 NaN 을 보게 된다.

## Decision

**연산 시점에 `DivisionByZeroError` 예외를 던지고, 계산
파이프라인을 즉시 중단**한다. UI 는 예외를 잡아 한국어
메시지로 표시한다.

- `engine/operators.ts` 의 `div(a, b)` 에서 `b === 0` 체크
- 중첩 표현식의 경우 가장 안쪽 0 나눗셈에서 throw
- UI 는 *"0으로 나눌 수 없습니다 (위치: 3번째 항)"* 표시

## Consequences

긍정: 오염된 누적 제거. 사용자가 *어느 연산* 이 문제인지 즉시
파악. 회귀 테스트 작성 단순.

부정: 표현식 중간 0 나눗셈도 전체를 중단시키므로, *"부분 결과
라도 보고 싶다"* 는 일부 요청은 만족 못 함. 한계 (lim) 개념을
지원하는 과학 모드는 향후 별도 ADR.

## Affected Code

- `src/engine/operators.ts::div` — guard 추가
- `src/engine/errors.ts` — `DivisionByZeroError` 신규 클래스
- `src/ui/error-display.ts` — 한국어/영어 메시지 맵
- `tests/engine/zero-division.spec.ts` — 8 케이스
- `src/engine/evaluator.ts` — try/catch 래핑 추가
