// 138 .md 파일을 dirty repo 구조로 생성하는 1회용 스크립트.
// 생성 후 mock-data.js (메타 + 점수 시뮬레이션) 까지 같이 뽑는다.
// 실행: node _gen-mock-repo.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'mock-repo');

// ---------- 유틸 ----------
function ensure(dir) { fs.mkdirSync(dir, { recursive: true }); }
function write(p, content) {
  ensure(path.dirname(p));
  fs.writeFileSync(p, content, 'utf8');
}

// 시드 기반 의사난수 (재현 가능)
let SEED = 42;
function rand() {
  SEED = (SEED * 9301 + 49297) % 233280;
  return SEED / 233280;
}
function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }

// ---------- dirty 폴더 후보 ----------
const DIRS = [
  'docs/notes', 'docs/old', 'docs/2023', 'docs/2024',
  'meetings/2024', 'meetings/2025', 'meetings/adhoc',
  'archive', 'archive/q1', 'archive/q2',
  'src/components', 'src/utils', 'src/api',
  'personal-thoughts', 'personal-thoughts/journal',
  'wip', 'wip/drafts',
  'dump', 'dump/clipboard',
  'inbox', 'inbox/unsorted',
  'team/onboarding', 'team/process',
  'random', 'misc'
];

// ---------- review 관련 (25개) — 표현 다양화 ----------
const REVIEW_TEMPLATES = [
  {
    title: '코드 리뷰 가이드라인',
    body: `## 코드 리뷰 시 체크포인트

- 함수 길이는 40줄 이내인가
- 네이밍이 의도를 드러내는가
- 테스트가 동작을 검증하는가

리뷰어는 작성자 의도를 먼저 묻고 시작한다.`,
    hasH1: true,
    keywords: ['리뷰', 'code review', 'PR']
  },
  {
    title: 'PR Review Checklist',
    body: `# Pull Request Review Checklist

* Description matches diff
* Tests cover the new branches
* No console.log left behind
* Migration story documented`,
    hasH1: true,
    keywords: ['리뷰', 'PR', 'pull request']
  },
  {
    title: '디자인 리뷰 회고',
    body: `디자인 리뷰 세션에서 나온 피드백 정리.

작성자가 디자인 의도를 설명하기 전에 리뷰어가 추측부터 시작했다.
다음에는 의도 1분 설명 → 질문 → 비판 순서로 진행한다.`,
    hasH1: false,
    keywords: ['디자인 리뷰', '회고']
  },
  {
    title: 'Post-mortem: 결제 장애',
    body: `# Post-mortem — 2025-03-04 결제 장애

## 타임라인
- 14:02 첫 알림
- 14:18 롤백

## 액션 아이템
- 리뷰 프로세스에 부하 테스트 추가`,
    hasH1: true,
    keywords: ['post-mortem', '회고', '리뷰']
  },
  {
    title: 'Retrospective Q1',
    body: `## Q1 retrospective

Keep: 매주 코드 리뷰 데이.
Stop: 금요일 늦은 머지.
Start: 디자인 단계 peer review.`,
    hasH1: false,
    keywords: ['retrospective', '회고', 'peer review']
  },
  {
    title: 'Architecture Review Notes',
    body: `# Architecture Review — Search Pipeline

리뷰어: A, B, C
결정: BM25 1차 + embedding 2차 채택.
보류: 캐시 전략은 다음 리뷰에서.`,
    hasH1: true,
    keywords: ['아키텍처', '리뷰', 'review']
  },
  {
    title: '리뷰 문화 제안',
    body: `리뷰는 검문이 아니라 학습이다.

- 칭찬 먼저
- 질문 형태로
- 비판은 코드에 한정

이걸 팀 헌장에 박자.`,
    hasH1: false,
    keywords: ['리뷰', '문화', '제안']
  },
  {
    title: '없음',
    body: `오늘 리뷰 받은거 정리.

내 PR 너무 컸음. 다음엔 300줄 미만으로 쪼개기.
리뷰어가 1시간 걸렸다고 함. 미안.`,
    hasH1: false,
    keywords: ['리뷰', 'PR']
  },
  {
    title: 'Spec Review — 결제 v2',
    body: `# 스펙 리뷰: 결제 v2

리뷰 참여: 5명
주요 우려: 환불 시나리오 누락.
재리뷰 일정: 다음 주 화요일.`,
    hasH1: true,
    keywords: ['스펙 리뷰', 'spec review']
  },
  {
    title: '코드리뷰 봇 도입 검토',
    body: `Reviewdog, Danger.js 비교.

- Reviewdog: linter 출력을 PR 코멘트로
- Danger: 자유도 높음 (커스텀 규칙)

우리는 PR 크기, 커밋 메시지, changelog 누락 체크 정도면 충분.`,
    hasH1: false,
    keywords: ['코드리뷰', '봇', 'review']
  },
  {
    title: 'Design Review — onboarding flow',
    body: `# Design Review: onboarding

리뷰어 3명. 결론:
- step 3, 4 통합
- 진행률 표시 추가
- copy 톤 일관성 부족 → 카피라이터 리뷰 필요`,
    hasH1: true,
    keywords: ['design review', '리뷰']
  },
  {
    title: 'review-notes',
    body: `오늘 review meeting.

- 메인 토픽: 신규 채용자 onboarding
- 리뷰 사이클 너무 길다는 지적
- 자동화 가능한 부분 분리 필요`,
    hasH1: false,
    keywords: ['review', '리뷰']
  },
  {
    title: '월간 리뷰 — 2025-04',
    body: `# 2025년 4월 월간 리뷰

배포: 12회
인시던트: 1회 (post-mortem 별도 문서)
회고: KPT 진행 완료`,
    hasH1: true,
    keywords: ['월간 리뷰', '회고']
  },
  {
    title: 'PR template 개선',
    body: `현재 PR 템플릿이 너무 길다. 리뷰어가 안 읽음.

핵심만 3가지:
1. 무엇을 바꿨나
2. 왜 바꿨나
3. 어떻게 테스트했나`,
    hasH1: false,
    keywords: ['PR', '리뷰', 'template']
  },
  {
    title: 'Self-review 체크리스트',
    body: `# Self-review 가이드

PR 올리기 전에 본인이 먼저 diff 를 리뷰한다.
- 디버그 코드 제거
- 주석 정리
- 변수명 한번 더`,
    hasH1: true,
    keywords: ['self-review', '리뷰']
  },
  {
    title: '없음',
    body: `리뷰 끝나고 머지했는데 prod 에서 깨짐.

리뷰가 형식적이었다.
다음부터 reviewer 도 직접 돌려보기.`,
    hasH1: false,
    keywords: ['리뷰', '회고']
  },
  {
    title: 'Security Review — auth 모듈',
    body: `# 보안 리뷰: auth 모듈

리뷰어: security team
주요 발견:
- JWT 만료 시간 너무 김
- refresh token rotation 없음

차단 이슈로 분류.`,
    hasH1: true,
    keywords: ['보안 리뷰', 'security review']
  },
  {
    title: '리뷰 받는 사람 마음가짐',
    body: `리뷰는 너가 아니라 코드를 본다.

방어적으로 받지 말기.
질문이 오면 "왜"를 먼저 묻기.
바꿀 거면 명확히, 안 바꿀 거면 이유 적기.`,
    hasH1: false,
    keywords: ['리뷰', '마음가짐']
  },
  {
    title: 'OKR 리뷰 Q2',
    body: `# Q2 OKR 리뷰

O1: 검색 품질 개선 — 70% 달성
O2: 온보딩 시간 단축 — 40% 달성

다음 분기 우선순위 조정 필요.`,
    hasH1: true,
    keywords: ['OKR 리뷰', '리뷰']
  },
  {
    title: '없음',
    body: `pair review 시도해봄.

장점: 의사결정 빠름
단점: 둘 다 같은 사각지대 가질 수 있음

solo review + async 코멘트로 회귀.`,
    hasH1: false,
    keywords: ['pair review', '리뷰']
  },
  {
    title: 'Review Day 운영안',
    body: `매주 수요일 14-16시 review day.

- 본인 PR 외 최소 2개 리뷰
- 큰 PR 은 sync session 으로
- 작은 PR 은 async 코멘트`,
    hasH1: false,
    keywords: ['review day', '리뷰']
  },
  {
    title: '리뷰 응답 SLA',
    body: `# 리뷰 응답 SLA

영업일 기준 1일 내 첫 코멘트.
24시간 내 응답 없으면 다른 리뷰어 지정.

목표: 리뷰 대기 시간 줄이기.`,
    hasH1: true,
    keywords: ['리뷰', 'SLA']
  },
  {
    title: '코드 리뷰 안티패턴',
    body: `자주 보는 안티패턴:

- 스타일 코멘트만 잔뜩 (linter 가 할 일)
- "왜?" 없이 "이렇게 바꿔" 만
- 본인 취향을 룰처럼 강요

리뷰 가이드 문서 링크 걸기.`,
    hasH1: false,
    keywords: ['코드 리뷰', '안티패턴']
  },
  {
    title: 'README — components',
    body: `# components

UI 컴포넌트 모음.

컴포넌트 추가 시 storybook 등록 + 디자인 리뷰 필수.
PR 에 storybook 링크 첨부.`,
    hasH1: true,
    keywords: ['디자인 리뷰', 'README']
  },
  {
    title: '회고 — 분기 마무리',
    body: `이번 분기 회고.

리뷰 문화 정착 진행 중. 아직 절반.
다음 분기 목표: review SLA 90% 달성.`,
    hasH1: false,
    keywords: ['회고', '리뷰']
  }
];

