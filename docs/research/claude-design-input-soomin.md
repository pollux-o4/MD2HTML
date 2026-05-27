---
id: claude-design-input-soomin
type: persona-input-draft
persona: Soomin Park (Senior Dev-Tool UX/UI Designer, 14yr)
status: draft
updated: 2026-05-27
sources:
  - md-show-me-prd.md
  - persona-evaluation-nadia-park.md
  - thariq-templates-analysis.md
  - assets/base.css (현재 임시 디자인)
---

# Claude Design 입력안 — Soomin 의 작성 + 검토 노트

## 1. 인사 + 도구 정체성 정리

안녕, 박수민이다. 14년 동안 dev tool surface 만 팠다 — 카카오엔터프라이즈 design system, Toss Frontend Platform, 지금은 AI/dev tool. 이번에 본 도구 `md-show-me` 는 *세 줄로 정리*하면 이렇다.

- **본질**: `/show-me <쿼리>` 한 줄 → repo Markdown discovery → 쿼리 형태에 맞춘 *인터랙티브 HTML* 큐레이션.
- **사용자**: 한/영 혼용 노트를 가진 개발자. file:// 더블클릭으로 본다 (서버 없음).
- **약속**: Markdown = source of truth, HTML = 사용자 대상 소비 레이어. zero install / zero network, 인라인 CSS/SVG, CDN 은 per-library opt-in.

톤은 **차분한 신뢰 (Linear) + 엔지니어 친화 (모노스페이스 메타) + 약간의 인터랙티브 plyfulness** 의 교집합. 화려한 SaaS 톤도, 학술 markdown 톤도 아니다. *내가 만든 게 아니라 LLM 이 매번 다시 만든다는 점* 을 디자인 결정의 출발점으로 잡는다 — 즉 *간결한 토큰 + 명확한 primitive 몇 개* 만 주면 LLM 이 풍성하게 조합할 수 있도록.

## 2. Claude Design 4 필드 — paste-ready

### 1) Company name and blurb

```
md-show-me — Markdown discovery + 쿼리 형태 인터랙티브 HTML 큐레이션 도구.
`/show-me <query>` 한 줄로 repo 안의 .md 후보를 LLM 이 자동 큐레이션하고,
쿼리 형태에 맞춰 인터랙티브 HTML 한 페이지로 렌더한다.
Markdown 은 source of truth, HTML 은 매번 다시 만드는 소비 레이어.
zero install / zero network / 인라인 only.
```

### 2) Link code on GitHub

```
권장: 없음. 또는 PRD repo (docs/md-show-me-prd.md) 만 share.
이유: skill 자체는 prompt 자산 + 템플릿 라이브러리라서 "코드 보고 톤 추출" 의 시그널이 약함.
디자인 시그널은 §4 의 base.css 와 PRD 의 베이스라인 3 패턴이 더 강하다.
```

### 3) Add fonts, logos and assets

```
- 로고: 없음 (도구 자체가 아직 비주얼 아이덴티티 미정).
  Wordmark 후보 = `md-show-me` (lowercase, monospace 톤).
  로고 대신 favicon-level emoji 만 — 📂 또는 🔎.
- 폰트: 시스템 폰트 stack (이미 base.css 에 박힘).
  - sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", "Apple SD Gothic Neo"
  - mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas
  - 한글: Noto Sans KR / Apple SD Gothic Neo 강제. Pretendard 도 후보지만 zero-network 제약 때문에 *시스템 fallback 만* 으로 정착.
- 첨부 자료: base.css (인라인용 토큰 셋), PRD 의 베이스라인 3 패턴 설명.
```

### 4) Any other notes — 핵심 (1000~1500자)

