---
id: paper-information-density
type: academic-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - "정보 밀도 높을수록 나쁘다" 는 거짓 — 신호/잡음 비율(SNR)이 높은 고밀도가 오히려 인지 부담을 줄임 (Tufte data-ink).
  - F-패턴은 *디자인 실패의 증상* — 헤딩·볼드·callout 으로 layer-cake 패턴으로 전환 가능 (NN/g 2017).
  - AI 글 피로는 학술적으로 *방향은 맞지만* 컨센서스 약함 — 어휘 다양성 결핍 가설은 plausible.
- **md-show-me 시사점**: 첫 viewport 에 핵심 1개 + 시각 리듬(callout·표·여백)으로 AI 글 단조로움 보완, 인터랙션은 최후 수단.
- **증거 강도**: 강 = Tufte/Mayer/NN/g/Mangen/Guo 2014 / 약 = AI slop·Ahrefs 74.2%·"attention 8초" 통념.
- **읽는 가치**: HTML 뷰의 *정보 밀도·F-패턴 회피·AI 피로 보완* design 결정의 학술 근거 빠른 조회.

# Information Density & Reading Fatigue — 학술 자료 조사

## 1. 개요

md-show-me 의 *AI 생성 글 피로 → 정리된 고밀도 뷰* 가설을 학술적으로 뒷받침할 자료를 정리한다. 조사 범위는 (a) 정보 시각화 이론 (Tufte, Bret Victor), (b) 디지털 읽기 피로 (Mangen, Wolf, NN/g), (c) AI 생성 콘텐츠 피로의 emerging research, (d) 영상·슬라이드 정보 밀도 empirical 데이터. 주요 발견: **"정보 밀도가 높을수록 나쁘다" 는 거짓**이다 — 신호/잡음 비율(SNR)이 높은 고밀도가 *오히려* 인지 부담을 줄인다. 단, 모달리티 분리·세그멘트화·F-패턴 정렬이라는 전제 하에서. AI 피로는 2025년 현재 학술 논의가 막 시작된 영역 — *coherence 과잉·다양성 결핍*이 측정 가능한 신호로 떠오르고 있다.

## 2. Tufte / Bret Victor — 신호 밀도가 곧 정직함

Tufte(1983, *Visual Display of Quantitative Information*)의 **data-ink ratio** 와 **chartjunk** 개념은 단순하다: 측정값을 표현하는 잉크를 최대화하고, 장식·중복·배경을 *합리적 범위에서* 지우라. 핵심은 "줄여라" 가 아니라 "신호 비율을 높여라" — 결과적으로 *밀도는 올라간다*. Tufte 의 sparkline 이 좋은 예시다 (수치 + 추세를 한 줄에).

Bret Victor 의 *Magic Ink*(2006)는 한 발 더 나간다: 정보 소프트웨어 디자인 = **context-sensitive information graphics 디자인**이며, 상호작용은 "최후의 수단" 이다. 사용자 환경·이력·의도를 활용해 *불필요한 입력 없이* 관련 데이터를 보여주라는 주장. md-show-me 시사점: HTML 뷰는 "클릭해서 펼치세요" 형 인터랙션을 최소화하고, **첫 화면에서 가장 많은 정보를 정직하게** 보여주는 방향이 학술적으로 정당화된다.

## 3. Reading Fatigue 연구 — 스크린은 진짜로 더 피곤하다

Mangen et al.(2013, *Int. Journal of Educational Research* 58:61–68)은 노르웨이 10학년 72명을 무작위 배정해 동일 텍스트(1,400~2,000 단어)를 종이/PDF 로 읽힌 결과, **세부 회상 문항에서 종이 그룹이 유의하게 우세**했다 (메인 아이디어는 차이 없음). Wolf 의 *Reader, Come Home*(2018)은 이 결과를 신경과학으로 확장 — 디지털 환경의 짧은 스캔 습관이 "deep reading" 회로를 약화시킨다는 가설. 한국 KCI 등재 연구(전제희 외)도 유사한 결론: **세부 기억·회상에서 종이 우세, 핵심 파악은 동등**.

NN/g 의 F-pattern 연구(2006, 2017 업데이트)는 실용적이다: 사용자는 헤딩·볼드·리스트가 *없는* "벽돌 텍스트" 에서만 F-패턴으로 스캔한다. 헤딩이 있으면 **layer-cake 패턴**, 키워드 찾으면 **spotted 패턴**으로 전환. 즉 F-패턴은 *디자인 실패의 증상*이지 인간 본성이 아니다. 시사점: callout·헤딩·볼드는 장식이 아니라 **스캔 모드를 layer-cake 로 전환시키는 트리거**.

## 4. AI 생성 글 피로 — 학술적으로 검증된 것 vs anecdotal

2025년 현재 *직접적인* "AI 텍스트 reading fatigue" RCT 는 거의 없다. 다만 인접 증거는 쌓이는 중:

