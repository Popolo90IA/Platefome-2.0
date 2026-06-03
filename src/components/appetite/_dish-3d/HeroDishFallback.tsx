"use client";

import { PlateGarnish } from "./PlateGarnish";
import { useDragRotate } from "./useDragRotate";

/* ── Fallback CSS interactif — drag-rotate plate + halo + shadow + steam ── */
export function HeroDishFallback() {
  const { containerRef, onMouseDown, onTouchStart } = useDragRotate();

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
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(28 88% 48% / 0.15) 0%, transparent 65%)",
          filter: "blur(40px)",
          animation: "heroGlow 5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Ombre sol */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "280px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.45)",
          filter: "blur(16px)",
          pointerEvents: "none",
        }}
      />

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
        <PlateGarnish />
      </div>

      {/* Vapeur */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "60px",
            left: `calc(50% + ${(i - 1) * 30}px)`,
            width: "20px",
            height: "60px",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)",
            filter: "blur(5px)",
            animation: `steamUp ${2.5 + i * 0.6}s ease-out ${i * 0.8}s infinite`,
            opacity: 0,
            pointerEvents: "none",
          }}
        />
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
