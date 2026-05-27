# Thariq HTML Effectiveness — 라이선스 조사

조사 대상: https://thariqs.github.io/html-effectiveness/
사용자 목적: pollux-o4/MD2HTML repo 에서 템플릿 재사용 검토

## 1. 라이선스 사실 확인

| 항목 | 값 |
|---|---|
| Repo | https://github.com/ThariqS/html-effectiveness |
| 라이선스 | **Apache License 2.0** |
| Copyright | © 2026 Anthropic PBC |
| 유지보수 | "Sample code. Not maintained and not accepting contributions." |
| 사이트 footer | 별도 사용 조건 명시 없음 (LICENSE 파일이 단일 출처) |

출처: repo LICENSE 파일, README ("Released under the Apache License 2.0"). 사이트 자체에는 별도 약관 페이지 없음 — repo 의 Apache 2.0 이 권리의 단일 출처다.

## 2. 시나리오별 가능 여부

### (a) 그대로 fork / clone

**가능.** Apache 2.0 은 상업·비상업 무관 fork·수정·재배포 모두 허용.

조건 4가지:
1. 원본 `LICENSE` 파일을 fork 에 포함 (보통 fork 시 자동 따라옴).
2. 원본 `NOTICE` 파일이 있다면 그것도 포함 (이 repo 엔 NOTICE 없음 — 생략 가능).
3. 수정한 파일에 "수정함" 표시 (헤더 주석 한 줄로 충분: `Modified from ThariqS/html-effectiveness, 2026-05-26`).
4. README 어딘가에 attribution 1줄 — 예: "Templates adapted from [ThariqS/html-effectiveness](https://github.com/ThariqS/html-effectiveness), licensed under Apache 2.0, © Anthropic PBC."

### (b) 코드 일부 차용 (HTML/CSS/JS 패턴)

**가능, 조건은 (a)와 동일.** Apache 2.0 은 부분 차용도 동일하게 attribution + LICENSE 사본 요구. 차용한 파일 상단에 출처 주석 + repo 루트에 `THIRD_PARTY_LICENSES.md` 또는 README 섹션으로 묶어 표기하면 깔끔.

호환성: pollux-o4/MD2HTML 이 MIT / Apache 2.0 / BSD 라면 호환 OK. GPL 계열이면 Apache 2.0 코드를 GPLv3 프로젝트에 합치는 건 가능하나 역방향은 안 됨 — pollux-o4 의 라이선스 미확인 시 사용자가 한 번 체크 필요.

### (c) 컨셉만 참고, Claude 로 직접 재구현

**라이선스 무관.** 아이디어·디자인 컨셉은 저작권 보호 대상 아님. 다만 매너로 README 에 "Inspired by ThariqS/html-effectiveness" 한 줄은 권장.

## 3. 권장 경로

**(c) 컨셉 참고 + 직접 재구현이 가장 안전·빠름.**

이유 3가지:
1. **md-show-me 의 본질이 "Claude 가 design tool 로 직접 HTML 을 만들어내는 skill"** 이므로 — 외부 템플릿을 들고 오는 것보다 Claude 가 컨셉 보고 다시 짜는 게 프로젝트 정체성과 더 일치.
2. 라이선스 의무(attribution, LICENSE 복사, 수정 표시) 0개 — repo 정리 부담 없음.
3. 템플릿이 Anthropic 사내 예제 성격이라 사용자 도메인(MD→HTML 변환)에 그대로 맞지 않을 가능성 큼. 어차피 재작성 비중이 높을 것.

대안: 시간 압박이 있어 "당장 결과물 보여줘야 함" 단계면 (b) 부분 차용으로 시작 → 추후 (c) 로 리팩토링. 이 경우 차용한 파일 헤더에 출처 주석 + repo README 에 attribution 섹션 1개만 추가하면 의무 완료.

비권장: (a) 통째 fork. 9개 카테고리 20개 파일 중 실제로 쓸 건 일부일 텐데 나머지 dead code 가 repo 를 무겁게 만듦.
