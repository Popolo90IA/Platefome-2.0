"use client";

import type { Dish } from "@/types/database.types";

/* ── ArActions — AR + 3D capability cards (shown when enabled) ── */
export function ArActions({ dish }: { dish: Dish }) {
  return (
    <div className="dish-fade-b" style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
      {dish.ar_enabled && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            background: "hsl(28,88%,52%,.07)",
            border: "1px solid hsl(28,88%,52%,.25)",
            borderRadius: 10,
            flex: 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(28,88%,52%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", color: "hsl(28,88%,52%)", textTransform: "uppercase", marginBottom: 2 }}>
              מציאות רבודה
            </div>
            <div style={{ fontSize: ".8125rem", color: "hsl(var(--subtle))" }}>כוון מצלמה לשולחן</div>
          </div>
        </div>
      )}
      {dish.model_3d_url && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            background: "hsl(36,28%,92%,.05)",
            border: "1px solid hsl(36,28%,92%,.15)",
            borderRadius: 10,
            flex: 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(36,28%,92%,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", color: "hsl(36,28%,92%,.7)", textTransform: "uppercase", marginBottom: 2 }}>
              תלת-מימד
            </div>
            <div style={{ fontSize: ".8125rem", color: "hsl(var(--subtle))" }}>סובב וצפה בכל זווית</div>
          </div>
        </div>
      )}
    </div>
  );
}
