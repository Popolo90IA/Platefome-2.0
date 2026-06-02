"use client";

import { CheckCircle2 } from "lucide-react";

interface Props {
  count: number;
}

/**
 * DoneStep — écran succès post-upload.
 */
export function DoneStep({ count }: Props) {
  return (
    <div className="p-12 space-y-4 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center animate-scale-in">
        <CheckCircle2 className="h-8 w-8 text-white" />
      </div>
      <h2 className="font-serif-display text-2xl font-bold">הצלחה!</h2>
      <p className="text-sm text-white/70">
        {count} תמונות הועלו בהצלחה
      </p>
    </div>
  );
}
