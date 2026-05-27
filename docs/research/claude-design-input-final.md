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
https://github.com/pollux-o4/MD2HTML

이 repo 안에서 특히 다음 파일을 참고:
- docs/md-show-me-prd.md (PRD 21 결정 + 5 제약, 도구 본질)
- docs/research/user-discovery/synthesis-final.md (사용자 페르소나 + 학술 종합)
- docs/research/claude-design-input-final.md (이 문서, §2 필드 4 의 토큰 / 패턴 명세)
- skills/show-me/SKILL.md (실제 도구 동작)

코드 자체보다 위 문서들이 디자인 시그널 (정체성 / 사용자 / 톤) 강함.
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

[색 — 5개 조사 종합 결과. 3가지 안 + 1순위 권장]
조사 5종: 학술 (Mehta & Zhu 2009 RCT 등) + dev tool 시장 (Linear/Geist/Primer/Cursor/Claude.ai) + 8색 심리·장시간 시청 (60-30-10 무채색 기반 + cool accent) + 학습·노트·AI 도구 15개 벤치마크 (Obsidian/Notion/Bear/ChatGPT/Claude.ai/Perplexity 등) + 접근성 (WCAG + 색맹 + 한국 문화)
1순위 권장 = **안 2 (Warm Hybrid, 따뜻한 혼합)** — 5개 조사 중 4개와 호환. 학술·접근성·한국 문화 = 파랑 본문, dev tool·Claude.ai 차별화 = copper brand·hover·인용 띠.

[안 1 — Cool Blue 단일 (차가운 파랑 단일, 안전·학술)]
라이트: 배경 #FAFAF9 / 카드 #FFFFFF / 경계 #C7C6C2 / 본문 #1F1F1F / 보조 #6B6B6B
       강조 main #0969DA / 강조 sub #0550AE / 강조 연한 #DDF4FF
       success #1A7F37 / warning #9A6700 / danger #CF222E / info = 강조 main
다크: 배경 #1A1A1A / 카드 #242424 / 경계 #3A3A3A / 본문 #E8E8E8 / 보조 #A0A0A0
     강조 main #4A9EFF / 강조 sub #2F7FD9 / 강조 연한 #1C3A5E
     success #3FB950 / warning #D29922 / danger #F85149
트레이드오프: 안전·신뢰 최대. 차별화·Claude Code skill 정체성 약함.

[안 2 — Warm Hybrid (따뜻한 혼합, 1순위 권장)]
라이트: 배경 #F7F5F0 (따뜻한 무채색 약하게, warm-neutral) / 카드 #FDFCF8 / 경계 #C7C6C2 / 본문 #1F1F1F / 보조 #6B6B6B
       본문 강조·링크·상태 = 파랑 #0969DA / 강조 sub #0550AE / 강조 연한 #DDF4FF
       brand·hover·인용 띠 (비텍스트만) = copper #C96442 / brand 텍스트용 보정 = #B5573A
       success #1A7F37 / warning #9A6700 / danger #CF222E
다크: 배경 #1F1D1A / 카드 #2A2825 / 경계 #3D3A35 / 본문 #EDEAE3 / 보조 #A39E94
     강조 main #4A9EFF / brand 다크 #D97559 / brand 텍스트 다크 #E08866
     success #3FB950 / warning #D29922 / danger #F85149
트레이드오프: 정체성·안전·차별화 셋 다 적당히. 토큰 2계열 관리 부담.

[안 3 — Claude.ai 풀카피 (정체성 풀)]
라이트: 배경 #F0ECE0 (크림) / 카드 #F7F4EA / 경계 #C7C6C2 / 본문 #1F1F1F / 보조 #6B6B6B
       강조 main (보정) #B5573A / 강조 sub #A84E33 / 강조 연한 #F4DDD0
       success #1A7F37 / warning #9A6700 / danger #CF222E / info #0969DA
다크: 배경 #1F1D1A / 카드 #2A2825 / 경계 #3D3A35 / 본문 #EDEAE3 / 보조 #A39E94
     강조 main #E08866 / 강조 sub #D97559 / 강조 연한 #3A2620
트레이드오프: Anthropic 정통성 최대. Claude.ai 클론처럼 보일 위험. 상태 색·brand 색 적록 색맹 충돌 (아이콘 의무 강함).

[모든 안 공통 의무]
- 상태 색은 *항상 아이콘 동반* (success ✓ / warning △ / danger ✕) — 색맹 (적록 한국 남성 5%) 안전성 확보. 한국 접근성 지침 KWCAG 2.2 5.3.1 도 동일 요구.
- 강조 링크는 밑줄, 위험 버튼은 굵은 외곽선.
- *시각 학습자가 primary 이므로 색은 시각 위계 핵심 역할.* 텍스트 강조용 색 사용 자제, 위계·카테고리 구분에만.

[사용자가 진짜 결정할 분기점 2개]
1. Anthropic 정통성 vs 차별화·자체 정체성 — Claude Code skill 임을 색으로 즉시 알아봐야 하나? Yes → 안 3, No → 안 2 또는 1.
2. (안 2 선택 시) 배경 따뜻함 강도 — `#F7F5F0` (살짝 크림, Claude.ai 와 구분) vs `#F0ECE0` (Claude.ai 정통).

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
