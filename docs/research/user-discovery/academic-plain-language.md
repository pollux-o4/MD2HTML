---
id: academic-plain-language
type: academic-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - Plain Language 운동 (Plain Writing Act 2010 + plainlanguage.gov) 은 *법적 의무* 수준으로 "쉬운 글" 을 강제 — md-show-me 의 *"베스트셀러 톤"* 은 변덕이 아니라 표준 준수.
  - Pinker 의 *curse of knowledge* 는 페르소나 H (비CS) 가 *기존 .md 큐레이션 도구* 에 느낀 좌절의 학술 명칭 — 작성자가 *독자가 모름을 모른다*.
  - Sweller 의 *worked-example effect* + schema construction = "위계 구조 + 점진 노출" 은 노벨티 효과가 아니라 *novice working memory 보호 메커니즘*.
- **md-show-me 시사점**: 전문 용어 첫 등장 시 인라인 풀이 의무화 / 4단계 구조 (주의 → 소개 → 본문 → 적용) 옵트인 / Hemingway 짧은 문장 default.
- **증거 강도**: 매우 강 = Plain Writing Act·CLT worked example·curse of knowledge / 강 = Zinsser·Google·Microsoft style / 중 = readability 공식 (영어 한정 검증) / 약 = 한국어 readability 공식 (도구 부재).
- **읽는 가치**: "왜 베스트셀러 책처럼 써야 하는가" 의 학술·법률·인지심리 근거 — design philosophy 의 1차 인용 묶음.

# Academic Plain Language 조사 — md-show-me 가독성 design 근거

## 1. 개요

md-show-me 의 *design philosophy* 는 "도메인 무관 readable + 전문 용어 풀이 + 사용자 지식 가정 X" 다. 페르소나 H (비CS, 부트캠프 출신 풀스택 인턴) 가 기존 .md 큐레이션 도구 (Obsidian Publish, Logseq Publish, GitHub Wiki) 에서 *전문가 동료에게 던지는 노트* 에 좌초한 경험이 출발점이다. 이 문서는 그 직관이 **plain language 운동 + 인지심리학 + popular science 패턴** 의 교차점에 정확히 안착함을 증명한다.

## 2. 영역별 문헌 + 시사점

### A. Plain Language movement

> Plain Writing Act of 2010, Pub. L. 111-274. https://plainlanguage.gov/law/
> Federal Plain Language Guidelines (2011). https://plainlanguage.gov/guidelines/
> 국립국어원 (2021). *행정문서 표현 개선 및 쉬운 공공언어 쓰기 지침 개발*. https://www.korean.go.kr/front/reportData/reportDataView.do?report_seq=1122

US 연방기관은 "clear, concise, well-organized, and follows other best practices appropriate to the subject or field and intended audience" 한 글쓰기를 *법적으로* 의무화 받는다. 매년 compliance 보고도 제출한다. 한국은 국립국어원이 *쉬운 우리말 쓰기* 가이드 + 공공언어 점검표를 운영 — 외래어/외국어를 쉬운 우리말로 치환, 행정 jargon 제거.

**md-show-me 적용**: "쉬운 글" 은 design *옵션* 이 아니라 *공공기관 표준* — repo .md 에 잔존하는 jargon (예: "FK", "GC", "ADR") 을 인라인 풀이 없이 두면 페르소나 H 는 자동 이탈. plainlanguage.gov guideline 의 *audience-first* 원칙을 그대로 차용 가능.

### B. Readability 측정

> Flesch, R. (1948). "A new readability yardstick." *Journal of Applied Psychology*, 32(3), 221–233. DOI: https://doi.org/10.1037/h0057532
> McLaughlin, G. H. (1969). "SMOG grading: A new readability formula." *Journal of Reading*, 12(8), 639–646.
> 서혁 외 (2013). *한국어 읽기 텍스트의 난이도 측정 공식 개발에 관한 연구*. 외국어로서의 한국어교육. https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002560113

