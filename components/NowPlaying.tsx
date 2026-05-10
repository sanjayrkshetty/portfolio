"use client";
import { useEffect, useState, useRef } from "react";

interface SpotifyData {
  playing: boolean;
  title?: string;
  artist?: string;
  album?: string;
  image?: string;
  url?: string;
  progress?: number;
  duration?: number;
  top?: { title: string; artist: string; image: string | null; url: string }[];
  error?: string;
}

// Extract dominant color from album art via canvas
function extractColor(imgUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 8; canvas.height = 8;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve("#a78bfa");
      ctx.drawImage(img, 0, 0, 8, 8);
      const d = ctx.getImageData(0, 0, 8, 8).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < d.length; i += 4) {
        // Skip very dark or very light pixels
        const brightness = (d[i] + d[i+1] + d[i+2]) / 3;
        if (brightness > 30 && brightness < 220) {
          r += d[i]; g += d[i+1]; b += d[i+2]; count++;
        }
      }
      if (!count) return resolve("#a78bfa");
      resolve(`rgb(${Math.round(r/count)},${Math.round(g/count)},${Math.round(b/count)})`);
    };
    img.onerror = () => resolve("#a78bfa");
    img.src = imgUrl;
  });
}

// Inject album color into CSS vars — updates the WHOLE portfolio theme
function applyVibeColor(color: string) {
  const root = document.documentElement;
  root.style.setProperty("--spotify-vibe", color);
  root.style.setProperty("--accent", color);
  root.style.setProperty("--accent-light", color + "cc");
}

export default function NowPlaying() {
  const [data, setData]       = useState<SpotifyData | null>(null);
  const [vibe, setVibe]       = useState<string>("#a78bfa");
  const [loading, setLoading] = useState(true);
  const pollRef               = useRef<ReturnType<typeof setInterval> | null>(null);

  async function fetchNowPlaying() {
    try {
      const res  = await fetch("/api/spotify/now-playing");
      const json = await res.json() as SpotifyData;
      setData(json);
      if (json.image) {
        const color = await extractColor(json.image);
        setVibe(color);
        applyVibeColor(color);
      }
    } catch {
      setData({ playing: false, error: "failed" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNowPlaying();
    // Poll every 30s to keep "now playing" fresh
    pollRef.current = setInterval(fetchNowPlaying, 30000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  if (loading) return null;
  if (!data || data.error === "no_token") return null; // Spotify not configured — hide silently

  const progress = data.playing && data.duration
    ? Math.round((data.progress! / data.duration) * 100)
    : null;

  return (
    <section id="vibe" style={{ padding: "56px 0", background: "rgba(0,0,0,0.4)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${vibe}18`, border: `1px solid ${vibe}40`,
            borderRadius: 999, padding: "4px 14px",
          }}>
            {/* Spotify bars animation */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14 }}>
              {[1, 0.6, 0.9, 0.4].map((h, i) => (
                <div key={i} style={{
                  width: 3, background: vibe,
                  borderRadius: 2,
                  height: data.playing ? `${h * 14}px` : "4px",
                  animation: data.playing ? `bar${i} 0.${6+i}s ease-in-out infinite alternate` : "none",
                  transition: "height 0.3s",
                }} />
              ))}
            </div>
            <span style={{ fontSize: "0.7rem", color: vibe, letterSpacing: "0.12em", fontWeight: 600 }}>
              {data.playing ? "NOW PLAYING" : "RECENT VIBE"}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, maxWidth: 600 }}>
          {/* Album art */}
          {data.image && (
            <a href={data.url} target="_blank" rel="noopener" style={{ flexShrink: 0 }}>
              <div style={{
                width: 88, height: 88, borderRadius: 10, overflow: "hidden",
                boxShadow: `0 0 24px ${vibe}60, 0 4px 20px rgba(0,0,0,0.5)`,
                animation: data.playing ? "spin 20s linear infinite" : "none",
                border: `2px solid ${vibe}40`,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.image} alt={data.album} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </a>
          )}

          {/* Track info */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
            <a href={data.url} target="_blank" rel="noopener"
              style={{ textDecoration: "none", color: "var(--text)", fontWeight: 700,
                fontSize: "1rem", lineHeight: 1.2,
                textShadow: `0 0 20px ${vibe}60` }}>
              {data.title}
            </a>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{data.artist}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)", opacity: 0.6 }}>{data.album}</div>

            {/* Progress bar */}
            {progress !== null && (
              <div style={{ marginTop: 8, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, width: "100%" }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  background: `linear-gradient(90deg, ${vibe}, ${vibe}aa)`,
                  width: `${progress}%`,
                  boxShadow: `0 0 8px ${vibe}`,
                  transition: "width 1s linear",
                }} />
              </div>
            )}
          </div>
        </div>

        {/* Top 5 recent tracks */}
        {data.top && data.top.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.12em", marginBottom: 12 }}>
              RECENT OBSESSIONS
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {data.top.map((t, i) => (
                <a key={i} href={t.url} target="_blank" rel="noopener"
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: `${vibe}10`, border: `1px solid ${vibe}25`,
                    borderRadius: 8, padding: "6px 12px",
                    textDecoration: "none", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${vibe}20`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${vibe}10`; }}
                >
                  {t.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.image} alt="" style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }} />
                  )}
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.2 }}>{t.title}</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{t.artist}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <p style={{ marginTop: 16, fontSize: "0.65rem", color: "var(--muted)", opacity: 0.5 }}>
          Site accent color updates live from album art · Powered by Spotify
        </p>
      </div>

      <style>{`
        @keyframes bar0{from{height:4px}to{height:14px}}
        @keyframes bar1{from{height:8px}to{height:6px}}
        @keyframes bar2{from{height:12px}to{height:4px}}
        @keyframes bar3{from{height:5px}to{height:13px}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </section>
  );
}
