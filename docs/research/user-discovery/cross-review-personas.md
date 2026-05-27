---
id: cross-review-personas
type: cross-review
reviewer: persona-cross-reviewer
reviewed:
  - persona-a-jihoon-backend-senior
  - persona-b-maya-fullstack-junior
  - persona-c-minho-tech-lead
  - persona-d-jiwon-designer-tech-adjacent
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**: 4명 공통 pain = 파일 단위 navigation 한계 + AI wall-of-text 거부 + citation 비협상 / 충돌 top 3 = PPT 비유(3/4 거부 → 폐기 권고) · editorial 품질 vs 정보 밀도 · 요약 vs raw 비중 / 가장 큰 gap = handoff 수신자 시나리오 부재
- **md-show-me 시사점**: v1 primary = 박지훈 (dogfooding + PRD baseline 1:1), v1.x = 민호, v2 = 지원. 민호 §3 "Bloomberg Terminal" 표현 정정 필요
- **읽는 가치**: 페르소나 우선순위 결정 + Tarik 정체성과 모노스페이스 톤 충돌 점검

# 페르소나 4종 cross-review

## 1. 공통 진실 (4명 모두 동의)

**Pain 공통**

- *파일 단위 navigation 의 한계*. 4명 모두 "여러 .md 를 한 시야에 못 놓고 매번 탭 5개 + Cmd+F" 라는 동일한 고통을 다른 어휘로 호소한다. 지훈 (PG timeout), Maya (auth 4 tabs), 민호 (gRPC 결정 history 15분), 지원 (ADR 1500단어 중 디자인 한 줄).
- *AI-generated wall of text 거부*. 똑같이 생긴 헤딩 패턴, 5-bullet shape, 출처 없는 매끈한 산문. 4명 다 "닫는다 / 못 믿는다 / 안 읽는다" 로 반응.
- *출처 (citation / source link) 가 신뢰의 비협상 조건*. 지훈은 "출처 못 누르면 못 믿음", 민호는 "citation 이 디자인의 1등 시민", Maya 는 "current vs historical marker", 지원도 raw markdown 으로 점프 가능해야 신뢰.

**디자인 원칙 공통**

- 다크 모드 / system sans / 색 최소 / 200ms 이하 인터랙션 / 카드 또는 표 기반 한 화면 단위.
- 단순 search 가 아니라 *query-shaped 응답* (관점 필터 + 출처 유지 + 재사용 artifact).

**모두 reject 하는 anti-pattern**

- 글머리표 폭격, 무지개 이모지, 그라데이션, 화려한 애니메이션, "AI 가 알아서 요약" 만 보여주고 원문 trace 깨는 것, npm install 추가 부담.

## 2. 충돌 영역 top 3

| 충돌 | A 지훈 | B Maya | C 민호 | D 지원 | 우선순위 권고 |
|---|---|---|---|---|---|
| **PPT 비유** | 부분 긍정 (한 시야 비교) | 거부 ("corporate training") | 위험 ("판단용 trace 가 본질") | 양날 (좋은 PPT 만 OK) | **PPT 비유 폐기**. 3/4 가 거부하거나 위험 신호. Linear board / Stripe docs 비유로 교체. |
| **editorial 시각 품질 vs 정보 밀도** | 회사 보고서 톤 | Linear/Vercel 대시보드 | Bloomberg 조밀 패널 | Stripe Press editorial | v1 = 정보 밀도 + 절제된 톤 (A/B/C 합의). v1.x 부터 editorial polish (D 흡수). 둘 다 *시각 풍부 HTML* 이라는 점은 같음. |
| **요약 vs raw 비중** | 카드 요약 + drilldown OK | 30초 스캔 우선 | 요약 의심, raw 인용이 본질 | jargon 풀어주는 요약 필요 | *요약은 짧게, 인용은 항상 옆에*. 민호 요구가 가장 엄격 — 이걸 만족하면 나머지 자동 만족. |

부수 충돌: 한글 Pretendard (A/C/D) vs Inter 우선 (B) — 다국어 토글로 흡수 가능, 충돌 아님.

## 3. Gap — 4명이 모두 놓친 시나리오

가장 큰 gap = **비동기 / 원격 팀의 handoff 수신자**. 4 페르소나 모두 *자기 repo 안에서 자기가 query 하는* 시나리오 중심이다. 그러나 PRD 의 copy-as-prompt + artifact 컨셉은 *남이 만든 HTML 을 내가 받아서 이어가는* 흐름에도 강력하다. 예: 오프쇼어 팀 / 신입 / 외부 컨트랙터가 *생성된 HTML 링크 하나만* 받고 컨텍스트 복원하는 시나리오. Maya 가 "신입 contractor 가 doc 4개 다 안 읽음" 으로 살짝 건드렸지만 *수신자 페르소나* 로 본격 다뤄지진 않음. 추가 페르소나 권고: **"E. 컨트랙터 / 오프쇼어 / 신입 — handoff 수신자"**. 단 v1 범위 우선순위는 낮음 — v2 expansion 검토.

