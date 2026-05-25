"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Photo360Capture } from "@/components/capture/Photo360Capture";
import { formatPrice } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { filterDishesByCategory, getCategoryName } from "./_lib/helpers";
import { useDishesData } from "./_lib/hooks/useDishesData";
import { useDishForm } from "./_lib/hooks/useDishForm";
import { useDishCRUD } from "./_lib/hooks/useDishCRUD";
import { LoadingState } from "./_components/_states/LoadingState";
import { NoRestaurantState } from "./_components/_states/NoRestaurantState";
import { NoCategoriesState } from "./_components/_states/NoCategoriesState";
import { EmptyDishesState } from "./_components/_states/EmptyDishesState";
import { PageHeader } from "./_components/PageHeader";
import { CategoryFilter } from "./_components/CategoryFilter";
import { SortableDishCard } from "./_components/SortableDishCard";
import { DishForm } from "./_components/DishForm";

export default function DishesPage() {
  const { restaurant, categories, dishes, loading, reload, setDishes } =
    useDishesData();

  const [filterCat, setFilterCat] = useState<string>("all");
  const [show360Capture, setShow360Capture] = useState(false);

  const {
    form,
    setForm,
    formErrors,
    editingId,
    showForm,
    saving,
    handleChange,
    startCreate,
    resetForm,
    handleSubmit,
  } = useDishForm({ restaurant, onSaved: reload });

  const filteredDishes = filterDishesByCategory(dishes, filterCat);

  const {
    deleteId,
    handleDelete,
    confirmDelete,
    cancelDelete,
    toggleAvailability,
    handleDragEnd,
  } = useDishCRUD({
    dishes,
    filterCat,
    setDishes,
    filteredDishes,
    onDeleted: reload,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  if (loading) return <LoadingState />;
  if (!restaurant) return <NoRestaurantState />;
  if (categories.length === 0) return <NoCategoriesState />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ConfirmDialog
        open={!!deleteId}
        title="למחוק את המנה?"
        description="פעולה זו אינה הפיכה."
        confirmLabel="מחק"
        cancelLabel="ביטול"
        danger
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <PageHeader
        restaurant={restaurant}
        dishes={dishes}
        showForm={showForm}
        onCreate={startCreate}
      />

      {categories.length > 0 && dishes.length > 0 && !showForm && (
        <CategoryFilter
          categories={categories}
          dishes={dishes}
          filterCat={filterCat}
          onChange={setFilterCat}
        />
      )}

      {showForm && (
        <DishForm
          form={form}
          categories={categories}
          restaurant={restaurant}
          editingId={editingId}
          saving={saving}
          formErrors={formErrors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          onOpen360Capture={() => setShow360Capture(true)}
        />
      )}

      {show360Capture && (
        <Photo360Capture
          restaurantId={restaurant.id}
          onComplete={(urls) => {
            setForm((f) => ({ ...f, photos_360: urls }));
            setShow360Capture(false);
          }}
          onCancel={() => setShow360Capture(false)}
        />
      )}

      {dishes.length === 0 ? (
        <EmptyDishesState showForm={showForm} onCreate={startCreate} />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredDishes.map((d) => d.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDishes.map((dish, idx) => (
                <SortableDishCard
                  key={dish.id}
                  dish={dish}
                  idx={idx}
                  getCategoryName={(id) => getCategoryName(categories, id)}
                  toggleAvailability={toggleAvailability}
                  handleDelete={handleDelete}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
