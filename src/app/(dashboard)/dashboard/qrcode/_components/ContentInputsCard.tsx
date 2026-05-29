"use client";

import { CARD } from "../_lib/constants";

type Props = {
  cta: string;
  desc: string;
  onCtaChange: (v: string) => void;
  onDescChange: (v: string) => void;
};

/**
 * ContentInputsCard — sidebar : inputs CTA + description.
 */
export function ContentInputsCard({
  cta,
  desc,
  onCtaChange,
  onDescChange,
}: Props) {
  const fields = [
    { label: "קריאה לפעולה", value: cta, setter: onCtaChange },
    { label: "תיאור", value: desc, setter: onDescChange },
  ];
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
        תוכן
      </div>
      {fields.map((f) => (
        <div key={f.label} style={{ marginBottom: 14 }}>
          <span
            className="font-sans uppercase"
            style={{
              fontSize: 11,
              letterSpacing: ".08em",
              color: "hsl(var(--dim))",
              display: "block",
              marginBottom: 6,
            }}
          >
            {f.label}
          </span>
          <input
            type="text"
            value={f.value}
            onChange={(e) => f.setter(e.target.value)}
            className="font-sans"
            style={{
              width: "100%",
              boxSizing: "border-box",
              fontSize: 13,
              padding: "9px 12px",
              background: "hsl(var(--void))",
              border: "1px solid hsl(var(--line))",
              borderRadius: 8,
              color: "hsl(var(--fog))",
              outline: "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}