```
[디자인 톤]
Linear 의 차분 + Vercel Geist 의 절제 + GitHub Primer 의 information density 의 교집합.
화려한 gradient, 큰 hero, marketing illustration 금지.
모든 페이지는 file:// 로 열리는 한 파일이고, 사용자는 "노트 읽으러" 온 상태다.

[색상 — 인라인 토큰으로 박을 것]
- 배경: #fafafa  / 카드 표면: #ffffff  / 경계: #e5e7eb
- 본문: #1f2937  / 보조 텍스트: #6b7280
- 액센트: #2563eb (blue-600) + #dbeafe (soft)
- 상태 4종: success #15803d / warning #ca8a04 / danger #b91c1c / info = 액센트와 동일
- 다크모드: v1 에는 안 한다 (file:// 단일 파일 × 토글 비용 > 가치). v2 검토.

[타이포 — 한/영 혼용 필수]
- 본문 sans: 시스템 폰트 stack. 한글은 "Noto Sans KR", "Apple SD Gothic Neo" 명시. weight 400 / 600 두 종만.
- 모노: ui-monospace, SFMono-Regular. 코드 / 쿼리 / 메타 정보 (citation path, badge) 에 사용.
- 기본 size: 15px / line-height 1.6. 한글 가독성 위해 절대 14px 이하로 내리지 말 것.
- 한글 자간 (letter-spacing) 0 유지. -0.01em 같은 미세 negative 도 Noto Sans KR 에서는 자형 충돌.
- heading: h1 1.75rem / h2 1.35rem + 1px border-bottom / h3 1.1rem + muted color.
  *영문 sans-serif 가 가진 sharpness 와 한글 Noto Sans KR 의 부드러움이 weight 600 에서 가장 안정.*

[Spacing / Radius / Shadow]
- 8px grid. 카드 padding 18~20px. 섹션 간 32px.
- radius 8px (카드/배너) / 4px (작은 chip/code). 10px+ 의 round 는 SaaS 톤이라 금지.
- shadow: 0 1px 2px rgba(0,0,0,0.05) 의 매우 얕은 것만. drop-shadow 강조 금지.

[고유 패턴 — 베이스라인 3 (모든 페이지 자동 포함)]
1. Citation answer card (N1) — 본문 카드 + horizontal source strip + follow-up chips.
   답변과 source 가 같은 시선 안에 들어와야 함. source 는 카드 하단 별도 줄, 아이콘 1개 + 파일명 monospace.
2. Source-of-truth back-link badge (N+5) — 모든 인용 옆 작은 monospace 배지.
   `→ ADR-0003.md#decision` 식. font-size 11px, padding 2px 8px, radius 10px, 액센트 soft 배경.
   "MD = source of truth" 약속을 *시각적으로* 박는 단 하나의 요소.
