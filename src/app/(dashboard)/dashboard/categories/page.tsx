"use client";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CategoriesEmptyState } from "./_components/CategoriesEmptyState";
import { CategoriesHeader } from "./_components/CategoriesHeader";
import { CategoriesList } from "./_components/CategoriesList";
import { CategoriesLoading } from "./_components/CategoriesLoading";
import { CategoryForm } from "./_components/CategoryForm";
import { NoRestaurantState } from "./_components/NoRestaurantState";
import { useCategoriesPage } from "./_lib/hooks/useCategoriesPage";

export default function CategoriesPage() {
  const {
    restaurant,
    categories,
    loading,
    showForm,
    setShowForm,
    editingId,
    form,
    setForm,
    formErrors,
    deleteId,
    setDeleteId,
    saving,
    sensors,
    handleDragEnd,
    resetForm,
    handleEdit,
    handleSubmit,
    handleDelete,
    confirmDelete,
  } = useCategoriesPage();

  if (loading) return <CategoriesLoading />;
  if (!restaurant) return <NoRestaurantState />;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-up">
      <ConfirmDialog
        open={!!deleteId}
        title="למחוק את הקטגוריה?"
        description="כל המנות בקטגוריה זו יימחקו. פעולה זו אינה הפיכה."
        confirmLabel="מחק"
        cancelLabel="ביטול"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      <CategoriesHeader
        count={categories.length}
        showForm={showForm}
        onAdd={() => setShowForm(true)}
      />

      {showForm && (
        <CategoryForm
          editingId={editingId}
          form={form}
          setForm={setForm}
          formErrors={formErrors}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      {categories.length === 0 ? (
        <CategoriesEmptyState
          showForm={showForm}
          onAdd={() => setShowForm(true)}
        />
      ) : (
        <CategoriesList
          categories={categories}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
