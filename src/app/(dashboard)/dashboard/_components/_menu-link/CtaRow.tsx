"use client";

import Link from "next/link";
import { Plus, QrCode } from "lucide-react";

/* ── CtaRow — QR download + add-dish action buttons ── */
export function CtaRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      <Link href="/dashboard/qrcode" style={{ display: "block" }}>
        <button
          className="w-full btn-primary"
          style={{ padding: "11px 20px", fontSize: "0.875rem", justifyContent: "center" }}
        >
          <QrCode style={{ width: 14, height: 14 }} strokeWidth={1.5} />
          הורד QR קוד
        </button>
      </Link>
      <Link href="/dashboard/dishes" style={{ display: "block" }}>
        <button
          className="w-full flex items-center justify-center gap-2 transition-colors duration-150"
          style={{
            padding: "11px 20px",
            fontSize: "0.875rem",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            background: "hsl(var(--abyss))",
            border: "1px solid hsl(var(--line))",
            borderRadius: "var(--radius-lg)",
            color: "hsl(var(--fog))",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(28 62% 42% / .4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(var(--line))";
          }}
        >
          <Plus style={{ width: 14, height: 14 }} strokeWidth={1.5} />
          הוסף מנה
        </button>
      </Link>
    </div>
  );
}
