"use client";

import { S } from "../_lib/constants";

/* ── Step 4: Invite team ────────────────────────────── */
export function Step4({
  email,
  onChange,
}: {
  email: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <label
          className="font-sans uppercase"
          style={{
            display: "block",
            fontSize: 10,
            letterSpacing: ".06em",
            color: S.dim,
            marginBottom: 8,
          }}
        >
          כתובת אימייל לצוות
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onChange(e.target.value)}
          placeholder="adi@restaurant.co.il"
          className="font-sans"
          style={{
            width: "100%",
            boxSizing: "border-box",
            fontSize: 15,
            padding: "13px 16px",
            background: S.void,
            border: `1px solid ${S.line}`,
            borderRadius: 10,
            color: S.fog,
            outline: "none",
          }}
        />
      </div>
      <p className="font-sans" style={{ fontSize: 13, color: S.subtle }}>
        הם יקבלו גישה לניהול התפריט ללא גישה לחיוב.
      </p>
    </div>
  );
}
