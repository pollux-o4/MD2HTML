/* ============================================================================
 * prototype-b2 / case-a — ADR cross-ref agent loop 시뮬레이션
 *
 * 검증 원칙:
 *   1. Agent loop (no hard cut) — 후보 N개로 자르지 않고 LLM 자체 평가가 멈춤 시점 결정
 *   2. Parent context 격리 — 큐레이션은 internal LLM call (이 파일 안에서만 발생),
 *      main agent 컨텍스트는 최종 큐레이션된 HTML 만 본다
 *   3. Tarik 식 인터랙티브 — copy-as-prompt, hover detail, 사용자 조작
 *   4. Dirty repo cross-doc semantic matching (여기선 50 ADR 중 5개만 코드 영향)
 *
 * 데이터는 임베드 — file:// 에서도 동작하도록 (fetch 의존성 없음)
 * ========================================================================== */

// ============================================================================
// 1. MOCK DATA — 50 ADR 메타 + 5 핵심 ADR 의 decision 요약 + 코드 grep 결과
// ============================================================================

// 50 ADR 메타 (id, title, status, date, related)
const ADR_INDEX = (() => {
  const core = [
    { id: 1, title: "TypeScript strict mode 채택", date: "2025-01-12", related: [3, 5] },
    { id: 2, title: "CommonJS 에서 ESM 으로 전환", date: "2025-01-28", related: [4] },
    { id: 3, title: "Zod 를 스키마 검증 도구로 채택", date: "2025-02-10", related: [1, 5] },
    { id: 4, title: "Jest 를 Vitest 로 교체", date: "2025-02-22", related: [2] },
    { id: 5, title: "중앙화된 에러 핸들링 도입", date: "2025-03-05", related: [1, 3] },
  ];
  const stubTopics = [
    "API 버전 헤더 정책","feature flag 시스템","로깅 라이브러리 pino","DB connection pool 크기","Redis 캐시 TTL 표준",
    "사내 디자인 시스템 v2","monorepo pnpm workspace","CI 캐시 전략","docker base image alpine","Helm chart 표준화",
    "K8s namespace 분리","서비스 mesh Linkerd","metric Prometheus","tracing OpenTelemetry","에러 알림 Slack channel",
    "DB 마이그레이션 Prisma","seed 데이터 fixture 규칙","secret 관리 Vault","환경 분리 dev/stg/prd","blue-green 배포",
    "rate limit 정책","CORS origin allowlist","CSP 헤더 도입","HTTPS 강제 HSTS","cookie SameSite=lax",
    "이미지 CDN Cloudflare","폰트 self-host","i18n key namespace","번들러 esbuild","CSS modules vs Tailwind",
    "frontend state Zustand","React Query 캐시 키","form Hook Form","Storybook 도입","E2E Playwright",
    "git branch trunk-based","conventional commits","PR 템플릿 표준","코드 리뷰 SLA","oncall rotation",
    "incident postmortem 양식","RFC 프로세스","ADR 작성 의무화","문서화 mkdocs","API 문서 OpenAPI 자동생성",
  ];
  const stubs = stubTopics.map((t, i) => ({
    id: i + 6, title: t, date: `2025-0${3 + ((i + 6) % 7)}-${((i * 3) % 27) + 1}`.replace(/-0?(\d)$/, "-0$1"),
    related: [],
  }));
  return [...core, ...stubs].map((a) => ({ ...a, status: "Accepted" }));
})();

