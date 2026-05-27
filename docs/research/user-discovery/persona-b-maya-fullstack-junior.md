---
id: persona-b-maya-fullstack-junior
type: persona-analysis
persona: Maya Chen (26, US Fullstack Junior)
generated: 2026-05-27
---

## 요약

- **누구**: Maya Chen, 26세, US Series A (Oakland, 18 eng) 풀스택 주니어 (2년차)
- **AI 의존**: ★★★★★ + Cursor (코드 70%) / ChatGPT (PR desc, commit, Slack)
- **핵심 pain 3가지**
  - "is it right?" 못 가려서 verbose AI 답을 skim → 한 시간 디버깅 loop
  - 신입 컨트랙터에게 doc 4개 던졌더니 "다 똑같이 생겨서 안 읽음" — *수신자 실패*
  - 800줄 runbook 대신 Slack 에서 물어봄 — docs 의 entry friction
- **seed 가설 평가**: *AI fatigue* = 검증 (단 *못 믿어서* 피로 — junior 결). *YouTube/PPT* = 반박 (Linear board + 짧은 social/Twitter thread 가 native, "AI curated" 는 negative branding)
- **md-show-me 우선순위**: v1 primary (개발자 umbrella 1차)
- **읽는 가치**: *Linear/Vercel dashboard 톤*, command palette, *outcome-led marketing* (mechanism 숨김), v2-1 (handoff 수신자) 트리거의 도그푸드 원본 사례

# Maya Chen — md-show-me Potential User Analysis

## 1. Hey, I'm Maya

I'm 26, fullstack at a Series A in Oakland — about 40 people, 18 engineers. Been here two years, which somehow makes me "mid" on the frontend team even though I still feel like I'm faking it half the time. My stack is the boring SF default: Cursor for code, ChatGPT in a pinned tab, Vercel for deploys, Notion for team docs, Linear for tickets. Cursor writes maybe 70% of my code. ChatGPT writes most of my PR descriptions, my commit messages, and a non-trivial chunk of my Slack replies to my staff engineer (don't tell him).

## 2. My week in .md files

Honestly? Most of our team's writing lives in Notion, not markdown. But our repo still has a `docs/` folder — RFCs the senior folks write, a `runbooks/` folder I'm scared of, ADRs that stopped getting updated around Q3 last year, and a `README.md` per package that's somewhere between "actually maintained" and "lies." I probably *open* 5–10 .md files a week, mostly when Cursor's @ mention surfaces one or when I'm grepping for "why on earth is this configured this way."

The painful moments: (1) onboarding a new contractor last month — I sent her four doc links and she came back two days later having read none of them because "they all looked the same and I didn't know which was current." Fair. (2) Picking up an oncall ticket for a service I'd never touched — the runbook was 800 lines, half of it copy-pasted from the previous service's runbook, and I just asked in Slack instead. (3) Trying to understand why we picked Drizzle over Prisma — the ADR exists, I found it, I bounced off it in 90 seconds because it was a wall of prose with no diagram.

## 3. AI fatigue — the junior flavor

My fatigue isn't "AI sounds robotic." It's *I can't tell if it's right and I'm too tired to check.* Classic junior trap. When ChatGPT gives me a 600-word answer with confident bullet points, my actual move 60% of the time is: skim the first paragraph, copy the code block, see if it runs, move on. The other 40% I get burned, spend an hour debugging hallucinated API calls, and swear I'll read more carefully next time. I don't.

The specific pattern that kills me with generated *docs* (vs chat): verbose AI-written READMEs and ADRs where every section has the same five-bullet shape. After three of those in a row my brain genuinely stops parsing. I've literally re-implemented a feature from scratch this quarter because I gave up reading the existing module's docs and it was faster to ask Cursor to rebuild it. That's a confession, not a brag.

## 4. Validating the seed hypothesis

The "AI fatigue + too many .md files + want curated view" framing — *partially* right for me, but the YouTube/PPT density analogy is a Korean-millennial frame, I think. For me and most folks I know, the native references are **Linear board** (dev dashboard) + **short social (Twitter threads, TikTok explainers)** — not slides. Editorial (Stripe Press, Substack) I respect but read maybe weekly; data viz (Pudding/NYT) is occasional; Wikipedia is for one-off lookups. A thread has one idea per tweet, swipeable. TikTok has hook-in-3-seconds-or-die. Linear shows you a list of titles with status pills and you scan 40 in 10 seconds.

So the underlying insight (high info density, one-screen-one-unit) is real for me. But if `/show-me` outputs something that *feels* like a PowerPoint deck, I'll bounce — that pattern reads as "corporate training module" to my cohort. If it feels like a Linear board, a Notion gallery view, or a Twitter thread, I'm in. Also: "curated by LLM" is mildly negative branding for my generation right now — we're past the novelty and into the skepticism phase. Lead with the *outcome* (find the thing fast), not the *mechanism* (AI curates).

## 5. Three ideal scenarios

- **`/show-me how do we handle auth?`** — I want a one-screen summary of every doc that touches auth (ADRs, the auth-service README, the relevant runbook), with a clear "this one is current, these are historical" marker. Today I open 4 tabs and guess.
- **`/show-me what changed in our infra docs this quarter?`** — Catching up after PTO. I don't want a changelog, I want the *new decisions*, surfaced as cards I can scan in 30 seconds.
- **`/show-me runbooks I haven't read that touch the services I'm oncall for next week`** — Proactive. This is the use case I'd actually pay for.

## 6. Unmet needs Cursor / GitHub / Perplexity don't cover

Cursor's @ docs is great for *one file I already know exists*. It's terrible at "what docs even exist on this topic" — no overview, no comparison, no "this one is stale." GitHub's file tree is a directory listing from 2008. Perplexity is web-first and doesn't know my repo. None of them give me a **map** of my repo's knowledge — they all assume I know the filename. The whole gap `/show-me` could own is: *I don't know what I don't know about this codebase's documentation.*

## 7. Design preferences

Defaults for my cohort: dark mode (light mode reads as "boomer" — I know, I'm sorry), system sans (Inter, SF, Geist — *not* a serif, serifs feel like a Medium article from 2019), generous whitespace, no decorative emoji in headings, no gradients unless the brand earns it. Card-based layouts beat long-form. Keyboard shortcuts matter — `j/k` to move through cards, `/` to refocus search, `cmd+k` for command palette. If it has a command palette I will love it irrationally. Animations should be under 200ms or feel instant. No skeleton loaders for content that loads in 50ms. Mobile-responsive is nice but honestly I'll only ever use this on a 14" MacBook.

What would make me *share it in the team Slack* unprompted: it looks like a Linear or Vercel dashboard, not a docs site.
