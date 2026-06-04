"use client";

import type { Dish, Restaurant } from "@/types/database.types";
import { Badge } from "./Badge";
import { ALLERGEN_ICONS } from "./constants";
import type { DishBadge } from "./constants";
import { StatusRow } from "./StatusRow";

/* ─── DishInfo — right column (badges/name/price/desc/tags/allergens/status) ── */
export function DishInfo({
  dish,
  restaurant,
  badges,
}: {
  dish: Dish;
  restaurant: Restaurant;
  badges: DishBadge[];
}) {
  return (
    <div style={{ flex: 1 }}>
      {/* Category + badges */}
      <div className="dish-fade-a" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {badges.map((b) => (
          <Badge key={b.label} {...b} />
        ))}
      </div>

      {/* Name */}
      <div className="dish-fade-a" style={{ marginBottom: 8 }}>
        <h1 style={{ fontFamily: "var(--font-hebrew)", fontWeight: 300, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 0.95, letterSpacing: "-.03em", color: "hsl(var(--cream))", margin: 0 }}>
          {dish.name}
        </h1>
        {dish.name_en && (
          <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.25rem", color: "hsl(var(--fog))", marginTop: 6 }}>
            {dish.name_en}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="dish-fade-b" style={{ marginBottom: 28 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "2.5rem",
            letterSpacing: "-.04em",
            background:
              "linear-gradient(135deg,hsl(24,80%,32%) 0%,hsl(36,28%,92%) 40%,hsl(28,95%,72%) 60%,hsl(36,28%,92%) 80%,hsl(24,80%,32%) 100%)",
            backgroundSize: "220% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "goldShimmer 4s ease-in-out infinite",
          }}
        >
          {restaurant.currency || "₪"}
          {dish.price}
        </span>
      </div>

      {/* Description */}
      {dish.description && (
        <div className="dish-fade-b" style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid hsl(var(--line))" }}>
          <p style={{ fontSize: "1.0625rem", color: "hsl(var(--subtle))", lineHeight: 1.8, margin: 0 }}>{dish.description}</p>
          {dish.description_en && (
            <p style={{ fontSize: ".9375rem", color: "hsl(var(--dim))", lineHeight: 1.7, marginTop: 12, fontStyle: "italic", fontFamily: "var(--font-display)" }}>
              {dish.description_en}
            </p>
          )}
        </div>
      )}

      {/* Tags */}
      {dish.tags && dish.tags.length > 0 && (
        <div className="dish-fade-c" style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: ".5875rem", letterSpacing: ".18em", color: "hsl(var(--dim))", textTransform: "uppercase", marginBottom: 12 }}>
            תגיות
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {dish.tags.map((tag) => (
              <span key={tag} style={{ padding: "4px 12px", background: "hsl(var(--deep))", border: "1px solid hsl(var(--line))", borderRadius: 99, fontSize: ".8125rem", color: "hsl(var(--pale))" }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Allergens */}
      {dish.allergens && dish.allergens.length > 0 && (
        <div className="dish-fade-c" style={{ marginBottom: 28, padding: "20px 24px", background: "hsl(var(--ember) / .04)", border: "1px solid hsl(var(--ember) / .18)", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--ember))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: ".5875rem", letterSpacing: ".18em", color: "hsl(var(--ember))", textTransform: "uppercase" }}>
              אלרגנים
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {dish.allergens.map((a) => {
              const info = ALLERGEN_ICONS[a] ?? { label: a, emoji: "⚠️" };
              return (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "hsl(var(--ember) / .08)", border: "1px solid hsl(var(--ember) / .22)", borderRadius: 99 }}>
                  <span>{info.emoji}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: ".5875rem", letterSpacing: ".1em", color: "hsl(var(--ember))", textTransform: "uppercase" }}>
                    {info.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Status indicators */}
      <div className="dish-fade-d" style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 28, borderTop: "1px solid hsl(var(--line))" }}>
        <StatusRow label="זמינות" value={dish.is_available ? "זמין עכשיו" : "לא זמין"} color={dish.is_available ? "hsl(var(--accent-vivid))" : "hsl(var(--ember))"} icon={dish.is_available ? "✓" : "✗"} />
        {dish.is_new && <StatusRow label="מנה חדשה" value="נוסף לאחרונה לתפריט" color="hsl(var(--accent-vivid))" icon="★" />}
        {dish.is_signature && <StatusRow label="מנת שף" value="המלצה מיוחדת של השף" color="hsl(36,28%,92%)" icon="♦" />}
        {dish.ar_enabled && <StatusRow label="AR זמין" value="סרוק עם המצלמה לחוויה תלת-מימד" color="hsl(var(--accent-vivid))" icon="◉" />}
      </div>
    </div>
  );
}
