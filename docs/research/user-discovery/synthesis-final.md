---
id: synthesis-final
type: synthesis
generated: 2026-05-27
source_docs: 13
synthesizer: main-agent (직접 종합)
---

## 요약

- **핵심**: 13 docs 종합 → primary = 박서윤 (페르소나 H, 비CS 풀스택 취준생) / secondary = 박지훈, accent = copper #C96442, baseline 3 strict (인용 카드 N1 + 역추적 배지 N+5 + copy-as-prompt N+4) + baseline 4 검토 (정보 위계 시각화 + 4단계 narrative arc), 페이지 400~800단어 / 카드 80~150단어×3~5 / 한국어 +15~25% 여백, AI 답 톤 차단 룰 + 지식의 저주 차단 의무
- **인지-기억-활용 사슬**: MD는 활용 단계 무너짐 — Paivio dual coding + Wittrock generation + Karpicke retrieval 로 HTML 이 보강
- **결정 대기 5건**: primary 확정 / accent 색 / 다크모드 토글 / Pretendard CDN / handoff 수신자 페르소나 반영 시점
- **읽는 가치**: Claude Design 4 필드 paste-ready 산출물 + 모든 design 결정의 단일 진입점

# md-show-me 디자인 시스템 — 13-doc 종합 final synthesis

13 docs 의 *근거 사슬* (페르소나 → research → cross-review → cognition/memory/application) 을 통합해 design system 결정으로 매핑한다.

## 1. Primary target 확정

> 표 용어 풀이: `v1 primary` = 1순위 (도구 첫 출시 핵심 사용자), `v1 secondary` = 2순위, `v1.x adjacent` = 1.x 인접 (확장 시 추가), `v2 확장` = 다음 버전 검토 대상.

| 우선순위 | 페르소나 | 근거 |
|---|---|---|
| v1 primary | **박서윤** (페르소나 H, KR 풀스택 취준생, 27, 비CS) | 사용자 본인 정체성 — 도구의 핵심 약속 (AI 가 만든 .md 를 사람이 안 읽음 + 도메인 지식 부족자도 큐레이션 결과로 의사결정) 가장 잘 검증. dogfood 최단 loop. |
| v1 secondary | 박지훈 (페르소나 A, KR 백엔드 시니어, 34) | 시니어 관점에서 정보 밀도 / 신뢰성 / 한/영 혼용 검증. 기획-개발 양면 중 *개발 깊이* 검증 축. |
| v1.x adjacent | 김민호 (KR tech lead, 42) | 검토 본업 50% — 인용·역추적 (back-link) 가치 ↑, Notion AI / Granola 가 못 채우는 빈 공간. |
| v1 보조 | Maya (US junior, 26) | 영어권 마케팅 톤만 outcome-first 로 조정. |
| v2 확장 | 이지원 (디자이너, 36) | editorial polish 가치, "남이 쓴 글을 내 관점으로" 미충족 필요. |
| v2 추가 페르소나 | handoff 수신자 (오프쇼어 / 신입) | 4 페르소나 모두 self-query 중심, 수신자 시나리오 빈 공간. |

**격상 근거** — 박서윤은 (1) *비CS 전공 학생* 이라 도메인 지식 부족자가 큐레이션 결과로 의사결정할 수 있는지 직접 검증하고, (2) *AI 적극 활용 (Claude Code + Obsidian + GitHub)* 이라 도구의 진짜 사용 맥락을 그대로 산다. 박지훈은 *시니어 백엔드* 로 정보 밀도와 신뢰성 (인용·역추적) 요구의 상한선을 검증한다. 두 페르소나가 *학습자 ↔ 전문가* 양 끝을 잡아주면 가운데 페르소나 (김민호·Maya·이지원) 는 자연스럽게 끼워진다.

## 2. Seed 가설 evidence-weighted 평가

