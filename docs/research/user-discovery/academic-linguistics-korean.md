---
id: academic-linguistics-korean
type: academic-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - 한국어 readability 공식은 영어 공식 (Flesch-Kincaid) 그대로 못 씀 — KICE 학년별 전용 공식 우위.
  - 한/영 code-switching 인지부하는 *친숙도에 따라 거의 0* (Beatty-Martínez 2020) — 한국 dev 의 "코드 영어 + 주석 한글" 은 비용 낮음.
  - 모든 언어 약 39 bits/sec 정보 전달 (Coupé 2019 *Science Advances*) — 한국어 글자수 적어도 정보량 비슷.
- **md-show-me 시사점**: line-height 1.7 + letter-spacing 0 + Pretendard + 한국어 글자수 컷오프 영어 대비 ~70%, LLM 요약에 번역체 차단 prompt.
- **증거 강도**: 강 = readability·bilingual switching·Coupé / 약 = 한글 typography 학술 (디자이너 자료 의존)·AI 번역체 정량 분석 (신생).
- **읽는 가치**: 한/영 혼용 .md 큐레이션 시 *한국어 특화* 결정 (폰트·컷오프·번역체) 근거.

# 한국어 readability · 한/영 혼용 인지부하 학술 조사

## 1. 개요 + 핵심 발견 3

md-show-me 는 한국 dev / 마케터 / 학생이 작성한 한/영 혼용 .md 를 인터랙티브 HTML 로 큐레이션한다. 이 문서는 그 차별점 — *한국 사용자 환경 최적화* — 을 뒷받침할 언어학 / readability / typography / 인지과학 학술 자료를 정리한다. KCI / DBpia / earticle / ACL Anthology / arXiv / PMC 를 횡단 검색.

**핵심 발견 3**

1. **한국어 readability 공식은 영어 공식을 그대로 못 쓴다.** 영어 readability 공식(Flesch-Kincaid 등)을 한국어에 그대로 적용하면 예측치가 크게 어긋난다는 결과가 반복 보고된다 (이성영 외, 연세대 한국어학당). 한국어 전용 공식은 *어휘 난이도 + 문법 난이도 + 문장 길이* 3축이 표준이며, KICE 이독성 지수는 *학년대별 전용 공식* 이 통합 공식보다 우수하다고 검증됐다.
2. **한/영 code-switching 의 인지 비용은 "친숙도에 따라" 거의 0 까지 떨어진다.** Costa / Bialystok 라인의 후속 연구 (Beatty-Martínez 2020, Adler 2020) — *습관적 code-switcher* 는 switching cost 가 거의 없고, 오히려 inhibitory control 이 향상된다. 한국 dev 의 "코드 영어 + 주석 한글" 은 *예측 가능한* 패턴이라 비용이 낮다는 가설이 합리적이다.
3. **모든 언어는 약 39 bits/sec 로 정보를 전달한다 (Coupé et al. 2019, *Science Advances*).** 한국어 포함 17개 언어. 즉 *글자수가 적어도 정보량은 비슷* — md-show-me 의 "head-preview" 컷오프를 글자수 기준으로 잡으면 한국어가 영어보다 *덜 보이는* 게 아니라 *정보량이 비슷*하다. 단 *읽기 속도* 는 별개 (eye-tracking 기반 한국어 데이터 부족).

---

## 2. A. 한국어 readability 측정

- **이독성 공식 (Korean readability formula)**: 연세대 한국어학당 (서혁 외) 의 다중회귀 모델은 *어휘 난이도 + 문법 난이도 + 문장 길이* 3축. 어휘 등급 (한국어 어휘 빈도사전 기반 1~5등급) 이 가장 강한 예측 변수.
- **KICE 이독성 지수**: 초중고 교과서 9,945 텍스트 기반. *학년별 전용 공식 > 통합 공식*. 전문가 평가와 80% 이상 일치.
- **한자어 비율의 가독성 영향**: TOPIK 텍스트의 한자어 비율 — 초급 59.6%, 중급 76.1%, 고급 84.5%. 한자어 비율 = 난이도 대리지표로 작동.
- **KoSAC 는 readability 아님 (정정)**: KOSAC (Korean Sentiment Analysis Corpus, 서울대 신효필 외 2013) 는 감성 분석용 7,713 문장 코퍼스. readability 와 무관. 사용자 query 의 KoSAC ↔ readability 연결은 부정확. 한국어 readability 쪽 대표 코퍼스는 *세종 코퍼스 + KICE 교과서 DB*.

## 3. B. Bilingual cognitive load — 한/영 code-switching

