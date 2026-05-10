"use client";
import { useEffect, useRef, useState } from "react";

interface Node { id: string; group: string; x?: number; y?: number; vx?: number; vy?: number; }
interface Link { source: string; target: string; }
interface GraphData { nodes: Node[]; links: Link[]; }

const GROUP_COLORS: Record<string, string> = {
  root:    "#a78bfa",
  journal: "#34d399",
  research:"#60a5fa",
  default: "#f472b6",
};

function useForceGraph(data: GraphData, width: number, height: number) {
  const nodesRef = useRef<Node[]>([]);
  const linksRef = useRef<Link[]>([]);
  const frameRef = useRef<number>(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!data.nodes.length) return;

    // Init positions
    nodesRef.current = data.nodes.map((n, i) => ({
      ...n,
      x: width / 2 + Math.cos((i / data.nodes.length) * Math.PI * 2) * 120,
      y: height / 2 + Math.sin((i / data.nodes.length) * Math.PI * 2) * 120,
      vx: 0, vy: 0,
    }));
    linksRef.current = data.links;

    let running = true;

    function simulate() {
      if (!running) return;
      const nodes = nodesRef.current;
      const links = linksRef.current;
      const alpha = 0.3;

      // Repulsion between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = (b.x ?? 0) - (a.x ?? 0);
          const dy = (b.y ?? 0) - (a.y ?? 0);
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (3200 / (dist * dist)) * alpha;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          a.vx! -= fx; a.vy! -= fy;
          b.vx! += fx; b.vy! += fy;
        }
      }

      // Link attraction
      for (const link of links) {
        const a = nodes.find(n => n.id === link.source);
        const b = nodes.find(n => n.id === link.target);
        if (!a || !b) continue;
        const dx = (b.x ?? 0) - (a.x ?? 0);
        const dy = (b.y ?? 0) - (a.y ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - 100) * 0.05 * alpha;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx! += fx; a.vy! += fy;
        b.vx! -= fx; b.vy! -= fy;
      }

      // Center gravity + damping + bounds
      for (const n of nodes) {
        n.vx! += (width / 2 - (n.x ?? 0)) * 0.008 * alpha;
        n.vy! += (height / 2 - (n.y ?? 0)) * 0.008 * alpha;
        n.vx! *= 0.88;
        n.vy! *= 0.88;
        n.x = Math.max(24, Math.min(width - 24, (n.x ?? 0) + n.vx!));
        n.y = Math.max(24, Math.min(height - 24, (n.y ?? 0) + n.vy!));
      }

      setTick(t => t + 1);
      frameRef.current = requestAnimationFrame(simulate);
    }

    frameRef.current = requestAnimationFrame(simulate);
    return () => { running = false; cancelAnimationFrame(frameRef.current); };
  }, [data, width, height]);

  return { nodes: nodesRef.current, links: linksRef.current };
}

