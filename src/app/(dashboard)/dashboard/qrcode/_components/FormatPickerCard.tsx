"use client";

import { CARD, FORMATS } from "../_lib/constants";

type Props = {
  formatIdx: number;
  onSelect: (i: number) => void;
};

const PREVIEWS = [
  /* 0 — Tent A6 portrait */
  <svg key="tent" viewBox="0 0 28 40" width={28} height={40}>
    <rect
      x="1"
      y="1"
      width="26"
      height="38"
      rx="2"
      fill="#f6f4ef"
      stroke="hsl(28,15%,30%)"
      strokeWidth=".8"
    />
    <rect x="8" y="10" width="12" height="12" rx="1" fill="hsl(28,15%,12%)" />
    <rect x="7" y="25" width="14" height="2" rx="1" fill="hsl(28,15%,40%)" />
    <rect x="10" y="29" width="8" height="1.5" rx="1" fill="hsl(28,15%,60%)" />
  </svg>,
  /* 1 — Coaster square */
  <svg key="coaster" viewBox="0 0 36 36" width={36} height={36}>
    <rect
      x="1"
      y="1"
      width="34"
      height="34"
      rx="6"
      fill="#f6f4ef"
      stroke="hsl(28,15%,30%)"
      strokeWidth=".8"
    />
    <rect x="10" y="10" width="16" height="16" rx="1" fill="hsl(28,15%,12%)" />
  </svg>,
  /* 2 — Card landscape */
  <svg key="card" viewBox="0 0 40 26" width={40} height={26}>
    <rect
      x="1"
      y="1"
      width="38"
      height="24"
      rx="2"
      fill="#f6f4ef"
      stroke="hsl(28,15%,30%)"
      strokeWidth=".8"
    />
    <rect x="5" y="6" width="14" height="14" rx="1" fill="hsl(28,15%,12%)" />
    <rect x="23" y="9" width="12" height="2" rx="1" fill="hsl(28,15%,40%)" />
    <rect x="23" y="13" width="9" height="1.5" rx="1" fill="hsl(28,15%,60%)" />
  </svg>,
  /* 3 — Poster portrait + logo */
  <svg key="poster" viewBox="0 0 24 36" width={24} height={36}>
    <rect
      x="1"
      y="1"
      width="22"
      height="34"
      rx="1"
      fill="#f6f4ef"
      stroke="hsl(28,15%,30%)"
      strokeWidth=".8"
    />
    <rect
      x="5"
      y="4"
      width="14"
      height="4"
      rx="1"
      fill="hsl(28,62%,42%)"
      opacity=".4"
    />
    <rect x="6" y="11" width="12" height="12" rx="1" fill="hsl(28,15%,12%)" />
    <rect x="5" y="26" width="14" height="2" rx="1" fill="hsl(28,15%,40%)" />
    <rect x="7" y="30" width="10" height="1.5" rx="1" fill="hsl(28,15%,60%)" />
  </svg>,
];

/**
 * FormatPickerCard — sidebar : choix format d'impression (Tent/Coaster/Card/Poster).
 */
export function FormatPickerCard({ formatIdx, onSelect }: Props) {
  return (
    <div style={CARD}>
      <div
        className="font-sans uppercase"
        style={{
          fontSize: "11.5px",
          letterSpacing: ".05em",
          color: "hsl(var(--subtle))",
          marginBottom: 14,
        }}
      >
        פורמט
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {FORMATS.map((item, i) => (
          <button
            key={item.label}
            onClick={() => onSelect(i)}
            style={{
              padding: 10,
              borderRadius: 9,
              cursor: "pointer",
              textAlign: "center",
              border: `1px solid ${
                i === formatIdx ? "hsl(28,62%,42%)" : "hsl(var(--line))"
              }`,
              background:
                i === formatIdx ? "hsl(28,62%,42%,.08)" : "transparent",
              transition: "all .15s",
            }}
          >
            <div
              style={{
                borderRadius: 6,
                marginBottom: 8,
                background: "hsl(var(--abyss))",
                display: "grid",
                placeItems: "center",
                padding: 10,
                height: 56,
              }}
            >
              {PREVIEWS[i]}
            </div>
            <div
              className="font-sans uppercase"
              style={{
                fontSize: 11,
                letterSpacing: ".06em",
                color:
                  i === formatIdx
                    ? "hsl(var(--accent-bright))"
                    : "hsl(var(--fog))",
              }}
            >
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
