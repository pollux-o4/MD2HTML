# Self-Observation: 5개 ADR set → 카드 그리드

## (a) 5개 input → 카드 영역 매핑

각 ADR 의 섹션을 카드 영역에 다음과 같이 매핑했다:

| ADR 섹션 | 카드 영역 (그리드) | 모달 (펼침) |
|---|---|---|
| 파일명 `0001-...` | `ADR-0001` ID 뱃지 | 헤더 ID |
| 첫 줄 (`# ADR 0001: ...`) | 카드 제목 `<h2>` | 모달 제목 |
| Status | 색상 뱃지 (녹/황/적) | 모달 우상단 뱃지 |
| Date | 카드 푸터 좌측 | 모달 헤더 |
| Decision (1문장 압축) | 카드 본문 (2줄 클램프) | 모달 Decision 전체 |
| Context | (그리드에서 생략) | 모달 Context |
| Consequences | (생략) | 모달 Consequences |
| Affected Code | 갯수만 ("5 files") | 파일 리스트 |

## (b) 구조 패턴

- **그리드**: `repeat(auto-fill, minmax(320px, 1fr))` — 화면 폭에 따라 1/2/3컬럼 자동
- **카드 내부**: head (ID + 뱃지) → 제목 → 요약 2줄 → foot (날짜 + 파일 갯수)
- **펼침 메커니즘**: 모달 (backdrop 클릭으로 닫힘). accordion 보다 모달이 5개 ADR 비교 시 정신 모델 깔끔.

## (c) 컴포넌트 종류

`card`, `badge` (status 3종), `modal`, `file-list`, `btn` (primary/secondary), `toast` (복사 알림). 외부 라이브러리 0개 — file:// 로 즉시 열림.

## (d) 5개 입력 통합 방식

**전체를 모두 받아서 한 번에 JS 배열 `ADRS`** 로 구조화. 카드별 부분 추출이 아니라, 5개 markdown 의 *모든* 섹션 (Context/Decision/Consequences/Affected Code) 을 동일 스키마 객체로 정규화했다. 모달이 모든 섹션을 보여줘야 했기 때문.

## (e) 토큰 효율 분석

5개 ADR 전체를 다 받은 건 **부분적으로만 정당화**된다:

- **반드시 필요했던 부분**: 제목, Status, Decision (요약 표시), Affected Code 파일 목록
- **모달 펼침에만 필요**: Context, Consequences 전문
- **사실상 안 쓴 부분**: 각 섹션 내부의 부연 설명 단락들 — 모달에서 짧게 요약 재작성했음

대략 **본문의 40~50% 만 실제 출력에 반영**됐다. 나머지는 *요약 압축* 으로 손실. 5개 × 50줄 = 250줄 input → 출력 카드 60줄. 토큰 효율 관점에서 명백한 낭비.

## (f) md-show-me 가 사전 가공할 만한 것

가장 효율적인 사전 가공은 **ADR 스키마 추출**:

```yaml
- id: "0001"
  title: "..."
  status: Accepted
  date: 2026-02-14
  decision_summary: "한 줄"   # ← LLM 이 매번 압축할 필요 X
  context_summary: "2-3줄"
  consequences_summary: "긍정/부정 각 1줄"
  files: [...]
```

이 YAML 만 받으면 LLM 은 *구조화 작업* 을 건너뛰고 *시각 디자인* 에만 집중. 250줄 markdown → 50줄 YAML 로 **80% 토큰 절감** 추정. 추가로 *카드/모달 분리 힌트* (어느 필드가 카드용, 어느게 펼침용) 를 메타로 주면 LLM 의 매핑 결정도 생략 가능.
