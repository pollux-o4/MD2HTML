---
id: persona-d-jiwon-designer-tech-adjacent
type: persona-analysis
persona: 이지원 (Jiwon Lee, 36, KR Designer + Tech-adjacent)
generated: 2026-05-27
---

## 요약

- **누구**: 이지원, 36세, KR 프로덕트 디자이너 (tech-adjacent, engineering docs 수신자)
- **AI 의존**: ★★☆☆☆ + Figma / ChatGPT (jargon 풀이용)
- **핵심 pain 3가지**
  - "이 글의 어느 부분이 내 일과 관련 있나" 가 안 보임 — 1500자 ADR 에서 한 줄 찾는 데 20분
  - AI 글에 typographic hierarchy 0 — 모든 줄 같은 weight, 강조가 없는 것과 같음
  - JSON nested 3~4단 API spec 에서 *화면 노출 필드* 직관적으로 안 보임
- **seed 가설 평가**: *YouTube* = nuance (visual pacing 측면 공감, 정보 밀도만으로는 부족). *PPT* = 반박 (editorial — Stripe Press / Pudding / NYT Upshot 이 native). *정리* = 재정의 (구조화 ≠ 정리, *시선 경로 설계* 가 정리)
- **md-show-me 우선순위**: v1 secondary (engineering docs 수신자 시점)
- **읽는 가치**: editorial quality 기준선 (typography, 여백, 위계 3단), *내 관점의 필터* query 패턴, "기능 70 + 시각 90" 충성 함수

# 이지원 — md-show-me 페르소나 분석

## 1. 한 주 .md 흐름 — engineering docs 막히는 지점

월요일 sprint planning 끝나면 엔지니어 PR description 7~10개가 Linear 에 쌓여. design system 영향 있는 것만 골라 읽어야 하는데, 매번 *전체를 다 읽고 나서야* 디자인 관련 부분이 있었는지 알게 돼. 화요일에는 backend 팀이 새 ADR 올림 — "Event-Sourced Audit Trail 도입". 제목만 보고는 디자인이랑 무슨 상관인지 감이 안 와서 일단 열어봄. 1500단어 짜리 글에서 "user-facing log viewer 가 새로 필요함" 한 줄 찾는데 20분 걸림.

수요일 — API spec markdown. `200 OK` payload 구조 보고 컴포넌트 design 해야 함. JSON schema 가 nested 3~4단이라 *어떤 필드가 화면에 노출되는지* 직관적으로 안 보임. 결국 엔지니어 어깨 톡톡 쳐서 물어봄. 매주 반복.

막히는 지점은 항상 같아 — **"이 글의 어느 부분이 내 일과 관련 있나"** 가 안 보임.

## 2. AI 글 피로 — jargon dump + 시각 위계 없음

ChatGPT 가 써준 글의 가장 큰 문제는 *읽을 때 눈이 어디서 멈춰야 할지 모르겠다는 것*. 모든 문장이 똑같은 weight 로 흘러가. 디자이너 입장에서 보면 typographic hierarchy 가 0임 — H1 → body → H1 → body 무한 반복. 진짜 중요한 한 줄이 평범한 문단 가운데 묻혀 있음.

거기에 engineering jargon dump 가 더해지면 — "idempotent operation", "eventual consistency", "back-pressure" — 한 문단에 모르는 용어 3개 나오는 순간 스크롤 빨라지고 결국 닫음. 정확성은 모르겠고, *읽기가 피곤함*. AI 가 길게 잘 쓰는 건 알겠는데 "이 중에 뭐가 중요한지 네가 좀 골라줘" 가 안 됨.

## 3. seed 가설 검증 — YouTube/PPT 비유 디자이너 시각

YouTube 비유는... 절반 공감. 정보 밀도 측면에서는 맞는데, 디자이너인 나는 YouTube 의 *visual pacing* 을 더 중요하게 봐. cut 이 빠른 영상은 정보량보다 *호흡* 이 좋아서 집중됨. md-show-me 가 추구해야 할 건 정보 압축뿐 아니라 *읽는 호흡 디자인* 이라고 생각.

PPT 비유는 디자이너한테 안 맞음. PPT 는 *발표 도구* 라 typographic hierarchy 가 약함. 내 native reference 는 **editorial (Stripe Press / 브런치) + 데이터 viz (Pudding / NYT Upshot)** — 잡지처럼 시선 경로가 설계된 톤. 만약 산출물이 "회사 보고서 PPT" 처럼 나오면 즉시 닫음. *Stripe Press / Linear changelog 같은 editorial quality* 가 기준선이어야 함.

"정리" 의 정의도 달라. 엔지니어한테 정리 = 구조화 / 분류. 나한테 정리 = **읽는 사람의 시선 경로 설계**. TOC 가 있는 게 정리가 아니라, 첫 화면 3초에 "아 이거구나" 가 오는 게 정리.

## 4. ideal scenario — 어떤 query

가장 자주 칠 것 같은 쿼리:

- `/show-me 이번 스프린트 ADR 중 디자인 영향 있는 부분만`
- `/show-me API 스펙에서 화면에 노출되는 필드만 골라줘`
- `/show-me PR #234 description 을 디자이너용으로 풀어줘`
- `/show-me design system 관련 결정 history 시각화`

공통점 — *내 관점의 필터* 가 query 안에 들어감. raw markdown 전체가 아니라 "내 일과 관련 있는 단면" 을 보고 싶음. 이게 Notion 검색이랑 결정적으로 다른 지점.

## 5. unmet needs — 기존 도구가 못 채우는 부분

Notion 은 *내가 직접 정리한 것만* 잘 보임. 엔지니어 팀이 쓴 글은 거기에 안 옴.

Confluence 는 검색이 죽음. ADR 페이지 찾으면 *전체* 가 나오지 부분이 안 나옴.

Figma description 은 디자이너끼리 쓰는 거라 engineering context 가 없음.

GitHub README 는... 솔직히 잘 안 읽음. monospace + 영어 + 코드블록 = 진입장벽 max.

빈 공간은 명확함 — **"내가 직접 정리하지 않은 남의 글을, 내 관점으로 다시 보여주는 레이어"**. md-show-me 가 여기 들어옴.

## 6. 디자인 선호 — 시각 품질 기준

비협상 항목 몇 개:

- **typography 가 본문 hero** — 좋은 serif (Source Serif / Tiempos) 또는 잘 짠 sans (Inter / Pretendard). 시스템 폰트 fallback 만 있으면 그 순간 신뢰 깨짐.
- **여백이 정보다.** 정보 밀도 ≠ 빽빽함. Stripe docs 처럼 *공간이 호흡* 하는 레이아웃.
- **색은 최소 3색 이하.** ChatGPT 산출물의 무지개 emoji bullet 은 즉시 거부감.
- **위계는 3단계로 충분** — hero / section / body. 그 이상은 시각 노이즈.
- **interaction 은 조용히.** hover 시 살짝 underline, 클릭 시 부드러운 transition. *튀는 애니메이션 = 디자이너 신뢰 즉시 하락*.
- **다크모드는 옵션이 아니라 default 동급 품질** 이어야 함. 핀테크 화면 종일 보다가 흰 배경 markdown 열면 눈 아픔.

요약 — 정보 도구라도 *editorial product* 처럼 다뤄야 디자이너가 매일 씀. 기능 90점 + 시각 60점 이면 한두 번 쓰고 안 돌아옴. 반대로 기능 70점 + 시각 90점이면 매일 열어봄. 디자이너의 잔인한 진실.
