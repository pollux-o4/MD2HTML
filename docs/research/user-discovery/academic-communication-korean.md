---
id: academic-communication-korean
type: academic-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - Grice 협력원리 (특히 *Manner* 격률) + Sperber-Wilson 관련성 이론은 페르소나 H 의 "AI 응답 읽다 멈춤" 을 *추론 비용 초과* 로 학술 설명 — 풀이 누락 = 격률 위반.
  - 김상욱·정재승·침착맨 공통 패턴 = *정의 → 비유 → 일상 예시 → 적용* 4 단계 + 비유는 친숙 영역 1개로 통일. 한국 popular science 의 검증된 형식.
  - 영한 혼용 anti-pattern 의 해법은 *제거* 가 아니라 *한글 풀이 + 원어 병기* — 토스·국립국어원·한빛 가이드 일치. AI 냄새 3대장은 em dash·번역체·의미없는 hedge.
- **md-show-me 시사점**: 출력 톤 default = "전문 용어 첫 등장 시 한 줄 풀이 + 친숙 영역 비유 1개", 회피 리스트 = em dash 2개+/문장, "~할 수 있습니다", "당사는".
- **증거 강도 / 한계**: 강 = Grice·Sperber-Wilson·번역체 회피·국립국어원 / 중 = 한국 popular science 패턴 (정량 연구 부족) / 약 = em dash 회피 (한국어 데이터 부족), 3 섹션 룰 (자체 룰).
- **읽는 가치**: 한국어 AI 응답 톤 가이드라인 10개 + 자가 점검 체크리스트의 학술·실무 근거 — 출력 후처리 룰 설계 시 1차 인용.

## 개요

이 문서는 md-show-me 산출물의 *한국어 응답 톤* 을 잡기 위한 학술·실무 근거를 모은다. 페르소나 H 의 pain — "AI 응답에서 영어 단어가 한글 사이에 박혀 있어 읽다 멈춤" — 이 단순 취향이 아니라 인지 부담과 audience design 실패라는 점을 보인 뒤, 해소 가이드라인 10개와 자가 점검 체크리스트를 제시한다.

## A. Communication 학술 (대화 영역)

**Grice 의 협력원리 (Cooperative Principle, 1975)**: 대화 참여자는 네 격률을 따른다고 전제된다. *양 (Quantity)* 필요한 만큼만, *질 (Quality)* 참인 것만, *관련성 (Relation)* 주제와 닿는 것만, *방식 (Manner)* 모호하지 않고 간결하게. AI 응답이 "정보 dump" 로 흐를 때 깨지는 것은 주로 양·방식 격률이다.

**Sperber & Wilson 관련성 이론 (Relevance Theory, 1986)**: 청자는 *최소 인지 노력으로 최대 효과* 를 얻는 방향으로 발화를 해석한다. 어려운 용어 첫 등장 시 풀이가 없으면 청자는 추론 비용을 떠안고, 그 비용이 임계를 넘으면 *읽기 포기* 한다. md-show-me 가 "한 번에 읽힘" 을 목표로 한다면 이 이론이 직접 적용된다.

**Brown & Levinson 정중성 이론 (1987)**: 청자의 *체면 (face)* 을 위협하지 않는 hedge ("아마", "~인 듯", "혹시") 는 단순 예의가 아니라 *불확실성 신호* 다. AI 가 모든 문장을 단정형으로 끝내면 청자는 거짓 자신감으로 받아들인다.

**Audience Design (Bell, 1984)**: 화자는 *청자가 알 것* 과 *모를 것* 을 추정해 어휘·문체를 조정한다. 페르소나 H 는 "AI 가 내가 모르는 단어를 모른다는 사실을 모른다" 고 불평하는데, 이게 정확히 audience design 실패다.

## B. 영한 혼용 anti-pattern 해소

