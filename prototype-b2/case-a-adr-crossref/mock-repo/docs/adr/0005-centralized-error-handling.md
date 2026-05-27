---
id: ADR-0005
title: 중앙화된 에러 핸들링 도입
status: Accepted
date: 2025-03-05
deciders: backend-team, sre-team
tags: [error-handling, observability, http]
related: [ADR-0001, ADR-0003]
---

# ADR-0005: 중앙화된 에러 핸들링 도입

## Status

Accepted (2025-03-05)

## Context

기존 에러 처리는 라우트마다 제각각이었다.

```ts
// 어떤 라우트
catch (e) { res.status(500).json({ error: e.message }); }

// 다른 라우트
catch (e) { res.status(400).send(String(e)); }

// 또 다른 라우트
catch (e) { logger.error(e); throw e; }
```

문제점:

- HTTP status code 결정이 일관성 없음
- 에러 응답 schema 가 클라이언트마다 다름
- 민감 정보 (stack trace, DB 쿼리) 가 응답에 노출되는 사고 발생
- 로깅 누락 빈번 → SRE 가 인시던트 추적 어려움
- ADR-0003 의 `ZodError` 가 라우트마다 다르게 처리됨

## Decision

**모든 라우트 핸들러를 감싸는 중앙 에러 미들웨어를 도입**한다.

핵심 컴포넌트:

1. `AppError` 베이스 클래스 — `code`, `httpStatus`, `userMessage`, `cause` 보유
2. 도메인별 서브클래스 (`ValidationError`, `AuthError`, `NotFoundError`, `ConflictError`)
3. 중앙 미들웨어 `errorHandler(err, req, res, next)`
   - `ZodError` → `ValidationError` 로 변환 (HTTP 400)
   - `AppError` → 정의된 `httpStatus` 사용
   - 그 외 → HTTP 500 + 일반 메시지 (stack trace 는 로깅만)
4. 구조화 로그 (`pino`) 에 `requestId`, `userId`, `errorCode` 자동 포함

## Consequences

### 긍정적

- 에러 응답 schema 통일 → 프론트엔드가 단일 핸들러로 처리 가능
- 민감 정보 노출 방지 (production 모드에서 stack 자동 제거)
- 로깅 누락 0 건 (미들웨어가 무조건 기록)
- ADR-0003 의 ZodError 가 일관된 400 응답으로 변환

### 부정적

- 모든 비동기 라우트가 미들웨어로 에러를 전파하려면 `asyncHandler` wrapper 필요
- 기존 try/catch 블록 약 80 곳 리팩토링 필요
- 새 에러 코드를 추가할 때 enum 업데이트 누락 가능 → lint rule 로 보완

### 중립

- 클라이언트 SDK 도 통일된 에러 schema 에 맞춰 업데이트 (별도 작업)

## Implementation Notes

- `src/utils/errors.ts` — `AppError` 와 서브클래스 정의
- `src/api/middleware/error-handler.ts` — 중앙 미들웨어
- 마커 주석: `// ADR-0005: 중앙 에러 핸들러 사용 — try/catch 직접 금지`
- ESLint custom rule 로 라우트 핸들러 내부의 raw `res.status(5xx)` 호출 금지

## References

- ADR-0001 (strict mode — 에러 타입 명확화)
- ADR-0003 (Zod — ZodError 변환 규칙)
- SRE 가이드: 구조화 로그 표준
