"use client";
import { useEffect, useState } from "react";

const ROLES = [
  "AI Security Researcher",
  "LLM Threat Modeller",
  "Pre-Sales Consultant",
  "Adversarial ML Researcher",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }}
      />
      {/* radial glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(46,116,181,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "760px", textAlign: "center" }}>
        <div className="fade-up" style={{ marginBottom: "16px" }}>
          <span className="badge">Available for collaboration</span>
        </div>

        <h1
          className="fade-up-1"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "20px",
          }}
        >
          Sanjay R K{" "}
          <span className="gradient-text">Shetty</span>
        </h1>

        <div
          className="fade-up-2"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
            color: "var(--muted)",
            marginBottom: "28px",
            minHeight: "2rem",
            fontWeight: 400,
          }}
        >
          <span style={{ color: "var(--accent-light)", fontWeight: 600 }}>
            {displayed}
          </span>
          <span style={{ color: "var(--accent-light)", animation: "blink 1s infinite" }}>|</span>
          <style>{`@keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }`}</style>
        </div>

        <p
          className="fade-up-3"
          style={{
            fontSize: "1rem",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 auto 36px",
          }}
        >
          AI Researcher at{" "}
          <a
            href="https://www.sisainfosecurity.com"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--text)", textDecoration: "underline", textDecorationColor: "var(--border)" }}
          >
            SISA Information Security
          </a>
          . B.Tech Cybersecurity, MIT Bengaluru &apos;26. I build threat models
          for AI systems and automate security consulting workflows.
        </p>

        <div className="fade-up-3" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn-primary" href="#projects">View Work</a>
          <a className="btn-ghost" href="#ask">Ask Me Anything</a>
          <a
            className="btn-ghost"
            href="https://linkedin.com/in/sanjay-r-k-shetty-1048ba245"
            target="_blank"
            rel="noopener"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
