---
id: md-show-me-milestone-4-project-rules-integration-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-4-project-rules-integration
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_reviews:
  - md-show-me-skill-strategy.discord-chatbot.review.md
  - md-show-me-milestone-1-discovery.discord-chatbot.review.md
  - md-show-me-milestone-2-static-html-report.discord-chatbot.review.md
updated: 2026-05-19
status: needs-revision
verdict: approve-with-changes
---

# Review — Milestone 4: Project Rules Integration (discord_chatbot 통용성 관점)

대상: `docs/md-show-me-milestone-4-project-rules-integration.md`. 외부 협업 도구 통합 전에 *프로젝트 문서 규칙* 을 먼저 인식하는 단계. project-profile.json 캐시 + mtime/hash 기반 갱신.

---

## 총평

선행 리뷰의 P0 #4 (`discover-md` 무차별 수집) 와 §6.3 (writing guide 먼저 읽는다 정책의 구체화 부재) 를 정면 응답했다 — 루트 + `docs/meta` MD 우선 + project-profile 캐시 + mtime 기반 갱신. 외부 협업 도구를 *역할만* 기록하고 API 연동을 미루는 단계 분리도 모범적. 그러나 (1) **M4 → M1 순서가 뒤집혀 있다** — M1 의 "기본 제외 대상" 자체가 M4 의 산출물이어야 하는데 M4 가 더 나중, (2) discord_chatbot 의 `AGENTS.md`·`GEMINI.md` 가 *CLAUDE.md 로 redirect 하는 1 줄 stub* (verified: 두 파일 각 1 줄) 인데 M4 가 이 패턴을 인지하지 못함, (3) `docs/adr/` 가 검색 대상에서 누락 — `data/whitelist.json` 같은 *runtime SSoT* invariant 가 ADR-0006 에 박혀 있어 M4 가 인지 불가, (4) **M1 검토 시 발견 — `.venv/` 와 `.claude/worktrees/` 에 dependency MD 수천 개** (verified: discord_chatbot Glob 결과 `.venv/Lib/site-packages/**/*.md` 100+) 가 §"규칙 찾는 순서" 와 M1 의 exclusion 어디에도 없음. 결론: **approve with changes** — 단계 분리는 옳지만 순서·예외 패턴·SSoT 외 layer 인식을 닫아야 한다.

## 강점

