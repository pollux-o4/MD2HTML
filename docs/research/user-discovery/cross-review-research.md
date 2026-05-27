---
id: cross-review-research
type: cross-review
reviewer: research-cross-reviewer
reviewed:
  - paper-information-density
  - web-ai-content-fatigue
  - web-info-density-empirical
  - web-md-tools-comparison
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - 4 docs *강한 일치*: "밀도 ≠ 잡음" 원칙이 학술/empirical/담론/경쟁사 4 도메인 전부에서 보강 — design P0 후보 1순위
  - *모순 1건*: seed 가설 "YouTube/PPT 밀도" 평가에서 학술 doc은 지지, empirical 은 명시 반박 — empirical 이 더 신뢰 (매체 mismatch 구조적 비판)
  - *약한 triangulation*: 한국 사용자 1차 데이터가 4 docs 통틀어 부족, AI 다양성 결핍 → 시각 chunking 가설은 학술 doc 단독 주장
- **md-show-me 시사점**: P0 5개 (밀도/artifact/길이 아님/layer-cake/TLDR) 는 자신 있게 design, P1 5개는 dogfood 후 검증
- **증거 강도 / 한계**: 4 docs 메타 검증 — 각 doc 의 출처 신뢰도 명시, DORA 인용/Thariq attribution 약점 지적
- **읽는 가치**: design 결정에 *어떤 근거가 얼마나 강한지* 알고 싶을 때, 추가 리서치 우선순위 정할 때

# Research Cross-Review — 4 docs 통합 검증

## 1. 방법론 검증 (per doc)

**paper-information-density (학술)**: 증거 강도 구분이 4 docs 중 가장 정직 — 출처 신뢰도 표를 별도 섹션으로 두고 "Tufte/Mayer/Mangen 높음, Bret Victor 중간 (peer-review X), arxiv 2025 preprint 중간, 'AI slop' 통념 낮음" 식으로 명시. 한계도 §4 에서 "*직접적인* AI text reading fatigue RCT 는 거의 없다" 라고 자기 한계를 먼저 토로. **문제 1건**: Wolf(2018) *Reader, Come Home* 은 신경과학 *가설* 인데 본문에서 "신경과학으로 확장" 이라는 표현이 검증된 사실처럼 읽힐 여지. 한계 표시 가벼움.

**web-ai-content-fatigue (담론)**: 인용 quote 가 풍부하고 URL 다수 부착. 영어권 vs 한국어권 격차도 §3 에서 "한국어권 *직접* 토로 자료는 얕다 — 추가 1차 인터뷰 필요" 라고 솔직히 명시. **문제 2건**: (a) DORA 2025 "review time +91%" 인용이 codeant.ai 블로그 경유 — 원전 DORA 리포트 직접 확인 부재 (cherry-pick 위험 중간). (b) "Markdown 100+ 줄 안 읽힌다 → HTML 로 가자" 의 newsglobenow.com 출처는 Anthropic 공식 채널이 아님 — Thariq Shihipar 발언 attribution 검증 약함. 이건 seed 가설의 핵심 근거인데 출처가 가장 약함.

**web-info-density-empirical (empirical)**: 수치 표가 풍부하고 단위·매체별로 카테고리 분리한 점 우수. seed 가설을 "**부분 confirm, 매체 mismatch nuance**" 로 직접 반박한 부분이 cross-review 관점에서 가장 강한 메타-비판. **문제 1건**: §6 한국어 시각 점유 "15~25% 더 여백" 권고가 "design intuition, 정량 데이터 부족" 이라고 본인이 인정 — 그런데 §7 권장치 표에 그 보정이 *반영된 것처럼* 들어가 있어 권고-증거 간 격차 노출.

**web-md-tools-comparison (경쟁사)**: 8개 도구 비교가 균일하고 unmet need 의 3교집합 도출이 깔끔. **문제 1건**: §6 한국 사용자 적용이 *전체가* "추측 영역" 으로 라벨링 — 정직하지만 design 결정 근거로 쓰기엔 약함. 다른 doc 의 한국어권 데이터와 cross-check 안 됨.

## 2. 결론 일관성 — 일치 / 모순

**강한 일치 (4 docs 모두 같은 방향)**:
- *밀도 ≠ 잡음*: 학술 (Tufte data-ink) / empirical (인포그래픽 high data-ink) / 담론 (verbose-but-empty 가 1순위 불만) / 경쟁사 (Perplexity 의 terse-but-fact-dense 선호) — 4 도메인 모두 "신호 밀도 ↑, 잡음 ↓" 로 수렴. **= 가장 신뢰 가는 design 원칙**.
- *길이 자체가 적이 아니다, 밀도가 적이다*: empirical (ChatGPT 5 짧아졌더니 더 욕먹음) + 담론 (HN GPT-5 backlash) + 학술 (Wikipedia 717 단어 article 이 표준) 일치.
- *artifact 화 / 공유 가능성 갭*: 경쟁사 (NotebookLM export 부재, Claude Code 세션 휘발) + 담론 (reviewer 부담 비대칭) 이 같은 방향.

