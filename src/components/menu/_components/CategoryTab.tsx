import type { FontPack } from "@/lib/theme";
import { D } from "../_lib/constants";

export type CategoryTabVariant = "pills" | "underline" | "mobile-sidebar";

type CategoryTabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant: CategoryTabVariant;
  fontPack: FontPack;
};

/**
 * Single category button. Three visual variants share one component to
 * keep behavior (click handler, active state, font) consistent.
 */
export function CategoryTab({
  label,
  isActive,
  onClick,
  variant,
  fontPack,
}: CategoryTabProps) {
  if (variant === "pills") {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          padding: "7px 16px",
          borderRadius: 99,
          background: isActive ? D.grad : "transparent",
          border: `1px solid ${isActive ? "transparent" : D.line}`,
          color: isActive ? "#fff" : D.textDim,
          fontFamily: fontPack.bodyFont,
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          flexShrink: 0,
          boxShadow: isActive ? `0 0 20px ${D.gold}4d` : "none",
          transition: "all .15s",
        }}
      >
        {label}
      </button>
    );
  }

  if (variant === "underline") {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          padding: "7px 14px",
          borderRadius: 0,
          background: "transparent",
          border: "none",
          borderBottom: `2px solid ${isActive ? D.gold : "transparent"}`,
          color: isActive ? D.gold : D.textDim,
          fontFamily: fontPack.bodyFont,
          fontSize: 13,
          fontWeight: isActive ? 600 : 400,
          cursor: "pointer",
          flexShrink: 0,
          transition: "all .15s",
        }}
      >
        {label}
      </button>
    );
  }

  // mobile-sidebar
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flexShrink: 0,
        padding: "6px 14px",
        borderRadius: 99,
        border: `1px solid ${isActive ? D.gold : D.line}`,
        background: isActive ? D.gold : "transparent",
        color: isActive ? D.page : D.textDim,
        fontFamily: fontPack.bodyFont,
        fontSize: 12,
        fontWeight: isActive ? 600 : 400,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "all .15s",
      }}
    >
      {label}
    </button>
  );
}
