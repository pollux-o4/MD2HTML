---
id: web-md-tools-comparison
type: competitor-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - 8개 도구 (Obsidian/Notion/GitHub/mdBook/Logseq/Perplexity/NotebookLM/Cursor) 의 차별점은 (a) 저장소 vs 빌드 vs 질의응답 surface, (b) AI 큐레이션 1급 시민 여부 2축으로 갈림
  - md-show-me 의 unmet need = 3 조건 교집합: ①repo .md source-of-truth 그대로 ②쿼리별 ad-hoc 큐레이션 ③공유 가능한 self-contained HTML artifact
  - 가장 가까운 경쟁자 = Perplexity (surface 유사, source 가 웹이라 mismatch), NotebookLM (export 부재 + repo ingest 불가)
- **md-show-me 시사점**: vault graph/full docs site/DB/협업은 자제 영역 — 좁은 surface 에 집중
- **증거 강도 / 한계**: 도구별 사용자 불만 quote 풍부하나, 한국 사용자 적용은 전체가 "추측 영역" 으로 라벨링 (1차 데이터 부재)
- **읽는 가치**: 경쟁사 대비 positioning 정당화 필요할 때, "왜 기존 도구로 안 되는가" 답할 때

# 기존 .md / 지식 도구 8종 vs md-show-me 비교

## 1. 개요

8개 도구의 *공통 강점* 은 "마크다운(또는 문서) 을 보기 좋게 렌더 + 일정 수준의 탐색" 까지다. *차별점* 은 (a) 저장소 vs 빌드 vs 질의응답 surface 중 어디에 무게를 두는가, (b) AI 큐레이션이 1급 시민인가 여부 두 축으로 갈린다. md-show-me 는 "repo .md 를 LLM 이 *쿼리별로* 묶어 일회성 HTML 로 뽑는다" 라는 좁은 surface 에서 unmet need 가 있다.

## 2. 도구별 분석

