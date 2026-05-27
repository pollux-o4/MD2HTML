# LLM 에이전트 사용 패턴 심화 리서치

작성일: 2026-05-18  
범위: 기존 `LLM Agent 실사용 리서치 보고서`의 Pattern 04, Pattern 06, Pattern 07, Ethan Mollick의 Claude Sonnet 4.5 경제학 논문 재현 사례 심화 조사  
해석 원칙: 공개 웹 출처를 기준으로 하되, 회사 문서와 개인 실험은 각각 "회사 발표", "자기보고"로 분리한다. Reddit류 일화는 이번 문서의 핵심 근거로 쓰지 않았다.

## 핵심 요약

네 주제는 서로 독립된 팁이 아니라 하나의 운영 체계로 묶인다. 좋은 에이전트 작업은 먼저 산출물 형식을 계약하고, 그 계약을 `CLAUDE.md`나 `AGENTS.md` 같은 지속 컨텍스트 파일에 보관하며, 장시간 작업은 자동 평가 루프로 판정한다. Ethan Mollick의 경제학 논문 재현 사례는 이 세 요소가 연구 업무에 적용될 때 어떤 일이 가능한지를 보여주는 강한 일화다. 다만 Mollick 사례는 공개 개인 실험이므로, "학술 재현 문제를 해결했다"가 아니라 "특정 조건에서 에이전트가 논문, 데이터, 통계 코드 변환, 교차검증까지 수행했다"로 제한해서 읽어야 한다.

## 주장 강도 기준

- strong: 1차 문서나 공식 문서가 직접 권장하거나, 여러 독립 출처가 같은 실무 패턴을 반복한다.
- medium: 1차 자기보고나 회사 발표가 구체적이지만 일반화 범위가 제한된다.
- weak: 사례가 흥미롭지만 표본이 작거나, 정량 검증이 부족하거나, 개념적 추론에 가깝다.

## Pattern 04: 리서치 에이전트는 산출물 형식이 있을 때 낫다

### 개념 설명

리서치 에이전트에게 "요약해줘"라고만 지시하면 결과는 읽기 쉬울 수 있지만, 의사결정에 필요한 증거 구조가 빠지기 쉽다. 반대로 산출물 형식을 미리 지정하면 에이전트는 조사 중에 무엇을 찾아야 하는지 역으로 알게 된다. 예를 들어 "출처 표, 주장 강도, 반례, 한계, 실행 권고, 불확실한 점"을 요구하면 검색, 선별, 검증의 목표가 단순 요약보다 뚜렷해진다.

