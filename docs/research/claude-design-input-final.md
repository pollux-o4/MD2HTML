---
id: claude-design-input-final
type: paste-ready-final
status: ready
updated: 2026-05-27
sources:
  - claude-design-input-soomin.md
  - persona-h-leader-mode-vibe-coder.md
  - synthesis-final.md
  - md-show-me-prd.md
---

# Claude Design 입력안 — 최종 paste-ready

## 1. 한 줄 안내

아래 §2 의 필드 1~4 코드블록 내용을 **그대로 복사해서** Claude Design 의 해당 4 필드에 붙여 넣으세요. 추가 편집 없이 paste-ready.

## 2. 4 필드 paste-ready

### 필드 1) Company name and blurb

```
md-show-me — Markdown discovery + 쿼리 형태 인터랙티브 HTML 큐레이션 도구.
`/show-me <query>` 한 줄로 repo 안의 .md 후보를 LLM 이 자동 큐레이션,
쿼리 형태에 맞춰 인터랙티브 HTML 한 페이지로 렌더한다.
Markdown = source of truth (원본 진실), HTML = 매번 다시 만드는 소비 레이어.
v1 primary 사용자 = 비CS 풀스택 학습자 (도메인 지식 부족자도 큐레이션 결과로 의사결정 가능해야 함).
zero install / zero network / 인라인 only.
```

### 필드 2) Link code on GitHub

```
권장: 없음. 또는 PRD 만 share (docs/md-show-me-prd.md).
이유: 이 도구의 정체성 = prompt 자산 + 인터랙티브 HTML 큐레이션 레이어. 코드보다 prompt + 토큰이 디자인 시그널.
시각 시그널은 §4 의 토큰 (색 / 타이포 / 베이스라인 4 패턴) 에서 더 강하다.
```

### 필드 3) Add fonts, logos and assets

```
- 로고: wordmark only (md-show-me, lowercase, monospace 톤).
  + favicon-level emoji 1개 (폴더 + 돋보기 합성, 단 한 개) — Claude Design 에 시그니처 아이콘 1개 생성 요청.
- 폰트 stack:
  sans = "Pretendard Variable", "Pretendard", "Noto Sans KR", "Apple SD Gothic Neo",
         -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
         (Pretendard 는 로컬 설치 시에만 사용, 외부 다운로드 0)
  mono = ui-monospace, SFMono-Regular, "SF Mono", Consolas, "D2Coding", monospace
- 다크모드: `prefers-color-scheme: dark` 자동 감지만. 토글 UI 생략.
- 첨부 자료: 인라인용 토큰 셋 (§4 의 색 / 타이포 / spacing).
```

### 필드 4) Any other notes — 핵심

