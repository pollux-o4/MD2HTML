---
id: persona-validity-review-9
type: cross-review
reviewer: 9-persona-validity
reviewed: 9 personas
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - 9 페르소나 (개발자 3 / 디자이너 2 / 바이브코더 3 / 비개발자 2) — 표면 다양성 풍부하나 코어 pain 은 4~5 cluster 로 수렴, 9명 전원 공통 = AI verbose 거부 + 파일 navigation 한계 + citation 신뢰
  - 가장 단단한 umbrella = **개발자 (지훈/Maya/민호)** — dogfood + 디자인 합의 강. 바이브코더는 내부 충돌 큼, 비개발자는 .md 접촉 빈도 약함
  - 현실성 의심 2명 = 수민 ("코드 1줄 없음" 극단)·지수 (인문학생 PPT) — 세대 시그널 유지하되 톤다운 권고
- **md-show-me 시사점**: PPT/YouTube 비유는 6/9, 5/9 가 거부 — **Linear board / Stripe-Pudding / 인스타 carousel / 브런치 매거진** 4 갈래 reference 로 교체
- **증거 강도 / 한계**: 9 페르소나 내부 분석은 깊으나, 모두 self-query 시점만 — handoff 수신자/OSS maintainer/접근성/연구자 시나리오 gap
- **읽는 가치**: v1/v1.x/v2 페르소나 계층화 결정, PRD 의 PPT/YouTube 비유 제거 여부 결정할 때

# 9 페르소나 타당성 종합 검토

## 1. 개요

총 9 페르소나 — 개발자 3 (지훈/Maya/민호), 디자이너 2 (지원/유나), 바이브코더 3 (도윤/유나*/수민), 비개발자 2 (서연/지수). *유나는 디자이너+바이브코더 양쪽 중복. 표면 다양성은 풍부하나 *코어 pain* 은 4~5개 cluster 로 수렴한다. 9명 전원이 "AI 산출물 verbose 거부", "파일 단위 navigation 한계", "출처/provenance 신뢰" 를 다른 어휘로 동일 호소. 반면 *시각 톤*, *공유 매개*, *.md 직접 접촉 빈도* 에서 강한 충돌 발생. 현실성 의심 페르소나 2명 (수민, 지수) — 캐리커처 위험 있으나 *세대 시그널* 로는 보존 가치. 권고: umbrella primary 1개 + specific 2~3개 계층화.

## 2. 현실성 점검

- **지훈** (KR 백엔드 시니어) — *현실성 ★★★★★*. KR series-B SaaS 시니어의 typical workflow. 정합.
- **Maya** (US 풀스택 주니어) — *★★★★★*. SF Cursor+Notion+Linear stack, "AI curates 마케팅 negative" cohort 시그널 모두 현실 시장 데이터와 일치.
- **민호** (KR tech lead) — *★★★★☆*. 한국 임원 보고 + A4 프린트 + 주 30~50 .md 검토 모두 plausible. *Bloomberg* 표현만 잔존 (§7 참조).
- **지원** (KR 디자이너+테크인접) — *★★★★☆*. 핀테크 디자이너의 engineering docs friction 정확. design system 영향 필터는 dogfood 가치 있음.
- **도윤** (KR indie hacker) — *★★★☆☆*. *1인 SaaS 3개 운영* 은 인디 해커 통계상 가능하나 흔치 않음 (대부분 1개 운영도 풀타임). 다만 "side project 3 repo + PRD 12 개 적체" 는 매우 현실적 — *운영* 보다 *방치된 prototype 다수* 가 정확한 묘사일 듯. 페르소나 도입부의 "운영" 워딩만 조심.
- **유나** (KR 디자이너 → 바이브코더) — *★★★★☆*. v0/Figma 전환 디자이너 cohort 는 2024~25년 빠르게 증가, 현실성 정합. 단 지원과 *디자인 톤 선호가 거의 동일* (Pretendard / restraint / editorial) — 둘 분리 가치 검토 필요.
- **수민** (KR 학생 vibe coder) — *★★☆☆☆*. "*직접 짠 코드 1줄 없는*" 학생이 GitHub repo 47개 보유 = *극단 케이스* 로는 존재하나 비율은 낮음 (대부분 학생은 과제로라도 손코딩 경험 있음). 다만 *세대 시그널* (TikTok 정보 밀도, AI 글 회피 default) 자체는 정확. 권고: "코드 1줄도 없는" 워딩을 *"손으로 친 비율 10% 미만"* 정도로 톤다운하면 신빙성 ↑.
- **서연** (KR 비개발자 마케터) — *★★★★☆*. 한국 시니어 마케터의 정보 소비 (브런치/Stibee/Notion) 정합. ".md 직접 접촉 연 5회 미만" 자기 평가가 정직 — *완전 무관 가능성 명시* 가 오히려 신뢰도 ↑.
- **지수** (KR 인문계 학생 PPT 메이커) — *★★☆☆☆ (의심 ↑)*. 사회학과 4학년 *졸업논문 시기* 의 핵심 산출물은 *논문 (글)*, PPT 는 발표 1회 부속물. 논문 작성을 안 다루고 PPT 만 강조한 게 부자연스러움. 두 가지 해석: (a) 인턴쉽 + 조별과제 + 졸논 발표 모두 합치면 학기 중 *PPT 빈도는 실제로 가장 높음* — 그렇다면 OK. (b) "PPT 사용자" 페르소나가 필요해서 직업/시기 어색하게 끼워맞춤 — 그렇다면 *졸업유예/조교/마케팅 사원 1년차* 등 PPT 가 진짜 main 인 직업으로 교체 권고.

