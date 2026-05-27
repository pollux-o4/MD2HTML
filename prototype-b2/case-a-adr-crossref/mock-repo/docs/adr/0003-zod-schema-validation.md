---
id: ADR-0003
title: Zod 를 스키마 검증 도구로 채택
status: Accepted
date: 2025-02-10
deciders: backend-team, api-team
tags: [validation, schema, runtime-safety]
related: [ADR-0001, ADR-0005]
---

# ADR-0003: Zod 를 스키마 검증 도구로 채택

## Status

Accepted (2025-02-10)

## Context

TypeScript strict mode (ADR-0001) 는 *컴파일 타임* 안전성만 보장한다.
런타임에 들어오는 외부 데이터 — HTTP request body, 환경변수, 외부 API 응답, DB 쿼리 결과 —
는 여전히 타입 시스템 밖에 존재한다.

기존 코드의 패턴:

```ts
function createUser(input: any) {
  if (!input.email || typeof input.email !== "string") throw new Error("bad");
  // ... 수동 검증 50줄
}
```

이런 수동 검증은:

- 누락 (필드 추가됐는데 검증 깜빡)
- 일관성 없음 (모듈마다 에러 메시지 형식 다름)
- 타입과 검증 로직이 따로 — 동기화 안 됨

여러 후보를 검토했다.

| 라이브러리 | 장점 | 단점 |
|---|---|---|
| Yup | 성숙, 광범위 사용 | TypeScript 추론 약함 |
| Joi | 표현력 풍부 | TypeScript 추론 거의 없음 |
| io-ts | 함수형, 정확 | 학습 곡선 가파름 |
| **Zod** | 타입 추론 1급, API 깔끔 | bundle size 보통 |
| Valibot | Zod 후속, 더 가벼움 | 생태계 미성숙 |

## Decision

**Zod 를 표준 스키마 검증 도구로 채택**한다.

- 모든 HTTP request body 는 `src/schema/` 의 Zod 스키마로 파싱
- 환경변수는 부팅 시 `envSchema.parse(process.env)` 로 검증
- 외부 API 응답도 가능한 범위에서 Zod 통과
- 스키마에서 `z.infer<typeof Schema>` 로 타입 도출 (single source of truth)
- 에러는 ADR-0005 의 중앙 에러 핸들러가 ZodError → HTTP 400 으로 변환

## Consequences

### 긍정적

- 런타임 검증과 타입이 자동 동기화
- request body 검증 코드가 평균 50줄 → 5줄로 축소
- 에러 메시지 일관성 (`ZodError.format()` 표준 활용)
- 부팅 시 환경변수 누락이 즉시 발견됨

### 부정적

- bundle 에 약 12KB 추가
- 일부 복잡한 union/discriminated union 패턴은 학습 필요
- 기존 수동 검증 코드 약 30개 함수 마이그레이션 필요

### 중립

- `z.coerce.*` 사용 시 의도치 않은 형변환 주의 (e.g. `"false"` → `true`)

## Implementation Notes

- 모든 스키마는 `src/schema/{도메인}.ts` 에 모음
- 파일 상단 마커: `// ADR-0003: Zod 스키마 — 런타임 검증 필수`
- 스키마는 `Schema` suffix (`UserCreateSchema`)
- 타입은 동일 이름에서 `Schema` 제거 + `type` (`UserCreate`)

## References

- Zod 공식 문서
- ADR-0001 (compile-time 안전성과 보완 관계)
- ADR-0005 (ZodError 변환)