한국 dev 글쓰기는 *대체 불가 외래어는 원어, 대체 가능하면 한글* 이 다수 컨벤션이다 (토스 technical-writing 가이드, 위키독스 IT 글쓰기 노트). 그런데 LLM 출력은 영어 학습 데이터 비중이 커 *대체 가능한* 일반어까지 음차 또는 원어로 흘린다 — "trace", "verification", "framework", "context" 가 대표.

국립국어원 외래어 표기법은 *국어 속에 들어와 사용되는 말* 만 통일 표기 대상으로 본다. 즉 "프레임워크" 는 한글 표기 가능하지만 "framework" 영문 잔류는 권장되지 않는다. 토스 라이팅 원칙 중 *Universal words* ("모두가 이해 가능한 표현") 가 같은 결.

## C. 어려운 용어 쉽게 설명 사례 (한국)

**김상욱 (물리)**: 양자 중첩·얽힘 같은 추상 개념을 *일상 비유 + 시각화* 로 푼다. "차근차근, 정확한 정의 후 유머러스 비유" 가 공통 평. 즉 *정의 먼저, 비유는 보조*. 풀이 없이 비유만 던지지 않는다.

**정재승 (뇌과학)**: 뇌의 현상을 물리학·통계학 frame 으로 옮긴다. 청자가 이미 아는 frame (확률, 통계) 을 다리로 삼는 *frame transfer* 가 핵심.

**침착맨·슈카월드·궤도**: YouTube 의 "어려운 거 쉽게" 강자들. 공통 패턴은 (1) 청자가 *질문할 만한 지점* 에서 화자가 먼저 멈춰 풀이, (2) 비유는 *친숙한 영역* (음식, 게임, 일상) 에서만 끌어옴, (3) 결론 먼저 — *뭐가 중요한지* 한 줄.

**공통 패턴 4개**:
- 정의 → 비유 → 일상 예시 → 적용 의 *단계*
- 비유는 *친숙 영역* 1개로 통일 (여러 비유 섞으면 혼란)
- 청자 *예상 질문* 을 화자가 선제적으로 처리
- 결론 / 핵심을 *맨 앞에* 또는 *맨 끝에 한 줄로* 못박음

## D. 영어권 best communicator (참고)

**Feynman technique**: "초보자에게 가르치듯 설명, 막히면 본인이 이해 못 한 지점이다." 비유는 *구조적 유사성* 이 있어야 한다. Feynman 본인의 분석: 정확한 기술적 기술보다 *올바른 비유* 가 더 강한 이해 증거.

**Carl Sagan**: 우주 스케일을 *일상 단위* (오렌지, 모래알) 로 환산. *스케일 다리* 가 시그니처.

**Tim Urban (Wait But Why)**: 추상 개념을 *과장된 시각 비유 + 캐릭터 대화* 로 풀이. 친근 톤과 깊이의 균형.

**공통**: 전문가 자존심을 *비유의 풍부함* 으로 표현. 풀이가 비전문가용이라고 깊이가 얕은 게 아니다.

## E. AI 응답 톤 best practice

2025년 기준 ChatGPT 의 *AI 냄새 시그널* 로 em dash (—), 이모지 남발 (특히 ☑️), "delve / tapestry / nuanced" 류 어휘가 지목됨 (Washington Post "ChatGPT hyphen" 논란). 한국어 출력에서는 (1) em dash 직역, (2) 번역체 ("~할 수 있습니다", "당사는", "~에 대하여"), (3) 의미 없는 hedge ("일반적으로", "보통은") 가 AI 냄새 3대장.

토스 라이팅 가이드의 *Easy to speak* (구어체로 자연스럽게) 와 *Weed cutting* (의미 없는 단어 제거) 이 AI 출력 후처리 룰로 그대로 쓸 수 있다.

## F. md-show-me 적용 — AI 응답 톤 가이드라인 10개

