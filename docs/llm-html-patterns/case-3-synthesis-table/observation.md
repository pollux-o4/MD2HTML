# Self-Observation — Case 3: 종합 테이블 HTML

## (a) 10개 input 처리 — README/CONTEXT/handoff 의 역할

ADR 7개는 **데이터 원천** (매트릭스의 row 하나 = ADR 하나). README/CONTEXT/handoff 는 **메타** 였다.

- **README**: ADR 의 개수와 ID 만 확인용 (7개라는 것). 본문은 거의 미사용.
- **CONTEXT**: *"Affected Code 의 컬럼은 parser/evaluator/errors/types/tests"* 라는 한 줄이 매트릭스 컬럼 결정을 100% 좌우. 이 줄 없었으면 컬럼을 임의로 추측했을 것.
- **handoff**: ADR 0007 의 status (`Proposed`, 진행 중) 와 알려진 이슈를 ADR 본문보다 더 정확히 알려줌. 0007 sidepanel summary 에 *"진행 중"* 문구는 handoff 기반.

즉 ADR = row 데이터, CONTEXT = schema, README+handoff = status/disclaimer.

## (b) 구조 패턴

좌측 매트릭스 + 우측 sidepanel + 상단 컬럼 필터 + 상단 copy 버튼. matrix 셀에 숫자 (영향 파일 개수), hover 행 강조, dblclick → 상세. 표준 *"impact matrix + drill-down"* dashboard.

## (c) 컴포넌트 종류

table (cell-hit / cell-miss / cell-sel 3 상태), badge (status), filter button (toggle), sidepanel (slide-in), copy-to-clipboard button. Tailwind CDN, vanilla JS.

## (d) 종합 방식

각 ADR 의 `## Affected Code` 섹션 → 파일 경로 → 첫 디렉토리 (`parser/`, `evaluator/`, ...) 기준으로 영역 분류 → 개수 집계. **본문 전체가 아니라 한 섹션만** 정말 필요했다. summary 필드는 ADR 의 `## Decision` 1~2줄 요약. files 필드는 `## Affected Code` 의 bullet 목록 그대로.

매트릭스 7×5 = 35 셀, 각 셀은 정수 1개. 본문 100KB 가 결국 35개 정수 + 7개 짧은 summary 로 환원된다.

## (e) 토큰 효율

10개 본문 풀텍스트 ≈ 1500줄, ~12000 토큰. 실제로 매트릭스 채우는 데 사용한 정보:

- ADR id, title, status (7×3 = 21 토큰 수준)
- Affected Code 의 파일 경로 (ADR 당 3~5줄, 총 ~30줄)
- Decision 첫 1~2줄 (summary 용)
- CONTEXT 의 *"컬럼 정의"* 한 줄

합쳐 **1500 토큰 미만 — 원본의 12% 정도**. 나머지 88% (Context/Consequences/Alternatives 본문) 는 종합 단계에선 *완전히 무시*. 단, sidepanel 이 *"본문 보기"* 까지 지원하려면 본문도 필요 — 이 경우 lazy load 가능 (셀 클릭 시점에 fetch).

## (f) md-show-me 가 사전 가공할 만한 것

3가지 명확한 pre-processing 후보:

1. **섹션 추출**: ADR 들을 `{ id, title, status, decision_summary, affected_files[] }` 5필드 JSON 으로 가공. LLM 은 본문 파싱이 아니라 *"매트릭스 구조 결정"* 에만 집중. 토큰 ~88% 절감.
2. **컬럼 schema 추론**: CONTEXT 에서 *"영향 영역 컬럼"* 정의를 미리 뽑아내 schema 로 LLM 에 전달. *"컬럼 뭘로 할까"* 추측 단계 제거.
3. **status 정합성 merge**: ADR `Status` 필드와 handoff 의 *"진행 중"* 언급을 사전 reconcile. LLM 이 두 곳을 cross-check 안 해도 됨.

이렇게 가공된 JSON 만 넘기면 LLM 작업은 *"이 schema 로 매트릭스 HTML 만들어"* 로 축소 — context 사용량 1/8, hallucination 위험도 급감.
