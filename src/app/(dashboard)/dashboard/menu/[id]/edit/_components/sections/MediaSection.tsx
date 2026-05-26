import { Camera, RotateCcw, CheckCircle2, Cuboid } from "lucide-react";
import { ImageUpload } from "@/components/upload/ImageUpload";
import { FileUpload } from "@/components/upload/FileUpload";
import {
  UPLOAD_FOLDERS,
  ALLOWED_VIDEO_TYPES,
  ALLOWED_MODEL_EXTS,
  MAX_VIDEO_SIZE,
  MAX_MODEL_SIZE,
} from "@/lib/constants";
import { SectionCard } from "../_ui/SectionCard";
import type { FormState, MediaTab } from "../../_lib/types";

type MediaSectionProps = {
  form: FormState;
  activeMediaTab: MediaTab;
  onTabChange: (tab: MediaTab) => void;
  onChange: (patch: Partial<FormState>) => void;
  onOpen360Capture: () => void;
};

export function MediaSection({
  form,
  activeMediaTab,
  onTabChange,
  onChange,
  onOpen360Capture,
}: MediaSectionProps) {
  const mediaTabs = [
    { key: "photo" as const, label: "תמונה", dot: !!form.image_url },
    {
      key: "360" as const,
      label: "360°",
      dot: !!(form.photos_360?.length),
    },
    { key: "3d" as const, label: "3D", dot: !!form.model_3d_url },
    { key: "video" as const, label: "וידאו", dot: !!form.video_url },
  ];

  return (
    <SectionCard title="חזותי" badge="3D · 360 · AR">
      {/* Media tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: 4,
          background: "hsl(var(--abyss))",
          borderRadius: 10,
          marginBottom: 18,
          width: "fit-content",
        }}
      >
        {mediaTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className="font-sans"
            style={{
              padding: "8px 18px",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
              color:
                activeMediaTab === tab.key
                  ? "hsl(var(--fog))"
                  : "hsl(var(--subtle))",
              background:
                activeMediaTab === tab.key
                  ? "hsl(var(--deep))"
                  : "transparent",
              border: "none",
              cursor: "pointer",
              boxShadow:
                activeMediaTab === tab.key
                  ? "0 1px 3px rgba(0,0,0,.06)"
                  : "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "all .15s",
            }}
          >
            {tab.dot && (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "hsl(var(--accent-bright))",
                  boxShadow:
                    activeMediaTab === tab.key
                      ? "0 0 0 3px hsl(28,62%,42%,.18)"
                      : "none",
                }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo tab */}
      {activeMediaTab === "photo" && (
        <ImageUpload
          label=""
          folder={UPLOAD_FOLDERS.DISHES}
          currentImage={form.image_url}
          onUploadComplete={(url) => onChange({ image_url: url })}
          variant="banner"
          previewMeta={{ restaurantName: form.name }}
        />
      )}

      {/* 360 tab */}
      {activeMediaTab === "360" && (
        <div>
          {form.photos_360 && form.photos_360.length > 0 ? (
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
          ) : (
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
          )}
        </div>
      )}

      {/* 3D tab */}
      {activeMediaTab === "3d" && (
        <div>
          <FileUpload
            label=""
            folder={UPLOAD_FOLDERS.MODELS}
            currentUrl={form.model_3d_url}
            onUploadComplete={(url) => onChange({ model_3d_url: url })}
            accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
            allowedExts={ALLOWED_MODEL_EXTS}
            maxSize={MAX_MODEL_SIZE}
            preview="model"
            helperText=".glb / .gltf — עד 20MB"
          />
          {form.model_3d_url && (
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginTop: 14,
                padding: "14px 16px",
                borderRadius: 10,
                cursor: "pointer",
                background: "hsl(28,62%,42%,.06)",
                border: "1px solid hsl(28,62%,42%,.2)",
              }}
            >
              <input
                type="checkbox"
                checked={form.ar_enabled}
                onChange={(e) => onChange({ ar_enabled: e.target.checked })}
                style={{
                  marginTop: 2,
                  accentColor: "hsl(var(--accent-bright))",
                }}
              />
              <div>
                <div
                  className="font-sans"
                  style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: "hsl(var(--accent-bright))",
                  }}
                >
                  אפשר מציאות רבודה (AR)
                </div>
                <div
                  className="font-sans"
                  style={{
                    fontSize: 12,
                    color: "hsl(var(--subtle))",
                    marginTop: 2,
                  }}
                >
                  הלקוח יראה את המנה בגודל אמיתי על השולחן שלו — iPhone + Android, ללא אפליקציה
                </div>
              </div>
            </label>
          )}
          {/* Hint */}
          <div
            style={{
              marginTop: 14,
              padding: "14px 16px",
              borderRadius: 10,
              background: "hsl(var(--abyss))",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                flexShrink: 0,
                background: "var(--grad-bronze)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cuboid style={{ width: 18, height: 18, color: "#fff" }} />
            </div>
            <div>
              <div
                className="font-sans"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "hsl(var(--fog))",
                }}
              >
                אין קובץ 3D? נסרוק עבורך.
              </div>
              <div
                className="font-sans"
                style={{
                  fontSize: 12,
                  color: "hsl(var(--subtle))",
                  marginTop: 2,
                }}
              >
                <a
                  href="https://poly.pizza/"
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: "hsl(var(--accent-bright))",
                    textDecoration: "none",
                  }}
                >
                  מודלים חינמיים ב-Poly.pizza ↗
                </a>{" "}
                · .GLB · .GLTF · עד 20MB
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video tab */}
      {activeMediaTab === "video" && (
        <FileUpload
          label=""
          folder={UPLOAD_FOLDERS.VIDEOS}
          currentUrl={form.video_url}
          onUploadComplete={(url) => onChange({ video_url: url })}
          accept="video/mp4,video/webm,video/quicktime"
          allowedTypes={ALLOWED_VIDEO_TYPES}
          maxSize={MAX_VIDEO_SIZE}
          preview="video"
          helperText="MP4 / WebM / MOV — עד 25MB"
        />
      )}
    </SectionCard>
  );
}
