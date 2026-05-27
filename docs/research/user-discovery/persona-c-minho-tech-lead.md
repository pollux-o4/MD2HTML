---
id: persona-c-minho-tech-lead
type: persona-analysis
persona: 김민호 (Minho Kim, 42, KR Tech Lead)
generated: 2026-05-27
---

## 요약

- **누구**: 김민호, 42세, KR SaaS Tech Lead (팀 7명 결재 + 임원 보고)
- **AI 의존**: ★★★☆☆ + 검토 본업 (팀원 Claude/Notion AI 산출물 의심)
- **핵심 pain 3가지**
  - 회의록 3개 + ADR 1개 + RFC 1개 교차 참조 → 5탭 + Cmd+F → 15분 손실
  - 팀원 AI 산출물이 매끈하지만 *근거 trace 누락* — 검토 시간 작년 대비 2배
  - Claude 호출 결과가 휘발성 chat 으로만 남음, 재사용 artifact 0
- **seed 가설 평가**: *정보 밀도* = nuance (밀도보다 traceability 가 본질). PPT 비유 = 반박 (판단 도구 톤이어야 함, *조밀한 dashboard — Linear 결재 큐 + Stripe docs 인용 패널*)
- **md-show-me 우선순위**: v1 primary (개발자 umbrella 1차)
- **읽는 가치**: *citation 1등 시민* 디자인, provenance/status pill, 결정 계보 timeline, 프린트 친화 — v2-2 (academic) 교차 참조 메커니즘과 동형

# 페르소나 C — 김민호, 42세, 한국 SaaS 회사 Tech Lead

## 1. 한 주 .md 흐름 — 내가 *쓰는* 것보다 *검토* 하는 게 많다

월요일 아침에 Linear 띄우면 지난 주 팀원 7명이 올린 RFC, ADR draft, 회의록, 분기 OKR 업데이트가 깔려 있다. 한 주에 내가 *읽어야* 하는 마크다운이 30~50개. 직접 쓰는 건 ADR 승인 코멘트, 1on1 메모, 분기 리뷰 정도 — 잘해야 주 5개.

월: 주말에 올라온 RFC 2~3개 훑고 결재 큐 정리. 화·수: 팀별 sync 회의록 종합해서 임원 보고용 요약 1장. 목: ADR 승인 — *근거 trace* 가 핵심. 어떤 벤치마크, 어떤 prior decision 을 참조했나. 금: 분기 계획 / 인력 산정 / 외부 reference 모음.

가장 짜증나는 패턴: 회의록 3개 + ADR 1개 + RFC 1개를 *교차 참조* 해야 한 줄 의사결정이 나오는데, 매번 5개 탭 열고 Cmd+F 돌리고 있다. "지난 분기에 우리가 왜 gRPC 안 갔지?" 같은 질문 하나에 15분 까먹는다.

## 2. AI 글 피로 — 팀원 산출물 *의심* 이 본업

내가 AI 피로한 이유는 ChatGPT 글을 *읽어서* 가 아니라, **팀원이 Claude/Notion AI 로 뽑은 RFC 를 검토할 때 진짜 사고의 결과인지 아닌지 분간이 안 가서** 다. 문장은 매끈한데 trade-off 분석에 근거가 없거나, "이전 ADR-007 과 충돌함" 같은 결정적 사실을 빼먹는다.

그래서 요즘 내 검토 루틴은 *AI 산출물 의심 → 원본 source 5개 확인 → 다시 팀원한테 "이 결정 근거 어디?" 핑* 으로 늘어났다. 검토 시간이 작년보다 2배.

AI 가 *생성한* 문서보다 AI 가 *큐레이션* 해서 source 를 *그대로 보여주는* 도구를 원한다. 요약은 못 믿어도 인용은 검증 가능하다.

## 3. seed 가설 검증 — "정보 밀도" 는 반만 맞다