| 가설 | 검증 결과 | 근거 |
|---|---|---|
| "AI 글 지친 사람들" | ✅ 검증 | 영어권 담론 풍부 (HN/Simon Willison), 한국어 dev 직접 담론 얕음 → 학문 약함 |
| "YouTube/PPT 정보 밀도" | ❌ **반박 + 교체** | empirical doc 명시 반박: PPT 는 2채널(발표자+슬라이드), HTML 은 단일 채널. 대안 = **Perplexity 220 단어 + Wikipedia 717 단어 hybrid** |
| "정리된 거 보고 싶음" | ✅ 검증 | 4/4 도메인 일치, P0 우선순위 |
| "도메인 지식 부족자도 큐레이션 결과로 의사결정 역할 가능" | ✅ 신규 (페르소나 H 격상에 따른 추가) | 박서윤 = 비CS 풀스택 취준생. 도구가 종합·위계화한 결과를 받아 *의사결정하는 역할* 로 기능. 다만 톤은 "사장" 자칭 대신 "큐레이션 결과를 받아 의사결정하는 역할" 로 절제. |
| "AI 냄새 자동 해결" | ⛔ 범위 밖 | 도구 범위 밖 |

## 3. 인지-기억-활용 사슬 — 가장 깊은 근거

`cognition-memory-application.md` 의 가장 중요한 발견:

```
MD:  인지 ✓  →  기억 △  →  활용 ✗
HTML: 인지 ↑  →  기억 ↑↑ →  활용 ↑↑↑  (단 design 잘 했을 때)
```

**MD 가 무너지는 정확한 지점**:
- **기억 단계**: Paivio dual coding (시각+언어 동시) 단일 채널 위반, Craik deep processing 트리거 약함
- **활용 단계**: Wittrock generative learning (자기 말로 만들기) 의 *generation* 행위 부재 → "AI 답변 받고도 안 남음"

**우리 도구 강화 전략**:
1. **Dual coding** → 시각 + 언어 동시 노출 (citation 카드 = 텍스트, 옆에 figure / source quote)
2. **Generative learning** → copy-as-prompt = 사용자가 *다음 prompt 만들기* 행위 (Wittrock 강화)
3. **Schema construction** → source-of-truth back-link = 사용자가 원본까지 trace 가능 → 자기 schema 형성
4. **Retrieval practice** → 다음 호출 manifest diff banner = 직전 결과 retrieval cue

**학문 근거 강도**:
- Paivio 이중 부호화 (강) / Sweller 인지 부하 이론 (매우 강) / Wittrock 생성적 학습 (중강) / Karpicke 인출 연습 (매우 강)
- Google Generative UI preprint 2025 ELO 1736 (중, preprint)
- Tarik MD 0% / HTML 95% 통계 (매우 약, 도메인 한정 가능성)
- "인터랙티브 HTML > 정적 MD" 직접 RCT (없음, 조합 추론만)

**도구 부위 ↔ 학술 근거 1:1 매핑** (페르소나 H 격상에 따라 비CS 학습자 관점에서 다시 한 번 정리):

| 도구 부위 | 학술 근거 | 짧은 설명 |
|---|---|---|
| 시각 큐레이션 (인용 카드 + figure 인접) | Paivio (1971) 이중 부호화 (dual coding) | 글과 그림이 같은 화면에 같이 있어야 기억에 두 번 박힘 — 학습자에게 가장 큰 효과. |
| 적은 정보 + 정보 위계 시각화 (학교→학생→노트→목차 같은 nesting) | Sweller (1988) 인지 부하 이론 + Chase-Simon (1973) schema chunking | 한 화면에 4±1 묶음만. 위계가 살아있으면 비CS 학습자도 schema 가 잡힘. |
| `[Copy]` / `[Save]` / copy-as-prompt 행위 | Wittrock (1974) 생성적 학습 (generative learning) | 사용자가 *다음 prompt 를 직접 만드는* 행위로 학습이 깊어짐. 그냥 읽기보다 *손이 움직임*. |
| 다시 호출 (`/show-me` 재실행) + 직전 결과 변경 안내 띠 (manifest diff banner) | Karpicke (2008) 인출 연습 (retrieval practice) | 같은 주제를 다시 부를 때마다 기억에서 꺼내는 행위 자체가 가장 강한 학습. |
| 전문 용어 첫 등장 시 한 줄 풀이 (인라인 또는 hover) | Pinker 지식의 저주 차단 + Sweller worked example | 학습자가 모르는 단어에서 멈추지 않도록. *expertise reversal* 회피로 시니어에겐 1-click 숨김. |

