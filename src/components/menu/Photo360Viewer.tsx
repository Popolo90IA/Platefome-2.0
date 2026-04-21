"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  photos: string[];
  onClose: () => void;
  dishName: string;
  onFirstView?: () => void;
};

export function Photo360Viewer({ photos, onClose, dishName, onFirstView }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; index: number } | null>(null);
  const firedViewRef = useRef(false);

  const count = photos.length;

  // Fire view event one time
  useEffect(() => {
    if (!firedViewRef.current && onFirstView) {
      firedViewRef.current = true;
      onFirstView();
    }
  }, [onFirstView]);

  // Preload all images
  useEffect(() => {
    photos.forEach((src, i) => {
      const img = new Image();
      img.onload = () => setLoaded((prev) => ({ ...prev, [i]: true }));
      img.src = src;
    });
  }, [photos]);

  // Auto-rotate (jusqu'au 1er drag)
  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % count);
    }, 100);
    return () => clearInterval(id);
  }, [autoRotate, count]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") {
        setAutoRotate(false);
        setCurrentIndex((i) => (i - 1 + count) % count);
      } else if (e.key === "ArrowRight") {
        setAutoRotate(false);
        setCurrentIndex((i) => (i + 1) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, count]);

  // Pointer drag to rotate
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setAutoRotate(false);
    dragStartRef.current = { x: e.clientX, index: currentIndex };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    // 1 photo = ~30px de swipe
    const delta = Math.round(dx / 30);
    const next = (dragStartRef.current.index + delta) % count;
    setCurrentIndex(next < 0 ? next + count : next);
  };
  const onPointerUp = () => {
    dragStartRef.current = null;
  };

  const loadedCount = Object.keys(loaded).length;
  const isLoading = loadedCount < count;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex flex-col"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div>
          <h2 className="font-serif-display text-xl font-bold">{dishName}</h2>
          <p className="text-xs text-white/60">
            {autoRotate ? "סובב אוטומטית · גרור כדי להשתלט" : "גרור שמאלה/ימינה לסיבוב"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Viewer */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-10 pointer-events-none">
            <div className="text-center space-y-3">
              <div className="h-10 w-10 mx-auto rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
              <p className="text-sm">טוען {loadedCount} / {count}</p>
            </div>
          </div>
        )}

        {currentPhoto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentPhoto}
            alt={`${dishName} - ${currentIndex + 1}`}
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-100"
            style={{ transform: `scale(${zoom})` }}
          />
        )}

        {/* Rotation indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs">
          <RotateCw className="h-3 w-3" />
          {currentIndex + 1} / {count}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 flex items-center justify-center gap-2 bg-black">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
          className="bg-white/5 border-white/20 text-white hover:bg-white/15"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <div className="text-white text-xs w-14 text-center">
          {Math.round(zoom * 100)}%
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
          className="bg-white/5 border-white/20 text-white hover:bg-white/15"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <div className="mx-2 h-6 w-px bg-white/20" />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoRotate((v) => !v)}
          className={`border-white/20 text-white ${
            autoRotate
              ? "bg-gold-gradient hover:opacity-90 border-transparent"
              : "bg-white/5 hover:bg-white/15"
          }`}
        >
          <RotateCw className={`h-4 w-4 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "2s" }} />
          {autoRotate ? "עצור" : "סובב"}
        </Button>
      </div>
    </div>
  );
}
