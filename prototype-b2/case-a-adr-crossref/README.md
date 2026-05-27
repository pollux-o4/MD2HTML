# Prototype B2 — Case A: ADR cross-ref

> 쿼리 한 줄로 "ADR 1~5 결정이 코드에 어떻게 반영됐는지" 를 인터랙티브 HTML 로 큐레이션하는 agent loop 시뮬레이션.

## 무엇을 검증하나

Prototype B2 의 4가지 원칙 중 Case A 는 다음을 검증한다.

1. **Agent loop (no hard cut)** — 후보 N개로 자르지 않고, 각 단계 끝에 LLM 자체 평가로 다음 단계 진행 여부 결정
2. **Parent context 격리** — 큐레이션이 main agent (사용자) 컨텍스트를 더럽히지 않음. 전체 50 ADR markdown 은 internal 단계 안에서만 노출되고, 최종 main 컨텍스트엔 큐레이션된 카드 데이터 (~1.2k tokens) 만 노출
3. **Tarik 식 인터랙티브 HTML** — copy-as-prompt 버튼, hover detail, 사용자가 직접 카드 펼침/접힘 조작
4. **Dirty repo cross-doc semantic matching** — 50 ADR 중 5개만 실제 코드 영향, 나머지 45개는 운영/도구 결정. 정리 안 된 repo 에서 의미 있는 5개를 골라낸다

## 파일 구성

```
case-a-adr-crossref/
├── README.md          ← 이 문서
├── index.html         ← 엔트리 (단일 페이지)
├── style.css          ← 다크 테마 인터랙티브 UI
├── app.js             ← agent loop 시뮬레이션 + 렌더링 + 인터랙션
└── mock-repo/
    ├── docs/adr/
    │   ├── 0001-typescript-strict-mode.md       (100줄, 코드 영향)
    │   ├── 0002-commonjs-to-esm.md              (100줄, 코드 영향)
    │   ├── 0003-zod-schema-validation.md        (100줄, 코드 영향)
    │   ├── 0004-vitest-replaces-jest.md         (100줄, 코드 영향)
    │   ├── 0005-centralized-error-handling.md   (100줄, 코드 영향)
    │   └── 0006-stub.md ~ 0050-stub.md          (45개, 30줄, 코드 영향 없음)
    ├── src/
    │   ├── api/app.ts, api/middleware/error-handler.ts, api/routes/users.ts
    │   ├── auth/user-service.ts
    │   ├── schema/user.ts, schema/env.ts
    │   └── utils/errors.ts, utils/logger.ts, utils/paths.ts
    ├── tests/user.test.ts
    ├── tsconfig.json, vitest.config.ts, package.json
    └── README.md
```

## 실행

```
# 가장 간단 — 더블클릭 또는
file:///.../case-a-adr-crossref/index.html

# clipboard 권한이 막힐 수 있으니 권장
python -m http.server 8000
→ http://localhost:8000/
```

## Agent loop — 4 단계

### Step 1. Discovery (rule-based, instant)

- 쿼리 `"ADR 1~5"` 에서 정규식으로 id range 추출 → `[1..5]`
- 50개 ADR index 에서 해당 id 만 필터 → 5개 후보
- **LLM call 없음.** ~3ms
- *원칙: hard cut 아님 — 단순 매칭일 뿐, 다음 단계가 evaluate 한다*

### Step 2. Evaluation (internal LLM call)

- 각 ADR 의 `## Decision` 섹션을 LLM 으로 추출 + 요약
- 코드 영향 여부 (`impact: bool`) 함께 판단
- LLM 자체 판단: *"5개 모두 impact 있고 사용자 의도와 일치 — 추가 탐색 불필요"*
- *원칙: hard cut 으로 N 개를 자르지 않고, 평가 후 자체 결정*

### Step 3. Cross-ref (코드 grep + LLM 평가)

