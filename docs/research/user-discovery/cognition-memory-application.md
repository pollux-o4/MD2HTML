---
id: cognition-memory-application
type: foundational-research
generated: 2026-05-27
scope: cognition → memory → application + Obsidian evolution + Tarik essence
---

## 요약

- **핵심 발견 3가지**:
  - MD 는 인지 OK / 기억은 약 (Paivio 단일 채널, Craik deep 트리거 약) / 활용은 결핍 (Wittrock generation 없음).
  - Obsidian 진화 (Backlinks → Graph → Canvas → Bases) 는 *MD 위에 인지-기억-활용 단계별 view 레이어* 쌓는 구조 — md-show-me 와 동형.
  - Generative UI 의 human preference 우위 (Google 2025 arXiv, ELO 1736) 가 Tarik 가설의 가장 강한 정량 backing.
- **md-show-me 시사점**: copy-as-prompt 는 *섹션마다* 배치해 사용자 generation 행위 강제 (Wittrock) — 한방 LLM 생성이면 수동 소비자로 전락.
- **증거 강도**: 강 = Ebbinghaus·Karpicke·Sweller·Wickens / 약 = "Tarik MD 0% / HTML 95%" 통계의 일반화 (도메인 한정 가능).
- **읽는 가치**: HTML view 가 *왜 MD 보다 학습·재방문에 유리한지* 의 학술적 정당화 + Obsidian 답습 vs 차별화 판단.

# 인지 → 기억 → 활용 사슬 + Obsidian 진화 + Tarik 본질 — 통합 조사

## 1. 개요

md-show-me 가 *재방문 / 재사용* 되는 도구가 되려면 단순 가독성을 넘어 **인지 → 기억 → 활용** 의 학습 사슬을 보호해야 한다. 본 문서는 3 영역의 교집합을 한 줄로 요약한다: **"채널을 분리하고(Paivio), 회상을 강제하고(Karpicke), 외재 부하를 줄이면(Sweller) — Obsidian 이 MD 위에 Canvas/Graph 를 얹은 이유와 Tarik 이 HTML 95% 를 측정한 이유가 같은 인지 메커니즘 위에 선다."** MD 는 *인지* 까지는 잘 한다. *기억* 단계에서 dual coding 채널이 1개로 무너지고, *활용* 단계에서 schema 형성이 약하다. HTML / 인터랙티브 / 그래프뷰는 그 두 단계를 보강하는 *서로 다른 수단* 인데 같은 학문 원리로 정당화된다.

## 2. 영역 1 — 인지-기억-활용 사슬

### 2-A. 인지 (perception → 작업 기억 진입)

기존 `paper-information-density.md` 와 `web-info-density-empirical.md` 가 *밀도 / F-pattern / Mayer modality* 를 다뤘다. 본 문서는 **Wickens Multiple Resource Theory** (1984, 2008) 로 보강한다 — 인지 자원은 *시각/청각 × 공간/언어 × 입력/출력* 의 4D 분리 풀이며, 같은 자원을 두 작업이 경쟁하면 부담이 급증한다. MD 의 한계: 모든 정보가 *시각-언어* 채널 하나에 몰린다. 표·다이어그램·인터랙션이 *시각-공간* 채널을 동원하면 같은 정보량을 *분산 처리* 할 수 있다. Mayer 의 modality principle (graphic+voice > graphic+text) 도 이 이론의 한 응용이다. md-show-me 시사점: 같은 정보를 텍스트로 두 번 말하지 말고, *공간 배치 / 시각 도식* 으로 채널을 분산.

### 2-B. 기억 (작업 기억 → 장기 기억 부호화)

| 원리 | 발견자 / 연도 | 핵심 메커니즘 |
|---|---|---|
| **Ebbinghaus 망각 곡선** | Ebbinghaus 1885 | 학습 후 며칠 만에 retention 50% 감소. spaced 반복이 곡선을 평탄화. |
| **Levels of Processing** | Craik & Lockhart 1972 | semantic (deep) 처리가 phonological/orthographic (shallow) 보다 retention 우수. Craik-Tulving 1975 실험. |
| **Dual Coding Theory** | Paivio 1968~1969 | 시각 + 언어 두 채널 부호화 시 회상률 ↑. "개" 를 단어+이미지 동시 저장이 단일 저장 대비 강함. |
| **Cognitive Load Theory** | Sweller 1988 | intrinsic / extraneous / germane 부하 분리. extraneous 가 작업 기억을 잡아먹으면 schema 형성 실패. |
| **Retrieval Practice (Testing Effect)** | Karpicke & Roediger 2008 (*Science*) | recall 시도가 restudy 보다 long-term retention 에 강력. 즉시는 restudy 가 우세, 시간 지나면 retrieval 가 역전. short-answer > multiple-choice. |

