# `skills` CLI 와 `show-me` 배포 옵션 조사

## 1. `skills` CLI 정체

- **npm package**: `skills` (그래서 `npx skills@latest ...` 로 호출)
- **GitHub repo**: [`vercel-labs/skills`](https://github.com/vercel-labs/skills) — Matt Pocock 개인 도구가 아니라 **Vercel Labs 가 만든 generic 패키지 매니저**
- **작동 방식**: npm registry 대신 **GitHub 를 registry 로 사용**. `add` 명령은 지정 repo 에서 `SKILL.md` 들을 찾아 사용자의 agent config (`~/.claude/skills/`, `~/.agents/skills/` 등) 로 복사
- **Matt Pocock 은 client repo 일 뿐**: `mattpocock/skills` 는 그냥 이 CLI 가 install 할 수 있는 source repo 중 하나. 똑같이 `vercel-labs/agent-skills`, `anthropics/skills`, `alirezarezvani/claude-skills` 등 다양한 third-party repo 가 install 가능

## 2. Generic 호환성 — Y

- vercel-labs/skills README 에 따르면 install source 는 **임의의 public GitHub repo** 가능:
  - `owner/repo` shorthand
  - 전체 GitHub URL
  - repo 안 특정 skill 경로 (`owner/repo/tree/main/skills/foo`)
  - GitLab / generic git URL 도 지원
- **우리 `pollux-o4/MD2HTML` 도 즉시 호환 가능** — 단, 아래 폴더 구조 충족 필요

## 3. 우리 skill 배포 시 폴더 구조

CLI 가 자동으로 SKILL.md 를 발견하는 위치 (vercel-labs/skills README 기준):

- repo root (`/SKILL.md`)
- `skills/`
- `skills/.curated/`, `skills/.experimental/`, `skills/.system/`
- agent 별 디렉토리 (`.claude/skills/`, `.agents/skills/`, `.cursor/skills/`)

따라서 우리는 repo 에 다음 구조면 충분:

```
MD2HTML/
  skills/
    show-me/
      SKILL.md
      assets/
        base.css
        snippets/...
    show-me-setting/
      SKILL.md
```

카테고리 폴더 (engineering/productivity) 는 **Matt Pocock 개인 컨벤션**이지 CLI 강제 사항 아님. assets/ 같은 supplementary 폴더는 SKILL.md 와 함께 복사됨 (vercel-labs/agent-skills 의 frontend-design 등이 이 패턴 사용).

설치 명령은 `npx skills@latest add pollux-o4/MD2HTML --skill show-me -a claude-code -g` 형태가 됨.

## 4. Distribution 옵션 비교

| 옵션 | 사용자 install UX | 우리 작업량 | 업데이트 자동화 | 비고 |
|------|------------------|------------|----------------|------|
| **A) skills CLI 호환** | `npx skills@latest add pollux-o4/MD2HTML` 한 줄 | repo 에 `skills/show-me/` 디렉토리 1개 mirror | CLI 가 처리 (재실행) | symlink 버그 있음 (vercel-labs#851) |
| **B) git clone + 수동 cp** | 3~5 단계 (clone → cp → restart) | 거의 없음 (README 1개) | 수동 | 가장 단순하지만 비개발자 진입장벽 |
| **C) 자체 install script** | `curl ... \| bash` 또는 `npm i -g show-me-skill` | install/update/uninstall 스크립트 + 배포 파이프라인 | 자체 구현 | 오버엔지니어링 |

## 5. 권장 — **A) skills CLI 호환**

이유:

1. **사용자 friction 최소** — 우리 타겟 (Claude Code 사용자) 은 이미 `npx skills add` 컨벤션에 익숙 (Matt Pocock / Vercel Labs / Anthropic 공식 skill 모두 동일 경로 사용 중)
2. **우리 추가 작업 거의 0** — 현재 `~/.claude/skills/show-me/` 구조를 repo `skills/show-me/` 에 mirror 만 하면 됨. SKILL.md frontmatter (`name`, `description`) 도 이미 충족
3. **B 와 양립 가능** — `skills/` 폴더는 어차피 일반 디렉토리라 git clone + 수동 cp 도 그대로 됨. A 를 채택해도 B 가 fallback
4. **시그널** — `pollux-o4/MD2HTML` repo 가 "프로젝트 + skill" 이중 정체성을 가지게 되는 부담은 있지만, README 에서 `## Install as Claude Skill` 섹션 1개로 분리 표시하면 충분

진행 시 체크리스트: repo 에 `skills/show-me/SKILL.md` + `skills/show-me/assets/` mirror → `skills/show-me-setting/SKILL.md` mirror → README 에 install 한 줄 추가 → 로컬에서 `npx skills@latest add pollux-o4/MD2HTML` 한번 dry-run.

## Sources

- [vercel-labs/skills (npm package source)](https://github.com/vercel-labs/skills)
- [mattpocock/skills (reference client repo)](https://github.com/mattpocock/skills)
- [Managing AI Agent Skills with `npx skills` (DEV.to)](https://dev.to/toyama0919/managing-ai-agent-skills-with-npx-skills-a-practical-guide-2an8)
- [Skills-CLI Guide (Medium)](https://medium.com/@jacklandrin/skills-cli-guide-using-npx-skills-to-supercharge-your-ai-agents-38ddf3f0a826)
- [Anthropic Claude Code Skills docs](https://code.claude.com/docs/en/skills)