- **검증됨**: Agarwal et al.(arxiv:2503.16458, 2025) — "Users Favor LLM-Generated Content—Until They Know It's AI" — 출처 라벨이 같은 텍스트의 평가를 뒤집는다. *Uncanny Valley in text dialogue* (Jakesch et al., arxiv:2409.06653) — 사람들은 AI 글을 식별하진 못해도 *불편함*은 감지.
- **부분 검증**: Diversity Boosts AI-Generated Text Detection(arxiv:2509.18880) — LLM 출력은 coherence·consistency 를 위해 *어휘 다양성을 희생*. 인간 글의 자연스러운 불규칙성이 결여. 이게 피로의 근본 원인이라는 가설은 *plausible* 하지만 직접 측정은 아직.
- **검증 안 됨 (anecdotal)**: "AI slop" (Merriam-Webster 2025 Word of the Year). Ahrefs 가 새 웹페이지의 74.2% 에서 AI 생성 콘텐츠 탐지(2025). 통념으로는 강하지만 *피로 유발* 자체에 대한 통제 실험은 부족.

요점: md-show-me 의 "AI 글 지친다" 전제는 *방향은 맞지만 학계 컨센서스로는 아직 약하다*. 디자인 결정의 근거로 쓸 때는 "다양성 결핍 → 시각적 chunking 으로 보완" 같이 **연결 고리를 명시**해야 정직.

## 5. YouTube / PPT 정보 밀도 — 실제 측정값

- **TED talk**: 평균 163 WPM (일반 대화 130 WPM 대비 +25%). 발화 속도 자체가 빠른데도 comprehensible — 이유는 *철저한 사전 준비*로 verbal slip 이 거의 없기 때문. 즉 *밀도는 높이고 잡음은 0에 수렴*시킨 사례.
- **MOOC 비디오**: Guo et al.(L@S 2014, 690만 시청 세션 분석) — **6분 초과 시 engagement 가 급락**. 추천은 "6분 미만 chunk 로 미리 segment". Mayer 의 segmenting principle 의 empirical 증거.
- **Garr Reynolds, *Presentation Zen***: signal-to-noise ratio 를 통신 공학에서 차용. "신호 = 핵심 메시지, 잡음 = 나머지 전부" — 슬라이드 한 장에서 *제거해도 의미가 변하지 않는 모든 것은 잡음*.
- **Mayer 의 Cognitive Theory of Multimedia Learning**: 시각/청각 채널이 분리되어 있고 각각 용량 제한 — **modality principle** (그래픽 + 음성 > 그래픽 + 화면 텍스트), **segmenting principle** (연속 vs 사용자 페이싱 청크), **redundancy principle** (그래픽 + 음성 + 동일 텍스트는 *해롭다*).

## 6. md-show-me 적용 — Research-Backed Design Principles

1. **F-패턴은 디자인 실패의 증상이다 — layer-cake 으로 유도하라** (NN/g 2017). 좌측 상단에 citation card / 핵심 quote 를, 헤딩·볼드·callout 으로 스캔 모드 자체를 전환시킨다.
2. **Signal density ≠ visual clutter** (Tufte). 정보 밀도는 *올리고*, 장식·중복·gridline 은 지운다. 한 화면에서 *제거해도 의미가 같은 것*은 잡음.
3. **6분 / 한 챕터 룰** (Guo 2014, Mayer segmenting). HTML 뷰의 한 섹션은 약 1,000 단어 / 5~6분 읽기를 넘기지 않도록 chunk. 넘으면 collapsible 로 분리하지 말고 *시각적으로 묶음 단위*를 명확히.
4. **Modality 분리** (Mayer modality principle). 텍스트 + 도식이 같은 정보를 두 번 말하면 redundancy 로 *해롭다*. 도식은 텍스트가 *말하지 못하는 관계*(흐름·구조·비교)만 담는다.
5. **AI 다양성 결핍 → 시각적 chunking 으로 보완** (arxiv:2509.18880 가설 확장). LLM 텍스트의 어휘 단조로움이 피로를 만든다면, *시각 리듬*(callout / pull quote / 표 / 여백)으로 단조로움을 깬다.
6. **Deep reading 회로 보호** (Wolf 2018, Mangen 2013). 디테일을 정확히 기억해야 할 부분은 출처 링크 + *원문 인용 카드* 로 종이-like 정독을 유도. 스캐닝 부분과 시각적으로 구분.
7. **상호작용은 최후의 수단** (Bret Victor *Magic Ink*). "클릭해서 펼치세요" 보다 첫 뷰에서 가장 많은 신호를 정직하게 노출. 인터랙션은 사용자가 *명시적으로* 다른 시점을 원할 때만.

---

## 출처 신뢰도 표

| 자료 | 신뢰도 | 비고 |
|---|---|---|
| Tufte (1983), Mayer (multiple), Mangen (2013), Wolf (2018), Reynolds (Presentation Zen) | 높음 | peer-reviewed 또는 표준 교과서 |
| NN/g F-pattern (2006, 2017 update) | 높음 | 자체 eye-tracking 데이터, 업계 표준 인용 |
| Guo et al. L@S 2014 | 높음 | ACM 컨퍼런스, 690만 세션 |
| Bret Victor *Magic Ink* (2006) | 중간 | self-published essay, 학계 인용 다수지만 peer-review X |
| arxiv 2025 AI 관련 paper (16458, 06653, 18880) | 중간 | preprint, peer-review 진행 중일 가능성. 결론은 *방향성* 으로만 사용 |
| "AI slop" Merriam-Webster, Ahrefs 74.2% 통계 | 낮음 | 통념·시장 데이터. 학술 인용 부적합. |
| 한국 KCI 디지털 읽기 연구 (전제희 외) | 중간 | 국내 학술지 등재, 표본·재현성 추가 확인 필요 |