3. Copy-as-prompt overlay (N+4) — 모든 인터랙티브 요소 옆 [Copy] [Save] 두 버튼.
   ghost button 톤 (배경 white, border #e5e7eb, hover 시 액센트 색만). 절대 primary 색으로 채우지 말 것.
   toast = 검정 배경 흰 글자, 하단 중앙, 0.25s ease in/out.

[인터랙션 원칙]
- 인터랙션은 *눈에 안 띄지만 항상 있음* (Tangle 톤). hover 가 사용자에게 "여기 만질 수 있어" 라고 속삭이는 정도.
- 애니메이션은 0.15~0.25s ease 만. spring / bounce 금지.
- 클릭 affordance 는 border-bottom dotted → solid 같은 *경계의 변화* 로. 색 깜빡임 금지.

[정보 구조 — 시각 미학과의 균형]
- 본문 폭 max-width 920px. 그 이상은 한글 readability 깨짐.
- 카드 안 정보는 *3 단계 시각 우선순위*: (1) 제목 1.05rem 600, (2) 본문 15px 400, (3) 메타 13px muted.
- 표는 zebra 금지, border-bottom 1px 만. 한글 표는 cell padding 12px 이상.

[제약 반영]
- 모든 CSS / JS / SVG 는 인라인. 외부 폰트 호출 0, 외부 이미지 호출 0.
- CDN 라이브러리 (Tailwind, Vega-Lite, ECharts, Mermaid) 는 *사용자가 허용한 경우만* 추가.
  → 즉 baseline 디자인은 vanilla 만으로 완결되어야 한다.
- print-friendly: @media print 에서 overlay / toast 숨김, shadow 제거.

[LLM 에게 자유 주는 영역]
위 토큰과 베이스라인 3 패턴 외의 모든 layout / 패턴 (vault graph, timeline, kanban, diff 등) 은
LLM 이 쿼리 형태 보고 자유 조합. 단 토큰은 항상 위 팔레트 안에서.
적게 명세하고 풍성하게 만들도록 — 그게 이 도구의 작동 원리다.
```

## 3. 자기 비평 + 사용자 검토 권장 사항

내가 쓴 거 검토해보면, *구체 결정* 으로 번역된 항목 (hex, px, rem, 폰트 stack, 베이스라인 3) 은 충분히 박혔다. 단 *아래 4개* 는 사용자가 확인해줘야 LLM 출력이 흔들리지 않는다.

- **로고 부재의 위험**. wordmark 만으로 가는 게 톤은 맞는데, Claude Design 의 "흥미로운 시각 자산 제안" 능력을 활용 못 한다. *간단한 wordmark + 단 한 개의 시그니처 아이콘* (예: 폴더 + 돋보기 합성 글리프) 하나만 생성 요청해도 정체성이 단단해진다 — 결정 필요.
- **다크모드 v1 스킵 결정**. file:// 단일 파일이라 토글 cost 가 있지만, 개발자 타겟이라 "다크모드 없음 = 어색" 시그널도 큼. v1 에 `prefers-color-scheme: dark` *자동 감지만* 넣고 토글 UI 는 생략하는 절충안도 가능 — 결정 필요.
- **한글 폰트 시스템 fallback only 결정**. Pretendard 가 한/영 혼용에서 압도적으로 좋지만 zero-network 와 충돌. *로컬 설치된 경우만 사용하도록 stack 앞쪽에 넣는 것* (Pretendard, "Noto Sans KR", ...) 은 비용 0 — 추가 권장.
- **인터랙티브 plyfulness 의 정도**. 내 초안은 "눈에 안 띄지만 항상 있음" 톤인데, Thariq 톤은 좀 더 *과감한* 인터랙션이다 (drag, slider, live re-render). 우리 도구가 어느 쪽인지 — *차분 default + 인터랙티브는 LLM 판단으로 옵션* 인가, *인터랙티브 first* 인가 — 사용자 결정 필요.

검토 권장: 위 4개에 답을 주면 §2-4 "Any other notes" 를 1~2줄 추가 / 수정해서 최종화하겠다.

## 4. 외부 조사 의존 부분

다른 agent 가 *현존 dev tool design system* (Linear / Vercel Geist / GitHub Primer / Stripe / Radix 등) 의 토큰 / 패턴을 조사 중이라면, 결과를 받아 다음을 흡수한다.

- **토큰 비교 표** — 위 §2-4 의 색/spacing 값을 *어느 시스템과 가장 닮았는지* 검증. 너무 닮으면 차별성 약하고, 너무 다르면 dev 사용자 학습 비용 큼. *Linear 의 절제 + Primer 의 정보 밀도* 의 중간지대가 목표.
- **베이스라인 3 패턴의 외부 reference** — citation card, back-link badge, copy-as-prompt overlay 각각의 best-in-class 사례 (Perplexity, Obsidian, GitHub) 디테일 (배지 padding, copy toast 위치 등). 우리 토큰에 맞춰 재구현.
- **한/영 혼용 dev tool 사례** — Toss / 당근 / 네이버 클로바 등의 *한글 dev docs* 가 어떤 폰트/자간/line-height 를 쓰는지. 내가 추측한 15px / 1.6 / weight 600 이 한국 dev 컨텍스트에서 *이미 검증된 값* 인지 cross-check.
- **CDN 옵션 라이브러리의 디자인 톤 호환성** — Vega-Lite / ECharts / Mermaid 의 default 톤이 우리 팔레트와 충돌하지 않는지. 충돌하면 spec 출력 시 *우리 토큰 override snippet* 을 LLM 가이드에 추가해야 함.

조사 결과가 오면 *§2-4 의 "Any other notes" 를 한 번 더 다듬어* 토큰 값과 패턴 디테일을 cross-check 한 버전으로 finalize 한다.

— Soomin
