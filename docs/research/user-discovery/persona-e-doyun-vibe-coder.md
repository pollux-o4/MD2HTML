---
id: persona-e-doyun-vibe-coder
type: persona-analysis
persona: 김도윤 (Doyun Kim, 29, KR Indie Hacker / Vibe Coder)
generated: 2026-05-27
---

## 요약

- **누구**: 김도윤, 29세, KR Indie Hacker / Vibe Coder (운영 1개 + 방치 prototype 다수)
- **AI 의존**: ★★★★★ + Cursor / Bolt / Claude (PRD, ADR, README 전부 AI)
- **핵심 pain 3가지**
  - 한 주 .md 15~20개 추가되는데 내가 친 글자 50자 미만 — 다시 안 읽음
  - "이거 내가 결정한 거 맞나?" — *내가 모르는 내 결정* 만 누적 (메타 피로)
  - Notion PRD 12개 적체, 실제 빌드 3개 — 죽은 문서와 운영 product 분리 불가
- **seed 가설 평가**: *AI 글 지친* = 검증되되 *생산자 본인 피로* layer 추가 필요. *YouTube/PPT* = 반박 (짧은 social Twitter thread / Loom 3분 / Notion gallery 가 native). *AI 정리* = 검증 (단 **provenance 표시** 가 단순 요약보다 가치 큼)
- **md-show-me 우선순위**: v1 primary (vibe-coder cohort 1차, 도그푸드)
- **읽는 가치**: provenance/skepticism layer, screenshot-able / Twitter 공유 metric, 0 install / 0 config, *retrospective layer* 컨셉의 원형

# 김도윤 — md-show-me 페르소나 분석

## 1. 한 주 .md 흐름 — 내가 안 읽는데 쌓이는 문서들

월요일 아침 — 새 사이드 프로젝트 idea 하나 떠올라서 Claude 한테 "PRD 써줘" 함. 3분 만에 1800 단어 markdown 뽑힘. notion 에 paste 하고 끝. 화요일 — Cursor 에 "ADR 폴더 만들고 인증 결정 기록해줘" 함. `docs/adr/0001-supabase-auth.md` 가 생김. 내가 한 일은 "looks good" 한 줄. 수요일 — Bolt 가 새 repo scaffold 하면서 README 300 줄을 자동 생성. 내가 다음에 그 README 를 열어본 적은... 없음.

목요일 dev log 쓴다고 Claude 한테 "이번 주 한 거 정리" 함 → `WEEKLY-2026-W21.md`. 본인이 직접 안 읽음. 금요일 — 운영 중 1개 + 방치된 prototype 다수 (PRD 12개 적체) 합치면 .md 파일이 한 주 동안 **15~20개** 추가됨. 내가 진짜 키보드로 친 글자는 그중 50자 미만.

*"언젠가 분기 한 번 정리하려고 했는데..."* — 이게 8개월째 미뤄지는 중. notion 의 "AI 생성 문서" 폴더에 PRD 12개 쌓여 있는데 그중 actually 빌드한 건 3개. 나머지 9개 PRD 는 *내가 뭘 생각했는지* 기억이 안 남. 다시 읽기 싫음. 너무 verbose 해서.

## 2. AI 글 피로 — 내가 만든 AI 글에 내가 지친 메타 피로

이게 진짜 문제임. *나는 AI 글의 생산자이자 소비자*. 양쪽에서 동시에 지침.

3개월 전 Claude 한테 시켜서 만든 ADR 다시 열어봄 — "Choosing Supabase over Firebase for Real-time Sync". 7개 trade-off 표, 1200 단어 설명, alternatives considered 섹션. 읽다가 *"잠깐, 이거 내가 결정한 거 맞나? Claude 가 추천한 거 그대로 받은 거 아닌가?"* 의심 시작. 본인이 검토 안 했으니 *진짜 내 결정인지 AI 의 default 인지* 구별이 안 됨. 그래서 더 안 읽고 싶어짐 — 읽을수록 *내가 모르는 내 결정* 만 늘어남.

AI 가 쓴 README 의 "Why we built this" 섹션 보면 손발 오그라듦. *내가 안 한 말투*. 그런데 그게 내 repo 에 있음. 누가 보면 내가 쓴 줄 알 거임. 부끄러움 80% + 의심 20%.

## 3. seed 가설 검증/반박 — 생산자-소비자 동시 입장

