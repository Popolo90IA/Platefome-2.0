"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw, Upload } from "lucide-react";

interface Props {
  photos: string[];
  onUpload: () => void;
  onReset: () => void;
}

/**
 * ReviewStep — grille des photos capturées + boutons "shamur" / "mehadesh".
 */
export function ReviewStep({ photos, onUpload, onReset }: Props) {
  return (
    <div className="p-6 space-y-4 overflow-y-auto flex-1">
      <h2 className="font-serif-display text-2xl font-bold">
        <span className="text-gold-gradient">סקירה</span>
      </h2>
      <p className="text-sm text-white/70">
        {photos.length} תמונות מוכנות. מחק ותעשה מחדש אם לא מרוצה.
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-80 overflow-y-auto">
        {photos.map((p, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-md overflow-hidden border border-white/20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p} alt={`${i}`} className="w-full h-full object-cover" />
            <div className="absolute top-0.5 right-0.5 bg-black/70 text-[9px] px-1 rounded">
              {i + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          onClick={onUpload}
          className="flex-1 bg-gold-gradient hover:opacity-90 shadow-gold-glow"
          size="lg"
        >
          <Upload className="h-5 w-5" />
          שמור ({photos.length})
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="bg-white/5 border-white/20 hover:bg-white/10 text-white"
        >
          <RotateCcw className="h-4 w-4" />
          מחדש
        </Button>
      </div>
    </div>
  );
}
