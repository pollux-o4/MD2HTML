---
id: md-show-me-milestone-1-discovery-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-1-discovery
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_reviews:
  - md-show-me-skill-strategy.discord-chatbot.review.md
  - md-html-agent-workflow-strategy.discord-chatbot.review.md
updated: 2026-05-19
status: needs-revision
verdict: approve-with-changes
---

# Review — Milestone 1: Discovery (discord_chatbot 통용성 관점)

대상: `docs/md-show-me-milestone-1-discovery.md`. PRD 작성 전 4 개 milestone 분할의 첫 단계. 사용자 요청에 맞는 Markdown 후보 발견 + manifest 생성.

---

## 총평

선행 리뷰의 P1-C (rule-based vs LLM ranking 미정) 와 P0 #4 (`discover-md.js` 무차별 수집) 를 정면으로 받아들였다 — *규칙 기반* 명시 + *기본 제외 대상* 7 개 (handoff / scratch / draft / `AUTO-GENERATED`) 명시. 최대 5 개 + manifest schema 의 "아직 포함하지 않는 항목" 리스트도 단정. 그러나 (1) 매칭 알고리즘이 "관련 있는지 판단한다" 한 줄로 비어 있고, (2) `match_strength` 의 값 도메인·결정 규칙 미정, (3) frontmatter `abstract` 의존이 discord_chatbot 의 기존 MD 16+ 개 어디에도 없는 필드라 fallback 만 작동, (4) **이 milestone 의 "기본 제외 대상" 자체가 M4 (프로젝트 규칙 통합) 의 산출물이어야 하는데 M4 가 더 나중에 옴** — 순서 모순. 결론: **approve with changes** — 규칙 기반·top-5·excludes 정책의 골격은 옳지만 알고리즘 명세와 milestone 순서를 정정해야 한다.

## 강점

- **§"후보 찾기 방식"의 규칙 기반 명시**: "AI 로 순위를 매기는 일은 나중 milestone 로 미룬다" — 선행 리뷰 P1-C ("LLM ranking 명시 없으면 비용 폭발") 의 명료한 답.
- **기본 제외 대상 7 종**: `AUTO-GENERATED` / `DO NOT EDIT MANUALLY` 헤더 매칭은 ADR-0005 §D3 (verified: discord_chatbot/docs/adr/0005-* L36-38 + snapshot.md L2) 와 정확히 정합. handoff 파일 제외는 session-discipline.md L75-77 의 "*작업 끝나면 폐기*, `commit 안 해도 됨`" 정책 (verified) 과 정합.
- **manifest schema 의 명시적 "아직 포함하지 않는 항목" (숫자 점수 / full heading / block id / 긴 excerpt / file hash)**: 스코프 절제. 선행 리뷰가 지적한 "manifest 가 비대해진다" 위험 차단.
- **"후보가 없으면 제외 조건을 자동으로 풀지 않는다"** (§"후보가 없을 때"): silent fallback 방지. 사용자에게 *왜 0 개* 를 설명. 안티-마법 정책.
- **명시적 user opt-in 으로 제외 해제**: "최근 handoff 문서도 포함해줘" 같은 자연어 trigger. M3 의 자연어 입력 흐름과 일관.

## 주요 우려사항

### P0

#### 1. M4 → M1 순서 모순

M1 의 "기본 제외 대상" 7 종은 *프로젝트 보편* 인 것 (`AUTO-GENERATED`, build 결과물, dependency) 과 *프로젝트별* 인 것 (handoff 폴더 패턴, scratch 디렉터리 이름, draft 표기) 이 섞여 있다. discord_chatbot 만 해도:

