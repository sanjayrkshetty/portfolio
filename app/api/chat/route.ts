import { createGroq } from "@ai-sdk/groq";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

const SYSTEM = `You are Sanjay R K Shetty's portfolio assistant. Answer questions about Sanjay concisely and accurately.

About Sanjay:
- AI Security Researcher at SISA Information Security, Bengaluru
- B.Tech Cybersecurity, MIT Bengaluru (2022–2026)
- Works on adversarial ML, LLM security, AI zero-day research, threat modelling for AI systems
- Pre-Sales Security Consultant: scopes pen tests, writes proposals, runs discovery for ISO 27001, PCI DSS v4.0, SOC 2, HIPAA, DFIR engagements

Shipped projects:
- Proposal Engine: production 5-agent pipeline (Groq + Llama 3.3) automating full pre-sales cycle — questionnaire, discovery, scoping, pricing, proposal — across 6 BUs and 22 services. Includes adversarial CriticAgent. Live on Streamlit Community Cloud. github.com/sanjayrkshetty/proposal-engine
- presales-automation: full-stack React + Express + SQLite app automating DFIR pre-sales — DOCX proposals, Claude API with prompt caching, Excel import/export
- claude-code-best-practices: reference guide + JARVIS personal AI dashboard for Claude Code patterns

Links:
- GitHub: github.com/sanjayrkshetty
- LinkedIn: linkedin.com/in/sanjay-r-k-shetty-1048ba245
- Email: sanjaybehaves@gmail.com

Rules:
- Be direct and concise (2-4 sentences max per answer)
- If asked something you don't know about Sanjay, say so honestly
- Do not invent credentials, projects, or details not listed above
- For collaboration/hire enquiries, direct them to LinkedIn or email`;

// Free provider chain: Groq (primary, 300 tok/s) → OpenRouter free tier
function getModel(provider: string) {
  switch (provider) {
    case "openrouter": {
      const openrouter = createOpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY ?? "sk-or-free",
        headers: { "HTTP-Referer": "https://sanjay.dev", "X-Title": "Portfolio" },
      });
      return openrouter("meta-llama/llama-3.3-70b-instruct:free");
    }
    default: {
      return createGroq({ apiKey: process.env.GROQ_API_KEY ?? "" })("llama-3.3-70b-versatile");
    }
  }
}

export async function POST(req: Request) {
  const { messages, provider = "groq" } = await req.json();

  // Graceful fallback: try requested provider, then the other free one
  const chain = provider === "openrouter" ? ["openrouter", "groq"] : ["groq", "openrouter"];

  let lastErr: Error | null = null;
  for (const p of chain) {
    try {
      const result = streamText({
        model: getModel(p),
        system: SYSTEM,
        messages,
        maxOutputTokens: 400,
        headers: { "X-Provider-Used": p },
      });
      return result.toUIMessageStreamResponse({
        headers: { "X-Provider-Used": p },
      });
    } catch (err: unknown) {
      lastErr = err as Error;
      const status = (err as { status?: number })?.status;
      if (status === 401 || status === 429 || status === 402) continue;
      if ((err as Error).message?.includes("API key")) continue;
      throw err;
    }
  }
  return new Response(JSON.stringify({ error: lastErr?.message ?? "All providers failed" }), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  });
}
