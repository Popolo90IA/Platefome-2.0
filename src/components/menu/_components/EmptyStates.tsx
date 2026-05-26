import { UtensilsCrossed } from "lucide-react";
import { t } from "@/lib/i18n";
import type { Language } from "@/types/database.types";
import { D } from "../_lib/constants";

type SearchEmptyProps = {
  lang: Language;
  onClear: () => void;
};

/**
 * Shown when the search yields no results.
 */
export function SearchEmpty({ lang, onClear }: SearchEmptyProps) {
  return (
    <div style={{ textAlign: "center", padding: "100px 24px" }}>
      <UtensilsCrossed
        style={{
          width: 44,
          height: 44,
          color: D.gold,
          opacity: 0.22,
          margin: "0 auto 16px",
        }}
      />
      <p
        style={{
          color: D.textDim,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
        }}
      >
        {t(lang, "no_search_results")}
      </p>
      <button
        type="button"
        onClick={onClear}
        style={{
          marginTop: 16,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: D.gold,
          background: "none",
          border: `1px solid ${D.line2}`,
          borderRadius: 99,
          padding: "8px 18px",
          cursor: "pointer",
        }}
      >
        ✕ {t(lang, "search_placeholder").replace("...", "")}
      </button>
    </div>
  );
}

type MenuEmptyProps = {
  lang: Language;
};

/**
 * Shown when there are no categories at all.
 */
export function MenuEmpty({ lang }: MenuEmptyProps) {
  return (
    <div style={{ textAlign: "center", padding: "120px 24px" }}>
      <UtensilsCrossed
        style={{
          width: 52,
          height: 52,
          color: D.gold,
          opacity: 0.25,
          margin: "0 auto 16px",
        }}
      />
      <p style={{ color: D.textDim, fontFamily: "'DM Sans', sans-serif" }}>
        {t(lang, "empty_menu")}
      </p>
    </div>
  );
}
