# ADR 0005: 입력 검증 — 파서 단 일괄 처리

## Status

Accepted (2026-04-01)

## Context

ADR 0002 (PEMDAS) 도입 이후 입력 검증 로직이 여러 레이어에
산재했다.

- UI 키패드: 허용 문자 화이트리스트
- Tokenizer: 토큰화 실패 시 throw
- Shunting-Yard: 괄호 매칭 검사
- Evaluator: 피연산자 수 검사

각 레이어가 부분 검증만 하니, *"검증 실패 메시지가 사용자 입력
어느 위치에서 발생했는지"* 추적이 어려웠다. 예: `2 + + 3` 은
tokenizer 통과, Shunting-Yard 통과, Evaluator 단계에서 *"피연산자
부족"* 으로 throw — 사용자 입장에서는 *어느 + 가 문제인지*
알 수 없다.

또한 검증 로직 중복으로 회귀 테스트 작성 시 *어느 레이어에
케이스를 추가해야 하는가* 가 매번 논쟁이었다.

## Decision

**검증을 파서 단 (Tokenizer + 신규 ValidationPass) 으로 일괄
이동**한다. 후속 단계 (Shunting-Yard, Evaluator) 는 *이미 검증된
입력만 받는다* 는 전제 하에 검증 로직을 제거한다.

- `parser/validator.ts` 신규 — tokenize 직후 호출
- 모든 검증 에러는 토큰 위치 (start, end) 포함
- UI 는 위치 정보로 입력창의 해당 부분을 빨갛게 하이라이트

## Consequences

긍정: *어디서 검증해야 하나* 논쟁 종결. 사용자 에러 메시지에
위치 정보 포함 가능. 회귀 테스트 한 곳에 집중.

부정: 파서 단 일괄 검증은 *짧은 입력에 대한 over-engineering*
처럼 보일 수 있음. 5문자 입력에 전체 validation pass 를 도는
오버헤드 — 측정 결과 < 1ms 라 무시 가능.

## Affected Code

- `src/parser/validator.ts` — 신규 (200줄)
- `src/parser/shunting-yard.ts` — 괄호 검사 제거
- `src/engine/evaluator.ts` — 피연산자 수 검사 제거
- `src/ui/keypad.ts` — 화이트리스트 유지 (1차 방어선)
- `src/ui/input-highlight.ts` — 위치 기반 하이라이트 신규
- `tests/parser/validation.spec.ts` — 40 케이스 통합 이동