// 5 핵심 ADR 의 decision 요약 (LLM Evaluation 단계 산출물)
const DECISION_SUMMARIES = {
  1: {
    summary: "tsconfig 의 strict 계열 8개 옵션을 모두 활성화하고, tsc --noEmit 를 PR 게이트로 강제. 신규 파일은 무조건 통과, 기존 파일은 모듈 단위로 점진 마이그레이션.",
    markerRegex: /ADR-0001/,
    promptHint: "TypeScript strict mode 도입의 컴파일러 옵션 8개와 마이그레이션 순서를 더 자세히 설명해줘. 어떤 코드 위치에서 실제로 nullability 패턴이 도입됐는지 분석 포함.",
  },
  2: {
    summary: "package.json 에 \"type\": \"module\" 추가, 모든 import 에 명시적 .js 확장자, __dirname 은 import.meta.url 기반 헬퍼로 대체. CommonJS 의존성은 createRequire 호환 레이어로 격리.",
    markerRegex: /ADR-0002/,
    promptHint: "ESM 전환의 단계별 마이그레이션 (utils → schema → api → auth) 이 실제 코드에 어떻게 반영됐는지 설명해줘. import.meta.url 헬퍼 사용 위치 포함.",
  },
  3: {
    summary: "모든 HTTP request body / 환경변수 / 외부 API 응답을 Zod 스키마로 검증. 스키마에서 z.infer 로 타입 도출 (single source of truth). ZodError 는 중앙 핸들러 (ADR-0005) 가 HTTP 400 으로 변환.",
    markerRegex: /ADR-0003/,
    promptHint: "Zod 스키마가 도입된 위치 (user schema, env schema) 의 단순화 효과를 정량적으로 설명해줘. ADR-0005 와의 ZodError 변환 흐름 포함.",
  },
  4: {
    summary: "Jest 의존성 제거, Vitest 도입. jest.mock() → vi.mock() 일괄 치환. vitest.config.ts 로 설정 이전. ESM 친화적이라 ADR-0002 와 자연스럽게 맞물림.",
    markerRegex: /ADR-0004/,
    promptHint: "Vitest 마이그레이션의 cold start 5배 향상 근거와 vi.mock 으로의 API 호환성 한계를 설명해줘. 실제 테스트 파일에서 어떻게 import 가 바뀌었는지 보여줘.",
  },
  5: {
    summary: "AppError 베이스 + 도메인 서브클래스 (Validation/Auth/NotFound/Conflict). 중앙 errorHandler 미들웨어가 ZodError 와 raw error 를 통일된 응답 schema 로 변환. 라우트에서 try/catch + res.status 직접 호출 금지.",
    markerRegex: /ADR-0005/,
    promptHint: "중앙 에러 핸들러의 응답 schema 와 production 모드 마스킹 규칙을 더 자세히 설명해줘. 라우트에서 throw 만 하면 어떻게 처리되는지 흐름 분석 포함.",
  },
};

