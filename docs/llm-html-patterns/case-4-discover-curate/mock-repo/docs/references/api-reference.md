# API Reference

## evaluate(expr: string, ctx?: Context): Result

식 평가 진입점. AST 캐시 사용. 자세한 캐싱 정책은 ADR-009.

## tokenize(input: string): Token[]

어휘 분석. lexical validation 수행 (ADR-005).

## parse(tokens: Token[]): AST

재귀 하강 파서 (ADR-006). 에러 복구 panic-mode (ADR-007).
