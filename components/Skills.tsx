const SKILLS = [
  {
    category: "AI Security",
    color: "#4a9fd4",
    items: ["Adversarial ML", "LLM Threat Modelling", "AI Zero-Day Research", "Prompt Injection Analysis", "Model Extraction"],
  },
  {
    category: "Security Testing",
    color: "#22c55e",
    items: ["OWASP ZAP", "Web App Pentesting", "Network Pentesting", "API Security", "Cloud Security", "VA&M"],
  },
  {
    category: "DFIR",
    color: "#f59e0b",
    items: ["Incident Response", "Digital Forensics", "Threat Hunting", "Tabletop Exercises", "Forensic Analysis"],
  },
  {
    category: "Compliance",
    color: "#a78bfa",
    items: ["PCI DSS v4.0", "ISO/IEC 27001", "SOC 2", "HIPAA", "GDPR"],
  },
  {
    category: "Engineering",
    color: "#f472b6",
    items: ["React / Next.js", "Node.js / Express", "Python", "SQLite", "Claude API", "Vercel AI SDK"],
  },
  {
    category: "Pre-Sales",
    color: "#34d399",
    items: ["Discovery & Scoping", "Proposal Writing", "Effort Estimation", "Demo Scripts", "Pipeline Automation"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ background: "rgba(17,17,17,0.5)" }}>
      <div className="container">
        <div className="section-label">Capabilities</div>
        <h2 className="section-title">Skills</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {SKILLS.map((s) => (
            <div key={s.category} className="card" style={{ padding: "24px" }}>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: s.color,
                  marginBottom: "14px",
                }}
              >
                {s.category}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {s.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      background: `${s.color}14`,
                      color: s.color,
                      border: `1px solid ${s.color}30`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
