---
id: persona-a-jihoon-backend-senior
type: persona-analysis
persona: 박지훈 (Jihoon Park, 34, KR Backend Senior)
generated: 2026-05-27
sources_referenced:
  - md-show-me-prd.md
---

## 요약

- **누구**: 박지훈, 34세, KR 시리즈 B SaaS 결제 도메인 백엔드 시니어 (8년차)
- **AI 의존**: ★★★★☆ + Cursor/Claude Code 매일
- **핵심 pain 3가지**
  - 파일 단위 navigation 비효율 — 폴더-파일-스크롤 3단계 반복
  - grep "timeout" 23개 hit 후 일일이 까봐야 함 → 장애 회고 30분 손실
  - Claude 응답이 markdown wall of text 로 와서 다시 스크롤 루프
- **seed 가설 평가**: *YouTube/PPT 정보 밀도* = nuance (한 시야 비교는 검증, PPT 비유는 반박 — interactive 가 빠짐, Linear board 가 native). *AI 정리* = 검증 (단 출처 보이는 자동 정리 한정)
- **md-show-me 우선순위**: v1 primary (개발자 umbrella 1차)
- **읽는 가치**: PRD 의 *baseline 3* (N1 citation, N+5 back-link, copy-as-prompt) + *Linear board reference* + *interactive drilldown* 설계 근거

# 박지훈 — md-show-me 잠재 사용자 분석

## 1. 안녕, 나 박지훈

8년차 백엔드. 시리즈 B SaaS 결제 도메인. 회사는 30명, 엔지니어 12명. 매일 Cursor + Claude Code 로 개발하고 Linear 에서 티켓 굴린다. 카페인 의존도 ★★★★★, AI 의존도 ★★★★☆. 코드는 영어로 짜는데 사고는 한국어로 한다 — 그래서 ADR / handoff / 회의록은 다 한글+영어 짬뽕이다. Claude 한테 PR 설명 시키고, ADR 초안 시키고, post-mortem 시킨다. 좋다. 근데 *읽기* 가 안 따라온다.

## 2. 내 한 주 .md 흐름

월요일 standup 전에 Linear 보고 `docs/adr/` 폴더 훑는다. 우리 repo 에 ADR 47개, handoff 12개, API 스펙 23개, 회의록 60개+, post-mortem 9개. 이번 분기에 *내가 직접* 쓴 .md 만 18개. Claude 가 초안 쳐 준 게 그 중 14개.

막히는 사건 3개 — 첫째, 지난 화요일 PG 연동 장애 회고. "비슷한 케이스 전에 본 적 있는데" → `docs/post-mortem/` 9개 파일명만 봐서는 못 찾음. grep 으로 "timeout" 치면 23개 파일 hit, 다 까봐야 함. 결국 30분 날림. 둘째, 신입 온보딩. "우리 인증 결정 흐름 어디 적혀 있어요?" → ADR 4개 흩어져 있고 어떤 게 latest 인지 신입은 모름. 셋째, 분기 회고 준비. 3개월치 handoff + post-mortem 한 시야에 놓고 패턴 뽑고 싶은데 GitHub 에서 파일 12개 탭 띄우고 스크롤하다 포기.

현재 워크플로우 비효율의 본질 — *파일 단위 navigation*. 폴더-파일-스크롤 3단계가 매번 반복된다. Claude 한테 "post-mortem 중에 timeout 관련 추려줘" 하면 잘 하는데, 결과가 또 markdown wall of text 로 돌아온다. 다시 스크롤. 루프.

## 3. AI 글 피로 — 어떤 형태가 나를 안 읽게 하나

지친 패턴 톱3 — (a) **불릿 폭격**. Claude 가 "다음 5가지 관점에서 분석..." 으로 시작하면 닫는다. (b) **반복 헤딩 구조**. `## 개요 / ## 배경 / ## 분석 / ## 결론` 세트가 .md 마다 똑같이 나오면 어디서 본 글인지 구분이 안 됨. (c) **markdown wall of text** — 표 한 줄 없이 문단 8개 연속. 토큰 가격이 싸지니까 모델이 "장황 = 친절" 로 학습된 듯한데 *읽는 입장에서는 결정적 손해*.

