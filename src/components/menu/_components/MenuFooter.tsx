import { t } from "@/lib/i18n";
import type { Language } from "@/types/database.types";
import { D } from "../_lib/constants";

type MenuFooterProps = {
  lang: Language;
};

/**
 * "Powered by PLATEFORM" footer with the plate-and-italic-FORM wordmark.
 */
export function MenuFooter({ lang }: MenuFooterProps) {
  return (
    <footer>
      <div
        style={{
          maxWidth: 860,
          margin: "60px auto 0",
          padding: "36px 24px",
          borderTop: `1px solid ${D.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <span style={{ color: D.gold, display: "flex", alignItems: "center" }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 22 Q5 12 16 12 Q27 12 27 22 Z" />
            <line x1="3" y1="22" x2="29" y2="22" />
            <circle cx="16" cy="9" r="1.5" fill="currentColor" />
          </svg>
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: D.textDim,
          }}
        >
          {t(lang, "powered")}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: ".18em",
            color: D.text,
          }}
        >
          PLATE
          <em style={{ fontStyle: "italic", color: D.gold }}>FORM</em>
        </span>
      </div>
    </footer>
  );
}