// Cross-ref 결과 — 실제 src/ 파일 grep 시뮬레이션
// (마커 주석 "ADR-NNNN" 기반 매칭)
const CROSS_REF = {
  1: [
    {
      path: "src/utils/errors.ts", line: 2,
      snippet: [
        "// ADR-0005: 중앙 에러 핸들러 사용 — 라우트에서 try/catch + res.status 직접 호출 금지",
        "// ADR-0001: strict mode 통과 확인됨",
        "// ADR-0002: ESM 전환 완료",
        "",
        "export type ErrorCode =",
        "  | \"VALIDATION_FAILED\"",
      ],
      marker: 1,
    },
    {
      path: "src/schema/user.ts", line: 2,
      snippet: [
        "// ADR-0003: Zod 스키마 — 런타임 검증 필수",
        "// ADR-0001: strict mode 통과 확인됨",
        "// ADR-0002: ESM 전환 완료",
        "import { z } from \"zod\";",
      ],
      marker: 1,
    },
    {
      path: "src/auth/user-service.ts", line: 1,
      snippet: [
        "// ADR-0001: strict mode 통과 확인됨",
        "// ADR-0002: ESM 전환 완료",
        "// ADR-0003: Zod 타입 (UserCreate) single source of truth",
        "import type { UserCreate } from \"../schema/user.js\";",
      ],
      marker: 0,
    },
    {
      path: "tsconfig.json", line: 5,
      snippet: [
        "  \"compilerOptions\": {",
        "    \"target\": \"ES2022\",",
        "    \"module\": \"ESNext\",",
        "    \"moduleResolution\": \"Bundler\",",
        "    \"strict\": true,",
        "    \"noImplicitAny\": true,",
        "    \"strictNullChecks\": true,",
      ],
      marker: 4,
      note: "ADR-0001 의 컴파일러 옵션 8개가 모두 반영됨",
    },
  ],
  2: [
    {
      path: "package.json", line: 5,
      snippet: [
        "  \"name\": \"mock-app\",",
        "  \"version\": \"0.1.0\",",
        "  \"private\": true,",
        "  \"type\": \"module\",",
        "  \"scripts\": {",
      ],
      marker: 3,
      note: "ADR-0002 핵심 변경 — \"type\": \"module\"",
    },
    {
      path: "src/utils/paths.ts", line: 1,
      snippet: [
        "// ADR-0002: ESM 전환 완료 — __dirname / __filename 대체 헬퍼",
        "// ADR-0001: strict mode 통과 확인됨",
        "import { fileURLToPath } from \"node:url\";",
        "import { dirname } from \"node:path\";",
        "",
        "export function dirnameOf(metaUrl: string): string {",
        "  return dirname(fileURLToPath(metaUrl));",
        "}",
      ],
      marker: 0,
    },
    {
      path: "src/api/routes/users.ts", line: 4,
      snippet: [
        "// ADR-0005: 중앙 에러 핸들러 사용 — try/catch 직접 금지",
        "// ADR-0001: strict mode 통과 확인됨",
        "// ADR-0002: ESM 전환 완료",
        "import { Router } from \"express\";",
        "import { UserCreateSchema } from \"../../schema/user.js\";",
      ],
      marker: 2,
      note: "import 경로 끝의 명시적 .js 확장자 (ESM 규칙)",
    },
  ],
  3: [
    {
      path: "src/schema/user.ts", line: 1,
      snippet: [
        "// ADR-0003: Zod 스키마 — 런타임 검증 필수",
        "// ADR-0001: strict mode 통과 확인됨",
        "// ADR-0002: ESM 전환 완료",
        "import { z } from \"zod\";",
        "",
        "export const UserCreateSchema = z.object({",
        "  email: z.string().email(\"올바른 이메일 형식이어야 합니다\"),",
        "  password: z.string().min(8, \"비밀번호는 최소 8자 이상\"),",
        "  displayName: z.string().min(1).max(40),",
        "  acceptedTerms: z.literal(true, {",
      ],
      marker: 0,
    },
    {
      path: "src/schema/env.ts", line: 1,
      snippet: [
        "// ADR-0003: Zod 스키마 — 런타임 검증 필수 (환경변수도 부팅 시 parse)",
        "// ADR-0001: strict mode 통과 확인됨",
        "import { z } from \"zod\";",
        "",
        "const EnvSchema = z.object({",
        "  NODE_ENV: z.enum([\"development\", \"staging\", \"production\"]),",
        "  PORT: z.coerce.number().int().positive().default(3000),",
      ],
      marker: 0,
    },
    {
      path: "src/api/routes/users.ts", line: 17,
      snippet: [
        "  asyncHandler(async (req, res) => {",
        "    // ADR-0003: 수동 검증 50줄 → Zod parse 1줄",
        "    const input = UserCreateSchema.parse(req.body);",
        "",
        "    const existing = await findUserById(input.email);",
      ],
      marker: 1,
    },
  ],
  4: [
    {
      path: "vitest.config.ts", line: 1,
      snippet: [
        "// ADR-0004: Vitest 마이그레이션 완료 — Jest 의존성 제거됨",
        "import { defineConfig } from \"vitest/config\";",
        "",
        "export default defineConfig({",
        "  test: {",
        "    globals: true,",
        "    environment: \"node\",",
        "    include: [\"tests/**/*.test.ts\"],",
      ],
      marker: 0,
    },
    {
      path: "tests/user.test.ts", line: 1,
      snippet: [
        "// ADR-0004: Vitest 마이그레이션 완료 — 이전엔 jest.mock, 지금은 vi.mock",
        "// ADR-0003: 스키마 단위 테스트",
        "// ADR-0001: strict mode 통과 확인됨",
        "import { describe, it, expect, vi } from \"vitest\";",
        "import { UserCreateSchema } from \"../src/schema/user.js\";",
      ],
      marker: 0,
    },
  ],
  5: [
    {
      path: "src/utils/errors.ts", line: 1,
      snippet: [
        "// ADR-0005: 중앙 에러 핸들러 사용 — 라우트에서 try/catch + res.status 직접 호출 금지",
        "// ADR-0001: strict mode 통과 확인됨",
        "// ADR-0002: ESM 전환 완료",
        "",
        "export type ErrorCode =",
        "  | \"VALIDATION_FAILED\"",
        "  | \"UNAUTHORIZED\"",
        "  | \"FORBIDDEN\"",
        "  | \"NOT_FOUND\"",
        "  | \"CONFLICT\"",
        "  | \"INTERNAL\";",
      ],
      marker: 0,
    },
    {
      path: "src/api/middleware/error-handler.ts", line: 1,
      snippet: [
        "// ADR-0005: 중앙 에러 핸들러 — 모든 라우트 에러는 여기를 거친다",
        "// ADR-0003: ZodError → ValidationError 변환 규칙 적용",
        "// ADR-0001: strict mode 통과 확인됨",
        "// ADR-0002: ESM 전환 완료",
        "import type { Request, Response, NextFunction } from \"express\";",
        "import { ZodError } from \"zod\";",
        "import { AppError, ValidationError } from \"../../utils/errors.js\";",
      ],
      marker: 0,
    },
    {
      path: "src/api/routes/users.ts", line: 22,
      snippet: [
        "    if (existing) {",
        "      // ADR-0005: throw 만 하면 중앙 핸들러가 처리",
        "      throw new ConflictError(\"이미 가입된 이메일입니다\");",
        "    }",
      ],
      marker: 1,
    },
    {
      path: "src/api/app.ts", line: 16,
      snippet: [
        "app.use(\"/users\", usersRouter);",
        "",
        "// 반드시 마지막 — ADR-0005",
        "app.use(errorHandler);",
      ],
      marker: 2,
    },
  ],
};

