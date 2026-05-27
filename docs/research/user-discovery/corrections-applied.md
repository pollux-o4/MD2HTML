---
id: corrections-applied
type: report
generated: 2026-05-27
source: persona-validity-review-9 §8 의 5개 권고 처리
---

## 요약

- **5 권고 처리 결과**
  - 권고 1 (수민·지수 현실성) — 수민 *10% 미만/디버그 경험*, 지수 *졸논 Word + 인턴/조별/학회 PPT* 분업 정정
  - 권고 2 (유나 vs 지원 통합) — *분리 유지* (수신자 vs 생산자 mismatch). 지원 v1 secondary, 유나 v1.x adjacent
  - 권고 3 (Bloomberg Terminal) — 민호 §3 → *조밀한 dashboard (Linear 결재 큐 + Stripe docs 인용 패널)*, 잔존 1건 교체
  - 권고 4 (v2 우선순위) — `v2-personas-roadmap.md` 신규 작성 (handoff > academic > OSS)
  - 권고 5 (PPT/YouTube → 4갈래) — 9 페르소나 §3 을 editorial / 데이터 viz / 짧은 social / 백과사전 4갈래로 교체·보강
- **수정 파일 수 + 신규 파일 수**: 수정 8개 (서연 §3 포함) + 신규 1개 (`v2-personas-roadmap.md`)
- **주요 추가 발견 2~3개**
  - 개발자 cohort (지훈/Maya/민호) 는 4갈래 밖 *Linear board / dev dashboard* 가 native → PRD reference 어휘에 5번째 갈래 명시 권고
  - 4갈래 집계: editorial 3명, 짧은 social 4명, 백과사전 2명, 데이터 viz 2명 — *짧은 social* 이 최다 — v1 산출물의 thread-able / screenshot-able 검증 필요
  - 유나↔지원 분리 가치는 표면 디자인 선호 90% 중복에도 *.md 관계 자체가 반대* (read-only vs AI 코드 닿음) 라는 구조적 차이에서 옴

# 9 페르소나 validity 권고 5건 — 정정 결과 보고

## 1. 정정 위치 / 내용 요약

**권고 1 (수민·지수 현실성)** — 수민 도입부 *"손으로 친 줄 한 줄도 없는"* → *"손으로 친 비율 10% 미만, 디버그/한 줄 수정 경험은 있음"*. 지수 도입부 + §1 에 *졸논은 글 50p Word 작업, PPT 는 인턴쉽 + 조별과제 + 학회 발표* 분업 명시.

**권고 3 (Bloomberg Terminal)** — 민호 §3 → *"조밀한 dashboard (Linear 결재 큐 + Stripe docs 인용 패널)"* 교체. 9 페르소나 전체 grep 결과 잔존 *민호 §3 1건* (지원 §5 monospace 표현은 부정 맥락이라 불필요). 신규 5종 깨끗.

**권고 5 (PPT/YouTube → 4갈래)** — 9 페르소나 §3 비유 사용 위치를 *editorial / 데이터 viz / 짧은 social / 백과사전* 4갈래로 교체·보강. 본인 PPT 사용자 지수는 PPT 보존 + Shorts/Reels + Wikipedia 추가. 도윤 §1 *"1인 SaaS 3개 운영"* → *"운영 1개 + 방치 prototype 다수"*.

**권고 4 (v2 우선순위)** — `v2-personas-roadmap.md` 신규 작성.

수정 파일 8개 (서연 §3 포함) + 신규 1개. 전부 atomic — 의미만 정정, 구조·길이 보존.

## 2. 권고 2 (유나 vs 지원) — 권고

**분리 유지.** 표면 디자인 선호 (Pretendard / editorial restraint / 다크-라이트 양립) 는 90% 중복이나 *.md 관계 자체* 가 반대. 지원 = engineering docs 수신자 (read 만), 유나 = AI .md 생산자 겸 망각자 (코드까지 닿음). 통합 시 *"디자이너 = read-only"* 또는 *"디자이너 = AI 코드"* 한쪽으로 환원되어 신호 손실. 단 validity 의 "분리 가치 낮음" 도 일부 동의 → v1 secondary 는 지원 1명, 유나는 v1.x adjacent 로 보존 (validity §5 와 일치).

## 3. 권고 5 — 4갈래 reference × 9 페르소나 매핑

| 페르소나 | editorial | 데이터 viz | 짧은 social | 백과사전 | 1차 native |
|---|---|---|---|---|---|
| 지훈 (백엔드) | ☆ | ☆ | — | — | *Linear board* (dev dashboard, 4갈래 밖) |
| Maya (풀스택 주니어) | ☆ | ☆ | ★ | ☆ | *Linear board* + 짧은 social |
| 민호 (tech lead) | ☆ | ☆ | — | ★ | *조밀한 dashboard* (Linear + Stripe docs) |
| 지원 (디자이너) | ★ | ★ | — | — | editorial + 데이터 viz |
| 도윤 (indie hacker) | ☆ | — | ★ | — | 짧은 social + Notion gallery |
| 유나 (디자이너 vibe) | ★ | ★ | ☆ | — | editorial + 데이터 viz |
| 수민 (학생 vibe) | — | ☆ | ★ | ☆ | 짧은 social (TikTok/Reels/Insta) |
| 서연 (마케터 비코더) | ★ | ☆ | ☆ | ★ | editorial + Wikipedia |
| 지수 (인문 학부생) | ☆ | ☆ | ★ | ★ | 짧은 social + Wikipedia (+ PPT 본인 산출) |

(★ 1차, ☆ 부분, — 거의 안 봄)

집계: editorial 3명 (지원/유나/서연), 짧은 social 4명 (Maya/도윤/수민/지수), 백과사전 2명 (서연/지수), 데이터 viz 2명 (지원/유나). 개발자 cohort (지훈/Maya/민호) 는 4갈래 밖 *dev dashboard* 가 native — PRD reference 어휘에 *"Linear board"* 를 5번째 갈래로 명시 권고.

## 4. 권고 4 — v2 페르소나 3개 1줄 정의

1. **handoff 수신자** (1순위) — 남이 만든 HTML/.md cluster 받아 *컨텍스트 복원* 하는 사람. *링크만 던지면 끝* 이 PRD artifact 재사용성 hard test.
2. **연구자 / academic** (2순위) — 누적 long-form .md 를 *교차 참조* 해 결론 빚는 사람. 민호 메커니즘과 동형, citation density 가 provenance UI 검증에 ideal.
3. **OSS maintainer** (3순위) — repo .md cluster 를 *외부 contributor* 에게 보여줘 기여 friction 낮추는 사람. v2-1 의 *제공자 측* 페어. i18n/라이선스 비용으로 3순위.

상세 근거 / 트리거는 `v2-personas-roadmap.md`.
