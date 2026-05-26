import Link from "next/link";
import { Loader2, CheckCircle2, Eye } from "lucide-react";
import type { Restaurant } from "@/types/database.types";
import type { SaveState } from "../_lib/types";

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
        {/* Status pill */}
        <div style={{ marginBottom: 10 }}>
          <span
            className="font-sans uppercase"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 99,
              background: isAvailable
                ? "hsl(120,30%,40%,.1)"
                : "hsl(0,60%,50%,.08)",
              border: `1px solid ${
                isAvailable ? "hsl(120,30%,40%,.2)" : "hsl(0,60%,50%,.2)"
              }`,
              fontSize: 10.5,
              letterSpacing: ".06em",
              color: isAvailable ? "hsl(120,30%,30%)" : "hsl(0,55%,42%)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: isAvailable
                  ? "hsl(120,40%,40%)"
                  : "hsl(0,60%,50%)",
              }}
            />
            {isAvailable ? "פעיל · זמין בתפריט" : "לא זמין"}
          </span>
        </div>
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
        {/* Auto-save indicator */}
        <span
          className="font-sans uppercase"
          style={{
            fontSize: 11,
            letterSpacing: ".06em",
            color:
              saveState === "error" ? "hsl(0,60%,50%)" : "hsl(var(--dim))",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {saveState === "saving" && (
            <>
              <Loader2
                style={{
                  width: 12,
                  height: 12,
                  animation: "spin 1s linear infinite",
                }}
              />
              שומר...
            </>
          )}
          {saveState === "saved" && (
            <>
              <CheckCircle2
                style={{ width: 12, height: 12, color: "hsl(120,40%,40%)" }}
              />
              נשמר
            </>
          )}
          {saveState === "idle" && (
            <>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "hsl(var(--accent-bright))",
                  opacity: 0.6,
                  display: "inline-block",
                }}
              />
              נשמר אוטומטית
            </>
          )}
          {saveState === "error" && "שגיאה בשמירה"}
        </span>

        {/* Preview link */}
        {restaurant && (
          <Link
            href={`/menu/${restaurant.slug}`}
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 18px",
              borderRadius: 10,
              fontSize: 13.5,
              fontWeight: 500,
              background: "transparent",
              border: "1px solid hsl(var(--line))",
              color: "hsl(var(--fog))",
              textDecoration: "none",
              transition: "all .15s",
            }}
          >
            <Eye style={{ width: 14, height: 14 }} />
            תצוגה מקדימה
          </Link>
        )}

        {/* Publish */}
        <button
          type="button"
          onClick={onPublish}
          disabled={saving}
          className="btn-primary"
          style={{ padding: "10px 22px", fontSize: 13.5 }}
        >
          {saving ? (
            <Loader2
              style={{
                width: 14,
                height: 14,
                animation: "spin 1s linear infinite",
              }}
            />
          ) : null}
          פרסם שינויים
        </button>
      </div>
    </div>
  );
}