Flesch-Kincaid Grade Level / Gunning Fog / SMOG / ARI / Coleman-Liau 가 표준. SMOG 만 100% 이해 기준에서 r = 0.985 의 강한 validity — 나머지는 *readability ≠ comprehensibility* 비판 (UXmatters 2019, Janan & Wray 2014) 누적. **한국어는 영어 공식 직접 적용 불가** — 어절 길이·문법 난이도·어휘 난이도가 별도. 서혁 (2013), 정해권 (2014) 등이 한국어 공식을 제안했으나 *공개된 무료 측정 도구는 사실상 부재* (확인됨: 2026-05).

**md-show-me 적용**: 자동 점수 도입은 *위험* — 페르소나 H 의 좌절은 "Grade 12" 가 아니라 *jargon 미풀이* 가 원인. 차라리 *jargon 검출기* (도메인 약어 N글자 이하 풀이 누락 시 경고) 가 직접적.

### C. 쉬운 글쓰기 가이드 — 정전

> Strunk, W. & White, E. B. (1959/2000). *The Elements of Style* (4th ed.). Longman. ISBN 978-0205309023.
> Zinsser, W. (1976/2006). *On Writing Well* (30th anniv. ed.). HarperCollins. ISBN 978-0060891541.
> Pinker, S. (2014). *The Sense of Style*. Viking. ISBN 978-0670025855.
> Garner, B. A. (2016). *Garner's Modern English Usage* (4th ed.). Oxford UP. ISBN 978-0190491482.

Zinsser 의 4원칙 — **Clarity, Simplicity, Brevity, Humanity**. "Strip every sentence to its cleanest component." Pinker 는 *curse of knowledge* (작성자가 독자의 무지를 상상 못함) 를 *bad prose 의 single best explanation* 으로 지목. 해법: *classic style* (독자가 reality 를 보게 하기), 대표 독자에게 초안 보여주기, 내용 추가 없이 *이해성 향상만* 위한 재작성.

**md-show-me 적용**: "전문 용어 풀이" 는 *친절* 이 아니라 *curse of knowledge 교정 메커니즘*. *대표 독자* = 페르소나 H 를 review 단계에 반드시 투입 (cross-review-personas.md 와 정합).

### D. 베스트셀러 / popular science 패턴

> Gawande, A. *Complications* (2002), *The Checklist Manifesto* (2009). Metropolitan Books.
> Gladwell, M. *Outliers* (2008), *Talking to Strangers* (2019). Little, Brown.
> Ciechanowski, B. *ciechanow.ski* — explorable explanations (Cameras and Lenses, Gears, Color Spaces). https://ciechanow.ski/
> 김상욱 (2016). *김상욱의 과학공부*. 동아시아.

Gawande / Gladwell 공통: *story-first, idea-second* — *deliberate withholding* 으로 호기심 유지, 일상 → 추상 → 일반화. Ciechanowski 는 *interactive explorable* — slider/canvas 로 매개변수 직접 조작, 직관 schema 구축 후 수식. 김상욱은 양자역학을 *문학·역사·정치* 비유로 번역.

**md-show-me 적용**:

- "주의 집중 → 간단 소개 → 본문 → 적용" 4단계는 Gawande/Gladwell narrative arc 의 압축.
- HTML 의 interactive widget (toggle, slider) 은 Ciechanowski 식 schema 구축의 도구화 — *읽기만* 보다 *조작* 이 학습 깊다.

### E. Technical writing 학술 + 산업 표준

> Rude, C. D. & Eaton, A. (2010). *Technical Editing* (5th ed.). Longman. ISBN 978-0205786718.
> Hackos, J. T. & Stevens, D. M. (1997). *Standards for Online Communication*. Wiley. ISBN 978-0471156956.
> Google Developer Documentation Style Guide. https://developers.google.com/style
> Microsoft Writing Style Guide. https://learn.microsoft.com/en-us/style-guide/welcome/

