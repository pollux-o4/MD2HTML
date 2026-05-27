---
id: persona-f-seoyeon-non-coder
type: persona-analysis
persona: 박서연 (Seoyeon Park, 33, KR Marketer / Non-coder)
generated: 2026-05-27
---

## 요약

- **누구**: 박서연, 33세, KR 마케터 / Non-coder (Notion 단일 워크스페이스, 뉴스레터 5~6개 일독)
- **AI 의존**: ★★★☆☆ + ChatGPT 매일 (AI 카피 초안 검토 30%)
- **핵심 pain 3가지**
  - Engineering docs jargon 첫 문단부터 모르는 단어 5개 → 즉시 닫음
  - GitHub README / Stack Overflow 의 *시각적 흉함* — 폰트·여백·색이 90년대
  - .md 직접 클릭은 연 5회 미만, but 엔지니어 공유 ADR / OSS docs / AI repo 간접 노출은 늘어남
- **seed 가설 평가**: *AI 글 지친* = 핵심 타겟 검증 (단 *AI 가 정리* 마케팅은 거부감, *사람 손이 닿은 큐레이션* 셀링 포인트여야). *YouTube/PPT* = 반박 (editorial Substack/브런치 + Wikipedia 가 native, PPT 는 못생김 대명사). *정리* = 잡지처럼 보이는 editorial layout
- **md-show-me 우선순위**: v1.x adjacent (eng docs → 마케팅 콘텐츠 brige, 가끔 한 번씩 쓰는 웹 서비스 한정)
- **읽는 가치**: 라이트 모드 default, 한글 editorial typography (Pretendard / 산돌고딕네오), AI 냄새 신호 5개 (em dash, 할 수 있습니다, 3단 구조...) 검증 체크리스트

# 박서연 — md-show-me 페르소나 분석

## 1. 한 주 정보 소비 흐름 — Notion 이 세계의 기본값

평일 아침은 뉴스레터 5~6개로 시작해. Stibee 로 받는 *Outstanding*, *까탈로그*, Substack 의 *Lenny's Newsletter*, *Stratechery* 한 편. 지하철에서 폰으로 훑고, 회사 도착하면 Notion 의 *오늘 읽을거리* DB 에 링크 던져 놓음. 점심 후엔 브런치 들어가서 김지수·정문정 같은 작가 essay 1편. 주말엔 Substack 장문 1~2편 + Wikipedia rabbit hole.

막히는 지점은 셋이야. **(1) Jargon** — 가끔 PM 이 공유하는 엔지니어 글 (Stripe 엔지니어링 블로그, AWS 공지) 은 첫 문단부터 모르는 단어 5개. 닫음. **(2) 시각이 못생김** — GitHub README 가 대표적. 글자만 빽빽한데 폰트는 못생기고, 색은 검정+파랑 링크만. *읽기 전에 눈이 거부함*. **(3) 너무 김** — Substack 도 3000자 넘으면 "나중에" 폴더로 보내고 거기서 영영 안 봄.

정보 관리는 Notion 단일 워크스페이스. 북마크는 안 써 — *못 찾으니까*. Notion 에 던지면 적어도 검색은 됨. 메모는 Apple Notes 에 짧게.

## 2. AI 글 피로 — 만드는 쪽 입장이라 더 잘 보임

마케터로서 매일 AI 초안을 본다. 그래서 *AI 냄새* 가 100m 밖에서도 보임.

대표적인 신호 5개:

1. **Em dash 남발** — "당사는 — 그리고 이것이 중요한 부분인데 — 고객 중심으로..." 한국어인데 영어 번역투 em dash 두 개 끼는 순간 AI.
2. **"할 수 있습니다" 무한 반복** — "~할 수 있습니다", "~하실 수 있습니다" 가 한 문단에 3번 이상.
3. **3단 구조 강박** — 모든 답이 "첫째, 둘째, 셋째" 또는 bullet 3개. 사람이 쓰면 비대칭이 자연스러운데 AI 는 강박적으로 균형 맞춤.
4. **"~뿐만 아니라 ~까지"** 같은 영어 직역체.
5. **결론 문단의 *진부함*** — "결국 중요한 것은 본질입니다" 류. 진짜 인사이트 없이 멋있어 보이는 문장으로 마무리.

회사 블로그 글 받으면 이거 잡아내는 게 내 일의 30%. 매끈한데 *읽어도 머리에 안 남는 글* — 그게 AI 글의 진짜 문제. 내가 좋아하는 글은 김지수 작가처럼 *문장이 짧고 비대칭하고 가끔 비문법적인 글*. AI 는 그걸 못해.

## 3. seed 가설 검증 — 비개발자에게 적용되나