YouTube/PPT 정보 밀도라는 표현, 절반 동의. 내 native reference 는 **조밀한 dashboard (Linear 결재 큐 + Stripe docs 인용 패널)** 쪽. *한 화면에 결정 1개 + 근거 3개* 압축은 매력적이지만 PPT 처럼 *발표용* 이 아니라 *판단용* 톤이어야 한다. 회의실 띄워놓고 "여기 보세요" 하기 좋다.

근데 내 본질 니즈는 *밀도* 가 아니라 **traceability** 다. 카드 하나에 "ADR-012 → ADR-007 에 의해 reverse → 회의록 2026-04-18 에서 재논의" 같은 *결정 계보* 가 1초에 보여야 한다. 정보 밀도가 높아도 출처를 못 따라가면 그냥 또 다른 AI 요약일 뿐 — 안 믿는다.

반박 포인트: PPT 비유는 위험하다. PPT 는 *발표용 단순화*, 내가 필요한 건 *판단용 trace*. 단순화하면 의심부터 든다. 차라리 *조밀한 dashboard — Linear 결재 큐 + Stripe docs 인용 패널* 같은 *정보 패널 + 클릭하면 raw source* 가 맞다.

## 4. Ideal scenario — 내가 던질 query

- `/show-me 이번 분기 승인된 ADR 5개 결정 흐름과 reverse 된 거 표시`
- `/show-me 팀원 5명이 지난 2주 올린 RFC 종합 — 중복 제안과 충돌 지점 강조`
- `/show-me gRPC 관련 결정 history — 처음 검토부터 보류까지 timeline`
- `/show-me 이번 회의록 3개에서 나온 액션 아이템 owner 별 정렬`
- `/show-me 분기 OKR 대비 실제 ADR 결정 align 여부 매트릭스`

공통: *복수 .md 교차 참조 + 출처 링크 유지 + 한 화면에 의사결정 단위 응집*. 요약은 짧게, 클릭하면 원문 그 자리.

## 5. Unmet needs — 기존 도구가 못 채우는 곳

**Notion AI**: 같은 workspace 안에서만 동작, repo 의 ADR/RFC 가 git 에 있으면 못 본다. 그리고 요약을 *Notion 페이지로 생성* 해버려서 한 번 더 검증해야 함 — 원본 trace 가 깨진다.

**Granola / Sembly**: 회의 *진행 중* 녹음 요약은 잘하는데, 회의록 5개 *사후 종합* 은 못 한다. 그리고 회의록 ↔ ADR ↔ 코드 변경 같은 *교차 도메인 연결* 은 불가능.

**Claude Code 직접 호출**: 내가 매번 "docs/adr/ 하위에서 Q1 결정 종합해줘" 같은 prompt 짜는 게 일. 결과가 텍스트 chat 으로 와서 다음에 다시 보려면 또 쳐야 함. **결과물이 재사용 가능한 artifact 로 안 남는다.**

핵심 gap: *git 위 .md 를 source-of-truth 로 둔 채, query 마다 휘발성 아닌 HTML artifact 를 남기고, 원본 .md 링크가 깨지지 않는* 도구. md-show-me 가 정확히 이 자리.

## 6. 디자인 선호 — 판단 도구의 톤

**시각 노이즈 최소**. 그라데이션, 이모지 카드, 화려한 색 금지. 화이트 + 한 가지 accent (예: 결정 status 표시용 회색/주황). 폰트는 system sans + 본문 16px.

**source 신뢰감 ↑**: 모든 cell 우상단에 source 파일명 + 라인 번호 작게. 클릭하면 해당 .md 의 그 줄로 점프. citation 이 *디자인의 1등 시민*. AI 생성 부분은 회색 italic, raw 인용은 검은색 정자 — 시각적으로 분리.

**판단 보조 UI**: 표가 기본. 결정 status (Approved / Reverted / Pending) 컬러 dot. 충돌 지점은 빨간 underline. 카드형 화려한 UI 는 거부감 — 회사 임원한테 띄울 때 *진중해 보여야* 한다.

**프린트 친화**: 의외로 중요. 분기 리뷰 때 종이로 뽑아 들고 회의 들어가는 일 많음. A4 한 장에 의사결정 1개 + 근거 trace 가 들어가는 레이아웃이면 만점.