**모순 1건**: seed 가설 "YouTube/PPT 밀도가 적절" 평가에서 학술 doc 은 *지지* (TED 163 WPM, segmenting principle 인용으로 "PPT-like 가 좋다" 톤) 하는데, empirical doc 은 *명시 반박* ("PPT 의 슬라이드당 10 words 는 2채널 전제 — 단일 채널 HTML 에 직역 부적절"). **empirical 쪽이 더 신뢰** — 매체 mismatch 라는 구조적 비판이 학술 doc 의 일반론보다 design 결정에 직접적.

**약한 모순 1건**: 학술 doc §6.7 "상호작용은 최후의 수단 (Bret Victor)" vs 경쟁사 doc §4 "쿼리별 ad-hoc 큐레이션" (= 본질적으로 사용자 입력 = 상호작용). 해석 차이로 봉합 가능하나, "첫 화면 정직 노출" vs "쿼리 응답 surface" 의 긴장은 design 단계에서 재논의 필요.

## 3. Seed 가설 통합 평가

사용자 seed: *"AI 글 지친 사람. YouTube/PPT 정보 밀도. 정리된 거 보고 싶음"*

| 부분 | 평가 | 근거 |
|---|---|---|
| "AI 글 지친 사람" | **검증** (단, 학계 컨센서스는 약함) | 담론 doc 의 HN/한국어권 quote 풍부, 학술 doc 의 arxiv 2025 papers (preprint) |
| "YouTube/PPT 정보 밀도" | **반박 + nuance**: 매체 mismatch | empirical doc 이 "스크롤 HTML 은 단일 채널 — Perplexity + Wikipedia 의 중간이 더 적합" 으로 교체 권고 |
| "정리된 거 보고 싶음" | **검증** | 4 docs 모두 일치 (밀도 ≠ 잡음, signal/noise 비율) |
| "AI 냄새 자체 해결" | **미검증 / 도구 범위 밖** | 담론 doc §6.3 "원문 못 건드림 → 읽기 mode 토글" 권고. 별도 검증 필요 |
| "asymmetric cost 완화" | **검증** | 담론 doc + 경쟁사 doc 일치 — 핵심 use case |

## 4. Triangulation 강/약

**강한 triangulation**: *밀도-신호 원칙* 은 학술-empirical-담론-경쟁사 4개 도메인 전부에서 보강됨. design 결정 P0 후보.

**약한 triangulation 2건**:
1. *한국 사용자 특수성*: empirical doc 만 정량 수치 (한글 250~350 WPM, 시각 점유 15~25% 여백) 제공 — 학술 doc 은 KCI 연구 1건만, 담론 doc 은 일반 글쓰기 커뮤니티 중심, 경쟁사 doc 은 전부 추측. **한국 dev 1차 데이터가 4 docs 통틀어 부족**.
2. *AI 피로 → 시각적 chunking 보완* 가설: 학술 doc §6.5 가 단독 주장. empirical/담론/경쟁사 어디서도 직접 보강 없음. plausible 하나 cross-domain 검증 부재.

## 5. Design 시사점 통합 리스트

**P0 (근거 강함, 4 도메인 중 3+ 보강)**:
1. **신호 밀도 ↑, 잡음 ↓** (Tufte + 인포그래픽 + Perplexity terse + verbose-but-empty 불만) — 4/4 도메인 보강.
2. **공유 가능한 self-contained HTML artifact** (경쟁사 unmet need + 담론 reviewer 부담) — 2 도메인 강.
3. **길이가 아니라 밀도가 적** (empirical GPT-5 backlash + Wikipedia 717 단어 표준 + 담론) — 3 도메인.
4. **layer-cake 스캔 유도 — 헤딩/볼드/callout 트리거** (학술 NN/g 2017 + empirical Wikipedia 단락 구조).
5. **TLDR + "여기까지 = 80% 정보" 표시로 asymmetric cost 완화** (담론 §6.2 + 경쟁사 NotebookLM 갭).

**P1 (근거 약함, 1~2 도메인 단독 주장)**:
6. **읽기 mode 토글 (원문 / TLDR / AI 냄새 제거)** (담론 doc 단독).
7. **AI 다양성 결핍 → 시각 리듬으로 보완** (학술 doc 단독, arxiv preprint 가설).
8. **한국어 화면 +15~25% 여백** (empirical doc 단독, design intuition).
9. **stale 감지 (M5) 강화 — 코드 ↔ 문서 동기** (담론 doc 단독, 그러나 use case 강함).
10. **상호작용 최후의 수단 — 첫 화면 노출 최대** (학술 doc 단독, 경쟁사 doc 의 쿼리 surface 와 약한 긴장).

## 6. 추가 조사 권장

- **한국 dev 1차 인터뷰** (3~5명) — 4 docs 통틀어 가장 큰 gap.
- **DORA 2025 원전** 직접 확인 — review time +91% 인용 근거 보강.
- **md vs html 100+ 줄 가독성 실측** — Thariq Shihipar 발언 검증.
- **AI 다양성 결핍 → 시각 chunking 보완** 가설의 prototype A/B 측정.