// ---------- 무관 노이즈 템플릿 (108~110개 생성) ----------
const NOISE_TEMPLATES = [
  { title: '오늘 점심 메뉴', body: '김치찌개 vs 파스타. 김치찌개 승.\n비가 와서 따뜻한 거 땡김.', hasH1: false },
  { title: 'TODO', body: '- 우유 사기\n- 세탁기 돌리기\n- 책 반납', hasH1: false },
  { title: 'untitled', body: '머리에 떠오른 잡생각 적어둠.\n나중에 정리할 것.', hasH1: false },
  { title: '주간 회의록', body: '## 주간 회의 2025-W12\n\n참석: A B C\n안건: 일정 공유\n다음 회의: 다음 주 월요일', hasH1: true },
  { title: '신규 기능 기획', body: '# 신규 기능: 푸시 알림\n\n사용자 retention 개선 목적.\n앱 종료 24시간 후 리마인더.', hasH1: true },
  { title: 'random thoughts', body: '비 오는 날 카페에서 작업 효율 최고.\n집중 음악 추천 받음.', hasH1: false },
  { title: 'API 명세 v3', body: '# API v3 명세\n\nPOST /users\nGET /users/:id\nDELETE /users/:id\n\nauth: Bearer token', hasH1: true },
  { title: '여행 계획', body: '제주도 3박 4일.\n렌터카 예약 완료. 숙소 미정.', hasH1: false },
  { title: '책 메모', body: '## "Thinking in Systems" 메모\n\n- feedback loop 가 핵심\n- stock vs flow 구분', hasH1: true },
  { title: '쇼핑 리스트', body: '- 키보드 (저소음)\n- 마우스 패드\n- USB 허브', hasH1: false },
  { title: '디버깅 일지', body: 'race condition 추적 중.\n로그 더 박아야 함.', hasH1: false },
  { title: '운동 기록', body: '월: 30분 러닝\n수: 헬스\n금: 요가', hasH1: false },
  { title: 'DB 스키마 변경', body: '# users 테이블 변경\n\n- last_login_at 추가\n- migration 다음 배포에 포함', hasH1: true },
  { title: '면접 후기', body: '시니어 백엔드 면접.\n시스템 설계 잘함. 협업 경험 보강 필요.', hasH1: false },
  { title: '컨퍼런스 노트', body: '## DEVCON 2025\n\nkeynote: AI 가 바꾸는 개발 워크플로우\n인상깊었던 세션: distributed tracing', hasH1: true },
  { title: '일정', body: '- 14:00 1:1\n- 15:00 스프린트 플래닝\n- 17:00 외부 미팅', hasH1: false },
  { title: '제품 비전', body: '# 제품 비전 — 2026\n\n검색을 대화로.\n발견을 즐겁게.\n공유를 쉽게.', hasH1: true },
  { title: '커피 메모', body: '에티오피아 예가체프 좋음. 산미 적당.\n다음엔 콜드브루.', hasH1: false },
  { title: 'CI 파이프라인 정리', body: '# CI 단계\n\n1. lint\n2. test\n3. build\n4. deploy (staging only)', hasH1: true },
  { title: '날씨 기록', body: '오늘 25도. 봄 끝나가는 느낌.\n주말 비 예보.', hasH1: false },
  { title: '잡담', body: '팀 슬랙에서 점심 토론 30분.\n생산성 0. 분위기 +10.', hasH1: false },
  { title: '온보딩 가이드 초안', body: '# 신규 입사자 가이드\n\n- 슬랙 채널 가입\n- 1:1 일정 잡기\n- 첫 PR 은 작게', hasH1: true },
  { title: '오류 메시지 카탈로그', body: '## 사용자 대상 오류 메시지\n\nE001: 네트워크 연결 실패\nE002: 인증 만료', hasH1: true },
  { title: '주말 회고', body: '책 1권 완독. 영화 2편.\n쉬는 게 일이다.', hasH1: false },
  { title: '미팅 메모', body: '외부 벤더 미팅.\n견적 다음 주 도착 예정.', hasH1: false },
  { title: '신규 채용 JD', body: '# 시니어 프론트엔드 JD\n\n- React 5년 이상\n- 디자인 시스템 경험\n- 협업 능력', hasH1: true },
  { title: '아이디어 스택', body: '- 댓글 요약 기능\n- 알림 묶음\n- 다크모드 자동 전환', hasH1: false },
  { title: '서버 비용 분석', body: '# 서버 비용 2025-Q1\n\nAWS: $X\nCDN: $Y\n총합 전월 대비 12% 증가.', hasH1: true },
  { title: '취미 메모', body: '베이킹 도전.\n첫 빵: 실패 (오븐 온도 잘못).', hasH1: false },
  { title: '독서 리스트', body: '- The Mythical Man-Month\n- Designing Data-Intensive Apps\n- Staff Engineer', hasH1: false },
  { title: '문서 작성 가이드', body: '# 문서 작성 가이드\n\n- 결론 먼저\n- 짧게\n- 예시 포함', hasH1: true },
  { title: '서비스 정책 변경', body: '환불 정책 변경 안내.\n7일 이내 100% 환불 → 14일.', hasH1: false },
  { title: '슬랙 채널 정리', body: '안 쓰는 채널 정리 필요.\n50개 중 활성 20개 정도.', hasH1: false },
  { title: 'A/B 테스트 결과', body: '# A/B Test — 가입 버튼 색\n\nA (파랑): 12%\nB (초록): 14%\nB 채택.', hasH1: true },
  { title: '인사이트', body: '사용자는 기능을 원하지 않는다.\n자기 문제가 해결되길 원한다.', hasH1: false },
  { title: '데이터 파이프라인', body: '# 파이프라인 v2\n\ningestion → transform → load\nairflow 로 스케줄.', hasH1: true },
  { title: '메모', body: '오늘 떠오른 생각.\n나중에 다시 봤을 때 말이 될까.', hasH1: false },
  { title: '회사 행사', body: '연말 워크샵 일정 조율 중.\n장소 후보: 강원도, 제주도.', hasH1: false },
  { title: '디자인 시스템 토큰', body: '# Color Tokens\n\n--c-primary: #3b82f6\n--c-bg: #ffffff\n--c-text: #111111', hasH1: true },
  { title: '실험 로그', body: '오늘 실험: 캐시 TTL 30s → 60s.\n결과: hit rate 60% → 68%.', hasH1: false },
  { title: '학습 노트', body: '## Rust ownership 정리\n\n- 한 변수에 한 owner\n- borrow checker', hasH1: true },
  { title: '개인 기록', body: '잠 5시간. 부족.\n주말에 보충.', hasH1: false },
  { title: '브랜드 가이드', body: '# 브랜드 톤\n\n친근하지만 전문적.\n이모지는 절제.', hasH1: true },
  { title: '캠페인 결과', body: '봄 캠페인 종료.\nCTR 평소 대비 1.5배. 성공.', hasH1: false },
  { title: 'pre-mortem: 신규 출시', body: '# pre-mortem — 신규 결제 모듈\n\n실패 시나리오:\n- 부하 못 견딤\n- 결제사 API 변경', hasH1: true },
  { title: '리팩터링 후보', body: 'auth 모듈 너무 커짐.\nstrategy pattern 으로 쪼개기 검토.', hasH1: false },
  { title: 'cron 정리', body: '# cron 잡 목록\n\n- 매시간: 캐시 워밍\n- 매일 03시: 백업', hasH1: true },
  { title: '신규 라이브러리 검토', body: 'TanStack Query 도입 검토.\n현재 SWR 사용 중. 굳이?', hasH1: false },
  { title: '환경 변수 정리', body: '# .env 정리\n\n- API_URL\n- DB_URL\n- SECRET_KEY (절대 commit X)', hasH1: true },
  { title: '점심 회의', body: '점심 먹으면서 잠깐 논의.\n결정: 다음 주에 다시 논의.', hasH1: false },
  { title: '문서 인덱스', body: '# 문서 인덱스\n\n- 온보딩\n- 아키텍처\n- 운영 가이드', hasH1: true },
  { title: '버그 트래커', body: 'BUG-101: 모바일에서 스크롤 깨짐\nBUG-102: 다크모드 토글 시 깜빡임', hasH1: false },
  { title: '아키텍처 다이어그램 메모', body: '# Service map\n\nclient → BFF → service mesh → DB', hasH1: true },
  { title: '주간 보고', body: '이번 주 한 일\n- A 기능 배포\n- B 버그 수정', hasH1: false },
  { title: '슬랙 봇 아이디어', body: 'standup 자동 수집 봇.\n매일 10시 알림 → 답변 모아서 채널 포스트.', hasH1: false },
  { title: '취준생 멘토링', body: '시니어 멘토링 세션 회의록.\n주제: 첫 회사 고르는 법.', hasH1: false },
  { title: '문서 템플릿', body: '# {제목}\n\n## 배경\n## 결정\n## 영향', hasH1: true },
  { title: '잠금 화면 메모', body: '잠금 화면에 적어둔 한 줄.\n"오늘 해야 할 한 가지만."', hasH1: false },
  { title: '서버 마이그레이션', body: '# 마이그레이션 계획\n\n구버전 → 신버전 무중단 전환.\n블루-그린 배포 활용.', hasH1: true },
  { title: '음악 플레이리스트', body: '집중용:\n- Lo-fi beats\n- Ambient\n- Classical (instrumental)', hasH1: false }
];

