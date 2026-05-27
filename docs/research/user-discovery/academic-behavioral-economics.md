---
id: academic-behavioral-economics
type: academic-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - Choice overload 는 조건부 — Scheibehenne 2010 메타분석(k=50) 효과 ≈ 0. "chip 7±2" 같은 단순 적용은 paper 근거 약함.
  - Default effect 강력 (Jachimowicz 2019 d=0.68) — "베이스라인 3 / light / no CDN" 은 단순 초기값이 아니라 *우리 입장 표명*.
  - AI 답변은 System 1 으로 소비 — Buçinca 2021 cognitive forcing 으로 System 2 강제 필요.
- **md-show-me 시사점**: citation 은 *inline 펼침 아닌 클릭* (forcing function), 첫 카드는 LLM 자신감 높을 때만 단일 표시 (anchor 정확성).
- **증거 강도**: 강 = Default effect·Anchoring·Algorithm aversion / 약 = Choice overload "7±2 chip" 통념.
- **읽는 가치**: selector / default / "더 보기" affordance design 결정의 학술 근거 + 통념 반박.

# 행동경제 / 의사결정 과학 학술 paper — md-show-me 적용 조사

## 1. 개요 + 핵심 발견 3

md-show-me 의 selector(후보 N개), default(베이스라인 3 / light / no CDN), "더 보기" affordance 는 모두 *의사결정 architecture* 문제다. 행동경제·인지심리 학술 결과를 적용 가능한 형태로 정리한다.

핵심 발견 3:
1. **Choice overload 는 조건부**다 (Scheibehenne et al. 2010 메타분석, k=50, effect ≈ 0). "후보 3 vs 7" 같은 디자인 결정은 *기본값* 보다 *작업의 친숙도·preference articulation 난이도* 가 좌우한다. 우리의 7±2 chip 가설은 paper 근거가 약하다.
2. **Default 는 강력하다** (Johnson & Goldstein 2003 Science, organ donation opt-in 4.3% vs opt-out 99.98%). "베이스라인 3 / light / no CDN" 은 단순 초기값이 아니라 *암묵 추천* 으로 작동 — 90%+ 사용자가 default 유지할 것으로 예상.
3. **AI 답변은 System 1 으로 소비된다** (Logg et al. 2019 "algorithm appreciation"; Buçinca et al. 2021 CHI cognitive forcing). 검증을 *마찰* 로 강제하지 않으면 사용자는 출처를 클릭하지 않는다. copy-as-prompt / citation 클릭은 *cognitive forcing function* 으로 설계해야 한다.

## 2. 영역별 조사

### A. Dual process theory (Kahneman)

- Kahneman, D. (2011). *Thinking, Fast and Slow*. FSG. — System 1/2 표준 정리.
- Buçinca, Z., Malaya, M. B., & Gajos, K. Z. (2021). To trust or to think: cognitive forcing functions can reduce overreliance on AI in AI-assisted decision-making. *Proc. ACM HCI* 5(CSCW1). DOI:10.1145/3449287 — AI 추천을 받자마자 수락하는 *overreliance* 가 기본값, *forcing function* (설명을 펼쳐야 답 보임 등) 으로 System 2 활성화 입증.

시사점: md-show-me 의 "출처 카드 / annotation / copy-as-prompt" 는 단순 UI 가 아니라 *system 2 trigger* 다. citation 을 본문에 inline 으로 펼쳐두면 안 됨 — *클릭해야 보이는* 작은 마찰이 검증 행동 유발.

### B. Choice overload

- Iyengar, S. S., & Lepper, M. R. (2000). When choice is demotivating. *J. Personality and Social Psychology* 79(6), 995–1006. DOI:10.1037/0022-3514.79.6.995 — jam 실험 (6 vs 24 종), 구매율 30% vs 3%.
- Scheibehenne, B., Greifeneder, R., & Todd, P. M. (2010). Can there ever be too many options? A meta-analytic review of choice overload. *J. Consumer Research* 37(3), 409–425. DOI:10.1086/651235 — k=50 메타분석, mean effect ≈ 0. 조건부 (전문성 부족, preference 불명확, 시간 압박 시에만 발생).

시사점: chip 7±2 가 항상 적정이라는 주장은 약함. md-show-me 사용자는 *자기 repo 컨텍스트 보유* (preference 명확) → overload 위험 낮음. 그러나 *처음 사용자* (preference 미형성) 에게는 3 개가 안전. **adaptive: 베이스라인 3 → 더 보기로 7→15 점진 확장** 가 paper 근거에 맞음.

