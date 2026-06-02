"use client";

import { RefObject } from "react";
import { RotateCcw, X } from "lucide-react";
import { PHOTOS_360_COUNT } from "@/lib/constants";
import { CaptureGuideOverlay } from "./CaptureGuideOverlay";

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  photosCount: number;
  currentAngle: number;
  onShutter: () => void;
  onBack: () => void;
  onUndo: () => void;
}

/**
 * CapturingStep — vidéo live + overlay guide + barre shutter.
 */
export function CapturingStep({
  videoRef,
  canvasRef,
  photosCount,
  currentAngle,
  onShutter,
  onBack,
  onUndo,
}: Props) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="relative flex-1 bg-black overflow-hidden">
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        <CaptureGuideOverlay
          photosCount={photosCount}
          currentAngle={currentAngle}
        />

        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
          {photosCount} / {PHOTOS_360_COUNT}
        </div>

        {photosCount === 0 && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs">
            ↻ סובב סביב המנה ולחץ בכל שלב
          </div>
        )}
      </div>

      <div className="p-6 flex items-center justify-center gap-4 bg-black">
        <button
          onClick={onBack}
          className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          onClick={onShutter}
          className="h-20 w-20 rounded-full bg-white shadow-gold-glow ring-4 ring-[hsl(var(--gold))] hover:scale-105 active:scale-95 transition-transform"
          aria-label="צלם"
        />
        <button
          onClick={onUndo}
          disabled={photosCount === 0}
          className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