**MD 가 약한 지점**: MD 는 (a) 시각 채널 단일 사용 → Paivio 위반, (b) 모든 텍스트가 같은 typography 무게 → Craik 의 *deep processing* 트리거 약함, (c) *재방문 시 recognition* 만 가능 → Karpicke 의 *recall* 강화 못함. AI 가 만든 long-form MD 는 한 번 읽고 닫으면 7일 후 거의 사라진다 (Ebbinghaus). 이게 사용자가 "AI 답변 받고도 기억에 안 남는다" 호소의 학문적 정체.

### 2-C. 활용 (장기 기억 → 새 문제에 transfer)

| 원리 | 발견자 / 연도 | 핵심 |
|---|---|---|
| **Identical Elements** | Thorndike & Woodworth 1901 | 원래 학습 context 와 적용 context 의 공통 요소 비율이 transfer 결정. |
| **Near / Far Transfer** | Perkins & Salomon 1988 | low-road (자동·spontaneous) vs high-road (의식·deliberate) transfer. forward-reaching / backward-reaching. |
| **Schema Construction** | Anderson, Sweller | 패턴을 추상화한 schema 가 형성돼야 새 상황에 적용 가능. schema 없으면 transfer 실패. |
| **Expertise Reversal Effect** | Kalyuga 등 2003 | 초보자에 효과적인 worked example / 상세 설명이 전문가에는 *해롭다* (redundancy 부하). |
| **Generative Learning** | Wittrock 1974 | 학습자가 자기 말로 *재구성* 할 때 (summarizing, paraphrasing, drawing) 학습이 강화. attention / motivation / preconceptions / generation 4단계 모델. |

**MD 가 약한 지점**: MD 는 *수동 소비* 매체다 — Wittrock 의 *generation* 단계가 없다. 사용자가 *복사 / 편집 / 재구성* 할 트리거가 없으면 schema 형성이 약하고, 새 작업에 transfer 안 된다. Anki / Quizlet 같은 retrieval 도구가 카드를 *flip 해서 답을 generate* 시키는 이유가 이것이다 — recognition 이 아닌 *generation* 강제.

**사슬 시각화** (MD 의 약점 위치):

```
인지 → 기억 → 활용
 ✓     △     ✗
 |     |      |
 MD ok 단일채널, deep 트리거 약 generation 강제 없음
       (Paivio·Craik 위반)   (Wittrock·schema 위반)
```

## 3. 영역 2 — Obsidian 진화 (MD 한계 극복의 경로)

Obsidian 은 *plain MD 로컬 파일* 을 신조로 시작했지만 점진적으로 *MD 위에 시각/구조 레이어* 를 쌓았다. 각 추가가 위 사슬의 *어느 단계를 보강* 하는지 매핑:

| 기능 | 출시 | MD 가 못한 것 | 인지 사슬 단계 보강 |
|---|---|---|---|
| **Backlinks / Outgoing links** | 초기 | 단방향 링크의 *역방향 추적* 불가 | 활용 (transfer) — 이 노트가 *어디서 호출되는지* 알면 schema 의 *외연* 확장 |
| **Graph view** | 초기 | 노트 간 관계의 *공간 표상* 부재 | 인지 (Wickens 시각-공간 채널) + 기억 (Paivio 시각 부호화) |
| **Canvas** | 2022-12 (v1.1) | *공간 배치 / 그루핑 / 시각 흐름* 표현 불가 | 기억 (시각-공간 부호화) + 활용 (generative — 사용자가 *직접 배치* = Wittrock generation) |
| **Excalidraw integration** | plugin | *손그림 / 도식* 부재 | 기억 (Paivio dual coding 강화) — 사용자가 *직접 그림* = generative 행위 |
| **Kanban plugin** | plugin | *상태 흐름 / 카테고리 분류* 부재 | 활용 (schema construction — 항목을 column 으로 분류 = generation) |
| **Bases (database)** | 2025 (v1.10) | frontmatter 의 *집계 / 필터 / 정렬* 부재 | 인지 (다른 view 로 같은 데이터) + 활용 (메타 패턴 인식) |

