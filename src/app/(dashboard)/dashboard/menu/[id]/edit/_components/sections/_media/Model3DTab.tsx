import { Cuboid } from "lucide-react";
import { FileUpload } from "@/components/upload/FileUpload";
import {
  UPLOAD_FOLDERS,
  ALLOWED_MODEL_EXTS,
  MAX_MODEL_SIZE,
} from "@/lib/constants";
import type { FormState } from "../../../_lib/types";

interface Props {
  form: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

export function Model3DTab({ form, onChange }: Props) {
  return (
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
  );
}
