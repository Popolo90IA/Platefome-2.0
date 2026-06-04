"use client";

/**
 * AuroraBackground — fond aurora animé : grid lines + 3 blobs colorés
 * radiaux + fade bas. Pointer-events: none.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(hsl(var(--white) / .045) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--white) / .045) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "15%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,hsl(var(--accent-bright) / .15) 0%,transparent 60%)",
          filter: "blur(80px)",
          animation: "aurora1 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "25%",
          right: "-8%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,hsl(var(--gold-light) / .12) 0%,transparent 60%)",
          filter: "blur(100px)",
          animation: "aurora2 11s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-5%",
          width: 700,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,hsl(40,50%,80%,.1) 0%,transparent 60%)",
          filter: "blur(120px)",
          animation: "aurora3 13s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--void)))",
        }}
      />
    </div>
  );
}
