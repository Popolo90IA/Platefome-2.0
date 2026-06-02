"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Camera } from "lucide-react";
import { PHOTOS_360_COUNT } from "@/lib/constants";
import { StepRow } from "./StepRow";

interface Props {
  onStart: () => void;
  onCancel: () => void;
}

/**
 * IntroStep — écran d'intro avec instructions + CTA "התחל לצלם".
 */
export function IntroStep({ onStart, onCancel }: Props) {
  return (
    <div className="p-8 space-y-5">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
          <Camera className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="font-serif-display text-2xl font-bold">
            <span className="text-gold-gradient">צילום 360°</span>
          </h2>
          <p className="text-sm text-white/60">
            צלם את המנה מכל הזוויות ליצירת סיבוב תלת־מימדי
          </p>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-5 space-y-3 text-sm">
        <h3 className="font-bold text-base mb-2">כך זה עובד:</h3>
        <StepRow num={1} text="הנח את המנה על משטח שטוח וצמצם הסחות דעת ברקע" />
        <StepRow num={2} text="הצב את המצלמה במרחק קבוע (30-50 ס״מ)" />
        <StepRow
          num={3}
          text={`סובב סביב המנה לאט ולחץ על הכפתור בכל שלב (${PHOTOS_360_COUNT} צילומים)`}
        />
        <StepRow num={4} text="סקור ושמור - התוצאה תופיע כמסתובב 360° בתפריט" />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex gap-2 text-xs">
        <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <span className="text-amber-100">
          <strong>טיפ:</strong> לתוצאות מעולות, השתמש בתאורה אחידה וצלם על רקע
          פשוט (לבן/שחור). תנועת המצלמה צריכה להיות חלקה.
        </span>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          onClick={onStart}
          className="flex-1 bg-gold-gradient hover:opacity-90 shadow-gold-glow"
          size="lg"
        >
          <Camera className="h-5 w-5" />
          התחל לצלם
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          size="lg"
          className="bg-white/5 border-white/20 hover:bg-white/10 text-white"
        >
          ביטול
        </Button>
      </div>
    </div>
  );
}
