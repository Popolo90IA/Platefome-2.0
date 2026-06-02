"use client";

import { formatTodayHe } from "../_lib/helpers";
import type { Restaurant, Stats } from "../_lib/types";

interface Props {
  restaurant: Restaurant | null;
  stats: Stats;
}

/**
 * PageHeader — eyebrow Overview · date · greeting + ligne stats.
 */
export function PageHeader({ restaurant, stats }: Props) {
  const today = formatTodayHe();

  return (
    <div style={{ marginBottom: 4 }}>
      <div
        className="flex items-center gap-2.5"
        style={{ marginBottom: 10 }}
      >
        <span
          className="font-sans uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: ".08em",
            fontWeight: 600,
            color: "hsl(var(--accent-bright) / .6)",
          }}
        >
          Overview
        </span>
        <span
          style={{
            color: "hsl(var(--accent-bright) / .4)",
            fontSize: 11,
          }}
        >
          ·
        </span>
        <span
          className="font-sans"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "hsl(var(--accent-bright))",
            letterSpacing: ".01em",
          }}
        >
          {today}
        </span>
      </div>
      <h1
        className="font-display"
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          fontWeight: 600,
          letterSpacing: "-.02em",
          lineHeight: 1.05,
          color: "hsl(var(--fog))",
          margin: 0,
        }}
      >
        {restaurant?.name ? (
          <>
            שלום, {restaurant.name}.{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "hsl(var(--accent-bright))",
              }}
            >
              ברוך הבא.
            </em>
          </>
        ) : (
          "שלום"
        )}
      </h1>
      {restaurant && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: "hsl(var(--subtle))",
            marginTop: 8,
          }}
        >
          {stats.dishes} מנות פעילות · {stats.views.toLocaleString()} צפיות
          ב-30 ימים · {stats.scans} סריקות QR
        </p>
      )}
    </div>
  );
}
