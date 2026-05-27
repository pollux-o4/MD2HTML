---
id: cognition-and-cross-domain
type: foundational-research
generated: 2026-05-27
sources_cited:
  - "Cleveland & McGill (1984), JASA, doi:10.1080/01621459.1984.10478080"
  - "Mackinlay (1986), ACM TOG, doi:10.1145/22949.22950"
  - "Heer & Bostock (2010), CHI, doi:10.1145/1753326.1753357"
  - "Miller (1956), Psychological Review, doi:10.1037/h0043158"
  - "Cowan (2001), Behavioral and Brain Sciences, doi:10.1017/S0140525X01003922"
  - "Sweller (1988), Cognitive Science, doi:10.1207/s15516709cog1202_4"
  - "Mayer (2009), Multimedia Learning, 2nd ed., Cambridge UP"
  - "Wertheimer (1923), Untersuchungen zur Lehre von der Gestalt II"
  - "Nielsen Norman Group (2017), https://www.nngroup.com/articles/how-people-read-online/"
  - "Tufte (1983), The Visual Display of Quantitative Information"
  - "Few (2012), Show Me the Numbers, 2nd ed."
  - "WCAG 2.2 (W3C, 2023), https://www.w3.org/TR/WCAG22/"
  - "Reuters Institute Digital News Report 2024"
  - "https://press.stripe.com/"
  - "https://pudding.cool/"
  - "https://developer.mozilla.org/"
  - "https://www.axios.com/"
  - "https://en.wikipedia.org/"
---

## 요약

- **핵심 발견 3가지**:
  - Position 인코딩이 색·면적보다 압도적 우위 (Cleveland-McGill 1984, 30년간 재현).
  - 사람은 안 읽고 스캔한다 — F·layer-cake·spotted·lawn-mower·pinball 패턴 보편 (NN/g 13년 데이터).
  - 워킹 메모리는 4±1 chunk (Cowan 2001, Miller 7±2 는 보수적 상한).
- **md-show-me 시사점**: 카드 3~5개/row, 라벨 직접 부착, 색은 2nd order — Wikipedia + MDN 의 layer-cake + signaling 조합이 best fit.
- **증거 강도**: 강 = Cleveland-McGill·Cowan·Sweller·Mayer·Reuters DNR 2024 / 약 = "attention 8초" myth (인용 금지).
- **읽는 가치**: 시각 primitive (표·카드·차트·SVG) 결정의 인지 근거 빠른 조회.

# 인지 원리 + cross-domain 시각 디자인 — md-show-me foundational

## 1. 개요

조사 방법: (a) Stage A 원천 paper 우선 fetch — Wikipedia 의 paper 요약 + 가능한 경우 원전 PDF, (b) Stage B 사이트 8개 직접 fetch (Vox / Stratechery 일부 차단 → 2차 보완 명시), (c) Stage C 트렌드 Reuters DNR 2024.

가장 강한 신호 3가지:
1. **Position 인코딩이 압도적 — 색·면적은 보조** (Cleveland-McGill 1984, 30년간 재현).
2. **사람은 안 읽고 스캔한다 — 13년간 변하지 않음** (NN/g eye-tracking, n>500). F-pattern 외 layer-cake·lawn-mower·pinball 추가.
3. **워킹 메모리는 4±1 chunk** (Cowan 2001 — Miller 7±2 는 보수적 상한). 한 화면에서 *동시* 비교 대상은 4개를 넘기면 안 됨.

## 2. 시각 인지 원리 5개

### 2.1 인코딩 효과성 위계 (Cleveland & McGill 1984)
실험에서 측정한 정확도 순서:
**(1) 공통 축 위 위치 > (2) 비공통 축 위치 > (3) 길이 > (4) 각도/기울기 > (5) 면적 > (6) 부피·곡률 > (7) 색 명도·채도**.
Mackinlay (1986) 이 quantitative/ordinal/nominal 별로 확장; Heer & Bostock (2010) crowdsourced 재현으로 거의 동일 순서 확인.
→ **md-show-me 시사**: bar / dot plot 이 pie / treemap 보다 항상 우선. SVG 만들 때 "이 데이터가 *얼마나 큰지* 비교"가 목적이면 길이/위치로, "이게 뭔지" 라벨링이 목적일 때만 색.

### 2.2 워킹 메모리 한계 (Miller 1956 → Cowan 2001)
Miller 의 7±2 는 *digit span*; Cowan 의 정련된 추정은 **4±1 chunk**. Chunk 는 학습된 단위 — 초보는 단어 1개 = 1 chunk, 전문가는 문장 1개 = 1 chunk.
→ **시사**: 카드 그리드는 한 viewport 에 3~5개. 표 컬럼 5개 초과시 분리 또는 fold. 색 카테고리도 5색 이하.

