---
id: web-info-density-empirical
type: empirical-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - Seed 가설 "YouTube/PPT 밀도가 적절" 은 **부분 confirm + 매체 mismatch nuance** — PPT 의 슬라이드당 10단어는 2채널(발표자+슬라이드) 전제라 단일 채널 HTML 에 직역 부적합
  - 더 적절한 reference = **Perplexity (220 words/answer) + Wikipedia (717 words/article, 단락 ≤1000 chars) 의 중간**
  - 인포그래픽은 PPT 와 정반대 — *high data-ink ratio* (Tufte) 가 미덕, scrollytelling dwell time +62%
- **md-show-me 시사점**: 페이지 400~800 단어, 카드 80~150 단어 × 3~5개, 단락 200~400 chars, 한국어는 +15~25% 여백 정량 권장치 직접 채택
- **증거 강도 / 한계**: WPM/단어수 정량 데이터 풍부하나, 한국어 시각 점유 "+15~25% 여백" 은 design intuition (정량 데이터 부족)
- **읽는 가치**: md-show-me 의 단위별 권장치 (페이지/카드/단락) 정량 근거가 필요할 때, seed 가설을 데이터로 반박/조정할 때

# 웹 정보 밀도 — empirical 조사

## 1. 개요

md-show-me 의 seed 가설: *"YouTube / PPT 정도의 정보 밀도가 적절"*. 본 조사는 YouTube essay, TED-style PPT, 인포그래픽, AI 답변 화면, Wikipedia 의 실측 데이터로 이 가설을 평가한다.

**결과 미리보기 — nuanced confirm**:
- 시간 축 매체 (YouTube/TED 발표): 분당 130~150 words 가 교육 콘텐츠 표준. *낮은 밀도 + 시간 누적* 구조.
- 슬라이드 매체 (PPT): 슬라이드당 6~10 words 권장 (Duarte, 6x6/7x7 rule). 슬라이드 자체는 *극도로 sparse*.
- 정적 매체 (Wikipedia, 인포그래픽): 글당 평균 717 words, 단락당 ≤1,000 chars. *상대적으로 dense*.

→ "YouTube/PPT 밀도" 는 *시간/슬라이드 단위로는 sparse* 지만, *세션 전체로는 누적* 된다. md-show-me 가 스크롤 기반 HTML 인 점을 고려하면, PPT 보다 Wikipedia/Perplexity 쪽이 더 적합한 reference.

## 2. YouTube empirical

| 지표 | 측정값 | 출처 |
|---|---|---|
| 교육 콘텐츠 발화 속도 | 130~150 WPM | flowshorts, sumera.io |
| 일반 YouTuber 평균 | 140~170 WPM | prepublish.ai |
| 복잡 기술 콘텐츠 | 110~130 WPM | teleprompter.com |
| 코멘터리/essay | 150~170 WPM | sumera.io |

3Blue1Brown / CGP Grey 의 *분당 단어수* 직접 측정 데이터는 공개된 게 없으나, 두 채널 다 "복잡한 주제를 시각화로 천천히 전개" 카테고리 — 약 130 WPM 추정. **10분 영상 = 약 1,300~1,500 단어**. 이는 Wikipedia 평균 article (717 단어) 의 약 2배.

## 3. PPT empirical

| 가이드라인 | 권장 단어수 |
|---|---|
| Nancy Duarte | ≤10 words/slide ("10 단어 넘으면 문서지 슬라이드가 아니다") |
| 6x6 rule | 6 bullets × 6 words = 36 words/slide max |
| 7x7 rule | 7 lines × 7 words = 49 words/slide max |
| Garr Reynolds | "slideument" anti-pattern 경고 |

**Tufte 비판** (*Cognitive Style of PowerPoint*, 2003): PPT 의 *low resolution* 이 bullet point 강제 → 정보 평탄화. Columbia 우주왕복선 사고 조사에서 PPT 가 위험 신호 왜곡한 실제 사례 인용. Tufte 권고: *PPT 보다 high-density handout* 으로 대체.

→ PPT 밀도 가이드라인은 "발표자 + 슬라이드" 가 2채널인 전제. **스크롤 HTML 은 단일 채널 → PPT 권고 적용 부적절**.

## 4. 인포그래픽 / dataviz

**Tufte 의 data-ink ratio** (1983): 잉크 중 *실제 데이터 표현* 비율이 1 에 가까울수록 우수. "chartjunk" (장식적 비-정보 요소) 최소화. **data density** = 데이터 항목 수 / 그래픽 면적 — 높을수록 선호.

**Pudding.cool / NYT 데이터**:
- NYT "Snow Fall" (2012): 평균 dwell time **12분** — 인터랙티브 스크롤리텔링이 깊은 engagement 유발.
- Infogram/DC Thomson 2015: 데이터 시각화 포함 시 dwell time **+62%**.
- The Pudding: "data lets the weight carry" — *sparse 한 visual + 풍부한 데이터 layer* 의 균형.

→ 인포그래픽은 PPT 와 정반대 — *high data density* 가 미덕. md-show-me 는 PPT 보다 이쪽에 가깝다.

## 5. HTML 큐레이션 화면 사례