현실성 *의심 2명* (수민, 지수) 모두 *Z세대 시그널* 자체는 유효 → 페르소나 자체 폐기보다 *프로필 미세 조정* 권고.

## 3. 일관성

**공통 진실 top 5 (9명 동의)**

1. AI 산출물 verbose / wall of text 거부 — 표현만 다름 (지친다 / 안 읽는다 / 시각이 못생겼다 / 슬라이드에 못 옮긴다)
2. 출처/provenance 가시성이 신뢰의 1차 게이트 — 개발자는 citation, 바이브코더는 *내가 쓴 것 vs AI 가 쓴 것* 분리, 비개발자는 *사람 손길 흔적*
3. 파일/페이지 단위 navigation 실패 — repo 든 Notion 이든 GitHub 든 동일
4. 한 시야 비교 가능 단위 (카드/표/그리드) — 표현은 다양 (Linear board / 인스타 carousel / PPT 1장 / Stripe docs)
5. 시각 품질이 신뢰로 직결 — 못생기면 정확해도 안 씀 (9명 전원)

**core 충돌 top 3**

| 충돌 | 진영 A | 진영 B | 해소 방향 |
|---|---|---|---|
| 다크모드 default | 지훈/Maya/민호/도윤/유나/수민 (6명, 개발자+바이브코더) | 서연/지수 (라이트 default), 지원 (둘 다 high quality) | 다크 default + 라이트 동급 품질 — 비개발자 분기에서 라이트 우선 노출 |
| editorial polish 수준 | 지훈/민호/Maya (절제, 정보 밀도 우선) | 지원/유나/서연 (Stripe Press / 브런치 톤 필수) | v1 = 절제된 baseline, v1.x = editorial 풍부화 (이전 cross-review 와 동일 결론) |
| .md 접촉 빈도 | 개발자 3 + 민호 (주 30~50개 검토) | 서연/지수 (연 5회 미만, .md 가 뭔지 모름) | 비개발자에게 ".md" 워딩 노출 금지, *"내 자료/링크 던지면 한 페이지"* 입구 필요 |

**seed 가설 ("AI 글 지친 / YouTube-PPT 밀도 / 정리") 9명 통합 평가**