### C. Default effect

- Johnson, E. J., & Goldstein, D. (2003). Do defaults save lives? *Science* 302(5649), 1338–1339. DOI:10.1126/science.1091721 — opt-in vs opt-out 장기기증 동의율 11% vs 86% 평균.
- Thaler, R. H., & Sunstein, C. R. (2008). *Nudge*. Yale UP. — choice architecture 개념화.
- Jachimowicz, J. M., Duncan, S., Weber, E. U., & Johnson, E. J. (2019). When and why defaults influence decisions: a meta-analysis of default effects. *Behavioural Public Policy* 3(2), 159–186. DOI:10.1017/bpp.2018.43 — d ≈ 0.68 메타분석.

시사점: "베이스라인 3 / light mode / no CDN / copy-as-prompt off" 는 *암묵 권장* 으로 작동. 90%+ 가 default 유지 → default 자체가 *우리의 입장 표명*. "light mode default" = "우리는 dark 가 best 라 생각 안 함" 메시지. CDN off default = privacy-by-default 입장.

### D. Information avoidance

- Sweeny, K., Melnyk, D., Miller, W., & Shepperd, J. A. (2010). Information avoidance: who, what, when, and why. *Review of General Psychology* 14(4), 340–353. DOI:10.1037/a0021288.
- Golman, R., Hagmann, D., & Loewenstein, G. (2017). Information avoidance. *J. Economic Literature* 55(1), 96–135. DOI:10.1257/jel.20151245 — 회피 메커니즘 (hedonic cost, regulatory action 회피, belief 보존).

시사점: AI 글 회피 (cross-review-research.md 의 web-ai-content-fatigue 참고) 는 information avoidance 의 한 형태 — *읽으면 회의·검증 부담 발생*. md-show-me 의 *progressive disclosure* (요약 → "더" → 상세) 는 회피 임계점을 낮춤. **첫 화면이 무거우면 즉시 탈출** — light, 단일 카드, 1~2 문장 anchor 가 회피 방지.

### E. Anchoring & framing

- Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: heuristics and biases. *Science* 185(4157), 1124–1131. DOI:10.1126/science.185.4157.1124 — anchoring 원전.
- Tversky, A., & Kahneman, D. (1981). The framing of decisions and the psychology of choice. *Science* 211(4481), 453–458. DOI:10.1126/science.7455683.
- Furnham, A., & Boo, H. C. (2011). A literature review of the anchoring effect. *J. Socio-Economics* 40(1), 35–42. DOI:10.1016/j.socec.2010.10.008 — robust 효과 재확인.

시사점: 첫 citation 카드 / 요약 1~2 줄이 *anchor* — 후속 chip / "더 보기" 결과 해석을 왜곡. 박지수(humanities student) 페르소나의 "PPT 1장 핵심" 요구는 anchor 의 *정확성* 이 critical 이라는 뜻 — 잘못된 anchor 면 후속 정보가 다 오해됨. **첫 카드는 LLM 신뢰도 가장 높을 때만 표시, 불확실하면 "여러 후보" 로 anchor 회피.**

### F. Trust calibration

- Lee, J. D., & See, K. A. (2004). Trust in automation: designing for appropriate reliance. *Human Factors* 46(1), 50–80. DOI:10.1518/hfes.46.1.50_30392 — *calibrated trust* (자동화 실제 능력 = 사용자 trust) 가 목표.
- Logg, J. M., Minson, J. A., & Moore, D. A. (2019). Algorithm appreciation. *Organizational Behavior and Human Decision Processes* 151, 90–103. DOI:10.1016/j.obhdp.2018.12.005 — 비전문가는 알고리즘 답을 인간 전문가보다 *선호*.
- Bansal, G. et al. (2021). Does the whole exceed its parts? Effect of AI explanations on complementary team performance. *CHI '21*. DOI:10.1145/3411764.3445717.

시사점: md-show-me 의 LLM 큐레이션 결과를 사용자가 *과신* 할 위험 (algorithm appreciation). citation 클릭률 / "이게 맞나?" annotation 이 calibration 신호. **confidence 표시 (이 큐레이션 자신 있음 / 추정) 가 trust calibration 도움** — 항상 자신만만한 톤이면 overtrust 유발.