// ---------- 폴더별 분포 비중 (무관 노이즈를 random 폴더에 흩뿌림) ----------
function randomDir() {
  return pick(DIRS);
}

// ---------- 다양한 파일명 패턴 ----------
let fileCounter = 0;
function makeFileName(template, idx) {
  fileCounter++;
  const patterns = [
    () => `note-${String(fileCounter).padStart(3, '0')}.md`,
    () => `${2024 + Math.floor(rand() * 2)}-${String(1 + Math.floor(rand() * 12)).padStart(2, '0')}-${String(1 + Math.floor(rand() * 28)).padStart(2, '0')}.md`,
    () => `TODO.md`,
    () => `untitled.md`,
    () => `random-thoughts-${idx}.md`,
    () => `README.md`,
    () => `${template.title.replace(/[^\w가-힣]+/g, '-').toLowerCase().slice(0, 30) || 'doc'}.md`,
    () => `draft-${idx}.md`,
    () => `_${idx}.md`,
    () => `memo-${String(fileCounter).padStart(3, '0')}.md`
  ];
  return pick(patterns)();
}

// ---------- 본문 생성 ----------
function makeContent(template) {
  // 약 30% 는 frontmatter 추가 (dirty 하게 — 일관성 없음)
  let prefix = '';
  if (rand() < 0.15) {
    prefix = `---\ndate: 2025-0${1 + Math.floor(rand() * 5)}-${10 + Math.floor(rand() * 18)}\n---\n\n`;
  }
  const body = template.body;
  // 일부는 본문 위에 H1 없이 시작 (이미 템플릿이 hasH1 으로 처리됨)
  return prefix + body + '\n';
}

