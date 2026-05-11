"use client";
import { useState, useEffect } from "react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Ask", href: "#ask" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map(({ href }) =>
      document.querySelector<HTMLElement>(href)
    ).filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: "0 28px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,15,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(30,30,46,0.8)" : "none",
      transition: "background 0.35s, backdrop-filter 0.35s, border-color 0.35s",
    }}>
      {/* Logo */}
      <a href="#hero" style={{ textDecoration: "none" }}>
        <span style={{
          fontWeight: 800,
          fontSize: "1.05rem",
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #00ff88, #58a6ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          srks
        </span>
        <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "1.05rem" }}>.</span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {LINKS.map(({ label, href }) => {
          const isActive = active === href;
          return (
            <a
              key={href}
              href={href}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--accent)" : "var(--muted)",
                textDecoration: "none",
                background: isActive ? "rgba(0,255,136,0.08)" : "transparent",
                border: isActive ? "1px solid rgba(0,255,136,0.15)" : "1px solid transparent",
                transition: "color 0.2s, background 0.2s, border-color 0.2s",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }
              }}
            >
              {label}
            </a>
          );
        })}

        <a
          href="https://linkedin.com/in/sanjay-r-k-shetty-1048ba245"
          target="_blank"
          rel="noopener"
          style={{
            marginLeft: "8px",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "var(--accent)",
            border: "1px solid rgba(0,255,136,0.25)",
            background: "rgba(0,255,136,0.05)",
            textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.12)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(0,255,136,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.05)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          LinkedIn ↗
        </a>
      </div>
    </nav>
  );
}
