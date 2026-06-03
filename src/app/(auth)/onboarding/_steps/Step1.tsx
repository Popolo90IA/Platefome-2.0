"use client";

import { S, type RestaurantData } from "../_lib/constants";

const FIELDS = [
  { key: "name", label: "שם המסעדה", placeholder: "מיזרחי תל אביב", type: "text" },
  { key: "slug", label: "כתובת URL (slug)", placeholder: "mizrahi-tlv", type: "text" },
  { key: "city", label: "עיר / אזור", placeholder: "תל אביב", type: "text" },
] as const;

/* ── Step 1: Restaurant details ─────────────────────── */
export function Step1({
  values,
  onChange,
}: {
  values: RestaurantData;
  onChange: (k: string, v: string) => void;
}) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {FIELDS.map((f) => (
        <div key={f.key} style={{ marginBottom: 20 }}>
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
            {f.label}
          </label>
          <input
            type={f.type}
            value={values[f.key as keyof RestaurantData]}
            onChange={(e) => onChange(f.key, e.target.value)}
            placeholder={f.placeholder}
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
      ))}
    </div>
  );
}
