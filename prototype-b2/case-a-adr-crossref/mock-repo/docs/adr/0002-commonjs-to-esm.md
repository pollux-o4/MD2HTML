---
id: ADR-0002
title: CommonJS 에서 ESM 으로 전환
status: Accepted
date: 2025-01-28
deciders: platform-team
tags: [modules, esm, build]
related: [ADR-0004]
supersedes: []
---

# ADR-0002: CommonJS 에서 ESM 으로 전환

## Status

Accepted (2025-01-28)

## Context

기존 코드베이스는 `require()` / `module.exports` 기반 CommonJS 였다.
Node.js 20 LTS 이상에서는 ESM 이 기본 권장이고, 최신 라이브러리들이 ESM-only 로 배포되기 시작했다.

구체적인 문제:

- `node-fetch@3+`, `chalk@5+`, `nanoid@4+` 등 주요 dependency 가 ESM-only
- Top-level await 사용 불가 → 초기화 코드가 IIFE 로 감싸지는 복잡도
- Tree-shaking 효율이 낮아 번들 크기 증가
- ESLint / Vitest 등 도구 체인이 ESM 우선으로 이동

dynamic `require()` 우회로 ESM-only 패키지를 끌어쓰는 hack 이 5 군데에서 발견되었고
이는 타입 추론 손실과 런타임 에러로 이어지고 있었다.

## Decision

전체 코드베이스를 ESM 으로 전환한다.

- `package.json` 에 `"type": "module"` 추가
- 모든 `.js` 파일을 `.mjs` 가 아닌 `.js` 로 유지하되 ESM 구문 사용
- TypeScript 출력은 `"module": "ESNext"`, `"moduleResolution": "Bundler"` 로 설정
- 상대 import 경로에 명시적 `.js` 확장자 추가
- `__dirname`, `__filename` 은 `import.meta.url` 기반 헬퍼로 대체

## Consequences

### 긍정적

- 최신 ESM-only 라이브러리 자유롭게 사용 가능
- Top-level await 가능 → 초기화 코드 단순해짐
- Tree-shaking 효율 향상, 번들 크기 약 18% 감소 예상
- 향후 Vitest (ADR-0004) 마이그레이션과 자연스럽게 맞물림

### 부정적

- 일부 레거시 dependency 는 여전히 CommonJS → `createRequire` 호환 레이어 필요
- Jest 가 ESM 을 완전히 지원하지 않아 테스트 러너 교체 필요 (→ ADR-0004 로 이어짐)
- 상대 import 에 `.js` 확장자 명시는 처음에 낯섦
- 스크립트 파일 (`scripts/*.js`) 도 모두 ESM 으로 통일해야 일관성 유지

### 중립

- IDE 가 import 경로를 자동 보정해주므로 실제 작성 부담은 적음

## Migration Plan

1. `src/utils/` 부터 ESM 으로 전환 (의존성 가장 적음)
2. `src/schema/`, `src/api/` 순서로 확장
3. `src/auth/` 는 외부 OAuth 라이브러리 호환 확인 후 마지막
4. 각 파일 상단에 `// ADR-0002: ESM 전환 완료` 마커
5. PR 게이트에서 `require(` 패턴 lint rule 로 금지

## References

- Node.js ESM 공식 문서
- ADR-0004 (Vitest 도입 — ESM 친화적)
