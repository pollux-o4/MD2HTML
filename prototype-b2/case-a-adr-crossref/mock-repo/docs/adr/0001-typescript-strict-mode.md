---
id: ADR-0001
title: TypeScript strict mode 채택
status: Accepted
date: 2025-01-12
deciders: backend-team
tags: [typescript, tooling, type-safety]
related: [ADR-0003, ADR-0005]
---

# ADR-0001: TypeScript strict mode 채택

## Status

Accepted (2025-01-12)

## Context

초기 코드베이스는 TypeScript 를 쓰고 있었지만 `tsconfig.json` 의 `strict: false` 상태였다.
이로 인해 다음과 같은 문제가 반복적으로 발생했다.

- `any` 타입 암묵적 전파 → 런타임 `undefined` 참조 오류
- `null` / `undefined` 구분 부재 → 옵셔널 필드 누락이 컴파일 타임에 잡히지 않음
- 함수 시그니처와 호출부 불일치를 IDE 가 감지 못 함
- 신규 인력이 타입을 "장식" 으로 인식하는 문화 형성

QA 환경에서 발생한 P1 인시던트 12 건 중 7 건이 nullability 관련이었다.
정적 분석으로 사전에 막을 수 있는 부류였기 때문에 팀은 strict mode 전환을 논의했다.

## Decision

`tsconfig.json` 의 `compilerOptions` 에서 다음을 모두 활성화한다.

- `strict: true` (아래 모든 옵션의 메타 플래그)
- `noImplicitAny: true`
- `strictNullChecks: true`
- `strictFunctionTypes: true`
- `strictBindCallApply: true`
- `strictPropertyInitialization: true`
- `noImplicitThis: true`
- `alwaysStrict: true`

추가로 빌드 파이프라인에서 `tsc --noEmit` 을 PR 게이트로 강제한다.
신규 파일은 무조건 strict 통과, 기존 파일은 모듈 단위로 점진적 마이그레이션한다.

## Consequences

### 긍정적

- nullability 버그가 컴파일 타임에 걸러진다
- 함수 시그니처가 self-documenting 해진다
- IDE 자동완성 정확도 향상
- 신규 인력이 타입을 "필수" 로 인식

### 부정적

- 초기 마이그레이션 비용: 약 600 개 컴파일 에러 발생 (모듈별 분산 처리 필요)
- 외부 라이브러리 타입 정의가 부실한 경우 wrapper 작성 필요
- 학습 곡선: nullability 패턴 (`?.`, `??`, type guard) 익숙해질 시간 필요

### 중립

- ESLint `@typescript-eslint/strict` rule set 과 일부 중복 → 통합 설정 필요

## Implementation Notes

- 마이그레이션은 `src/utils/` → `src/schema/` → `src/api/` → `src/auth/` 순으로 진행
- 각 모듈 진입 시 `// ADR-0001: strict mode 통과 확인됨` 마커 주석 추가
- 기존 `any` 는 `unknown` 으로 치환 후 narrowing
- 외부 라이브러리는 `src/types/vendor/` 에 별도 declaration 작성

## References

- TypeScript Handbook — Strict mode
- 사내 인시던트 보고서 IR-2024-Q4
- ADR-0003 (Zod validation 도입과 보완 관계)
- ADR-0005 (중앙화 에러 핸들링과 시너지)