1. **영어 음차 단어는 한글 풀이 + 원어 병기**
   - Before: "원본 trace 를 확인하세요"
   - After: "원본을 되짚어 (trace) 보세요"

2. **어려운 한자어는 일상 단어로**
   - Before: "정보가 한 곳에 수렴합니다"
   - After: "정보가 한 곳에 모입니다"

3. **em dash (—) 는 문장당 0~1회**
   - Before: "이건 — 솔직히 — 좀 어렵다 — 그래서 — 풀이가 필요"
   - After: "이건 솔직히 좀 어렵다. 그래서 풀이가 필요."

4. **전문 용어 첫 등장 시 한 줄 풀이 + 예시 1개**
   - Before: "ADR 을 작성하세요"
   - After: "ADR (Architecture Decision Record, 왜 이렇게 결정했나 1쪽 기록) 을 작성하세요. 예: '이 DB 선택 이유'"

5. **번역체 종결어미 회피**
   - Before: "확인하실 수 있습니다 / 진행되어집니다"
   - After: "확인할 수 있어요 / 진행돼요"

6. **결론 먼저, 풀이 뒤에**
   - Before: 5단락 풀이 후 마지막에 결론
   - After: 한 줄 결론 → 그 다음 풀이

7. **비유는 친숙 영역 1개로 통일**
   - Before: "이건 도서관 같고, 자판기 같고, 또 톱니바퀴 같은데..."
   - After: "이건 도서관이다 — 책 (데이터) 을 책장 (테이블) 에 꽂아 둔다"

8. **청자 배려 hedge — 단정 회피**
   - Before: "이건 무조건 이렇게 해야 합니다"
   - After: "이건 대개 이렇게 해요. (예외 상황은 아래에)"

9. **"당사는 / ~에 대하여 / ~를 통하여" 같은 사무체 회피**
   - Before: "당사는 이에 대하여 검토를 진행하였습니다"
   - After: "저희가 이걸 살펴봤어요"

10. **정보 dump 금지 — 한 답변 3 섹션 이내**
   - Before: 표 3개 + 코드 2개 + 문단 5개
   - After: 핵심 문단 1 + 표 1 + "더 보려면 물어봐 주세요"

## AI 응답 자체 검증 체크리스트 (self-check)

답변 송출 전에 모델이 한 번 더 훑을 수 있는 형태로 정리.

- [ ] 영어 단어 중 한글로 바꿀 수 있는 게 남아있는가? (framework → 틀, context → 맥락)
- [ ] em dash (—) 가 2개 이상 들어갔는가?
- [ ] 첫 등장 전문 용어에 한 줄 풀이가 붙었는가?
- [ ] 종결이 "~할 수 있습니다 / ~되어집니다" 인가? → "~할 수 있어요 / ~돼요" 로
- [ ] 결론 한 줄이 *앞* 또는 *맨 끝* 에 있는가?
- [ ] 비유가 *친숙 영역 1개* 로 통일됐는가?
- [ ] 단정형 ("무조건", "반드시") 이 과다한가? → hedge 추가
- [ ] 표·코드·문단 합계 4개 이상이면 잘라낼 곳 있는가?

## 증거 강도 표

| 가이드라인 | 증거 강도 | 근거 |
|---|---|---|
| Grice 격률 적용 | 높음 | 학술 정설, 한국어 화법 연구에도 직접 적용 |
| 관련성 이론 → 풀이 우선 | 높음 | Sperber & Wilson, 한국 번역학 연구 다수 |
| em dash 회피 | 중간 | 2025 영미권 매체 다수 언급, 한국어 데이터는 부족 |
| 김상욱·정재승 패턴 | 중간 | 도서 평·서평 기반, 정량 연구는 부족 |
| 번역체 회피 (당사는 등) | 높음 | 한빛 번역투 TOP 12, 토스 가이드 일치 |
| 영한 음차 한글화 | 중간 | 국립국어원 + dev blog 가이드 일치, 단 *원어 유지 예외* 합의 부재 |
| 3 섹션 이내 정보량 | 낮음 | 본 프로젝트 자체 룰, 외부 학술 근거 약함 |

