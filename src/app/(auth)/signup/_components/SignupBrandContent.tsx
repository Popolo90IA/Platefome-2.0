"use client";

import { Check } from "lucide-react";

const BENEFITS = [
  { text: "הקמה מיידית, ללא הגדרות" },
  { text: "עיצוב מקצועי מובנה" },
  { text: "QR קוד מוכן להדפסה" },
  { text: "אנליטיקס בזמן אמת" },
];

export function SignupBrandContent() {
  return (
    <>
      <div
        className="font-sans uppercase"
        style={{
          fontSize: 11,
          letterSpacing: ".08em",
          fontWeight: 600,
          color: "hsl(28,62%,52%)",
          marginBottom: 20,
        }}
      >
        הצטרפות חינמית
      </div>
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(2rem, 3vw, 2.8rem)",
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: "-.025em",
          color: "hsl(36,30%,88%)",
          margin: "0 0 32px",
        }}
      >
        התפריט שלך
        <br />
        <em style={{ fontStyle: "italic", color: "hsl(28,62%,52%)" }}>
          מוכן תוך דקות.
        </em>
      </h2>

      {BENEFITS.map((b) => (
        <div
          key={b.text}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              flexShrink: 0,
              background:
                "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check
              style={{ width: 10, height: 10, color: "#fff", strokeWidth: 3 }}
            />
          </div>
          <span
            className="font-sans"
            style={{
              fontSize: 14,
              color: "hsl(36,20%,65%)",
              lineHeight: 1.4,
            }}
          >
            {b.text}
          </span>
        </div>
      ))}
    </>
  );
}
