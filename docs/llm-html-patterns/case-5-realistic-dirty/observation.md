# Observation — Case 5

## (a) 탐색 패턴

Glob → "특권 파일 Read" → Grep (검증) → "권위 파일 Read" → "보조 Read" → "negative check Read".

처음에 본능적으로 한 행동은 **Glob 으로 지형 파악**. 138개 경로가 한 번에 들어옴 — 디렉토리 이름만 봐도 `docs/adr/` (정형), `scratch/` `experiments/` `archive/` (비공식), `weekly/` `notes/` `team-notes/` (노이즈) 분류가 직관적. 두 번째는 `CLAUDE.md` 읽기. *어떤 repo 든 루트의 README/CLAUDE/CONTEXT 는 가장 신뢰도 높은 entry* 라는 prior 가 강함. Grep 은 *대안 경로 검증* 으로만 사용 — entry 파일에 답이 있으니 grep 결과는 후보 풀을 줄이는 게 아니라 *놓친 게 있는지* 확인.

## (b) 노이즈 처리

3 단계 필터: **경로 → 디렉토리 카테고리 → "deprecated" 마커**.

- 경로 단계: `weekly/2025-w03.md` 같은 패턴은 거의 자동 무시. `notes/idea-XXX.md` 도 동일.
- 카테고리: `scratch/perf-notes.md` 는 *읽긴 함* — origin 노트일 수 있으니. 반면 `scratch/note-007.md` (Grep 매치) 는 안 읽음.
- 명시적 deprecated: `archive/legacy-2023/perf-2023-q4-postmortem.md` 는 첫 줄 "DEPRECATED" 보고 즉시 종결.

False positive 빈도: Grep 28 매치 중 **약 18개는 즉시 무시** (디렉토리/파일명 만으로), 7개는 ADR/handoff 정답, 3개는 *"결정인지 확인 위해 읽음"*.

## (c) 토큰 사용량 추정

- Glob 출력: 138 경로 ≈ 8 KB ≈ 2,000 토큰
- Grep 출력: 28 파일명 ≈ 2 KB ≈ 500 토큰
- Read 13 파일 / 약 220 줄 ≈ 2,000 토큰
- **합계 입력 측 ≈ 4,500 토큰**

출력 (trace + html + observation) 약 4,000 토큰 추정. 총 ≈ 8,500 토큰. 모델 가격 기준 매우 저렴 — 단 *대형 dirty repo 에서 CLAUDE.md 안내 없으면 5~10x 확장* 가능 (Read 가 비싸짐).

## (d) 잘못 간 길

**진성 false trail = 0회**. 단 13~15 번 Read 3건은 *"진짜 결정인지 negative-check"* 비용. CLAUDE.md 가 ADR 번호를 직접 명시했기 때문 — 안내 없었다면 ADR 0001~0015 각각의 title 줄을 봐야 했고, scratch 파일 7~10개 추가 Read 가 거의 확실.

## (e) `md-show-me` 가 가장 가치 있는 단계

**Glob 직후, Grep 직전** 가 최고 ROI 지점. 이상적 산출물:

```yaml
authoritative_paths: [docs/adr/, docs/handoff/]
non_authoritative: [scratch/, experiments/, archive/, weekly/, notes/]
deprecated_markers: ["DEPRECATED", "<!-- AUTO-GENERATED -->"]
topic_index:
  performance: [ADR-0008, ADR-0011, ADR-0014, handoff/2025-02-perf-investigation.md, scratch/perf-notes.md]
```

이게 사전 제공되면 도구 호출 **15 → 5회** 수준. 핵심은 *"무엇이 authoritative 인가"* 와 *"주제별 ADR 색인"*. ADR 본문은 LLM 이 어차피 직접 읽어야 함 — *어떤 ADR 인지* 만 알면 됨.

CLAUDE.md 가 이미 그 역할을 일부 함. `md-show-me` 의 가치는 *CLAUDE.md 가 없거나 stale 할 때* 자동 생성/검증. 즉 도구 자체가 *팀이 CLAUDE.md 같은 "agent friendliness 지도" 를 자동 유지*하게 만드는 것.

## (f) Case 1~4 가정 vs 실제 행동 — 핵심 차이

Case 1~4 는 *"이미 가공된 메타데이터/리뷰 컨텍스트 한 덩어리"* 를 전제. 결정 트리: "이 50개 항목을 어떻게 정렬·시각화?".

Case 5 의 실제 행동: 모델은 **메타데이터를 받는 게 아니라 *만든다*** — Glob 138 → CLAUDE.md → Grep → "authoritative 후보 7개" 라는 *자체 색인* 을 구축. 이 색인은 *질문에 종속*. 다음 질문 ("보안 결정 보여줘") 에선 처음부터 다시 함.

핵심 차이 = **메타데이터 캐시 vs 매번 재탐색**. `md-show-me` 의 진짜 product 질문은 *"이 색인 단계를 한 번만 시키고 결과를 재사용하게 만들 수 있나?"* — 캐시 무효화는 git diff 기반이면 충분히 풀림. Case 1~4 의 "메타가 있다 치고" 는 *목표 상태*, Case 5 는 *현재 상태*. 둘 사이 갭이 `md-show-me` 의 가치 제안.
