import type { Restaurant } from "@/types/database.types";
import type { SaveState } from "../_lib/types";
import { StatusPill } from "./_header/StatusPill";
import { SaveIndicator } from "./_header/SaveIndicator";
import { HeaderActions } from "./_header/HeaderActions";

type EditHeaderProps = {
  dishName: string;
  categoryName: string;
  isAvailable: boolean;
  saveState: SaveState;
  saving: boolean;
  restaurant: Restaurant | null;
  onPublish: () => void;
};

export function EditHeader({
  dishName,
  categoryName,
  isAvailable,
  saveState,
  saving,
  restaurant,
  onPublish,
}: EditHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 28,
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div>
        <StatusPill isAvailable={isAvailable} />
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-.02em",
            color: "hsl(var(--fog))",
            margin: "0 0 8px",
          }}
        >
          עריכת{" "}
          <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>
            מנה
          </em>
        </h1>
        <p
          className="font-sans"
          style={{ fontSize: 14, color: "hsl(var(--subtle))", margin: 0 }}
        >
          {dishName || "—"}
          {categoryName ? ` · ${categoryName}` : ""}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <SaveIndicator saveState={saveState} />
        <HeaderActions
          restaurant={restaurant}
          saving={saving}
          onPublish={onPublish}
        />
      </div>
    </div>
  );
}
