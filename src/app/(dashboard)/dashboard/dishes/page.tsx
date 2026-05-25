"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { createClient } from "@/lib/supabase/client";
import { Photo360Capture } from "@/components/capture/Photo360Capture";
import { formatPrice } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { dishSchema } from "@/lib/validations/dish";
import type { Dish, Category, Restaurant } from "@/types/database.types";
import type { FormState } from "./_lib/types";
import { EMPTY_FORM } from "./_lib/constants";
import { filterDishesByCategory, getCategoryName } from "./_lib/helpers";
import { LoadingState } from "./_components/_states/LoadingState";
import { NoRestaurantState } from "./_components/_states/NoRestaurantState";
import { NoCategoriesState } from "./_components/_states/NoCategoriesState";
import { EmptyDishesState } from "./_components/_states/EmptyDishesState";
import { PageHeader } from "./_components/PageHeader";
import { CategoryFilter } from "./_components/CategoryFilter";
import { SortableDishCard } from "./_components/SortableDishCard";
import { DishForm } from "./_components/DishForm";

export default function DishesPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [show360Capture, setShow360Capture] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = filteredDishes.findIndex((d) => d.id === active.id);
    const newIndex = filteredDishes.findIndex((d) => d.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(filteredDishes, oldIndex, newIndex);
    // Optimistic update
    setDishes((prev) => {
      const others = prev.filter((d) => filterCat !== "all" && d.category_id !== filterCat);
      return filterCat === "all" ? reordered : [...others, ...reordered];
    });
    // Persist display_order
    await Promise.all(
      reordered.map((d, i) =>
        supabase.from("dishes").update({ display_order: i }).eq("id", d.id)
      )
    );
  };

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: r } = await supabase
      .from("restaurants")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    setRestaurant(r);

    if (r) {
      const [{ data: cats }, { data: dsh }] = await Promise.all([
        supabase
          .from("categories")
          .select("*")
          .eq("restaurant_id", r.id)
          .order("display_order"),
        supabase
          .from("dishes")
          .select("*")
          .eq("restaurant_id", r.id)
          .order("created_at", { ascending: false }),
      ]);
      setCategories(cats ?? []);
      setDishes(dsh ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (dish: Dish) => {
    setEditingId(dish.id);
    setForm({
      name: dish.name,
      name_en: dish.name_en ?? "",
      name_fr: dish.name_fr ?? "",
      category_id: dish.category_id,
      description: dish.description ?? "",
      description_en: dish.description_en ?? "",
      description_fr: dish.description_fr ?? "",
      price: String(dish.price),
      image_url: dish.image_url,
      video_url: dish.video_url,
      model_3d_url: dish.model_3d_url,
      photos_360: dish.photos_360 ?? null,
      ar_enabled: dish.ar_enabled,
      is_available: dish.is_available,
      is_featured: dish.is_featured,
      is_new: dish.is_new,
      is_signature: dish.is_signature,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant) return;

    const parsed = dishSchema.safeParse({
      name: form.name,
      category_id: form.category_id,
      description: form.description || undefined,
      price: parseFloat(form.price) || 0,
      image_url: form.image_url,
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) errors[String(err.path[0])] = err.message;
      });
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSaving(true);

    const payload = {
      restaurant_id: restaurant.id,
      category_id: form.category_id,
      name: form.name,
      name_en: form.name_en || null,
      name_fr: form.name_fr || null,
      description: form.description || null,
      description_en: form.description_en || null,
      description_fr: form.description_fr || null,
      price: parseFloat(form.price),
      image_url: form.image_url,
      video_url: form.video_url,
      model_3d_url: form.model_3d_url,
      photos_360: form.photos_360,
      ar_enabled: form.ar_enabled,
      is_available: form.is_available,
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_signature: form.is_signature,
    };

    if (editingId) {
      await supabase.from("dishes").update(payload).eq("id", editingId);
    } else {
      await supabase.from("dishes").insert(payload);
    }

    await load();
    resetForm();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await supabase.from("dishes").delete().eq("id", deleteId);
    setDeleteId(null);
    await load();
  };

  const toggleAvailability = async (dish: Dish) => {
    await supabase
      .from("dishes")
      .update({ is_available: !dish.is_available })
      .eq("id", dish.id);
    setDishes((prev) =>
      prev.map((d) =>
        d.id === dish.id ? { ...d, is_available: !d.is_available } : d
      )
    );
  };

  const getCategoryNameLocal = (categoryId: string) =>
    getCategoryName(categories, categoryId);

  const filteredDishes = filterDishesByCategory(dishes, filterCat);

  if (loading) {
    return <LoadingState />;
  }

  if (!restaurant) {
    return <NoRestaurantState />;
  }

  if (categories.length === 0) {
    return <NoCategoriesState />;
  }

  const handleFormChange = (patch: Partial<FormState>) =>
    setForm((f) => ({ ...f, ...patch }));

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
        onCancel={() => setDeleteId(null)}
      />
      <PageHeader
        restaurant={restaurant}
        dishes={dishes}
        showForm={showForm}
        onCreate={() => setShowForm(true)}
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
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          onOpen360Capture={() => setShow360Capture(true)}
        />
      )}

      {show360Capture && restaurant && (
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
        <EmptyDishesState showForm={showForm} onCreate={() => setShowForm(true)} />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredDishes.map((d) => d.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDishes.map((dish, idx) => (
            <SortableDishCard
              key={dish.id}
              dish={dish}
              idx={idx}
              getCategoryName={getCategoryNameLocal}
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
