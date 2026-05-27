---
id: academic-gap-scoping
type: scoping
generated: 2026-05-27
reviewed_docs: 6
---

## 요약

- **핵심 발견 3가지**:
  - 추가 학술 영역 10 후보 평가 결과 — 10 중 2~3 만 새 agent 호출 가치, 나머지는 기존 6 docs (Tufte/Mayer/Sweller/Cleveland/Paivio/Karpicke/Wittrock/Piepenbrock) 와 중복 또는 적용성 약함
  - **Top 1 = 행동경제학/의사결정 과학** (Kahneman, Iyengar choice overload, Thaler default effect) — selector 후보 수, copy-as-prompt default 동작에 직접 영향
  - **Top 2 = HCI/Interaction design 학술** (Fitts, Hick, Norman affordance, Shneiderman) — 인터랙티브 HTML 의 버튼/affordance/clickability 에 직접 영향
- **md-show-me 시사점**: 추가 호출은 행동경제 + HCI 2 agent + 언어학 보조 1 — 그 외 (뇌과학/교육공학/dataviz 학술/시각의학/협업문서) 는 호출 불요
- **증거 강도 / 한계**: 자기 비평으로 XAI / PKM 학술 계보 (Memex→Engelbart→Luhmann) 가능성 언급 — 도구 방향성에 따라 격상 가능
- **읽는 가치**: 추가 리서치 agent 호출 ROI 결정할 때, 어떤 학문이 design 결정에 *직접* 영향 미치는지 판단할 때

# 학술 도메인 gap scoping — md-show-me

## 1. 개요

이미 다룬 영역 6개 (정보 밀도 / 인지·시각·메모리·전이 / 색·타이포 / 웹 empirical / AI 피로 담론) 가 *Tufte–Mayer–Sweller–Cleveland–Paivio–Karpicke–Wittrock–Piepenbrock* 라인을 두텁게 커버한다. 본 문서는 *그 라인이 닿지 않는* 학문 영역 10 후보를 평가해, 추가 리서치 호출 가치를 ROI 기준으로 골라낸다. 결론 미리보기 — *10 중 2~3 만 새 agent 호출 가치*. 나머지는 (a) 기존 docs 와 중복 (b) 적용성 약 (c) 도구 결정에 직접 영향 X.

## 2. 후보 10영역 평가

| # | 영역 | 적용 가능 | 기존 중복 | 가치 | 호출? |
|---|---|---|---|---|---|
| 1 | 뇌과학 / 신경과학 (fMRI reading, dopamine novelty) | 약 | 중 (Wolf 2018 deep reading 회로 이미 인용) | 낮음 — 디자인 결정에 *직접* 영향 약, 비유 수준 | N |
| 2 | 행동경제학 / 의사결정 (Kahneman, choice overload, default effect) | **강** | **약** (Cowan chunk 한계는 다루나 *선택 수* 자체는 미커버) | **높음** — `/show-me` selector 가 후보 view 몇 개 제시할지, copy-as-prompt 의 default 동작 등 직접 영향 | **Y** |
| 3 | HCI / Interaction design 학술 (Fitts, Hick, Norman, Shneiderman) | **강** | **약** (web density 와 visual 인코딩은 다루나 *클릭/조작* 학술은 미커버) | **높음** — 인터랙티브 HTML 의 버튼 크기·hover 행동·collapsible 임계점에 직접 영향 | **Y** |
| 4 | 언어학 / 인지언어학 (relevance theory, 한국어 readability, 한/영 코드스위칭) | 중 | 약 (Pretendard 자간만 다룸, *문장 처리* 차원 미커버) | 중 — 한국어 사용자의 reading load 정량화에 도움. 단 직접 도구 결정에 영향은 *간접* | Y (낮은 우선) |
| 5 | 교육공학 / instructional design (Gagné, ARCS, microlearning) | 약 | **강** (Mayer / Sweller / Wittrock / Karpicke 이미 충분) | 낮음 — 90% 중복 | N |
| 6 | 사회심리 / 신뢰 (source credibility, AI trust 최근) | 중 | 중 (`web-ai-content-fatigue` 가 AI 피로는 다루나 *신뢰 형성* 학술 부재) | 중 — citation card 디자인 / "AI 가 부풀린 것 같음" 표시의 정당성에 영향. 단 *디자인 결정* 자체엔 보조 | N (gap 작음) |
| 7 | 데이터 시각화 학술 (Brewer 색계, Bateman chartjunk, Heer animation) | 중 | **강** (Cleveland-McGill / Tufte / Mayer 충분) | 낮음 — 색계만 약간 보강 여지 | N |
| 8 | 인체공학 / 시각 의학 (asthenopia, AAO/WHO, 한국 안과학회) | 약 | **강** (Cochrane / Piepenbrock / CVS 이미 다룸) | 낮음 — 한국 안과학회 가이드만 추가 — 1줄 footnote 수준 | N |
| 9 | 사용자 onboarding / progressive disclosure (first-use, empty state) | 중 | 약 | 중 — `/show-me` 처음 호출 시 사용자 학습 곡선에 영향. 단 *지금* M1~M3 우선순위에선 후순위 | N (v2 가치) |
| 10 | Collaborative / multiplayer document (Google Docs awareness, async review) | 약 | 약 | 낮음 — md-show-me 가 *단일 사용자* 도구라 지금은 적용 없음. M3 review 흐름도 *동기 협업* 아님 | N |