// ============================================================================
// 2. AGENT LOOP 시뮬레이션 — 4 단계, 단계별 로그 수집
//    이 함수가 "internal LLM call" 을 흉내낸다. main agent (사용자 화면) 는
//    최종 산출 (`render()` 결과) 만 본다 — 중간 토큰은 trace 토글 안에 격리.
// ============================================================================

const TRACE = []; // {step, tag, title, log[]}

function logStep(step, tag, title, lines) {
  TRACE.push({ step, tag, title, log: lines });
  // 개발자 콘솔에도 동일 출력 — parent context 격리 검증용
  console.groupCollapsed(`%c[agent-loop ${step}] ${title}`, "color:#58a6ff;font-weight:600");
  for (const ln of lines) console.log(ln);
  console.groupEnd();
}

function runAgentLoop(query) {
  console.log(`%c[main-agent] query 수신: "${query}"`, "color:#e3b341;font-weight:600");
  console.log("%c[main-agent] → 큐레이션 위임. 이후 단계는 internal context 에서 진행.", "color:#8b96a3");

  // ---- 1. Discovery (rule-based, instant) -------------------------------
  const idMatch = query.match(/ADR\s*(\d+)\s*[~\-]\s*(\d+)/i);
  let candidateIds = [];
  if (idMatch) {
    const [a, b] = [parseInt(idMatch[1], 10), parseInt(idMatch[2], 10)];
    for (let i = a; i <= b; i++) candidateIds.push(i);
  } else {
    candidateIds = ADR_INDEX.map((a) => a.id);
  }
  const discovered = ADR_INDEX.filter((a) => candidateIds.includes(a.id));

  logStep(1, "discovery", "Discovery — ADR id 매칭 (rule-based)", [
    `query 패턴: "ADR N ~ M" 매칭됨 → range [${candidateIds[0]} .. ${candidateIds[candidateIds.length - 1]}]`,
    `전체 ADR 50개 중 매칭: ${discovered.length}개`,
    `매칭 id: ${discovered.map((a) => a.id).join(", ")}`,
    `소요: ~3ms (단순 정규식)`,
    `* 이 단계에선 LLM call 없음 — hard cut 도 없음. 다음 단계가 evaluate 한다.`,
  ]);

  // ---- 2. Evaluation (LLM call 시뮬레이션) -----------------------------
  const evaluated = discovered.map((a) => {
    const ds = DECISION_SUMMARIES[a.id];
    return {
      ...a,
      decisionSummary: ds?.summary ?? "(이 ADR 은 코드 영향 없음 — 운영/도구 결정)",
      hasImpact: !!ds,
    };
  });
  const withImpact = evaluated.filter((a) => a.hasImpact);

  logStep(2, "evaluate", "Evaluation — Decision section LLM 추출 + 영향도 판단", [
    `[internal-llm-call] system: "각 ADR 의 ## Decision 섹션을 50자 이내로 요약하라. 또한 코드 변경을 동반하는지 판단하라."`,
    `[internal-llm-call] input: 5 ADR full markdown (~12k tokens)`,
    `[internal-llm-call] output: 5 summaries + impact flags`,
    `평가 결과:`,
    ...evaluated.map((a) => `  - ADR-${String(a.id).padStart(4, "0")} (${a.title}) → impact=${a.hasImpact}`),
    `→ ${withImpact.length}/${evaluated.length} 가 코드 영향 있음. 충분한가? LLM 자체 평가...`,
    `[internal-llm-call] judge: "5개 중 5개 모두 impact 있고, 사용자가 명시한 ADR 1~5 범위와 정확히 일치. 추가 탐색 불필요."`,
    `→ 결정: cross-ref 단계로 진행`,
  ]);

  // ---- 3. Cross-ref (코드 grep 시뮬레이션) -----------------------------
  const crossRefs = {};
  let totalLocs = 0;
  for (const a of withImpact) {
    const refs = CROSS_REF[a.id] ?? [];
    crossRefs[a.id] = refs;
    totalLocs += refs.length;
  }

  logStep(3, "crossref", "Cross-ref — 코드 grep (마커 주석 + import 패턴)", [
    `grep 패턴: /ADR-(0001|0002|0003|0004|0005)/ across src/**, tests/**, *.json, *.ts`,
    `총 매칭 코드 위치: ${totalLocs}개`,
    ...withImpact.map(
      (a) => `  ADR-${String(a.id).padStart(4, "0")}: ${crossRefs[a.id].length}곳`
    ),
    `[internal-llm-call] judge: "각 ADR 당 평균 ${(totalLocs / withImpact.length).toFixed(1)}곳 — 대표 예시로 충분. 추가 탐색 (e.g. semantic search) 불필요."`,
    `→ 결정: curation 단계로 진행`,
  ]);

  // ---- 4. Curation (인터랙티브 HTML 데이터 구조 빌드) -------------------
  const cards = withImpact.map((a) => ({
    id: a.id,
    title: a.title,
    status: a.status,
    date: a.date,
    related: a.related,
    decisionSummary: a.decisionSummary,
    promptHint: DECISION_SUMMARIES[a.id].promptHint,
    locations: crossRefs[a.id] ?? [],
  }));

  logStep(4, "curate", "Curation — 인터랙티브 HTML 데이터 모델 빌드", [
    `카드 수: ${cards.length}`,
    `각 카드: { id, title, decision summary, copy-as-prompt hint, locations[] }`,
    `hover detail: status, date, related ADR`,
    `[internal-llm-call] format: "카드 펼침 시 코드 스니펫에 마커 라인 하이라이트. 사용자가 click 으로 cut-off 조작 가능 (펼침/접힘)."`,
    `→ main agent 컨텍스트에는 이 cards[] 만 노출 (전체 ADR markdown ~12k tokens 는 격리됨)`,
  ]);

  console.log("%c[main-agent] ← 큐레이션 완료. 받은 토큰: 약 1.2k (전체 입력 ~15k 의 8%)", "color:#56d364;font-weight:600");
  return { query, cards };
}