```
[톤]
Linear 의 절제 + Vercel Geist 의 절제 + GitHub Primer 의 information density (정보 밀도) 의 교집합.
화려한 gradient (그라데이션), 큰 hero, marketing illustration (마케팅 일러스트) 금지.
v1 primary 사용자 (비CS 풀스택 학습자, 박서윤) 는 *"노트 읽으러 온 상태"* 다.
SaaS marketing 톤도, 학술 markdown 톤도, 터미널 dump 톤도 아니다.

[색 — 인라인 토큰, 학술 + 시장 종합]
배경 #FAFAF9 (off-white, warm 극미. Piepenbrock 2013 positive polarity 우위) / 카드 #FFFFFF / 경계 #E5E5E3
본문 #1A1A1A (순흑 회피, halation 완화) / 보조 #6B6A67 (WCAG AA 4.8:1 통과)
상태색: success #1A7F37 / warning #9A6700 / danger #D1242F (Mehta & Zhu: 빨강 = 회피·정밀, 경고 정합)

[강조색 — 두 후보 다 살림. Claude Design 대화 중 사용자가 최종 선택]
후보 A — 파랑 #0969da (학술 권장. Mehta & Zhu 2009 Science RCT: 파랑 = 탐색·창의 정합. md-show-me 는 탐색·학습 도구. 단 Primer 와 같은 색 → 차별성 약함)
후보 B — copper #C96442 (시장 권장. Anthropic 톤 연결 + Linear/Primer 와 차별. 단 학술 권장 위배)
역할 분리 안 — 본문 강조·링크 = 파랑, brand·hover·citation 띠 = copper (둘 다 활용 가능)
강조 연한 — 후보 A 면 #E7F1FB, 후보 B 면 #F5E6DF (citation 카드 배경, 배지 muted)
*시각 학습자가 primary 이므로 색은 시각 위계의 핵심 역할.* 텍스트 강조용 색 사용은 자제, 위계 / 카테고리 구분에만.

[다크모드 토큰 — prefers-color-scheme: dark 자동 감지, 라이트와 warm 일관성 유지]
배경 #0F0F0E (warm near-black, 라이트 #FAFAF9 와 톤 일관) / 카드 #1A1A18 / 경계 #2E2D2A
본문 #ECEAE5 / 보조 #8E8C86
강조 다크 — 후보 A: #4493F8 (라이트 파랑 채도·명도 ↑) / 후보 B: #C96442 그대로 (copper 는 라이트·다크 동일 가능)
상태 다크: success #3FB950 / warning #D29922 / danger #F85149

[타이포 — 한/영 혼용]
sans = "Pretendard Variable", "Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", -apple-system, system
mono = ui-monospace, SFMono-Regular, Consolas, "D2Coding"
font-size base 15px / line-height 1.6 (한글 line-height 권장 안쪽)
letter-spacing 0 (한글 자형 충돌 방지 — 음수·양수 모두 금지)
weight 400 / 600 두 종만
heading 3단계: h1 1.75rem / h2 1.35rem + 1px border-bottom / h3 1.1rem muted
모노스페이스는 *semantic 용도만* (코드 / 경로 / 메타 / 인용 식별자). 본문에 절대 사용 금지.

[Spacing / Radius / Shadow]
8px grid. 카드 padding 18~20px. 섹션 32px.
radius 8px (카드/배너) / 4px (작은 chip/code). 10px+ round 금지 (SaaS 톤).
shadow 0 1px 2px rgba(0,0,0,0.05) 만. drop-shadow 강조 금지.

[기본 패턴 4 — 모든 페이지 자동 포함]
1. Citation answer card (인용 답변 카드)
   본문 답 + horizontal source strip (가로 출처 스트립) + follow-up chips.
   답변과 source 는 같은 시선 안에. source 는 카드 하단 monospace + 아이콘 1개.
2. Source-of-truth back-link badge (원본 역참조 배지)
   모든 인용 옆 monospace 배지. 예: `→ ADR-0003.md#decision`.
   font-size 11px, padding 2px 8px, radius 10px, 액센트 soft 배경.
   *MD = source of truth (원본 진실) 약속을 시각적으로 박는 단일 요소.*
3. Copy-as-prompt overlay
   모든 인터랙티브 요소 옆 [Copy] / [Save] ghost button.
   배경 white, border #e5e7eb, hover 시 액센트 색만. primary 색으로 절대 채움 금지.
   toast = 검정 배경 흰 글자, 하단 중앙, 0.25s ease.
4. 정보 위계 4단계 — 베스트셀러 / popular science 의 narrative arc
   (1) 주의 끌기 (lead) — 한 줄 결론 또는 도발적 질문, 페이지 첫 viewport.
   (2) 소개 (premise) — 이 답이 왜 필요한지 1~2문장, 맥락 다리.
   (3) 본문 (worked example) — 인용 카드 3~5개 (Cowan 4±1 chunk).
   (4) 적용 (transfer) — copy-as-prompt + 다음 질문 chip.
   이게 모든 page layout 의 *기본 순서*. 학생 / 비전공자도 흐름 따라가기 쉬움.

[인터랙션]
차분 default. hover = border-bottom dotted → solid (색 깜빡임 금지).
0.15~0.25s ease 만. spring / bounce 금지.
단 LLM 이 쿼리 형태 보고 *slider / drag / live re-render* 같은 과감한 인터랙션 추가는 OK (Tarik 톤).
모든 인터랙티브 요소에 copy-as-prompt 가 자동으로 따라붙음.

