import Link from "next/link";
import { Loader2, Eye } from "lucide-react";
import type { Restaurant } from "@/types/database.types";

/* ── HeaderActions — preview link + publish button ── */
export function HeaderActions({
  restaurant,
  saving,
  onPublish,
}: {
  restaurant: Restaurant | null;
  saving: boolean;
  onPublish: () => void;
}) {
  return (
    <>
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

      <button
        type="button"
        onClick={onPublish}
        disabled={saving}
        className="btn-primary"
        style={{ padding: "10px 22px", fontSize: 13.5 }}
      >
        {saving ? (
          <Loader2
            style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }}
          />
        ) : null}
        פרסם שינויים
      </button>
    </>
  );
}
