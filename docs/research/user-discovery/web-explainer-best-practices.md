---
id: web-explainer-best-practices
type: empirical-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - 17개 사이트 (Bartosz·3B1B·Distill·MDN·Stripe·Stratechery·위키백과 등) 공통 패턴 3개 = *구체 → 추상* / *위계 항상 가시* / *용어는 풀거나 보여주거나 둘 다*. "추상 먼저" 패턴은 거의 없음.
  - 한국어 환경은 *위키링크 + 한자/원어 병기 + 맥락 서술* 이 영문 대비 깊지만 *시각/인터랙티브* 는 현저히 약함 — md-show-me 의 차별화 자리 = *위키백과 친절함 + Bartosz 시각화* 의 교집합.
  - 차용 top 5 = (1) prereq 박스, (2) 일화 hook, (3) sticky TOC, (4) inline 풀이 (괄호/이탤릭), (5) "보여주고 나서 이름 붙이기".
- **md-show-me 시사점**: baseline 3 (요약/링크/검색) 외 *"친절한 설명 layer"* 추가 — (a) build-time "가정 지식" 박스, (b) jargon 첫 등장 hover 풀이, (c) on-demand "더 쉽게" 토글. `audience: novice|intermediate|expert` frontmatter 로 강제 X.
- **증거 강도 / 한계**: 강 = 17 사이트 직접 분석 (Bartosz·MDN·Stripe·위키백과) / 중 = 일부 fetch 실패 (Vox·NYT·Khan 페이지 추정) / 약 = 한국어 환경 정량 비교 (n=4 정도).
- **읽는 가치**: "친절한 설명 layer" 옵션 채택 여부 + 위계·온보딩·용어 처리 패턴 선택의 사이트별 비교표 — H 페르소나 unmet need 충족 design 결정 시 1차 참조.

## 개요 — 4 카테고리 공통 패턴

조사 결과 도메인을 가로지르는 공통 best practice 3가지가 드러난다.

