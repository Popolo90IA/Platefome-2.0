"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Dish3DSceneProps {
  modelUrl?: string;
  posterUrl?: string;
}

export function Dish3DScene({ modelUrl, posterUrl }: Dish3DSceneProps = {}) {
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!modelUrl) return;
    if (typeof window === "undefined") return;
    const existing = document.querySelector('script[data-mv-loaded="true"]');
    if (existing) { setScriptReady(true); return; }
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
    script.dataset.mvLoaded = "true";
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
  }, [modelUrl]);

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {modelUrl && scriptReady ? (
        /* @ts-expect-error model-viewer custom element */
        <model-viewer
          src={modelUrl} poster={posterUrl}
          alt="מנת השף — תלת-מימד"
          camera-controls auto-rotate auto-rotate-delay="0"
          rotation-per-second="15deg" camera-orbit="0deg 70deg 2.5m"
          shadow-intensity="1.5" shadow-softness="0.9" exposure="1.1"
          environment-image="neutral"
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          {/* @ts-expect-error */}
        </model-viewer>
      ) : (
        <HeroDishFallback />
      )}
    </div>
  );
}

/* ─── Fallback CSS interactif ───────────────────────────────────────── */

function HeroDishFallback() {
  const containerRef = useRef<HTMLDivElement>(null);

  // angle Y (rotation horizontale) + tilt X (vertical) + vitesse inertie
  const angleRef = useRef(0);
  const tiltRef = useRef(-15); // légère inclinaison vue de dessus
  const velRef = useRef(0);
  const tiltVelRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);

  const applyTransform = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transform = `rotateX(${tiltRef.current}deg) rotateZ(${angleRef.current}deg)`;
  }, []);

  // Boucle d'inertie
  useEffect(() => {
    const loop = () => {
      if (!draggingRef.current) {
        // auto-rotate lent si pas de drag
        velRef.current *= 0.94;
        tiltVelRef.current *= 0.92;
        if (Math.abs(velRef.current) < 0.02) velRef.current += 0.25; // auto-spin
        angleRef.current += velRef.current;
        tiltRef.current += tiltVelRef.current;
        // tilt revient doucement vers -15°
        tiltRef.current += (-15 - tiltRef.current) * 0.03;
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform]);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    isDragging.current = false;
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    velRef.current = 0;
    tiltVelRef.current = 0;
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    const dy = e.clientY - lastYRef.current;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) isDragging.current = true;
    velRef.current = dx * 0.55;
    tiltVelRef.current = dy * 0.3;
    angleRef.current += dx * 0.55;
    tiltRef.current = Math.max(-45, Math.min(10, tiltRef.current + dy * 0.3));
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    applyTransform();
  }, [applyTransform]);

  const onMouseUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    draggingRef.current = true;
    lastXRef.current = e.touches[0].clientX;
    lastYRef.current = e.touches[0].clientY;
    velRef.current = 0;
    tiltVelRef.current = 0;
  };
  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!draggingRef.current) return;
    const dx = e.touches[0].clientX - lastXRef.current;
    const dy = e.touches[0].clientY - lastYRef.current;
    velRef.current = dx * 0.55;
    tiltVelRef.current = dy * 0.3;
    angleRef.current += dx * 0.55;
    tiltRef.current = Math.max(-45, Math.min(10, tiltRef.current + dy * 0.3));
    lastXRef.current = e.touches[0].clientX;
    lastYRef.current = e.touches[0].clientY;
    applyTransform();
    e.preventDefault();
  }, [applyTransform]);
  const onTouchEnd = useCallback(() => { draggingRef.current = false; }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  return (
    <div
      style={{
        position: "relative",
        width: "480px",
        height: "480px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
        perspective: "800px",
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Halo ambiant */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(circle, hsl(28 88% 48% / 0.15) 0%, transparent 65%)",
        filter: "blur(40px)",
        animation: "heroGlow 5s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Ombre sol */}
      <div style={{
        position: "absolute", bottom: "80px", left: "50%",
        transform: "translateX(-50%)",
        width: "280px", height: "28px", borderRadius: "50%",
        background: "rgba(0,0,0,0.45)", filter: "blur(16px)",
        pointerEvents: "none",
      }} />

      {/* Assiette — tourne via JS */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "320px",
          height: "320px",
          transformStyle: "preserve-3d",
          willChange: "transform",
          userSelect: "none",
        }}
      >
        {/* Rim extérieur */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle at 38% 28%, #faf6f0 0%, #ece4d5 45%, #c8bda8 80%, #a89880 100%)",
          boxShadow: "inset 0 6px 24px rgba(255,255,255,0.7), inset 0 -8px 32px rgba(100,75,40,0.25), 0 20px 50px -10px rgba(0,0,0,0.5)",
        }} />

        {/* Well central */}
        <div style={{
          position: "absolute", inset: "18px", borderRadius: "50%",
          background: "radial-gradient(circle at 40% 30%, #f5efe5 0%, #e8dece 55%, #d4c6ae 100%)",
          boxShadow: "inset 0 4px 16px rgba(120,90,50,0.2), inset 0 -4px 12px rgba(255,255,255,0.5)",
        }} />

        {/* Sauce */}
        <div style={{
          position: "absolute", inset: "40px", borderRadius: "50%",
          background: "radial-gradient(circle at 45% 35%, #d4512a 0%, #b03a1a 50%, #7a2010 100%)",
          boxShadow: "inset 0 4px 12px rgba(200,80,30,0.4), inset 0 -4px 12px rgba(60,10,0,0.4)",
        }} />

        {/* Pâtes SVG */}
        <div style={{ position: "absolute", inset: "54px", borderRadius: "50%", overflow: "hidden" }}>
          <svg viewBox="0 0 210 210" style={{ width: "100%", height: "100%" }} fill="none">
            {[0,1,2,3,4].map(i => (
              <ellipse key={i} cx="105" cy="105"
                rx={85 - i*14} ry={40 - i*6}
                stroke="#e8c87a" strokeWidth="6"
                strokeOpacity={0.85 - i*0.1}
                transform={`rotate(${i*28} 105 105)`} />
            ))}
            {[0,1,2,3].map(i => (
              <ellipse key={`i${i}`} cx="105" cy="105"
                rx={30 - i*6} ry={14 - i*2}
                stroke="#d4a84a" strokeWidth="5"
                strokeOpacity={0.7 - i*0.1}
                transform={`rotate(${i*45+15} 105 105)`} />
            ))}
          </svg>
        </div>

        {/* Tomates */}
        {[
          { top:"30px", left:"80px",  size:28, c:"#e03020" },
          { top:"58px", right:"44px", size:24, c:"#c82010" },
          { bottom:"62px", left:"52px", size:22, c:"#d42818" },
        ].map((t,i) => (
          <div key={i} style={{
            position:"absolute", width:t.size, height:t.size, borderRadius:"50%",
            background:`radial-gradient(circle at 35% 28%, #ff6b5b, ${t.c})`,
            boxShadow:"inset -3px -3px 6px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.3)",
            top:(t as any).top, left:(t as any).left, right:(t as any).right, bottom:(t as any).bottom,
          }}>
            <div style={{ position:"absolute", top:"20%", left:"22%", width:"30%", height:"22%", borderRadius:"50%", background:"rgba(255,255,255,0.55)" }} />
          </div>
        ))}

        {/* Basilic */}
        {[
          { top:"70px",  left:"120px", rotate:"-20deg" },
          { top:"130px", left:"60px",  rotate:"35deg"  },
        ].map((b,i) => (
          <div key={i} style={{
            position:"absolute", width:"32px", height:"18px",
            borderRadius:"50% 10% 50% 10%",
            background:"radial-gradient(circle at 40% 30%, #4a9a2e, #1e5010)",
            boxShadow:"inset -1px -2px 4px rgba(0,0,0,0.25)",
            top:b.top, left:b.left, transform:`rotate(${b.rotate})`,
          }} />
        ))}

        {/* Parmesan */}
        {[
          { top:"95px",  left:"110px", w:22, h:9 },
          { top:"110px", left:"88px",  w:18, h:7 },
        ].map((p,i) => (
          <div key={i} style={{
            position:"absolute", width:p.w, height:p.h, borderRadius:"3px",
            background:"linear-gradient(135deg, #f5e8c0 0%, #e0cc90 50%, #c8aa60 100%)",
            boxShadow:"0 2px 4px rgba(0,0,0,0.2)",
            top:p.top, left:p.left, transform:`rotate(${i%2===0?-12:8}deg)`,
          }} />
        ))}

        {/* Reflet brillant assiette */}
        <div style={{
          position:"absolute", inset:0, borderRadius:"50%",
          background:"radial-gradient(ellipse at 28% 18%, rgba(255,255,255,0.45) 0%, transparent 35%)",
          pointerEvents:"none",
        }} />
      </div>

      {/* Vapeur */}
      {[0,1,2].map(i => (
        <div key={i} style={{
          position:"absolute", top:"60px",
          left:`calc(50% + ${(i-1)*30}px)`,
          width:"20px", height:"60px",
          background:"radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)",
          filter:"blur(5px)",
          animation:`steamUp ${2.5+i*0.6}s ease-out ${i*0.8}s infinite`,
          opacity:0, pointerEvents:"none",
        }} />
      ))}

      <style>{`
        @keyframes heroGlow {
          0%,100% { opacity:.7; transform:scale(1); }
          50%      { opacity:1; transform:scale(1.06); }
        }
        @keyframes steamUp {
          0%   { opacity:0; transform:translateY(0) scale(.7); }
          30%  { opacity:.5; }
          100% { opacity:0; transform:translateY(-90px) scale(1.6); }
        }
      `}</style>
    </div>
  );
}
