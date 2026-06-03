"use client";

import { S } from "../_lib/constants";

/* ── Step 3: QR ─────────────────────────────────────── */
export function Step3() {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          width: 120,
          height: 120,
          background: "white",
          borderRadius: 16,
          padding: 14,
          margin: "0 auto 24px",
          boxShadow: "0 8px 32px rgba(0,0,0,.1)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <svg viewBox="0 0 24 24" width="80" height="80">
          <rect x="2" y="2" width="6" height="6" fill="hsl(28,15%,18%)" />
          <rect x="16" y="2" width="6" height="6" fill="hsl(28,15%,18%)" />
          <rect x="2" y="16" width="6" height="6" fill="hsl(28,15%,18%)" />
          <rect x="10" y="10" width="3" height="3" fill="hsl(28,62%,42%)" />
          <rect x="14" y="10" width="2" height="2" fill="hsl(28,15%,18%)" />
          <rect x="18" y="10" width="2" height="2" fill="hsl(28,15%,18%)" />
          <rect x="10" y="16" width="2" height="2" fill="hsl(28,15%,18%)" />
          <rect x="14" y="18" width="2" height="2" fill="hsl(28,15%,18%)" />
        </svg>
      </div>
      <p className="font-sans" style={{ fontSize: 15, color: S.subtle, lineHeight: 1.6 }}>
        קוד ה-QR שלך מוכן. הורד, הדפס והדבק על כל שולחן.
        <br />
        הלקוחות יסרקו ויראו את המנות שלך בתלת מימד.
      </p>
    </div>
  );
}
