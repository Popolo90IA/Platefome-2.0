"use client";

import { useCallback, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { createClient } from "@/lib/supabase/client";
import type { Dish } from "@/types/database.types";

type UseDishCRUDOptions = {
  dishes: Dish[];
  filterCat: string;
  setDishes: (updater: Dish[] | ((prev: Dish[]) => Dish[])) => void;
  filteredDishes: Dish[];
  onDeleted: () => void | Promise<void>;
};

/**
 * Mutations on dishes: delete (with confirmation), toggle availability,
 * and drag-and-drop reordering with optimistic UI + persistence.
 */
export function useDishCRUD({
  dishes,
  filterCat,
  setDishes,
  filteredDishes,
  onDeleted,
}: UseDishCRUDOptions) {
  const supabase = createClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteId) return;
    await supabase.from("dishes").delete().eq("id", deleteId);
    setDeleteId(null);
    await onDeleted();
  }, [deleteId, supabase, onDeleted]);

  const cancelDelete = useCallback(() => setDeleteId(null), []);

  const toggleAvailability = useCallback(
    async (dish: Dish) => {
      await supabase
        .from("dishes")
        .update({ is_available: !dish.is_available })
        .eq("id", dish.id);
      setDishes((prev) =>
        prev.map((d) =>
          d.id === dish.id ? { ...d, is_available: !d.is_available } : d,
        ),
      );
    },
    [supabase, setDishes],
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = filteredDishes.findIndex((d) => d.id === active.id);
      const newIndex = filteredDishes.findIndex((d) => d.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const reordered = arrayMove(filteredDishes, oldIndex, newIndex);

      // Optimistic update
      setDishes((prev) => {
        const others = prev.filter(
          (d) => filterCat !== "all" && d.category_id !== filterCat,
        );
        return filterCat === "all" ? reordered : [...others, ...reordered];
      });

      // Persist display_order
      await Promise.all(
        reordered.map((d, i) =>
          supabase.from("dishes").update({ display_order: i }).eq("id", d.id),
        ),
      );
    },
    [filteredDishes, filterCat, setDishes, supabase],
  );

  // dishes param kept in deps to refresh closures if needed by callers
  void dishes;

  return {
    deleteId,
    handleDelete,
    confirmDelete,
    cancelDelete,
    toggleAvailability,
    handleDragEnd,
  };
}
