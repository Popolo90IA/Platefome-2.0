import { t } from "@/lib/i18n";
import type { Language } from "@/types/database.types";
import { D } from "../_lib/constants";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  lang: Language;
  dir: "ltr" | "rtl";
};

/**
 * Search input with magnifier icon and (when filled) a clear button.
 */
export function SearchBar({ value, onChange, lang, dir }: SearchBarProps) {
  return (
    <div style={{ padding: "10px 24px 12px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
        <svg
          aria-hidden
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            position: "absolute",
            top: "50%",
            insetInlineStart: 12,
            transform: "translateY(-50%)",
            color: D.textDim,
            pointerEvents: "none",
          }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t(lang, "search_placeholder")}
          dir={dir}
          style={{
            width: "100%",
            paddingInlineStart: 34,
            paddingInlineEnd: value ? 34 : 12,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 99,
            background: "hsl(28,22%,12%,.8)",
            border: `1px solid ${value ? D.line2 : D.line}`,
            color: D.cream,
            fontFamily: "var(--font-body)",
            fontSize: 13,
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color .2s",
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="נקה חיפוש"
            style={{
              position: "absolute",
              top: "50%",
              insetInlineEnd: 8,
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: D.textDim,
              display: "flex",
              alignItems: "center",
              padding: 4,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
