---
id: md-show-me-milestone-5-refresh-rescan
type: milestone
status: auto-flow-revised
updated: 2026-05-26
---

# md-show-me Milestone 5: Lazy mtime + size Check + Auto Re-render

## 목적

Milestone 5는 사용자가 직접 호출하던 갱신 명령을 **전부 없앤다**. 대신 `/show-me <쿼리>` 가 호출될 때마다 자동으로 도는 **lazy mtime + size check + auto re-render** 흐름으로 바꾼다.

기존에 따로 있던 `/show-me refresh` 와 `/show-me rescan` 은 폐기한다. 사용자가 별도 명령을 외워서 부르는 부담을 덜고, 모든 갱신은 다음 `/show-me <쿼리>` 호출 때 *조용히* 자동으로 일어난다. (PRD Implementation Decision D3 참고.)

## 폐기된 명령

- `/show-me refresh` — **제거**
- `/show-me rescan` — **제거**

D3 (slash 명령 축소) 와 D2 (stale 감지를 lazy 로 단일화) 결정에 따라 두 명령 모두 사라진다. 남는 건 `/show-me` 와 `/show-me-setting` 두 개뿐이다.

## 자동 흐름: Lazy mtime + size Check + Auto Re-render

### Trigger 시점

사용자가 `/show-me <쿼리>` 를 부를 때마다 **매번** 자동으로 돈다. 사용자가 따로 할 일은 없다.

배경 watcher 도 두지 않는다 (PRD Out of Scope: "Background file watchers"). 매 호출 시점이 곧 검사 시점이다.

### 검사 항목

1. **M1 스캔 규칙 변경 감지**
   - `.show-me.toml` mtime / size 변경 (있을 때) → 다음 호출에서 role/exclude 규칙 새로 적용
   - `.gitattributes` mtime / size 변경 → exclude set 재계산
   - 신뢰 폴더의 `.md` 파일 추가 / 삭제 감지 → manifest diff 의 added/removed_sources
   - 별도 cache 파일 rebuild 는 없다 (profile.json 폐기). LLM 이 매 호출 새 규칙 적용

2. **M1 manifest source mtime / size 가 바뀌었는지**
   - 같은 slug 의 최신 `manifest.json` (M2 출력 위치) 과 그 slug 의 `_history/` 가장 최근 폴더 manifest 를 비교 (`stat` 한 번)
   - 바뀐 source 가 있으면 → 그 source 의 abstract + HTML 을 자동으로 다시 만든다

3. **Heading 이 깨졌는지**
   - 직전 manifest 가 참조하는 heading 이 현재 파일에서 사라졌는지 확인
   - 깨진 anchor 가 있으면 → dangling 가능성을 banner 로 표시

4. **신규 발견 — Unknown markdowns**
   - 신뢰 폴더 안에 있지만 role 분류가 안 된 새 `.md` 파일을 찾는다
   - 새 manifest 의 top-level `unknown_markdowns` 필드에 기록한다 (PRD D2)

### 자동 대응

- **History 보존**: 새 호출 시 기존 `index.html` + `manifest.json` 을 `_history/<ISO-timestamp>/` 로 옮긴 뒤 새 결과를 쓴다 (M2 출력 컨벤션).
- **Source re-render**: 바뀐 source 에 한해서만 다시 렌더한다. M2 HTML 생성 때 PRD D10 의 **head-preview agent loop** 를 그대로 쓴다 (re-render 도 같은 flow).
- **Manifest diff**: 직전 manifest (`_history/` 의 가장 최근) 와 새 manifest 의 차이 (`added_sources`, `removed_sources`, `changed_sources`) 를 계산해서 HTML 결과의 **manifest diff viewer** (PRD pattern library N+2) 에 표시한다.
- **Dangling 경고**: modal 이나 차단 dialog 없이 **lazy stale banner** (PRD pattern library N+6) 로 띄운다. 사용자가 클릭하면 새 페이지로 이동하거나 detail 을 펼치는 식이라 흐름을 끊지 않는다.

