---
id: persona-e2-yuna-designer-vibe-coder
type: persona-analysis
persona: 정유나 (Yuna Jung, 31, KR Designer → Vibe Coder)
generated: 2026-05-27
---

## 요약

- **누구**: 정유나, 31세, KR 디자이너 출신 Vibe Coder (Figma + v0.dev side project)
- **AI 의존**: ★★★★☆ + v0 / Cursor / ChatGPT (코드 거의 안 봄)
- **핵심 pain 3가지**
  - v0 가 자동 생성한 README / COMPONENTS.md 한 번도 안 읽음 — sidebar 회색 무덤
  - AI README "위계 없음" — typographic flatness + emoji + bullet 폭격
  - 6개월 전 만든 component 가 뭐였는지 v0 도 본인도 모름 (meta 관리 부재)
- **seed 가설 평가**: *AI 글 지친* = 재정의 (*AI 산출물의 시각적 무관심* 에 지친 게 정확). *YouTube/PPT* = 반박 (editorial — Stripe Press / Pudding / Awwwards — *밀도 사이의 여백 비율* 이 핵심). *정리* = 시선 경로 설계
- **md-show-me 우선순위**: v1.x adjacent (지원 v1 secondary 보완, 디자이너 vibe-coder layer)
- **읽는 가치**: editorial grid asymmetric layout, micro-interaction 100ms ease curve 감도, *AI 가 만든 .md 를 AI 가 다시 큐레이션* 가치 사례, 디자이너 분리 유지 근거 (코드까지 닿는 시점)

# 정유나 — 디자이너 출신 바이브코더

8년차 프로덕트 디자이너. Figma 가 손이고 v0 가 입이다. 작년부터 외주 말고 *내가 직접 만들고 싶은 거* 를 코드로 푸는 중 — 정확히는, AI 한테 시켜서 푸는 중.

## 1. 한 주 흐름 — 시각과 코드 사이

월·화는 클라이언트 Figma. 화면 한 장에 *시선이 어디부터 떨어지는가* 만 30분씩 본다.

수·목은 내 side project. v0.dev 에 prompt 던지고 — "editorial layout, Pretendard, restrained palette, micro-interaction on hover" — 나온 결과를 Figma 에 캡처해서 비교. 코드는 *거의 안 본다*. 깨지면 통째로 ChatGPT 에 paste 해서 "고쳐줘". 금요일 배포할 때 v0 가 `README.md`, `COMPONENTS.md`, `DEPLOYMENT.md` 같은 거 줄줄이 만들어주는데 — 한 번도 안 읽음. repo 열면 sidebar 에 회색 글씨로 쌓여만 있다.

생기는 .md: README (AI 작성), v0 가 자동 만든 component 설명, Cursor 가 떨군 architecture notes, 가끔 Supabase schema dump. 안 읽는 .md: *전부*.

## 2. AI 글 피로 — 디자이너 입장에서

AI 가 만든 README 는 *못생겼다*. 정확히 말하면 — **위계가 없다**. h1, h2, h3 가 같은 무게로 느껴지고, bullet 이 7개씩 줄줄이 붙어있고, 강조가 모든 곳에 있어서 강조가 없는 것과 같다. 시선 경로가 안 생긴다. 그냥 회색 텍스트 벽.

v0 가 만든 component docs 는 더 끔찍하다. "This component utilizes a composable pattern leveraging..." — 디자이너한테 이게 무슨 의미인가. 나는 *어떻게 생겼는지* 가 궁금한데 글로 설명한다.

가장 거슬리는 3가지:
- **typographic flatness** — 모든 줄이 똑같은 weight 로 보임
- **emoji 남발** — 진짜 디자이너는 emoji 안 쓴다, 절대
- **bullet 폭격** — 3개 넘어가면 이미 list 가 아니라 dump

## 3. seed 가설 검증 / 반박

*"AI 글 지친 사람"* — 맞긴 한데, 나는 *AI 글의 문장* 보다 *AI 글의 visual* 에 먼저 지친다. 같은 내용이라도 Stripe Press 처럼 조판되어 있으면 읽는다. 회색 텍스트 벽이면 1초 안에 닫는다. 그래서 "AI 글 지친" 이 아니라 — **"AI 산출물의 시각적 무관심" 에 지친** 이 맞다.

*"YouTube/PPT 정보 밀도"* — 아니다. 그건 너무 노이즈하다. 내 native reference 는 **editorial (Stripe Press, 브런치) + 데이터 viz (Pudding.cool, NYT Upshot, Awwwards editorial)** — 둘 다 *시각 조판* 위주. 짧은 social (Insta carousel) 은 공유용으로만, Wikipedia 는 거의 안 봄. 정보 밀도 자체보다 — *밀도 사이의 여백 비율* 이 핵심.

*"정리된 거"* — 디자이너한테 정리 = **시선 경로 설계**. 첫눈에 어디 보고, 두 번째 어디 가고, 세 번째 무엇을 클릭할지. 단순 list 정렬은 정리가 아니라 *나열*. 거부 반응 즉시 옴.

## 4. md-show-me ideal scenarios

내가 진짜 쓸 query 3개:

1. *"내 portfolio repo 6개 README 한 페이지로, 각 project hero image 크게"* — 외주 / side 프로젝트 모아둔 거 클라이언트한테 보낼 때
2. *"v0 가 만든 component 들 visual gallery 로, jargon 빼고 preview 만"* — 내가 만든 게 뭔지 *나도 까먹어서* 다시 보고 싶을 때
3. *"이번 캠페인 사이트 build 하면서 내린 디자인 결정들"* — Figma 코멘트 + commit msg + README 섞여있는 거 한 화면

핵심은 — *내가 .md 를 직접 안 만들었어도 OK* 여야 함. AI 가 만든 .md 를 AI 가 다시 큐레이션해서 사람이 볼 만하게.

## 5. unmet needs

- **v0** — prototype 만 만들고 *meta 관리* 안 함. 내가 6개월 전에 만든 component 가 뭐였는지 v0 가 모름
- **Figma** — 코드 결과물 (deployed site, repo) 까지 안 다룸. design ↔ live site 의 *간극* 이 항상 있음
- **Notion** — 디자인 파일 embed 는 되는데 *repo 의 .md* 를 안 가져옴. 디자이너 + 코드 둘 다 있는 워크스페이스가 없음

## 6. 디자인 선호 — 거짓말 안 통하는 기준

- **typography**: Pretendard / Inter / Söhne. serif 면 Tiempos. 그 외는 의심
- **color**: cool restraint. saturated CTA 버튼 하나도 어색함. monochrome + 1 accent
- **layout**: editorial grid. 12-col 보다 *asymmetric* 선호
- **micro-interaction**: hover 의 100ms 차이를 본다. ease-out vs ease-in-out 즉시 구분
- **거부 신호**: gradient mesh background, generic stock illustration, "✨ AI-powered" 문구

md-show-me 가 *이 기준* 을 통과하면 — 나는 동료 디자이너 5명한테 바로 보낸다. 통과 못 하면 — 한 번 쓰고 안 돌아옴. 디자이너의 충성도는 *첫 화면 3초* 에서 결정된다.
