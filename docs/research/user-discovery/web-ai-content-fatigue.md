---
id: web-ai-content-fatigue
type: discourse-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - 영어권 dev 의 AI 피로는 verbose-empty / "AI 냄새" (em dash, "It's not X. It's Y.") / reviewer 비용 비대칭 / 1000+ 줄 md unmanageable 4 패턴으로 수렴
  - 한국어권은 *피로 토로* 보다 *AI 티 숨기기* (humanize) 담론이 주류 — "AI 글은 이상하다" 가 암묵 전제
  - asymmetric cost ("작성 비용 0, 읽기 비용 full") 가 dev fatigue 의 핵심 메커니즘
- **md-show-me 시사점**: md 길이 자체가 1차 pain — TLDR + "여기까지 = 80% 정보" 표시로 비대칭성 직접 완화
- **증거 강도 / 한계**: HN/한국 블로그 quote 풍부하지만 한국 dev *직접* 토로 데이터 얕음, DORA/Thariq 인용 1차 출처 약함
- **읽는 가치**: 사용자 pain 의 *어휘와 표현* 을 정확히 인용 필요할 때, AI 피로 4 패턴 분류로 design 우선순위 정당화할 때

# AI 생성 글 피로 (AI slop fatigue) — 웹 담론 조사

## 1. 개요

2024 년 Simon Willison 이 "slop" 이라는 용어를 대중화한 이후, 2025~2026 년 영어권 dev 커뮤니티 (Hacker News, Reddit, 개인 블로그) 에서는 AI 생성 글에 대한 피로 담론이 "장난" 수준에서 "커뮤니티를 죽인다" 수준으로 격화됐다. 한국어권은 학술/일반 글쓰기 영역의 "AI 티" 담론은 풍부하지만, dev 커뮤니티 (velog, brunch, disquiet) 의 *직접적* 피로 토로는 영어권 대비 얕고, 주로 "어떻게 AI 티를 *지울 것인가*" (humanize) 쪽으로 흐른다.

핵심 패턴은 4 가지로 수렴한다: **(1) verbose 한데 정보 밀도 0**, **(2) "AI 냄새" — em dash, "It's not X. It's Y.", 번역투, 과잉 친절**, **(3) reviewer 비용을 강제 부담시키는 비대칭성**, **(4) 1000+ 줄 markdown 의 unmanageable 함**.

## 2. 영어권 dev 의 AI 피로 표현