// ---------- 138개 인덱스 빌드 ----------
const ALL_FILES = []; // { id, path, title, hasH1, content, isReview, score_bm25, score_emb }

const USED_PATHS = new Set();
function pushFile(template, isReview, idx) {
  const dir = randomDir();
  let fileName = makeFileName(template, idx);
  let rel = path.join(dir, fileName).replace(/\\/g, '/');
  // 충돌 시 suffix — 그래도 dirty 느낌 유지 ( -2.md, -3.md )
  let n = 2;
  while (USED_PATHS.has(rel)) {
    const base = fileName.replace(/\.md$/, '');
    fileName = `${base}-${n}.md`;
    rel = path.join(dir, fileName).replace(/\\/g, '/');
    n++;
  }
  USED_PATHS.add(rel);
  const abs = path.join(ROOT, rel);
  const content = makeContent(template);
  write(abs, content);

  // 점수 시뮬레이션:
  //  - BM25: review keyword (리뷰/review/리뷰어/peer review/post-mortem/회고/PR) 단순 카운트
  //  - Embedding: review 의미 강도 (수동 점수)
  const bm25Score = simulateBm25(content);
  // review 도 일부는 애매하게 (0.35~0.55), 노이즈도 일부는 false positive (0.30~0.50)
  // → dirty repo 다움 + 슬라이더 조작 의미 부여
  let embScore;
  if (isReview) {
    const r = rand();
    if (r < 0.15) embScore = 0.30 + rand() * 0.20;          // 애매한 review 4개 정도
    else if (r < 0.35) embScore = 0.50 + rand() * 0.15;     // 경계
    else embScore = 0.62 + rand() * 0.33;                    // 확실한 군집
  } else {
    const r = rand();
    if (r < 0.05) embScore = 0.35 + rand() * 0.15;          // false positive 5%
    else embScore = Math.max(0.01, 0.02 + rand() * 0.25);
  }

  ALL_FILES.push({
    id: ALL_FILES.length,
    path: rel,
    title: template.hasH1 && template.title !== '없음' ? template.title : '',
    fileName,
    hasH1: template.hasH1 && template.title !== '없음',
    snippet: content.split('\n').filter(Boolean).slice(0, 3).join(' ').slice(0, 140),
    bm25: bm25Score,
    emb: embScore,
    isReview
  });
}