[정보 구조]
max-width 920px (한글 가독성 상한).
카드 안 3단계 시각 우선순위 — (1) 제목 1.05rem 600 / (2) 본문 15px 400 / (3) 메타 13px muted.
표는 zebra 금지, border-bottom 1px 만. 한글 cell padding 12px 이상.

[제약]
모든 CSS / JS / SVG 인라인. 외부 폰트 호출 0 (Pretendard 도 로컬 설치 시에만 사용).
CDN 라이브러리 (Tailwind, Vega-Lite, ECharts, Mermaid) 는 *사용자가 명시 허용한 경우만*.
print-friendly: @media print 에서 overlay / toast 숨김, shadow 제거.

[AI 답 톤 차단 룰 — HTML 본문 항상 적용]
1. 영어 단어 음차 무분별 섞기 금지 — "baseline", "context", "trace", "framework" 같은 대체 가능한 일반어는 한글로 풀이. 대체 불가 전문 용어만 원어 유지 + 한글 풀이 병기.
2. 어려운 한자어 남발 금지 — "당사는 / 본 도구는 / 수행하다 / 활용하다 / 구현하다" → "저희가 / 이 도구는 / 한다 / 쓴다 / 만든다".
3. 번역체 종결어미 금지 — "~에 의해 / ~되어집니다 / ~이라 하지 않을 수 없다" 금지. "~할 수 있어요 / ~돼요" 자연 한국어.
4. em dash (—) 한 단락당 1개 이내. 콤마·괄호로 대체 가능하면 대체.
5. 지식의 저주 (curse of knowledge) 차단 — 전문 용어 첫 등장 시 1줄 한글 풀이 의무 (괄호 또는 hover). 같은 페이지 안 재등장 시 풀이 생략.

[LLM 자유 영역]
위 토큰 + 기본 패턴 4 외 모든 layout (vault graph, timeline, kanban, diff 등) 은 LLM 이 쿼리 형태 보고 자유 조합.
단 색은 항상 위 팔레트 안에서, 타이포는 항상 위 stack 으로.
적게 명세 + 풍성하게 만들기 — 이게 도구 작동 원리.
```

## 3. 결정 메모 — Soomin §3 의 4개 검토 권장 사항 + 강조색

0. **강조색 (accent)** → **보류**. 두 후보 (파랑 #0969da 학술 / copper #C96442 시장) 모두 §2 필드 4 에 명시. Claude Design 과 대화하면서 사용자가 결과 보고 최종 선택. 역할 분리 안 (본문 강조 = 파랑, brand·citation 띠 = copper) 도 검토 대상. 근거: 학술 (Mehta & Zhu 2009 *Science* RCT) 은 탐색 도구 = 파랑 권장, 시장 분석 (`dev-tool-design-systems.md`) 은 Anthropic 톤 연결 = copper 권장. 두 권장 충돌.

1. **로고 부재의 위험** → **wordmark + favicon-level emoji 1개 (폴더 + 돋보기 합성) 생성 요청** 으로 결정. Claude Design 의 시각 자산 제안 능력 활용.
2. **다크모드 v1 스킵** → **`prefers-color-scheme: dark` 자동 감지만, 토글 UI 생략** 으로 절충. 다크 토큰 셋도 함께 명세.
3. **한글 폰트 대체용 (fallback) 만** → **Pretendard 를 stack (폰트 후보 목록) 맨 앞에 (로컬 설치 시에만 사용, 외부 다운로드 0)** 로 결정. 비용 0, 가독성 ↑.
4. **인터랙티브 발랄함 (playfulness) 정도** → **차분 기본값 (default) + 과감한 인터랙션은 LLM 이 쿼리 보고 옵션** 으로 결정. 베이스라인 (baseline, 기본 동작) 은 차분, 쿼리 형태가 요구하면 slider / drag / live re-render OK.
