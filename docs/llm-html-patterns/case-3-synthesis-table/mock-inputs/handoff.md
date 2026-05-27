# Handoff — 2026-05-20

다음 작업자에게.

## 현재 상태

- ADR 0001~0006 구현 완료, 테스트 green
- ADR 0007 (error recovery) 설계 단계 — `errors/recovery.ts` skeleton 만 존재
- v0.4 release 준비 중, recovery 끝나면 tag

## 진행 중인 PR

- #42 — overflow 시 `Infinity` 대신 `Overflow` 에러 throw (ADR 0004 구현)
- #45 — parser error recovery skeleton (ADR 0007 일부)

## 알려진 이슈

1. `parser/recursive_descent.ts` 의 `parseExpr` 가 right-associative 연산자
   (`^`) 에 대해 약간 어색함. ADR 0006 에 *"future work"* 로 명시됨.
2. `tests/property/` 의 shrinking 이 느림 (10초+). 우선순위 낮음.
3. `errors/format.ts` 가 영어 only — i18n 미정.

## 다음 작업자가 해야 할 것

1. PR #45 마저 — `RecoveryHint` 실제 생성 로직
2. ADR 0007 *"Decision"* 섹션 작성 (현재 *"Context"* 만)
3. `evaluator/decimal_ops.ts` 의 `pow` 가 매우 큰 지수에서 hang — overflow
   check 추가
4. v0.4 changelog 작성

## 참고할 문서

- ADR 0007 — 진행 중인 결정
- CONTEXT.md — 용어 (특히 `RecoveryHint`)
- README.md — 모듈 구조

## 연락

질문은 #calc-engine slack 채널.
