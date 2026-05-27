# Dev Tool Design Systems 조사 — md-show-me 디자인 컨셉 명세 근거 자료

조사일: 2026-05-27 · 대상: md-show-me Claude Design 입력용 컨셉 명세

> **출처 신뢰도 주의**: Linear, Vercel(Geist), Anthropic 의 공식 design system 페이지는 대부분 JS 렌더링되거나 인증·차단으로 WebFetch 가 충분히 긁지 못함. 본 문서는 (1) WebFetch 로 받은 공식 단편, (2) 2차 소스 (Mobbin / getdesign.md / fontofweb / Medium 분석글), (3) 잘 알려진 공개 hex 값 (e.g. Linear `#5E6AD2`, Primer `#0969da`) 을 종합. 직접 inspect 한 1차 값이 아닌 부분은 "추정/통념" 으로 표시.

---

## 1. 공통 핵심 3가지

여섯 도구 (Linear / Geist / Primer / Cursor / docs-tool 군 / Claude.ai) 의 design system 을 가로지르는 패턴:

1. **차분한 중성톤 + 단일 accent 1색** — 모두 회색 9~12 단계 scale 위에 *하나의* brand accent (Linear 보라 `#5E6AD2`, Primer 파랑 `#0969da`, Vercel 흑백 + minimal, Anthropic 오렌지) 만 얹는다. 다색 사용은 semantic (success/danger/warning) 에만 한정. md-show-me 도 "차분 / 신뢰" 정체성과 일치.
2. **시스템 폰트 우선 + custom 1종만** — Geist Sans, Inter (VitePress), Mona Sans (Primer) 모두 fallback 으로 `-apple-system, BlinkMacSystemFont, system-ui` 를 우선 두고 custom 은 1종만 얹음. 코드는 거의 예외 없이 `ui-monospace, SFMono-Regular, Menlo, Consolas` stack.
3. **CSS variable + class 기반 dark mode** — Primer (`--bgColor-*`), VitePress (`.dark` 클래스 + `--vp-*`), Infima (`--ifm-color-primary-*`) 모두 동일 패턴. 토큰 하나만 swap 하면 light/dark 전환. zero-build 환경인 md-show-me 에 그대로 차용 가능.

---

## 2. 도구별 분석 (요약표)

| 도구 | Accent | Neutral 전략 | Sans 폰트 | Mono 폰트 | 카드/배지 톤 | Dark mode |
|------|--------|--------------|-----------|-----------|--------------|-----------|
| **Linear** | 보라 `#5E6AD2` (통념) | dark-first, near-black BG `#08090A` | Inter Display + system | SF Mono | 얇은 1px border + 미세 shadow, radius 6~8px | dark default, light 추가 |
| **Vercel / Geist** | 거의 흑백 + 미니멀 accent | 10단계 gray scale (light/dark 미러) | Geist Sans (Inter 계열) | Geist Mono | flat, border-only, radius 6px | 토큰 미러링 |
| **GitHub Primer** | `#0969da` blue | `#1f2328` ~ `#ffffff` 회색 5~6단 | Mona Sans VF + system | ui-monospace stack | `bgColor-muted` + 1px border, radius 6px | 토큰 swap |
| **Cursor** | VS Code 계승 (파랑) | Anysphere Dark 기본 (near-black) | system | system mono | IDE chrome 톤, sidebar 강조 | dark/light/midnight |
| **VitePress / Docusaurus / mdBook** | brand 가변 | CSS var 4단계 (-1/-2/-3/-soft) | Inter / system | ui-monospace | sidebar + content 2-col, radius 8px | `.dark` class |
| **Claude.ai (Anthropic)** | 오렌지 (`#D97757` 류, 통념) | warm beige + dark text | Poppins (heading) + Lora (body) — 공식 brand kit; UI 는 system | ui-monospace | warm tone, soft shadow | 지원 |

핵심 관찰: **dev tool 군 (Linear/Vercel/Primer/Cursor)** 은 차갑고 절제된 톤, **Anthropic 자체 brand** 는 따뜻한 톤. md-show-me 는 "엔지니어 친화" 정체성이므로 dev tool 군 쪽 톤이 더 맞음. Anthropic 톤은 *bridge* 로만 차용 (warm accent 1색).

---

## 3. 색상 팔레트 권장안 (md-show-me)

차분 + 신뢰 + 엔지니어 친화 + dirty repo 친화를 위해 **near-neutral + warm accent 1색** 조합:

```css
/* Light (default) */
--ms-bg:           #FAFAF9;  /* off-white, 순백보다 눈에 편함 */
--ms-surface:      #FFFFFF;  /* 카드 배경 */
--ms-border:       #E5E5E3;  /* 1px subtle border */
--ms-text:         #1C1B1A;  /* near-black, 순흑 회피 */
--ms-text-muted:   #6B6A67;  /* 메타데이터, 경로, 타임스탬프 */
--ms-accent:       #C96442;  /* Anthropic 계열 따뜻한 copper — 신뢰감 + 차별점 */
--ms-accent-soft:  #F5E6DF;  /* citation 카드 배경, 배지 muted */

/* Semantic */
--ms-success:      #1A7F37;  /* Primer 차용 */
--ms-danger:       #D1242F;  /* stale 표시용 */
--ms-warning:      #9A6700;
```

