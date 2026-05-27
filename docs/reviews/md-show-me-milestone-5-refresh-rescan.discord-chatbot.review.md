---
id: md-show-me-milestone-5-refresh-rescan-review-discord-chatbot
type: review-note
reviewer: claude (orchestrator)
target_document: md-show-me-milestone-5-refresh-rescan
cross_project_scope:
  - C:\Users\orix4\Desktop\ALL\Folder\yeonseok\work\project_oneul\discord_chatbot
prior_review: none (M5 신규)
updated: 2026-05-19
revision: 1
status: approve-with-minor-changes
---

# Review — md-show-me-milestone-5-refresh-rescan.md (discord_chatbot)

신규 milestone. 선행 revision 0 review 가 단일 `refresh` 의 모호함 (mtime 만 vs query 재해석) 을 지적했고, 그 해소가 *refresh / rescan 분리* 로 명시됨. §"차이" 의 2 줄 정의 ("refresh = 같은 source 목록, 최신 내용만 반영 / rescan = source 목록부터 다시 선택") 가 한 줄로 두 명령의 경계를 잡음.

## Verdict

**Approve with minor changes.**

분리 결정 자체는 강점. P0 0 건. 3 가지 후속 동작 명세 필요.

## P0

없음.

## P1

1. **§"Refresh" 가 M0 stale 체크를 누락** — §"Rescan" 1 번에만 "M0 profile이 stale이면 먼저 자동 갱신한다" 명시. refresh 도 *source 내용 재렌더* 하더라도 *role/exclude 규칙* 이 stale 하면 (예: 새 ADR 추가로 role pattern 변경) 잘못된 render 가능. discord_chatbot 환경에서 ADR 추가가 잦으므로 (verified: 최근 5 일 ADR 0007, 0008, 0009 추가) 발생 가능성 높음.
2. **§"완료 기준" "두 명령의 결과 차이가 사용자에게 표시된다" 의 형식 미정** — rescan 이 *전혀 다른 source set* 을 반환할 수 있는데 *무엇이 추가/제외* 됐는지 어떻게 표시할지 0. 사용자가 *어제 만든 manifest 와 비교* 하기 어려움.
3. **§"Refresh" 4 번 "heading/block이 깨졌으면 경고한다" 후 동작 미정** — 경고 후 (a) 빈 섹션? (b) last known good 캐시? (c) skip? 미정. 사용자가 *경고만 받고 뭐가 일어났는지 모름* 가능.

## 문서에서 고칠 위치

| 위치 | 문제 | 권장 |
|---|---|---|
| §"Refresh" 1 번 앞 | M0 stale 체크 누락 | "M0 profile이 stale이면 먼저 자동 갱신한다" 추가 (rescan / refresh 모두 M0 우선) |
| §"완료 기준" "결과 차이가 표시" | 형식 0 | "rescan 출력 첫 줄에 `Rescan diff: +N added, -M removed (since <last run>)` + 추가/제거된 path 목록" |
| §"Refresh" 4 번 깨진 source 후 동작 | (a)(b)(c) 미정 | "manifest 에 `status: source_unchanged | source_modified | source_missing | heading_missing` 추가 + report 에 경고 banner" |
| §"Rescan" M0 자동 갱신 시 reason 출력 | 미정 | "Profile refreshed: <reason>" 1 줄 (M0 §"Stale 처리" 출력 형식 재사용) |
| §"차이" 2 줄 정의 | (강점, 유지) | — |
| §"Refresh" 5 번 새 파일 자동 포함 X | (강점, 유지) | — |

## PRD 진입 가능 여부

**가능 (조건부).** 위 4 가지 minor 모두 PRD 작성 중 closeout 가능.

discord_chatbot 측 통용성: ADR / research / handoff 가 자주 추가되는 환경 — rescan 이 *예상 못한 새 source* 를 끌어올 가능성. *Profile refreshed reason* 1 줄이 사용자 surprise 를 차단. 단 P1 #1 (refresh 도 M0 stale 우선) 이 빠지면 *stale role pattern 으로 잘못된 render* 가 silent 하게 발생 — PRD 작성 전 반드시 닫아야 함.
