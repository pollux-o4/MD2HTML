# ADR 0003: Zero Division Handling

## Status
Accepted (2026-03-14)

## Context

계산기 프로젝트에서 0으로 나누기 (division by zero) 를 어떻게 처리할지 결정이 필요했다.
현재 구현은 IEEE 754 표준에 따라 `1/0 = Infinity`, `0/0 = NaN` 을 반환한다.
이는 JavaScript 의 기본 동작이지만, 사용자 입장에서는 매우 혼란스럽다:

- `Infinity` 가 화면에 표시되면 무슨 뜻인지 알기 어렵다.
- `NaN` 이 후속 연산에 전파되어 모든 결과가 망가진다 (`NaN + 1 === NaN`).
- 호출 코드가 명시적으로 `isNaN()` / `isFinite()` 검사를 매번 해야 한다.

특히 우리 제품은 회계 / 재무 계산이 주 용도라, "조용히 잘못된 값"이 흘러가는 것은 치명적이다.
실제 사용자 인터뷰 (2026-02, n=12) 에서 8명이 "Infinity 가 표시되면 버그라고 생각한다"고 답했다.

대안 검토:

1. **NaN 반환 유지** — 현재 동작. 호환성 최고, UX 최악.
2. **`null` 반환** — 타입 시그니처가 더러워짐. 모든 호출처에 null 체크 강제.
3. **`Result<T, E>` 패턴** — Rust 스타일. JS 생태계에 안 맞고 보일러플레이트 폭증.
4. **예외 던지기** — 가장 명시적. try/catch 로 호출자가 의도적으로 처리.

## Decision

**NaN 반환 대신 `DivisionByZeroError` 예외를 던진다.**

`divide(a, b)` 함수는 `b === 0` 일 때 즉시 `throw new DivisionByZeroError(a, b)` 한다.
에러 객체는 피연산자 값을 담아 디버깅에 사용한다.

```ts
class DivisionByZeroError extends Error {
  constructor(public dividend: number, public divisor: number) {
    super(`Cannot divide ${dividend} by ${divisor}`);
    this.name = 'DivisionByZeroError';
  }
}
```

UI 레이어는 이 예외를 catch 해서 "0으로 나눌 수 없습니다" 토스트를 띄운다.
계산 히스토리에는 에러 상태로 기록된다 (재실행 가능).

## Consequences

### Positive
- **사용자가 에러를 명확히 인지** — Infinity 가 화면에 뜨는 일이 사라진다.
- **호출 코드가 try/catch 로 의도적 처리 가능** — 조용한 실패 방지.
- **타입 안전** — 정상 경로는 항상 `number` 반환, 에러 경로는 명시적 throw.
- **디버깅 정보 풍부** — 에러 객체에 피연산자가 담겨 로그 분석 용이.

### Negative
- **기존 코드 영향** — NaN 을 검사하던 코드 14곳 수정 필요 (`src/` 전반).
- **예외 전파 비용** — 핫 패스에서 throw 가 발생하면 성능 영향 (벤치마크 결과 < 0.1ms, 무시 가능).
- **테스트 코드 증가** — 모든 나누기 호출처에 throw 케이스 테스트 추가.

### Neutral
- 외부 API 호환성: 영향 없음 (내부 함수).

## Affected Code

- `src/parser/divide.ts:42-58` — 핵심 변경, NaN return → throw.
- `src/error/types.ts` — 신규 `DivisionByZeroError` 클래스 추가.
- `src/ui/calculator-view.tsx:128` — try/catch 래핑, 토스트 호출.
- `src/history/recorder.ts:67` — 에러 상태 기록 로직 추가.
- `tests/divide.test.ts` — 4개 신규 테스트 케이스 (1/0, 0/0, -1/0, 매우 큰 수/0).

## Migration

1. `DivisionByZeroError` 클래스 먼저 머지 (PR #234).
2. `divide.ts` 변경 + 호출처 14곳 동시 수정 (PR #235, breaking).
3. UI 레이어 토스트 + 히스토리 (PR #236).
4. 회귀 테스트 1주일 모니터링 후 NaN 검사 코드 cleanup (PR #237).

## References
- 사용자 인터뷰 노트: `docs/research/2026-02-divide-ux.md`
- 벤치마크: `bench/divide-throw-cost.bench.ts`
- 관련 ADR: 0001 (에러 처리 정책), 0002 (UI 토스트 시스템)
