---
id: md-show-me-milestone-2-static-html-report-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-2-static-html-report
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_reviews:
  - md-show-me-skill-strategy.discord-chatbot.review.md
  - md-show-me-milestone-1-discovery.discord-chatbot.review.md
updated: 2026-05-19
status: needs-revision
verdict: approve-with-changes
---

# Review — Milestone 2: Static HTML Report (discord_chatbot 통용성 관점)

대상: `docs/md-show-me-milestone-2-static-html-report.md`. M1 manifest 를 받아 *읽기 전용* 정적 HTML 리뷰 화면을 만드는 단계.

---

## 총평

선행 리뷰의 P0 #3 (출력 경로의 git 정책) + 두 review 의 SSoT 보호 권고를 가장 정직하게 반영했다 — *전체 문서 렌더링은 옵션으로도 지원하지 않는다* (§"전체 문서 렌더링 제외") 라는 강한 정책, *읽기 전용 — 리뷰 입력은 M3 로 분리* 라는 스코프 절제, *프로젝트의 임시 출력 위치 우선 / fallback `.agent-output/show-me/<slug>/`* 라는 cross-project 적응성. 그러나 (1) 출력 디렉터리 이름이 strategy doc §5.1 `dist/show-me/<slug>/` 와 본 M2 의 `.agent-output/show-me/<slug>/` 로 **불일치**, (2) M4 가 정의하는 *프로젝트 임시 출력 위치* 를 M2 가 어떻게 *현재 시점에* 알 수 있는가 의존성 누락, (3) **Windows path 표준화 회피로 discord_chatbot 환경에서 첫 사이클부터 broken link** 가능. 결론: **approve with changes** — 스코프 절제는 모범적이지만 외부 의존성과 OS path 문제를 닫아야 출시 가능.

## 강점

- **§"전체 문서 렌더링 제외" 의 강한 정책**: "기본값만의 문제가 아니다. 옵션으로도 지원하지 않는다" — SSoT 보호의 단호한 표현. 선행 리뷰의 "HTML 이 또 다른 원본처럼 취급됨" 위험을 코드 수준에서 막음.
- **§"화면 수준" 의 정성적 절제**: "대시보드는 아니다. 통계, 여러 패널, 검색창, 정렬 메뉴는 넣지 않는다" — feature creep 미연 차단. comfyui 리뷰의 "6 개 템플릿 동시 도입" 과 정반대 방향 (좋음).
- **§"출력 위치" 의 cross-project 적응**: "프로젝트에서 이미 정한 임시 output directory 가 있으면 그곳" 1 순위 + "없으면 `.agent-output/show-me/<slug>/`" — 선행 리뷰 §6.1 의 `.claude/scratch/` 우선 매핑 권고에 호응.
- **§"출력 위치" 의 git 정책 명시**: "이 위치는 ignored output 으로 취급한다. 보통 git 에 커밋하지 않는 생성 결과물이다" — 선행 P0 #3 의 핵심 답. (단 정책만 적고 `.gitignore` 자동 등록 동작은 미정 — P1)
- **§"문서별로 보여줄 내용" 7 종** (title / abstract / selection reason / source link / major headings / short excerpts): 다른 doc 들이 1-2 줄로 흘려 적은 *섹션 contract* 를 명시 enum. M3 와의 인터페이스 안정성 확보.
- **§"원본 참조 방식" 의 source link 옆 heading 표기**: `docs/example.md` - `설계 배경` 형식 — anchor 검증과 연결될 표면.

## 주요 우려사항

### P0

#### 1. 출력 디렉터리 이름 불일치 (strategy `dist/` vs M2 `.agent-output/`)

