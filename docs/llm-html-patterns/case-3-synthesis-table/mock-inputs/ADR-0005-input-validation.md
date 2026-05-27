# ADR 0005 — Input Validation

**Status**: Accepted (2026-03-10)

## Context

사용자 입력은 신뢰 불가. 빈 문자열, 제어 문자, 너무 긴 입력 (DoS), 비
ASCII 등 모든 경우 처리. parser 에 도달하기 전에 차단해야 함.

## Decision

`InputValidator` 모듈이 parser 앞단에서 검증:

1. 길이 ≤ 10000 자
2. 허용 문자: `[0-9 + - * / ^ ( ) . , ]` + 공백
3. 빈 문자열 reject
4. UTF-8 BOM 제거

위반 시 `InvalidInput` 에러 — RecoveryHint 포함.

## Consequences

- (+) DoS 표면 축소
- (+) parser 가 valid 입력만 다룸 — 코드 단순
- (-) 함수/변수 도입 시 허용 문자 확장 필요 (미래 작업)

## Affected Code

- `parser/validator.ts` — 검증 로직
- `errors/invalid_input.ts` — 에러 클래스
- `errors/recovery.ts` — *"remove character X"* 힌트
- `tests/input_validation.test.ts` — fuzz + 경계

## Alternatives Considered

- parser 내부 검증 — 관심사 혼합
- whitelist 없이 blacklist — 새 공격 벡터 누락 위험
