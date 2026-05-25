"use client";

import {
  Cuboid,
  Film,
  View,
  Camera,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/upload/FileUpload";
import {
  UPLOAD_FOLDERS,
  ALLOWED_VIDEO_TYPES,
  ALLOWED_MODEL_EXTS,
  MAX_VIDEO_SIZE,
  MAX_MODEL_SIZE,
} from "@/lib/constants";
import type { FormState } from "../../_lib/types";

type DishFormMediaProps = {
  form: FormState;
  onChange: (patch: Partial<FormState>) => void;
  onOpen360Capture: () => void;
};

export function DishFormMedia({ form, onChange, onOpen360Capture }: DishFormMediaProps) {
  return (
    <div className="relative border-2 border-[hsl(var(--gold))]/30 rounded-xl overflow-hidden bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent">
      <div className="absolute top-0 right-0 px-3 py-1 bg-gold-gradient text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-lg shadow-gold-glow">
        ✨ חדש
      </div>
      <div className="px-5 py-4 border-b border-[hsl(var(--gold))]/20 bg-gradient-to-r from-[hsl(var(--gold))]/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold-glow flex-shrink-0">
            <Cuboid className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif-display font-bold text-lg">
              חוויית 3D + VR + וידאו
            </h3>
            <p className="text-xs text-muted-foreground">
              הייחוד של הפלטפורמה שלך - תן ללקוח לראות את המנה בתלת־מימד ובמציאות רבודה
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Video */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-rose-600" />
            <Label className="text-sm font-bold">וידאו של המנה</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            סרטון קצר שיתנגן כשהלקוח מעביר מעל המנה. מעולה להראות תהליך הכנה או את המנה &quot;חיה&quot;.
          </p>
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
        </div>

        <div className="h-px bg-[hsl(var(--gold))]/20" />

        {/* Photos 360° */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <View className="h-4 w-4 text-[hsl(var(--gold-dark))]" />
            <Label className="text-sm font-bold">תצוגה 360° (מצלמה)</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            הפעל את המצלמה וסובב סביב המנה כדי לצלם 24 תמונות אוטומטית. הלקוח יוכל אחר־כך להחליק אצבע כדי לראות את המנה מכל הזוויות.
          </p>

          {form.photos_360 && form.photos_360.length > 0 ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--accent-bright))]/8 border border-[hsl(var(--accent-bright))]/25">
              <div className="h-12 w-12 rounded-lg bg-[hsl(var(--accent-bright))]/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-[hsl(var(--accent-bright))]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[hsl(var(--gold-dark))] text-sm">
                  {form.photos_360.length} תמונות הועלו
                </div>
                <div className="text-[11px] text-[hsl(var(--subtle))]">
                  התצוגה 360° תוצג ללקוחות בתפריט
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onOpen360Capture}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                צלם מחדש
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={onOpen360Capture}
              className="w-full border-[hsl(var(--gold))]/40 hover:bg-[hsl(var(--gold))]/10 h-auto py-3"
            >
              <Camera className="h-5 w-5" />
              <div className="text-start">
                <div className="font-bold">התחל צילום 360°</div>
                <div className="text-[11px] text-muted-foreground font-normal">
                  24 תמונות · כ-30 שניות
                </div>
              </div>
            </Button>
          )}
        </div>

        <div className="h-px bg-[hsl(var(--gold))]/20" />

        {/* 3D model */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Cuboid className="h-4 w-4 text-[hsl(var(--gold-dark))]" />
            <Label className="text-sm font-bold">מודל תלת־מימד (3D / AR)</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            קובץ <code className="px-1 rounded bg-secondary text-[11px]">.glb</code> או <code className="px-1 rounded bg-secondary text-[11px]">.gltf</code>. הלקוח יוכל לסובב את המנה 360° ואף לראות אותה על השולחן שלו ב-AR.{" "}
            <a
              href="https://poly.pizza/"
              target="_blank"
              rel="noopener"
              className="text-[hsl(var(--gold-dark))] underline hover:text-[hsl(var(--gold))]"
            >
              מודלים חינמיים ב-Poly.pizza ↗
            </a>
          </p>
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
            <label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg bg-[hsl(var(--accent-bright))]/8 border border-[hsl(var(--accent-bright))]/25 mt-3">
              <input
                type="checkbox"
                checked={form.ar_enabled}
                onChange={(e) => onChange({ ar_enabled: e.target.checked })}
                className="h-4 w-4 accent-[hsl(var(--accent-bright))]"
              />
              <div className="flex-1">
                <div className="font-medium text-[hsl(var(--gold-dark))]">
                  אפשר מציאות רבודה (AR)
                </div>
                <div className="text-[11px] text-[hsl(var(--subtle))]">
                  הלקוח יראה את המנה בגודל אמיתי על השולחן שלו - עובד על iPhone ו-Android ללא אפליקציה
                </div>
              </div>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
