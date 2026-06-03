import { Loader2, CheckCircle2 } from "lucide-react";
import type { SaveState } from "../../_lib/types";

/* ── SaveIndicator — auto-save status (saving / saved / idle / error) ── */
export function SaveIndicator({ saveState }: { saveState: SaveState }) {
  return (
    <span
      className="font-sans uppercase"
      style={{
        fontSize: 11,
        letterSpacing: ".06em",
        color: saveState === "error" ? "hsl(0,60%,50%)" : "hsl(var(--dim))",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {saveState === "saving" && (
        <>
          <Loader2
            style={{ width: 12, height: 12, animation: "spin 1s linear infinite" }}
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
  );
}