- **Costa & Santesteban (2004) → Bialystok (2009)** 라인: 초기 연구는 switching cost 가 존재한다고 주장. 하지만 *low-proficiency 화자* 에서만 강하게 나타남.
- **Beatty-Martínez et al. (2020, *Cognition*)**: dense code-switching 환경의 bilingual 은 switching cost 가 *측정 불가* 수준. 한국 IT 환경 (코드=영어, 주석=한글, 회의=한글에 영어 술어 섞임) 은 정확히 dense code-switching 시나리오.
- **MEG 증거 (Korean/English bilinguals, PMC 8570682)**: 단어 합성은 언어 구분 *없이* 시작되고, 합성 *후* 단계에서 언어 인덱스가 활성화. → 한/영 단어가 같은 문장에 섞여도 초기 처리는 동일 비용.
- **시사**: md-show-me 가 마크다운 안의 영어 keyword (e.g. `useState`, `RAG`, `prompt cache`) 를 한국어 본문과 섞어 보여줘도 *추가 인지부하 거의 없다*. 단 — 익숙하지 않은 영어 용어는 별개 비용.

## 4. C. Sperber & Wilson — Relevance Theory

- **핵심 공식**: `relevance = cognitive_effect / processing_effort`. *적은 노력으로 큰 효과* → 최적 관련성.
- **md-show-me 직접 적용**: 큐레이션 결과가 사용자 의도와 *얼마나 relevant 한가* 가 도구 가치의 핵심 KPI. "10개 문서를 다 보여주는 것" 보다 "사용자 의도와 일치하는 2~3개를 짧게" 가 relevance 가 높다.
- **head-preview 의 정당화**: 머리 부분만 보여주고 "더 보기" 를 두는 패턴은 *processing effort* 를 낮춘다 — relevance theory 의 직접 적용.

## 5. D. 한국어 typography 학술

- **line-height 1.7~1.8 권장**: WCAG 는 영어 기준 1.5. 한국어는 *자모 결합* 으로 위아래 획이 영어보다 두꺼움 (`갊`, `뷁` 같은 복잡 자형) → 1.5 면 시각적으로 답답함. 한국 시각디자인 학회 (KSDS) / KRDS (정부 디자인 표준) 모두 본문 1.6~1.8 권장.
- **letter-spacing 0 또는 -0.01em**: 한글은 *모아쓰기* 라 음절 자체가 박스. 영어처럼 letter-spacing 을 양수로 주면 *자모 박스 사이 공백* 이 부자연스럽게 벌어짐. Pretendard / Noto Sans KR 의 기본 디자인이 자간 0 전제.
- **Pretendard vs Noto Sans KR vs Apple SD Gothic Neo**: 학술 비교 논문은 빈약 (대부분 디자이너 블로그 / KCI 의 모바일 가독성 논문 일부). 합의: *iOS 최적화 = Apple SD Gothic Neo / 크로스플랫폼 = Pretendard or Noto Sans KR / 한글-영문 mix 균형 = Pretendard*.

## 6. E. Lexical density / information density

- **Coupé et al. 2019 (*Science Advances*)**: 17개 언어 비교, 평균 39 bits/sec 로 수렴. 한국어는 *음절당 정보량 높음 + 발화속도 느림* 조합.
- **한국어 textbook lexical density 연구 (KCI ART003178508)**: lexical density 는 *숙달도보다 장르* 에 의존. 정보 전달 텍스트 (.md 의 주 용도) 는 서사 / 대화체보다 density 높음.
- **시사**: 같은 정보를 영어로 800 단어로 쓰면 한국어로는 ~500~600 단어로 줄어드는 경향. md-show-me 의 글자수 컷오프를 영어 기준으로 잡으면 한국어 문서는 *너무 빨리 truncate* 됨 → 한국어는 컷 길이 조정 필요.

## 7. F. AI 글의 한국어 어색함 (번역체)

- **GPT-3 학습 데이터 중 한국어 0.015% / 영어 92.1%** (Naver HyperClova X 논문). → GPT 계열의 한국어는 본질적으로 *영어 → 한국어 번역체* 에 가까움.
- **번역체 패턴**: "당사는...", "~할 수 있습니다" 반복, em-dash 남발, *주어 명시 과잉* (한국어는 생략이 자연스러움). AI 탐지기는 *문장 단조성 + 반복 패턴* 을 신호로 사용 (arXiv 2503.00032 — Detecting LLM-Generated Korean Text).
- **HyperClova X / KoCheckGPT** 가 한국어 특화 LLM / 탐지기로 등장. 사용자 query 의 "AI 냄새 없는 한국어 글" = Substack 한국어 / 브런치 인기 글에 가까운 *생략 + 짧은 문장 + 구어체 어미* 패턴.
- **md-show-me 시사**: 큐레이션 결과 요약을 LLM 으로 생성할 때 *기본 GPT 출력 그대로* 는 번역체. 후처리 또는 prompting 으로 "당사는 / 할 수 있습니다" 차단 + 어미 다양화 필요.

---

## 8. md-show-me 한/영 혼용 design 결정

