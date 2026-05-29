"use client";

import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  saving: boolean;
  saved: boolean;
  error: string | null;
  onSave: () => void;
};

/**
 * SaveButton — bouton sauvegarde + état (saving/saved) + erreur.
 */
export function SaveButton({ saving, saved, error, onSave }: Props) {
  return (
    <>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex justify-end pb-6">
        <Button
          onClick={onSave}
          disabled={saving}
          className="text-white hover:opacity-90 min-w-[120px]"
          style={{
            background: saved ? "hsl(142 72% 29%)" : "var(--grad-bronze)",
          }}
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              שומר...
            </>
          ) : saved ? (
            <>
              <Check className="h-4 w-4" />
              נשמר
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
