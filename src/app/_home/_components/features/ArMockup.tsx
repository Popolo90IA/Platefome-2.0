"use client";

import { MOCKUP } from "./styles";

/**
 * ArMockup — pill "360° AR Mode" + iPhone/Android ✓.
 */
export function ArMockup() {
  return (
    <div style={{ ...MOCKUP, textAlign: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "hsl(36,80%,55%,.1)",
          border: "1px solid hsl(36,80%,55%,.2)",
          borderRadius: 8,
          padding: "8px 16px",
          marginBottom: 10,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(36,80%,62%)"
          strokeWidth="2"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".8rem",
            color: "hsl(28,62%,42%)",
            fontWeight: 600,
          }}
        >
          360° AR Mode
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".75rem",
            color: "hsl(28,8%,50%)",
          }}
        >
          iPhone ✓
        </span>
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".75rem",
            color: "hsl(28,8%,50%)",
          }}
        >
          Android ✓
        </span>
      </div>
    </div>
  );
}