핵심 통찰: Obsidian 은 *MD 를 버리지 않았다*. MD 를 **source of truth** 로 두고, 위에 *인지-기억-활용 단계별 view 레이어* 를 얹는 구조. Bases 가 frontmatter 만 인식하는 것도 의도된 제약 — "구조화 vs 자유" 의 symbiosis. md-show-me 의 *MD = source / HTML = consumption* 분리는 이 진화 경로와 정확히 동형. 단 Obsidian 이 *사용자가 직접 view 를 만든다* 인 반면 md-show-me 는 *LLM 이 쿼리에 맞춰 view 를 즉석 생성* — generation 행위의 주체가 다르다 (시사: 사용자도 *copy-as-prompt* / *재요청* 으로 generation 에 참여시켜야 Wittrock 충족).

## 4. 영역 3 — Tarik 본질 (왜 HTML 인가의 깊은 근거)

기존 `thariq-html-effectiveness-license.md` 와 `thariq-templates-analysis.md` 는 *what / how* 를 다뤘다. 본 절은 *암묵적 가정* 과 *증거 강도* 만 추출.

**명시된 것**: HTML 이 "유연한 출력 포맷". 20개 템플릿이 *데이터 형태별 시각화 매칭*.

**암묵적 인지 모델**:
1. *MD = single channel*, HTML = multi-channel (Wickens). Tarik 은 이 용어를 안 쓰지만 모든 템플릿이 *공간 배치 + 시각 도식 + 인터랙션* 으로 채널을 분산한다.
2. *생성 (generation) = 학습의 일부*. Tarik 의 #18 (triage), #19 (feature flag), #20 (prompt tuner) 는 사용자가 *조작* 하게 만든다 — 이건 Wittrock 의 generative learning 의 UI 응용. 비록 Tarik 자신은 그렇게 부르지 않지만.
3. *재방문 시 recall*. 인터랙티브 HTML 은 사용자가 *다시 만지면 recall 강제* — Karpicke 의 testing effect 가 작동.

**Karpathy "HTML 이 다음 단계" 가설의 출처**: 직접 인용은 못 찾았지만, **Google Research (Leviathan et al.) 2025 arXiv 2604.09577 "Generative UI"** 가 *직접 측정값* 을 제공 — LMArena 100 prompt 에서 generative UI 가 MD 출력 대비 *human preference 압도*, ELO 1736.2. 인간 전문가 산출물의 약 50% 수준이지만 *emergent capability*. 이게 Tarik 가설의 *학문적 backing 가장 강한 증거* (preprint 단계지만 정량 측정 있음).

**검증 가능 vs 신앙 영역**:
- *검증됨 (preprint)*: human preference for generative UI > markdown (Google 2025).
- *검증됨 (peer-reviewed)*: dual coding · testing effect · cognitive load — 50년 이상 검증.
- *가설*: "interactive HTML 이 정적 MD 보다 기억-활용에 강하다" 직접 RCT 없음. 위 paper 들의 *조합 추론* 으로만 정당화.
- *신앙*: "MD 0% / HTML 95%" Tarik 통계의 일반화. 도메인 (Anthropic 사내 예제) 한정 가능성. 우리 도메인 (한국어 repo md 큐레이션) 에서 동일한지 미검증.

## 5. md-show-me 통합 가이드 (인지-기억-활용 사슬 보호 원칙)

