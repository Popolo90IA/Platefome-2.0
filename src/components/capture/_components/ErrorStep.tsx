"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
  onCancel: () => void;
}

/**
 * ErrorStep — écran erreur (caméra, upload, etc).
 */
export function ErrorStep({ message, onRetry, onCancel }: Props) {
  return (
    <div className="p-8 space-y-4 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-400" />
      </div>
      <h2 className="font-serif-display text-xl font-bold">שגיאה</h2>
      <p className="text-sm text-white/70">{message}</p>
      <div className="flex gap-2 justify-center pt-2">
        <Button onClick={onRetry} className="bg-gold-gradient">
          נסה שוב
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          className="bg-white/5 border-white/20 text-white"
        >
          סגור
        </Button>
      </div>
    </div>
  );
}
