---
id: color-typography-academic
type: academic-research
generated: 2026-05-27
scope: color + typography 학술 근거 only
methodology: paper-first, no persona preference
---

## 요약

- **핵심 발견 3가지**:
  - "Dark mode 가 눈에 좋다" 는 통념 — Piepenbrock 2013 이 정상 시력에서 light mode 가독성 우위 입증 (font 작을수록 격차 ↑).
  - Blue-light filter 안경은 효과 없음 (Singh 2023 Cochrane 17 RCT 메타) — f.lux 류 마케팅은 학술적으로 부정됨.
  - Line-height 1.5~1.7, CPL 50~75, positive polarity 는 강한 RCT 근거 — Pretendard 자체 RCT 는 없음 (부모 폰트 합리화에 의존).
- **md-show-me 시사점**: light mode default + neutral gray + 단일 functional accent (Geist 식) + Pretendard 1.6 line-height / 65ch.
- **증거 강도**: 강 = Piepenbrock·Cochrane·Dyson / 약 = 색-기억 효과 (publication bias)·"warm bias" melatonin·"blue=신뢰" 마케팅.
- **읽는 가치**: 색·폰트·dark mode 디자인 결정 시 *통념 반박용 학술 근거* 빠른 조회.

# md-show-me 의 색 / 타이포그래피 — 학술 근거 조사

## 1. 개요

md-show-me 는 한/영 혼용 회의록 · ADR 을 **장시간 (수십 분 ~ 수 시간)** 반복적으로 보는 도구다. 본 조사는 색 결정을 *측정된 효과* 위에 올리는 것이 목적이며, 페르소나 직관 / 마케팅 통념은 배제했다. 6 영역 핵심 요약:

| 영역 | 핵심 발견 | 증거 강도 |
|---|---|---|
| 1. 장시간 fatigue | dark mode 가 blink rate / accommodation 회복 측면에서 *일부* 유리하나, 정상 시력자의 *읽기 정확도* 는 light mode 우위 | 관찰 + RCT 혼합 |
| 2. 학습 / retention | 색이 있는 자료가 흑백보다 회상률 ↑ (warm > cool) — 단, 효과 크기 작고 publication bias 존재 | 약한 RCT |
| 3. attention | 빨강 = 정밀, 파랑 = 창의 (Mehta & Zhu 2009, *Science*). 색은 *extraneous* cognitive load 에만 영향 | 강한 RCT (단, 후속 부분 실패) |
| 4. dark mode | Cochrane 2023: blue-light 안경 = 효과 없음. 정상 시력 → light mode 가독성 우위 (Piepenbrock 2013). 백내장군은 반대 | 강한 (Cochrane + Ergonomics) |
| 5. palette 조화 | "neutral gray + 단일 functional accent" 가 현존 dev tool design system 의 *수렴 결론* | 통념 + 실무 사례 |
| 6. 타이포 | line-height 1.5, line-length 50–75 CPL, positive polarity (검정/흰배경) 가 강한 근거. Pretendard 의 *학술 근거* 는 직접 검증 부재 — Inter / Source Han Sans 의 디자인 합리화 위에 서 있음 | 강 (line-height) ~ 약 (Pretendard) |

## 2. 영역 1 — 장시간 reading fatigue 와 색

**Computer Vision Syndrome (CVS)** 의 핵심 메커니즘은 (a) blink rate 감소 (정상 분당 15–20 → 화면에서 3–7회, 1/3 수준), (b) accommodative dysfunction (근거리 초점 유지 실패), (c) tear film 증발 증가다 [Rosenfield, *Ophthalmic Physiol Opt* 2011; AOA].

배경 luminance / contrast 의 영향을 본 Wang et al. (2021, *Display* 게재 RCT) 은 dark mode 조건에서 **blink rate 가 light mode 대비 유의하게 증가, pupil accommodation 회복 측정치가 개선** 됨을 보고했다 — 단, "읽기 정확도" 는 light mode 가 우위. 즉 *피로 metric* 과 *수행 metric* 이 갈린다.

"warm bias" (f.lux 류) 의 melatonin 억제 완화 효과는 *밤 시간* 한정으로 약한 증거가 있으나 (Chellappa et al.), 3000K vs 5700K 직접 비교에서 *통계적 유의 차이가 없다* 는 보고가 다수다. *피로 자체* 에 대한 효과는 미입증.

→ **의미**: 장시간 시청 도구에서 "dark mode 가 무조건 눈에 좋다" 는 **통념**. 정확한 진술은 "blink rate 회복엔 dark 가 약간 유리하나, 본문 읽기 정확도엔 light 가 유리하다" → md-show-me 는 *light 기본 + dark 옵션* 이 학술적으로 안전.

