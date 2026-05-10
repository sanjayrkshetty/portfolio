# Portfolio — Build Output & Feature Verification

Build: **2026-05-10** · Next.js 16.2.6 (Turbopack)

## Build Output

```
Route (app)
┌ ○ /           Static — Hero, About, Skills, Projects, AskMe, Footer
├ ○ /_not-found Static
└ ƒ /api/chat   Dynamic — Edge Runtime streaming (Claude Haiku)

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + custom CSS vars (dark theme) |
| AI Chat | Vercel AI SDK v6 (`useChat` + `DefaultChatTransport`) |
| LLM | Claude Haiku (`claude-haiku-4-5-20251001`) via `@ai-sdk/anthropic` |
| Runtime | Edge (`export const runtime = "edge"`) |
| Hosting | Vercel (free Hobby tier) |
| Streaming | `streamText` → `toUIMessageStreamResponse()` |

## Sections

### Hero
- Typewriter animation cycling: AI Security Researcher → LLM Threat Modeller → Pre-Sales Consultant → Adversarial ML Researcher
- CTA buttons: View Work · Ask Me Anything · LinkedIn
- CSS grid background + radial glow

### About
- 2-column layout: bio text + timeline cards (role, org, year, description)
- Cards: SISA AI Researcher · MIT B.Tech · Pre-Sales Consultant

### Skills
- 6 skill categories with colour-coded tags
- AI Security · Security Testing · DFIR · Compliance · Engineering · Pre-Sales

### Projects
- presales-automation: full-stack DFIR pre-sales tool
- claude-code-best-practices: production patterns reference + README generator
- Each card: name, tagline, status badge, description, stack badges, highlights

### Ask Me (AI Chat)
- `useChat` (AI SDK v6) + Edge streaming
- Pre-loaded suggestion chips
- Claude Haiku answers questions about Sanjay's work
- Bouncing dots loading indicator
- capped at 400 output tokens per response

## API Chat — Sample Interaction

**Q:** What does Sanjay research at SISA?

**A:** Sanjay conducts AI security research at SISA Information Security, focusing on adversarial machine learning, LLM security vulnerabilities, and AI zero-day research. He builds threat models for AI systems and investigates attack surfaces in large language models to help organisations understand potential vulnerabilities before adversaries can exploit them.

**Q:** What has he shipped?

**A:** Sanjay has shipped two public projects: `presales-automation`, a full-stack pre-sales automation tool for a DFIR security team built with React, Vite, Express, SQLite, and the Claude API; and `claude-code-best-practices`, a practical reference guide for getting production-quality output from Claude Code, which includes a working CLI README generator powered by the Anthropic API.

## Security Notes

- `ANTHROPIC_API_KEY` server-side only (Edge Function env var, never exposed to client)
- System prompt hardcoded server-side — client cannot override it
- `maxOutputTokens: 400` prevents runaway generation
- CORS handled by Vercel (same-origin by default on Edge Functions)

## Local Dev

```bash
cp .env.example .env.local
# Add ANTHROPIC_API_KEY=sk-ant-...
npm run dev   # http://localhost:3000
```

## Deploy to Vercel

```bash
vercel          # first time — follow prompts, set ANTHROPIC_API_KEY in dashboard
vercel --prod   # subsequent deploys
```
