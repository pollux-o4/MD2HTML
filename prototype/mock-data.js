// Mock data: calculator project
// Query: "0으로 나누기 어떻게?"
// Top 5 = [0003-zero-division, README, 0005-input-validation, CONTEXT, 0001-decimal-precision]

const MOCK_QUERY = "0으로 나누기 어떻게?";
const MOCK_PROJECT = "calculator";
const MOCK_SCAN_TIME = "2분 전";

const MOCK_RESULTS = [
  {
    rank: 1,
    path: "docs/adr/0003-zero-division.md",
    title: "ADR 0003: Zero Division Handling",
    score: 0.92,
    strength: "strong",
    excerpt: "0으로 나누는 연산은 IEEE 754 의 Infinity 가 아니라 명시적 DivisionByZeroError 를 던진다. 사용자 친화 메시지 노출이 목표. 계산기 UI 에서는 빨간 배너로 표시. 추후 옵션으로 Infinity 반환 모드 추가 검토.",
    stale: false,
    body: `# ADR 0003: Zero Division Handling

## Status
Accepted

## Context
사용자가 \`5 / 0\` 같은 식을 입력했을 때 처리 방식을 결정해야 함. IEEE 754 는 Infinity 를 반환하지만 사용자 입장에서는 "왜 이게 됐지?" 라는 혼란.

## Decision
0으로 나누는 연산은 \`DivisionByZeroError\` 를 던진다. UI 는 빨간 배너로 "0으로 나눌 수 없습니다" 표시.

## Consequences
- 계산기 코어 함수는 try/catch 필요
- 일관된 에러 핸들링 가능
- Infinity 모드는 추후 옵션으로`,
  },
  {
    rank: 2,
    path: "docs/README.md",
    title: "Calculator Project README",
    score: 0.78,
    strength: "strong",
    excerpt: "사칙연산 기반 계산기 프로젝트. 정확한 소수 연산, 명시적 에러 핸들링 (zero division, overflow), 입력 검증을 핵심 가치로 설계. 자세한 결정은 docs/adr/ 참고.",
    stale: true,
    body: `# Calculator

사칙연산 기반 계산기 프로젝트.

## 핵심 가치
- 정확한 소수 연산 (Decimal 라이브러리)
- 명시적 에러 핸들링 (zero division, overflow)
- 입력 검증

## 문서
- ADR: \`docs/adr/\`
- 도메인 모델: \`docs/CONTEXT.md\``,
  },
  {
    rank: 3,
    path: "docs/adr/0005-input-validation.md",
    title: "ADR 0005: Input Validation",
    score: 0.65,
    strength: "medium",
    excerpt: "입력 검증은 parser 단에서 일괄 처리. 0으로 나누기, 음수 제곱근 등 도메인 에러는 별도 ADR (0003, 0004) 참고. 빈 문자열, 공백, 비숫자 문자는 ValidationError.",
    stale: false,
    body: `# ADR 0005: Input Validation

## Status
Accepted

## Decision
모든 입력은 parser 단에서 검증한다. 빈 문자열, 공백, 비숫자 문자는 \`ValidationError\` 발생.

## Note
0으로 나누기는 도메인 에러이므로 ADR 0003 참고.`,
  },
  {
    rank: 4,
    path: "docs/CONTEXT.md",
    title: "Calculator Domain Model",
    score: 0.54,
    strength: "medium",
    excerpt: "도메인 용어: Expression (사용자 입력), Token (parser 결과 단위), Operator (사칙 + 단항). DivisionByZeroError 는 Operator 단계에서 발생. 자세한 정책은 ADR 참조.",
    stale: false,
    body: `# Calculator Domain Model

## 용어
- **Expression**: 사용자 입력 문자열
- **Token**: parser 가 쪼갠 단위
- **Operator**: 사칙연산 + 단항 (예: -5)
- **DivisionByZeroError**: Operator 단계 에러`,
  },
  {
    rank: 5,
    path: "docs/adr/0001-decimal-precision.md",
    title: "ADR 0001: Decimal Precision",
    score: 0.41,
    strength: "weak",
    excerpt: "float 대신 Decimal 사용. 0.1 + 0.2 != 0.3 문제 회피. 단, 0으로 나누기와는 별도 이슈. 정밀도 기본값은 28자리.",
    stale: false,
    body: `# ADR 0001: Decimal Precision

## Status
Accepted

## Decision
\`float\` 대신 Python \`decimal.Decimal\` 사용. 0.1 + 0.2 != 0.3 문제 회피.

기본 정밀도: 28자리.`,
  },
];

const MOCK_STALE_FILES = [
  { path: "docs/README.md", reason: "file_hash 불일치 (마지막 인덱싱: 3일 전)" },
  { path: "docs/adr/0002-operator-precedence.md", reason: "신규 파일 (인덱싱 안 됨)" },
];

// Empty / error states
const STATE_EMPTY = {
  query: "양자컴퓨팅 어떻게 구현?",
  message: "관련 문서를 찾을 수 없습니다.",
  suggestions: [
    "쿼리를 더 짧게 줄여보세요",
    "키워드 위주로 재구성해보세요",
    "/show-me-setting 으로 인덱싱 범위 확인",
  ],
};

const STATE_OFFLINE = {
  reason: "LLM rerank 단계 실패",
  detail: "BM25 + embedding 결과만 표시합니다. (rerank 없음)",
  results: MOCK_RESULTS.slice(0, 5),
};

const STATE_FIRSTRUN = {
  message: "M0 profile 이 없습니다.",
  detail: "이 프로젝트에서 처음 실행하시는군요. 인덱싱을 먼저 실행해야 합니다.",
  cta: "/show-me-setting init",
};
