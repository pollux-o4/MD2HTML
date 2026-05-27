---
id: bridge-pain-persona
type: cross-review
reviewer: pain-persona-bridge
reviewed:
  - persona-a-jihoon-backend-senior.md
  - persona-b-maya-fullstack-junior.md
  - persona-c-minho-tech-lead.md
  - persona-d-jiwon-designer-tech-adjacent.md
  - paper-information-density.md
  - web-ai-content-fatigue.md
  - web-info-density-empirical.md
  - web-md-tools-comparison.md
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**: 페르소나 4종 ↔ research 4종 교차 매핑에서 가장 강한 신호 = ①AI 산출물 검토 비용 비대칭성 ②파일 단위 navigation 한계 → cluster/query 단위 요구 ③citation 가시성 = 신뢰 1차 게이트
- **md-show-me 시사점**: P0 = citation 1등 시민 + query cluster + layer-cake 위계 + 단락/페이지 정량 권장치 / P1 = artifact 공유, stale 감지, 관점 필터 / out v1 = print, AI 냄새 자동 탐지
- **읽는 가치**: 어떤 pain 이 페르소나·research 양쪽 보강 받는지 한 표로 보고 P0/P1/P2/out 매트릭스 정당화할 때

# Pain ↔ Persona Bridge — 주관과 객관의 교차 검증

## 1. 개요 — 8 docs 통합 후 가장 강한 신호 3가지

(1) **AI 산출물 검토 비용의 비대칭성** — 4명 페르소나 전원이 다른 톤으로 토로하고 (지훈의 "장황한 markdown wall", Maya 의 "skim → 60% 미신뢰", 민호의 "근거 trace 없으면 의심", 지원의 "어디서 멈출지 모름"), web-ai-content-fatigue 의 *yuliyp "attention DoS"* + *memhole "AI slop 검토 강제"* 인용이 1:1 로 보강. paper-information-density 도 *arxiv:2509.18880 다양성 결핍* 가설로 방향 일치.

(2) **파일 단위 navigation 의 한계 → cluster/query 단위 요구** — 4명 다 토로 (지훈 "30분 grep", Maya "4 탭 열고 추측", 민호 "5탭 Cmd+F", 지원 "1500단어에서 한 줄 찾기 20분"). web-md-tools-comparison 의 *Obsidian/NotebookLM/Cursor 모두 이 좁은 surface 비어 있음* 결론과 정확히 합치.

(3) **citation/source 가시성이 신뢰의 1차 게이트** — 페르소나 4명 모두 source back-link 을 비협상 항목으로 지목. paper-information-density 의 *Agarwal 2025 "출처 라벨이 평가를 뒤집는다"* + web-md-tools-comparison 의 *Perplexity 인용 오류 37~45%* 가 객관적으로 보강.

## 2. Pain 카테고리 ↔ Research evidence 매핑표

| Pain 카테고리 | 페르소나 출처 | 학술 | 담론 | empirical | 경쟁사 | 매치 강도 |
|---|---|---|---|---|---|---|
| AI 생성 verbose / 검토 피로 | A/B/C/D 전원 | 부분 (다양성 결핍 가설) | 강 (HN slop, 한국 humanize) | — | — | **strong** |
| 너무 많은 .md, 어디 봐야 할지 모름 | A/B/C 강, D 중 | — | 중 ("1000+줄 안 읽힘") | 약 (Wikipedia 8천 단어 분할 권고) | 강 (Obsidian/NotebookLM gap) | **strong** |
| Citation / source trace 부재 | C 강, A/B/D 중 | 강 (Agarwal 2025) | 중 (slop = unreviewed) | — | 강 (Perplexity 37% 오류) | **strong** |
| 시각 위계 부족 / "어디서 멈출지 모름" | D 강, A 중 | 강 (NN/g layer-cake, Tufte) | 약 | 중 (Wikipedia 단락 ≤1000 chars) | — | **strong** |
| 공유 가능한 artifact 없음 (세션 휘발) | C 강, A 중 | — | 약 | — | 강 (Claude Code/NotebookLM gap) | **medium-strong** |
| Cluster / 교차 참조 | A/C 강 | — | 약 | — | 강 (모든 도구 못함) | **medium-strong** |
| 한국어 톤 mismatch / 번역투 | A 중 (한영 짬뽕 언급), C 약 | — | 중 (한국 humanize 담론) | 약 (한글 15~25% 여백 권고) | — | **medium** |
| "AI 냄새" 자체 (em dash, 첫째둘째) | D 중, B 약 | — | 강 (em dash, "It's not X. It's Y.") | — | — | **medium** (도구로 해결 어려움) |
| Stale doc / 어떤 게 latest 인지 모름 | A/B 강 | — | 약 | — | 중 (Notion AI 같은 workspace 한정) | **medium** |
| 협업 share (PM/디자이너) | A/D 강 | — | — | — | 약 (Notion 영역) | **medium** (리스크 영역) |
| Editorial 시각 품질 (typography, 여백) | D 강, B 중 | 중 (Tufte data-ink) | — | 중 (Pudding/Snow Fall dwell time +62%) | — | **medium** |
| Print 친화 (A4 출력) | C 만 | — | — | — | — | **weak** |
| Keyboard shortcut / command palette | B 만 | — | — | — | — | **weak** |