이 매핑은 §12 의 anti-pattern 룰과 짝으로 작동한다 — anti-pattern 이 *깨면 안 되는 룰* 이라면, 위 표는 *왜 그 룰을 깨면 안 되는지* 의 학술 근거다.

## 4. 시각 인지 9 design 가이드 (Cleveland-McGill 등 학문 근거)

1. **Position 인코딩 압도** — bar/dot chart 우선 (Cleveland-McGill 30년 재현, Heer 2010)
2. **표는 방향성 있는 정렬** (정보 위계 명시, zebra 금지)
3. **카드 3~5개** (Cowan 4±1 chunk, Miller 7±2 정련판)
4. **색 = 2nd order signal** (Tufte) — 텍스트 색 강조 X, 카테고리 구분 만
5. **직접 라벨** (legend 거리 ↓ → 작업 기억 부담 ↓)
6. **타이포 3단 위계** (h1/body/meta — Mayer modality principle)
7. **여백 = chunk 경계** (Gestalt 근접성)
8. **인터랙션은 데이터 탐색만** (장식 X — Sweller extraneous load)
9. **첫 viewport = 핵심 1개** (스캔 우선, F-pattern 자동 layer-cake 전환)

## 5. Color / Typography 종합 권장

### 색상 (Soomin vs 외부 조사 충돌 해소)

| 후보 | 근거 | 추천 |
|---|---|---|
| `#2563eb` (Soomin) | 가장 검증된 dev 색, 안전 | secondary |
| `#C96442` copper (외부 조사) | Anthropic 톤 연결 + Linear/Primer 와 차별 | **primary v1** |

박지훈 (차분 신뢰) + 김민호 (시각 노이즈 ↓) + 이지원 (editorial polish) 분석 후 — **copper 가 페르소나 정체성과 더 fit**. 다만 v1 launch 후 A/B 검토 가능.

```css
/* Light (default) */
--ms-bg:           #FAFAF9;
--ms-surface:      #FFFFFF;
--ms-border:       #E5E5E3;
--ms-text:         #1C1B1A;
--ms-text-muted:   #6B6A67;
--ms-accent:       #C96442;
--ms-accent-soft:  #F5E6DF;
--ms-success:      #1A7F37;
--ms-danger:       #D1242F;
--ms-warning:      #9A6700;
```

### Typography (한/영 혼용)

페르소나 H (비CS 학습자) 와 박지훈 (시니어 dev) 모두 한국어 본문을 길게 읽는다. 한글은 모아쓰기 자형이라 자모 충돌이 잦아 영문 기준 그대로 쓰면 답답해진다. 본문 가독성과 위계 명확성을 동시에 잡는 최소 셋업:

```css
/* 한글 우선 stack — 시스템 설치 폰트 우선, 외부 fetch 없음 */
font-sans: 'Pretendard Variable', 'Pretendard',
           'Noto Sans KR', 'Apple SD Gothic Neo',
           -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* 코드 / 경로 / 메타 정보 / 인용 식별자 — semantic 용도만 */
font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'D2Coding', monospace;

/* 본문 */
font-size-base: 15px;
line-height-base: 1.6;         /* 한글 자형 위아래 두꺼움 보정 (W3C klreq 1.5~1.7 권장 안쪽) */
letter-spacing: 0;             /* 한글 자형 충돌 방지 — 음수 / 양수 모두 금지 */
weight: 400 / 600 (두 종만)    /* 굵기는 두 단계만. 더 늘리면 위계 흐림 */
```

**heading 3단계** — 정보 위계를 *눈으로 즉시* 잡히게:

```css
h1: 1.75rem  / weight 600 / margin-bottom 0.6em        /* 페이지 제목 1회 */
h2: 1.35rem  / weight 600 / border-bottom 1px #E5E5E3  /* 섹션 경계 명시 */
h3: 1.1rem   / weight 600 / color #6B6A67 (muted)      /* 하위 묶음 — 밝기로 한 단 내림 */
```