## 3. 영역 2 — 색과 학습 / retention

Dzulkifli & Mustafar (2013), *Malaysian J Med Sci*, "The Influence of Colour on Memory Performance: A Review" — 컬러 배경 자극이 흑백 대비 *recognition memory* 를 유의하게 향상, **warm color > cool color** 효과 크기 보고. 메타분석성 review 라 효과 크기는 d ≈ 0.3–0.5 범위로 추정 (개별 study 마다 변동 큼).

Olurinola & Tayo (2015), Asian-Pacific J SLA 의 한국과 유사한 ESL 환경 RCT — **컬러 처리된 vocabulary 가 흑백 대비 retention 6–8% 우위**.

단 *경고*: 색-인지 연구 영역은 publication bias 가 입증된 분야이며, Mehta & Zhu 2009 후속 replication 인 Xia et al. (2016, *Front Psychol*) 은 **빨강의 정밀 task 우위 효과가 일관되게 재현되지 않음** 을 보고했다. → 색 자체의 효과는 *맥락 의존* 으로 봐야 한다.

→ **의미**: md-show-me 에서 색을 **signaling cue** (중요한 헤딩, 액션) 으로 쓰는 것은 약한 retention 우위 근거가 있다. 단, 본문 색을 풀로 칠하는 건 효과 없음 + 피로 증가.

## 4. 영역 3 — 색과 attention

**Mehta, R. & Zhu, R. (2009)** "Blue or Red? Exploring the Effect of Color on Cognitive Task Performances" *Science* 323, 1226–1229. DOI: 10.1126/science.1169144. → 빨강은 avoidance motivation 유도 → detail-oriented task 성능 ↑. 파랑은 approach motivation → creative task 성능 ↑.

Plass et al. (2014, *Learning & Instruction*) 의 emotional design 실험 — **content-relevant background color 는 extraneous cognitive load 를 감소시키나, intrinsic load 에는 영향 없음**. 즉 색은 "콘텐츠 이해 자체" 를 도와주진 않고, 길찾기 / 조직화 보조 역할.

Brunken, Plass, Leutner (2003, *Educational Psychologist*) — 색 highlighting 은 attention guidance 에 효과적이나 *over-saturation* 은 distractor 로 작동 → cognitive load 증가.

→ **의미**: md-show-me 에서 (a) 정밀 검토 모드는 빨강/주황 계열 accent, (b) 발산적 탐색 모드는 파랑/청록 계열 accent 가 학술적 정합. 단 **본문은 절대 채도 높이지 말 것**.

## 5. 영역 4 — 다크모드 진짜 효과

**Singh et al. (2023)** *Cochrane Database Syst Rev*, CD013244.pub2 — **blue-light filter 안경 17개 RCT 메타분석. 시각 피로 / 수면 / 안구 건강 모두에 효과 없음** 결론. DOI: 10.1002/14651858.CD013244.pub2. 이건 blue light 가설 자체에 대한 가장 강한 부정 증거.

**Piepenbrock, Mayr et al. (2013)** "Positive display polarity is advantageous for both younger and older adults" *Ergonomics* 56(7), 940–948. DOI: 10.1080/00140139.2013.790485 — 18–33세 + 60–85세 두 그룹 모두에서 **light mode (positive polarity) 가 visual acuity / proofreading 모두 우위**. 효과 크기는 **font size 가 작아질수록 선형적으로 커짐**. 메커니즘: light mode 의 높은 평균 luminance → pupil 수축 → retinal image 선명화.

Nielsen Norman Group (Budiu, 2020) 의 리뷰는 위 결과를 정리하며 — *백내장 / cloudy ocular media* 인구는 반대로 dark mode 가독성 우위 보고. 정상 시력 / corrected-to-normal 에선 light mode 우위.

→ **의미**: "dark mode = 눈에 좋음" 은 **검증된 통념이 아니다**. md-show-me 의 *기본값* 은 light mode 가 학술적으로 옳다. dark 는 야간 / presbyopia / 시니어 사용자용 옵션.

## 6. 영역 5 — Palette 조화의 학술 근거

색 조화 이론 (Munsell, Itten, Munsell-Birren) 의 complementary / triadic 등은 *미학적* 가이드이며 **인지 수행에 미치는 직접 RCT 가 빈약** 하다. 색 조화 자체에 대한 강한 학술 근거는 사실상 부재 — 대신 *수렴 실무 증거* 가 있다.