## 3. Academic 만 있고 페르소나 무관 영역

- **Mayer modality principle (텍스트+그래픽 중복 = 해롭다)** — 페르소나 누구도 "도식이 텍스트와 중복돼서 피로" 라고 말 안 함. 학술 가이드라인이지 사용자 호소 아님 → *잠재* 카테고리.
- **Mangen 2013 종이 vs 디지털 세부 회상 차이** — 페르소나는 "디지털이라 못 외운다" 토로 없음. 도구 디자인에 직접 적용은 약함.
- **Wolf 의 deep reading 회로 약화** — 거대 담론이지만 페르소나 4명 누구도 자기 문제로 인식 안 함. *학술 노이즈* 에 가까움.
- **TED talk 163 WPM, MOOC 6분 룰** — 시간축 매체 metric 인데 페르소나는 스크롤 HTML 용 가이드 원함. 직접 적용 부적합 (empirical doc 자체도 인정).
- **3채널 (modality / segmenting / redundancy) 정밀 가이드** — 페르소나는 그냥 "읽기 좋으면 됨" 수준. 과학화 정당하지만 사용자 자각 없음.

판정: 위 항목은 *페르소나가 인지 못 한 잠재 pain* 보다 *학술 background* 로 깔아두고, 디자인 결정의 *방향 검증* 으로만 쓰는 게 정직. P2 candidate 도 못 됨.

## 4. 페르소나는 토로했는데 evidence 없는 영역

- **"한 시야 비교 가능한 정보 밀도" (지훈) — PPT / Linear board / Twitter thread 비유**: empirical 에서 부분 반박됨 (PPT 슬라이드 10단어 권장은 단일 채널 HTML 에 부적합). 페르소나의 metaphor 는 *방향성* 일 뿐, 정량 권장치는 Wikipedia/Perplexity hybrid 가 더 정확. → anecdotal 만으로 PPT 답습하면 위험.
- **"커리큘러 AI 큐레이션은 mildly negative branding" (Maya)** — 학술/담론 데이터 없음. 미국 Z/밀레니얼 dev 1인 토로. *세대/지역 가설* 로 표시 필요.
- **"Print 친화 A4 한 장" (민호)** — 어떤 evidence 도 보강 안 함. 한국 시니어 임원 보고 문화 1인 anecdote.
- **"design system 영향 필터" (지원)** — 디자이너 1인 use case. evidence 없으나 unmet need 자체는 명확 → P1 으로 dogfood 가치 있음.
- **Stale doc 감지 (지훈 ADR Q3 이후 멈춤, Maya "어떤 게 current 인지 신입은 모름")** — empirical/학술 직접 데이터 없으나 PRD M5 lazy stale check 와 일치. 페르소나 신호만으로 P1.

## 5. Design priority 매트릭스

| 등급 | 기준 | 항목 |
|---|---|---|
| **P0** | 페르소나 + research 둘 다 강 | (a) AI verbose 피로 대응 (TLDR + 시각 chunking), (b) Citation/source back-link 1등 시민, (c) Query-shaped cluster (파일 navigation 탈피), (d) Layer-cake 시각 위계 (NN/g 근거) |
| **P1** | 페르소나 강, research 약/없음 | (a) 공유 가능한 self-contained HTML artifact, (b) Stale doc 감지 (PRD M5), (c) "내 관점 필터" (디자이너용 / 신입용), (d) Editorial 시각 품질 baseline |
| **P2** | Research 강, 페르소나 미인지 | (a) Modality 분리 원칙 (도식 ≠ 텍스트 중복), (b) 6분/1000단어 chunk 룰, (c) 한글 15~25% 추가 여백 |
| **out v1** | 둘 다 약 | Print 친화, Keyboard shortcut 풀세트, "AI 냄새" 자동 탐지/표시 (도구 범위 초과), Notion 협업 surface 흉내 |

## 6. v1 디자인 권장 — 증거 강한 핵심 4가지

1. **Citation 을 디자인 1등 시민으로** — 모든 카드/문장 단위에 source 파일명+라인. 클릭 → 원문 점프. 4 페르소나 전원 + Agarwal 2025 + Perplexity 오류 데이터로 가장 강하게 보강.
2. **Query-shaped cluster + 1회용 HTML artifact** — 파일 navigation 탈피. 경쟁사 8종 모두 못 채우는 정확한 빈틈. PRD 의 핵심 가설과 일치.
3. **Layer-cake 시각 위계 (TLDR + callout + 표)** — NN/g layer-cake 근거 + 지원(시각 위계) + 지훈(불릿 폭격 거부) + Maya("vibe-skim") 정확히 일치. 회사 보고서 톤 + Stripe/Linear editorial 수준.
4. **단락 ≤1000 chars, 페이지 400~800 단어, 카드 80~150 단어** — empirical doc 의 정량 권장치 직접 적용. Wikipedia/Perplexity hybrid. PPT 답습 금지.

*P1 후보로 백로그*: stale 감지 배지 (M5), copy-as-prompt 흐름, 관점 필터 (디자이너/신입용). 사용자 dogfood 후 정량 검증.
