# ADR 0007 — Error Recovery

**Status**: Proposed (2026-05-15, in progress)

## Context

파싱/평가 에러 시 *"여기서 멈췄습니다, 이렇게 고치세요"* 를 사용자에게
제공해야 함. 단순 에러 throw 만으로는 UX 부족 — IDE 같은 *"squiggly
underline + suggestion"* 경험 목표.

대표 케이스:

- `2 + ` (불완전 표현식)
- `(1 + 2` (괄호 미닫힘)
- `2 ++ 3` (연산자 중복)
- `2 / 0` (0 나누기 — ADR 0003 과 통합)

## Decision

*(작성 중 — handoff 의 다음 작업자 항목 참조)*

방향: parser 가 에러 시 *"가장 가까운 안정 토큰"* 까지 skip, partial AST
반환. evaluator 는 partial AST 도 받아서 가능한 부분만 평가.

각 에러는 `RecoveryHint` 동반 — 사용자 메시지 + 자동 수정 제안 (선택).

## Consequences (예상)

- (+) UX 향상
- (+) IDE/REPL integration 용이
- (-) parser 복잡도 상승
- (-) 테스트 케이스 폭발 — 모든 에러 시점 × 다음 토큰

## Affected Code

- `errors/recovery.ts` — skeleton 존재
- `parser/recursive_descent.ts` — recovery point 추가
- `parser/validator.ts` — invalid 입력에도 hint 제공
- `evaluator/partial_eval.ts` — 신규 모듈
- `tests/recovery.test.ts` — 신규

## Alternatives Considered

- Error throw only (현재 동작) — UX 부족
- Full IDE integration (LSP) — 과한 scope
