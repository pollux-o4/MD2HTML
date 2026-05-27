# ADR 0002: 연산자 우선순위 — PEMDAS 표준

## Status

Accepted (2026-02-21)

## Context

초기 prototype 은 입력 순서대로 좌→우 평가 (단순 전자계산기 방식)
를 채택했다. `2 + 3 * 4` 가 `20` 으로 평가되는 식이다.

베타 테스터 23명 중 19명이 *"공학용 계산기 모드를 기본으로"*
요청했다. 학교 수학·엔지니어링 워크플로우에서 PEMDAS 미준수는
즉시 버그로 인식된다. 우리는 일반 사용자 시장을 노리지만,
*수식 입력* UI 를 유지하려면 PEMDAS 는 사실상 필수다.

대안으로 *모드 토글* (단순/공학) 도 검토했으나, 모드 상태가
계산 결과에 미치는 영향을 사용자가 추적하기 어렵다는 사용성
이슈가 컸다.

## Decision

**PEMDAS (Parentheses, Exponents, Multiplication, Division,
Addition, Subtraction) 표준을 모든 모드에서 항상 적용**한다.

파서는 Shunting-Yard 알고리즘으로 입력 토큰을 RPN 으로 변환 후
스택 평가한다. 단순 좌→우 모드는 지원하지 않는다.

## Consequences

긍정: 학교 시장·엔지니어링 사용자 onboarding 마찰 제거.
수식 입력 UI 의 일관성 확보.

부정: *옛날 전자계산기 감성* 을 기대하는 일부 사용자에게는
혼란. 마이그레이션 가이드 문서 필요. 단항 마이너스 (`-3^2`)
처리는 별도 결정 필요 — 우리는 `-(3^2) = -9` 채택 (Python 관행).

## Affected Code

- `src/parser/tokenizer.ts` — 단항/이항 마이너스 구분
- `src/parser/shunting-yard.ts` — 신규 모듈
- `src/engine/evaluator.ts` — RPN 평가 루프
- `tests/parser/precedence.spec.ts` — 30+ 케이스 테이블 테스트
- `docs/migration-from-simple-mode.md` — 사용자 가이드