- `docs/handoff/YYYY-MM-DD-*.md` (verified: session-discipline.md 정책) — 폴더 기반 제외 필요
- `.claude/scratch/` (verified: env git status `?? .claude/scratch/`) — claude code 자생 디렉터리
- `data/whitelist.json` (ADR-0006 runtime SSoT) — Markdown 이 아니므로 M1 대상 외, 하지만 *프로젝트가 Markdown 외 SSoT 도 가질 수 있다는 사실* 자체가 project-profile 에 기록되어야 함

이런 *프로젝트별 자생 layer* 는 M4 의 project-profile 이 책임지는데, **M4 가 더 나중**. 결과:

- M1 출시 시점에 hardcoded exclusion 으로 굳어짐 → 새 프로젝트마다 코드 수정
- discord_chatbot 적용 시 `docs/handoff/` 가 "기본 제외 = handoff 파일" 의 정의에 잡힐지 *해석 의존*. *파일* 인가 *폴더* 인가? 명시 없음.

→ **권장**: M4 → M1 으로 milestone 순서 뒤집기. *또는* M1 §"기본 제외 대상" 을 "프로젝트 보편 3 종 (AUTO-GENERATED / build / deps) 만 1차, 나머지는 M4 완료 후 project-profile 에서 인출" 로 분리.

#### 2. 매칭 알고리즘 미정 — "관련 있는지 판단한다" 1 줄

§"후보 찾기 방식" 이 "파일 이름 / 제목 / frontmatter / abstract / 제목과 소제목 / updated 날짜" 6 종 신호를 본다고 적었지만 *어떻게 결합* 하는지 0 줄. substring? token overlap? BM25? regex 우선? — 선행 리뷰 P1-C 의 동일 지적이 다시 부유.

문제는 *동일 신호의 weight 분배* 가 결과를 크게 좌우한다는 점:
- "설계" 라는 query 가 `docs/design.md` (filename hit) 와 `docs/research/forum-conventions.md` (abstract 안에 "설계 의도" 등장) 둘 다 매치할 때 어느 게 우선?
- discord_chatbot 의 `docs/adr/0005-*-snapshot-auto-dump.md` 는 filename 에 "snapshot" 가 있어 *snapshot* query 에 hit. 그러나 ADR-0005 본문이 "snapshot 자동 dump 구현 결정" 이라 *snapshot 자체* 를 찾는 사용자에겐 잘못된 후보.

→ **권장**: 최소 명세:
- 1차 신호 priority: `frontmatter type` 일치 → filename literal → heading literal → abstract substring → body keyword. 위에서 아래로 sort, 동률은 `updated` desc.
- weight 는 1 사이클 후 측정으로 조정.

#### 3. `match_strength` 의 값·결정 규칙 미정

§"manifest 내용" 에 `match_strength` 가 들어있고 §"후보가 너무 많을 때" 에 "strong 또는 medium 수준을 우선 보여주고" 라고 적혀 있어 도메인이 `strong | medium | weak` 추정되지만 — *명시* 없음. 또한 *어떤 매칭이 strong 인가* 의 결정 규칙 없음.

이게 P0 인 이유: 사용자가 `/show-me` 출력에서 "왜 이게 strong 이지?" 를 못 물어보면 신뢰가 깨진다. 그리고 §"완료 기준" 마지막 "match_strength 가 있다" 만 적혀 있어 *없는 값* 도 통과시킬 수 있다.

→ **권장**: 값 enum 명시 + 결정 규칙 4 줄 (예: filename literal = strong, frontmatter type 일치 = strong, heading literal = medium, abstract substring = weak).

#### 4. `abstract` frontmatter 의존 — discord_chatbot 의 기존 MD 16+ 개에 부재

§"Abstract 처리" 가 "frontmatter `abstract` 가 있으면 그것을 사용한다. 없으면 [제목 / 제목과 소제목 / 첫 번째 문단] 을 바탕으로 짧은 설명을 만든다" 라고 적는다. 그러나 discord_chatbot 에서 grep:

- 7 개 ADR (`docs/adr/*.md`) — abstract 필드 0
- 4 개 research (`docs/research/*.md`) — abstract 필드 0
- handoff template — abstract 필드 0