- **§"규칙 찾는 순서" 의 점진성**: 루트 MD → `docs/meta` → 도구 전용 파일 → 전용 설정 파일. 가장 일반적인 신호부터 보고 부족하면 전용 파일. 선행 리뷰 §6.3 의 "writing guide 의 SSoT 표를 *읽고* 영구 source 로 제한" 권고에 호응.
- **§"프로젝트 프로필" 의 cache 명시**: "원본 문서가 아니라, 원본 문서에서 뽑아 만든 캐시이다. 필요하면 다시 만들 수 있고, git 에서 무시해도 된다" — SSoT 가 *Markdown* 임을 코드 수준에서 강제. 선행 리뷰 §B SSoT 표와 정합.
- **§"오래된 프로필 처리" 의 mtime/hash + 자동 rebuild trigger 4 종**: 명시적 invariant 4 개 (루트 MD 변경 / `docs/meta` MD 변경 / 추가 / 삭제). silent staleness 차단.
- **§"오래된 프로필 처리" 의 *갱신 이유 표시***: `Project profile refreshed: CONTEXT.md changed.` — 사용자가 *왜* rebuild 됐는지 즉시 알 수 있음. 안티-마법 정책.
- **외부 협업 도구를 *역할만* 기록**: API 연동 후순위. comfyui / discord_chatbot / 일반 프로젝트 모두 *역할 이름* 만으로 manifest 의 metadata 풍부화 가능. comfyui 리뷰의 "외부 통합은 후순위" 권고와 정합.
- **§"프로필 위치" 의 명시적 `.agent-output/show-me/project-profile.json`**: M2 의 출력 위치 정책과 일관 (단 P1 #5 — 디렉터리 충돌 우려).

## 주요 우려사항

### P0

#### 1. M4 → M1 순서 모순 (M1 review §1 과 동일)

M1 의 §"기본 제외 대상" 7 종 중 *프로젝트별* 인 것 (handoff 폴더 패턴, scratch 디렉터리 이름, draft 표기) 은 M4 의 project-profile 이 책임지는 정보다. 그러나 **M4 가 더 나중**.

결과: M1 출시 시점에 hardcoded exclusion 으로 굳어짐. discord_chatbot 의 `docs/handoff/` 폴더, `.claude/scratch/`, `.venv/` 같은 자생 layer 가 *M1 의 1 차 코드* 에 들어가야 함 — 새 프로젝트마다 코드 수정.

이건 *milestone 순서* 의 결함: M1 이 *프로젝트 규칙* 을 *모르는 상태* 로 출시되면 안 된다. M1 doc §"기본 제외 대상" 의 7 종은 *프로젝트 보편* 인 것 (`AUTO-GENERATED`, build, deps) 만 1 차이고, 나머지는 M4 산출물에서 인출되어야 한다.

→ **권장**: 둘 중 하나:
- (a) **M4 의 *최소 부분* 을 M1 전제조건으로 격상** — 루트 + `docs/meta` MD 스캔으로 exclusion 패턴 인출하는 *서브 단계* 를 M1 안에 포함. M4 의 *나머지* (외부 협업 도구 역할, mtime/hash, 자동 rebuild) 만 M4 로 미룸.
- (b) **milestone 순서 재배열**: M4-A (rules discovery) → M1 → M2 → M3 → M4-B (external collab roles + cache infra).

#### 2. AGENTS.md / GEMINI.md redirect-stub 패턴 미인지

§"규칙 찾는 순서" 3 단계: "`AGENTS.md` 같은 도구 전용 파일은 유용하지만, 그것만 유일한 기준으로 삼지는 않는다."

discord_chatbot 현실 (verified):
- `AGENTS.md` = **1 줄**: "이 프로젝트의 진입점은 CLAUDE.md. 그 파일부터 읽고 시작."
- `GEMINI.md` = **1 줄**: 동일

즉 `AGENTS.md` 를 *유용한 신호* 로 다루면 *정보 0*. 진짜 정보는 `CLAUDE.md` 에 있고 `AGENTS.md`/`GEMINI.md` 는 *Multi-tool 호환을 위한 redirect 스텁*. discord_chatbot CLAUDE.md (루트 직접 인용):

> 이 워크스페이스는 여러 AI CLI 도구와 같이 쓸 수 있다. 도구별 진입 파일은 모두 이 `CLAUDE.md` 로 리다이렉트되도록 둔다 — 단일 진실 원천 유지 목적.
> - `CLAUDE.md` — 본 파일 (정본)
> - `AGENTS.md` — Codex 등 호환. 1줄 스텁
> - `GEMINI.md` — Gemini 호환. 1줄 스텁

M4 가 *유용한 신호* 로 AGENTS.md 를 읽는다면 *1 줄 redirect* 만 보고 *유용한* 정보를 못 얻는다.

→ **권장**: §"규칙 찾는 순서" 에 redirect-stub 인식 추가:
- 루트 MD 가 N 줄 이하 (예: 5 줄) 이고 다른 MD 를 명시 reference 하면 *stub* 으로 분류
- stub 인 경우 reference 된 MD 를 우선 source 로 따라감 (transitive)
- 또는 *루트 MD 중 byte 수 최대* 를 canonical 로 우선

#### 3. `docs/adr/` 누락 — runtime SSoT invariant 인식 불가

§"규칙 찾는 순서" 1-2 단계: 루트 MD → `docs/meta` MD. `docs/adr/` 미언급.

discord_chatbot 현실:
- ADR-0005: `docs/discord/snapshot.md` 가 봇 auto-dump (= `AUTO-GENERATED` 헤더 정책의 *source 가 ADR*)
- ADR-0006: `data/whitelist.json` 이 runtime SSoT
- ADR-0002: cross-module invariants

이 *invariant* 들이 ADR 에 박혀 있고 `docs/meta/writing-guide.md` 의 SSoT 표 (verified: discord_chatbot 리뷰 §6.3) 는 그것을 *요약* 한다. 즉:

- writing-guide.md 가 *영구 source* 와 *일회성 layer* 표 제공 — M4 가 잡음
- 그러나 *코드 강결합 invariant* (whitelist.json runtime SSoT, snapshot.md auto-dump) 의 *원시 근거* 는 ADR — M4 미인식

§"규칙 찾는 순서" 4 단계 "기존 문서만으로 규칙이 부족하면 전용 설정 파일" 은 *수동 fallback* 일 뿐 ADR 자동 인식 X.

→ **권장**: §"규칙 찾는 순서" 에 `docs/adr/**` 도 *2 단계 또는 2.5 단계* 로 추가. 단 ADR 전체 본문이 아니라 *frontmatter `status: accepted`* + *제목* + *처음 N 자* 만 인덱싱 (token 비용 절제).

#### 4. `.venv/` 와 `.claude/worktrees/` 누락 — M1 review 보강 발견

선행 M1 doc §"기본 제외 대상" 은 *node_modules / .git / dist / build / coverage* 만 — Node.js 중심.

discord_chatbot 현실 (verified: Glob `*.md` 결과):
- `.venv/Lib/site-packages/**/*.md` — 약 100+ 의 dependency MD (sentence_transformers, openai, scipy, sklearn, huggingface_hub, etc.)
- `.claude/worktrees/agent-*/...` 안에 또 다른 `.venv/` — Claude Code subagent worktree 마다 복제됨

이게 M1 으로 흘러들어가면 manifest 가 *dependency MD* 로 오염. 사용자 query "design" 에 `huggingface_hub/templates/modelcard_template.md` 가 매칭될 위험.

→ **권장**: M1 §"기본 제외 대상" + M4 project-profile 에 Python (`.venv/`, `__pycache__/`, `*.egg-info/`) + Claude Code (`.claude/worktrees/`, `.claude/scratch/`) 추가. M4 가 *언어/툴 감지* (예: `pyproject.toml` 발견 시 Python exclude set 추가) 도 동작에 포함.

### P1

#### 5. `.agent-output/show-me/project-profile.json` 과 M2 산출물의 디렉터리 충돌 (M2 review §5 와 동일)

```
.agent-output/show-me/
  ├── project-profile.json    ← M4 캐시 (영구)
  ├── 2026-05-19-design/      ← M2 산출물 (일회성)
  └── ...
```

사용자가 `rm -rf .agent-output/show-me/*` 청소 → 영구 캐시까지 날아감.

→ **권장**: M4 캐시는 `.agent-output/show-me/_cache/`, M2 산출물은 `.agent-output/show-me/reports/`.

#### 6. 문서 목록 변경 감지의 빈도·범위 미정

§"오래된 프로필 처리" 자동 rebuild 조건:
- 참고한 루트 MD 변경
- 참고한 `docs/meta` MD 변경
- 추가 / 삭제

discord_chatbot 사용 패턴: ADR 신규 추가가 흔함 (지난 5 일 동안 ADR 0007, 0008, 0009 추가). 매번 rebuild 가 가치 있는가? — *프로젝트 규칙 자체* 가 바뀐 게 아니라 *코드 결정* 이 추가된 것일 수 있음.

→ **권장**: rebuild trigger 를 *내용 hash 변경* 으로 좁힘 (mtime 만으로는 over-rebuild). 추가/삭제는 *루트 MD 또는 `docs/meta` 직속* 만 (하위 디렉터리 추가는 trigger X).

#### 7. "역할 이름" 의 enum / 예시 부재

§"프로젝트 프로필" 마지막 줄: "GitHub PR, Discord, ClickUp 같은 외부 협업 출처의 역할 이름". 예시·enum 부재.

discord_chatbot 의 경우:
- GitHub PR: *코드 강결합 결정 layer*
- Discord: *협업·운영 결정 layer*
- ClickUp: *task layer*

이 *역할* 이 project-profile 에 어떻게 표현되는가? `{"name": "discord", "role": "collaboration"}` 또는 더 구체? M3 의 자연어 컨텍스트가 *어느 역할 layer 에 가야 하는가* 의 hint 로 쓰일 수 있는데 형식 미정.

→ **권장**: enum 예시 3-5 종 (`collaboration / code_decision / task / issue_tracker / runtime_config`) + project-profile 의 JSON schema 1 줄.

#### 8. 외부 협업 도구 *역할* 이 어떻게 발견되는가? (자동 vs 수동)

§"규칙 찾는 순서" + §"프로젝트 프로필" 어디에도 *역할 이름* 의 *발견 방법* 미명시. 가능한 방법:

- (a) writing-guide / CLAUDE.md 안의 자연어 mention 자동 추출 (LLM 호출 필요)
- (b) 사용자가 전용 설정 파일에 수동 명시
- (c) `.github/` 디렉터리 존재 → GitHub PR, `discord.py` import → Discord 등 heuristic

discord_chatbot CLAUDE.md 는 "Discord 협업 layer", "ClickUp task" 를 평문으로 적었지만 *machine readable* 표기 아님.

→ **권장**: 1 차는 (b) 수동 명시 only. 자동 발견은 후순위.

### P2

#### 9. project-profile.json 의 schema 미정

§"프로젝트 프로필" 의 7 종 정보 (믿을 수 있는 경로 / 임시 경로 / 생성 표시 / 기본 출력 / 특별 문서 메모 / 외부 역할) 만 enum 으로 적힘. JSON schema 또는 예시 부재.

→ **권장**: 예시 1 개 (discord_chatbot 기준 30 줄 JSON) 본문에 포함.

#### 10. M4 의 *show-me 전용 설정 파일* 위치·이름 미정

§"규칙 찾는 순서" 4 단계: "show-me 전용 설정 파일을 둘 수 있다." 파일명 / 위치 미정.

→ **권장**: `.show-me.toml` 또는 `.show-me.json` 루트, project-profile 의 *입력* 역할.

#### 11. dogfood 부재 (M1 review §7 와 동일)

본 M4 doc 자신이 frontmatter 도 block id 도 없음.

→ **권장**: 4 개 milestone doc 모두 frontmatter (`id`, `type: milestone`, `status`, `updated`) 추가.

## discord_chatbot 적용성 평가

| 항목 | 호환성 | verified 정보 |
|---|---|---|
| 루트 MD 인식 | ⚠️ stub 패턴 미인지 | AGENTS.md = 1 줄 stub, GEMINI.md = 1 줄 stub. canonical 은 CLAUDE.md (verified) — P0 #2 |
| docs/meta 인식 | ✅ | writing-guide.md 의 SSoT 표가 정확히 M4 의 target |
| docs/adr 누락 | ❌ | ADR-0005 (snapshot auto-dump), ADR-0006 (whitelist runtime SSoT) 같은 invariant 가 ADR 에 박힘 — P0 #3 |
| `data/whitelist.json` runtime SSoT | ❌ | M4 는 markdown 만 봄 — ADR-0006 의 invariant 가 *Markdown 외 SSoT* 임을 인식 X |
| `.venv/`, `.claude/worktrees/` 제외 | ❌ | M1 의 hardcoded exclusion 에 없고 M4 도 *language/tool 감지* 없음 — P0 #4 |
| Discord / ClickUp / GitHub 역할 | ⚠️ enum 부재 | CLAUDE.md 가 *3 계층 모델* 평문으로 적음 — M4 가 자동 추출하려면 NLP 필요. 수동 명시 only 가 현실 — P1 #8 |
| 갱신 빈도 | ⚠️ over-rebuild | ADR 추가가 잦음 (5 일에 3 개). 하위 디렉터리 추가까지 trigger 면 매일 rebuild — P1 #6 |

## MVP 추가 정정 제안

1. **P0 #1 milestone 순서 재배열**: M4-A (rules discovery 부분) → M1 → M2 → M3 → M4-B (외부 협업 역할 + 캐시 infra). 또는 M4 의 *최소 부분* 을 M1 안에 흡수.
2. **P0 #2 stub 인식**: 루트 MD 가 N 줄 이하 + 다른 MD reference 면 stub. transitive 따라감.
3. **P0 #3 docs/adr 추가**: 검색 대상 2.5 단계. frontmatter `status: accepted` + 제목 + 처음 N 자만 인덱싱.
4. **P0 #4 Python / Claude Code 디렉터리 exclusion**: `.venv/`, `__pycache__/`, `.claude/worktrees/`, `.claude/scratch/` 추가. M4 가 *언어/툴 감지* 동작에 포함.
5. **P1 #5 디렉터리 분리**: `.agent-output/show-me/_cache/` (M4) vs `_cache/show-me/reports/` (M2).

## 문서에서 모호하거나 고쳐야 할 섹션

| 위치 | 문제 | 권장 |
|---|---|---|
| §"목적" "외부 협업 도구와 연결되기 전에 먼저" | 순서 명시 좋음, 단 M1 보다 *뒤* 인 모순 미언급 | M4 의 *최소 부분* 이 M1 의 전제조건임을 명시 |
| §"규칙 찾는 순서" 1 단계 "루트에 있는 MD" | stub 패턴 미인지 | stub 인식 정책 추가 (P0 #2) |
| §"규칙 찾는 순서" 누락 — `docs/adr/` | ADR 의 invariant 인식 불가 | 2.5 단계로 추가 (P0 #3) |
| §"규칙 찾는 순서" 누락 — Python / Claude Code 디렉터리 | M1 exclusion 의 보완 부재 | `.venv/`, `.claude/` 등 명시 |
| §"프로젝트 프로필" 위치 `.agent-output/show-me/project-profile.json` | M2 산출물과 같은 부모 디렉터리 | `_cache/` 하위 (P1 #5) |
| §"프로젝트 프로필" 7 종 정보 | schema 부재 | 예시 1 개 (discord_chatbot 기준 30 줄 JSON) |
| §"오래된 프로필 처리" rebuild trigger | over-rebuild 위험 | content hash + 루트/`docs/meta` 직속만 trigger (P1 #6) |
| §"오래된 프로필 처리" 자동 rebuild 출력 예 | (강점, 유지) | — |
| §"완료 기준" "외부 통합보다 프로젝트 문서 규칙을 먼저 읽는다" | M1 보다 *뒤* 인 모순 | M4 의 *최소 부분* 이 M1 의 전제 명시 (또는 순서 재배열) |
| §"완료 기준" "외부 협업 도구는 역할만 기록" | enum 부재 | 역할 enum 예시 5 종 |

## 최종 판단

**Approve with changes.**

단계 분리 (외부 협업 도구는 *역할만*, API 연동 후순위) + 캐시 정책 (Markdown SSoT 보호, mtime/hash 자동 갱신, 갱신 이유 표시) + 점진적 source (루트 → docs/meta → 도구 전용 → 전용 설정) 의 *방향* 은 선행 리뷰의 핵심 P0 들 (writing guide 먼저 읽는다 정책, SSoT 보호) 을 가장 정직하게 흡수.

그러나 (a) M4 → M1 순서 모순 — M1 의 hardcoded exclusion 으로 굳히면 discord_chatbot 처럼 자생 layer 가 분화된 환경에서 깨진다, (b) AGENTS.md / GEMINI.md redirect-stub 패턴 미인지 — verified 1 줄 stub 을 *유용한 신호* 로 다루면 정보 0, (c) `docs/adr/` 누락 — ADR-0006 같은 runtime invariant 가 인식 불가, (d) `.venv/` + `.claude/worktrees/` 미제외 — Python/Claude Code 프로젝트에서 dependency MD 100+ 가 manifest 오염, 이 4 가지가 닫혀야 출시 가능.

---

## Appendix — 4 개 milestone review 종합 결론

| milestone | verdict | 핵심 미반영 | discord_chatbot 적용성 차단 요인 |
|---|---|---|---|
| M1 Discovery | approve with changes | 매칭 알고리즘 / match_strength 결정 규칙 / abstract fallback | handoff 폴더 매칭, scratch 디렉터리 다양성, `.venv/` 미제외 (M4 review P0 #4) |
| M2 Static HTML | approve with changes | 출력 디렉터리 이름 불일치 (strategy `dist/` vs M2 `.agent-output/`), Windows path | Windows broken link (Windows 환경 무시) |
| M3 NL Review Loop | approve with changes | strategy §5.3 supersede 명시 부재, anchor deopt, *나중 에이전트* owner 미정 | (자동 차단 없음 — 모든 외부 layer 와 *한 번 더 사람 손* 디자인) |
| M4 Project Rules | approve with changes | M4 → M1 순서, stub 미인지, docs/adr 누락, `.venv/` 누락 | stub 인 AGENTS.md/GEMINI.md 를 유용한 신호로 다루면 정보 0 |

**4 개 milestone 공통 권장사항**:

1. **순서 재배열**: M4-A (최소 rules discovery) → M1 → M2 → M3 → M4-B (외부 협업 역할 + 캐시 infra).
2. **출력 디렉터리 통일 + 분리**: strategy doc 의 `dist/show-me/` 를 supersede, 모든 milestone 이 `.agent-output/show-me/` 사용. 단 `_cache/` (영구) 와 `reports/` (일회성) 분리.
3. **Strategy doc supersede ADR**: M3 의 자연어 결정이 strategy §5.3 review patch YAML 을 뒤집는 결정의 ADR 적 기록.
4. **dogfood**: 4 개 milestone doc 모두 frontmatter (`id`, `type: milestone`, `status`, `updated`) 추가. 자기 자신이 `/show-me` 의 첫 입력.
5. **measurement gate**: 모든 milestone §"완료 기준" 에 정량 항목 1 개 이상. M1 = match hit rate, M2 = OS 별 link 동작, M3 = 자연어 의견 → markdown 수정 *수동 검증* 성공률, M4 = stub 인식 정확도.

이 5 가지를 본 milestone 4 종에 반영하면 *PRD 작성 진입 가능* 상태가 된다. 현재는 (1) milestone 순서 모순과 (2) strategy doc 과의 명시적 supersede 부재 두 가지가 PRD 의 핵심 결정을 *불명확* 한 상태로 굳히는 위험이 있다.
