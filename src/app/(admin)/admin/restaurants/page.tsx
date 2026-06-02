"use client";

import { AdminRestaurantsHeader } from "./_components/AdminRestaurantsHeader";
import { ConfirmDeleteModal } from "./_components/ConfirmDeleteModal";
import { EmptyState } from "./_components/EmptyState";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { RestaurantCard } from "./_components/RestaurantCard";
import { SearchBar } from "./_components/SearchBar";
import { ThemeEditModal } from "./_components/ThemeEditModal";
import { useAdminRestaurants } from "./_lib/hooks/useAdminRestaurants";

export default function AdminRestaurantsPage() {
  const {
    restaurants,
    loading,
    search,
    setSearch,
    filtered,
    busy,
    confirmDelete,
    setConfirmDelete,
    themeEdit,
    setThemeEdit,
    themeForm,
    setThemeForm,
    themeSaving,
    toggleActive,
    deleteRestaurant,
    openThemeEdit,
    saveTheme,
  } = useAdminRestaurants();

  return (
    <div className="space-y-6 animate-fade-up">
      <AdminRestaurantsHeader total={restaurants.length} />

      <SearchBar value={search} onChange={setSearch} />

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <EmptyState hasSearch={Boolean(search)} />
      ) : (
        <div className="grid gap-3">
          {filtered.map((r) => (
            <RestaurantCard
              key={r.id}
              r={r}
              busy={busy === r.id}
              onToggleActive={() => toggleActive(r.id, r.is_active)}
              onOpenTheme={() => openThemeEdit(r)}
              onConfirmDelete={() => setConfirmDelete(r.id)}
            />
          ))}
        </div>
      )}

      {themeEdit && (
        <ThemeEditModal
          form={themeForm}
          saving={themeSaving}
          onChange={setThemeForm}
          onClose={() => setThemeEdit(null)}
          onSave={saveTheme}
        />
      )}

      {confirmDelete && (
        <ConfirmDeleteModal
          busy={busy === confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => deleteRestaurant(confirmDelete)}
        />
      )}
    </div>
  );
}