선행 strategy doc §5.1 은 권장 출력 위치를 `dist/show-me/<slug>/` 로 적었다. 본 M2 §"출력 위치" 는 `.agent-output/show-me/<slug>/`. **같은 디렉터리를 두 doc 이 다른 이름으로 부른다**. 추가로 M4 §"프로필 위치" 가 `.agent-output/show-me/project-profile.json` 으로 M2 의 *fallback* 과 같은 부모 — M4 캐시 위치는 M2 산출물 디렉터리에 *섞여* 들어간다 (별도 P1 — 아래 #5).

선행 리뷰 §6.1 이 권고한 *프로젝트 임시 디렉터리 우선 매핑* (예: discord_chatbot 의 `.claude/scratch/`) 은 §"출력 위치" 1 순위로 흡수됐지만, fallback 이름이 strategy 와 불일치하면 *어느 게 canonical?* — 4 개 milestone 가 일관되게 `.agent-output/` 이지만 strategy 는 `dist/`. **strategy doc 을 M2 와 정합시키는 supersede 결정** 또는 *M2 가 strategy 와 다른 결정을 한 이유* 의 ADR-style 기록 필요.

#### 2. M4 의 "프로젝트 임시 출력 위치" 를 M2 가 어떻게 인식?

§"출력 위치" 1 순위: "프로젝트에서 이미 정한 임시 output directory 가 있으면 그곳". 그러나 *어디서 인출하는가* 0 줄. M4 의 project-profile 이 이 정보를 가지지만 **M4 가 M2 보다 나중**. 즉 M2 출시 시점엔 *어떤 디렉터리가 "프로젝트가 정한"* 임시 위치인지 인식 메커니즘이 없다.

가능한 동작:
- (a) `.gitignore` 를 파싱해 untracked 디렉터리 후보를 찾는다 — heuristic, brittle
- (b) 알려진 이름 (`.claude/scratch/`, `tmp/`, `build/`) hardcoded list — 새 프로젝트마다 수정
- (c) M2 출시는 *fallback 만* 작동, "프로젝트 임시 위치" 인식은 M4 완료 시점에 활성화 — M4 → M2 순서 의존

§"출력 위치" 가 (c) 를 *명시하지 않고* "있으면 그곳" 만 적어 출시 동작이 *암묵 (a) 또는 (b)* 로 흘러갈 위험.

→ **권장**: §"출력 위치" 에 "이 인식은 M4 완료 후 활성화. M2 단독 출시 시는 fallback 만 사용" 명시. 또는 M2 → M4 → 재방문 흐름.

#### 3. Windows path 표준화 회피로 discord_chatbot 환경에서 broken link

§"원본 참조 방식": "운영체제별 path 표준화는 이번 milestone 의 목표가 아니다. Windows backslash 를 slash 로 바꾸는 세부 처리는 나중의 UX 개선에서 다룬다."

문제: discord_chatbot 환경은 Windows 11 (verified: env "Platform: win32"). HTML `<a href="docs\example.md">` 는 *브라우저가 `docs\example.md` 를 단일 토큰 파일명으로 해석* → 404. Windows path 처리가 *나중 UX 개선* 이라면 M2 의 §"완료 기준" *"source link"* 항목이 Windows 에서 *기능 미작동* 임에도 *완료* 로 통과된다.

선행 리뷰가 cross-project 통용성을 핵심 제약으로 설정했고 discord_chatbot 이 Windows 라는 사실은 *프로젝트 사실* — 이를 알면서도 "나중 UX 개선" 으로 미루는 것은 *주요 사용 환경 무시*.

→ **권장**: §"원본 참조 방식" 에 "URL 생성 시 path separator 를 `/` 로 정규화 (Windows 호환). 그 외 OS 별 차이 (drive letter 등) 는 나중 UX 개선" — 정규화 한 줄만 1 사이클에 포함.

### P1

#### 4. excerpt 정의 미정

§"문서별로 보여줄 내용" 의 "short excerpts" 와 §"화면 수준" 의 "사용자가 문서의 방향을 파악할 수 있을 만큼만 짧게" — *짧음의 기준* 0. 문장 수? 자수? 첫 문단? heading 별 첫 문장?

discord_chatbot 의 ADR-0005 같은 문서는 첫 문단이 200+ 자이고 의미적으로 *context 의 한 줄 요약* 이 아니다. excerpt 알고리즘에 따라 사용자가 받는 정보가 크게 달라짐.

→ **권장**: "heading 별 첫 문장 (최대 80 자)" 같은 1 줄 명세.

#### 5. M4 project-profile 캐시와 M2 산출물의 디렉터리 충돌

M2 fallback: `.agent-output/show-me/<slug>/`. M4 project-profile: `.agent-output/show-me/project-profile.json`. 즉:

```
.agent-output/show-me/
  ├── project-profile.json    ← M4 캐시 (영구, mtime 기반 갱신)
  ├── 2026-05-19-design/      ← M2 산출물 (일회성)
  ├── 2026-05-19-handoff/
  └── ...
```

사용자가 `.agent-output/show-me/` 를 `rm -rf` 로 청소하면 *영구 캐시까지 날아감*. 캐시 무효화 → next run 의 rebuild 비용. 분리 필요.

→ **권장**: M4 캐시는 `.agent-output/show-me/_cache/`, M2 산출물은 `.agent-output/show-me/reports/<slug>/`. 분리.

#### 6. "프로젝트의 임시 출력 위치" 자동 `.gitignore` 등록 동작 미정

§"출력 위치" 가 "ignored output 으로 취급한다" 정책은 명시했지만, *`.agent-output/show-me/` 을 `.gitignore` 에 자동 추가하는가* 의 동작 미정. 사용자가 첫 실행 후 *commit 했더니 `.agent-output/` 이 staged* 라는 경험은 흔함.

→ **권장**: M2 첫 실행 시 `.gitignore` 의 *프로젝트 임시 위치 또는 fallback* 자동 등록 + 사용자에게 알림.

#### 7. "깔끔한 HTML 화면" 의 정성적 기준 (§"화면 수준", §"완료 기준")

§"완료 기준" 의 "선택된 각 문서를 깔끔한 HTML 리뷰 화면에 보여준다" — 측정 불가. 사용자 합격 / 불합격 어떻게 판단?

→ **권장**: 완료 기준에 객관적 항목 추가:
- 각 문서 섹션에 title / abstract / reason / source link / 최소 1 개 heading / 최소 1 개 excerpt 포함
- 브라우저 console error 0
- Windows + macOS + Linux 에서 source link click 동작 (P0 #3 와 묶음)

### P2

#### 8. abstract 가 없는 문서의 "Milestone 1 manifest 에 들어 있는 fallback 정보" 가 무엇인지 M1 doc 과 일관 검증 안 됨

§"문서별로 보여줄 내용" "abstract 가 없는 문서는 Milestone 1 manifest 에 들어 있는 fallback 정보를 사용한다" — M1 §"Abstract 처리" 가 *fallback 을 생성한다* 고 적었지만 그 결과를 manifest 에 넣는다는 *언급은 M1 doc 에 없음*. M1 §"Manifest 내용" 의 "`abstract` 가 있으면 포함" 은 *원본의 abstract 만* 의미. fallback 생성 결과가 manifest 에 들어가는지 *M1 doc 이 명시 안 함*.

→ **권장**: M1 doc §"Manifest 내용" 에 "abstract 가 없으면 fallback 생성 결과를 같은 필드에 저장 (출처는 `abstract_source: original | fallback`)" 명시.

#### 9. major headings 의 갯수 미정

§"문서별로 보여줄 내용" "major headings" — 모든 h1/h2? h2 만? 최대 N 개?

→ **권장**: "최대 5 개 h2 (또는 h1 이 없으면 h1)" 1 줄.

## discord_chatbot 적용성 평가

| 항목 | 호환성 | 주의 |
|---|---|---|
| 출력 위치 1 순위 (프로젝트 임시) | ⚠️ M4 의존 | `.claude/scratch/show-me/<slug>/` 가 자연스러운 매핑이지만 M2 가 *그곳* 을 어떻게 알지는 M4 가 답함. M2 단독 출시 시 fallback `.agent-output/` 사용. |
| fallback `.agent-output/show-me/` | ⚠️ `.gitignore` 갱신 | discord_chatbot `.gitignore` 미확인. 새 디렉터리가 untracked 로 들어오면 git status noise. |
| source link OS path | ❌ Windows broken | P0 #3 |
| AUTO-GENERATED 문서 (snapshot.md) excerpt | ⚠️ excerpt 의도 vs 자동 dump 내용 | snapshot.md 자체는 M1 제외 대상이라 M2 에 도달 X — 사용자가 명시 query 로 포함시킨 경우만 문제. 그 케이스에 excerpt 가 "AUTO-GENERATED by ..." 줄을 잡으면 의미 0 |
| handoff/research/adr 의 excerpt 균질성 | ⚠️ 문서 양식 다양 | discord_chatbot 의 ADR (Context / Decision / Consequences 구조), research (목차 자유), handoff (시도 1/시도 2 구조) 가 모두 다른 heading 패턴. major headings 추출 결과의 *의미적 일관성* 보장 미정 |

## MVP 추가 정정 제안

1. **P0 #1 supersede 결정**: strategy doc §5.1 의 `dist/show-me/<slug>/` 를 M2 의 `.agent-output/show-me/<slug>/` 로 통일. supersede 명시 (ADR-style 결정 기록).
2. **P0 #3 Windows path 정규화** 를 1 사이클에 포함. 한 줄 코드.
3. **P1 #5 M4 캐시 / M2 산출물 디렉터리 분리** — `_cache/` vs `reports/`.

## 문서에서 모호하거나 고쳐야 할 섹션

| 위치 | 문제 | 권장 |
|---|---|---|
| §"범위" "프로젝트에서 정한 임시 출력 위치" | M2 가 인식 메커니즘 미정 | "M4 완료 후 인식 활성화. M2 단독 출시 시 fallback 만" |
| §"문서별로 보여줄 내용" "short excerpts" | 길이 미정 | "heading 별 첫 문장, 최대 80 자" |
| §"문서별로 보여줄 내용" "major headings" | 갯수 미정 | "최대 5 개 h2" |
| §"전체 문서 렌더링 제외" | (강점, 유지) | — |
| §"원본 참조 방식" "OS 별 path 표준화 나중" | Windows broken link | 1 줄 정규화 (`\\` → `/`) 1 사이클 포함 |
| §"출력 위치" 1 순위 인식 메커니즘 | 0 줄 | M4 의존 명시 또는 hardcoded list |
| §"출력 위치" `.gitignore` 자동 등록 | 미정 | 첫 실행 시 추가 + 사용자 알림 |
| §"완료 기준" "깔끔한 HTML 화면" | 정성적 | 객관 항목 (필드 충족 / 브라우저 error 0 / OS 링크 동작) |
| §"문서별로 보여줄 내용" "Milestone 1 manifest fallback" | M1 doc 과 contract 불일치 | M1 §"Manifest 내용" 에 fallback 저장 정책 추가 |

## 최종 판단

**Approve with changes.**

스코프 절제 (전체 문서 렌더링 금지, 대시보드 금지, 읽기 전용) 와 출력 위치 정책 (ignored output 명시) 은 선행 리뷰의 SSoT 보호·git 정책 권고를 가장 정직하게 흡수. 그러나 (a) strategy doc 과 디렉터리 이름 불일치 — supersede 결정 필요, (b) M4 의존 누락 — *M2 단독 출시 시 fallback 만* 명시 필요, (c) Windows path 회피 — discord_chatbot 같은 Windows 환경에서 *완료 기준 자체가 동작 안 함* — 1 줄 정규화로 해소 가능, 이 셋이 닫혀야 출시 가능.
