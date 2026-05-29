"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Save, Check, AlertCircle } from "lucide-react";

type Props = {
  saving: boolean;
  saved: boolean;
  error: string | null;
};

/**
 * SaveBar — bouton submit sticky bottom + bandeau erreur si présent.
 */
export function SaveBar({ saving, saved, error }: Props) {
  return (
    <>
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3.5 rounded-xl border border-destructive/20 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div
        className="sticky bottom-4 z-10"
        style={{ filter: "drop-shadow(0 4px 16px hsl(28 62% 38% / .25))" }}
      >
        <Button
          type="submit"
          disabled={saving}
          size="lg"
          className="w-full hover:opacity-90 text-white"
          style={{ background: "var(--grad-bronze)" }}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <>
              <Check className="h-4 w-4" />
              נשמר!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              שמור שינויים
            </>
          )}
        </Button>
      </div>
    </>
  );
}