Google: "conversational, friendly, respectful, knowledgeable friend" — *어렵게 보이려는 충동 억제* 가 명시 원칙. Microsoft: "simple and human" — "utilize → use, remediate → fix, facilitate → help" 같은 *어휘 단순화 사전* 보유. 두 가이드 모두 *2인칭, 현재형, 능동태* 강제.

**md-show-me 적용**: 한국어판 *어휘 단순화 사전* 이 필요 — "수행하다 → 한다, 활용하다 → 쓴다, 구현하다 → 만든다". *Microsoft style 한국어 변형* 으로 default tone 지정.

### F. Cognitive load 와 explain-as-you-go

> Sweller, J. & Cooper, G. A. (1985). "The use of worked examples as a substitute for problem solving in learning algebra." *Cognition and Instruction*, 2(1), 59–89. DOI: https://doi.org/10.1207/s1532690xci0201_3
> Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). "The expertise reversal effect." *Educational Psychologist*, 38(1), 23–31. DOI: https://doi.org/10.1207/S15326985EP3801_4
> Chase, W. G. & Simon, H. A. (1973). "Perception in chess." *Cognitive Psychology*, 4(1), 55–81.

Sweller-Cooper: novice 는 worked example (완성된 풀이 단계) 학습이 직접 풀이보다 통계적으로 우월. Kalyuga: 그러나 expertise 가 쌓이면 *redundancy effect* 로 역전 — *novice 에게 좋은 것이 expert 에겐 해로움*. Chase-Simon 의 chess schema 실험은 expert 가 6 piece 를 1 chunk 로 보는 *위계 schema* 의 원형.

**md-show-me 적용**:

- 페르소나 H = novice 도메인 → worked example 강제 (전문 용어 풀이 + 예시 + 비유 1개 이상).
- 페르소나 A (백엔드 시니어) = expert → *옵션* (skip / hide) — 4단계 강제는 expertise reversal 위험.
- 학교 → 학생 → 노트 → 목차 식 *위계 시각화* = schema chunking 의 명시화 — Chase-Simon 의 chess board 와 동형.

## 3. md-show-me 직접 적용 design 원칙 (8개)

1. **Curse-of-knowledge 차단**: 모든 전문 용어 (도메인 약어 / 3글자 이하 영문) 는 첫 등장 시 인라인 풀이 *의무* — 1회 등장 후엔 생략 가능 (redundancy effect).
2. **4단계 narrative arc**: "주의 집중 (lead) → 간단 소개 (premise) → 본문 (worked example) → 적용 (transfer)" — Gawande/Gladwell 패턴, novice 에 default ON / expert 에 toggle.
3. **위계 시각화 강제**: 학교 → 학생 → 노트 → 목차 식 *물리적 nesting* — Chase-Simon schema chunking 의 UI 화.
4. **Hemingway-style 짧은 문장 default**: 평균 문장 어절 ≤ 12 (한국어), 한 문장 1 idea — Zinsser "strip to cleanest component".
5. **비유 / 예시 frequency**: 추상 개념 1개당 *구체 예 1개* + *일상 비유 1개* — Ciechanowski explorable 의 idle 버전.
6. **어휘 단순화 한국어 사전**: "수행 → 함, 활용 → 씀, 구현 → 만듦, 도출 → 얻음" — Microsoft style 한국어 변형.
7. **2인칭·능동·현재**: Google + Microsoft 두 가이드의 교집합 — "사용자가 클릭하면 ~된다" 가 아니라 "당신이 클릭하면 ~한다".
8. **Representative reader review**: 페르소나 H 직접 review 단계 — Pinker 처방의 *대표 독자* 메커니즘. AI 자동 review 만으로는 curse of knowledge 검출 어렵다.

## 4. 증거 강도 표