### Obsidian
**강점**: vault 그래프, backlinks, plugin 1,400+, local-first, git 친화. 개발자 선호 1위 [DEV](https://dev.to/pickuma/notion-vs-obsidian-which-knowledge-base-fits-your-developer-brain-in-2026-f2k).
**불만**: plugin 과잉으로 초보자 setup 곡선이 가파름. 블록이 1급 시민이 아니어서 outliner 사용자가 답답해 함 [Obsidian Forum](https://forum.obsidian.md/t/logseq-vs-obsidian-first-impressions/56854).
**.md 큐레이션 적합도**: 본인 vault 안에서는 강력하나, *처음 보는 repo* 의 .md 묶음을 "쿼리당 맞춤" 으로 뽑는 use case 는 비대상.

### Notion
**강점**: 페이지 트리, AI Q&A, 협업.
**불만**: export 시 callout 이 raw HTML 로 깨지고, 데이터베이스는 CSV 로만, 중첩 페이지가 32-hex ID 붙은 260자 초과 경로로 Windows 에서 silently 실패 [Unmarkdown](https://unmarkdown.com/blog/notion-export-broken).
**.md 큐레이션 적합도**: .md 가 source-of-truth 가 아니라 import/export 양 끝에서 손상 발생.

### GitHub Markdown render
**강점**: zero-config, repo 안에서 바로 보임, mermaid 일부 지원.
**불만**: Wiki·GH-Pages 에서 mermaid 비렌더, hyperlink/tooltip 미지원, 이모지·확장 ASCII 가 다이어그램 깨뜨림 [github/docs#15727](https://github.com/github/docs/issues/15727), [community/13761](https://github.com/orgs/community/discussions/13761).
**.md 큐레이션 적합도**: 파일 단위 view 만 가능 — *여러 .md 를 쿼리로 묶는* 기능 없음.

### mdBook / Docusaurus / VitePress
**강점**: 정식 docs 사이트, 검색·버전·테마.
**불만**: 셋업·빌드 비용. VitePress 는 아직 breaking change 잦고 plugin 생태계 얕음. Docusaurus 는 빌드 시간 길다는 평 [okidoki](https://okidoki.dev/documentation-generator-comparison).
**.md 큐레이션 적합도**: "공개 docs" 전용 — 흩어진 internal note 를 쿼리별로 묶는 ad-hoc 작업은 오버킬.

### Logseq
**강점**: outliner-first, block reference, local-first.
**불만**: prose 작성 불편, hybrid mode 없음, 모바일 떨어짐, plugin 생태계 Obsidian 대비 작음 [Calmevo](https://calmevo.com/logseq-review/).
**.md 큐레이션 적합도**: 자체 포맷(block ID 주석) 이 vanilla .md 와 미묘하게 다름 → repo .md 일반화에 마찰.

### Perplexity
**강점**: 쿼리 → 답변 + citation. surface 측면에서 md-show-me 와 가장 가까움.
**불만**: 인용 오류율 37% (free) / 45% (Pro), 출처 URL 은 실재하나 claim 이 왜곡된 *misattribution*, 또는 *fabrication* [CJR](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php), [Nieman Lab](https://www.niemanlab.org/2025/03/ai-search-engines-fail-to-produce-accurate-citations-in-over-60-of-tests-according-to-new-tow-center-study/).
**.md 큐레이션 적합도**: 웹 전용 — 내 repo 의 .md 를 source 로 못 씀.

### NotebookLM
**강점**: 문서 업로드 → 질의응답 + 요약, source-grounded.
**불만**: export 없음, 마크다운·수식·코드블록 포맷 깨짐, free 50 source / Plus 300 cap, 노트북끼리 cross-reference 불가, public API 없음 [XDA](https://www.xda-developers.com/notebooklm-limitations/), [Atlas Workspace](https://www.atlasworkspace.ai/blog/notebooklm-limitations).
**.md 큐레이션 적합도**: 가장 가까운 경쟁자. 그러나 (1) repo 자동 ingest 불가, (2) 출력이 *대화* 지 *공유 가능한 HTML artifact* 가 아님.

### Cursor / Claude Code 자체
**강점**: repo 안 .md 를 LLM 이 직접 읽음 — 큐레이션 능력은 본질적으로 동일.
**불만**: 출력이 *세션 안 텍스트* 로만 휘발. 비-Claude 사용자(PM, 디자이너) 와 공유 불가, 다음 세션에서 재생성 비용 반복.
**.md 큐레이션 적합도**: 큐레이션 엔진은 같지만 *artifact 화* 가 빠짐 — md-show-me 의 핵심 갭이 여기.

## 3. 사용자 불만 패턴 인용

1. *"callout blocks export as raw HTML aside tags... markdown renderers ignore them entirely"* — Notion export [Unmarkdown](https://unmarkdown.com/blog/notion-export-broken)
2. *"databases export as CSV, not markdown — the single biggest complaint"* — Notion [Unmarkdown](https://unmarkdown.com/blog/notion-export-broken)
3. *"there's no export function, and... citations don't transfer as links and the formatting breaks"* — NotebookLM [XDA](https://www.xda-developers.com/notebooklm-limitations/)
4. *"notebooks can't talk to each other"* — NotebookLM [Atlas](https://www.atlasworkspace.ai/blog/notebooklm-limitations)
5. *"Perplexity answered 37% of queries incorrectly, with Pro sometimes providing more confidently incorrect answers"* — [CJR](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php)
6. *"Mermaid markdown rendering does not work in the Github Wiki"* — [github/docs#15727](https://github.com/github/docs/issues/15727)
7. *"in Obsidian, blocks are not first-class citizens... not as elegant as it can be in blocky apps"* — [Obsidian Forum](https://forum.obsidian.md/t/logseq-vs-obsidian-first-impressions/56854)

## 4. md-show-me 의 차별화 공간 (unmet need)

세 가지가 모두 충족되는 도구가 *없음*:

1. **Repo .md 를 source-of-truth 로 그대로 사용** — Notion/NotebookLM 처럼 ingest 가공 없이.
2. **쿼리별 ad-hoc 큐레이션** — Obsidian/mdBook 의 영구 구조와 달리 1회용 묶음.
3. **공유 가능한 self-contained HTML artifact** — Claude Code 의 세션 텍스트 휘발성, NotebookLM 의 export 부재를 동시에 해결.

이 세 조건의 교집합이 md-show-me 의 좁은 영역. Perplexity 가 가장 비슷한 surface 지만 "내 repo" 가 아니라 "웹" 이라는 점에서 어긋남.

## 5. 자제 영역 (이미 잘 되는 부분은 옵션으로)

- **Vault 그래프 / backlinks** (Obsidian, Logseq): 기본 의존 금지 — 사용자가 이미 Obsidian 으로 일상 PKM 한다고 가정. md-show-me 는 *쿼리 응답 surface* 에만 집중.
- **Full docs 사이트 빌드** (mdBook/Docusaurus/VitePress): 영구 사이트는 그쪽이 함. 우리는 throwaway HTML.
- **다이어그램 / 수식 렌더 자체**: GitHub/VS Code 가 잘 함. 우리는 *큐레이션* 이지 *렌더 엔진* 이 아님 — mermaid 등은 standard CDN 으로 충분, 자체 구현 X.
- **DB / 협업 / 권한**: Notion 영역. 절대 따라가지 말 것.

## 6. 한국 사용자 적용

*추측 영역* — 한국 dev 의 .md 도구 선호 데이터를 직접 확인하지 못함. 일반 통념상 Notion 이 한국 IT/스타트업에서 압도적 강세 (회의록·위키·온보딩 표준) 이고, 개발자 개인은 VS Code preview + GitHub render 로 충분히 처리하는 패턴. Obsidian 은 영문권 대비 채택률이 낮다는 *체감* 만 있음 (검색에서 한국어 1차 데이터 미확보).

**차별화 강점**:
- 한국 dev 가 "Notion 옮기기 귀찮다, GitHub repo 안에 .md 로 두고 싶다" 는 mismatch 를 정확히 노림.
- 한글 .md 렌더 품질은 표준 markdown-it 계열이면 동등 — 단, *코드블록 안 한글 폰트 / 줄간격* 은 도구마다 편차 큼. md-show-me 는 CSS 단계에서 한글 가독성을 1차 검증 항목으로 둘 가치 있음.

**약점 / 리스크**:
- 한국에서 협업 surface 는 Notion 이 압도 — md-show-me 가 "공유 가능한 HTML" 이라 해도 Notion 페이지 링크 만큼의 사회적 마찰 < 은 못 이김. PM·디자이너 공유는 여전히 Notion paste 가 1st choice 가능성.
- 한국 dev 의 PKM 문화가 약해서 (통념) "쿼리당 묶음" 이라는 use case 자체가 덜 자주 발생할 수 있음.
