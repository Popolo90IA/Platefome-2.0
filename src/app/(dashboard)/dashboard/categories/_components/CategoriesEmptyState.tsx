"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderTree, Plus } from "lucide-react";

interface Props {
  showForm: boolean;
  onAdd: () => void;
}

export function CategoriesEmptyState({ showForm, onAdd }: Props) {
  return (
    <Card className="shadow-premium">
      <CardContent className="pt-16 pb-16 text-center">
        <div
          className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "hsl(var(--accent-bright) / .1)" }}
        >
          <FolderTree
            className="h-8 w-8"
            style={{ color: "hsl(var(--accent-bright))" }}
          />
        </div>
        <p className="font-serif-display text-xl font-bold mb-1">
          אין קטגוריות עדיין
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          קטגוריות עוזרות ללקוחות למצוא מנות בקלות
        </p>
        {!showForm && (
          <Button
            onClick={onAdd}
            className="text-white hover:opacity-90"
            style={{ background: "var(--grad-bronze)" }}
          >
            <Plus className="h-4 w-4" />
            צור קטגוריה ראשונה
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