// ============================================================================
// 3. RENDERING
// ============================================================================

function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null || c === false) continue;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return e;
}

function renderTrace() {
  const body = el("div", { class: "trace-body" });
  for (const step of TRACE) {
    const logLines = step.log
      .map((ln) => {
        return ln
          .replace(/(\[[^\]]+\])/g, '<span class="k">$1</span>')
          .replace(/(→|✓|✗)/g, '<span class="v">$1</span>')
          .replace(/(\*[^*]+\*)/g, '<span class="dim">$1</span>');
      })
      .join("\n");
    body.appendChild(
      el("div", { class: "step" }, [
        el("div", { class: "step-head" }, [
          el("span", { class: "step-num" }, [`${step.step}.`]),
          step.tag,
          el("span", { class: "step-tag" }, [step.tag]),
        ]),
        el("div", { class: "step-title" }, [step.title]),
        el("pre", { class: "step-log", html: logLines }),
      ])
    );
  }
  const det = el("details", { class: "trace" }, [
    el("summary", {}, [
      "agent loop trace",
      el("span", { class: "badge" }, [`${TRACE.length} steps`]),
      el("span", { class: "ctx-note" }, ["★ 이 안의 모든 토큰은 main context 에 안 잡힘"]),
    ]),
    body,
  ]);
  return det;
}

