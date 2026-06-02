"use client";

import { DOT_ACTIVE_W, DOT_W } from "../_lib/constants";

interface NavButtonProps {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}

function NavButton({ side, onClick, label }: NavButtonProps) {
  const points = side === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6";
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        position: "absolute",
        ...(side === "left" ? { left: 4 } : { right: 4 }),
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "hsl(38,30%,97%,.92)",
        border: "1px solid hsl(28,62%,42%,.25)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all .2s",
        boxShadow: "0 4px 14px hsl(28,62%,38%,.15)",
      }}
      onMouseOver={(e) => {
        const b = e.currentTarget;
        b.style.background = "hsl(38,32%,99%)";
        b.style.borderColor = "hsl(28,62%,42%,.5)";
        b.style.transform = "translateY(-50%) scale(1.08)";
      }}
      onMouseOut={(e) => {
        const b = e.currentTarget;
        b.style.background = "hsl(38,30%,97%,.92)";
        b.style.borderColor = "hsl(28,62%,42%,.25)";
        b.style.transform = "translateY(-50%) scale(1)";
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="hsl(28,62%,38%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points={points} />
      </svg>
    </button>
  );
}

interface Props {
  count: number;
  activeIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}

/**
 * ModelStageNav — flèches gauche/droite + dots indicateurs.
 */
export function ModelStageNav({
  count,
  activeIdx,
  onPrev,
  onNext,
  onSelect,
}: Props) {
  return (
    <>
      <NavButton side="left" onClick={onPrev} label="מודל קודם" />
      <NavButton side="right" onClick={onNext} label="מודל הבא" />
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 7,
          zIndex: 10,
        }}
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`מודל ${i + 1}`}
            style={{
              width: i === activeIdx ? DOT_ACTIVE_W : DOT_W,
              height: DOT_W,
              borderRadius: 99,
              background:
                i === activeIdx
                  ? `linear-gradient(90deg, hsl(28,62%,38%), hsl(22,70%,50%))`
                  : "hsl(28,62%,42%,.25)",
              border: "none",
              cursor: "pointer",
              transition: "all .35s cubic-bezier(.16,1,.3,1)",
              padding: 0,
            }}
          />
        ))}
      </div>
    </>
  );
}