### Manifest diff 가 살아남는 이유

기존 `rescan` 명령의 산출물이었던 `added_sources` / `removed_sources` / `changed_sources` diff 는 **개념적으로 살아남는다**. 다만 별도 명령의 결과물이 아니라, lazy check 가 자동으로 만들어 낸 결과의 일부로 HTML 안에 자리잡는다.

- 표시 위치: M2 HTML 의 **manifest diff viewer (N+2)** 영역
- 알림 방식: **lazy stale banner (N+6)** — 조용히 알리고, 사용자가 원할 때 detail 을 확인

## 차이 (이전 vs 신규)

| 항목                 | 이전 (refresh / rescan)           | 신규 (lazy auto flow)                         |
| -------------------- | --------------------------------- | --------------------------------------------- |
| Trigger              | 사용자가 직접 호출                | `/show-me <쿼리>` 부를 때 자동                |
| 명령 수              | `/show-me`, `refresh`, `rescan`   | `/show-me` 하나로 통합                        |
| Source 목록 갱신     | `rescan` 만 처리                  | 매 호출마다 자동으로 확인                     |
| Source 내용 갱신     | `refresh` 만 처리                 | 매 호출마다 mtime + size diff 로 자동 처리    |
| Manifest diff        | `rescan` 출력                     | manifest diff viewer (N+2) 로 HTML 에 표시    |
| Dangling 경고        | 텍스트 경고                       | lazy stale banner (N+6) — 흐름 안 끊음        |
| 사용자 액션          | 명령 외워서 호출                  | 없음                                          |

## 완료 기준

- `/show-me <쿼리>` 호출 때마다 lazy mtime + size check 가 자동으로 돈다.
- `.show-me.toml` 또는 `.gitattributes` 가 바뀐 경우 사용자 손을 거치지 않고 다음 호출에 새 규칙으로 동작한다 (별도 rebuild 단계 없음 — profile cache 폐기).
- 바뀐 source 는 head-preview agent loop 로 자동으로 다시 렌더된다.
- 신규 / 삭제 / 변경된 source 가 manifest diff viewer (N+2) 로 HTML 에 떠오른다.
- heading 이 깨진 경우 lazy stale banner (N+6) 로 조용히 알린다 (modal 아님).
- 사용자가 수동으로 부르는 trigger 명령 (`refresh` / `rescan`) 은 더 이상 없다.
- lazy check 도중에 어떤 package 설치나 model 다운로드도 일어나지 않는다 (PRD D11).
- 새로 발견한 `.md` 파일은 새 manifest 의 top-level `unknown_markdowns` 필드에 들어간다 (PRD D2, profile cache 폐기).

## References

- **PRD Implementation Decision D2** — stale 감지를 lazy mtime + size check 하나로 합치고 `unknown_markdowns` 필드를 새로 둔다
- **PRD Implementation Decision D3** — `/show-me-refresh` / `/show-me-rescan` 을 빼고, 명령은 `/show-me` 와 `/show-me-setting` 두 개만 남긴다
- **PRD Implementation Decision D10** — head-preview + agent loop 는 re-render 때도 그대로 쓴다
- **PRD Implementation Decision D11** — zero install / zero network 가 기본값. lazy check 도 어떤 설치도 하지 않는다
- **PRD pattern library N+2** — manifest diff viewer 패턴 (added / removed / changed sources 표시)
- **PRD pattern library N+6** — lazy stale banner 패턴 (조용한 알림, 흐름 안 끊음)
- **Thariq / Karpathy 인터랙티브 HTML 정체성** — stale 을 발견해도 modal 이나 차단 없이 banner 로 띄우고, 사용자가 클릭하면 새 페이지로 이동하는 식. 별도 명령은 없다
- **Maya 페르소나 검증 결과** — 별도 갱신 명령을 도입하면 consciousness moments 가 2.67 에서 0.33 으로 떨어진다는 데이터가 이 자동 흐름 결정의 직접 근거다
