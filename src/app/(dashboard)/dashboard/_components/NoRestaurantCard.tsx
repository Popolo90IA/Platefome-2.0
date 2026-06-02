"use client";

import Link from "next/link";
import { Settings as SettingsIcon } from "lucide-react";

/**
 * NoRestaurantCard — CTA "Getting started" si l'utilisateur n'a pas de restaurant.
 */
export function NoRestaurantCard() {
  return (
    <div
      className="py-10 px-8 border"
      style={{
        background: "hsl(var(--deep))",
        borderColor: "hsl(var(--line))",
        borderRadius: "var(--radius-xl)",
      }}
    >
      <p
        className="font-sans uppercase mb-3"
        style={{
          fontSize: "12px",
          letterSpacing: ".06em",
          fontWeight: 600,
          color: "hsl(var(--accent-bright))",
        }}
      >
        Getting started
      </p>
      <h2
        className="font-display mb-4"
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "hsl(var(--fog))",
          letterSpacing: "-.03em",
        }}
      >
        צור את הפרופיל שלך
      </h2>
      <p className="text-sm mb-6" style={{ color: "hsl(var(--subtle))" }}>
        צור את פרופיל המסעדה שלך כדי להתחיל לבנות את התפריט
      </p>
      <Link href="/dashboard/settings">
        <button
          className="btn-primary"
          style={{ padding: "11px 24px", fontSize: "0.875rem" }}
        >
          <SettingsIcon style={{ width: 14, height: 14 }} strokeWidth={1.5} />
          צור פרופיל מסעדה
        </button>
      </Link>
    </div>
  );
}
