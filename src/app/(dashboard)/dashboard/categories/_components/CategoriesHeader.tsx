"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  count: number;
  showForm: boolean;
  onAdd: () => void;
}

export function CategoriesHeader({ count, showForm, onAdd }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-serif-display text-4xl font-bold">
          <span className="text-gold-gradient">קטגוריות</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          ארגן את המנות בקטגוריות מסודרות ·{" "}
          <span style={{ color: "hsl(var(--accent-bright))" }}>
            {count} קטגוריות
          </span>
        </p>
      </div>
      {!showForm && (
        <Button
          onClick={onAdd}
          className="text-white hover:opacity-90"
          style={{
            background: "var(--grad-bronze)",
            boxShadow: "0 2px 12px hsl(28 62% 38% / .30)",
          }}
        >
          <Plus className="h-4 w-4" />
          קטגוריה חדשה
        </Button>
      )}
    </div>
  );
}