부수 gap: OSS maintainer (외부 contributor 에게 docs 보여주기), CTO 급 임원 (월 1회 high-level scan) — 둘 다 v2 후순위.

## 4. Terminal / monospace 톤 정정 — 잘못 표현된 곳

검토 결과 **2 군데** 가 *aesthetic 차원* 으로 모노스페이스/터미널 톤을 흘리고 있음 (Tarik 정체성 = 시각 풍부 인터랙티브 HTML 과 충돌).

- **persona-c 김민호, §3 마지막 줄**: *"Bloomberg Terminal 같은 조밀한 정보 패널"*. Bloomberg Terminal 은 모노스페이스 wall + 터미널 미감 연상. 의도는 "조밀한 정보 + 클릭 raw source drilldown" 인데 비유가 잘못. **정정 권고**: *"조밀한 dashboard (Linear 결재 큐 + Stripe docs 인용 패널) — 시각 위계와 인터랙티브 카드로 traceability 표현"* 으로 대체. 모노스페이스는 *source 파일명 / 라인 번호 / 식별자* 같은 semantic 용도만 살림 (이미 §6 에 그렇게 적혀 있음 — 일관성 회복).
- **persona-d 이지원, §5 GitHub README 줄**: *"monospace + 영어 + 코드블록 = 진입장벽 max"*. 이건 *부정적* 맥락이라 Tarik 정체성과 충돌 없음 — 오히려 모노스페이스 wall 거부를 강화. **정정 불필요**.

persona-a 지훈, persona-b Maya 에서는 monospace/terminal aesthetic 표현 없음. 지훈 §7 의 "회사 보고서 톤" 은 *절제된 시각 디자인* 의 의미로 읽힘 (PPT/대시보드 맥락) — Tarik 의 풍부한 HTML 과 호환. 단 표현이 오해 소지 있으니 §6 정정 항목에 보완 권고.

## 5. 타겟 우선순위 권장

- **v1 primary = 지훈 (A)**. 근거: ① dogfooding 가능성 최고 (개발자 본인이 .md 자주 다루고 Claude Code 사용자), ② unmet need 가 정확히 PRD baseline 3 (N1 citation 카드 + N+5 back-link) 와 1:1 매칭, ③ 디자인 합의 용이 (절제된 카드 + 출처 = 다른 3명과 충돌 없음).
- **v1.x adjacent = 민호 (C)**. traceability / 교차 참조는 지훈 요구의 상위집합. 지훈 만족 → 민호 일부 자동 만족. 추가로 결정 status dot, A4 프린트, citation 1등 시민 처리만 얹으면 됨.
- **v2 expansion = 지원 (D)**. editorial quality / jargon 풀이 / 관점 필터는 *시각 품질 + LLM 요약 깊이* 양쪽이 v1 코어 안정된 후에야 안전. Maya (B) 는 v1 에서 "기능적으로 만족" 하지만 *팀 Slack 에 공유* 까지 가려면 D 의 editorial 수준 필요 — D 와 함께 v2.
- **Maya (B) 는 v1 secondary validation**. 키보드 shortcut / 다크 모드 / command palette 만 챙기면 v1 에서도 만족도 충분. 다만 "AI curates" 마케팅 어조는 그녀 cohort 에서 negative — *outcome 우선 (find the thing fast) 메시징* 권고.

## 6. 페르소나 docs 정정 권장 사항 (직접 수정 X, 보고만)

- **persona-a 지훈, §7**: "회사 보고서 톤" → 오해 소지. *"절제된 editorial 톤 (Linear / Stripe docs 수준의 시각 위계 + 카드 인터랙션)"* 으로 보완.
- **persona-b Maya**: 정정 없음. cohort 어조 ("AI curates 마케팅 negative") 는 PRD 메시징 가이드로 흡수.
- **persona-c 민호, §3**: "Bloomberg Terminal" 비유 교체 (위 §4 참조). 의도는 보존, aesthetic 만 정정.
- **persona-d 지원**: 정정 없음. editorial / typography hero / 여백 강조는 Tarik 정체성과 정합. v2 흡수 대상.

전체 페르소나가 *Tarik 의 풍부한 인터랙티브 HTML* 방향과 정합 — 명시적 충돌은 민호 §3 한 줄뿐. 시각 풍부함의 *수준* 만 페르소나별로 다름 (절제 ↔ editorial), 그것은 v1 → v2 단계 차이로 해소.
