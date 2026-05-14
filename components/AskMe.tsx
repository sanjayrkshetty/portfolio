"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useEffect, useState } from "react";

const SUGGESTIONS = [
  "What does Sanjay research at SISA?",
  "What has he shipped?",
  "What's his pre-sales experience?",
  "How can I collaborate with him?",
];

const PROVIDERS = [
  { id: "groq",       label: "Groq",        sub: "Llama 3.3 · Free · 300 tok/s", color: "#f97316" },
  { id: "openrouter", label: "OpenRouter",  sub: "Llama 3.3 · Free · Fallback",  color: "#a78bfa" },
];

function getTextFromMessage(msg: { parts: Array<{ type: string; text?: string }> }) {
  return msg.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export default function AskMe() {
  const [provider, setProvider] = useState("groq");
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { provider },
    }),
  });

  useEffect(() => {
    if (messages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isLoading = status === "streaming" || status === "submitted";
  const hasMessages = messages.length > 0;
  const activeProvider = PROVIDERS.find((p) => p.id === provider)!;

  function submit(text: string) {
    if (!text.trim() || isLoading) return;
    sendMessage({ text: text.trim() });
    setInput("");
  }

  return (
    <section id="ask" className="section" style={{ background: "rgba(17,17,17,0.5)" }}>
      <div className="container">
        <div className="section-label">AI Assistant</div>
        <h2 className="section-title">Ask Me Anything</h2>
        <p style={{ color: "var(--muted)", marginBottom: "24px", maxWidth: "560px" }}>
          Ask about my work, research, or how to collaborate. Pick your model — all stream
          via Vercel AI SDK Edge Runtime.
        </p>

        {/* Model selector */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setProvider(p.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px 14px",
                borderRadius: "10px",
                border: `1px solid ${provider === p.id ? p.color : "var(--border)"}`,
                background: provider === p.id ? `${p.color}18` : "var(--surface)",
                cursor: "pointer",
                transition: "all 0.15s",
                minWidth: "140px",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "0.85rem", color: provider === p.id ? p.color : "var(--text)" }}>
                {p.label}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "2px" }}>{p.sub}</span>
            </button>
          ))}
        </div>

        <div
          style={{
            maxWidth: "680px",
            background: "var(--surface)",
            border: `1px solid ${activeProvider.color}40`,
            borderRadius: "16px",
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}
        >
          {/* Chat area */}
          <div
            style={{
              height: "340px",
              overflowY: "auto",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {!hasMessages && (
              <div style={{ margin: "auto", textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>💬</div>
                <div style={{ color: "var(--muted)", fontSize: "0.8rem", marginBottom: "16px" }}>
                  Powered by <span style={{ color: activeProvider.color }}>{activeProvider.label}</span>
                  {" "}— {activeProvider.sub}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      style={{
                        padding: "7px 13px",
                        borderRadius: "8px",
                        background: `${activeProvider.color}18`,
                        color: activeProvider.color,
                        border: `1px solid ${activeProvider.color}30`,
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = getTextFromMessage(m as { parts: Array<{ type: string; text?: string }> });
              return (
                <div
                  key={m.id}
                  className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}
                  style={m.role === "user" ? { background: activeProvider.color } : undefined}
                >
                  {text}
                </div>
              );
            })}

            {isLoading && (
              <div className="chat-bubble-ai">
                <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: activeProvider.color, display: "inline-block",
                        animation: `bounce 1s infinite ${i * 0.15}s`,
                      }}
                    />
                  ))}
                  <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); submit(input); }}
            style={{
              display: "flex", gap: "10px", padding: "16px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask via ${activeProvider.label}...`}
              disabled={isLoading}
              style={{
                flex: 1, background: "var(--bg)", border: "1px solid var(--border)",
                borderRadius: "8px", padding: "10px 14px", color: "var(--text)",
                fontSize: "0.875rem", outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                padding: "10px 18px", background: activeProvider.color,
                color: "#fff", border: "none", borderRadius: "8px",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                fontSize: "0.875rem", fontWeight: 500, transition: "opacity 0.2s",
              }}
            >
              Send
            </button>
          </form>
        </div>

        <p style={{ marginTop: "10px", fontSize: "0.72rem", color: "var(--muted)" }}>
          Chain: Groq (primary, free) → OpenRouter (fallback, free) · Vercel Edge Runtime · auto-failover
        </p>
      </div>
    </section>
  );
}
