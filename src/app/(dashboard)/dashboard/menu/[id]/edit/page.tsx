"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Photo360Capture } from "@/components/capture/Photo360Capture";
import { useDishEditor } from "./_lib/hooks/useDishEditor";
import { getCategoryName } from "./_lib/helpers";
import { LoadingState } from "./_components/_states/LoadingState";
import { EditBreadcrumb } from "./_components/EditBreadcrumb";
import { EditHeader } from "./_components/EditHeader";
import { PreviewPanel } from "./_components/PreviewPanel";
import { DetailsSection } from "./_components/sections/DetailsSection";
import { MediaSection } from "./_components/sections/MediaSection";
import { TagsSection } from "./_components/sections/TagsSection";
import { TranslationsSection } from "./_components/sections/TranslationsSection";
import { DangerSection } from "./_components/sections/DangerSection";

export default function DishEditPage() {
  const params = useParams();
  const dishId = params.id as string;

  const {
    loading,
    saving,
    saveState,
    restaurant,
    categories,
    form,
    activeMediaTab,
    setActiveMediaTab,
    handleChange,
    toggleAllergen,
    toggleTag,
    handle360Complete,
    handlePublish,
    handleDelete,
  } = useDishEditor({ dishId });

  const [show360Capture, setShow360Capture] = useState(false);

  if (loading) return <LoadingState />;

  const categoryName = getCategoryName(categories, form.category_id);
  const availableLangs = restaurant?.languages ?? ["he"];
  const hasEn = availableLangs.includes("en");
  const hasFr = availableLangs.includes("fr");

  return (
    <div dir="rtl" style={{ color: "hsl(var(--fog))", paddingBottom: 100 }}>
      <EditBreadcrumb dishName={form.name} />

      <EditHeader
        dishName={form.name}
        categoryName={categoryName}
        isAvailable={form.is_available}
        saveState={saveState}
        saving={saving}
        restaurant={restaurant}
        onPublish={handlePublish}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* LEFT: form */}
        <div>
          <DetailsSection
            form={form}
            categories={categories}
            onChange={handleChange}
          />

          <MediaSection
            form={form}
            activeMediaTab={activeMediaTab}
            onTabChange={setActiveMediaTab}
            onChange={handleChange}
            onOpen360Capture={() => setShow360Capture(true)}
          />

          <TagsSection
            form={form}
            onChange={handleChange}
            onToggleAllergen={toggleAllergen}
            onToggleTag={toggleTag}
          />

          <TranslationsSection
            form={form}
            hasEn={hasEn}
            hasFr={hasFr}
            onChange={handleChange}
          />

          <DangerSection dishName={form.name} onDelete={handleDelete} />
        </div>

        {/* RIGHT: sticky preview */}
        <PreviewPanel form={form} categoryName={categoryName} />
      </div>

      {/* Photo 360 modal */}
      {show360Capture && restaurant && (
        <Photo360Capture
          restaurantId={restaurant.id}
          onComplete={(urls) => {
            handle360Complete(urls);
            setShow360Capture(false);
          }}
          onCancel={() => setShow360Capture(false)}
        />
      )}
    </div>
  );
}
