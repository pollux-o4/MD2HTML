# Prototype B2 · Case B — Dirty Repo Discovery

쿼리 한 줄 ("**리뷰**") 로 정리 안 된 138개 .md 에서 review 관련 문서를 찾아내는 시나리오.
**hard cut 없는 agent loop + 사용자 통제 가능한 인터랙티브 HTML** 을 검증한다.

## 실행

`index.html` 을 그냥 브라우저로 연다. 빌드 도구 없음.

## 파일 구성

- `mock-repo/` — 138개 .md 가 24개 dirty 폴더에 분산.
  frontmatter 거의 없음, naming 일관성 없음 (`TODO.md`, `note-003.md`, `untitled.md`, `2024-05-12.md` 등 섞임).
- `mock-data.js` — 138개 메타 + BM25/embedding 점수 시뮬레이션 + agent trace 데이터.
- `index.html` / `style.css` / `app.js` — UI + agent loop 컨트롤러.
- `_gen-mock-repo.js` — mock-repo 와 mock-data.js 를 다시 생성하는 1회용 스크립트 (`node _gen-mock-repo.js`).

## Agent loop (5단계)

| # | 단계 | 어디서? | 결과 |
|---|------|---------|------|
| 1 | BM25 1차 (동의어 확장: review, 리뷰어, peer review, post-mortem, 회고...) | sub-agent | 약 35~45개 hit |
| 2 | Embedding 2차 정렬 (+ recall fan-out 8개) | sub-agent | 50개 안팎 후보, 점수 분포 도출 |
| 3 | LLM 자체 평가: "0.55 이상 군집이 충분한가?" | sub-agent | "충분함 / 사용자가 cut-off 직접 조절" |
| 4 | (Optional) 추가 탐색 — 사용자가 "더 탐색해줘" 누를 때만 | sub-agent | 동의어 부스트로 4개 정도 추가 |
| 5 | 큐레이션 → main agent 에 카드 메타만 반환 | sub-agent → main | 본문 raw 는 main context 진입 X |

UI 상단의 "Agent loop trace" 토글로 단계별 trace 와 "parent 격리" 배지를 확인할 수 있다.
sub-agent 내부 로그는 `console.log` 로 분리 출력 — main agent (= 화면의 사용자 UI) 는 카드 메타와 점수만 본다.

## 왜 hard cut (top-N) 보다 슬라이더가 나은가

- **dirty repo 는 점수 분포가 bimodal 이 아닐 때가 많다.** review 군집과 노이즈 사이가 애매하게 섞이는 구간이 생긴다.
- **top-10 같은 고정 cut 은 "관련 있을 수도 있는" 11번째를 자른다.** 사용자가 직접 cut-off 슬라이더를 움직이면, 점수 분포를 눈으로 보면서 잘리는 경계를 통제할 수 있다.
- **agent 가 "더 봐야 하나?" 판단을 사용자에게 위임한다.** "더 탐색해줘" 버튼은 LLM 의 추가 round-trip 을 명시적으로 trigger 한다 (silent 하지 않음).
- 점선 = cut-off, 점의 색 = review 군집(녹색) vs 노이즈(회색). 슬라이더를 움직이면 점이 흐려지고 카드 리스트가 즉시 갱신된다.

## Tarik 식 인터랙티브 요소

- **점수 분포 dot plot** — 후보 50개를 x=embedding 점수로 흩뿌림. 색으로 review 군집 가시화.
- **cut-off 슬라이더** — 점선 + 라벨이 즉시 따라옴. 카드 리스트 실시간 재계산.
- **카드 클릭 → 펼치기** — snippet 전체 노출.
- **copy-as-prompt 버튼** — "이 문서 더 자세히 분석해줘" prompt 를 클립보드에 복사 (메타 + 발췌 + 정해진 질문 3개 포함).
- **"더 탐색해줘" 버튼** — sub-agent 의 추가 round 시뮬레이션. 새로 들어온 카드는 노란색으로 깜빡임.
- **parent context delta 카운터** — sub-agent 가 main 에 넣은 토큰 추정치 (카드 메타만 계산, 본문 raw 제외).

## Console 에 뜨는 sub-agent trace

브라우저 devtools 콘솔 열면 sub-agent 단계가 그룹 로그로 찍힌다.
이건 의도적으로 "main agent 가 직접 보지 않는" 정보 — UI 의 trace 섹션이 main agent 에게 노출되는 요약본이다.
