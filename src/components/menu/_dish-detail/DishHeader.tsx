"use client";

import Link from "next/link";
import type { Dish, Restaurant } from "@/types/database.types";

/* ─── DishHeader — sticky top bar (back link + name + price) ── */
export function DishHeader({
  dish,
  restaurant,
  slug,
}: {
  dish: Dish;
  restaurant: Restaurant;
  slug: string;
}) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "hsl(220,12%,4%,.9)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid hsl(220,7%,16%,.7)",
        padding: "0 32px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        href={`/menu/${slug}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'DM Mono',monospace",
          fontSize: ".625rem",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "hsl(var(--subtle))",
          textDecoration: "none",
          transition: "color .2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--cream))")}
        onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--subtle))")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        חזרה לתפריט
      </Link>
      <span
        style={{
          fontFamily: "'Noto Serif Hebrew',serif",
          fontSize: ".95rem",
          fontWeight: 300,
          color: "hsl(var(--fog))",
        }}
      >
        {restaurant.name}
      </span>
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: ".9375rem",
          color: "hsl(36,28%,92%)",
          fontWeight: 500,
        }}
      >
        {restaurant.currency || "₪"}
        {dish.price}
      </div>
    </header>
  );
}
