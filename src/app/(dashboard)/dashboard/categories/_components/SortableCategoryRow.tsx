"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Category } from "../_lib/types";

interface Props {
  cat: Category;
  idx: number;
  onEdit: (cat: Category) => void;
  onDelete: (id: string) => void;
}

export function SortableCategoryRow({ cat, idx, onEdit, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: cat.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : ("auto" as const),
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className="group shadow-sm hover:shadow-premium transition-all animate-fade-up"
        style={{
          animationDelay: `${idx * 40}ms`,
          borderColor: isDragging ? "hsl(var(--gold) / .4)" : "transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "hsl(var(--gold) / .25)";
        }}
        onMouseLeave={(e) => {
          if (!isDragging)
            (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
        }}
      >
        <CardContent className="py-4 flex items-center gap-4">
          <button
            {...attributes}
            {...listeners}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "grab",
              color: "hsl(var(--dim))",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              touchAction: "none",
            }}
          >
            <GripVertical className="h-5 w-5" />
          </button>

          <div
            className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold text-white"
            style={{ background: "var(--grad-bronze)" }}
          >
            {cat.display_order}
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{cat.name}</div>
          </div>

          <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(cat)}
              className="h-8 w-8 hover:bg-[hsl(var(--gold))]/10"
            >
              <Edit
                className="h-4 w-4"
                style={{ color: "hsl(var(--gold-dark))" }}
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 hover:bg-[hsl(var(--ember))]/10"
              onClick={() => onDelete(cat.id)}
            >
              <Trash2
                className="h-4 w-4"
                style={{ color: "hsl(var(--ember))" }}
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