### 2.3 Cognitive Load Theory (Sweller 1988~, Mayer 2009)
세 부하: intrinsic (주제 본질 — 못 줄임) / extraneous (디자인 결함 — 줄여야 함) / germane (학습에 쓰는 자원). Mayer 의 multimedia principles 중 핵심:
- **Coherence**: 무관 요소 제거 (decoration / off-topic illustration).
- **Spatial contiguity**: 라벨과 대상은 *가까이*. legend 멀리 = nonstarter.
- **Signaling**: 핵심 강조 (굵게·색·화살표) 가 학습 향상.
- **Modality**: 텍스트 + 그림이 텍스트 + 텍스트보다 낫다 (단, dual-channel 만; redundancy 주의).
→ **시사**: SVG 옆에 캡션, 본문에서 멀리 떨어진 figure 금지. "예쁘게" 한다고 아이콘 무더기로 박지 말 것.

### 2.4 Gestalt 원리 (Wertheimer 1923)
**Proximity / Similarity / Closure / Continuity / Common fate / Prägnanz**. 자동 (전주의 attentive) 처리 — 의식적 노력 없이 grouping 됨.
→ **시사**: 카드 사이 간격 ≠ 카드 내부 간격 (proximity 가 카테고리 구분을 *공짜로* 해줌). 같은 종류 데이터에 같은 색/모양 (similarity). 표 row 줄간격이 column 간격보다 좁으면 가로 읽기, 반대면 세로 읽기 — *의도한 방향* 으로 설계.

### 2.5 스캐닝 / 읽기 패턴 (Nielsen 1997, 2017 update)
13년·500명+ eye-tracking: 사람은 *스캔* 한다. 패턴: F (텍스트 무거운 페이지), layer-cake (헤딩 풍부), spotted (링크/볼드 탐색), commitment (드물게 정독), 신규 lawn-mower (비교 표), pinball (검색 결과). 한·중·미 거의 동일 → 문화 아니라 인지 보편.
→ **시사**: 첫 두 단어가 핵심. 헤딩 = layer-cake 진입점 (자주). bullet/볼드/색은 *spotted* pattern 의 hook — 남용 금지.

## 3. Cross-domain 사이트 분석 10개

**Wikipedia** — 좁은 좌 navigation / 본문 / 우 infobox 3 column. 색 거의 없음 (링크 파랑만). 헤딩으로 layer-cake 보장. 표는 zebra-stripe + 헤더만 색. 모든 연령·도메인이 *읽기 편함* 의 default — 절제와 일관성의 승리.

**Stripe Press** — 큰 line-height, 넉넉한 margin, 흰 배경 + 강조색 책표지만 채도. 본문 폰트는 serif, 메타정보 sans. "지적 진지함" 시그널. data-ink 적용된 *읽는* 사이트.

**Substack** — 작가별 sub-domain, 본문 시작 전 메타 (제목/저자/날짜) 만 표시. 본문 폭 660~720px (eye-tracking 최적). 댓글·구독 CTA 는 본문 끝에만 — Mayer coherence.

**Pudding.cool** — scrollytelling + interactive SVG. 각 article 마다 *다른* 시각화 (template 없음 = 콘텐츠 우선). 색 사용 적극적이지만 *데이터 인코딩* 으로 (decorative 아님) → Tufte 원칙 충족.

**NYT Upshot / The Daily** — 데이터 저널리즘 표준. small multiple, annotation 이 강점. 텍스트와 차트 *동시*에 (spatial contiguity). 모바일에서 차트 분해.

**FT visual journalism** — 본문 ↔ 차트 교차 layout. 색은 brand pink + 회색 — *2nd order* (Tufte) 충실. 차트 라벨이 legend 아니라 *직접* 부착 (contiguity).

**Apple product pages** — 큰 hero, 짧은 카피, 시각 위주 scrollytelling. 한 viewport = 1 message (chunk 한계 존중). 비전문가가 *제품을 이해* 하게 만드는 데 특화 — 길이 ≠ 정보량.

**Bloomberg interactive** — 조밀한 정보 + 강한 색 강조 (terminal 유산). 일반인에겐 과부하 가능; 전문가 chunk capacity 가 다르다는 증거. *대상 청중* 에 따라 적정 밀도가 다름. (직접 fetch 차단 — 2차 자료 기반).

**Vox / Axios explainers** — Axios "Smart Brevity": bullet + "Why it matters" + "Go deeper". signaling principle 의 극단형. 짧은 글 = 짧은 attention 에 맞춤. 색 아이콘으로 카테고리 (Gestalt similarity).

**MDN** — 개발자 reference 인데 *시각 정돈* 의 모범. code block 배경색·구문 강조, callout (note/warning) 색 코딩, baseline support 위젯, table-of-contents sticky. 정보 밀도 높지만 *카테고리별 시각 일관성* 으로 처리 가능하게 만듦.

