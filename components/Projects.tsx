const PROJECTS = [
  {
    name: "proposal-engine",
    tagline: "Agentic pre-sales automation — 6 BUs, 22 services",
    description:
      "Production multi-agent pipeline that automates the full pre-sales cycle: discovery questionnaire, scoping, pricing, and proposal generation. Built on Groq (Llama 3), zero-cost deployment on Streamlit Community Cloud. Dark web3 UI with real-time pipeline progress.",
    stack: ["Python", "Groq", "Llama 3.3-70b", "Streamlit", "PyYAML", "openpyxl"],
    highlights: [
      "5-agent pipeline: Questionnaire → Discovery → Scoping → Pricing → Proposal",
      "22 service codes across 6 business units with codebook-driven pricing",
      "90/90 tests passing — zero API calls in CI",
      "Deployed: Streamlit Community Cloud (free, auto-deploy from GitHub)",
    ],
    url: "https://github.com/sanjayrkshetty/proposal-engine",
    demo: "https://proposal-engine.streamlit.app",
    status: "live",
  },
  {
    name: "presales-automation",
    tagline: "AI-powered DFIR pre-sales pipeline",
    description:
      "Full-stack tool that automates the entire pre-sales workflow for a DFIR security firm. Opportunity tracking, AI-generated DOCX proposals (IFI/Retainer/BAS), Claude-powered follow-up drafting, GAM contacts, executive dashboard with charts.",
    stack: ["React", "Vite", "Express", "SQLite", "Claude API", "better-sqlite3"],
    highlights: [
      "Claude API with prompt caching (cache_control ephemeral)",
      "3 DOCX proposal types generated programmatically",
      "Security-hardened: helmet, rate limiting, input validation",
      "Excel import/export for bulk opportunity management",
    ],
    url: "https://github.com/sanjayrkshetty/presales-automation",
    status: "live",
  },
  {
    name: "claude-code-best-practices",
    tagline: "Production patterns for Claude Code",
    description:
      "Reference guide built from real engineering work — not tutorials. Covers CLAUDE.md setup, prompt patterns with file:line references, security non-negotiables for backend code, token efficiency, and agent usage. Includes a working README generator CLI.",
    stack: ["Node.js", "Claude API", "Vercel AI SDK", "Markdown"],
    highlights: [
      "README generator: JSON config → Claude → GitHub-ready profile",
      "Token efficiency patterns (prompt caching, maxTokens per function)",
      "Security rules: SQL parameterization, enum validation, path traversal",
      "CLAUDE.md templates for project-level and global conventions",
    ],
    url: "https://github.com/sanjayrkshetty/claude-code-best-practices",
    status: "live",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-label">Work</div>
        <h2 className="section-title">Shipped Projects</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {PROJECTS.map((p) => (
            <div key={p.name} className="card reveal" style={{ padding: "32px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "14px",
                flexWrap: "wrap",
                gap: "12px",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <h3 style={{
                      fontWeight: 700, fontSize: "1.1rem",
                      letterSpacing: "-0.02em", fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {p.name}
                    </h3>
                    <span style={{
                      fontSize: "0.65rem", padding: "2px 8px", borderRadius: "9999px",
                      background: "rgba(0,255,136,0.1)", color: "var(--accent)",
                      border: "1px solid rgba(0,255,136,0.25)", fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {p.status}
                    </span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "0.875rem" }}>{p.tagline}</div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener" className="btn-primary"
                      style={{ fontSize: "0.78rem", padding: "7px 14px" }}>
                      Live ↗
                    </a>
                  )}
                  <a href={p.url} target="_blank" rel="noopener" className="btn-ghost"
                    style={{ fontSize: "0.78rem", padding: "7px 14px" }}>
                    GitHub ↗
                  </a>
                </div>
              </div>

              <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "18px", fontSize: "0.875rem" }}>
                {p.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "20px" }}>
                {p.stack.map((s) => (
                  <span key={s} className="badge">{s}</span>
                ))}
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "8px",
              }}>
                {p.highlights.map((h) => (
                  <div key={h} style={{
                    display: "flex", alignItems: "flex-start", gap: "8px",
                    fontSize: "0.8rem", color: "var(--muted)",
                  }}>
                    <span style={{ color: "var(--accent)", marginTop: "2px", flexShrink: 0 }}>→</span>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
