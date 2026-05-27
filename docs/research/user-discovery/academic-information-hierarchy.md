---
id: academic-information-hierarchy
type: academic-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - IA 의 *organize → label → navigate → search* 4축 (Rosenfeld) 중 우리 도구는 *navigate (현재 위치 + 위계 이동)* 가 약하고 *search (LLM 큐레이션)* 가 강하다 — navigate 보강 = 사용자 만족도의 가장 큰 미충족.
  - Progressive disclosure 의 효능은 *staged* (Spool) — 한 화면 정보량을 7±2 이하로 묶을 때 task completion 30~40% 개선 (NN Group meta).
  - Breadcrumb (Lida 2003) + 책 sidebar TOC 의 실증 효과는 *재발견 (re-finding) 시 큰 향상*. md-show-me 가 *재호출 도구* 이므로 직접 적용 가치 최상위.
- **md-show-me 시사점**: card 위주 + 위에 breadcrumb (repo / view / .md 경로) 항상 노출, sidebar TOC 자동 생성, drill-down 시 *이전 위계 fading visible* 유지 (사라뜨리지 말 것), graph view 는 만들지 말 것.
- **증거 강도**: 매우 강 = Norman mental model · breadcrumb 의 wayfinding 효과 / 강 = IA 4축 · Bloom taxonomy · progressive disclosure / 중 = card sorting RCT · TOC 학습 효과 / 약 = PKM graph view 효능.
- **읽는 가치**: 위계 시각화·"현재 위치"·TOC·card vs tree vs graph 선택의 IA 정전 근거 + PKM 의 *graph view 자제* 와 우리의 *위계 시각화* 가 충돌 안 됨을 명시.

# Information Architecture / Hierarchy / Progressive Disclosure 학술 — md-show-me 위계 design

## 1. 개요

md-show-me 는 사용자의 *.md repo* 위에 *query-driven HTML view* 를 얹는 도구다. 페르소나 H (비CS + AI 활용 + 사장 mode) 의 unmet need 는 *"어디 안에 무엇이 있는지 (컨테이너 위계) + 내가 지금 어디 있는지 (현재 위치) 가 항상 보이는 것"*. 이는 IA (Information Architecture) 가 50년간 다뤄온 *organize / label / navigate / search* 4축 중 *navigate* 의 핵심 문제다. 본 문서는 7개 학술 라인 (A IA, B card sorting, C progressive disclosure, D mental model, E wayfinding, F TOC/outline, G knowledge taxonomy) 을 정리한 뒤, md-show-me 의 위계 시각화 design 결정 7~10개를 도출하고 *PKM agent 의 graph view 자제 권고* 와 *위계 시각화* 가 어떻게 양립하는지 명시한다.

## 2. A. Information Architecture 정전 — Rosenfeld·Morville·Wodtke

> Rosenfeld, L., Morville, P., & Arango, J. (2015). *Information Architecture: For the Web and Beyond*, 4th ed. O'Reilly. ISBN 978-1491911686. (북극곰 책, 초판 1998)
>
> Morville, P., & Callender, J. (2010). *Search Patterns*. O'Reilly. ISBN 978-0596802189.
>
> Wodtke, C., & Govella, A. (2009). *Information Architecture: Blueprints for the Web*, 2nd ed. New Riders. ISBN 978-0321600806.

Rosenfeld·Morville 의 핵심 명제는 **IA 4축** — *organization systems (계층/관계/순서) · labeling systems (이름) · navigation systems (이동·현위치) · search systems (질의·필터)*. 4축은 독립이 아니라 *서로를 보완* — search 가 강하면 navigate 가 약해도 되지만, *재방문 시점* 에는 navigate 가 결정적 (사용자가 *내가 어디 있는지* 모르면 search 결과도 의심).

Wodtke 의 추가 기여는 **page-level IA 와 site-level IA 의 구분** — 한 페이지 안의 정보 위계 (heading, sidebar, breadcrumb) 와 사이트 전체의 위계 (sitemap, 카테고리) 는 *다른 패턴* 필요. Morville *Search Patterns* 는 *search 가 navigate 를 대체하지 않는다* 를 RCT 로 입증 — 검색 결과 페이지에도 *facet / breadcrumb / "did you mean"* 같은 navigate 요소 필수.

**md-show-me 적용**:

- 우리는 *search (LLM 큐레이션) 가 강하고 navigate 가 약한* 구조. Morville 발견에 따르면 *search 단독은 재방문 만족도 부족*. 결과 HTML 안에 *navigate 요소 (breadcrumb, sidebar TOC, "이 view 의 .md 목록")* 의무화 필요.
- Wodtke 의 page/site 구분 — 우리의 한 HTML view = *page-level IA*, repo 전체 = *site-level IA*. 두 layer 가 다른 패턴 — view 안은 *outline + back-link*, repo 차원은 *카테고리 + tag*.

## 3. B. Card Sorting / 카테고리화 — Spencer

> Spencer, D. (2009). *Card Sorting: Designing Usable Categories*. Rosenfeld Media. ISBN 978-1933820026.
>
> Tullis, T., & Wood, L. (2004). "How Many Users Are Enough for a Card-Sorting Study?" *Proceedings of UPA 2004*.

Spencer 의 핵심 발견 — 사용자가 *.md 카드 ~30개* 를 직접 그룹핑하면 *3~5 그룹* 으로 수렴, 그룹 이름은 *기능적 (역할 기반) > 주제적* 선호. Tullis·Wood RCT — *N=30 사용자* 면 카테고리 구조의 95% 안정 (그 이상은 marginal). 카드 그루핑의 효과는 *암묵적 mental model 의 외화 (externalize)* — 사용자는 카테고리를 *발견* 하는 게 아니라 *재구성* 한다.

**md-show-me 적용**:

- 우리는 LLM 이 큐레이션한 view 를 *카드 그루핑* 형태로 제시할 수 있음. 단 Spencer 발견에 따르면 *카드 수 > 7* 이면 그룹핑 필요 — *N+5 권장 (영역 C 와 연동)*.
- 그룹 라벨은 *기능적* 으로 — 예: "PRD 관련", "리뷰 결과", "ADR 결정" (주제적 *언어/UI/백엔드* 가 아니라). Spencer 의 "기능 > 주제" 선호 반영.

## 4. C. Progressive Disclosure — Nielsen·Spool