**용도 분리** — 모노스페이스는 *의미 있는 곳* 에만: 코드 블록 / 인용 경로 (`docs/auth.md#토큰`) / 메타 정보 (mtime, 파일 식별자). 본문에 절대 안 씀. 모노스페이스 wall 은 페르소나 H 가 *책 톤* 으로 학습하는 흐름을 끊는다.

**Pretendard 처리** — 외부 호출 0 약속과 충돌 → *로컬 설치된 경우만 자동 사용*. stack 앞쪽에 두되 fetch 안 함. CDN 으로 받고 싶으면 사용자가 `enable_cdn_libs` 에 명시 허용.

근거 — `color-typography-academic.md` (line-height 1.5~1.7 강한 RCT 근거, light mode 가독성 우위), `academic-communication-korean.md` (한국어 응답 톤·번역체 차단), `academic-linguistics-korean.md` (한글 line-height 1.7 권장, letter-spacing 0, Pretendard 한/영 균형).

## 6. Layout primitive

- `max-width: 920px` (한글 가독 상한)
- 페이지 분량: **400~800 단어** (empirical 권장)
- 카드: **80~150 단어 × 3~5개** (Cowan 4±1 + Wikipedia 단락 ≤1000자)
- 단락: 200~400 chars
- 8px grid (spacing scale)
- radius 8px (카드) / 4px (chip) — 10px+ round 금지 (SaaS 톤)
- shadow: 0 1px 2px rgba(0,0,0,0.05) — drop-shadow 강조 금지
- 한국어 본문은 영어 기준 + **15~25% 추가 여백** (시각 점유 보정)

## 7. Baseline 3 strict (UX 약속) + baseline 4 검토 + 선택 2

```
[항상 strict — 모든 호출 출력에]
N1   인용 답변 카드            ← 핵심 답 + 인용 원문 인접 (이중 부호화)
N+5  원본 .md 역추적 배지       ← 원본 .md 링크 (schema, 출처 추적)
N+4  copy-as-prompt overlay   ← [Copy] / [Save] (Wittrock 생성적 학습)

[LLM 적합성 판단 — 선택]
N+1  discovery transparency 패널   ← 첫 사용 / dirty repo 결과 의심 시
N33  원문 주석 레이어               ← 본문 검토 흐름일 때
```

**baseline 4 검토 — 정보 위계 시각화 layer (베스트셀러 4단계 narrative arc)**

페르소나 H 의 학습 톤 ("베스트셀러 책처럼") 을 view layout 의 *기본형* 으로 박는 안. 모든 page 가 아래 4단계를 따르면 비CS 학습자도 흐름 놓치지 않고, 시니어는 1-click 으로 건너뛸 수 있다 (Kalyuga 의 *expertise reversal* 회피).

```
[4단계 narrative arc — 베스트셀러 / popular science 패턴]
1. 주의 끌기 (lead)       ← 한 줄 결론 또는 도발적 질문 (페이지 첫 viewport)
2. 소개 (premise)         ← 이 답이 왜 필요한지 1~2문장 (맥락 다리)
3. 본문 (worked example)  ← 인용 카드 3~5개 (baseline 1, Cowan 4±1)
4. 적용 (transfer)        ← copy-as-prompt + 다음 질문 chip (baseline 4 의 generation)
```

근거 — Gawande / Gladwell narrative arc (이야기 흐름), 김상욱 / 정재승 "정의 → 비유 → 일상 예시 → 적용" 4단계 (`academic-plain-language.md` §D, `academic-communication-korean.md` §C). 기본 패턴 1·4 와 직접 정렬되므로 *추가 비용 거의 없음*. 단지 layout 의 *기본 순서* 를 박는 것.

**의사결정 필요** — baseline 4 를 strict 로 박을지, 아니면 LLM 적합성 판단 (예: 짧은 lookup 질의에는 생략) 으로 둘지. 박서윤 dogfood 결과로 결정.

## 8. 인터랙션 강도

