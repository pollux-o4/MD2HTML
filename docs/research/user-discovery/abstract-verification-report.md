---
id: abstract-verification-report
type: verification-report
generated: 2026-05-27
---

# ## 요약 섹션 검증 보고서

4개 docs (`academic-plain-language.md`, `academic-information-hierarchy.md`, `academic-communication-korean.md`, `web-explainer-best-practices.md`) 의 frontmatter 직후 `## 요약` 섹션 존재·위치·형식을 검증하고, 표준에서 벗어난 2개를 보완했다. 본문 변경은 0건이며, frontmatter 와 첫 H1 사이의 `## 요약` 영역만 수정했다.

## 검증 결과

| 파일 | 존재 | 위치 적절 | 내용 적절 | 핵심 발견 (1줄) |
|---|---|---|---|---|
| academic-plain-language.md | Y | Y | Y | Plain Writing Act + curse of knowledge + worked-example effect = "베스트셀러 톤" 의 법·인지심리 근거 |
| academic-information-hierarchy.md | Y | Y | Y | IA 4축 중 navigate (breadcrumb·TOC·위계) 가 우리 도구의 최대 미충족 — graph view 자제와 양립 |
| academic-communication-korean.md | Y | Y | 보완함 | Grice·Sperber-Wilson + 김상욱·정재승 패턴 + 영한 음차 한글화 = 한국어 AI 톤 3 축 |
| web-explainer-best-practices.md | Y | Y | 보완함 | 17 사이트 공통 = 구체→추상 / 위계 가시 / 용어 풀이; 한국어 차별화 = 위키백과 친절함 + Bartosz 시각화 교집합 |

## 보완 상세

### 1. academic-communication-korean.md

기존 ## 요약 = *한 단락 산문체* (9 line 단일 paragraph). 표준 (bullet 형식 + 핵심 발견 3 + 시사점 + 증거 강도 + 읽는 가치 4축) 과 불일치 → 본문 내용 (Grice, 김상욱·정재승, 영한 음차, 가이드라인 10개) 을 보존하면서 표준 4축 bullet 으로 재구성. 내용 손실 없음.

### 2. web-explainer-best-practices.md

기존 ## 요약 = bullet 6개로 형식상 유사하나, *4축 구조 미준수* — "핵심 발견 3가지 / 시사점 / 증거 강도·한계 / 읽는 가치" 가 명시되지 않고 발견 사항만 나열. 본문 (17 사이트 분석표, 차용 top 10, 한국어 환경 분석) 을 근거로 4축 재구성. 차용 top 5 와 friendly layer 옵션은 보존.

### 3. 변경 없음 — academic-plain-language.md, academic-information-hierarchy.md

두 파일 모두 표준 4축 (핵심 발견 3 / 시사점 / 증거 강도 / 읽는 가치) 을 이미 정확히 따름. 위치도 frontmatter `---` 닫는 줄 (line 5) 직후 line 7 부터 시작. 분량도 표준 5~10줄 / 200~400자 범위. *건드리지 않음*.

## 형식 표준 (참고)

```markdown
## 요약

- **핵심 발견 3가지**: (각 1줄)
- **md-show-me 시사점 1줄**
- **증거 강도 / 한계**: (1줄)
- **읽는 가치**: 어떤 의사결정에 도움 (1줄)
```

분량 5~10줄 / 200~400자.

## 검증 절차

각 파일에 대해 (1) frontmatter `---` 닫는 줄 위치 확인, (2) 그 바로 다음 H2 가 `## 요약` 인지 확인, (3) 형식 (bullet 4축) 과 분량 (5~10줄) 점검, (4) 부적절 시 본문을 근거로 재작성 후 atomic Edit 으로 교체. `Read` → `Edit` 만 사용했고, 본문 영역 (`## 1. 개요` 이하) 은 일절 접근하지 않았다.

## 결과 요약

- 총 검증 4 / 수정 필요 2 / 적절 2
- 본문 변경 0건 (frontmatter ~ 첫 H1 사이 ## 요약 영역만 수정)
- 페르소나 H 보고용 일관성 달성 — 4 docs 모두 동일 4축 표준 따름