> "Literary AI slop has pretentious, overintelectualized tone while usually having scarcely any content"
> — scotty79, [HN: Why does AI slop feel so bad to read?](https://news.ycombinator.com/item?id=42909042)

> "almost always no more than two sentences in, realising what it is"
> — JumpCrisscross, [HN: Why does AI slop feel so bad to read?](https://news.ycombinator.com/item?id=42909042)

> "the cost to read and evaluate is greater than the cost to create, meaning my attention can be easily DoSed by bad actors."
> — yuliyp, [HN: AI slop, suspicion, and writing back](https://news.ycombinator.com/item?id=42827532)

> "Coworkers would send me their AI slop expecting me to review it. Management didn't care"
> — memhole, [HN: AI slop, suspicion, and writing back](https://news.ycombinator.com/item?id=42827532)

> "Unrelated but my current AI text flag is the use of 'It's not X. It's Y.' ... like nails on a chalkboard."
> — ertgbnm, [HN thread](https://news.ycombinator.com/item?id=45529020)

> "Numbered lists are an AI smell."
> — SoftTalker, [HN thread](https://news.ycombinator.com/item?id=45529020)

> "I deleted my account and left the platform in January over LLM content."
> — Gigachad, [HN: AI slop is killing online communities](https://news.ycombinator.com/item?id=48053203)

Simon Willison 의 [원전 정의](https://simonwillison.net/2024/May/8/slop/): *"unwanted AI-generated content ... mindlessly generated and thrust upon someone who didn't ask for it"* — *unreviewed* 가 핵심 판정 기준.

추가 정량 데이터: GitHub Copilot 도입 후 PR 이 주 40 건 → 150 건으로 폭증, [DORA 2025 리포트](https://www.codeant.ai/blogs/prevent-ai-code-review-overload)는 review time 이 91% 늘었다고 보고. AI 리뷰 봇 자체도 PR 1 개당 187 개 코멘트로 reviewer fatigue 가속.

## 3. 한국어 dev 의 AI 피로 표현

한국어권은 *피로 토로* 보다 *AI 티를 어떻게 숨길까* 쪽으로 담론이 형성돼 있다. 즉 "AI 글은 이상하다" 가 *암묵 전제* 로 깔린 상태.

> "어딘가 어린아이를 달래는 듯 과장된 말투 ... '와, 너 정말 *핵심*을 찔렀어' / '너의 방금 그 질문, 정말 깊다, 깊어'"
> — 고희수, [brunch: 챗GPT 말투 왜 저럴까?](https://brunch.co.kr/@goheesoo417/42)

> "'첫째, 둘째, 셋째' 이런 구조, 또는 '~할 수 있습니다' 같은 반복된 어투 ... 독자가 읽으면 '음… 어디서 본 말 같은데?'"
> — newstorygiver, [AI가 쓴 글, 네이버 검색에서 티 나지 않게 쓰는 법](https://newstorygiver.com/146)

> "뭔가 어색하고 뚝딱거리는 AI 문장 ... 딱딱하거나, 부자연스럽거나, 감정이 덜 실린 느낌"
> — maily.so/airecipe, [AI가 쓴 티 안 나게](https://maily.so/airecipe/posts/1do19kmlzx6)

> "직접 써본 느낌, 사용 후기, 실제 사례 같은 '생활감'이 부족합니다"
> — newstorygiver, [AI가 쓴 글, 네이버 검색에서 티 나지 않게 쓰는 법](https://newstorygiver.com/146)

> (통념 / 커뮤니티 정리) "정보를 얻을 때 길고 보고서 같은 체계적인 글은 읽기 싫은 사람에게는 클로드가 더 입맛에 맞을 수 있습니다"
> — 한국 AI 비교 글 일반 정서, [요즘IT 등](https://yozm.wishket.com/magazine/)

한국어권 dev 의 *직접* 토로 자료는 얕다 — 추가 1 차 인터뷰 (당근/토스/카카오 블로그 댓글, 페북 dev 그룹) 가 필요. 현재 quote 는 일반 글쓰기 커뮤니티 비중이 높음.

## 4. 공통 피로 패턴 분류

| 카테고리 | 영어권 표현 | 한국어권 표현 |
|---|---|---|
| **verbose-but-empty** | "pretentious, overintelectualized tone with scarcely any content" | "장황한데 어디서 본 말 같다" |
| **AI smell — 어휘/구두점** | em dash 남용, "delve", "It's not X. It's Y.", numbered list | "심층적으로", "~할 수 있습니다", "마법 같은 OOO" |
| **번역투 / 톤 mismatch** | "sounds like everyone else" | "당사는", "저희는", 영어 번역투 |
| **과잉 친절 / 아첨** | "polished and bedecked with literary devices" | "와, 정말 핵심을 찔렀어" 류 어린이 달래기 톤 |
| **structure-but-empty** | "ends like an Axios article, nothing but bullet points" | "첫째 둘째 셋째" 기계 병렬 |
| **asymmetric cost** | "attention DoS — cheap to write, expensive to read" | (담론 부재 — gap) |
| **scale — 1000+ line markdown** | "tech specs exceeding 1000 lines, team avoids reading" | (담론 약함) |

## 5. 사람들의 대응 방식

1. **읽지 않음 / 떠남**: HN Gigachad — 플랫폼 탈퇴. memhole — 코워커 AI slop 검토 거부.
2. **detection / 차단**: 커뮤니티 운영자가 월 600 계정 ban (CrzyLngPwd), AI 감지기 도입.
3. **humanize 후처리**: 한국어권 주류 대응 — "AI 휴머나이저" 도구, "AI 티 지우는 프롬프트" 가이드 범람.
4. **shorter 요구 → 도구 변경**: ChatGPT 5 가 짧아지자 오히려 4600 upvote 짜리 "GPT-5 is horrible" thread 등장 ([Yahoo Tech](https://tech.yahoo.com/ai/articles/chatgpt-5-faces-backlash-users-202441434.html)) — 길이 자체보다 *밀도* 가 문제임을 시사. Claude 로 갈아타는 dev 도 늘어남.
5. **format 자체 의심**: Anthropic Claude Code lead Thariq Shihipar — "Markdown 100+ 줄은 안 읽힌다, HTML 로 가자" 라는 ["The Unreasonable Effectiveness of HTML"](https://www.newsglobenow.com/new349619.html) 류 주장 부상.

## 6. md-show-me 에 시사점

1. **md 길이 자체가 1 차 pain** — "1000+ 줄 .md 는 안 읽힌다" 가 dev 들의 정직한 자기 고백. 단순 렌더링이 아니라 *aggressive 한 head-preview / 접기 / 우선순위* 가 디폴트여야 한다.
2. **asymmetric cost 문제를 명시 해결해야 함** — 작성 비용 ≈ 0, 읽기 비용 = full. md-show-me 는 "이 문서 *어디까지 읽으면 핵심을 본 것인가*" 를 명확히 표시해야 한다 (예: TLDR + "여기까지 = 80% 정보").
3. **"AI 냄새" 자체는 도구가 해결할 수 없다** — 사용자가 못 견디는 건 *문체* 인데, md-show-me 는 .md = source of truth 라 원문은 못 건드린다. 그렇다면 *읽기 mode* (verbose 원문 / TLDR / "AI 냄새 제거" 요약) 토글이 필요.
4. **reviewer 부담 완화가 진짜 use case** — "AI 가 쓴 PR/docs/spec 를 *내가 검토해야* 한다" 가 dev fatigue 의 핵심. md-show-me 는 *코드 변경 ↔ 문서 변경* 의 stale 감지 (M5) 가 이걸 직접 친다 — 강화 가치 높음.
5. **한국어 사용자는 humanize 욕구가 강함** — 추측: md-show-me 가 "AI 티" 자동 감지 (번역투, "~할 수 있습니다" 반복, 과잉 emoji/불릿) 표시 + "이 문단은 AI 가 부풀린 것 같음" 류 hint 를 주면, 한국어 사용자 입장에서 *읽기 부담 절반* 효과 가능.

## 출처 / 추가 reading

- [HN: Why does AI slop feel so bad to read?](https://news.ycombinator.com/item?id=42909042)
- [HN: AI slop, suspicion, and writing back](https://news.ycombinator.com/item?id=42827532)
- [HN: AI slop is killing online communities](https://news.ycombinator.com/item?id=48053203)
- [HN: I am definitely missing the pre-AI writing era](https://news.ycombinator.com/item?id=47571279)
- [HN: AI text flag — "It's not X. It's Y."](https://news.ycombinator.com/item?id=45529020)
- [Simon Willison: Slop is the new Spam](https://simonwillison.net/2024/May/8/slop/)
- [Charlie Guo: The Field Guide to AI Slop](https://www.ignorance.ai/p/the-field-guide-to-ai-slop)
- [Slate: A.I. is making your writing worse](https://slate.com/technology/2025/08/chatgpt-artificial-intelligence-shaming-paranoia-writing.html)
- [brunch: 챗GPT 말투 왜 저럴까](https://brunch.co.kr/@goheesoo417/42)
- [maily.so: AI가 쓴 티 안 나게](https://maily.so/airecipe/posts/1do19kmlzx6)
- [newstorygiver: AI가 쓴 글, 티 안 나게](https://newstorygiver.com/146)
- [DORA / CodeAnt: AI Code Review Overload](https://www.codeant.ai/blogs/prevent-ai-code-review-overload)
- [Yahoo Tech: ChatGPT-5 backlash](https://tech.yahoo.com/ai/articles/chatgpt-5-faces-backlash-users-202441434.html)
- [Developer: AI Markdown Docs are too long, HTML is better](https://www.newsglobenow.com/new349619.html)