| # | 결정 | 근거 영역 |
|---|---|---|
| D1 | 본문 line-height **1.7** (기본 CSS) | D (한글 자형 + KSDS 권장) |
| D2 | letter-spacing **0** (negative 금지) | D (모아쓰기 박스 특성) |
| D3 | 기본 폰트 **Pretendard** (system fallback: Apple SD Gothic Neo, Noto Sans KR) | D (한/영 mix 균형) |
| D4 | 글자수 컷오프 = *한국어 기준 ~70%* (영어 기준 그대로 X) | E (information density 차이) |
| D5 | head-preview 패턴 = *short preview + expand* | C (Relevance theory: processing effort ↓) |
| D6 | LLM 요약 생성 시 *번역체 차단 prompt* ("당사는", "할 수 있습니다", em-dash 금지) | F (AI 번역체 패턴) |
| D7 | 영어 keyword inline 허용 (`code-fence` 자연스럽게 mix) — 별도 강조 X | B (Korean/English bilingual switching cost 거의 0) |

---

## 9. 증거 강도 표

| 영역 | 출처 다양성 | peer-reviewed 비중 | 한국어 직접 적용 가능성 | 종합 |
|---|---|---|---|---|
| A. 한국어 readability | KCI · earticle · KICE | 높음 | 높음 | **강** |
| B. Bilingual switching | Cognition · Nature Sci Rep · PMC | 매우 높음 | 중 (한국 특화 데이터 빈약) | **중강** |
| C. Relevance theory | 1986 원전 + 후속 다수 | 매우 높음 | 추론적 적용 | **중강** |
| D. 한글 typography | KCI 1편 + 디자이너 자료 | **낮음** | 높음 (실무 합의 강함) | **중** |
| E. Information density | *Science Advances* 1편 + KCI | 높음 | 중 | **중강** |
| F. AI 번역체 | arXiv · HyperClova 논문 | 중 (신생 분야) | 매우 높음 | **중** |

---

## 10. 한국 학술 자료 접근성 한계

- **KCI / DBpia / KISS / earticle**: 초록은 무료, 원문은 대부분 *기관 구독 / 개별 결제* (편당 4,000~10,000원). 이 조사는 초록 + 인용 + 영문 paraphrase 에 의존했고, 원문 검증은 못 함.
- **KoSAC 외 한국어 *readability 전용 코퍼스* 는 공개본이 거의 없음.** 세종 코퍼스, 모두의 말뭉치 (국립국어원) 가 가장 가깝지만 readability 라벨링은 별도 작업 필요.
- **한글 typography 의 *학술 논문* 은 디자이너 실무 자료에 비해 매우 적음.** KSDS 학회지 (한국시각디자인학회) / 디자인학연구 정도. *Pretendard vs Noto Sans 가독성 학술 비교* 는 못 찾음 (디자이너 블로그만 존재).
- **한국 dev 의 한/영 code-switching 인지부하 직접 연구는 0건.** 영어권 bilingual 연구를 *유추 적용* 함. 향후 한국 dev 대상 eye-tracking / EEG 연구가 빈 공간.
- **AI 번역체 패턴 정량 분석은 2024~2026 신생 분야.** arXiv preprint 중심, peer-reviewed 적음.

---

## 출처

- KCI: 한국어 읽기 텍스트 난이도 측정 공식 — https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002418674
- KCI: 텍스트 언어적 난이도 측정 공식 비교 (초중고 교과서) — https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001096488
- ejce: Analysis of Readability Characteristics of Educational Text — https://www.ejce.org/archive/view_article?pid=jce-27-1-87
- ACL: KOSAC — https://aclanthology.org/Y13-1037/
- Sperber & Wilson, Relevance Theory (UCL WPL) — https://www.phon.ucl.ac.uk/publications/WPL/02papers/wilson_sperber.pdf
- Wikipedia: Relevance theory — https://en.wikipedia.org/wiki/Relevance_theory
- PMC: Composition within and between Languages (Korean/English MEG) — https://pmc.ncbi.nlm.nih.gov/articles/PMC8570682/
- Cambridge: Habitual code-switching cognitive control — https://www.cambridge.org/core/journals/bilingualism-language-and-cognition/article/effects-of-habitual-codeswitching-in-bilingual-language-production-on-cognitive-control/D1B7EE8C0223A085E96ACE2836E9AD2C
- Nature Sci Rep: Language distance modulates cognitive control — https://www.nature.com/articles/s41598-021-02973-x
- ScienceDaily / Coupé et al.: Similar information rates across languages — https://www.sciencedaily.com/releases/2019/09/190905124520.htm
- arXiv 2503.00032: Detecting LLM-Generated Korean Text — https://arxiv.org/html/2503.00032v3
- KoreaScience: KoCheckGPT (Korean LLM document detector) — https://koreascience.kr/article/CFKO202306643317050.do
- KCI: 모바일 한글 폰트 가독성 (Noto Sans 중심) — https://journal.kci.go.kr/jksci/archive/articleView?artiId=ART002987878
- KCI: 수준별 한국어 텍스트 어휘적 특성 (lexical density) — https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003178508
- GitHub: Pretendard — https://github.com/orioncactus/pretendard
- KRDS 스타일 가이드: 타이포그래피 — https://www.krds.go.kr/html/site/style/style_03.html
- ACM: Effect of poor source code lexicon and readability on cognitive load — https://dl.acm.org/doi/10.1145/3196321.3196347
