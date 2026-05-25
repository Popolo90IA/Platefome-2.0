"use client";

import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Edit,
  Trash2,
  ImageIcon,
  Award,
  Sparkles,
  Flame,
  CircleOff,
  CheckCircle2,
  Cuboid,
  Film,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Dish } from "@/types/database.types";
import { TinyBadge } from "./_ui/TinyBadge";
import { MiniBadge } from "./_ui/MiniBadge";

type SortableDishCardProps = {
  dish: Dish;
  idx: number;
  getCategoryName: (id: string) => string;
  toggleAvailability: (dish: Dish) => void;
  handleDelete: (id: string) => void;
  formatPrice: (price: number) => string;
};

export function SortableDishCard({
  dish,
  idx,
  getCategoryName,
  toggleAvailability,
  handleDelete,
  formatPrice: fp,
}: SortableDishCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: dish.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto",
  } as const;

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={`group overflow-hidden shadow-sm hover:shadow-premium hover:border-[hsl(var(--gold))]/30 transition-all animate-fade-up ${
          !dish.is_available ? "opacity-70" : ""
        }`}
        style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
      >
        <div className="relative h-52 overflow-hidden">
          {dish.image_url ? (
            <img
              src={dish.image_url}
              alt={dish.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            <span className="text-xs bg-white/95 backdrop-blur px-2.5 py-1 rounded-full font-medium text-[hsl(var(--gold-dark))] shadow-sm">
              {getCategoryName(dish.category_id)}
            </span>
          </div>
          <div className="absolute top-3 left-3 flex gap-1">
            {dish.video_url && (
              <MiniBadge color="dark">
                <Film className="h-3 w-3" />
              </MiniBadge>
            )}
            {dish.model_3d_url && (
              <MiniBadge color="gold">
                <Cuboid className="h-3 w-3" />
              </MiniBadge>
            )}
          </div>
          {!dish.is_available && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold uppercase tracking-wider text-sm px-3 py-1 bg-black/60 rounded">
                אזל
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <button
              type="button"
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 rounded text-muted-foreground/40 hover:text-muted-foreground transition-colors touch-none"
              title="גרור לשינוי סדר"
              aria-label="גרור לשינוי סדר"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <h3 className="font-serif-display font-bold text-lg leading-tight flex-1">
              {dish.name}
            </h3>
            <span className="font-bold text-lg text-gold-gradient whitespace-nowrap">
              {fp(dish.price)}
            </span>
          </div>

          {(dish.is_signature || dish.is_new || dish.is_featured) && (
            <div className="flex flex-wrap gap-1 mb-2">
              {dish.is_signature && (
                <TinyBadge color="gold">
                  <Award className="h-2.5 w-2.5" />
                  מנת השף
                </TinyBadge>
              )}
              {dish.is_new && (
                <TinyBadge color="emerald">
                  <Sparkles className="h-2.5 w-2.5" />
                  חדש
                </TinyBadge>
              )}
              {dish.is_featured && (
                <TinyBadge color="rose">
                  <Flame className="h-2.5 w-2.5" />
                  מומלץ
                </TinyBadge>
              )}
            </div>
          )}

          {dish.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {dish.description}
            </p>
          )}
          <div className="flex justify-between items-center gap-1 pt-2 border-t border-border/60">
            <button
              type="button"
              onClick={() => toggleAvailability(dish)}
              className={`text-xs font-medium flex items-center gap-1.5 transition-colors ${
                dish.is_available
                  ? "text-[hsl(var(--accent-bright))] hover:text-[hsl(var(--gold-dark))]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title={dish.is_available ? "זמין" : "אזל"}
            >
              {dish.is_available ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <CircleOff className="h-4 w-4" />
              )}
              {dish.is_available ? "זמין" : "אזל"}
            </button>
            <div className="flex gap-0.5">
              <Link
                href={`/dashboard/menu/${dish.id}/edit`}
                className="inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Edit className="h-4 w-4" />
              </Link>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDelete(dish.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
