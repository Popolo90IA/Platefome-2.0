"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { CARD } from "../_lib/constants";

/**
 * QrEmptyState — affiché si aucun restaurant créé. CTA vers /dashboard/settings.
 */
export function QrEmptyState() {
  return (
    <div
      style={{
        ...CARD,
        maxWidth: 420,
        margin: "0 auto",
        textAlign: "center",
        padding: "40px 32px",
      }}
    >
      <p
        className="font-sans uppercase"
        style={{
          fontSize: "12px",
          letterSpacing: ".05em",
          color: "hsl(var(--accent-bright))",
          marginBottom: 12,
        }}
      >
        Getting started
      </p>
      <h2
        className="font-display"
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "hsl(var(--fog))",
          margin: "0 0 12px",
        }}
      >
        צור פרופיל מסעדה
      </h2>
      <p
        className="font-sans"
        style={{
          fontSize: 14,
          color: "hsl(var(--subtle))",
          marginBottom: 24,
        }}
      >
        כדי לייצר QR, צור תחילה את פרופיל המסעדה שלך
      </p>
      <Link href="/dashboard/settings">
        <button
          className="btn-primary"
          style={{ padding: "11px 24px", fontSize: "0.875rem" }}
        >
          <Settings style={{ width: 14, height: 14 }} strokeWidth={1.5} />
          צור פרופיל
        </button>
      </Link>
    </div>
  );
}