1. **Citation 카드 + figure 동시 노출** (Paivio dual coding). 텍스트 인용 옆 SVG 도식 1개 = 7일 후 회상률 ↑. 같은 정보를 텍스트로 반복하지 말고 *시각으로 보완*.
2. **Copy-as-prompt = generative learning 행위** (Wittrock). 사용자가 *재요청 / 편집* 트리거를 누르는 순간 schema 가 형성된다. 이 버튼이 *맨 끝* 이 아니라 *섹션마다* 있어야.
3. **Layer-cake typography 로 deep processing 트리거** (Craik). 모든 텍스트 동일 무게 = shallow processing. 헤딩·callout·pull quote 는 *semantic 처리* 를 강제하는 트리거 — 장식 아님.
4. **Extraneous load 제거** (Sweller). 같은 정보의 텍스트+표+그림 3중 표현은 *redundancy 부하* 로 *해롭다*. 각 요소는 *다른 측면* 만 담당.
5. **Recall 강제 surface** (Karpicke). 페이지 끝 "이 내용 한 줄 요약" prompt + 사용자가 *자기 말로* 적게 만들면 testing effect 발동. AI 가 요약하지 말고 사용자가 generate.
6. **Spaced revisit 신호** (Ebbinghaus). "이 문서 마지막 본 지 3일 — 핵심 1개만 다시 보기" 같은 lazy 알림. v2 가치.
7. **Expertise 모드 분리** (Kalyuga reversal). 초보자용 worked example 과 전문가용 raw data 를 *토글* 로 — 한쪽이 다른 쪽에 *해롭다*. 디폴트는 사용자 반응으로 학습.
8. **Kanban / mind-map / graph view 는 v2 valid** — Obsidian 답습이 아니라, 같은 정보의 *다른 시각-공간 부호화* (Paivio · Wickens) 로 사슬 보강. 단 *해당 쿼리에 어울릴 때만* — LLM selector 가 판단.
9. **MD = source, HTML = consumption 분리 유지**. Obsidian Bases 가 frontmatter 만 보는 것과 같은 *구조화 강제* 원칙. HTML 은 *재생성* 되는 view 일 뿐, 진실은 MD.
10. **사용자 generation 의 주체로 참여시킴**. md-show-me 가 LLM 한방 생성이면 사용자는 *수동 소비자* — Wittrock 위반. *re-query / 편집 / 분기* loop 가 핵심.

## 6. 증거 강도 표

| 원리 | 강도 | 비고 |
|---|---|---|
| Ebbinghaus 망각 곡선 | 매우 강 | 140년, 수천 replication |
| Levels of Processing (Craik 1972) | 강 | peer-reviewed, 표준 교과서 |
| Dual Coding (Paivio 1968~) | 강 | 다만 propositional theory 등 경쟁 이론 존재 |
| Cognitive Load (Sweller 1988~) | 강 | 35년 누적, 교육 표준 |
| Retrieval Practice (Karpicke 2008) | 매우 강 | *Science* paper, 다수 replication |
| Multiple Resource (Wickens 1984) | 강 | 항공·HCI 표준 |
| Generative Learning (Wittrock 1974) | 중강 | 구성주의 paradigm shift 의 효시지만 측정 어려움 |
| Transfer / Schema (Anderson, Perkins) | 중 | 이론 강함, *far transfer* 실증은 약함 |
| Expertise Reversal (Kalyuga 2003) | 중 | 메타분석 있음, 일반화 주의 |
| **Generative UI 가설 (Google 2025)** | 중 | preprint, 직접 정량 측정 (ELO 1736), peer-review 대기 |
| **Obsidian Canvas / Bases 의 인지 가치** | 약 | 사용자 만족도는 anecdotal, RCT 없음 |
| **Tarik "MD 0% / HTML 95%"** | 매우 약 | 도메인 한정 가능성. 일반화는 신앙 |
| **"Interactive HTML > 정적 MD 가 기억-활용에 강하다"** | 추론 | 직접 RCT 없음. 위 paper 들의 조합으로만 정당화 |

## Sources

- [Dual-Coding Theory — Wikipedia](https://en.wikipedia.org/wiki/Dual-coding_theory)
- [Testing Effect — Wikipedia](https://en.wikipedia.org/wiki/Testing_effect)
- [Cognitive Load — Wikipedia](https://en.wikipedia.org/wiki/Cognitive_load)
- [Transfer of Learning — Wikipedia](https://en.wikipedia.org/wiki/Transfer_of_learning)
- [Levels of Processing — Wikipedia](https://en.wikipedia.org/wiki/Levels_of_processing_model)
- [Forgetting Curve — Wikipedia](https://en.wikipedia.org/wiki/Forgetting_curve)
- [Multiple Resource Theory — Wikipedia](https://en.wikipedia.org/wiki/Multiple_resource_theory)
- [Wittrock — Learning as a Generative Process (1974)](https://www.tandfonline.com/doi/abs/10.1080/00461527409529129)
- [Wittrock Generative Learning — Donald Clark](http://donaldclarkplanb.blogspot.com/2021/12/wittrock-generative-learning.html)
- [Obsidian Canvas](https://obsidian.md/canvas)
- [Obsidian Graph View — Help](https://obsidian.md/help/plugins/graph)
- [Obsidian Bases — Architect's Guide](https://chughkabir.com/guide-obsidian-bases/)
- [Generative UI — Google Research (arXiv 2604.09577, 2025)](https://generativeui.github.io/index.html)
- [Karpathy LLM Wiki — VentureBeat](https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an)
