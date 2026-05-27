---
id: academic-hci
type: academic-research
generated: 2026-05-27
---

## 요약

- **핵심 발견 3가지**:
  - Fitts × Hick 의 곱이 [Copy] 배지 위치 결정 — 모바일 44×44 pt 영구 노출 / 데스크탑 카드 내부 corner.
  - Norman 의 *invisible affordance* 가 최대 위험 — hover-only 배지는 터치에서 *기능 없음과 동일*.
  - Aesthetic-usability 효과는 polish 투자 정당화하지만 *기능 결함 은폐* 위험 (Sauer 2009: 실패 시 더 큰 실망).
- **md-show-me 시사점**: copy-as-prompt 진입 단서 우상단 fixed, chips N≤5 + "더 보기", [Copy]/[Save] 100ms toast 피드백 + Undo.
- **증거 강도**: 매우 강 = Fitts (70년) / 강 = Hick·Norman·Direct manipulation / 중 = Aesthetic-usability·Progressive disclosure.
- **읽는 가치**: 배지 위치·터치 타겟·signifier·progressive disclosure design 결정의 HCI 정전 근거.

# Academic HCI 조사 — md-show-me 인터랙션 설계 적용

## 1. 개요

md-show-me 는 *명령 기반 쿼리* (`/show-me X`) 와 *직접 조작 가능한 결과 HTML* 의 hybrid 다. baseline 3 (citation 카드, back-link 배지, copy-as-prompt) + 모든 인터랙티브 요소의 [Copy] / [Save] 배지가 클릭 / 선택 / 시각적 신뢰감의 교차점에 위치한다. HCI 정전 (canonical) 문헌을 훑어 *이 도구의 결정들이 어디서 강한 증거를 가지고 어디서 약한가* 를 매핑한다.

핵심 발견 3:

- **Fitts × Hick 의 곱이 [Copy] 배지 위치를 결정.** 배지는 *카드 외곽이 아니라 카드 모서리 hover 영역* 이어야 하고, 모바일은 영구 노출 (hover 없음). 
- **Norman 의 *invisible affordance* 위험이 가장 크다.** copy-as-prompt 오버레이는 *기능이 있어도 사용자가 모르면 0* — signifier (시각 단서) 누락이 베이슬라인 채택률을 깎는 주범.
- **Aesthetic-usability 효과는 editorial polish 투자를 정당화하지만 *기능 결함 은폐* 위험.** "예뻐 보여서 작동한다고 믿는" 사용자 = 실패 보고가 줄어 디버깅 신호 소실.

## 2. 영역별 문헌 + 시사점

### A. Fitts' law (Fitts 1954)

> Fitts, P. M. (1954). "The information capacity of the human motor system in controlling the amplitude of movement." *Journal of Experimental Psychology*, 47(6), 381–391. DOI: https://doi.org/10.1037/h0055392