- 패턴 `/ADR-(0001|0002|0003|0004|0005)/` 로 `src/**`, `tests/**`, `*.json` grep
- ADR 당 평균 3~4 곳 매칭
- LLM 자체 판단: *"평균 3.4 곳 — 대표 예시로 충분"* → 다음 단계
- *원칙: 결과가 부족하면 semantic search 추가 — 여기선 충분하므로 skip*

### Step 4. Curation (인터랙티브 데이터 모델)

- 카드 데이터 구조 빌드: `{id, title, decisionSummary, locations[], promptHint, related[]}`
- 코드 위치마다 line number + 마커 라인 하이라이트
- copy-as-prompt 용 prompt template 생성
- *main agent 컨텍스트엔 이 모델 (~1.2k tokens) 만 전달됨*

## 인터랙션

### 1. agent loop trace 토글
- 페이지 상단의 `▸ agent loop trace [4 steps]` 클릭 → 펼침
- 4 단계 각각의 internal log 확인 가능
- 사용자가 *"내 컨텍스트 토큰 안 썼는데 이런 일이 일어났구나"* 직접 확인

### 2. ADR 카드 클릭 → 코드 위치 펼침
- 카드 헤더 영역 클릭 → 펼침/접힘 토글
- 각 코드 위치: 파일 경로, 라인 번호, 스니펫 (마커 라인 노란색 하이라이트)
- 일부 위치엔 추가 노트 (`"ADR-0001 의 컴파일러 옵션 8개 모두 반영"` 등)

### 3. copy-as-prompt 버튼
- 카드 우측 상단 `copy-as-prompt` 클릭
- 클립보드에 다음 형식 prompt 가 복사됨:
  ```
  # ADR-0003 — Zod 를 스키마 검증 도구로 채택

  ## Decision (요약)
  모든 HTTP request body / 환경변수 / 외부 API 응답을 Zod 스키마로 검증...

  ## 영향 받은 코드 위치 (3곳)
  - src/schema/user.ts:L1
  - src/schema/env.ts:L1
  - src/api/routes/users.ts:L17 — ADR-0003: 수동 검증 50줄 → Zod parse 1줄

  ## 후속 작업
  Zod 스키마가 도입된 위치 (user schema, env schema) 의 단순화 효과를...
  ```
- 그대로 다른 agent / Claude / ChatGPT 에 붙여넣어 follow-up 가능
- *file:// 에서는 clipboard 권한 막힐 수 있음 → http 서버 권장*

### 4. hover detail
- 카드 헤더에 마우스 올리면 우측 상단에 작은 detail 박스 표시
- status / date / related ADR / 영향 받은 코드 위치 수
- 클릭 없이도 메타 정보 빠르게 확인

## 시뮬레이션 vs 실제

이 prototype 의 LLM call 들은 **하드코딩된 결정 요약** 으로 대체됐다.
실제 구현에서는:

- Step 2 의 evaluation 은 진짜 LLM call (`anthropic.messages.create({...})`)
- Step 3 의 "충분한가?" 판단도 LLM call
- 데이터는 ADR markdown 파일을 동적으로 읽어서 입력

여기선 **agent loop 의 흐름과 격리 패턴** 을 보여주는 것이 목적이므로,
실제 LLM 호출 비용 없이 결과를 재현 가능하게 만들었다.

## 어떤 결정을 했나 (요약)

- **데이터 임베드**: `fetch()` 대신 `app.js` 안에 데이터 하드코딩 — `file://` 에서도 CORS 없이 동작
- **단일 페이지**: 라우팅 없음, 쿼리 고정 (`"ADR 1~5 ..."`) — prototype 목적상 충분
- **dark theme**: 코드 스니펫 가독성 우선
- **trace 는 default 접힘**: 사용자가 명시적으로 펼쳐서 "격리되어 있었구나" 확인하는 UX
- **vanilla JS**: 빌드 도구 없이 더블클릭으로 실행 가능
