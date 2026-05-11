"use client";
import { useEffect, useState } from "react";

const ROLES = [
  "AI Security Researcher",
  "LLM Threat Modeller",
  "Adversarial ML Engineer",
  "Pre-Sales Consultant",
];

const STATS = [
  { value: "3+", label: "years in cybersec" },
  { value: "6", label: "BU domains" },
  { value: "22", label: "services shipped" },
  { value: "∞", label: "problems to solve" },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 58);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2400);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated grid */}
      <div className="grid-bg" />

      {/* Radial glow blobs */}
      <div style={{
        position: "absolute", top: "30%", left: "15%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,136,0.055) 0%, transparent 65%)",
        pointerEvents: "none", filter: "blur(20px)",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "10%",
        width: "380px", height: "380px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 65%)",
        pointerEvents: "none", filter: "blur(30px)",
      }} />

      <div style={{ position: "relative", maxWidth: "820px", width: "100%", textAlign: "center" }}>

        {/* Status badge */}
        <div className="fade-up" style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "9999px",
            background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.18)",
            fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace",
            color: "var(--accent)", letterSpacing: "0.04em",
          }}>
            <span className="glow-dot" />
            Open to research collaborations
          </span>
        </div>

        {/* Main headline */}
        <h1 className="fade-up-1" style={{
          fontSize: "clamp(2.6rem, 8vw, 5.2rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.04,
          marginBottom: "4px",
        }}>
          I build things
        </h1>
        <h1 className="fade-up-2" style={{
          fontSize: "clamp(2.6rem, 8vw, 5.2rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.04,
          marginBottom: "28px",
        }}>
          that <span className="gradient-text">think.</span>
        </h1>

        {/* Typewriter role */}
        <div className="fade-up-2" style={{
          fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
          color: "var(--muted)",
          marginBottom: "20px",
          minHeight: "2rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 400,
        }}>
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>{">"} </span>
          <span style={{ color: "var(--text)" }}>{displayed}</span>
          <span style={{ color: "var(--accent)", animation: "blink 1s infinite" }}>_</span>
        </div>

        {/* Description */}
        <p className="fade-up-3" style={{
          fontSize: "0.975rem",
          color: "var(--muted)",
          lineHeight: 1.75,
          maxWidth: "580px",
          margin: "0 auto 40px",
        }}>
          AI Researcher at{" "}
          <a
            href="https://www.sisainfosecurity.com"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--text)", textDecoration: "underline", textDecorationColor: "var(--border2)", textUnderlineOffset: "3px" }}
          >
            SISA Information Security
          </a>
          .{" "}
          B.Tech Cybersecurity, MIT Bengaluru &apos;26.
          Building threat models for AI systems and automating security consulting.
        </p>

        {/* CTA buttons */}
        <div className="fade-up-3" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" }}>
          <a className="btn-primary" href="#projects">View Work ↓</a>
          <a className="btn-ghost" href="#ask">Ask Me Anything</a>
          <a className="btn-ghost" href="https://github.com/sanjayrkshetty" target="_blank" rel="noopener">
            GitHub ↗
          </a>
        </div>

        {/* Stats row */}
        <div className="fade-up-4" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "var(--border)",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}>
          {STATS.map((s) => (
            <div key={s.label} style={{
              background: "var(--surface)",
              padding: "20px 16px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--accent)",
                lineHeight: 1,
                marginBottom: "4px",
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: "0.7rem",
                color: "var(--muted)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.04em",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
