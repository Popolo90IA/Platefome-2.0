"use client";

/* ─── VideoModal — fullscreen video overlay (click backdrop to close) ── */
export function VideoModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.9)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(90vw,900px)",
          background: "hsl(var(--abyss))",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid hsl(var(--line))",
        }}
      >
        <video src={src} controls autoPlay style={{ width: "100%", display: "block" }} />
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "hsl(var(--deep))",
          border: "1px solid hsl(var(--line))",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "hsl(var(--cream))",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