즉 M1 적용 시 **fallback 만 100% 작동**. fallback 의 품질은 측정 안 됨. 만약 fallback 이 첫 문단을 그대로 자르면 ADR-0005 의 첫 문단 ("CLAUDE.md 등 코드 repo 의 문서가 Discord 서버 상태...") 가 abstract 가 됨 — 길이 / 정보량 / 톤 모두 의도와 다를 수 있음.

→ **권장**: (a) fallback 알고리즘 명시 (N 자 / 첫 문장 / heading 합성 중 하나), (b) 1 사이클 후 *abstract 가 후보 매칭에 얼마나 기여했는가* 측정 게이트, (c) 측정 결과에 따라 abstract 를 *필수 신호에서 제외* 할 가능성 열어둠.

### P1

#### 5. handoff 의 "파일" vs "폴더" 매칭 모호

§"기본 제외 대상" 의 "handoff 파일" 표기가 모호. discord_chatbot 은 `docs/handoff/YYYY-MM-DD-*.md` (폴더 기반), comfyui 는 루트 `handoff.md` (단일 파일). 둘 다 잡으려면 *폴더 기반* 과 *filename literal* 모두 매칭 필요.

→ **권장**: "handoff 폴더 (`**/handoff/**`) 또는 filename 이 `handoff.md`/`HANDOFF.md` 인 파일" 로 명시.

#### 6. 후보 0/너무 많을 때 tie-breaking 규칙 부재

§"후보가 너무 많을 때" 가 "strong / medium 을 우선 보여주고 사용자에게 좁히도록 요청" 인데, *strong 이 5 개 이상* 일 때 어떻게 자르는가? 미정. P0 #3 의 `match_strength` 결정 규칙과 함께 답해야 함.

→ **권장**: tie-breaking 순서: `match_strength desc → updated desc → filename alphabetical`.

#### 7. dogfood 부재

본 M1 doc 자신이 frontmatter 도 block id 도 없다. 선행 strategy doc 은 dogfood 로 block id 를 적용했는데 milestone 4 개 모두 frontmatter 0, block id 0. 즉 *M1 으로 자기 자신을 discover 했을 때 abstract fallback 만 작동, frontmatter type 매칭 X*. 선행 리뷰의 dogfood 평가가 후퇴.

→ **권장**: 4 개 milestone doc 에 frontmatter (`id`, `type: milestone`, `status`, `updated`) 추가. 자기 dogfood.

### P2

#### 8. 자연어 trigger 의 형식 미정

"최근 handoff 문서도 포함해줘" 가 어떻게 파싱되는가? — 키워드 매칭? LLM 해석? "최근" 의 의미 (1 주? 1 달?)? 미정. M3 가 *자연어* 흐름이라 일관성 있지만 M1 의 *규칙 기반* 약속과 약한 충돌.

#### 9. `matched_fields` 의 도메인 미정

manifest 에 `matched_fields` 가 들어가는데 가능한 값 (filename / title / frontmatter / abstract / heading / updated) 의 enum 미명시. 사용자가 "왜 이게 후보인지" 이해할 핵심 필드인데 형식이 흐림.

## discord_chatbot 적용성 평가