"AI 글 지친 사람" — **나는 핵심 타겟 맞음**. 단, 적용 방식이 달라. 개발자는 *AI 코드 생성* 에 지친 거고, 나는 *AI 카피* 에 지친 거. 도구 입장에선 같은 페인이지만 해법이 다를 수 있어. 나한테 md-show-me 가 "AI 가 정리해줌!" 으로 마케팅되면 *오히려 거부감*. "사람 손이 닿은 큐레이션처럼 보임" 이 셀링 포인트여야 함.

"YouTube/PPT 정보 밀도" — 비개발자 reference 로는 **editorial (Substack 의 잘 만든 essay, 브런치 매거진)** 이 압도적. 그 다음 **Wikipedia** — 정확성과 출처 신뢰감. 데이터 viz (NYT Upshot) 는 가끔, 짧은 social (Insta carousel) 은 일적으로만 (내가 만드는 쪽). YouTube 는 정보 밀도가 사실 *낮은* 매체야 (10분에 글 1000자 분량). 내가 원하는 건 brunch.co.kr 의 *editorial layout* — 큰 제목, 여백 충분, Pretendard 같은 폰트, 본문 잘 쪼개진 것. PPT 비유는 별로 — 회사 PPT 는 *못생김의 대명사*.

"정리된 거 보고 싶다" — 비개발자가 .md 를 *왜* 봐야 하는가? 솔직히 *직접적* 으로는 거의 없어. 내가 .md 파일을 클릭해서 여는 일은 1년에 5번 미만. 하지만 *간접적* 으론 있음 — 회사 엔지니어가 공유한 ADR, 오픈소스 도구 docs (예: Vercel, Notion API), AI 가 만들어준 README. 이때 *읽기 가능한 형태* 로 변환해 주면 가치 있음.

## 4. md-show-me 가 내 work 에 들어올 수 있나

가능한 시나리오 3개:

- **Eng docs → 마케팅 콘텐츠 소재**: 우리 회사 엔지니어가 새 기능 ADR 올림. 그걸 읽고 *고객 블로그 글* 로 변환해야 함. 지금은 PM 한테 "이거 한 줄로 설명해줘" 부탁. md-show-me 가 *비기술 독자용 요약* 으로 보여주면 PM 시간 안 뺏어도 됨.
- **OSS docs 콘텐츠 리서치**: "노션 경쟁사 분석" 글 쓸 때 Obsidian / Logseq docs 훑어야 함. README 가 너무 dev 친화적이라 *마케팅 관점 핵심* 만 추출해 주면 좋음.
- **AI 가 만든 repo 살펴보기**: 요즘 Claude/ChatGPT 한테 "이거 만들어줘" 시키면 repo 가 나옴. 그 안에 .md 가 5~10개씩 들어 있는데 *뭐가 뭔지 모름*. 시각화해 주면 "내가 만든 거 이해할 수 있음".

다만 — *완전 무관* 일 가능성도 있어. 내가 일주일에 .md 만나는 빈도가 워낙 낮아서, 도구를 설치할 동기까지 가긴 힘들지도. **"가끔 한 번씩 쓰는 웹 서비스"** 면 OK, **"설치하고 CLI 쳐야 함"** 이면 0%.

## 5. unmet needs

Notion AI 는 *내 워크스페이스 안* 만 잘함. 외부 .md 안 됨.

ChatGPT 는 링크 던지면 요약은 잘하는데 *시각이 채팅창* 이라 읽기 피곤. 매번 스크롤.

Perplexity 는 출처 좋은데 답이 *AI 톤 그 자체* 라 결국 내가 다시 쓰게 됨.

가장 큰 unmet need — **dev 도구의 비주얼 흉함**. GitHub, Stack Overflow, 대부분 docs 사이트 폰트·여백·색이 1990년대 머리. 나는 비주얼 좋은 거 보면 *내용도 신뢰함*. Stripe docs, Linear changelog, Vercel docs — 이 셋은 *비개발자도 읽고 싶어지는* 드문 예외.

## 6. 디자인 선호 — 비개발자의 미적 기준

기본값 셋:

- **Pretendard / 산돌고딕네오 같은 한글 폰트**. system-ui fallback 으로 굴림 뜨는 순간 닫음.
- **여백 충분**. 본문 max-width 680px 정도, 줄간격 1.7. Notion / Substack 기본값.
- **색 절제**. 검정 + 회색 + accent 1색. corporate marketing 의 *그라데이션 + 보라색 + 이모지 폭탄* 거부.

editorial typography 가 기준. *글이 잡지처럼 보이면 신뢰*. 코드 블록은 monospace 여도 OK 지만 *주변 본문* 은 반드시 sans-serif 한글 폰트. Notion 의 block-based pattern (toggle, callout, divider) 친숙 — 이게 *읽기 호흡* 을 만들어줌. 만약 산출물이 한 덩어리 긴 글이면 망함, *blocks 로 끊겨야 함*.

색 한 가지만 더 — **다크 모드 기본 OFF**. 비개발자는 라이트 모드 사람. 다크 모드가 default 면 "이거 개발자용이구나" 하고 떠남.
