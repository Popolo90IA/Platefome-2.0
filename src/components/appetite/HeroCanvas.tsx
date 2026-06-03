"use client";

import { useEffect, useRef, useState } from "react";
import { createHeroScene } from "./_hero-canvas/scene";
import { playIntro, playSwitch, ambientScale } from "./_hero-canvas/anim";

interface HeroCanvasProps {
  modelUrl: string;
}

export function HeroCanvas({ modelUrl }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // ── GSAP intro ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    requestAnimationFrame(() =>
      playIntro({ wrap: wrapRef.current, flash: flashRef.current, amb: ambientRef.current }),
    );
  }, [loaded]);

  // ── GSAP switch ──────────────────────────────────────────────────────────
  const prevUrl = useRef<string | null>(null);
  useEffect(() => {
    if (prevUrl.current === null) {
      prevUrl.current = modelUrl;
      return;
    }
    if (prevUrl.current === modelUrl) return;
    prevUrl.current = modelUrl;
    playSwitch({ wrap: wrapRef.current, flash: flashRef.current });
  }, [modelUrl]);

  // ── Three.js ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    setLoaded(false);
    return createHeroScene({ canvas, wrap, modelUrl, onLoaded: () => setLoaded(true) });
  }, [modelUrl]);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => ambientScale(ambientRef.current, true)}
      onMouseLeave={() => ambientScale(ambientRef.current, false)}
      style={{ position: "relative", width: "100%", height: "420px", borderRadius: 16, overflow: "visible", opacity: 0, visibility: "hidden" }}
    >
      <div ref={ambientRef} style={{
        position: "absolute", inset: "-22%", borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 55%, hsl(36,85%,58%,.18) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none", opacity: 0, visibility: "hidden", zIndex: 0,
      }} />
      <div ref={flashRef} style={{
        position: "absolute", inset: 0, borderRadius: 16,
        background: "radial-gradient(ellipse at 50% 50%, hsl(45,100%,78%,.9) 0%, hsl(36,90%,58%,.4) 28%, transparent 58%)",
        filter: "blur(22px)", pointerEvents: "none", opacity: 0, visibility: "hidden", zIndex: 4,
      }} />
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "grab", position: "relative", zIndex: 1, borderRadius: 16 }} />
      {!loaded && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, pointerEvents: "none", zIndex: 6, borderRadius: 16, background: "hsl(36,20%,96%,.6)", backdropFilter: "blur(8px)" }}>
          <div style={{ width: 32, height: 32, border: "1.5px solid hsl(36,30%,82%)", borderTopColor: "hsl(36,65%,50%)", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5625rem", letterSpacing: ".18em", textTransform: "uppercase", color: "hsl(28,20%,52%)" }}>טוען מודל</span>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