- 차분 default (hover dotted → solid, 0.15~0.25s ease, no spring/bounce)
- 모든 인터랙티브 요소에 [Copy]/[Save] 자동 (Wittrock generation 강화)
- Tarik 스타일 *시각 풍부 인터랙티브* (SVG, 차트, 비교 매트릭스) → 베이스라인 3 위에 옵션
- *진짜* 인터랙티브 (slider, drag, toggle) = LLM 이 query 보고 결정

## 9. P0 / P1 / P2 / out v1 매트릭스 (pain-bridge agent 권장)

### P0 (페르소나 + research 둘 다 강) — 자신 있게 design

1. AI verbose 피로 해소 (담론 + paper)
2. citation/source back-link 필수 (4 페르소나 + Tufte source-of-truth)
3. query-shaped cluster (Cowan + 4 페르소나)
4. layer-cake 시각 위계 (NN/g + Mayer)
5. dual coding (시각 + 언어 동시, Paivio)
6. copy-as-prompt = generation (Wittrock)

### P1 (페르소나만 강) — dogfood 가능, anecdotal

1. HTML artifact 공유 (박지훈, 김민호)
2. stale 감지 (M5)
3. 관점 필터 (이지원, "디자이너용으로")
4. editorial 시각 품질 (이지원)

### P2 (research 만 강, 페르소나 미인지) — 잠재

1. 6분/1000단어 chunk (Mayer segmenting)
2. modality 분리 (시각 ↔ 언어 채널)
3. 한글 15~25% 추가 여백

### Out v1

- print 친화 (김민호 만 요구, narrow)
- keyboard shortcut 풀세트
- AI 냄새 자동 탐지 (도구 범위 밖)
- vault graph (Obsidian 영역)
- DB / 협업 (Notion 영역)

## 10. 차별화 — unmet need 교집합

`web-md-tools-comparison.md` 의 결론:

```
md-show-me 의 unmet need = 3 조건 교집합:
1. repo .md 를 source-of-truth 그대로 (Notion/NotebookLM 못 함 — ingest 가공)
2. 쿼리별 ad-hoc 큐레이션 (Obsidian/mdBook 영구 구조 X)
3. 공유 가능한 self-contained HTML artifact (Claude Code 휘발 + NotebookLM export 부재)
```

가장 가까운 경쟁자 = Perplexity (surface 유사, source 가 웹이라 mismatch).

## 11. terminal/monospace 정정 (전체 docs 일관성)

기존 docs 의 "terminal-like" / "Bloomberg Terminal" 표현 = aesthetic 차원 잘못. Tarik 정체성 = *시각 풍부 HTML*, monospace wall 거부.

정정:
- 모노스페이스는 **semantic 만** (code / path / identifier / mtime)
- "Bloomberg Terminal" → "Linear 결재 큐 + Stripe docs 인용 패널"
- "터미널 톤" → "조밀한 dashboard + editorial polish"

## 12. Claude Design 4 필드 — paste-ready (최종)

### Field 1: Company name and blurb

```
md-show-me — Markdown discovery + 쿼리 형태 인터랙티브 HTML 큐레이션 도구.
/show-me <query> 한 줄로 repo 안 .md 후보를 LLM 자동 큐레이션, 쿼리에 맞춰 인터랙티브 HTML 한 페이지로 렌더.
Markdown = source of truth, HTML = 매번 다시 만드는 소비 레이어.
zero install / zero network / 인라인 only.
```

### Field 2: GitHub repo

```
https://github.com/pollux-o4/MD2HTML
```

### Field 3: Fonts / logos / assets

```
- 로고: wordmark only (md-show-me lowercase, monospace 톤). 아이콘 후보 = 📂 또는 🔎
- 폰트 stack:
  sans = Pretendard Variable, Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", system
  mono = ui-monospace, SFMono-Regular, "SF Mono", Consolas, D2Coding
- 첨부 자료: base.css (인라인용 토큰 셋)
```

### Field 4: Any other notes (핵심)

