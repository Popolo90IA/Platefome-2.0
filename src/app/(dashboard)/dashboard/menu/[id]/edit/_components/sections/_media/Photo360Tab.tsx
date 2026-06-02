import { Camera, CheckCircle2, RotateCcw } from "lucide-react";
import type { FormState } from "../../../_lib/types";

interface Props {
  form: FormState;
  onOpen360Capture: () => void;
}

export function Photo360Tab({ form, onOpen360Capture }: Props) {
  if (form.photos_360 && form.photos_360.length > 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 20px",
          borderRadius: 12,
          background: "hsl(28,62%,42%,.06)",
          border: "1px solid hsl(28,62%,42%,.2)",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            flexShrink: 0,
            background: "hsl(28,62%,42%,.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle2
            style={{
              width: 22,
              height: 22,
              color: "hsl(var(--accent-bright))",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div
            className="font-sans"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "hsl(var(--fog))",
            }}
          >
            {form.photos_360.length} תמונות הועלו
          </div>
          <div
            className="font-sans"
            style={{
              fontSize: 12,
              color: "hsl(var(--subtle))",
              marginTop: 2,
            }}
          >
            התצוגה 360° תוצג ללקוחות בתפריט
          </div>
        </div>
        <button
          type="button"
          onClick={onOpen360Capture}
          className="font-sans"
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            fontSize: 13,
            background: "transparent",
            border: "1px solid hsl(var(--line))",
            color: "hsl(var(--fog))",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <RotateCcw style={{ width: 13, height: 13 }} />
          צלם מחדש
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen360Capture}
      style={{
        width: "100%",
        padding: "28px 24px",
        borderRadius: 12,
        border: "2px dashed hsl(28,62%,42%,.3)",
        background: "hsl(28,62%,42%,.04)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        transition: "all .15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "hsl(28,62%,42%,.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "hsl(28,62%,42%,.04)";
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "hsl(28,62%,42%,.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Camera
          style={{
            width: 20,
            height: 20,
            color: "hsl(var(--accent-bright))",
          }}
        />
      </div>
      <div
        className="font-display"
        style={{
          fontSize: 19,
          fontWeight: 500,
          color: "hsl(var(--fog))",
        }}
      >
        התחל צילום{" "}
        <em
          style={{
            fontStyle: "italic",
            color: "hsl(var(--accent-bright))",
          }}
        >
          360°
        </em>
      </div>
      <p
        className="font-sans"
        style={{
          fontSize: 13,
          color: "hsl(var(--subtle))",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: 340,
        }}
      >
        הפעל את המצלמה וסובב סביב המנה · 24 תמונות אוטומטית · כ-30 שניות
      </p>
    </button>
  );
}