**"AI 글 지친 사람"** — 부분 맞음, 부분 다름. 박지훈/Maya 는 *남이 만든 AI 글* 에 지친 거. 나는 *내가 만든 AI 글* 에 지친 거. 후자가 더 까다로움 — 남 글은 안 읽고 무시하면 되는데 내 글은 *내 책임의 흔적* 이라 무시가 안 됨. 그래서 가설은 검증되되 *생산자 본인의 피로* 라는 layer 가 추가돼야 함.

**YouTube/PPT 정보 밀도** — 둘 다 안 맞음. Lex Fridman 3시간 → 절대 안 봄, 30분 안에 핵심 추출 못 하는 매체는 시간 낭비. Stratechery 5분 — 이게 ideal. 그런데 진짜 reference 는 **짧은 social (Twitter/X thread 1~2분, Insta carousel) + Loom 영상 (3분) + Notion gallery view**. 4갈래 중 editorial (Stratechery / Stripe Press) 은 가끔, 데이터 viz / Wikipedia 는 거의 안 봄. 이게 바이브코더 native habitat. md-show-me 산출물도 *thread-able 한 카드 단위* 면 공유 가능성 ↑.

**"정리된 거 보고 싶다"** — 여기가 진짜 의심 지점. 원문이 AI 산출물인데 그걸 또 AI 한테 정리시키는 게 신뢰 가나? 답: *원문은 안 믿어도 요약 layer 가 솔직하면 OK*. md-show-me 가 "이 문서는 AI 생성, 마지막 수정자 없음, 출처 의심" 같은 **provenance 표시** 만 해줘도 신뢰도 확 올라감. 단순 요약보다 *내가 안 쓴 글을 골라내 주는 필터* 가치가 더 큼.

## 4. ideal scenario 3개

- `/show-me 이번 분기 내가 빌드한 것들 한 페이지` — repo 3개 가로질러서 commit + PRD + dev log 합쳐 *투자자한테 보낼 만한 1 페이지*. 4분 만에 나오면 즉시 Twitter 공유.
- `/show-me 내가 안 만들고 Claude 가 만든 ADR 만 골라서 의심스러운 것 표시` — provenance + skepticism layer. *내 책임 흔적* 정리.
- `/show-me 이 PRD 들 중 실제 빌드된 거랑 묻힌 거 구분해줘` — notion 의 죽은 문서 12개 청소. *지난 자아의 망상* 과 *지금 운영 중인 product* 분리.

## 5. unmet needs

**v0 / Bolt 가 못 채우는 부분** — 이 도구들은 *one-shot generator*. 새로 만드는 건 잘하는데 *내가 이미 만들어 놓은 것들의 누적 의미* 는 못 봄. v0 한 번 더 돌리면 또 새 README 만들 뿐.

**Notion 빈틈** — 혼자 쓰면 정리 안 됨. 협업자 0명 = friction 0 = 정리 incentive 0. 그래서 notion 은 *쌓이기만 하는 무덤*.

**GitHub 빈틈** — 코드 중심 view. .md 는 부속물 취급. README 외에는 navigation 자체가 어려움. 바이브코더는 코드를 안 보니 GitHub UI 의 80% 가 안 쓰임.

빈 공간 = **"내가 AI 한테 시켜서 만들어 놓고 잊어버린 흔적들을, 지금의 내 관점으로 다시 보여주는 retrospective layer"**. 이게 진짜 unmet.

## 6. 디자인 선호 — 시각 품질 + 공유 가능성

founder 라 product taste 있음. 첫인상에서 평가 끝남.

- **Linear / Vercel / Stripe 톤** 기본선. Bootstrap / Material 느낌 즉시 거부.
- **screenshot-able** 해야 함. 한 화면 잘라서 Twitter 에 올렸을 때 *"오 뭐지 이거"* 가 나와야 share 함. 옆으로 길게 늘어진 dashboard 는 share 불가.
- **다크모드 default**. Cursor / Linear 다 다크. 흰 배경 markdown 은 *옛날 도구* 느낌.
- **0 install / 0 config** — `npx` 명령 하나도 귀찮음. 브라우저에서 바로 떠야 함. config 파일 만들라고 하면 그 순간 다른 도구 찾으러 감.
- **기능 깊이 < 첫인상**. 정확도 70점 + 시각 90점 + 공유 가능성 90점 = 매일 씀. 정확도 95점 + 시각 60점 = 한 번 쓰고 잊음.
- **측정 기준은 Twitter reaction**. 이걸 공유했을 때 *"링크 좀"* 댓글 5개 달리면 성공. 안 달리면 도구 자체를 의심.

요약 — 바이브코더는 *AI 글 생산자이자 피해자*. 도구가 자신의 흔적을 부끄럽지 않게 다시 보여주면 충성도 매우 높음. 단 첫 3초에 평가 끝남.