OpenAI의 프롬프트 엔지니어링 도움말은 원하는 맥락, 결과, 길이, 형식, 스타일을 구체적으로 쓰라고 권장하고, 출력 형식을 예시로 보여주면 모델이 형식 요구에 더 잘 반응하며 파싱도 쉬워진다고 설명한다. Anthropic의 Claude 프롬프트 문서도 복잡한 프롬프트에서 지시, 맥락, 입력을 XML 태그로 분리하면 오해를 줄이고, 응답 형식 제어에는 원하는 형식을 직접 말하고 프롬프트 스타일을 목표 출력과 맞추는 방식이 효과적이라고 설명한다. 출처: [OpenAI Help: Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-how-to-use-the-api), [Anthropic: Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#structure-prompts-with-xml-tags).

주장 강도: strong. 근거 유형: primary source, company-reported.

### 에이전트 품질에 중요한 이유

산출물 형식은 에이전트의 탐색 공간을 줄이고 검토 비용을 낮춘다. 리서치 결과가 표준 구조로 나오면 사람은 "출처가 있는가", "주장 강도가 과장되지 않았는가", "반례를 보았는가"를 빠르게 확인할 수 있다. 특히 장시간 웹 리서치에서는 산출물 구조가 없으면 에이전트가 인상적인 문장만 모아 오거나, 출처의 성격을 섞거나, 약한 일화를 강한 결론처럼 포장하는 문제가 생긴다.

LangChain의 Deep Agents 문서는 시스템 프롬프트, 메모리, 스킬, 도구 프롬프트가 시작 컨텍스트에 들어간다고 설명한다. 여기서 "항상 출처를 인용하라", "서브에이전트를 병렬 리서치에 써라" 같은 지시를 시스템 프롬프트에 넣는 예시는 리서치 에이전트가 산출물 품질 기준을 작업 시작부터 갖도록 만드는 방식이다. 출처: [LangChain Docs: Context engineering in Deep Agents](https://docs.langchain.com/oss/python/deepagents/context-engineering).

주장 강도: strong. 근거 유형: primary source, company-reported.

### 실무자 예시

Simon Willison은 병렬 코딩 에이전트 글에서 첫 번째 활용 범주로 "proof of concept 리서치"를 든다. 이때 에이전트는 영구 반영할 코드를 작성하기보다 "이 라이브러리 조합이 실제로 되는가" 같은 질문에 답하거나 권고를 제공한다. 같은 글에서 그는 LLM 설명은 나중 프롬프트에 다시 붙일 수 있는 훌륭한 컨텍스트가 된다고 말한다. 즉 리서치 산출물은 단발 답변이 아니라 다음 에이전트 작업의 입력 자산이다. 출처: [Simon Willison: Embracing the parallel coding agent lifestyle](https://simonwillison.net/2025/Oct/5/parallel-coding-agents/).

OpenAI 도움말의 "desired format" 예시는 추출 작업을 회사명, 인물명, 세부 주제, 일반 테마로 나누어 출력하게 한다. 연구 보고서에 적용하면 "주장, 근거 URL, 출처 유형, 한계, 실무 적용"처럼 칼럼을 고정하는 방식이 된다.

주장 강도: strong. 근거 유형: primary source, self-reported practitioner plus company-reported guidance.

### 연구 대상 자체의 예

기존 HTML 보고서의 Pattern 04는 "단순 요약보다 출처 표, 주장 강도, 반례, 의사결정 권고처럼 결과 형식을 지정할수록 재사용 가능한 결과가 나온다"고 정리했다. 이번 작업 지시도 같은 원리를 직접 사용한다. 사용자 요청은 네 주제마다 개념, 중요성, 사례, 쉬운 예, 실패 모드, 프롬프트 템플릿을 요구하고, 별도 출처 표와 주장 강도 표시를 요구했다. 따라서 리서치 에이전트는 "좋은 글"이 아니라 "검증 가능한 리서치 메모"를 목표로 움직이게 된다.

주장 강도: strong. 근거 유형: research-target-internal.

### 고등학생도 이해할 수 있는 예

"조선 시대를 조사해줘"라고 하면 친구가 길고 멋진 글을 가져올 수 있다. 하지만 "왕 이름, 주요 사건, 사건 연도, 근거 링크, 시험에 나올 만한 포인트를 표로 정리해줘"라고 하면 결과를 바로 공부에 쓸 수 있다. 형식은 조사 방향을 정하는 채점표 역할을 한다.

### 실패 모드와 주의점

- 형식이 너무 복잡하면 에이전트가 내용을 억지로 칸에 끼워 넣고 빈약한 근거를 만들어낼 수 있다.
- JSON, 표, XML 같은 구조를 요구해도 모델이 항상 완벽히 지키지는 않는다. 프로그램 입력으로 쓸 때는 스키마 검증이나 재시도 루프가 필요하다.
- 산출물 형식이 결론을 미리 유도하면 반례 탐색이 약해진다. "왜 이 방식이 좋은가"보다 "찬성 근거와 반대 근거를 나누라"가 안전하다.
- 출처 표가 있다고 해서 출처 품질이 보장되지는 않는다. 출처 유형과 주장 강도를 같이 요구해야 한다.

### 실전 프롬프트 템플릿

```text
다음 주제를 웹으로 조사해 한국어 리서치 메모를 작성하라.

주제:
{research_question}

출력 형식:
1. 5문장 이내 핵심 결론
2. 주요 주장 표: 주장 / 근거 URL / 출처 유형 / 주장 강도(strong|medium|weak) / 반례 또는 한계
3. 실무 적용 예시 3개
4. 실패 모드와 주의점
5. 지금 결정해도 되는 것과 추가 검증이 필요한 것

규칙:
- 직접 URL을 포함하라.
- 회사 블로그는 company-reported, 개인 글은 self-reported, 독립 연구는 primary/secondary로 표시하라.
- 확실하지 않은 내용은 확실하지 않다고 표시하라.
```

## Pattern 06: 컨텍스트 파일은 에이전트용 작업 계약서다

### 개념 설명

컨텍스트 파일은 사람이 매번 반복해서 말해야 하는 프로젝트 규칙을 에이전트가 작업 시작 시 읽도록 만든 문서다. 대표적으로 Claude Code의 `CLAUDE.md`, Codex 계열의 `AGENTS.md`, GitHub Copilot의 instruction 파일 등이 있다. 이 파일은 README와 비슷하지만 독자가 사람이 아니라 에이전트라는 점이 다르다. 그래서 "설치 방법"만이 아니라 "수정 금지 파일", "테스트 명령", "코딩 스타일", "리뷰 기준", "실패 시 중단 조건", "도메인 용어"까지 포함한다.

Anthropic 문서는 `CLAUDE.md`를 프로젝트 지침으로 설명하며, 프로젝트 아키텍처, 코딩 표준, 공통 워크플로를 팀원들이 소스컨트롤로 공유할 수 있다고 설명한다. Claude Code GitHub Actions 문서도 저장소 루트의 `CLAUDE.md`에 코드 스타일, 리뷰 기준, 프로젝트별 규칙, 선호 패턴을 정의하라고 권장한다. AGENTS.md 프로젝트는 이를 "코딩 에이전트를 위한 README"라고 설명한다. 출처: [Anthropic: Claude Code memory](https://code.claude.com/docs/en/memory), [Anthropic: Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions), [AGENTS.md](https://github.com/agentsmd/agents.md).

주장 강도: strong. 근거 유형: primary source, company-reported plus open format documentation.

### 에이전트 품질에 중요한 이유

에이전트 실패의 상당 부분은 모델 능력 부족보다 작업 계약의 부재에서 나온다. 어느 테스트를 돌려야 하는지, 어떤 파일을 건드리면 안 되는지, 어떤 도메인 용어를 써야 하는지 모르면 에이전트는 일반적인 관습으로 추측한다. 컨텍스트 파일은 추측을 줄이고, 팀의 반복 규칙을 자동으로 주입하며, 여러 에이전트와 여러 세션 사이에서 품질 기준을 유지한다.

OpenAI의 Codex agent loop 설명은 Codex가 입력을 초기화할 때 사용자 지침을 여러 출처에서 모으며, `$CODEX_HOME`의 `AGENTS.md`와 작업 디렉터리 경로상의 `AGENTS.md` 또는 override 파일을 포함한다고 설명한다. 이는 컨텍스트 파일이 실제 에이전트 입력의 일부가 된다는 점을 보여준다. 출처: [OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/).

주장 강도: strong. 근거 유형: primary source, company-reported.

### 실무자 예시

Simon Willison은 에이전트 루프를 설계할 때 MCP부터 생각하기보다 셸 명령과 `AGENTS.md`에 필요한 패키지 사용법을 적어두는 편이 생산적이라고 설명한다. 예컨대 웹사이트 스크린샷 작업에서는 `shot-scraper` 명령 예시 하나를 `AGENTS.md`에 넣었고, 에이전트가 URL과 파일명을 바꿔 사용할 수 있었다고 말한다. 출처: [Simon Willison: Designing agentic loops](https://simonwillison.net/2025/Sep/30/designing-agentic-loops/).

Karpathy의 `autoresearch` 저장소도 비슷한 패턴을 보인다. README는 `program.md`를 "super lightweight skill"이라고 부르며, 에이전트가 실험을 시작할 때 이 파일을 보라고 프롬프트한다. 또한 수정 범위를 `train.py` 한 파일로 제한한다고 설명한다. 이는 컨텍스트 파일이 단순 배경 설명이 아니라 "무엇을 해도 되고, 무엇을 하지 말아야 하는가"를 정하는 계약서라는 점을 잘 보여준다. 출처: [karpathy/autoresearch](https://github.com/karpathy/autoresearch).

주장 강도: medium. 근거 유형: primary source, self-reported practitioner.

### 연구 대상 자체의 예

기존 HTML 보고서의 Pattern 06은 컨텍스트 파일을 "명령어, 금지 행동, 테스트 방법, 도메인 용어, 실패 시 중단 조건"을 문서화하는 작업 계약서로 정의했다. 이번 사용자 지시도 같은 방식이다. "Research Worker", "ownership is only this file", "do not revert or overwrite unrelated edits", "do not create final HTML"은 모두 에이전트 작업 계약이다. 이 조건들이 없었다면 에이전트는 기존 HTML을 수정하거나 새 HTML까지 만들 위험이 있었다.

주장 강도: strong. 근거 유형: research-target-internal.

### 고등학생도 이해할 수 있는 예

조별 과제에서 한 친구에게 발표 자료를 맡긴다고 하자. "잘 만들어줘"라고 하면 친구는 디자인, 분량, 출처 표기 방식을 마음대로 정한다. 하지만 "10장 이하, 첫 장은 제목, 마지막 장은 참고문헌, 위키백과만 쓰지 말 것, 제출 전 맞춤법 검사"라고 적은 규칙 문서를 주면 결과가 훨씬 예측 가능해진다. 컨텍스트 파일은 에이전트에게 주는 이런 조별 과제 규칙표다.

### 실패 모드와 주의점

- 컨텍스트 파일이 너무 길면 에이전트가 핵심 규칙을 놓치거나 비용과 지연이 커진다.
- 오래된 명령이나 폐기된 아키텍처가 남아 있으면 에이전트가 낡은 계약을 따른다.
- 서로 충돌하는 규칙이 여러 파일에 있으면 최신 사용자 지시와 프로젝트 지침 사이에서 혼란이 생긴다.
- 비밀키, 내부 URL, 개인정보를 컨텍스트 파일에 넣으면 에이전트와 도구 호출 경로를 통해 노출될 수 있다.
- 컨텍스트 파일은 강한 힌트이지 완전한 보안 장치가 아니다. 삭제, 배포, 결제, 외부 발송 같은 작업은 별도 권한 게이트가 필요하다.

### 실전 컨텍스트 파일 템플릿

```markdown
# AGENTS.md 또는 CLAUDE.md

## Project Contract
- 이 저장소의 목적: {one_sentence_domain}
- 기본 작업 원칙: 작은 변경, 테스트 우선, 관련 없는 파일 수정 금지
- 수정 금지: {paths_or_actions}
- 권한 게이트: 배포, 데이터 삭제, 이메일 발송, 결제 작업은 사용자 승인 필요

## Commands
- 설치: `{install_command}`
- 테스트: `{test_command}`
- 린트: `{lint_command}`
- 타입체크: `{typecheck_command}`

## Code Style
- {style_rule_1}
- {style_rule_2}

## Definition of Done
- 관련 테스트 통과
- 변경 파일 요약
- 남은 위험 또는 미검증 항목 명시

## Stop Conditions
- 테스트 환경이 없거나 명령이 실패 원인 없이 반복될 때 중단하고 보고
- 요구사항과 기존 코드 규칙이 충돌하면 임의로 우회하지 말고 질문
```

## Pattern 07: 자동 평가 루프가 있으면 장시간 작업이 가능하다

### 개념 설명

자동 평가 루프는 에이전트가 "수정 -> 실행 -> 측정 -> 다음 시도 또는 중단"을 반복할 수 있게 하는 구조다. 코딩에서는 테스트, 린트, 타입체크, 벤치마크가 대표적이다. 리서치에서는 출처 존재 확인, 인용 누락 검사, 주장 강도 표기, 반례 포함 여부 같은 체크리스트가 평가 루프 역할을 할 수 있다. 핵심은 사람이 매 단계 판단하지 않아도 에이전트가 진행 방향을 일부 판정할 수 있어야 한다는 점이다.

Simon Willison은 에이전트를 "목표를 달성하기 위해 도구를 루프 안에서 실행하는 것"으로 정의하고, 명확한 성공 기준과 반복 실험이 필요한 문제에 agentic loop가 잘 맞는다고 설명한다. 특히 좋은 테스트 스위트가 코딩 에이전트의 가치를 크게 증폭한다고 말한다. 출처: [Simon Willison: Designing agentic loops](https://simonwillison.net/2025/Sep/30/designing-agentic-loops/).

주장 강도: strong. 근거 유형: primary source, self-reported practitioner.

### 에이전트 품질에 중요한 이유

장시간 에이전트 작업은 중간 오류가 누적되기 쉽다. 자동 평가는 에이전트가 "좋아 보이는 결과"가 아니라 측정 가능한 기준을 향해 움직이게 한다. 또한 사람이 최종 검토할 때 "무엇을 시도했고, 어떤 기준에서 버렸으며, 무엇이 통과했는가"를 확인할 수 있다. 이는 밤새 실험, 의존성 업그레이드, 대규모 리팩터링, 데이터 분석 재현처럼 반복이 많은 작업에서 특히 중요하다.

Anthropic의 평가 문서는 성공 기준을 먼저 정의하고, 그 기준을 측정하는 평가를 설계하는 순환이 프롬프트 엔지니어링의 중심이라고 설명한다. OpenAI의 agent evals 문서는 traces, graders, datasets, eval runs를 사용해 에이전트 품질을 개선하고, 반복 가능한 데이터셋과 eval run으로 넘어가면 프롬프트 변경이나 장기 성능 비교가 가능하다고 설명한다. 출처: [Anthropic: Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests), [OpenAI: Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals).

주장 강도: strong. 근거 유형: primary source, company-reported.

### 실무자 예시

Karpathy의 `autoresearch`는 자동 평가 루프의 선명한 예다. 저장소는 단일 GPU에서 nanochat 훈련 실험을 에이전트가 자동으로 수행하게 하며, 훈련은 고정 5분 시간 예산으로 실행되고 평가지표는 validation bits per byte다. README는 이 설계 덕분에 약 12 experiments/hour, 잠자는 동안 약 100 experiments를 기대할 수 있다고 설명한다. 또한 에이전트가 수정하는 파일을 `train.py` 하나로 제한해 범위와 diff 검토를 작게 만든다. 출처: [karpathy/autoresearch](https://github.com/karpathy/autoresearch).

DeepLearning.AI의 Agentic AI 과정 설명도 같은 방향을 교육용 언어로 정리한다. 에이전트 워크플로는 단일 응답 생성이 아니라 다단계 계획, 반복 실행, reflection과 tool use를 통한 개선이며, 평가와 오류 분석이 프로덕션 배포에 중요하다고 설명한다. 출처: [DeepLearning.AI: Agentic AI](https://www.deeplearning.ai/courses/agentic-ai/).

주장 강도: strong for mechanism, medium for `autoresearch` productivity numbers. 근거 유형: primary source, self-reported plus company-reported education.

### 연구 대상 자체의 예

기존 HTML 보고서의 Pattern 07은 "수정, 실행, 측정, 유지/폐기 루프가 있으면 에이전트가 밤새 실험하거나 리팩터링해도 결과를 판정할 수 있다"고 정리했다. 이번 리서치 작업에서도 자동 평가는 체크리스트 형태로 나타난다. 파일 경로가 정확한가, 네 주제를 모두 다뤘는가, 각 주제에 일곱 하위 항목이 있는가, URL과 출처 표가 있는가, 주장 강도와 출처 성격을 표시했는가를 기계적으로 점검할 수 있다.

주장 강도: strong. 근거 유형: research-target-internal.

### 고등학생도 이해할 수 있는 예

수학 문제집을 풀 때 답지만 보며 채점하면 혼자서도 여러 문제를 풀고 고칠 수 있다. 답지가 없으면 매번 선생님에게 물어봐야 한다. 자동 평가 루프는 에이전트에게 주는 답지와 채점 규칙이다. 에이전트가 틀렸는지 빨리 알수록 더 오래 혼자 시도할 수 있다.

### 실패 모드와 주의점

- 평가 기준이 잘못되면 에이전트가 잘못된 목표를 최적화한다. 예를 들어 테스트가 빈약하면 테스트 통과가 품질을 의미하지 않는다.
- LLM judge만 쓰면 같은 모델 계열의 편향이 평가에 들어갈 수 있다. 가능하면 코드 기반 평가, 골든 데이터, 사람의 샘플 검토를 섞는다.
- 자동 루프가 권한을 너무 많이 가지면 잘못된 명령, 비용 폭증, 데이터 유출 위험이 커진다.
- 장시간 실험은 로그와 재현성이 없으면 결과를 믿기 어렵다. 입력, 명령, seed, 버전, 실패한 시도도 남겨야 한다.
- 정성적 리서치 품질은 숫자 하나로 판정하기 어렵다. 체크리스트는 최소 기준이고, 최종 판단은 사람이 해야 한다.

### 실전 프롬프트 템플릿

```text
다음 작업을 자동 평가 루프로 수행하라.

목표:
{goal}

수정 가능 범위:
{allowed_paths}

평가 명령:
1. `{test_command}`
2. `{lint_or_validation_command}`
3. `{optional_benchmark_or_check}`

루프 규칙:
- 먼저 현재 실패를 재현하라.
- 한 번에 작은 변경만 하라.
- 각 반복마다 변경 내용, 실행한 명령, 결과를 기록하라.
- 평가가 통과하면 멈추고 최종 diff와 남은 위험을 보고하라.
- 같은 실패가 3회 반복되거나 권한 밖 작업이 필요하면 중단하고 질문하라.
```

## Ethan Mollick의 Claude Sonnet 4.5 경제학 논문 재현 사례

### 개념 설명

Ethan Mollick은 2025-09-29 글에서 Claude Sonnet 4.5에게 정교한 경제학 논문 텍스트와 replication data archive를 주고, 논문 결과를 데이터셋으로 재현하라고 지시한 사례를 공개했다. 그는 Claude가 논문을 읽고, 아카이브를 열어 파일을 분류하고, STATA 통계 코드를 Python으로 변환하고, 여러 결과를 차례로 확인한 뒤 성공적인 reproduction을 보고했다고 썼다. Mollick은 일부 결과를 spot check했고, GPT-5 Pro에게 그 재현을 다시 재현하게 해 교차 확인했다고 밝혔다. 출처: [Ethan Mollick: Real AI Agents and Real Work](https://www.oneusefulthing.org/p/real-ai-agents-and-real-work).

주장 강도: medium. 근거 유형: primary source, self-reported.

### 에이전트 품질에 중요한 이유

이 사례가 중요한 이유는 "좋은 답변 생성"이 아니라 "여러 도구와 파일을 거치는 실제 작업"이기 때문이다. 논문 재현은 긴 문서 이해, 데이터 파일 탐색, 통계 코드 해석, 언어 간 코드 변환, 실행 결과 비교, 오류 수정이 모두 필요하다. 즉 산출물 형식, 컨텍스트 관리, 자동 평가 루프가 없으면 실패하기 쉬운 작업이다. Mollick의 사례는 에이전트가 이런 긴 사슬의 일부를 수행할 수 있음을 보여주지만, 동시에 그는 파일 크기 제한과 replication data 문제로 접근하지 못한 논문도 있었다고 밝혔다.

Mollick의 글은 "에이전트가 실제 일을 할 수 있다"는 주장과 "AI가 불필요한 PowerPoint를 대량 생성할 수도 있다"는 경고를 함께 둔다. 따라서 품질의 핵심은 모델 능력만이 아니라 사람이 어떤 작업을 맡기고, 어떤 기준으로 검토하며, 어디에서 멈추는지를 설계하는 데 있다.

주장 강도: medium. 근거 유형: primary source, self-reported.

### 실무자 예시

Mollick 사례의 실무 패턴은 다음과 같다.

- 작업 입력: 논문 본문과 replication data archive.
- 목표 프롬프트: 논문 결과를 업로드된 데이터셋에서 재현하라. 전체 replication이 불가능하면 가능한 만큼 하라.
- 추가 목표: 복잡한 통계 상호작용까지 가능한 한 재현하라.
- 에이전트 행동: 파일 탐색, STATA에서 Python으로 코드 변환, 결과별 확인.
- 검증: Mollick의 spot check와 GPT-5 Pro를 이용한 독립적 재현 확인.
- 한계: 여러 논문에서 좋은 결과가 있었지만, 일부는 파일 크기 제한이나 replication data 문제로 막힘.

이 흐름은 Pattern 04와 Pattern 07의 결합이다. "성공적인 재현 보고"만 요구했다면 불충분하다. 실무에서는 결과 표, 원 논문 수치, 재현 수치, 차이, 실행 명령, 변환된 코드, 실패한 항목, 검증 모델의 독립 확인을 산출물 형식으로 요구해야 한다.

출처: [Ethan Mollick: Real AI Agents and Real Work](https://www.oneusefulthing.org/p/real-ai-agents-and-real-work).

주장 강도: medium. 근거 유형: primary source, self-reported.

### 연구 대상 자체의 예

기존 HTML 보고서는 Mollick 행에서 "Claude Sonnet 4.5로 경제학 논문과 복제 데이터를 읽고, STATA에서 Python으로 옮겨 재현을 시도하게 한 사례를 공개했다. 다른 모델로 재검산하는 방식도 사용했다"고 요약했다. 이번 심화 조사에서는 그 요약의 원문 근거를 확인했고, 이 사례를 세 가지 패턴의 통합 예로 해석했다. 즉 산출물 형식은 재현 결과표, 컨텍스트 파일은 논문과 데이터 아카이브 및 작업 지시, 자동 평가 루프는 원 논문 결과와 재현 결과의 비교 및 다른 모델 교차검증에 해당한다.

주장 강도: medium. 근거 유형: research-target-internal plus primary source.

### 고등학생도 이해할 수 있는 예

과학 실험 보고서에 "식초와 베이킹소다를 섞으면 거품이 난다"고 쓰여 있다고 하자. 에이전트에게 논문 재현을 시킨다는 것은 보고서를 읽고, 준비물 목록을 확인하고, 같은 실험을 해 보고, 원래 보고서의 결과와 내 결과가 같은지 비교하게 하는 것과 비슷하다. 단지 Mollick 사례에서는 준비물이 경제학 데이터이고, 실험 절차가 STATA 코드이며, 에이전트가 이를 Python으로 바꿔 다시 실행한 것이다.

### 실패 모드와 주의점

- 자기보고 사례이므로 독립 논문 수준의 벤치마크가 아니다.
- spot check와 다른 모델 교차검증은 유용하지만, 같은 오류를 두 모델이 공유할 가능성을 완전히 제거하지 않는다.
- STATA와 Python의 통계 패키지는 기본값, 결측치 처리, 고정효과, clustered standard errors, factor variable 처리 등이 다를 수 있다.
- replication package 자체가 불완전하거나 데이터 접근 권한이 없으면 에이전트가 해결할 수 없다.
- 파일 크기, 실행 시간, 패키지 설치, 라이선스, 비공개 데이터 제한이 실제 병목이 될 수 있다.
- 재현 성공 보고는 "논문 결론이 참"이라는 뜻이 아니다. 보통은 "공개된 데이터와 코드로 보고된 수치를 다시 만들 수 있었다"에 가깝다.

### 실전 프롬프트 템플릿

```text
너는 재현성 검토 보조 연구원이다. 다음 논문과 replication package를 사용해 결과 재현을 시도하라.

입력:
- 논문 PDF 또는 텍스트: {paper_path}
- replication data archive: {data_path}
- 원 코드 언어: {stata_or_r_or_other}
- 목표 실행 언어: {python_or_original_language}

작업:
1. 논문의 핵심 표와 그림 목록을 추출하라.
2. replication package 구조를 파일 트리로 요약하라.
3. 원 코드가 있으면 실행 흐름을 설명하고, 필요하면 Python으로 변환하라.
4. 각 표/그림마다 원 논문 수치, 재현 수치, 차이, 사용한 파일, 실행 명령을 표로 기록하라.
5. 재현 실패 항목은 실패 원인을 data missing, package issue, statistical mismatch, unclear code, resource limit 중 하나로 분류하라.
6. 최종 결론은 "재현됨", "부분 재현", "재현 실패", "판정 불가" 중 하나로만 표시하라.

검증:
- 모든 실행 명령과 로그 위치를 남겨라.
- 원 코드와 변환 코드의 통계 기본값 차이를 점검하라.
- 가능하면 별도 모델 또는 별도 세션에게 결과표와 코드를 독립 검토하게 하라.
- 확신할 수 없는 항목은 성공으로 표시하지 말라.
```

## 패턴 간 연결: 실무 운영 모델

실무에서는 세 패턴을 순서대로 엮는 것이 가장 안정적이다.

1. 산출물 형식을 먼저 정한다. 예: 주장 표, 재현 결과표, 실패 원인 표.
2. 반복 지침을 컨텍스트 파일에 넣는다. 예: `AGENTS.md`에 테스트 명령, 수정 금지, 출처 표기 규칙.
3. 자동 평가 루프를 붙인다. 예: 테스트, 벤치마크, 출처 검증, 재현 수치 비교.
4. 사람은 최종 승인과 고위험 판단을 맡는다. 예: 논문 결론 해석, 배포, 외부 발송, 비용 발생.

이 모델은 연구, 코딩, 데이터 분석에 모두 적용된다. 차이는 평가 함수뿐이다. 코딩은 테스트가 평가 함수이고, 리서치는 출처와 주장 강도 체크리스트가 평가 함수이며, 논문 재현은 원 결과와 재현 결과의 차이가 평가 함수다.

## 출처 표

| URL | 날짜 | 출처 유형 | 근거 성격 | 주장 강도 | 뒷받침하는 주장 |
|---|---:|---|---|---|---|
| https://help.openai.com/en/articles/6654000-how-to-use-the-api | Updated 25 days ago, 2026-05-18 기준 | OpenAI 도움말 | primary source, company-reported | strong | 원하는 맥락, 결과, 길이, 형식, 스타일을 구체화하고, desired output format을 예시로 제시하면 모델 출력과 파싱 안정성이 좋아진다는 주장 |
| https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#structure-prompts-with-xml-tags | 날짜 미표기, 2026-05-18 확인 | Anthropic 공식 문서 | primary source, company-reported | strong | 복잡한 프롬프트를 XML 태그로 구조화하면 오해가 줄고, 응답 형식은 직접적이고 구체적으로 제어해야 한다는 주장 |
| https://docs.langchain.com/oss/python/deepagents/context-engineering | 날짜 미표기, 2026-05-18 확인 | LangChain 공식 문서 | primary source, company-reported | strong | 에이전트 시작 컨텍스트가 system prompt, memory, skills, tool prompts로 구성되고, persistent `AGENTS.md`와 도구 프롬프트가 에이전트 행동을 형성한다는 주장 |
| https://docs.langchain.com/oss/python/deepagents/overview | 날짜 미표기, 2026-05-18 확인 | LangChain 공식 문서 | primary source, company-reported | strong | deep agent가 planning, filesystem, subagent, long-term memory를 통해 긴 작업의 컨텍스트를 관리한다는 주장 |
| https://www.langchain.com/blog/deep-agents | 날짜 미표기, 2026-05-18 확인 | LangChain 블로그 | company-reported | medium | 상세 시스템 프롬프트, todo planning tool, subagents, filesystem이 장시간 deep agent의 특징이라는 주장 |
| https://code.claude.com/docs/en/memory | 날짜 미표기, 2026-05-18 확인 | Anthropic Claude Code 문서 | primary source, company-reported | strong | `CLAUDE.md`가 프로젝트 아키텍처, 코딩 표준, 공통 워크플로를 담는 팀 공유 프로젝트 지침이라는 주장 |
| https://code.claude.com/docs/en/github-actions | 날짜 미표기, 2026-05-18 확인 | Anthropic Claude Code 문서 | primary source, company-reported | strong | 저장소 루트 `CLAUDE.md`에 코드 스타일, 리뷰 기준, 프로젝트 규칙, 선호 패턴을 정의하라는 주장 |
| https://github.com/agentsmd/agents.md | 날짜 미표기, 2026-05-18 확인 | 공개 포맷 저장소 | primary source | strong | `AGENTS.md`는 코딩 에이전트를 위한 README처럼 예측 가능한 컨텍스트와 지침을 제공한다는 주장 |
| https://openai.com/index/unrolling-the-codex-agent-loop/ | 날짜 미표기, 2026-05-18 확인 | OpenAI 블로그/기술 설명 | primary source, company-reported | strong | Codex가 `$CODEX_HOME` 및 작업 경로의 `AGENTS.md`/override 파일을 입력 컨텍스트에 포함한다는 주장 |
| https://simonwillison.net/2025/Sep/30/designing-agentic-loops/ | 2025-09-30 | 개인 실무 글 | primary source, self-reported | strong | 에이전트는 목표 달성을 위해 도구를 루프에서 실행하며, 명확한 성공 기준과 자동 테스트가 agentic loop의 효과를 키운다는 주장 |
| https://simonwillison.net/2025/Oct/5/parallel-coding-agents/ | 2025-10-05 | 개인 실무 글 | primary source, self-reported | medium | 병렬 에이전트를 proof-of-concept 리서치, 코드베이스 설명, 낮은 위험의 유지보수에 활용하고, 산출 설명을 다음 프롬프트 컨텍스트로 재사용한다는 주장 |
| https://github.com/karpathy/autoresearch | README 확인 2026-05-18 | GitHub 저장소 | primary source, self-reported | medium | 고정 5분 훈련, val_bpb 지표, 단일 수정 파일, 약 12 experiments/hour 같은 자동 연구 루프 설계 |
| https://www.deeplearning.ai/courses/agentic-ai/ | 날짜 미표기, 2026-05-18 확인 | DeepLearning.AI 과정 설명 | company-reported education | medium | agentic workflow가 planning, tool use, reflection, multi-agent, evals, error analysis를 포함한다는 교육용 정리 |
| https://platform.claude.com/docs/en/test-and-evaluate/develop-tests | 날짜 미표기, 2026-05-18 확인 | Anthropic 공식 문서 | primary source, company-reported | strong | 성공 기준을 정의하고 평가를 설계하는 순환이 LLM 애플리케이션 품질 개선의 중심이라는 주장 |
| https://developers.openai.com/api/docs/guides/agent-evals | 날짜 미표기, 2026-05-18 확인 | OpenAI API 문서 | primary source, company-reported | strong | traces, graders, datasets, eval runs로 에이전트 워크플로 품질을 반복 측정하고 개선한다는 주장 |
| https://www.oneusefulthing.org/p/real-ai-agents-and-real-work | 2025-09-29 | Ethan Mollick 개인 글 | primary source, self-reported | medium | Claude Sonnet 4.5가 경제학 논문과 replication data를 읽고 STATA 코드를 Python으로 바꿔 결과 재현을 시도했으며, GPT-5 Pro로 교차 확인했다는 사례 |

## 결론

Pattern 04, 06, 07은 모두 "에이전트를 똑똑하게 만드는 법"이라기보다 "에이전트가 틀렸을 때 빨리 드러나게 하는 법"에 가깝다. 산출물 형식은 결과를 검토 가능하게 만들고, 컨텍스트 파일은 반복 규칙을 안정적으로 공급하며, 자동 평가 루프는 긴 작업을 사람이 계속 붙잡고 있지 않아도 되게 한다. Mollick의 경제학 논문 재현 사례는 이 조합이 연구 업무에도 적용될 수 있음을 보여주는 중요한 일화지만, 아직은 독립 벤치마크가 아니라 신중히 해석해야 할 자기보고 사례다.
