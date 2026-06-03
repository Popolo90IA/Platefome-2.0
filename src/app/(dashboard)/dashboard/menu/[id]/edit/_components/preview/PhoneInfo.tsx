import { MENU_TAGS } from "../../_lib/constants";
import type { FormState } from "../../_lib/types";

/* ── PhoneInfo — name/price/desc + tag row inside the phone mockup ── */
export function PhoneInfo({ form }: { form: FormState }) {
  const showTags =
    form.tags.length > 0 || form.is_signature || form.is_new || form.is_featured;

  return (
    <div style={{ padding: "14px 16px" }}>
      <div
        className="font-display"
        style={{ fontSize: 20, fontWeight: 600, color: "hsl(var(--fog))", lineHeight: 1.1 }}
      >
        {form.name || "שם המנה"}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 13,
          color: "hsl(var(--accent-bright))",
          marginTop: 4,
          letterSpacing: ".04em",
        }}
      >
        {form.price ? `₪${form.price}` : "₪—"}
      </div>
      {form.description && (
        <div
          className="font-sans"
          style={
            {
              fontSize: 12,
              color: "hsl(var(--subtle))",
              lineHeight: 1.5,
              marginTop: 8,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            } as React.CSSProperties
          }
        >
          {form.description}
        </div>
      )}

      {showTags && (
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
          {form.is_signature && (
            <span
              style={{
                padding: "3px 9px",
                borderRadius: 99,
                fontSize: 10,
                fontWeight: 500,
                color: "hsl(var(--accent-bright))",
                background: "hsl(28,62%,42%,.1)",
                border: "1px solid hsl(28,62%,42%,.18)",
              }}
            >
              מנת השף
            </span>
          )}
          {form.is_new && (
            <span
              style={{
                padding: "3px 9px",
                borderRadius: 99,
                fontSize: 10,
                fontWeight: 500,
                color: "hsl(120,30%,32%)",
                background: "hsl(120,30%,40%,.1)",
                border: "1px solid hsl(120,30%,40%,.2)",
              }}
            >
              חדש
            </span>
          )}
          {form.tags.slice(0, 2).map((t) => {
            const found = MENU_TAGS.find((mt) => mt.key === t);
            return found ? (
              <span
                key={t}
                style={{
                  padding: "3px 9px",
                  borderRadius: 99,
                  fontSize: 10,
                  fontWeight: 500,
                  color: "hsl(var(--accent-bright))",
                  background: "hsl(28,62%,42%,.1)",
                  border: "1px solid hsl(28,62%,42%,.18)",
                }}
              >
                {found.label}
              </span>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