**(1) 추상보다 구체.** 학습 사이트(Bartosz, 3B1B)는 정의를 후행시키고 시각/인터랙션으로 먼저 보여준다. Editorial(Stratechery, Lenny's)은 구체적 일화/뉴스로 진입한다. Technical(Stripe Docs)도 "Sell subscriptions" 같은 use-case 가 product 카탈로그보다 위에 놓인다. 추상 → 구체 가 아니라 **구체 → 추상** 이 베스트셀러 톤의 핵심.

**(2) 위계는 항상 보인다.** Khan Academy, MDN, Vercel docs 는 좌측 sidebar 가 사라지지 않는다. Bartosz/Distill 는 sidebar 없이도 sticky TOC + 명확한 anchor heading 으로 위치감을 준다. *"내가 어디에 있는지"* 가 한 화면에 반드시 보인다.

**(3) 용어는 풀거나, 보여주거나, 둘 다.** 인터랙티브 사이트는 *보여주고 나서 이름 붙임*. 텍스트 중심 사이트는 *괄호·이탤릭·hover·링크* 로 inline 풀이. 한국어 위키백과는 *(한자 병기 + 위키링크)* 조합이 표준.

## 사이트별 분석

| 사이트 | 온보딩 | 용어 처리 | 위계 | 시각/텍스트 | 지식 가정 |
|---|---|---|---|---|---|
| **Bartosz Ciechanowski** | 감정적 hook ("There is something captivating...") → 2-4 문장 후 즉시 인터랙티브 | 보여주고 나서 이름 붙임. inline 이탤릭 강조. 외부 링크는 "심화" 신호 | sticky anchor heading, "Spinning/Disc/Transmission" 식 명사 위계 | 인터랙티브 > 텍스트. 각 섹션 = 데모 + 2-3 문장 | 중학교 물리 정도. metacognition 명시 ("애니메이션 끌 수 있음") |
| **3Blue1Brown** | "학생들이 이 주제를 unintuitive 하게 느낀다" 로 *공감 진입*. prerequisites 명시 | 시각적 시연 → 명명 ("이런 벡터를 eigenvector 라 부른다") | 영상 시리즈 챕터 위계 + 사이트 lesson 카테고리 | 영상 중심. 텍스트는 영상 caption/해설 | 행렬·선형변환 기본기 가정. 명시적 prereq |
| **Distill.pub** | 문제 의식 ("misleading 할 수 있다") 으로 진입 | "perplexity = 국소/전역 attention 의 균형" 같은 loose 정의 | 1-6 번호 섹션 + 좌측 sidebar | 인터랙티브 ≈ 텍스트. play/pause 컨트롤 표준 | ML 기초 (Gaussian, clustering) 가정. 완전 초심자는 X |
| **Khan Academy** | 직접 fetch 실패 — *추정*: 좌측 unit/lesson 트리, breadcrumb, 진행도 bar | 짧은 영상 + 후속 quiz 로 *형성평가* 식 풀이 | course → unit → lesson → exercise 4단 위계 | 영상 + 문제 풀이 mix | "0부터" 가정. K-12 친화 |
| **Quanta Magazine** | 내러티브 헤드라인 ("Two Researchers Are Rebuilding Mathematics...") | "ecotype/topology" 같은 용어 무정의. 단 explainer 글에서는 풀이 | 학문 분야 1차 nav + 카드형 grid | 카드형 이미지 + 짧은 요약 | 과학 literacy 가정. 일반 교양 독자 |
| **Stripe Press** | "Ideas for progress" 라는 한 줄 + 책 grid | 책별 2-3 문장 설명, 추천사 | 책 한 권 = 1 카드, 평면 위계 | 책 표지 이미지 + 짧은 텍스트, 여백 풍부 | 책을 산다 = 어느 정도 관심층, 그래도 첫 진입 친화 |
| **Stratechery** | 구체적 사건/제품으로 시작 ("Uber Black 예약이 짜증나는데...") | jargon 그대로 쓰되 historical 맥락 + 비유로 보강 | h2/h3 명명된 섹션. bold 전환 신호 | 도표는 *논증용* 으로만 (장식 X) | 테크 전략 중급. 입문자보다 *맥락 있는 독자* |
| **Lenny's Newsletter** | 가치 제안 subtitle ("36 books that'll make you...") | "AI agents/freemium" 은 정의 없이 진입. 단 풀이는 digestible | featured top + 카테고리 feed | 고품질 thumbnail = anchor | PM/창업자 중급. 기초 정의 안 함 |
| **Pudding.cool** | grid + 짧은 2-4 단어 헤드라인 + 1-2 문장 부제 | 헤드라인에서 jargon 회피. 본문은 *인터랙션으로 풀이* | issue 번호 + 날짜 + 카테고리 필터 | 시각 >>> 텍스트. data 시각화가 본문 | 차트 리터러시 가정. 일반 교양 |
| **MDN Web Docs** | "이 튜토리얼로 X 를 만든다" 명시 + prereq 박스 | inline `code`, 첫 등장 굵게, 글로서리 hover 링크 | 좌측 sidebar (unit/lesson) + 우측 TOC + breadcrumb | 코드 ≈ 텍스트 ≈ 다이어그램. 결과물 미리보기 | HTML/CSS 가정 명시. 그 외 친절 |
| **Stripe Docs** | "Sell subscriptions" use-case 카드가 product 위 | 제품명은 그대로, 옆에 한 줄 풀이 | 좌측 nav: use case → product → guide | code 샘플 + 단계별 텍스트 + 시각 diagram | "기술 환경 set up" 링크 = 개발자 가정 |
| **Vercel Docs** | "Vercel 은 AI Cloud" 1문 + 6개 카테고리 진입 | 모든 제품명 = 링크. 짧은 in-context 설명 | 좌측 sidebar + 카테고리 grouping | bullet list 중심. 다이어그램 보조 | Next.js/배포 개념 어느 정도 가정 |
| **Notion Help** | "Getting started" + 학습 카테고리 | 비기술 친화. 스크린샷/GIF 다수 추정 | use case + 부서별 카테고리 두 축 | 시각(스크린샷) ≈ 텍스트 | 비기술 사용자 가정. 가장 친절한 축 |
| **한국어 위키백과 (양자역학)** | 정의 + 괄호 풀이 + 비유 ("모래사장 관찰") | 위키링크 + 한자 병기 + 어원 설명 | 8개 챕터 목차, 부목차 nesting | 시각자료 거의 없음 — 텍스트 위주 | 고교 물리 이상 암묵 가정 |
| **카카오/네이버 Tech** | 회사 mission + 글 카드 list | 엔지니어링 용어 그대로 + 코드 + 다이어그램 | 카테고리 (AI/cloud/frontend...) + 시간순 | 코드 + 다이어그램 + 텍스트 균형 | 동료 개발자 가정. 비전공 친화 X |
| **브런치** | 작가 추천 + 카테고리 (요리/커리어/건강) | 에세이 톤. 전문용어 거의 없음 | 작가 중심 + 카테고리 nav | 텍스트 중심, 헤더 이미지 1장 | 일반 독자. 가장 평이한 친절도 |
| **Axios** | "Smart Brevity" — bullet 으로 핵심 → 맥락 → why it matters | 첫 등장 풀이 짧게. 약어는 한 번 풀어씀 | 카테고리 nav + 짧은 카드 | 텍스트 위주, 1 이미지/article | 뉴스 일반 독자 |
| **Quanta/Distill 사이 gap** | — | — | — | — | Quanta 는 *교양*, Distill 은 *연구자*. md-show-me 가 노릴 자리는 Quanta + Bartosz 사이 |

*fetch 실패 사이트*: Vox explainers (404), NYT Upshot (block), Khan Academy 강의 페이지 (콘텐츠 비반환), 3B1B eigenvalue 페이지 (부분 fetch).

## 차용 가능한 패턴 top 10

1. **Bartosz 의 "보여주고 나서 이름 붙이기"** — 정의를 후행. 인터랙티브가 없어도 *예시 → 명명* 순서는 텍스트만으로도 가능.
2. **3Blue1Brown 의 prereq 박스** — 글 첫머리에 *"이 글이 가정하는 지식"* 을 명시. H 페르소나가 *"내가 읽을 수 있는 글인가"* 를 즉시 판단 가능.
3. **Stratechery 의 구체적 일화 진입** — 추상/요약으로 시작하지 말고 *특정 사건/예시/일화* 로 진입. 한국어 환경에서 특히 효과적.
4. **Stripe Press 의 여백 + 짧은 카드** — 1 항목 = 표지 + 2-3 문장. 정보 폭탄 회피. md-show-me 의 카드 layout 에 직접 적용.
5. **Distill 의 sticky 번호 섹션** — 1-6 번호 + sticky TOC. 긴 글에서도 *"3/6 째 섹션"* 위치감 유지.
6. **MDN 의 3-축 nav** — 좌측 sidebar (위계) + 우측 TOC (현재 글 내 위치) + breadcrumb (경로). 가장 강력한 위계 시각화.
7. **Axios "Why it matters"** — 각 섹션 끝에 *"왜 중요한지"* 한 줄. Markdown frontmatter `why_it_matters` 같은 메타로 자동 노출 가능.
8. **한국어 위키백과의 (한자/원어 병기)** — 한국어 글에서 *영어 원어 한 번 병기* = 친절함 큰 폭 상승. 자동화 가능.
9. **Bartosz 의 metacognition 박스** — "애니메이션 끌 수 있음" 같은 *독자 통제권* 명시. md-show-me 에서는 "용어 풀이 켜기/끄기" 토글 등으로 응용 가능.
10. **Pudding 의 헤드라인 = 2-4 단어, 부제 = 1 문장** — 카드 진입 단계에서 *jargon 0*. 본문에서만 jargon 허용.

## md-show-me 적용 권장

baseline 3 (요약 / 링크 그래프 / 검색) 외에 **"친절한 설명 layer"** 를 추가할 것을 강하게 권장한다. 근거:

- H 페르소나의 unmet need (*전문용어 풀이 + 지식 가정 X*) 가 baseline 3 으로는 채워지지 않음. 검색은 *찾기* 만 해결, 요약은 *압축* 만 해결.
- 친절한 설명 layer = **(a) 글 머리에 "가정하는 지식" 박스 자동 생성**, **(b) 본문 jargon 첫 등장에 hover 풀이 자동 주입**, **(c) "더 쉽게" 토글로 LLM 재진술 (Bartosz 의 metacognition 패턴)**.
- (a)(b) 는 LLM 으로 build-time 생성 가능 → zero runtime cost. (c) 만 on-demand.
- 단 *"모든 글에 강제 적용"* 은 ADR-anti-pattern. 글 frontmatter 에 `audience: novice|intermediate|expert` 를 받고 *novice* 일 때만 layer 활성화 권장.

## 한국어 환경 특수성

한국어 위키백과 vs 영문판 비교에서 드러난 차이:

- **한국판이 더 친절한 축**: 한자/어원 병기, 역사·맥락 서술의 깊이, 철학적 함의 강조. *이해의 여정* 을 중시.
- **한국판이 약한 축**: 시각자료/도표/인터랙티브가 영문판 대비 현저히 적음. 양자역학 문서가 입자 이미지 1장에 그치는 게 전형적.
- **카카오/네이버 Tech 블로그** 는 영문 엔지니어링 블로그와 톤이 비슷하나, *비전공자 친화* 측면에서는 영문 MDN 보다 한 단계 낮음.
- **브런치** 가 한국어 환경의 베스트셀러 톤에 가장 가까움 — 단 에세이 도메인 한정.

**시사점**: md-show-me 는 한국어 콘텐츠에 *"시각/인터랙티브 layer"* 를 자동 주입하는 것만으로도 한국 web 의 평균 explainer 품질을 넘을 수 있음. 한국어 환경의 빈자리가 정확히 *"위키백과의 친절함 + Bartosz 의 시각화"* 의 교집합 — 여기가 md-show-me 의 정확한 시장 포지셔닝이다.