이동시간 MT = a + b·log₂(D/W + 1). 작은 타겟 / 먼 거리 = 느리다. MacKenzie (1992) 가 GUI 에 적용 확장 (DOI: https://doi.org/10.1207/s15327051hci0701_3).

**md-show-me 적용**:

- 모바일 [Copy] 배지 최소 터치 타겟 **44×44 pt** (Apple HIG) / **48×48 dp** (Material) 미만이면 Fitts 페널티가 급격히 증가. 우리 baseline 의 카드 모서리 배지가 이 크기 보장하는지 확인 필요.
- 데스크탑은 D (거리) 단축이 결정적 — 배지가 *카드 안* 에 있어야 마우스 이동 cost ↓. 화면 가장자리 floating toolbar 는 D ↑↑.

### B. Hick's law (Hick 1952; Hyman 1953)

> Hick, W. E. (1952). "On the rate of gain of information." *Quarterly Journal of Experimental Psychology*, 4(1), 11–26. DOI: https://doi.org/10.1080/17470215208416600
>
> Hyman, R. (1953). "Stimulus information as a determinant of reaction time." *Journal of Experimental Psychology*, 45(3), 188–196. DOI: https://doi.org/10.1037/h0056940

RT = a + b·log₂(N+1). 선택지가 늘수록 결정 시간은 log 로 증가하지만 *실제 사용자 인지 부하* 는 N>7 부근에서 급격히 무너진다 (Miller 1956 의 7±2 와 결합 효과).

**md-show-me 적용**:

- query refinement chips (N+7 ?) → **N=5~7 권장**. 7 초과 시 progressive disclosure (영역 G) 로 그룹화. "더 보기" 펼침으로 *첫 화면 N* 을 5 이하로 묶는 게 안전.
- selector hint 카드 (어느 .md 가 선택됐는지) 도 동일 — 한 화면에 8 개 이상 띄우면 사용자가 *읽기를 포기* 한다.

### C. Norman (1988): *The Design of Everyday Things*

> Norman, D. A. (2013). *The Design of Everyday Things: Revised and Expanded Edition*. Basic Books. ISBN 978-0465050659. (원판 1988)

Affordance (가능성) ≠ Signifier (그 가능성을 *알리는* 시각/촉각 단서). Norman 본인이 2008 년 "Signifiers, not affordances" 칼럼에서 GUI 맥락 재정의 (https://jnd.org/signifiers_not_affordances/). 4 원칙: discoverability, feedback, conceptual model, affordances/signifiers.

**md-show-me 적용**:

- [Copy] 배지가 *signifier* 로 작동하려면 **항상 보이거나, 명확한 hover 단서**. 현재 hover-only 디자인은 데스크탑에서만 작동하고 *터치는 invisible affordance* → 모바일 사용자 = 기능 없는 것과 동일.
- copy-as-prompt 오버레이 진입 단서 (예: 우상단 fixed 버튼) 가 *처음 1초 안에 보이지 않으면* 발견율 < 20%. 우리 베이슬라인이 이걸 보장하는지 검증 필요.
- *feedback* — [Copy] 클릭 후 "Copied!" toast 없으면 사용자가 작동 여부 모름. 가역성 (rule E) 과도 연결.

### D. Direct manipulation (Shneiderman 1983)

> Shneiderman, B. (1983). "Direct Manipulation: A Step Beyond Programming Languages." *IEEE Computer*, 16(8), 57–69. DOI: https://doi.org/10.1109/MC.1983.1654471

세 원칙: (1) 객체 지속 가시화, (2) 물리적 조작 (클릭/드래그) 으로 명령 대체, (3) 즉각 가역 피드백.

**md-show-me 적용**:

- 우리는 **명령 입력 (쿼리) + 결과 직접 조작 hybrid**. 쿼리 부분은 *간접* (CLI 적) → 사용자가 *명령 후 결과 확인* 의 latency 를 견뎌야 함. 이 latency 가 길수록 직접 조작 효과 희석.
- 해결: 결과 HTML 안에서는 *순수 직접 조작* 유지 — 카드 클릭 = 펼침, [Copy] = 즉시 클립보드, 재쿼리 없이 *결과 내부 navigation* 가능해야.

### E. Shneiderman 의 8 황금 규칙

> Shneiderman, B., Plaisant, C., Cohen, M., Jacobs, S., Elmqvist, N., & Diakopoulos, N. (2016). *Designing the User Interface*, 6th ed. Pearson. ISBN 978-0134380384.

1. 일관성 2. 보편적 사용성 3. 정보 피드백 4. 종결 대화 설계 5. 오류 방지 6. 가역성 7. 사용자 통제감 8. 단기 기억 부하 ↓

**md-show-me 위반 가능 항목**:

- **#3 피드백** — [Copy] 무피드백 = 위반.
- **#6 가역성** — [Save] 후 되돌리기 (Undo Save) 없으면 위반. 최소 *어디 저장됐는지 toast + Open folder 링크* 필요.
- **#8 단기 기억** — 쿼리 결과가 *새 페이지* 면 이전 쿼리 잊힘. 쿼리 히스토리 사이드바 / breadcrumb 권장.

### F. Aesthetic-usability effect

> Tractinsky, N. (1997). "Aesthetics and apparent usability: empirically assessing cultural and methodological issues." *CHI '97 Proceedings*, 115–122. DOI: https://doi.org/10.1145/258549.258626
>
> Lavie, T., & Tractinsky, N. (2004). "Assessing dimensions of perceived visual aesthetics of web sites." *International Journal of Human-Computer Studies*, 60(3), 269–298. DOI: https://doi.org/10.1016/j.ijhcs.2003.09.002

미적 인터페이스 = *인지된 usability* 상승. 실제 task 성능 향상은 약하지만 만족도 / 신뢰 / 재사용 의도가 유의미하게 ↑.

**md-show-me 적용**:

- editorial polish (typography, whitespace, citation 카드 style) 투자 = *도구 신뢰감* 직접 영향. 특히 *technical-adjacent* 사용자 (designer, humanities) 가 "이게 진짜 정보를 잘 큐레이션했나?" 판단할 때 미적 신호 비중 큼.
- **위험**: 예쁘면 사용자가 *기능 결함을 보고 안 함*. 베타 단계에서는 *일부러 덜 polished* 상태로 사용자 테스트 → 진짜 문제 표출.

### G. Progressive disclosure

> Nielsen, J. (2006). "Progressive Disclosure." Nielsen Norman Group. https://www.nngroup.com/articles/progressive-disclosure/
>
> Spool, J. M. (2005). "Consistency in Design is the Wrong Approach." UIE. https://articles.uie.com/

핵심 정보 우선, 고급/세부 정보 *요청 시* 공개. 80/20 원칙 적용.

**md-show-me 적용**:

- 카드 → 펼치기 → full read 사슬이 정확히 progressive disclosure. **단**, 펼치기 단서 (▸ chevron, "더 보기" 텍스트) 가 signifier 로 작동하는지 (Norman 영역 C) 확인.
- citation 카드는 *제목 + 1줄 발췌* 만 → 클릭 시 본문 → [Open in editor] 로 전체 .md. 3 단계가 최적, 4 단계 이상은 사용자가 *깊이 추적 포기*.

## 3. md-show-me 직접 적용 design 결정

1. **모바일 [Copy] 배지 영구 노출 + 최소 44×44 pt 터치 타겟** (Fitts + Norman signifier).
2. **데스크탑 [Copy] 배지는 카드 내부 우상단 corner 고정** — floating toolbar 금지 (Fitts D 최소화).
3. **query refinement chips 첫 화면 N≤5, 6 번째부터 "더 보기" 그룹** (Hick + progressive disclosure).
4. **[Copy] / [Save] 클릭 시 ≤100ms toast 피드백** + Save 는 "Open folder" 액션 동반 (Shneiderman #3, #6).
5. **copy-as-prompt 진입 버튼 우상단 fixed, 첫 viewport 안 가시** — invisible affordance 회피 (Norman).
6. **카드 펼치기 chevron + "Read full" 텍스트 병용** — icon-only 위험 회피 (Norman signifier).
7. **베타 단계 *의도적 덜 polished*** UI 로 비판 유도 → 출시 시 polish 강화 (aesthetic-usability 양면 활용).

## 4. 증거 강도 표

| 영역 | 증거 강도 | 비고 |
|---|---|---|
| A. Fitts | 매우 강 | 70 년 누적 실험, 다양한 디바이스 검증 |
| B. Hick | 강 | log 관계 견고, 다만 *복잡 의사결정* 엔 단순 적용 한계 |
| C. Norman signifier | 강 (정성적) | 정량 실험은 less, 그러나 GUI 디자인 표준 |
| D. Direct manipulation | 강 | 30 년 표준, hybrid 시스템 적용엔 해석 필요 |
| E. 8 황금 규칙 | 중 | 휴리스틱 — 정량 증거보다 *체크리스트* 가치 |
| F. Aesthetic-usability | 중~강 | 인지 ↑ 확실, 실제 성능 ↑ 약함 |
| G. Progressive disclosure | 중 | NN/g 사례 다수, peer-review 정량 적음 |

## 5. 반박 / 한계

- **Fitts' law 는 단일 포인팅** — 멀티터치 / gaze / voice 인터랙션엔 직접 적용 한계.
- **Hick's law 는 *동질* 선택지 가정** — 우리 chips 처럼 *맥락 다른* 선택지엔 log 관계 깨질 수 있음.
- **Aesthetic-usability 의 *부작용*** — Sauer & Sonderegger (2009, DOI: https://doi.org/10.1080/00140130902943268) 가 미적 영향이 task 실패 시 *역전* 한다고 보고. 즉 예쁘다가 실패하면 더 큰 실망.
- **모든 인용은 *서구 사용자* 표본 편중**. 한국어 사용자 / 동아시아 정보 밀도 선호 (web-info-density-empirical.md 참조) 와의 교차 검증 필요.
- **md-show-me 는 *novel 도구*** — 기존 paper 들이 가정한 *친숙한 인터페이스* 와 달리 사용자가 학습 단계 → 첫 사용에서 Fitts/Hick 곡선이 *더 완만* (학습 효과 누적 전).
