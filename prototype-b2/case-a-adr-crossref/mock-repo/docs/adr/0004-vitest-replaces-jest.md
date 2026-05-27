---
id: ADR-0004
title: Jest 를 Vitest 로 교체
status: Accepted
date: 2025-02-22
deciders: platform-team, qa-team
tags: [testing, tooling, esm]
related: [ADR-0002]
supersedes: []
---

# ADR-0004: Jest 를 Vitest 로 교체

## Status

Accepted (2025-02-22)

## Context

ADR-0002 로 코드베이스가 ESM 으로 전환되면서 Jest 의 ESM 지원 한계가 드러났다.

Jest 의 문제:

- ESM 지원이 experimental → `--experimental-vm-modules` 플래그 필요
- TypeScript + ESM 조합에서 `import` 경로 해석 불안정
- `ts-jest` vs SWC transformer 호환성 문제 빈발
- 워치 모드 watch 가 큰 모노레포에서 느림
- Snapshot 업데이트 UX 가 떨어짐

Vitest 의 장점:

- ESM 네이티브 (Vite 기반)
- Jest API 호환 → 마이그레이션 비용 낮음
- 워치 모드가 변경 파일만 똑똑하게 실행
- 빠른 startup (cold start 약 5배)
- Vue/React/Svelte 등 프레임워크 친화적
- `vitest --ui` 로 브라우저 UI 디버깅

## Decision

**모든 단위/통합 테스트 러너를 Jest 에서 Vitest 로 교체**한다.

- `jest`, `ts-jest`, `@types/jest` 의존성 제거
- `vitest`, `@vitest/coverage-v8` 도입
- `jest.config.js` → `vitest.config.ts`
- API 호환되는 함수는 import 만 변경 (`from "vitest"`)
- `jest.mock()` → `vi.mock()` 일괄 치환

## Consequences

### 긍정적

- ESM (ADR-0002) 과 자연스럽게 맞물려 빌드 파이프라인 단순화
- 테스트 cold start 5배 향상 (12s → 2.4s)
- 워치 모드 반응성 개선 → TDD 사이클 빨라짐
- `vitest --ui` 로 시각적 디버깅 가능

### 부정적

- 일부 Jest 전용 매처 (`toMatchInlineSnapshot` 형식 차이) 미세 조정 필요
- CI 캐시 키 변경
- 기존 `__mocks__` 폴더 규칙은 Vitest 에서 명시적 `vi.mock()` 로 재작성

### 중립

- 커버리지 리포터가 c8/v8 기반 → 숫자가 살짝 달라질 수 있음

## Migration Plan

1. `tests/` 의 단위 테스트부터 일괄 치환 (대부분 import 만 바꾸면 됨)
2. `vitest.config.ts` 에 alias, setup 파일 이전
3. CI 의 `npm test` 스크립트 교체
4. `// ADR-0004: Vitest 마이그레이션 완료` 마커를 setup 파일 상단에 추가
5. 1주일 병행 운영 후 Jest 의존성 제거

## References

- Vitest 공식 문서
- ADR-0002 (ESM 전환 — Vitest 결정의 직접적 트리거)