| 원칙 | 증거 | 강도 |
|---|---|---|
| Plain language 의무 | Plain Writing Act 2010, 국립국어원 가이드 | 매우 강 (법·정부 표준) |
| Curse of knowledge | Pinker 2014 (이론), Camerer-Loewenstein-Weber 1989 (실험) | 매우 강 |
| Worked example for novice | Sweller-Cooper 1985 (RCT), 30+ replication | 매우 강 |
| Expertise reversal | Kalyuga 2003 (메타분석) | 매우 강 |
| Schema chunking | Chase-Simon 1973 (chess 실험) | 매우 강 |
| Hemingway 짧은 문장 | Zinsser 1976 (규범), Flesch 1948 (상관) | 강 (이론 + 약한 상관) |
| 비유/예시 frequency | Gawande/Gladwell 패턴 분석 (질적) | 중 (서술적, RCT 없음) |
| Readability 자동 점수 | UXmatters 2019, Janan-Wray 2014 비판 | 약 (validity 부족) |
| 한국어 readability 공식 | 서혁 2013, 정해권 2014 (이론), 도구 부재 | 약 (실용성 ↓) |

## 5. 반박 / 한계

- **Expertise reversal 의 양면성**: 페르소나 A/C (시니어/리드) 에게 4단계 narrative + 비유 강제는 *시간 낭비 + 인지 모욕* 으로 작용 가능. → *기본 ON / 1-click skip* 옵트아웃 + 페르소나 자동 감지 (질의 jargon density) 필요.
- **Readability 공식의 validity 부재**: Flesch-Kincaid 자동 점수 도입은 *측정 가능성 ≠ 측정 타당성* 함정 — Goodhart's law (측정이 목표가 되면 측정이 망가짐). 도입한다면 *경고용* 만, *gate* 로 쓰지 말 것.
- **한국어 readability 공식 도구 부재**: 영어 공식 차용은 *오류* — 한국어 어절·조사 특성 무시. 자체 *jargon 검출기* + *문장 어절 분포* 같은 *부분 metric* 만 가능.
- **Curse of knowledge 의 비대칭 비용**: 모든 jargon 풀이는 *expert 의 redundancy effect* 와 충돌. 해법은 *점진 노출* (첫 등장만 풀이, 이후 ID 로 링크) — 그러나 구현 복잡도 ↑.
- **Plain language 의 무신경 위험**: "쉬움" 추구가 *정확성* 을 희생 가능 (예: "FK" 를 "외래키" 로 풀면 SQL context 잃음). → *풀이 + 원어 병기* 가 안전 default.
- **베스트셀러 패턴의 selection bias**: Gawande/Gladwell 은 *팔린* 책 — 안 팔린 popular science 의 실패 패턴은 학술적으로 덜 분석됨. 패턴 일반화에 신중.

## 6. 참고 문헌 (URL/DOI 검증 2026-05-27)

- Plain Writing Act 2010: https://plainlanguage.gov/law/
- Federal Plain Language Guidelines: https://plainlanguage.gov/guidelines/
- 국립국어원 *행정문서 표현 개선*: https://www.korean.go.kr/front/reportData/reportDataView.do?report_seq=1122
- Flesch 1948 DOI: https://doi.org/10.1037/h0057532
- Sweller-Cooper 1985 DOI: https://doi.org/10.1207/s1532690xci0201_3
- Kalyuga 2003 DOI: https://doi.org/10.1207/S15326985EP3801_4
- Pinker "Curse of Knowledge": https://www.psychologicalscience.org/observer/the-curse-of-knowledge-pinker-describes-a-key-cause-of-bad-writing
- Google Developer Style: https://developers.google.com/style
- Microsoft Writing Style Guide: https://learn.microsoft.com/en-us/style-guide/welcome/
- Ciechanowski explorables: https://ciechanow.ski/
- 서혁 2013 한국어 난이도 공식: https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002560113
