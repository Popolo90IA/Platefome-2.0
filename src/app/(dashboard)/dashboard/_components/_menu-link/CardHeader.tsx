"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

/* ── CardHeader — title + active badge + open-in-new-tab link ── */
export function CardHeader({ slug }: { slug: string }) {
  return (
    <div
      style={{
        padding: "18px 24px",
        borderBottom: "1px solid hsl(var(--line))",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <h3
        className="font-display"
        style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", margin: 0, flex: 1 }}
      >
        התפריט הציבורי שלך
      </h3>
      <span
        className="font-sans uppercase"
        style={{
          fontSize: "10px",
          letterSpacing: ".06em",
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: 99,
          background: "hsl(28 62% 42% / .08)",
          color: "hsl(var(--accent-bright))",
          border: "1px solid hsl(28 62% 42% / .18)",
        }}
      >
        פעיל
      </span>
      <Link href={`/menu/${slug}`} target="_blank">
        <button
          className="flex items-center gap-1.5 text-xs transition-colors duration-150"
          style={{ color: "hsl(var(--subtle))" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--accent-bright))")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--subtle))")
          }
        >
          <ExternalLink style={{ width: 14, height: 14 }} strokeWidth={1.5} />
          פתח
        </button>
      </Link>
    </div>
  );
}