Dark mode (토큰 swap):

```css
--ms-bg:           #0F0F0E;
--ms-surface:      #1A1A18;
--ms-border:       #2E2D2A;
--ms-text:         #ECEAE5;
--ms-text-muted:   #8E8C86;
--ms-accent:       #E07B5A;  /* 다크에서 채도 살짝 올림 */
--ms-accent-soft:  #2A1F1B;
```

**왜 copper accent?** — (a) 보라(Linear)·파랑(Primer/Vercel) 과 겹치지 않아 차별화, (b) Anthropic brand 톤과 미세 연결 (Claude Code skill 이라는 정체성), (c) 한글·영문 모두에서 가독성 검증된 warm hue, (d) dirty repo / 오래된 문서를 다루는 도구의 "발굴 / 큐레이션" 메타포와 어울림.

---

## 4. 타이포그래피 권장안

**한글 / 영문 혼용 best practice 요약**:

- 한글은 영문보다 시각 크기가 크게 느껴짐 → 본문 16px 기준 line-height **1.7~1.8** 권장 (라틴은 1.5 가 보통). W3C klreq + Typotheque CJK 가이드 일치.
- letter-spacing 은 한글에 적용하지 말 것 — 폰트 자체 그리드가 이미 균형 맞춰져 있음. 영문만 -0.01em 정도 미세 조정 가능.
- **Pretendard** 가 사실상 dev 커뮤니티 표준: Inter + Source Han Sans 기반, 영문·한글 x-height·letter-width 가 자연스럽게 균형. variable font 지원, jsDelivr CDN 사용 가능.

**권장 stack 2개** (CDN 허용 시 / zero-network 폴백):

```css
/* Stack A — CDN 허용 시 (Pretendard variable) */
font-family:
  'Pretendard Variable',
  Pretendard,
  -apple-system, BlinkMacSystemFont,
  'Apple SD Gothic Neo',  /* macOS 한글 fallback */
  'Malgun Gothic',         /* Windows 한글 fallback */
  system-ui, sans-serif;

/* Stack B — zero-network (system only) */
font-family:
  -apple-system, BlinkMacSystemFont,
  'Apple SD Gothic Neo',
  'Segoe UI', 'Malgun Gothic',
  system-ui, sans-serif;

/* Code — 모든 경우 system 우선 */
font-family:
  ui-monospace, SFMono-Regular, 'SF Mono',
  Menlo, Consolas, 'D2Coding',  /* D2Coding: 한글 폭 정렬 잘 됨 */
  'Liberation Mono', monospace;
```

**왜 Pretendard?** Noto Sans KR 은 파일 크기 큼 (16MB → subset 필요), Spoqa 는 디자인은 좋지만 영문이 Lato 기반이라 코드/UI 톤과 약간 어긋남. Pretendard 는 Inter 와 거의 호환되는 영문 + 자연스러운 한글로 두 마리 토끼.

**Code font 결정**: JetBrains Mono / Fira Code 는 ligature 매력적이나 (a) 라이센스·CDN 의존, (b) ligature 가 코드 diff 가독성을 해치는 케이스 있음, (c) 한글 혼용 시 폭 정렬 깨짐. `ui-monospace` stack + `D2Coding` (한글 폭 정렬 fallback) 이 zero-install 정체성에 부합.

---

## 5. Spacing / Radius / Shadow Scale

VitePress + Primer + Geist 의 공통 컨벤션을 따라 **4px 그리드**:

```css
--ms-space-1: 4px;
--ms-space-2: 8px;
--ms-space-3: 12px;
--ms-space-4: 16px;   /* body 기본 padding */
--ms-space-6: 24px;   /* 카드 내부 padding */
--ms-space-8: 32px;   /* 섹션 간격 */
--ms-space-12: 48px;  /* 페이지 상하 여백 */

--ms-radius-sm: 4px;  /* 배지, inline code */
--ms-radius-md: 8px;  /* 카드, 버튼 (Linear/Primer 와 동일) */
--ms-radius-lg: 12px; /* 모달, 오버레이 */

/* Shadow — 차분한 도구이므로 매우 절제 */
--ms-shadow-1: 0 1px 2px rgba(0,0,0,0.04);                 /* 카드 hover */
--ms-shadow-2: 0 4px 12px rgba(0,0,0,0.08);                /* 오버레이 */
--ms-shadow-focus: 0 0 0 3px rgba(201,100,66,0.25);        /* accent 기반 focus ring */
```

**인터랙션 톤**: hover 시 border 만 `--ms-accent` 로 전환 + 미세 `--ms-shadow-1`. transform/scale 금지 (산만함). transition `150ms ease-out` 통일.

