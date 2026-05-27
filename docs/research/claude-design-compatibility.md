# Claude Design 출력 → show-me 호환성 조사

조사 대상: `claude.ai/design` handoff bundle `text-particle-effects` (Text Particle Effects.html, 612 lines).
방법: WebFetch 가 Anthropic 도메인을 gzip tar 로 응답 → 로컬 해제 후 직접 검사 (README.md, chat1.md, project HTML).

## 1. Claude Design 결과 분석

**의존성**:

- 외부 스크립트 라이브러리 **0개** — Three.js / React / Anime.js / Tailwind 모두 없음.
- 외부 CSS 라이브러리 0개.
- 외부 리소스는 단 하나: Google Fonts (`Spectral` + `JetBrains Mono`) — `<link>` 3줄로 preconnect + stylesheet.
- 렌더 기법: vanilla `<canvas>` 2D context + `requestAnimationFrame` + `ResizeObserver`. WebGL 도 안 씀.
- 입력: `contenteditable="plaintext-only"` div + 직접 작성한 caret save/restore.
- 색은 `oklch()` CSS native, 모델 다운로드 / 빌드 단계 / npm 의존성 0.

**파일 형태**: `<!doctype html>` 단일 파일, 612 lines, ~26KB. CSS 약 200줄 (`<style>` 인라인), JS 약 370줄 (`<script>` 인라인). 완전 self-contained — 단일 HTML 더블클릭으로 동작.

**라이선스**: handoff README 는 "recreate them pixel-perfectly in whatever technology" 라고 명시 — **prototype 으로 마음대로 차용 가능** 한 톤. 별도 라이선스 문구나 attribution 요구 없음.

## 2. zero-install 제약과의 호환

PRD D13 (`md-show-me-prd.md` L69, L102-113): zero install / zero network 가 default, CDN 라이브러리는 per-library confirm prompt + `.show-me.toml.enable_cdn_libs` allowlist 후에만 허용.

| 항목 | 판정 |
|---|---|
| 인라인 CSS/JS만 | OK — show-me 의 default 모드와 정확히 일치 |
| Google Fonts (`<link>`) | per-library confirm 대상 (네트워크 호출 1회). 미허용 시 `font-family: Georgia, serif` 로 fallback 해도 시각 거의 보존 |
| canvas 2D vanilla | OK — 외부 라이브러리 아님, 브라우저 native |
| `oklch()` | OK — 모던 브라우저 native, 의존성 없음 |
| 차용해 baseline 3 (citation 카드 / back-link / copy-as-prompt 오버레이) 와 결합 | OK — 단일 HTML 이라 snippet 단위로 발췌 가능 |

결론: **per-library confirm 절차 한 번만 거치면 (Google Fonts) 직접 차용 가능**. 폰트 거부해도 시각 손실 minor.

## 3. 활용 시나리오 3가지 평가

| 시나리오 | 평가 |
|---|---|
| **A. base.css 색상·타이포 컨셉 잡기** | 가장 권장. `oklch()` 팔레트 (warm dark `0.155 0.012 55`) + Spectral/JetBrains Mono pairing 은 우리 도구 톤 (Markdown 큐레이션, 차분한 reading surface) 과 합치. 한 번 호출 → base.css 에 변수 반영하면 끝 |
| **B. 특정 패턴 차용 (예: discovery transparency 패널)** | 가능. Claude Design 에 "discovery 단계 transparency 패널 디자인 변형 3개" 요청 → 마음에 드는 1개 발췌 → snippet 으로 저장. 단 *디자인 자체가 의미를 담는* 케이스에 한정 (단순 카드는 굳이) |
| **C. 매번 새 호출마다 Claude Design 호출** | 비현실적. show-me 는 LLM 실행 시간이 이미 길고, Claude Design 호출은 추가 round trip + handoff 해제 + 통합 비용. zero-install paradigm 과도 충돌 (네트워크) |

## 4. 권장 경로

**One-shot 디자인 자산 sourcing tool 로 본다.** Claude Design 은 show-me 런타임 의존성이 *아니라* **개발 시 디자인 컨셉 sourcing 도구**.

워크플로:
1. 우리가 base.css 색/타이포 / 핵심 패턴 1~2개 (citation 카드, back-link 배지, transparency 패널) 의 톤 잡기 모를 때 Claude Design 한 번 부른다.
2. 결과 HTML 에서 *컨셉만* 흡수 — CSS variables, font stack, 인터랙션 아이디어.
3. snippet / base.css 에 반영 후 Claude Design 결과물 자체는 commit 하지 않는다 (`docs/research/` 참고용으로만).
4. 런타임에는 Claude Design 호출 없음. show-me skill 은 우리가 흡수한 patterns 만 사용.

## 5. Text Particle Effects 자체 use case 평가

우리 도구에 직접 의미 **낮음**. show-me 는 *Markdown discovery + 큐레이션* 이지 *글쓰기 인터랙티브 데모* 가 아니다. Text Particle Effects 의 trigger word (`Fire`/`Smoke`/`metal`/`wind`) → particle 매칭은 영감의 대상이지 직접 use case 가 아니다.

다만 인접 아이디어 1개는 차용 가치 있다: **citation 답변 카드의 핵심 키워드 (예: "decision", "ADR-3", "trade-off") 에 *아주 미세한* 시각 강조** (글로우, 밑줄 애니메이션). canvas particle 까지는 과하지만 CSS-only 글로우는 의미 강조 패턴으로 baseline 3 후속에 후보. 단 M2 범위 밖.

**Bottom line**: 이 특정 prototype 은 reference 영감용. 호환성 자체는 모범 — vanilla canvas + 인라인 코드 + 단일 외부 폰트만 → 우리 zero-install paradigm 과 거의 100% 호환.