## 4. 뉴스 / long-form 트렌드 (200~300단어)

Reuters Digital News Report 2024 (n=95,000 / 47개국) 의 신호:
- **News avoidance 증가** — Argentina 45% 활성 회피. Spain 의 "news fatigue" 26% → 44% (5년). 글로벌 신뢰 하락.
- **TikTok·Shorts 로 뉴스 이동** — Thailand 39%, Kenya 36% 가 TikTok 으로 뉴스 소비. 텍스트 → 짧은 비디오.
- **"attention span 8초" 주장은 myth** (Microsoft 가 인용했다는 출처 추적 실패 — 검증 안 됨). 단, *자발적 정독* 이 줄어든 건 eye-tracking 으로 측정됨.

그럼에도 **long-form 부활** 현상도 동시 — Substack / Stratechery / Lenny's Newsletter. 공통점:
1. **저자 단일성** — 브랜드가 person.
2. **이메일 push** — 알고리즘 우회.
3. **유료** — 자발적 commitment pattern 유도.
4. **타이포 절제** — 위 Stripe Press 와 같은 reading-first 디자인.

**시사 — md-show-me 의 포지셔닝**: 짧은 글 (Axios) vs 긴 글 (Substack) 양극화 중간을 노리지 말 것. *반복 정독이 필요한 reference 류 .md* 를 정돈해 보여주는 것이 best fit. Wikipedia + MDN 의 layer-cake + signaling + Gestalt grouping 조합이 가장 가까운 모델.

## 5. md-show-me 적용 — 시각 primitive 가이드 9개

1. **데이터 비교 → bar/dot 우선** (Cleveland-McGill). pie / donut / 3D / treemap 은 라벨링·페이지내 비율 표시일 때만.
2. **표는 *방향성* 설계** — 세로 비교가 목적이면 row 줄간격 좁게, 가로 비교면 column 패딩 좁게 (Gestalt proximity 가 자동 grouping).
3. **카드 그리드 3~5개 / row** (Cowan 4±1). 6개 넘으면 sub-그룹 또는 fold.
4. **색은 2nd order** (Tufte) — 1st order 는 위치/타이포. 색 카테고리 5색 이하, 색맹 안전 팔레트 (ColorBrewer 등).
5. **라벨은 직접 부착** (Mayer spatial contiguity) — legend 별도는 lawn-mower 강요. SVG 의 annotation 우선.
6. **타이포 위계 3단** — h1 (대제목) / h2 (섹션) / body. h3 이하는 layer-cake 패턴 깨짐. 한·영 혼용 시 body 16~18px, line-height 1.6~1.8 (Stripe Press 수치).
7. **여백 = chunk 경계** — 카드 *사이* 간격 > 카드 *내부* 간격 (Gestalt). 헤딩 위 여백 > 아래 여백.
8. **인터랙션은 *데이터 탐색* 에만** — hover tooltip, fold/unfold, sort. 장식적 motion (scroll fade-in 등) 은 extraneous load.
9. **첫 viewport 에 핵심 1개** (Apple, signaling) — TL;DR 카드 또는 큰 숫자/시각화. 스크롤은 정독 결심 후.

## 6. 증거 강도 표

| 항목 | 출처 | 강도 |
|---|---|---|
| Position > 색 인코딩 | Cleveland-McGill 1984 + Heer 2010 재현 | 강 (실험 paper, 재현) |
| 워킹 메모리 4±1 | Cowan 2001 BBS | 강 (consensus revision) |
| Cognitive Load 3분류 | Sweller 1988~, Mayer 2009 | 강 (교과서) |
| Mayer 12 principles | Mayer 2009 book | 강 (book), 개별 principle 별 실험 강도 차이 |
| Gestalt 원리 | Wertheimer 1923 원전 | 강 (현대 신경과학으로 일부 재해석) |
| F-pattern 보편 | NN/g 2006/2017 | 중-강 (n>500, 단 NN/g 자체 연구) |
| Tufte data-ink | Tufte 1983 | 중 (영향력 크나 실험 paper 아님 — 디자인 원칙) |
| WCAG 4.5:1 대비 | W3C 표준 | 강 (표준), 색맹 8% 남성 통계 별도 출처 필요 |
| News avoidance 증가 | Reuters DNR 2024 (n=95,000) | 강 (대규모 survey) |
| "attention span 8초" | 출처 불명 | **myth — 인용 말 것** |
| Stripe Press / MDN "잘 디자인됨" 평가 | 업계 통념 | 약-중 (직접 fetch + 디자이너 consensus, 실험 X) |
| Substack/Stratechery long-form 부활 | 업계 관찰 + 트래픽 자료 | 중 (trend, causal 입증 X) |
| Apple page 가 "비전문가에게 통함" | 추측 | 약 (UX 사례, 실험 X) |