- *"AI 글 지친"* — 9/9 동의. 단 *지친 결* 다양: 검토 피로 (개발자/lead), 시각 거부 (디자이너), 자기 책임 흔적 (바이브코더), 처음부터 안 읽음 (학생), 마케터의 "AI 냄새" 감지.
- *"YouTube/PPT 정보 밀도"* — *부분 폐기 권고*. PPT 비유 거부 6/9 (Maya/민호/지원/도윤/유나/서연), YouTube 도 5/9 거부 (도윤/유나/수민/서연/지수). 더 정확한 비유: **Linear board (개발자) / Stripe-Pudding editorial (디자이너) / 인스타 carousel-Twitter thread (Z세대/바이브코더) / 브런치-Substack 매거진 (비개발자)**. 4 갈래 reference 의 *공통 추상* = "한 시야에 카드/유닛 비교 가능 + 시각 위계 있음" — 이걸 PRD 언어로 채택 권고.
- *"정리된 거"* — 9명 모두 동의, 단 *정리의 정의* 다름: 개발자 = 구조/cluster, 디자이너 = 시선 경로, 바이브코더 = provenance 분리, 비개발자 = 사람 손길 + 시각 품질.

## 4. Umbrella segmentation

| Umbrella | 포함 | 공통 pain 강도 | 디자인 합의 | sweet spot |
|---|---|---|---|---|
| **개발자 umbrella** | 지훈/Maya/민호 | ★★★★★ | ★★★★☆ (절제+citation 합의, Inter vs Pretendard 만 분기) | **매우 단단** — md-show-me 의 dogfood 위치 |
| **바이브코더 umbrella** | 도윤/유나*/수민 | ★★★☆☆ | ★★☆☆☆ (유나=editorial restraint, 수민=네온/playful, 도윤=screenshot-able) | 약함 — *시각 톤* 충돌 큼. *공통 = "AI 가 만든 내 흔적 망각" + "공유 가능성"* 만 묶임 |
| **디자이너 umbrella** | 지원/유나 | ★★★★☆ | ★★★★★ (Pretendard/Inter, editorial, 다크/라이트 양립, 여백) | 단단하나 *규모 작음* — 디자이너만의 전용 use case 비협상 |
| **비개발자 umbrella** | 서연/지수 | ★★★☆☆ | ★★★☆☆ (라이트 default, editorial, 브런치 톤) | 약함 — *.md 접촉 빈도 자체가 낮음*, 입구 워딩 + UI 가 완전히 달라야 함. v1 sweet spot 아님 |

가장 단단한 umbrella = **개발자 (3명, dogfood, 디자인 합의 ↑)**. 바이브코더는 *내부 충돌* 큼, 비개발자는 *접촉 빈도 자체* 가 약함.

## 5. 재구성 권고

```
v1 primary (umbrella)
  • 개발자 umbrella — 지훈/Maya/민호 (dogfood, 합의 단단, PRD baseline 1:1)

v1 secondary (specific)
  • 도윤 (바이브코더 indie hacker) — provenance + screenshot-able 검증 cohort
  • 지원 (디자이너 tech-adjacent) — editorial polish + 관점 필터 dogfood

v1.x adjacent
  • 민호 (tech lead) — 이미 primary 안에 흡수, A4 프린트만 추가 검증
  • 유나 (디자이너 바이브코더) — 지원과 거의 동일, 분리 가치 낮음. v1.x 에서 *디자이너 cohort 확장 신호* 로만 보존

v2 expansion
  • 수민 (Z세대 학생) — GitHub repo 망각 + 인스타 sharing surface, *공유 가능성 metric* 검증용
  • 서연 (비개발자 마케터) — 라이트 default + 브런치 톤 분기 ready 후 진입

out of scope (v1)
  • 지수 (인문계 학생 PPT) — 페르소나 자체 재정의 필요 + .md 접촉 0 + PPT 결과물 요구는 별도 도구 영역 (Beautiful.AI / Gamma). md-show-me 의 sweet spot 밖
```

근거 1~2줄 each:
- *개발자 umbrella primary*: 3명이 합의된 pain + 디자인 + dogfood 가능 = 가장 빠른 검증.
- *도윤 secondary*: 바이브코더 cohort 중 가장 안정적, "AI 가 만든 내 흔적" pain 이 PRD provenance 와 정확 매칭.
- *지원 secondary*: editorial polish baseline 이 v1.x 진입 게이트, *관점 필터* dogfood 가치.
- *유나 adjacent (not secondary)*: 지원과 디자인 선호 90% 중복, 별도 추적 가치 낮음.
- *수민/서연 v2*: 각자 cohort 시그널 강하나 v1 surface 와 입구 워딩이 너무 다름.
- *지수 out*: 결과물 요구 (PPT 시각화) 가 md-show-me 의 HTML 산출과 mismatch, 페르소나도 재정의 필요.

