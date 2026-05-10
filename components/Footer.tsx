"use client";
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 24px",
        textAlign: "center",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
          srks<span style={{ color: "var(--accent-light)" }}>.</span>
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          {[
            { label: "GitHub", url: "https://github.com/sanjayrkshetty" },
            { label: "LinkedIn", url: "https://linkedin.com/in/sanjay-r-k-shetty-1048ba245" },
            { label: "Email", url: "mailto:sanjaybehaves@gmail.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.url}
              target={l.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener"
              style={{ color: "var(--muted)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >
              {l.label}
            </a>
          ))}
        </div>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
          © 2026 · Next.js 15 + Vercel AI SDK
        </span>
      </div>
    </footer>
  );
}
