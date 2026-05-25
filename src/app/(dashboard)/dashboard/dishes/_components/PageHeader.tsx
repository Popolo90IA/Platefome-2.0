"use client";

import { Plus } from "lucide-react";
import type { Dish, Restaurant } from "@/types/database.types";

type PageHeaderProps = {
  restaurant: Restaurant | null;
  dishes: Dish[];
  showForm: boolean;
  onCreate: () => void;
};

export function PageHeader({ restaurant, dishes, showForm, onCreate }: PageHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
      <div>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)", fontWeight: 600, lineHeight: 1, letterSpacing: "-.02em", color: "hsl(var(--fog))", margin: 0 }}
        >
          <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>תפריט</em>
          {" · "}{dishes.length} מנות
        </h1>
        {restaurant && (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "hsl(var(--subtle))", marginTop: 8 }}>
            {restaurant.name} · {dishes.filter((d) => d.model_3d_url).length} ב-3D · {dishes.filter((d) => !d.is_available).length} לא זמינות
          </p>
        )}
      </div>
      {!showForm && (
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            onClick={onCreate}
            className="btn-primary"
            style={{ padding: "11px 22px", fontSize: "0.875rem" }}
          >
            <Plus style={{ width: 14, height: 14 }} strokeWidth={2.4} />
            הוסף מנה
          </button>
        </div>
      )}
    </div>
  );
}