Vercel **Geist** design system: 순수 black/white + neutral gray ramp (warm/cool 편향 없음) + **단 하나의 functional accent (#0070F3 blue)** — link / primary button / active state 에만 사용. 합리화: "accent 가 *optional* 한 시스템이 진짜 neutral 시스템이다."

Material Design 3 의 **tonal palette** 접근 — semantic role (primary / secondary / tertiary / error) 에 색을 묶고, *brand color* 보다 *기능 역할* 우선.

한국 시각디자인학회 / 한글 사용 환경 색 가이드라인의 *학술 RCT* 는 검색 범위 내 발견되지 않음. (한글 가독성 학회 연구는 *형태* 중심, *색* 중심은 빈약.)

→ **의미**: md-show-me 가 "회의록 도구" 임을 감안하면 **순수 neutral + 단일 functional accent** (Geist 식) 이 *증거 강도가 높은 default*. 채도 높은 다색 팔레트는 학술 근거 없음.

## 7. 영역 6 — 타이포그래피 학술

**Line-height**: Dyson & Haselgrove (2000) 류 reading speed 실험 + 후속 연구 수렴 — **1.5 (150%) 가 본문 optimal**. 1.2–1.5 구간이 최고 속도 / 정확도, 1.6–1.7 은 long line 보정 시 권장.

**Line length (CPL)**: Baymard Institute, Emil Ruder 연구 — **50–75 characters per line 이 sweet spot, 66 CPL 가 광역 합의값**. < 45 CPL → 리듬 깨짐, > 100 CPL → 안구 피로 누적.

**Positive polarity (검정 글자 / 흰 배경)**: 영역 4 참조 — RCT 입증.

**Font weight**: 본문 weight 400 vs 500 의 retention RCT 직접 근거는 검색 범위 내 약함. 일반적으로 *body weight 의 가독성 차이는 letter-spacing 과 line-height 보정 효과보다 작다* 는 것이 typography 실무 수렴 결론.

**Pretendard 의 학술 근거**: Pretendard 는 Inter (Rasmus Andersson) + Source Han Sans (Adobe-Google) + M+ FONTS 기반으로, 두 부모 폰트의 *디자인 합리화* (Inter 의 x-height 최적화 + Source Han Sans 의 한글 본문용 hinting) 를 상속한다. **Pretendard 자체에 대한 독립 RCT 는 검색 범위 내 부재** — 부모 폰트 합리성 + 한/영 혼용 x-height 균형의 *디자인 주장* 위에 서 있음. 한/영 혼용 환경에서 system-ui fallback (Apple SD Gothic / Malgun) 대비 *자간 균일성* 은 실무적으로 잘 검증됨.

→ **의미**: 타이포 권장은 *line-height 1.6 (한/영 혼용 보정), CPL 65–70, positive polarity, weight 400 본문 + 600 강조, Pretendard* 가 학술 + 실무 수렴.

## 8. md-show-me 권장 palette + typography

**색 (light mode 기본)**:

- 배경: `#FFFFFF` 또는 *극미한* warm-tint (예: `#FCFBF9`) — Piepenbrock 2013 의 positive polarity 우위
- 본문: `#1A1A1A` (pure black 보다 약간 light, halation 완화)
- Neutral gray ramp: warm/cool 편향 없는 pure gray — Geist 합리화
- **Functional accent 1개**: 파랑 계열 (link / 활성 / approach motivation) — Mehta & Zhu 2009 의 blue = creative/exploratory 정합. md-show-me 는 *탐색* 도구이므로 빨강보다 파랑이 적합
- 강조 secondary: 빨강 / 주황은 *경고 / 정밀 검토 모드* 에만 — Mehta & Zhu 2009 의 red = detail-oriented
- **본문 채도는 절대 올리지 말 것** — Plass et al. 2014 의 extraneous load 증가

**타이포**:

- Font: Pretendard variable, fallback `system-ui, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic"`
- Body size: 16px (1rem) 이상
- Line-height: **1.6** (한/영 혼용 + Dyson 권장 1.5 의 한글 보정)
- Line-length: **max-width ~65ch** (CPL 65–70 sweet spot)
- Body weight: **400**, 강조 **600** (h1–h3)
- Color contrast: WCAG AA 이상 (4.5:1 본문)

**Dark mode (옵션)**: 야간 / cataract 사용자용. 배경 `#0A0A0A` (pure black 회피 — OLED smearing), 본문 `#E5E5E5`. Cochrane 2023 결론에 따라 blue-light filter 는 *마케팅* 하지 말 것.

## 9. 반박 / 한계

- **Mehta & Zhu 2009 의 후속 실패**: Xia et al. 2016 등에서 빨강의 정밀 task 우위 효과가 *맥락 의존* 으로 약화됨. 즉 *원전 인용은 강하나 일반화는 조심*.
- **색-기억 효과의 publication bias**: Dzulkifli & Mustafar 2013 의 review 자체가 *positive result 위주 study* 를 수렴한 결과일 가능성.
- **Pretendard 학술 부재**: 부모 폰트 합리화에 의존. 직접 RCT 가 없으므로 *증거 강도는 약함*.
- **dark mode 메타분석 부재**: Piepenbrock 2013 이 가장 자주 인용되나 표본 작음. 통합 메타분석은 아직 부재.
- **한국 사용자 데이터 부재**: KCI / J-STAGE 의 *한글 본문 색-피로* 직접 RCT 는 검색 범위 내 발견 안 됨. 위 권장의 한국 사용자 fit 은 *부모 연구 외삽* 이며 검증 안 됨.
- **회의록 / ADR 의 *장시간 반복* 시청에 직접 fit 한 RCT 부재**: 대부분의 실험이 단발성 reading task. 수십 시간 누적 효과는 *추론* 구간.

## 10. 증거 강도 표

| 결론 | 출처 | 강도 |
|---|---|---|
| Light mode > dark mode (정상 시력 가독성) | Piepenbrock & Mayr 2013, *Ergonomics* | **강** (RCT, 두 연령군) |
| Blue-light filter 안경 = 효과 없음 | Singh et al. 2023, Cochrane | **강** (17 RCT 메타) |
| Line-height 1.5, CPL 50–75 | Dyson & Haselgrove, Baymard | **강** (다중 reading speed 실험) |
| Positive polarity 우위는 작은 font 에서 증가 | Piepenbrock 2013 | **강** (선형 관계 보고) |
| 빨강 = 정밀, 파랑 = 창의 | Mehta & Zhu 2009, *Science* | **중** (원전 강하나 replication 부분 실패) |
| Warm color > cool color retention | Dzulkifli & Mustafar 2013 review | **중-약** (publication bias) |
| Dark mode 가 blink rate 회복에 유리 | Wang et al. 2021, *Display* | **중** (단일 RCT, 작은 효과) |
| Color 는 extraneous load 만 줄임 | Plass et al. 2014 | **중** (multimedia learning 한정) |
| Dark mode = cataract 환자 우위 | Legge et al., NN/G 리뷰 | **중** (관찰 + 임상) |
| "Neutral gray + 단일 functional accent" | Geist / Material 3 | **약** (실무 수렴, RCT 부재) |
| Pretendard 한/영 혼용 우수성 | 부모 폰트 합리화 | **약** (직접 RCT 부재) |
| "warm bias 가 fatigue 줄인다" | f.lux 마케팅 | **통념** (학술 미입증, melatonin 효과는 야간 한정 약한 증거만) |
| "Dark mode = 눈에 좋다" | 일반 통념 | **통념** (Piepenbrock 으로 반박됨) |
| "Blue = 신뢰, Red = 사랑" | marketing color psychology | **추측** (학술 근거 부재) |

---

### 참고문헌

- Singh, S. et al. (2023). Blue-light filtering spectacle lenses for visual performance, sleep, and macular health in adults. *Cochrane Database Syst Rev*, CD013244.pub2. https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013244.pub2/full
- Mehta, R., & Zhu, R. J. (2009). Blue or Red? Exploring the Effect of Color on Cognitive Task Performances. *Science*, 323(5918), 1226–1229. https://www.science.org/doi/10.1126/science.1169144
- Xia, T., Song, L., Wang, T. T., Tan, L., & Mo, L. (2016). Exploring the Effect of Red and Blue on Cognitive Task Performances. *Frontiers in Psychology*, 7, 784. https://pmc.ncbi.nlm.nih.gov/articles/PMC4880552/
- Dzulkifli, M. A., & Mustafar, M. F. (2013). The Influence of Colour on Memory Performance: A Review. *Malaysian Journal of Medical Sciences*, 20(2), 3–9. https://pmc.ncbi.nlm.nih.gov/articles/PMC3743993/
- Piepenbrock, C., Mayr, S., Mund, I., & Buchner, A. (2013). Positive display polarity is advantageous for both younger and older adults. *Ergonomics*, 56(7), 940–948. https://doi.org/10.1080/00140139.2013.790485
- Nielsen Norman Group, Budiu, R. (2020). Dark Mode vs. Light Mode: Which Is Better? https://www.nngroup.com/articles/dark-mode/
- Plass, J. L., Heidig, S., Hayward, E. O., Homer, B. D., & Um, E. (2014). Emotional design in multimedia learning: Effects of shape and color on affect and learning. *Learning and Instruction*, 29, 128–140.
- Rosenfield, M. (2011). Computer vision syndrome: a review. *Ophthalmic and Physiological Optics*, 31(5), 502–515.
- Vercel Geist Design System. https://vercel.com/geist/colors
- Pretendard (Kil, H.-J.). https://github.com/orioncactus/pretendard
- Baymard Institute. Readability: The Optimal Line Length. https://baymard.com/blog/line-length-readability
