"use client";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  type SensorDescriptor,
  type SensorOptions,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableCategoryRow } from "./SortableCategoryRow";
import type { Category } from "../_lib/types";

interface Props {
  categories: Category[];
  sensors: SensorDescriptor<SensorOptions>[];
  onDragEnd: (event: DragEndEvent) => void;
  onEdit: (cat: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoriesList({
  categories,
  sensors,
  onDragEnd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={categories.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {categories.map((cat, idx) => (
            <SortableCategoryRow
              key={cat.id}
              cat={cat}
              idx={idx}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