export default function BrainGraph() {
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  const [hovered, setHovered] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 340 });

  useEffect(() => {
    fetch("/brain-graph.json")
      .then(r => r.json())
      .then((d: GraphData) => { setData(d); setLoaded(true); });
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      setDims({ w: width, h: Math.min(360, Math.max(260, width * 0.5)) });
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const { nodes, links } = useForceGraph(data, dims.w, dims.h);

  function getNode(id: string) { return nodes.find(n => n.id === id); }

  const nodeCount = data.nodes.length;
  const linkCount = data.links.length;

  return (
    <section id="brain" style={{ padding: "72px 0", background: "rgba(0,0,0,0.6)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: 999, padding: "4px 14px", marginBottom: 14,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#a78bfa",
              boxShadow: "0 0 8px #a78bfa", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "0.72rem", color: "#a78bfa", letterSpacing: "0.12em", fontWeight: 600 }}>
              SECOND BRAIN
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800,
            background: "linear-gradient(135deg, #a78bfa 0%, #34d399 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", marginBottom: 8,
          }}>
            Knowledge Graph
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", maxWidth: 480 }}>
            My Obsidian vault — auto-synced to GitHub after every session.
            Graph topology only. No note content exposed.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
            {[
              { label: "NOTES", val: nodeCount },
              { label: "CONNECTIONS", val: linkCount },
              { label: "SYNCED", val: "LIVE" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#a78bfa" }}>{s.val}</div>
                <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Graph canvas */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            background: "rgba(10,10,20,0.8)",
            border: "1px solid rgba(167,139,250,0.15)",
            borderRadius: 16,
            overflow: "hidden",
            height: dims.h,
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Grid lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v${i}`} x1={`${(i / 12) * 100}%`} y1="0" x2={`${(i / 12) * 100}%`} y2="100%" stroke="#a78bfa" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${(i / 8) * 100}%`} x2="100%" y2={`${(i / 8) * 100}%`} stroke="#a78bfa" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Links */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {links.map((l, i) => {
              const a = getNode(l.source), b = getNode(l.target);
              if (!a || !b) return null;
              return (
                <line key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.4"
                  filter="url(#glow)"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {loaded && nodes.map(n => {
            const color = GROUP_COLORS[n.group] ?? GROUP_COLORS.default;
            const isHov = hovered === n.id;
            return (
              <div
                key={n.id}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  left: (n.x ?? 0) - (isHov ? 8 : 6),
                  top:  (n.y ?? 0) - (isHov ? 8 : 6),
                  width:  isHov ? 16 : 12,
                  height: isHov ? 16 : 12,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: isHov
                    ? `0 0 16px ${color}, 0 0 32px ${color}60`
                    : `0 0 8px ${color}80`,
                  transition: "all 0.15s ease",
                  cursor: "default",
                  zIndex: isHov ? 10 : 1,
                }}
              />
            );
          })}

          {/* Node label on hover */}
          {hovered && (() => {
            const n = nodes.find(nd => nd.id === hovered);
            if (!n) return null;
            return (
              <div style={{
                position: "absolute",
                left: Math.min((n.x ?? 0) + 14, dims.w - 180),
                top:  Math.max((n.y ?? 0) - 32, 4),
                background: "rgba(10,10,20,0.95)",
                border: "1px solid rgba(167,139,250,0.4)",
                borderRadius: 8,
                padding: "5px 12px",
                fontSize: "0.75rem",
                color: "#e8e8e8",
                fontWeight: 600,
                letterSpacing: "0.04em",
                pointerEvents: "none",
                zIndex: 20,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}>
                {n.id}
                <span style={{ marginLeft: 8, fontSize: "0.65rem", color: GROUP_COLORS[n.group] ?? GROUP_COLORS.default, opacity: 0.8 }}>
                  {n.group}
                </span>
              </div>
            );
          })()}

          {/* Empty state */}
          {loaded && nodes.length === 0 && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--muted)", fontSize: "0.8rem" }}>
              Vault is empty — add notes in Obsidian to see the graph grow
            </div>
          )}

          {/* Legend */}
          <div style={{
            position: "absolute", bottom: 14, right: 16,
            display: "flex", gap: 12, alignItems: "center",
          }}>
            {Object.entries(GROUP_COLORS).filter(([k]) => k !== "default").map(([group, color]) => (
              <div key={group} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
                <span style={{ fontSize: "0.62rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{group}</span>
              </div>
            ))}
          </div>

          {/* "auto-synced" badge */}
          <div style={{
            position: "absolute", top: 14, right: 16,
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 999, padding: "3px 10px",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399",
              boxShadow: "0 0 6px #34d399", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "0.6rem", color: "#34d399", letterSpacing: "0.1em" }}>AUTO-SYNCED</span>
          </div>

          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        </div>

        <p style={{ marginTop: 12, fontSize: "0.7rem", color: "var(--muted)", textAlign: "right" }}>
          Powered by Obsidian · Synced via <a href="https://github.com/sanjayrkshetty/second-brain"
            target="_blank" rel="noopener" style={{ color: "#a78bfa", textDecoration: "none" }}>second-brain</a> repo
        </p>
      </div>
    </section>
  );
}