내 정보 소비 진화 — 3년 전엔 노션 길게 썼다. 작년부터는 *Linear board* 처럼 한 시야에 카드 비교되는 게 가장 편함 (PPT 슬라이드 비유는 정적이라 반쯤 맞고 반쯤 부족 — *interactive* 가 빠짐). 핵심은 *한 시야에 비교 가능한 정보 밀도 + 클릭 drilldown*. 노션은 무한 스크롤이라 비교가 안 되고, .md 도 똑같다. 카드 그리드는 한 화면 = 한 단위 결정이 강제됨. 거기서 살아남는다.

## 4. 사용자 가설 검증

"YouTube/PPT 정보 밀도 선호" — *반은 맞고 반은 부족*. 진실 부분 = 한 시야 비교, 시각적 grouping, 페이지 단위 결정 강제. 부족 부분 = 나는 *interactive* 가 PPT 보다 중요. PPT 는 죽은 종이, .md → HTML 의 진짜 가치는 클릭으로 drilldown 되는 것. 내 native reference 는 **Linear board** (개발자 dashboard 톤) — 카드 grid + filter + status pill. 그래서 PRD 의 copy-as-prompt + back-link 컨셉이 정확히 내 갈증.

"정리된 거 보고 싶다" — 누가 정리하느냐가 핵심. *팀원이 정리* = 신뢰하지만 늦음. *내가 정리* = 안 함. *AI 가 한 번에 정리* = 의심됨 (환각 위험). PRD 의 baseline 3 중 N+5 source back-link 배지 + N1 citation 답변 카드가 이 의심을 정확히 깬다. **출처 보이는 자동 정리** 면 받아들임.

가설에서 빠진 것 — (1) *질의 시점 맥락*. 같은 repo 라도 월요일 아침 (전체 조망) vs 장애 대응 중 (특정 키워드 빠른 hit) 의 ideal 출력이 다르다. PRD 의 query-shaped 원칙이 이걸 어느 정도 잡지만, 사용자는 *자기 시점* 을 명시할 줄 모름. (2) *팀 공유*. 혼자 보는 HTML 도 좋은데 standup 에서 화면 띄우고 같이 보는 시나리오가 의외로 큼.

## 5. Ideal scenario 3개

1. **장애 대응 중** — `/show-me 결제 PG timeout 관련 과거 사례` → 9개 post-mortem 중 3개 카드 + 각 카드에 핵심 결정 1줄 + 원문 링크. baseline N1 + N+5 만으로 충분. 30초 안에 답.
2. **신입 온보딩 자료** — `/show-me 인증 시스템 결정 흐름 (ADR 기준)` → timeline 패턴 + ADR 4개 클러스터 + latest 표시. 신입한테 URL 던지면 끝.
3. **분기 회고** — `/show-me 지난 3개월 handoff 에서 반복된 pain` → cluster/표 패턴, 빈도 시각화, 인용. 회고 미팅 화면 공유용.

*없으면 안 쓰는 것* — (a) source back-link. 출처 못 누르면 못 믿음. (b) copy-as-prompt. HTML 본 다음 Claude 한테 follow-up 던지는 흐름이 끊기면 가치 반감. (c) zero install. 회사 노트북에 npm install 한 줄 더 추가하는 순간 슬랙 보안 채널 ping 옴.

## 6. Unmet needs

Cursor 의 `@docs` 는 파일 단위라 cluster 안 됨. Obsidian 의 그래프 뷰 — 예쁘지만 *질의* 단위가 아니라 *고정 vault* 단위. Notion AI — repo 밖이라 ADR 동기화 비용 큼. GitHub render — 한 파일만 봄. Perplexity — 외부 web 용, private repo 불가. 빈틈 = *내 repo 의 .md 를 질의 단위로 cluster + interactive 하게 보는 도구*. 이게 정확히 md-show-me 의 슬롯.

## 7. 디자인 선호

색 — 다크 모드 기본, monochrome + accent 1색 (회사 브랜드 따라). 화려하면 일주일 안 씀. 폰트 — 한글 Pretendard / 영문 Inter, 14~15px. 정보 밀도 — *PPT 한 슬라이드 분량 = 한 카드*. 카드 8개 넘으면 탭/필터로 접어야 함. 인터랙션 강도 — hover tooltip + click drilldown 까지. drag/resize 는 과함. 매일 보는 도구에서 *애니메이션 0.2초 이상은 피로*. 회사 보고서 톤 + 그래프 한두 개 + 출처 링크. 이게 살아남는 톤이다.
