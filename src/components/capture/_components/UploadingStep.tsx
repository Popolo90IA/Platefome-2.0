"use client";

import { Upload } from "lucide-react";

interface Props {
  progress: number;
}

/**
 * UploadingStep — barre de progression upload.
 */
export function UploadingStep({ progress }: Props) {
  return (
    <div className="p-12 space-y-6 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-gold-gradient flex items-center justify-center animate-pulse">
        <Upload className="h-8 w-8 text-white" />
      </div>
      <h2 className="font-serif-display text-2xl font-bold">מעלה...</h2>
      <div className="max-w-sm mx-auto space-y-2">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-gradient transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-white/60">
          {progress}% — אל תסגור את הדף
        </p>
      </div>
    </div>
  );
}