| 항목 | 호환성 | 주의 |
|---|---|---|
| `AUTO-GENERATED` 헤더 제외 | ✅ verified (ADR-0005 §D3 + snapshot.md L2) | snapshot.md L2 의 정확한 문자열 `AUTO-GENERATED by src/snapshot.py — DO NOT EDIT MANUALLY` 와 매칭 — *substring `AUTO-GENERATED`* 단일 매칭으로 충분 |
| handoff 제외 | ⚠️ 폴더 매칭 필요 | discord_chatbot 은 `docs/handoff/` 폴더, 파일명에 "handoff" 없음. P1 #5 |
| scratch 제외 | ⚠️ 디렉터리명 다양성 | discord_chatbot: `.claude/scratch/`. 일반 패턴: `.claude/scratch/**`, `**/scratch/**` 둘 다 매칭 필요 |
| draft 제외 | ⚠️ 정의 미정 | discord_chatbot 에 *.draft.md 패턴 없음. frontmatter `status: draft` 와 filename `*.draft.md` 중 어느 게 기준인지 미정 |
| `data/whitelist.json` (runtime SSoT) | n/a | MD 아님, M1 범위 외. 단 M4 project-profile 이 인지해야 |
| Discord+RAG 협업 layer | ❌ | M1 은 markdown 만 봄. 사용자 query 가 *Discord 메시지* 를 찾는 의도라도 M1 은 찾을 수 없음. 선행 리뷰 §6.4 의 동일 격차 (Discord 정리메시지 layer 부재) |

## MVP 추가 정정 제안

1. **M1 단독 출시는 불가** — M4 의 project-profile 없이 hardcoded exclusion 으로 굳히면 discord_chatbot 같은 자생 layer 가 분화된 환경에서 깨진다. **M4 의 *최소 부분* (루트 + docs/meta Markdown 스캔으로 exclusion 패턴 인출) 을 M1 전제조건으로 포함**.
2. 매칭 알고리즘 (P0 #2) + match_strength 결정 규칙 (P0 #3) + tie-breaking (P1 #6) 을 같은 문서 또는 별도 *Matching Spec* 으로 명세. M1 §"완료 기준" 에 이 spec 충족 추가.
3. 4 개 milestone doc 자체에 frontmatter 도입 — dogfood.

## 문서에서 모호하거나 고쳐야 할 섹션

| 위치 | 문제 | 권장 |
|---|---|---|
| §"결과물" "최대 5 개" | strong > 5 개 일 때 절차 미정 | tie-breaking 규칙 명시 |
| §"후보 찾기 방식" | 알고리즘 1 줄 | priority 순서 + weight 명세 (P0 #2) |
| §"Abstract 처리" | fallback 알고리즘 추상 | N 자 / 첫 문장 / heading 합성 중 하나 명시, fallback 품질 측정 게이트 |
| §"기본 제외 대상" "handoff 파일" | 폴더/파일 모호 | `**/handoff/**` + `*handoff*.md` 둘 다 |
| §"기본 제외 대상" "scratch 파일" | 디렉터리 패턴 미정 | `**/scratch/**`, `.claude/scratch/**` |
| §"기본 제외 대상" "draft 파일" | 기준 미정 | frontmatter `status: draft` + filename `*.draft.md` 둘 다 |
| §"Manifest 내용" `match_strength` | 값 도메인 미정 | enum `strong/medium/weak` + 결정 규칙 |
| §"Manifest 내용" `matched_fields` | 값 도메인 미정 | enum (filename/title/frontmatter/abstract/heading) |
| §"후보가 없을 때" "사용자가 어떻게 다시 요청하면 좋을지" | 안내 템플릿 미정 | 예시 3 종 (키워드 좁히기 / 제외 풀기 / scope 확장) |
| §"완료 기준" | 매칭 알고리즘 / strength 결정 규칙 누락 | 두 항목 추가 |

## 최종 판단

**Approve with changes.**

골격 (규칙 기반 + 5 개 cap + excludes + manifest schema) 은 선행 리뷰의 P0/P1 을 가장 정확히 흡수. 다만 (a) milestone 순서가 M4 → M1 으로 뒤집혀야 *프로젝트별 자생 layer* 를 일반화하고 (b) 매칭 알고리즘과 `match_strength` 결정 규칙이 명세돼야 첫 사이클이 결과 검증 가능하다. discord_chatbot 적용성은 (handoff 폴더 패턴, scratch 디렉터리, abstract fallback 품질) 3 곳에서 추가 정정 필요.
