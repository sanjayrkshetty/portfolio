export default function About() {
  const timeline = [
    {
      year: "2026",
      title: "AI Security Researcher",
      org: "SISA Information Security",
      desc: "Adversarial ML research, LLM security analysis, AI threat modelling for enterprise clients.",
    },
    {
      year: "2022–",
      title: "B.Tech Cybersecurity",
      org: "MIT Bengaluru",
      desc: "Security testing, network forensics, applied cryptography, incident response.",
    },
    {
      year: "2024–",
      title: "Pre-Sales Security Consultant",
      org: "SISA",
      desc: "Scope pen tests, write proposals, run discovery for ISO 27001, PCI DSS v4.0, SOC 2, HIPAA, DFIR engagements.",
    },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-label">Background</div>
        <h2 className="section-title">About</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <div>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "20px" }}>
              I work at the intersection of AI and offensive security — building threat models for AI systems,
              researching adversarial ML, and helping organisations understand what breaks before attackers do.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
              My edge: I do real pre-sales consulting while still studying. That means I understand how
              security decisions are made commercially, not just technically. I build tools that collapse
              the gap between research and delivery.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {timeline.map((t) => (
              <div
                key={t.title}
                className="card"
                style={{ padding: "20px", display: "flex", gap: "16px" }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--accent-light)",
                    minWidth: "44px",
                    paddingTop: "2px",
                  }}
                >
                  {t.year}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "2px" }}>{t.title}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--accent-light)", marginBottom: "6px" }}>{t.org}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
