import type { FormState } from "../../_lib/types";
import { PhoneInfo } from "./PhoneInfo";

/* ── PhoneMockup — phone frame: status bar + photo + info + CTA ── */
export function PhoneMockup({ form }: { form: FormState }) {
  const has3dOr360 = form.model_3d_url || form.photos_360?.length;

  return (
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
          {has3dOr360 && (
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

        <PhoneInfo form={form} />

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
  );
}