```
[정체성]
md-show-me 는 *AI 가 생성한 verbose Markdown 에 지친 dev* 를 위한 도구다.
"/show-me <쿼리>" → 자동 큐레이션 + 인터랙티브 HTML 1 페이지.
타겟 정체성 = 차분한 신뢰 (Linear) + 정보 밀도 (GitHub Primer) + editorial polish (Stripe Press).
모노스페이스 wall / 터미널 톤 / SaaS marketing 톤 모두 금지.

[근거 사슬 — 인지·기억·활용]
사용자가 정보를 한 번에 인지하고, 기억에 남고, 다음 작업에 활용해야 도구를 *재방문*한다.
- 인지: Cleveland-McGill 시각 인코딩 위계 (position > length > color), Cowan 4±1 chunk
- 기억: Paivio dual coding (텍스트 + 시각 인접), Craik deep processing
- 활용: Wittrock generative learning (copy-as-prompt = 자기 prompt 만들기)
모든 디자인 결정은 이 사슬 위에서 이뤄진다.

[색상 토큰 — 인라인 only]
배경 #FAFAF9 (off-white) / 카드 #FFFFFF / 경계 #E5E5E3
본문 #1C1B1A (near-black) / 보조 #6B6A67
액센트 #C96442 (copper — Anthropic 톤 연결 + Linear/Primer 와 차별)
액센트 soft #F5E6DF (citation 카드 배경, 배지 muted)
상태색: success #1A7F37 / warning #9A6700 / danger #D1242F
다크모드 v1: prefers-color-scheme: dark 자동 감지만, 토글 UI 없음

[타이포 — 한/영 혼용]
sans = Pretendard Variable, Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", system
mono = ui-monospace, SFMono-Regular, D2Coding
font-size base 15px / line-height 1.6 (한글 자형 보정, W3C klreq 권장 안쪽)
letter-spacing 0 (음수·양수 모두 금지 — 한글 자형 충돌)
weight 400 / 600 두 종만
h1 1.75rem / h2 1.35rem (border-bottom 1px) / h3 1.1rem (muted)
모노스페이스는 코드 / 경로 / 메타 정보 / 인용 식별자에만 — 본문 사용 금지

[Spacing / Radius / Shadow]
8px grid. 카드 padding 18~20px. 섹션 32px.
radius 8px (카드) / 4px (chip). 10px+ round 금지.
shadow 0 1px 2px rgba(0,0,0,0.05) 만. drop-shadow 강조 금지.

[Layout primitive]
max-width 920px (한글 가독)
페이지 분량 400~800 단어
카드 3~5개 × 80~150 단어 (Cowan 4±1)
한국어 본문은 영어 기준 + 15~25% 추가 여백

[베이스라인 3 — 모든 호출 strict]
1. Citation answer card (N1)
   본문 답 + horizontal source strip + follow-up chips.
   source 는 카드 하단 monospace + 아이콘 1개.

2. Source-of-truth back-link badge (N+5)
   모든 인용 옆 monospace 배지. "↗ docs/auth.md#토큰-만료-정책"
   font-size 11px, padding 2px 8px, radius 10px, 액센트 soft 배경.
   *MD = source of truth 약속을 시각적으로 박는 단일 요소.*

3. Copy-as-prompt overlay (N+4)
   모든 인터랙티브 요소 옆 [Copy] / [Save] ghost button.
   border #E5E5E3, hover 시 액센트 색만. 절대 primary 색으로 채움 금지.
   toast = 검정 배경 흰 글자, 하단 중앙, 0.25s ease.

[선택 베이스라인 — LLM 적합성 판단]
N+1 discovery transparency 패널 (첫 사용 / dirty repo 결과 의심 시)
N33 원문 주석 레이어 (본문 review 흐름)

[인터랙션 원칙]
*Wittrock generation* 트리거 — copy-as-prompt 가 모든 인터랙션에 따라붙음.
0.15~0.25s ease. spring/bounce 금지.
hover = border-bottom dotted → solid. 색 깜빡임 금지.
인터랙티브 (slider, drag, toggle) 는 LLM 이 query 보고 결정.

[anti-pattern — 시각·인터랙션 금지]
- 모노스페이스 wall / 터미널 dump
- PPT 비유의 sparse 단순화 (단일 채널 HTML 에 부적합)
- SaaS marketing gradient / hero illustration
- F-pattern 강제 (디자인 실패 증상)
- 색 깜빡임 / drop-shadow 강조 / 튀는 애니메이션
- AI 마케팅 표현 (Maya cohort 거부감)

[해서는 안 되는 것 (anti-pattern) — AI 답 톤 차단 룰 (항상 켜진 룰)]
페르소나 H 가 "한글 사이 영어 단어 박혀 읽다 멈춤" pain 을 명시. 도구가 만들어내는 HTML 본문에 아래 4룰을 항상 적용한다.

1. 영어 단어 음차 무분별 섞기 금지 — "baseline", "anti-pattern", "jargon", "context", "trace", "framework" 같은 단어는 *대체 가능한 일반어* 면 한글로 풀이. 대체 불가 전문 용어만 원어 유지 + 한글 풀이 병기. (근거: `academic-communication-korean.md` §B, 토스 라이팅 *Universal words*)
2. 어려운 한자어 남발 금지 — "당사는", "본 도구는", "여하간", "차치하고", "수행하다", "활용하다", "구현하다" → "저희가", "이 도구는", "어쨌든", "제쳐 두고", "한다", "쓴다", "만든다" 로 풀어 쓰기. (근거: Microsoft Writing Style Guide 한국어 변형, `academic-plain-language.md` §E)
3. 번역체 종결어미 금지 — "~에 의해", "~에 다름 아니다", "~이라 하지 않을 수 없다", "~할 수 있습니다", "~되어집니다" 금지. "~할 수 있어요", "~돼요" 등 자연스러운 한국어로. (근거: 한빛 번역투 TOP 12, `academic-linguistics-korean.md` §F)
4. em dash (—) 남발 금지 — 한 단락당 1개 이내. 콤마·괄호로 대체 가능하면 대체. (근거: 2025 AI 글 신호 — `academic-communication-korean.md` §E)

[해서는 안 되는 것 — 지식의 저주 (curse of knowledge, 전문가가 초보 관점을 잊는 현상) 차단 (의무)]
도구가 만들어내는 HTML 의 모든 전문 용어 (도메인 약어, 3글자 이하 영문, 페르소나 H 가 모를 단어) 는 *첫 등장 시* 1줄 풀이 의무. 풀이는 괄호 안 또는 hover tooltip 어느 쪽이든 OK. 한 페이지 안에서 동일 용어 재등장은 풀이 생략 (Sweller redundancy effect 회피). (근거: Pinker (2014) *curse of knowledge*, `academic-plain-language.md` §C, Sweller-Cooper worked example for novice)

[제약]
모든 CSS / JS / SVG 인라인. 외부 호출 0.
CDN 라이브러리는 사용자가 enable_cdn_libs 로 허용한 경우만.
print-friendly: @media print 에서 overlay/toast 숨김, shadow 제거.

[LLM 에게 자유 주는 영역]
위 토큰 + 베이스라인 3 외 모든 layout (vault graph, timeline, kanban, diff 등) 은 LLM 이 쿼리 형태 보고 자유 조합.
단 색은 항상 위 팔레트 안에서. 타이포는 항상 위 stack.
적게 명세 + 풍성하게 만들기 — 이게 도구 작동 원리.
```

## 13. 결정 받아야 할 항목 (사용자)

1. **Primary target**: 박서윤 (페르소나 H, KR 풀스택 취준생) 격상 + 박지훈 (시니어 백엔드) 을 secondary 로 재배치 — 확정?
2. **Accent color**: copper #C96442 vs blue #2563eb?
3. **다크모드 v1**: prefers-color-scheme 자동 감지만 vs 토글 UI?
4. **Pretendard**: 로컬 설치 시만 vs CDN opt-in?
5. **handoff 수신자 페르소나** (v2 gap): v1 에 미리 반영 vs v2 까지 보류?

답 받으면 Field 4 본문 미세 조정 후 Claude Design 에 paste.
