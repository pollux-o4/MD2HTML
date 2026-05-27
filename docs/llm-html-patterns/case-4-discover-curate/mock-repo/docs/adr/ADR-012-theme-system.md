# ADR-012: Theme System

**Status**: Accepted
**Date**: 2025-06-01

## Context

다크/라이트/시스템 모드 지원.

## Decision

CSS 변수 + prefers-color-scheme. localStorage 로 사용자 선택 저장.

## Consequences

- FOUC 가능성 (해결 위해 inline script)
- 테마 추가 쉬워짐
