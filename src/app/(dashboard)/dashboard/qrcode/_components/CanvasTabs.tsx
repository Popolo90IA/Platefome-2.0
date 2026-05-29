"use client";

import { CANVAS_TABS } from "../_lib/constants";

type Props = {
  activeTab: number;
  onSelect: (i: number) => void;
};

/**
 * CanvasTabs — barre d'onglets du canvas central (3D / קדמי / אחורי / הדפסה).
 */
export function CanvasTabs({ activeTab, onSelect }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 28,
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        className="qr-tabs"
        style={{
          display: "inline-flex",
          gap: 3,
          padding: 4,
          background: "rgba(255,255,255,.10)",
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: 12,
        }}
      >
        {CANVAS_TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => onSelect(i)}
            className="font-sans"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: activeTab === i ? 600 : 400,
              color: activeTab === i ? "hsl(28,15%,10%)" : "rgba(255,255,255,.85)",
              background: activeTab === i ? "hsl(var(--fog))" : "transparent",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all .15s",
              boxShadow: activeTab === i ? "0 1px 6px rgba(0,0,0,.18)" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