function renderCodeLoc(loc) {
  const snippetLines = loc.snippet
    .map((ln, idx) => {
      const isMarker = idx === loc.marker;
      const lineNum = loc.line + idx;
      const cls = isMarker ? "marker" : "";
      return `<span class="ln">${lineNum}</span><span class="${cls}">${escapeHtml(ln)}</span>`;
    })
    .join("\n");
  return el("div", { class: "code-loc" }, [
    el("div", { class: "code-loc-head" }, [
      el("span", { class: "code-loc-path" }, [loc.path]),
      el("span", { class: "code-loc-line" }, [
        loc.note ? `${loc.note} · ` : "",
        `L${loc.line}`,
      ]),
    ]),
    el("pre", { class: "code-loc-snippet", html: snippetLines }),
  ]);
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderCard(card) {
  const idStr = `ADR-${String(card.id).padStart(4, "0")}`;
  const relatedText = card.related.length
    ? card.related.map((r) => `ADR-${String(r).padStart(4, "0")}`).join(", ")
    : "(없음)";

  const detail = el("div", { class: "card-detail" }, [
    el("div", { class: "row" }, [
      el("span", { class: "lbl" }, ["status"]),
      el("span", { class: "val status-accepted" }, [card.status]),
    ]),
    el("div", { class: "row" }, [
      el("span", { class: "lbl" }, ["date"]),
      el("span", { class: "val" }, [card.date]),
    ]),
    el("div", { class: "row" }, [
      el("span", { class: "lbl" }, ["related"]),
      el("span", { class: "val" }, [relatedText]),
    ]),
    el("div", { class: "row" }, [
      el("span", { class: "lbl" }, ["impact"]),
      el("span", { class: "val" }, [`${card.locations.length} 개 코드 위치`]),
    ]),
  ]);

  const copyBtn = el("button", {
    class: "copy-btn",
    title: "copy-as-prompt — 클립보드에 복사",
  }, ["copy-as-prompt"]);
  copyBtn.addEventListener("click", async (ev) => {
    ev.stopPropagation();
    const prompt = `# ${idStr} — ${card.title}\n\n` +
      `## Decision (요약)\n${card.decisionSummary}\n\n` +
      `## 영향 받은 코드 위치 (${card.locations.length}곳)\n` +
      card.locations.map((l) => `- ${l.path}:L${l.line}${l.note ? ` — ${l.note}` : ""}`).join("\n") +
      `\n\n## 후속 작업\n${card.promptHint}`;
    try {
      await navigator.clipboard.writeText(prompt);
      copyBtn.textContent = "✓ copied";
      copyBtn.classList.add("ok");
      setTimeout(() => {
        copyBtn.textContent = "copy-as-prompt";
        copyBtn.classList.remove("ok");
      }, 1600);
    } catch {
      copyBtn.textContent = "clipboard 실패 (HTTPS 필요)";
      setTimeout(() => (copyBtn.textContent = "copy-as-prompt"), 2200);
    }
  });

  const head = el("div", { class: "card-head" }, [
    el("span", { class: "toggle" }, ["▸"]),
    el("div", { class: "main" }, [
      el("div", { class: "card-id" }, [idStr]),
      el("div", { class: "card-title" }, [card.title]),
      el("div", { class: "card-summary" }, [card.decisionSummary]),
    ]),
    el("div", { class: "card-actions" }, [
      copyBtn,
      el("span", { class: "code-count" }, [`${card.locations.length} locs ▾`]),
    ]),
    detail,
  ]);

  const codeList = el("div", { class: "code-list" },
    card.locations.map(renderCodeLoc)
  );

  const cardEl = el("div", { class: "card" }, [head, codeList]);
  head.addEventListener("click", () => cardEl.classList.toggle("open"));
  return cardEl;
}

function render(result) {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const header = el("header", { class: "app-header" }, [
    el("div", { class: "crumbs" }, ["prototype-b2 / case-a — ADR cross-ref"]),
    el("h1", { class: "query" }, [
      el("span", { class: "query-prefix" }, ["쿼리:"]),
      el("span", { class: "query-text" }, [result.query]),
    ]),
    el("div", { class: "meta-line" }, [
      el("span", {}, [
        el("strong", {}, [String(result.cards.length)]),
        " 개 ADR 큐레이션됨",
      ]),
      el("span", { class: "dot" }, ["·"]),
      el("span", {}, [
        "총 ",
        el("strong", {}, [String(result.cards.reduce((s, c) => s + c.locations.length, 0))]),
        " 곳 코드 영향",
      ]),
      el("span", { class: "dot" }, ["·"]),
      el("span", {}, ["탐색 대상: ", el("strong", {}, ["50 ADR"]), " + 13 src 파일"]),
    ]),
  ]);

  const trace = renderTrace();

  const cardsHeader = el("div", { class: "cards-header" }, [
    el("h2", {}, ["큐레이션된 ADR (펼쳐서 코드 위치 확인)"]),
    el("span", { class: "count" }, [`${result.cards.length} cards`]),
  ]);

  const cards = result.cards.map(renderCard);

  const foot = el("div", { class: "foot" }, [
    "★ trace 토글을 펼쳐서 단계별 internal log 확인 가능. ",
    "main agent context 는 이 카드 데이터 (~1.2k tokens) 만 본다 — ",
    "전체 50 ADR markdown (~15k) 은 격리됨. ",
    el("br"),
    "★ copy-as-prompt 는 클립보드 권한 필요 (file:// 에서는 실패 가능 — http 서버 또는 https 필요).",
  ]);

  root.append(header, trace, cardsHeader, ...cards, foot);
}

// ============================================================================
// 4. ENTRY
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const query = "ADR 1~5 결정으로 코드 변한 곳 HTML 로 보여줘";
  const result = runAgentLoop(query);
  render(result);
});