## 6. Gap 식별

9 페르소나가 모두 놓친 시나리오/사용자:

1. **handoff 수신자** (이미 이전 cross-review 지적) — 오프쇼어/신입/외부 컨트랙터. 9명 전원이 *자기 query* 시점만 다룸. *남이 만든 HTML 받아서 컨텍스트 복원* 시나리오 부재. *v2 페르소나 후보*.
2. **OSS maintainer + 외부 contributor** — 외부인에게 docs cluster 보여주기. 도윤이 부분적으로 건드리나 OSS 운영자 시각 부재.
3. **비영어/비한국어 사용자** — 9명 전원 KR/EN. 일본 (lead 시장 인접) / 동남아 (영어 비원어민 dev) 부재. *입구 워딩 i18n* 검토 시점에 필요.
4. **접근성 (색맹/시각보조)** — 9 페르소나 모두 정상 시력 가정. 색 dot 으로 status 표현 (민호) 같은 결정에 색맹 8% 영향 고려 부재. *디자인 결정 단계* 에서 보조 페르소나 필요.
5. **팀 leader 가 팀에 강제 도입** — 민호가 *자기 사용* 시점만 보고 *부하 직원에게 배포* 시점 없음. organization adoption 시나리오 부재.
6. **연구자/academic** (논문 정리) — 지수가 비슷한 영역 건드리나 *학부생 발표용* 이지 *대학원생/박사/연구자* 의 long-form 논문 워크플로우 부재. v2 expansion 가치 있음 (지수 대체 후보).

권고: v1 범위에선 위 gap 다 보류. *v2 expansion 단계에서 handoff 수신자 1명 + 연구자 1명* 추가 검토.

## 7. terminal/Bloomberg follow-up scan 결과

이전 cross-review 가 정정 권고한 **민호 §3 "Bloomberg Terminal"** 표현 — *원문 그대로 잔존* (수정 X, 권고만 했으므로 정상). 9 페르소나 전체 재스캔:

- **민호 §3**: *"Bloomberg Terminal 같은 조밀한 정보 패널"* — 잔존 1건. 권고 동일 유지 (조밀한 dashboard / Linear+Stripe 인용 패널로 대체).
- **지원 §5**: *"monospace + 영어 + 코드블록 = 진입장벽 max"* — 부정 맥락, 정정 불필요.
- **지훈/Maya/도윤/유나/수민/서연/지수**: monospace/terminal aesthetic 표현 없음. 깨끗.

잔존 표현 *총 1건* (민호 §3). 신규 페르소나 5종 (도윤/유나/수민/서연/지수) 에서는 *terminal 톤 표현 0건* — Tarik 정체성 (시각 풍부 인터랙티브 HTML) 과 정합 유지.

## 8. 종합 권고 — 사용자가 다음 결정해야 할 5개

1. **개발자 umbrella primary 채택 여부** — 1명 추상 페르소나로 통합? 아니면 3명 그대로 유지? (권고: 추상 1개 + 3 specific 보조)
2. **수민/지수 페르소나 재정의 또는 폐기 판단** — Z세대 시그널 유지하되 *덜 극단적인 케이스* 로 다시 쓸지 결정.
3. **유나 vs 지원 통합 여부** — 디자인 선호 90% 중복, 분리 가치 검토.
4. **v2 페르소나 추가 우선순위** — handoff 수신자, 연구자, OSS maintainer 중 어느 것 먼저.
5. **PPT/YouTube 비유 PRD 에서 제거 여부** — 6/9, 5/9 가 거부. *Linear board / Stripe-Pudding editorial / 인스타 carousel / 브런치 매거진* 4 갈래 reference 로 교체 검토.
