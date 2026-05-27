# Domain Glossary

이 프로젝트에서 사용하는 용어. 코드와 ADR 에서 일관되게 사용.

## Core Terms

**Decimal** — 임의 정밀도 십진수. `bignumber.js` 의 `BigNumber` wrapper.
부동소수점 대신 사용해 `0.1 + 0.2 = 0.3` 보장.

**Token** — 입력 문자열의 lexical unit. 종류: `NUMBER`, `OPERATOR`, `LPAREN`,
`RPAREN`, `EOF`. 위치 정보 (`line`, `col`) 포함 — 에러 메시지에 사용.

**ASTNode** — 추상 구문 트리 노드. 종류: `BinaryOp`, `UnaryOp`, `NumberLit`,
`Group`. 모든 노드는 `eval(ctx): Decimal` 메서드 가짐.

**Precedence** — 연산자 우선순위 레벨. 1 (low) ~ 4 (high). `+/-`=1, `*//`=2,
`^`=3, unary `-`=4.

## Error Terms

**ParseError** — 파싱 단계 에러. `pos`, `expected`, `actual` 필드. recovery
시도 가능.

**EvalError** — 평가 단계 에러. 예: `DivisionByZero`, `Overflow`,
`UndefinedVariable`. 항상 fatal.

**RecoveryHint** — 사용자에게 *"이렇게 고치면 됩니다"* 제안. 예:
`"unclosed parenthesis — try adding ')'"`.

## Architectural Terms

**Affected Code** — 한 결정이 영향 주는 모듈 영역. ADR 마다 명시.
컬럼: `parser`, `evaluator`, `errors`, `types`, `tests`.

**Tracer Bullet** — end-to-end 동작하는 최소 슬라이스. 새 기능은 항상
tracer 부터.
