import { MENU_TAGS } from "../_lib/constants";
import type { FormState } from "../_lib/types";

type PreviewPanelProps = {
  form: FormState;
  categoryName: string;
};

export function PreviewPanel({ form, categoryName }: PreviewPanelProps) {
  return (
    <div style={{ position: "sticky", top: 24 }}>
      {/* Preview label */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 4px",
          marginBottom: 14,
        }}
      >
        <span
          className="font-sans uppercase"
          style={{
            fontSize: 11,
            letterSpacing: ".06em",
            color: "hsl(var(--subtle))",
          }}
        >
          תצוגה מקדימה · חי
        </span>
        <span
          className="font-sans uppercase"
          style={{
            fontSize: 10,
            letterSpacing: ".06em",
            color: "hsl(var(--accent-bright))",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "hsl(var(--accent-bright))",
              display: "inline-block",
              opacity: 0.7,
            }}
          />
          מסנכרן
        </span>
      </div>

      {/* Phone mockup */}
      <div
        style={{
          background: "hsl(var(--fog))",
          borderRadius: 28,
          padding: "12px 12px 16px",
          boxShadow: "0 30px 80px -30px rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            background: "hsl(var(--void))",
            borderRadius: 18,
            overflow: "hidden",
            aspectRatio: "9 / 19",
          }}
        >
          {/* Status bar */}
          <div
            className="font-mono"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 14px",
              fontSize: 10,
              color: "hsl(var(--fog))",
            }}
          >
            <span>9:41</span>
            <span>●●●●</span>
          </div>

          {/* Photo area */}
          <div
            style={{
              aspectRatio: "4/3",
              background: form.image_url
                ? `url(${form.image_url}) center/cover`
                : "linear-gradient(135deg, hsl(28,40%,32%), hsl(28,55%,45%))",
              position: "relative",
            }}
          >
            {(form.model_3d_url || form.photos_360?.length) && (
              <div
                className="font-mono"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(255,255,255,.95)",
                  borderRadius: 99,
                  padding: "4px 9px",
                  fontSize: 9,
                  letterSpacing: ".05em",
                  color: "hsl(var(--accent-bright))",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "hsl(var(--accent-bright))",
                    display: "inline-block",
                  }}
                />
                {form.model_3d_url ? "3D" : "360°"}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ padding: "14px 16px" }}>
            <div
              className="font-display"
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "hsl(var(--fog))",
                lineHeight: 1.1,
              }}
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

            {/* Tag row */}
            {(form.tags.length > 0 ||
              form.is_signature ||
              form.is_new ||
              form.is_featured) && (
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                  marginTop: 10,
                }}
              >
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

          {/* CTA */}
          <div
            className="font-sans"
            style={{
              margin: "0 16px 14px",
              padding: 12,
              borderRadius: 10,
              background: "var(--grad-bronze)",
              textAlign: "center",
              fontSize: 13,
              fontWeight: 600,
              color: "white",
            }}
          >
            הוסף להזמנה
          </div>
        </div>
      </div>

      {/* Meta stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 18,
        }}
      >
        {[
          { k: "מנה", v: categoryName || "—" },
          { k: "מחיר", v: form.price ? `₪${form.price}` : "—" },
          { k: "מצב", v: form.is_available ? "זמין" : "אזל" },
          { k: "מודל 3D", v: form.model_3d_url ? "✓ פעיל" : "—" },
        ].map(({ k, v }) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12.5,
            }}
          >
            <span
              className="font-sans uppercase"
              style={{
                fontSize: 10,
                letterSpacing: ".06em",
                color: "hsl(var(--dim))",
              }}
            >
              {k}
            </span>
            <span
              className="font-sans"
              style={{ color: "hsl(var(--fog))", fontWeight: 500 }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
