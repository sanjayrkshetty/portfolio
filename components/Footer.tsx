"use client";

const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/sanjayrkshetty" },
  { label: "LinkedIn", url: "https://linkedin.com/in/sanjay-r-k-shetty-1048ba245" },
  { label: "Twitter", url: "https://twitter.com/sanjayrkshetty" },
  { label: "Email", url: "mailto:sanjaybehaves@gmail.com" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 28px 32px" }}>
      <div className="container" style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
      }}>
        <a href="#hero" style={{ textDecoration: "none" }}>
          <span style={{
            fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #00ff88, #58a6ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>srks</span>
          <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "1.1rem" }}>.</span>
        </a>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {SOCIAL_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target={l.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener"
              style={{
                color: "var(--muted)", fontSize: "0.82rem", textDecoration: "none",
                fontFamily: "'JetBrains Mono', monospace", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
            >
              {l.label} ↗
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8 }}>
          <div>© 2026 Sanjay R K Shetty · All rights reserved</div>
          <div style={{ marginTop: "4px", opacity: 0.5 }}>Built with Next.js 15 · Deployed on Vercel</div>
        </div>
      </div>
    </footer>
  );
}