| 시스템 | 평균 답변 길이 | 특성 |
|---|---|---|
| ChatGPT | 1,686 chars (~280 words) | 가장 길고 narrative |
| Perplexity | 1,310 chars (~220 words) | fact-dense, 짧고 인용 풍부 |
| Google AIO | 977 chars (~165 words) | 짧지만 링크 9.26개 (Perplexity 5.01) |

Perplexity 의 디자인 철학: "concise, fact-based over creative elaboration". 사용자는 *terse* 하다고 느끼지만 정보 retrieval task 에서는 선호.

**Wikipedia**:
- 평균 article: **717 단어**
- 단락당 ≤1,000 chars (~12 줄) — 넘으면 분리 권고
- 8,000 단어 넘으면 분할 검토, 15,000 거의 확실 분할
- Lead section: 약 2 단락

→ 영원의 reference. *섹션당 sparse, article 누적은 dense*.

## 6. 한국 사용자 특수성

- 한글 읽기 속도: **250~350 WPM** (네이티브, 영어와 유사). 발화 속도는 약 150 WPM.
- 한글의 *syllable boundary* 명확성 → morpheme 가시성 우수 (Hangul reading research, PMC).
- 한국어는 character-to-word 비율이 낮아 *같은 정보 = 더 적은 글자 수* (영어 대비 압축 효율 ↑).
- **시각 점유**: 한글 자모 결합 글자가 영문보다 *세로 점유 약간 크고* 영문보다 더 dense 하게 보임 — 같은 단어수도 더 빽빽한 느낌. (정량 데이터는 부족, design intuition)

→ 한국어 화면은 영어 reference 보다 *15~25% 더 여백* 을 줘야 같은 perceived density.

## 7. 결론 — seed 가설 평가 + md-show-me 권장치

**Seed 가설 평가**: *"YouTube/PPT 밀도가 적절"* 는 **부분 confirm, 매체 mismatch nuance**.
- YouTube 발화 속도(130 WPM) 는 *시간* 단위 metric — 스크롤 HTML 에 직역 불가.
- PPT 의 슬라이드당 10 words 는 *2채널 (발표자+슬라이드)* 전제 — 단일 채널 HTML 에 직역하면 너무 sparse.
- 더 적절한 reference: **Perplexity (220 words/answer) + Wikipedia (717 words/article, 단락 ≤1,000 chars)** 의 중간.

**md-show-me 정량 권장**:

| 단위 | 권장 |
|---|---|
| 전체 페이지 | 400~800 단어 (한글 기준; Perplexity~Wikipedia mid) |
| 단락 | 한글 200~400 chars (≤6 줄) |
| 카드/섹션 | 80~150 단어, 3~5개 카드/페이지 |
| 헤딩 | 1 H1 + 3~5 H2; H3 는 필요시만 |
| visual 요소 | 페이지당 1~2개 (table/code/chart) — Tufte data-ink 원칙 적용, chartjunk 금지 |
| dwell time 목표 | 2~4분 (Snow Fall 12분은 과욕, AI 답변 30초는 부족) |

핵심: **"PPT 처럼 sparse 슬라이드" 가 아니라, "Wikipedia 처럼 잘 구조화된 단락 + Perplexity 처럼 fact-dense + 인포그래픽처럼 high data-ink"** 의 hybrid 가 측정 데이터 상 최적.

## Sources

- [3Blue1Brown — Wikipedia](https://en.wikipedia.org/wiki/3Blue1Brown)
- [CGP Grey — Wikipedia](https://en.wikipedia.org/wiki/CGP_Grey)
- [Nancy Duarte TED Q&A](https://blog.ted.com/how-to-give-more-persuasive-presentations-a-qa-with-nancy-duarte/)
- [Garr Reynolds — Tweak Your Slides](https://tweakyourslides.wordpress.com/tag/garr-reynolds/)
- [Edward Tufte — Wikipedia](https://en.wikipedia.org/wiki/Edward_Tufte)
- [Data-Ink Ratio — InfoVis Wiki](https://infovis-wiki.net/wiki/Data-Ink_Ratio)
- [Cognitive Style of PowerPoint review](http://patricklowenthal.com/review-of-the-book-the-cognitive-style-of-powerpoint-pitching-out-corrupts-within/)
- [YouTube Script Length — PrePublish](https://prepublish.ai/blog/youtube-script-length-word-count)
- [Speaking Speed by Language — Lingochampion](https://lingochampion.com/en-US/research/wpm-statistics/)
- [WPM Speaking Guide — Flowshorts](https://flowshorts.app/blog/words-per-minute-speaking)
- [7x7 Rule — Verdana Bold](https://www.verdanabold.com/post/powerpoint-101-the-7x7-rule)
- [6x6 Rule — WPS](https://www.wps.com/blog/6x6-powerpoint-rule-what-is-it-and-how-to-use-it/)
- [The Pudding](https://pudding.cool/)
- [Scrollytelling examples — Maglr](https://www.maglr.com/blog/best-scrollytelling-examples)
- [ChatGPT vs Perplexity comparison — SE Ranking](https://seranking.com/blog/chatgpt-vs-perplexity-vs-google-vs-bing-comparison-research/)
- [Wikipedia:Article size](https://en.wikipedia.org/wiki/Wikipedia:Article_size)
- [Wikipedia:Words per article](https://en.wikipedia.org/wiki/Wikipedia:Words_per_article)
- [Korean Reading Speed — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5469923/)
- [Hangul Reading Research — PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9010524/)
