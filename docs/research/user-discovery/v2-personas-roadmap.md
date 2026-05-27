---
id: v2-personas-roadmap
type: roadmap
generated: 2026-05-27
source: persona-validity-review-9 §6, §8
---

## 요약

- **v2 페르소나 3명 우선순위**: handoff 수신자 > 연구자/academic > OSS maintainer
- **각 1줄 정의**
  - handoff 수신자 — 남이 만든 HTML/.md cluster 를 처음 받아 *컨텍스트 복원* 하는 사람 (오프쇼어 엔지니어/신입/외부 컨트랙터/인수인계 PM)
  - 연구자/academic — 누적 long-form .md (논문 메모, 리서치 노트, lit review) 를 *교차 참조* 해 단일 결론 빚는 사람
  - OSS maintainer — 자기 repo .md cluster 를 *외부 contributor* 에게 보여줘 *기여 friction* 낮추려는 사람
- **v1 에서 빠진 이유**: 9 페르소나 전원이 *자기가 query 던지는* 시점만 다루고, 수신자/교차참조 누적/외부 공개 시점은 부재 + i18n·라이선스 등 추가 UI 비용
- **언제 v2 launch**: v1 dogfood 4주 + back-link/copy-as-prompt/provenance stable + handoff 수신자 *링크만으로 컨텍스트 100% 복원* 가능한 baseline 도달 시

# v2 페르소나 확장 로드맵

## 1. 배경

9 페르소나 (지훈/Maya/민호/지원/도윤/유나/수민/서연/지수) 가 *자기 query 시점* 에 집중. validity review §6 이 식별한 *gap* 6개 중, v2 진입 우선순위 **3개** 를 확정한다.

선정 기준:
- (a) v1 surface (개발자 umbrella 1차 + 도윤/지원 보조) 와 *입구가 호환* 인가
- (b) PRD baseline (markdown source + HTML artifact + back-link) 의 *재사용성* 이 큰가
- (c) 9 페르소나가 *못 보는* 사용 시점인가

## 2. v2 페르소나 3개 — 우선순위 순

### v2-1. handoff 수신자 (최우선)

*1줄 정의*: **남이 만든 HTML / .md cluster 를 처음 받아서 컨텍스트를 *복원* 해야 하는 사람** — 오프쇼어 엔지니어, 신입, 외부 컨트랙터, 인수인계받은 PM.

*우선순위 1위 이유*:
- 9 페르소나 전원이 *자기가 query 던지는* 시점만 다룸 — 수신자 시점 완전 부재
- md-show-me 의 *artifact 재사용성* (back-link, copy-as-prompt) 이 가장 강력하게 검증되는 use case — *링크 던지면 끝* 이 hard test
- v1 surface 와 *동일 입구* (URL 받고 클릭) — 추가 UI 비용 0
- Maya §2 의 "신입 컨트랙터에게 doc 링크 4개 보냈더니 다 안 읽음" 이 정확히 *수신자 실패* 사례 → v1 도그푸드 자연 연결

### v2-2. 연구자 / academic (2순위)

*1줄 정의*: **장기간 누적된 long-form .md (논문 메모, 리서치 노트, lit review) 를 *교차 참조* 해서 단일 결론을 빚는 사람** — 대학원생, 박사, 인디 리서처.

*우선순위 2위 이유*:
- 지수 (학부생 PPT) 가 비슷한 영역 건드리나 *결과물* (PPT) 과 *시점* (학기 단위) 이 mismatch — 진짜 academic workflow 부재
- 민호 (tech lead) 의 *교차 참조 + traceability* pain 과 *동일 메커니즘* — PRD 의 N1/N+5 baseline 이 그대로 적용됨
- *citation density* 가 높아 provenance UI 검증에 ideal cohort
- v1 sweet spot 밖이지만 v1.x editorial polish 후 자연 진입 가능

### v2-3. OSS maintainer (3순위)

*1줄 정의*: **자기 repo 의 .md cluster (CONTRIBUTING, ADR, RFC, issue templates) 를 *외부 contributor* 에게 보여주고, *기여 진입 friction* 을 낮추려는 사람**.

*우선순위 3위 이유*:
- 도윤 (indie hacker) 이 일부 건드리나 *외부인을 위한 시점* 부재 — 도윤은 자기만 봄
- *공개 HTML artifact* 라는 PRD 의 잠재 확장 (외부 URL share) 검증 cohort
- v2-1 (handoff 수신자) 의 *제공자 측* 페어 — 짝으로 같이 검증하면 양쪽 가치 같이 잡힘
- 단, OSS 시장 자체가 좁고 영어 default — i18n / 라이선스 표시 등 *별도 UI 비용* 발생 → 3순위

## 3. v2 제외 / 보류

- **비영어/비한국어 사용자** (일본/동남아) — v2 진입 전 i18n 인프라 선행 필요. v3 후보.
- **접근성 (색맹/시각보조)** — *별도 페르소나가 아니라 v1 디자인 결정에 보조 페르소나로 포함* 권고. 신규 페르소나 doc 불필요, 디자인 review 단계에 checkpoint 삽입.
- **팀 leader 강제 도입 (org adoption)** — 민호의 자연 확장이지만 *enterprise sales 시점* 까지 보류.

## 4. v1 → v2 진입 트리거 조건

- v1 dogfood (개발자 umbrella + 도윤/지원) 4주 사용 완료
- back-link / copy-as-prompt / provenance 표시 stable
- handoff 수신자 사용 시 *링크만 받고 컨텍스트 100% 복원* 가능한 baseline 도달

이 셋 충족 후 v2-1 (handoff 수신자) 우선 검증 → 통과 시 v2-2/v2-3 병렬 또는 순차.