## 3. 추천 — top 2 + 보조 1

### A. 행동경제학 / 의사결정 과학 (top 1)

- **핵심 paper 후보**: Kahneman *Thinking, Fast and Slow* (2011) / Iyengar & Lepper *When Choice is Demotivating* (2000, *JPSP*) / Thaler & Sunstein *Nudge* (2008) default effect / Sweeny et al. (2010) *information avoidance* 메타 리뷰.
- **도구 결정에 미칠 영향**:
  - `/show-me` selector 가 *몇 개 view 후보* 를 보여줄지 (Iyengar — 6~24개는 결정 마비). 추측: 3~5개가 적정.
  - copy-as-prompt 의 *default 동작* — default 가 곧 사용 패턴이 됨 (Thaler).
  - "이 .md 는 LLM 가 부풀린 것 같음" hint 표시 ↔ *information avoidance* 발동 위험.
  - System 1 / 2 분리 — TLDR 카드는 System 1, 본문 정독은 System 2. 두 mode 의 시각적 구분이 학술적으로 정당화됨.
- **scope**: 단일 agent, 4 paper 정독 + md-show-me 의 *선택지·default·avoidance* 3 측면에 적용.

### B. HCI / Interaction design 학술 (top 2)

- **핵심 paper 후보**: Fitts (1954) law of movement / Hick & Hyman (1952) choice reaction time / Norman *Design of Everyday Things* (1988, affordance) / Shneiderman (1983) direct manipulation / Tognazzini's *First Principles of Interaction Design* (실무 정리).
- **도구 결정에 미칠 영향**:
  - 인터랙티브 HTML 의 *버튼 크기 / 거리* (Fitts) — copy-as-prompt 버튼 위치, collapsible toggle 영역.
  - *선택 수 vs 결정 시간* (Hick) — 행동경제 영역 A 와 연결. selector 후보 수 산출에 정량 근거.
  - *affordance / signifier* (Norman) — 인터랙티브 요소가 *클릭 가능해 보이는지*. AI 생성 HTML 의 가장 큰 함정.
  - direct manipulation 원칙 — Bret Victor *Magic Ink* (이미 인용) 의 학술적 기원.
- **scope**: 단일 agent. Fitts / Hick / Norman 3개 핵심 + 우리 prototype HTML 의 affordance 점검 체크리스트 산출.

### C. 언어학 (보조, 낮은 우선)

- **핵심 paper 후보**: Sperber & Wilson *Relevance* (1986) / 한국어 readability — KORmedia / KOSAC 계열 코퍼스 연구 / Green & Abutalebi (2013) bilingual switching cognitive cost.
- **영향**: 한/영 혼용 .md 의 *읽기 부담 정량화* — Pretendard 의 자간 보정 외 *문장 처리* 차원. 단 디자인 결정은 *간접*.
- **scope**: 호출하면 보조. top 2 마치고 여력 있으면.

## 4. 추가 리서치 *불필요* 영역 + 이유

- **#1 뇌과학**: 디자인 결정에 *비유* 이상의 활용 어려움. Wolf 의 deep reading 이미 충분.
- **#5 교육공학**: Gagné·ARCS·microlearning 의 *적용 가능 부분* 은 Mayer·Wittrock·Karpicke 가 이미 커버. 90% 중복.
- **#7 데이터 시각화 학술**: Cleveland-McGill / Tufte / Mayer 로 *근거 라인 충분*. Brewer 색계만 1줄 인용으로 충분.
- **#8 인체공학 / 시각 의학**: Cochrane + Piepenbrock 이 강력. 한국 안과학회 가이드는 footnote 1줄.
- **#10 협업 문서**: md-show-me 가 단일 사용자 도구라 *지금* 적용 없음. v3+ 가치.

## 5. 자기 비평 — 내가 놓쳤을 가능성

10개 외에 *놓쳤을 법한* 영역 후보 2:

1. **AI ethics / explainability (XAI)** — "AI 가 부풀린 것 같음" hint 의 *책임·투명성* 학술 라인 (DARPA XAI 프로그램, Doshi-Velez & Kim 2017). 추측: 도구가 *AI 출력을 평가* 하는 메타 기능이 있다면 호출 가치. 현재 md-show-me 가 그 방향이면 추가 호출 후보로 격상.

2. **Personal Knowledge Management (PKM) 학술** — Vannevar Bush *Memex* (1945), Engelbart augmentation, Zettelkasten (Luhmann) 의 *지식 누적·재사용* 학술. Obsidian 영역은 다뤘으나 *PKM 자체의 학술 계보* (Memex → Engelbart → Nelson hypertext → Luhmann) 는 미커버. 도구가 *장기 사용 누적 가치* 를 강조한다면 호출 가치. 현재 우선은 *세션 단위 가치* 위주라 후순위.

기타 *놓쳤을* 가능성 — 게임 디자인 학술 (engagement / flow / progression), library science (정보 분류 학술 — Ranganathan colon classification), narrative theory (Booth, McKee — *문서 흐름* 의 서사학). 모두 *간접 영향* 이라 현재 호출 가치 낮음.