## 반박 / 한계

- **"영한 혼용은 dev 한국어의 자연 모습이다"**: 토스·카카오 dev blog 도 영어를 그대로 쓰는 경우가 많다. 따라서 *모든* 영어를 한글로 바꾸자는 게 아니라, "*대체 가능한 일반어 만*" 한글화가 맞다. 가이드라인 #1 도 음차 + 원어 병기 — 원어 자체를 지우지 않는다.
- **김상욱·정재승 패턴이 *모든* 청자에 통하는가**: 두 사람 모두 *책을 끝까지 읽을 의지가 있는 청자* 가 전제다. md-show-me 의 click-through 청자에는 더 짧고 결론 선행이 필요할 수 있다 — 가이드라인 #6.
- **em dash 회피가 *문체 가난* 으로 흐를 위험**: em dash 자체가 나쁜 게 아니라 *AI 신호로 의심받는* 게 문제. 한국어에서는 줄표 사용 빈도가 영어보다 낮아 1~2개 등장은 자연스럽다. 0개 강제는 과교정.
- **자가 점검 체크리스트가 *모델 자체* 에 부담**: 매 응답마다 체크리스트를 돌리면 토큰·지연이 늘어난다. md-show-me 파이프라인의 *후처리 단계* 에 별도로 배치하는 게 더 현실적.

Sources:
- [Cooperative principle — Wikipedia](https://en.wikipedia.org/wiki/Cooperative_principle)
- [협력의 원리 — 위키백과](https://ko.wikipedia.org/wiki/%ED%98%91%EB%A0%A5%EC%9D%98_%EC%9B%90%EB%A6%AC)
- [그라이스의 협력원칙에 기반한 대화적 토론기법 — KCI](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002675555)
- [Relevance theory — Wikipedia](https://en.wikipedia.org/wiki/Relevance_theory)
- [Applicability of Brown and Levinson's Politeness Theory to a Non-Western Culture](https://journals.sagepub.com/doi/full/10.1177/2158244012470116)
- [Audience design — Wikipedia](https://en.wikipedia.org/wiki/Audience_design)
- [국립국어원 외래어 표기법](https://www.korean.go.kr/front/page/pageView.do?page_id=P000104&mn_id=97)
- [5.2 외래어 표기 — IT 글쓰기와 번역 노트](https://wikidocs.net/67217)
- [토스의 8가지 라이팅 원칙들 — Toss Tech](https://toss.tech/article/8-writing-principles-of-toss)
- [toss/technical-writing — GitHub](https://github.com/toss/technical-writing)
- [흔한 번역투 TOP 12 — 한빛출판네트워크](https://www.hanbit.co.kr/channel/category/category_view.html?cms_code=CMS1174085364)
- [김상욱의 양자 공부 — 사이언스북스](https://sciencebooks.minumsa.com/book/1026/)
- [정재승 — 나무위키](https://namu.wiki/w/%EC%A0%95%EC%9E%AC%EC%8A%B9)
- [김상욱 — 나무위키](https://namu.wiki/w/%EA%B9%80%EC%83%81%EC%9A%B1(%EB%AC%BC%EB%A6%AC%ED%95%99%EC%9E%90))
- [The Feynman Technique — InnovationTraining](https://www.innovationtraining.org/what-is-the-feynman-technique-and-how-to-use-it-for-learning/)
- [—(줄표, 대시) — IT 글쓰기와 번역 노트](https://wikidocs.net/79917)
- [The dash for AI — Shady Characters](https://shadycharacters.co.uk/2025/08/the-dash-for-ai/)
- [오픈AI, 챗GPT 문장부호 논란 해결 — 디지털포커스](https://www.digitalfocus.news/news/articleView.html?idxno=16798)