---

## 6. 차용 vs 우리 정체성

| 차원 | 차용 | 우리만의 색깔 |
|------|------|---------------|
| **색 구조** | Primer 의 semantic + neutral scale 구조, Linear 의 near-black 다크 | Copper accent — 보라/파랑 dev tool 군과 차별, Anthropic 톤과 미세 연결 |
| **타이포** | Geist/Primer 의 system-first stack 철학 | Pretendard 1순위 — 한글 사용자 *first-class* 대우 (다른 dev tool 들은 영문 only) |
| **spacing/radius** | 4px grid, 6~8px radius — Linear/Primer/VitePress 공통 | (차용 그대로) |
| **shadow / motion** | 절제된 1~2 단계만 (Vercel 톤) | transform 금지, focus ring 만 accent — "조용한 도구" 강조 |
| **카드 패턴** | Primer 의 `bgColor-muted + 1px border` citation 카드 | "source back-link 배지" 는 우리 baseline — 본문 옆 *항상* 노출되는 작은 chip 형태로 |
| **dark mode** | CSS var class swap (모두 공통) | dirty repo 친화 — light mode 가 default (개발자 작업 환경 다양성) |
| **오버레이** | Linear 의 command palette 스타일 | "copy-as-prompt" 오버레이는 1키 (`c`) — keyboard-first |

---

## Claude Design 의 "Any other notes" 필드 paste 용 요약

```
정체성: 차분 / 신뢰 / 엔지니어 친화 / dirty repo 에서도 쓸만함. dev tool 군 (Linear/Vercel/Primer) 의 절제된 톤 차용 + 따뜻한 copper accent 로 차별화.

색상 (light / dark 미러):
- bg: #FAFAF9 / #0F0F0E
- surface: #FFFFFF / #1A1A18
- border: #E5E5E3 / #2E2D2A
- text: #1C1B1A / #ECEAE5
- text-muted: #6B6A67 / #8E8C86
- accent (copper): #C96442 / #E07B5A
- accent-soft: #F5E6DF / #2A1F1B
- success #1A7F37, danger #D1242F, warning #9A6700

타이포:
- Sans: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif
- Mono: ui-monospace, SFMono-Regular, Menlo, Consolas, 'D2Coding', monospace
- 본문 16px / line-height 1.75 (한글 가독성), heading 1.3
- letter-spacing: 0 (한글 보호)

Spacing: 4px grid (4/8/12/16/24/32/48)
Radius: 4 / 8 / 12
Shadow: 매우 절제 (1px border 위주, hover 시 미세 shadow + accent border, transform 금지)
Motion: 150ms ease-out, 효과 최소화

패턴:
- citation 답변 카드: surface bg + 1px border + 좌측 4px accent 띠
- source back-link 배지: accent-soft 배경 + accent 텍스트 + radius 4, 본문 옆 inline chip
- copy-as-prompt 오버레이: surface + shadow-2 + radius 12, `c` 키 트리거
- 카드 hover: border-color → accent, shadow-1 추가, transform 금지

Dark mode: CSS var swap (`.dark` class), light 가 default
한글/영문 혼용: Pretendard 1순위, line-height 1.75, letter-spacing 0
Zero-install 우선, Pretendard CDN 은 사용자 명시 허용 시만 (그 경우에도 system fallback 유지)
```

---

## 참고 자료

- [Primer Foundations - Color](https://primer.style/foundations/color)
- [Primer Foundations - Typography Primitives](https://primer.style/foundations/primitives/typography)
- [Geist Design System (Vercel)](https://vercel.com/geist/introduction)
- [Geist Font](https://vercel.com/font)
- [getdesign.md / Linear analysis](https://getdesign.md/linear.app/design-md)
- [Linear design tokens (FontOfWeb)](https://fontofweb.com/tokens/linear.app)
- [VitePress CSS & Styling](https://vitepress.dev/guide/extending-default-theme)
- [Infima (Docusaurus) CSS Variables](https://docusaurus.community/knowledge/design/css/variables/)
- [Cursor Themes](https://cursor.com/help/customization/themes)
- [Pretendard GitHub](https://github.com/orioncactus/pretendard)
- [Pretendard 시스템 폰트 도입기](https://brunch.co.kr/@kangsigner/9)
- [프리텐다드 vs 노토산스 vs 스포카 vs 인터롭](https://brunch.co.kr/@smootart/9)
- [W3C Requirements for Hangul Text Layout](https://www.w3.org/TR/2013/WD-klreq-20130514/)
- [Typotheque CJK Typesetting](https://www.typotheque.com/articles/typesetting-cjk-text)
- [JetBrains Mono vs Fira Code (FontFYI)](https://fontfyi.com/blog/jetbrains-mono-vs-fira-code/)
- [Introducing Claude Design (Anthropic)](https://www.anthropic.com/news/claude-design-anthropic-labs)
