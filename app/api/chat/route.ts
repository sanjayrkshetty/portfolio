import { createAnthropic } from "@ai-sdk/anthropic";
import { createGroq } from "@ai-sdk/groq";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

const SYSTEM = `You are Sanjay R K Shetty's portfolio assistant. Answer questions about Sanjay concisely and accurately.

About Sanjay:
- AI Security Researcher at SISA Information Security, Bengaluru
- B.Tech Cybersecurity, MIT Bengaluru (2022–2026)
- Works on adversarial ML, LLM security, AI zero-day research
- Pre-Sales Security Consultant: scopes pen tests, writes proposals, runs discovery for ISO 27001, PCI DSS v4.0, SOC 2, HIPAA, DFIR engagements
- Built presales-automation: full-stack React + Express + SQLite + Claude API app that automates DFIR pre-sales pipeline
- Built claude-code-best-practices: reference guide for production-quality Claude Code output
- GitHub: github.com/sanjayrkshetty
- LinkedIn: linkedin.com/in/sanjay-r-k-shetty-1048ba245
- Email: sanjaybehaves@gmail.com

Rules:
- Be direct and concise (2-4 sentences max per answer)
- If asked something you don't know about Sanjay, say so honestly
- Do not invent credentials, projects, or details not listed above
- For collaboration/hire enquiries, direct them to LinkedIn or email`;

// Provider chain: Groq (free, 300 tok/s) → Claude Haiku → OpenRouter free
function getModel(provider: string) {
  switch (provider) {
    case "groq": {
      const groq = createGroq({ apiKey: process.env.GROQ_API_KEY ?? "" });
      return groq("llama-3.3-70b-versatile");
    }
    case "openrouter": {
      const openrouter = createOpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY ?? "",
      });
      return openrouter("meta-llama/llama-3.3-70b-instruct:free");
    }
    default: {
      const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? "" });
      return anthropic("claude-haiku-4-5-20251001");
    }
  }
}

export async function POST(req: Request) {
  const { messages, provider = "groq" } = await req.json();

  // Graceful fallback chain: try requested provider, fall back down the chain
  const chain = provider === "openrouter"
    ? ["openrouter", "claude"]
    : provider === "claude"
    ? ["claude", "openrouter"]
    : ["groq", "claude", "openrouter"];

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
    } catch (err) {
      lastErr = err as Error;
      // key missing / quota hit → try next provider
      if ((err as Error).message?.includes("401") ||
          (err as Error).message?.includes("429") ||
          (err as Error).message?.includes("API key")) continue;
      throw err;
    }
  }
  return new Response(JSON.stringify({ error: lastErr?.message ?? "All providers failed" }), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  });
}