## 3. md-show-me 직접 적용 design 결정 (paper 근거)

| # | 결정 | paper 근거 |
|---|---|---|
| 1 | **베이스라인 3 후보 → "더" 클릭 시 7→15 점진 확장** | Scheibehenne 2010 (overload 조건부) + Johnson & Goldstein 2003 (default 강력) |
| 2 | **citation 은 inline 펼침이 아닌 클릭 필요** | Buçinca 2021 (cognitive forcing) — System 2 trigger |
| 3 | **첫 카드는 LLM 자신감 높은 단일 카드, 불확실 시 "후보 보기"** | Tversky & Kahneman 1974 (anchoring) — wrong anchor 위험 |
| 4 | **light mode / no CDN / copy-as-prompt-off default** | Jachimowicz 2019 (d=0.68) — default = 우리 입장 표명 |
| 5 | **첫 화면 1~2 문장 요약, "더" 누르면 펼침** | Sweeny 2010, Golman 2017 (information avoidance) — 무거우면 탈출 |
| 6 | **큐레이션 confidence band 표시 (높음/추정)** | Lee & See 2004 (calibrated trust) + Logg 2019 (algorithm appreciation 위험) |
| 7 | **copy-as-prompt 는 토글 — 활성화 = 명시 의도** | Thaler & Sunstein 2008 (active choice) — 검증·반박 prompt 는 의식적 행동 |

## 4. 증거 강도 표

| 영역 | 증거 수준 | 비고 |
|---|---|---|
| Default effect | 강함 — RCT + 자연실험 메타 (Jachimowicz 2019, d=0.68) | 가장 확실한 근거 |
| Dual process / cognitive forcing | 중강 — CHI RCT (Buçinca 2021) 다수 replication | AI-HCI 분야 활발 |
| Anchoring | 강함 — Furnham & Boo 2011 메타 | 단 효과 크기 가변 |
| Information avoidance | 중 — 관찰·자기보고 중심 (Golman 2017 review) | 메커니즘 명확하나 effect size 가변 |
| Trust calibration | 중 — 산업·실험실 혼합 (Lee & See 2004 foundational) | AI 시대 재정립 중 |
| Choice overload | **약** — 메타분석 (Scheibehenne 2010) 효과 ≈ 0 | "7±2 chip" 같은 단순 적용은 근거 빈약 |

## 5. 반박 / 한계

- **Choice overload 통념의 위험**: Iyengar 2000 jam 실험은 *대중적으로 가장 인용* 되지만 Scheibehenne 2010 메타분석은 효과 없음. md-show-me 의 "chip 7개" 같은 결정을 paper 로 정당화하지 말 것 — paper 가 오히려 *상황 의존* 이라 말함.
- **Default effect 의 윤리적 한계**: organ donation 같은 *life-stakes* 가 아닌 도구에서 default 가 같은 강도로 작동한다는 보장 없음. md-show-me default 가 "베이스라인 3" 으로 굳어지면 *우리의 미적 취향이 사용자 행동 결정* 함을 자각해야 함.
- **Buçinca 2021 의 trade-off**: cognitive forcing 은 *정확성* 을 높이지만 *완료 시간·만족도* 를 낮춤. md-show-me 가 너무 많은 마찰을 넣으면 박지수(humanities) / 도윤(vibe coder) 페르소나는 이탈.
- **Algorithm appreciation 의 cross-cultural 일반화 의문**: Logg 2019 는 주로 미국 표본. 한국 사용자의 AI 신뢰 패턴은 다를 수 있음 (별도 web research 필요).
- **Lab vs field**: 위 paper 대부분 실험실 환경. 실제 dev tool 사용 시 *시간 압박·multitask* 컨텍스트에서 효과 크기 달라질 가능성.
- **본 조사 미포함**: regret theory (Loomes & Sugden 1982), bounded rationality (Simon 1957), satisficing vs maximizing (Schwartz 2002) — 후속 조사 가치 있음.

---

**작성 시 참고한 동료 산출물** (read-only 스캔): `cross-review-research.md`, `web-ai-content-fatigue.md`, `paper-information-density.md`, `persona-g-jisu-humanities-student.md` — 본 문서 결정이 이들과 충돌하지 않음을 확인. 특히 persona-g 의 "PPT 1장 anchor" 요구는 영역 E (anchoring) 와 정확히 맞물림.