function simulateBm25(content) {
  const lower = content.toLowerCase();
  const tokens = ['리뷰', 'review', 'reviewer', '리뷰어', 'peer review', 'post-mortem', '회고', 'pr ', 'pull request', 'retrospective'];
  let s = 0;
  tokens.forEach(t => {
    const matches = lower.split(t).length - 1;
    s += matches * (t.length > 4 ? 0.18 : 0.12);
  });
  // 너무 큰 값 클램프
  return Math.min(1, s + (s > 0 ? 0.05 : 0));
}

// ---------- 실행 ----------
// review 관련 25개
REVIEW_TEMPLATES.forEach((t, i) => pushFile(t, true, i));

// 무관 113개 (총 138)
const NEED_NOISE = 138 - REVIEW_TEMPLATES.length;
for (let i = 0; i < NEED_NOISE; i++) {
  const t = NOISE_TEMPLATES[i % NOISE_TEMPLATES.length];
  // 살짝 변형 (제목 뒤에 인덱스)
  pushFile({ ...t, title: t.title + (i > NOISE_TEMPLATES.length - 1 ? ` (${i})` : '') }, false, i);
}

// ---------- mock-data.js 출력 ----------
const mockDataPath = path.join(__dirname, 'mock-data.js');
const out = `// 자동 생성됨 (by _gen-mock-repo.js)
// 138개 .md 파일의 메타 + BM25/embedding 점수 시뮬레이션.
window.MOCK_FILES = ${JSON.stringify(ALL_FILES, null, 2)};

window.MOCK_QUERY = "리뷰";

// agent loop trace 데이터 (시뮬레이션)
window.AGENT_TRACE = [
  {
    step: 1,
    name: "BM25 1차 매칭",
    detail: "쿼리 '리뷰' 를 'review', '리뷰어', 'peer review', 'post-mortem', '회고' 등 변형 토큰으로 확장 후 138개 문서 전체 스캔.",
    result: "BM25 > 0 인 후보 N개 발견 (런타임 계산)."
  },
  {
    step: 2,
    name: "Embedding 2차 정렬",
    detail: "BM25 후보를 embedding 공간에서 쿼리와의 cosine 유사도로 재정렬. (사전 계산된 점수 사용)",
    result: "점수 분포 시각화 — bimodal 경향 (review 군집 vs 노이즈)"
  },
  {
    step: 3,
    name: "LLM 자체 평가",
    detail: "[parent context 격리] sub-agent 호출. top 점수 분포를 보고 '군집이 명확한가 / 추가 탐색 필요한가' 판단.",
    result: "판단: '0.55 이상 군집이 뚜렷함. 1차 결과 충분. 단, 사용자가 cut-off 를 조정할 수 있도록 슬라이더 제공.'"
  },
  {
    step: 4,
    name: "(Optional) 추가 탐색",
    detail: "사용자가 '더 탐색' 버튼 클릭 시에만 발동. 동의어 확장 + 인접 폴더 스캔.",
    result: "초기에는 비활성. 슬라이더 + 버튼으로 사용자 통제."
  },
  {
    step: 5,
    name: "큐레이션 → main agent 로 반환",
    detail: "sub-agent 가 카드 메타만 main agent 에게 전달. 본문 raw 는 main 컨텍스트 진입 X.",
    result: "main agent context delta ≈ 카드 메타 N개 (수십 토큰)."
  }
];
`;
fs.writeFileSync(mockDataPath, out, 'utf8');

console.log('생성 완료');
console.log('  - mock-repo 파일 수:', ALL_FILES.length);
console.log('  - review 관련:', ALL_FILES.filter(f => f.isReview).length);
console.log('  - noise:', ALL_FILES.filter(f => !f.isReview).length);
console.log('  - mock-data.js:', mockDataPath);
