"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = ["About", "Skills", "Projects", "Ask"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em" }}>
        srks<span style={{ color: "var(--accent-light)" }}>.</span>
      </span>
      <div style={{ display: "flex", gap: "28px" }}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              color: "var(--muted)",
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}