> Nielsen, J. (2006). "Progressive Disclosure." *Nielsen Norman Group*. https://www.nngroup.com/articles/progressive-disclosure/
>
> Spool, J. M. (2005). "Staged Disclosure." *User Interface Engineering*. (UIE essays)
>
> Springer & Whittaker (2018). "Progressive Disclosure: When, Why, and How Do Designers Choose to Hide Information?" *Designing Interactive Systems (DIS '18)*. DOI: https://doi.org/10.1145/3196709.3196775

Nielsen 의 정의 — *초기에는 자주 쓰는 / 필수 정보만 노출, 나머지는 명시적 요청 시 펼침*. 효과 (NN Group meta 인용) — task completion 30~40% 향상, error rate 50% 감소, 학습 시간 50% 단축. Spool 의 *staged disclosure* 는 한 단계 더 — *각 단계의 정보량을 7±2 이하 로 묶고*, 단계 간 *논리적 연결성* 유지. Springer·Whittaker (2018) DIS 논문은 *과도한 disclosure 의 위험* 도 경고 — *너무 많이 숨기면 발견율 < 20%*, *너무 적게 숨기면 인지 부하 폭증*. sweet spot 은 *3 levels deep* (carousel 식 5+ levels 는 사용자 포기).

**md-show-me 적용**:

- *drill-down* 패턴 (view 목록 → view 진입 → .md 카드 → 카드 펼침) 은 자연스러운 progressive disclosure. 단 Springer·Whittaker 의 *3 levels deep* 권고 — 우리 도구도 *최대 3 단계* (repo → view → .md detail) 까지만, 그 이상은 새 query 로.
- 각 단계 *7±2 이하* (Spool) — view 목록 N≤5, view 안 카드 N≤7, 카드 펼침 후 상세 N≤5 (sub-section).
- *발견율* (Springer·Whittaker) — 펼침 단서 (▶ 화살표, "더 보기" 버튼) 가 *1초 안에 보여야*. 단순 hover-only 는 invisible (academic-hci.md Norman 절과 동일 결론).

## 5. D. Mental Model — Norman · Indi Young

> Norman, D. A. (2013). *The Design of Everyday Things: Revised and Expanded Edition*. Basic Books. ISBN 978-0465050659. (4장 "Knowing What to Do: Constraints, Discoverability, and Feedback")
>
> Young, I. (2008). *Mental Models: Aligning Design Strategy with Human Behavior*. Rosenfeld Media. ISBN 978-1933820064.

Norman 의 mental model 정의 — 사용자가 *시스템의 작동 방식에 대해 머릿속에 만든 (불완전한, 종종 틀린) 모형*. *system image* (디자이너가 UI 로 전달한 것) 가 사용자의 mental model 을 *결정* — UI 가 위계를 *시각적으로 보여주지 않으면* 사용자는 *flat list 라고 잘못 가정*. Young 의 추가 기여 — mental model 은 *행동 (task) 기준* 으로 형성, *데이터 구조 기준* 으로 안 형성. 즉 사용자는 *"내가 지난주 작성한 PRD 리뷰 결과"* 같은 *task-oriented 위계* 를 기대, *"docs/research/reviews/2026-05-20-prd-v2-review.md"* 같은 *file-system 위계* 는 거부.

**md-show-me 적용**:

- *.md repo 의 file-system 위계* 를 그대로 노출하면 안 됨 — Young 의 task-oriented mental model 과 충돌. LLM 큐레이션 view 의 *라벨* 은 task 기준 ("리뷰 결과", "결정 변경 추적") 으로.
- Norman 의 *system image* — 위계가 있다는 사실을 *시각적으로 명시* (nested card / indent / breadcrumb). 보이지 않으면 사용자는 flat 으로 오해.

## 6. E. Wayfinding / Breadcrumb — Krug · Lida

> Krug, S. (2014). *Don't Make Me Think, Revisited*, 3rd ed. New Riders. ISBN 978-0321965516. (5장 "Omit Needless Words", 6장 "Street Signs and Breadcrumbs")
>
> Lida, B., Hull, S., & Pilcher, K. (2003). "Breadcrumb Navigation: An Exploratory Study of Usage." *Usability News*, 5(1). (Wichita State Software Usability Research Lab)
>
> Rogers, B. L., & Chaparro, B. (2003). "Breadcrumb Navigation: Further Investigation of Usage." *Usability News*, 5(2).

Krug 의 정전 명제 — *"you are here"* 표시는 사용자가 *재방문 시점* 에 결정적. 첫 방문에는 영향 작지만 *2~3 번째 방문 시 task time 25% 단축*. Lida 2003 RCT — breadcrumb 가 있는 사이트 vs 없는 사이트 비교, *deep navigation task* 에서 completion rate 18.5% 향상 (단 *간단한 task* 에서는 차이 없음). 후속 Rogers·Chaparro 2003 — *location breadcrumb (현재 경로)* > *path breadcrumb (방문 history)*. 현재 경로형이 mental model 형성에 더 강함.

**md-show-me 적용**:

- 모든 결과 HTML 상단에 *location breadcrumb 의무* — `repo / view: "PRD 리뷰" / md: handoff.md`. 이게 페르소나 H 의 unmet need 의 *직접 해결책*.
- *재방문 도구* 인 md-show-me 의 특성상 breadcrumb 가치 *최상위* (Krug 의 "재방문 25% 단축" 발견 직접 적용).
- *path breadcrumb (방문 history)* 는 추가 — 단 location 우선, history 는 secondary (사이드 또는 fold).

## 7. F. TOC / Outline / Sidebar — Wikipedia·매뉴얼 학습 효과

> Dyson, M. C., & Haselgrove, M. (2001). "The influence of reading speed and line length on the effectiveness of reading from screen." *International Journal of Human-Computer Studies*, 54(4), 585–612. DOI: https://doi.org/10.1006/ijhc.2001.0458
>
> Lorch, R. F. (1989). "Text-Signaling Devices and Their Effects on Reading and Memory Processes." *Educational Psychology Review*, 1(3), 209–234. DOI: https://doi.org/10.1007/BF01320135
>
> Wikipedia Foundation Design Team (2022). "Why we removed the table of contents from articles by default — and then restored it." Wikimedia Design blog. https://design.wikimedia.org/

Lorch 1989 의 meta — *text signaling device (heading, TOC, outline)* 는 *재독 / 검색 task* 에서 효과 강 (recall +30%), *1회 정독* 에서는 효과 약. Dyson·Haselgrove 2001 — *screen 읽기 시 sidebar TOC* 가 *long-form 문서 navigation 시간 40% 단축*. Wikipedia 2022 사례 — TOC 를 *접힘 default* 로 바꿨다가 사용자 항의로 *펼침 default 복원*. 사용자는 *TOC 의 정보적 가치 (이 문서가 어떤 구조인지 한눈에)* 를 *navigation 보조* 보다 더 중요시.

**md-show-me 적용**:

- 결과 HTML 안 *.md 카드* 가 long-form 일 때 *sidebar TOC 자동 생성* — Lorch·Dyson 둘 다 강 evidence.
- TOC *펼침 default* — Wikipedia 사례. 접힘으로 시작하면 *발견율 < 30%*.
- TOC 항목 = 해당 .md 의 `## heading` 자동 추출. *클릭 시 해당 섹션으로 스크롤 + breadcrumb 업데이트*.

## 8. G. Knowledge Taxonomy / Bloom / Graph View

> Bloom, B. S. (1956). *Taxonomy of Educational Objectives: The Classification of Educational Goals*. Longmans. (개정판: Anderson & Krathwohl 2001, ISBN 978-0801319037)
>
> Tominski, C., Abello, J., & Schumann, H. (2009). "CGV—An Interactive Graph Visualization System." *Computers & Graphics*, 33(6), 660–678. DOI: https://doi.org/10.1016/j.cag.2009.06.002
>
> Sætra, H. S. (2023). "Personal Knowledge Management Tools: A Comparative Review." (academic-pkm-lineage.md 의 F 절에서 인용)

Bloom 의 학습 taxonomy 6단계 (*remember → understand → apply → analyze → evaluate → create*) — *상위 단계* (analyze, evaluate) 는 *하위 단계 (remember, understand)* 의 *구조적 위계* 가 형성된 뒤에만 가능. 즉 위계 시각화가 *학습 진입* 의 전제. Tominski 등 graph visualization survey — *100+ 노드 graph 는 시각 부담만 증가, 인사이트 감소*. Sætra 2023 PKM 비교 — *graph view 는 보기 좋지만 실효 약*. 두 발견의 공통 결론 — **graph (네트워크) 시각화는 약하고, hierarchy (위계) 시각화는 강하다**.

**md-show-me 적용**:

- Bloom 의 *remember → understand → apply* 의 *remember* 단계가 우리 도구의 1차 가치 — *.md 가 어디 있는지 위치 기억*. 위계 시각화 = remember 강화의 직접 도구.
- *graph view 만들지 말 것* — Tominski·Sætra 양쪽 evidence. PKM agent (academic-pkm-lineage.md) 의 *graph view 자제* 권고와 일치.
- 단 *위계 시각화* (tree, nested card, breadcrumb) 는 *graph view 와 다름* — 위계는 *부모-자식 단방향*, graph 는 *임의 양방향*. 위계는 mental model 과 align (Young 의 task-oriented), graph 는 misalign. **충돌 없음** — *위계 yes, graph no*.

## 9. md-show-me 직접 적용 design 원칙 (10개)

1. **Breadcrumb 의무 노출 (default on)** — 모든 결과 HTML 상단에 `repo / view / .md` 경로. Krug + Lida 의 *재방문 도구* evidence.

2. **현재 위치 강조** — breadcrumb 의 마지막 항목 (현재 위치) 은 *bold + 다른 색*. Norman 의 system image 원칙.

3. **Sidebar TOC 자동 생성 (long-form 시)** — .md 가 `## heading` ≥ 3개면 sidebar TOC, 펼침 default. Lorch + Wikipedia evidence.

4. **Card 위주, tree 는 selective** — 첫 화면은 card grid (Spencer 의 카드 그루핑). *위계가 깊은 경우만* nested tree. Spencer 의 N≤7 룰.

5. **Drill-down 최대 3 levels** — repo → view → .md detail. 그 이상은 *새 query*. Springer·Whittaker DIS 2018 의 3 levels deep 권고.

6. **이전 위계 fading visible** — drill-down 시 이전 단계 *사라뜨리지 말고 흐리게 (opacity 0.3)* 유지. 사용자가 "어디서 왔는지" 시각적 끈 유지 = mental model 보존.

7. **Task-oriented 라벨** — view 이름은 *"PRD 리뷰 결과"* 같은 task 기준. *"docs/research/reviews/"* 같은 file-system 경로는 *secondary* (hover 시 표시). Young 의 mental model.

8. **Graph view 만들지 말 것** — Tominski + Sætra evidence. PKM agent 권고와 일치. *위계* 와 *graph* 는 다름 — 위계만 시각화.

9. **TOC 클릭 → breadcrumb 업데이트** — sidebar TOC 항목 클릭 시 해당 섹션 스크롤 + breadcrumb 의 마지막 항목 업데이트. Wayfinding 일관성.

10. **펼침 단서 영구 가시 (▶)** — progressive disclosure 의 펼침 affordance 는 *hover 의존 금지*. Springer·Whittaker 의 "발견율 < 20%" 위험.

## 10. 증거 강도

| 영역 | 핵심 출처 | 1차/2차 | 강도 | 우리 도구 영향 |
|---|---|---|---|---|
| A IA 4축 | Rosenfeld·Morville 2015, Wodtke 2009 | 1차 (정전 textbook) | 강 | 원칙 1, 3 |
| B Card sorting | Spencer 2009, Tullis·Wood 2004 | 1차 (RCT 포함) | 중-강 | 원칙 4, 7 |
| C Progressive disclosure | Nielsen NN, Springer·Whittaker DIS 2018 | 1차 (RCT, meta) | 강 | 원칙 5, 10 |
| D Mental model | Norman 2013, Young 2008 | 1차 (textbook) | 매우 강 (50년 정설) | 원칙 2, 6, 7 |
| E Wayfinding | Krug 2014, Lida 2003 RCT | 1차 (RCT) | 매우 강 | 원칙 1, 2, 9 |
| F TOC/outline | Lorch 1989, Dyson 2001, Wikipedia 2022 | 1차 (meta + 자연실험) | 강 | 원칙 3, 9 |
| G Taxonomy | Bloom 1956, Tominski 2009, Sætra 2023 | 1차 + 2차 | 강 (Bloom) / 중 (graph) | 원칙 8 |

## 11. 반박 / 한계

- **PKM agent 의 *graph view 자제* 와 우리의 *위계 시각화* 의 양립** — 두 권고는 *충돌하지 않음*. *graph (network, 양방향 임의 관계)* 와 *hierarchy (tree, 단방향 부모-자식)* 는 IA·인지심리학에서 *분리된 표현*. PKM agent 가 자제 권고한 건 *Obsidian graph view 식 네트워크 시각화* — 100+ 노드의 force-directed graph. 본 문서가 권하는 *breadcrumb / nested card / sidebar TOC* 는 위계 표현으로, *동일 인지 부하 위험이 없음* (mental model 과 align). 단 *"우리 도구도 graph 같이 보일 정도로 위계가 복잡해지면"* 자제 권고가 적용 — 즉 *위계 깊이 ≤ 3* 룰 (원칙 5) 이 안전판.
- **Lida 2003 의 18.5% 향상은 *deep navigation* 에서만** — 간단 task 에서는 breadcrumb 효과 *measurable 안 됨*. 우리 도구가 *짧은 view (단일 .md)* 일 때는 breadcrumb 의 ROI 작음. 단 도구 일관성 차원에서 *default 유지* 가 권장.
- **Card sorting 학술은 *카테고리 설계용 도구*** — *사용자에게 보여주는 결과 UI* 가 아님. Spencer 의 발견을 결과 UI 에 적용은 *간접 유추* — 추가 사용자 테스트 필요.
- **Bloom taxonomy 는 교육학 — UI 직접 적용 약** — Bloom 의 6단계는 *교육 목표 분류용*. UI 의 *정보 위계* 와 *학습 위계* 는 동형 아님. 본 문서의 G 절은 *느슨한 유추* 수준.
- **한국어권 IA 사용자 연구 부재** — Rosenfeld·Morville·Krug 모두 영어권 중심. 한국어 .md repo + 한국어 사용자의 wayfinding 패턴은 미확정 (academic-linguistics-korean.md 와 cross-check 필요).
- **md-show-me 가 *daily 도구 아님*** (academic-pkm-lineage.md F 절). breadcrumb·TOC 의 효과는 *재방문 시점* 에 강한데, 재방문 빈도가 낮으면 ROI 약화. 단 *호출 시점 만족도* 자체에 위계 시각화가 기여하므로 *full 부정은 아님*.
