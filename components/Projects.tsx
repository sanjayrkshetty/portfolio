const PROJECTS = [
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

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {PROJECTS.map((p) => (
            <div key={p.name} className="card" style={{ padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <h3 style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                      {p.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        background: "rgba(34,197,94,0.15)",
                        color: "#22c55e",
                        border: "1px solid rgba(34,197,94,0.3)",
                        fontWeight: 600,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "0.875rem" }}>{p.tagline}</div>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  className="btn-ghost"
                  style={{ fontSize: "0.8rem", padding: "7px 14px" }}
                >
                  GitHub ↗
                </a>
              </div>

              <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "20px", fontSize: "0.9rem" }}>
                {p.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                {p.stack.map((s) => (
                  <span key={s} className="badge">{s}</span>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "8px" }}>
                {p.highlights.map((h) => (
                  <div
                    key={h}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                    }}
                  >
                    <span style={{ color: "var(--accent-light)", marginTop: "1px", flexShrink: 0 }}>→</span>
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
