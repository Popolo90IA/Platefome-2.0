"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Camera,
  X,
  CheckCircle2,
  RotateCcw,
  Upload,
  Loader2,
  AlertCircle,
  ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  STORAGE_BUCKET,
  UPLOAD_FOLDERS,
  PHOTOS_360_COUNT,
} from "@/lib/constants";

type Step = "intro" | "capturing" | "review" | "uploading" | "done" | "error";

type Props = {
  onComplete: (urls: string[]) => void;
  onCancel: () => void;
  restaurantId: string;
};

// Compresse une image dataURL → Blob JPEG avec qualité donnée
async function compressImage(
  dataUrl: string,
  maxWidth = 1024,
  quality = 0.75
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = img.width * scale;
      const h = img.height * scale;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("canvas ctx null"));
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("toBlob null"))),
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => reject(new Error("image load failed"));
    img.src = dataUrl;
  });
}

export function Photo360Capture({ onComplete, onCancel, restaurantId }: Props) {
  const [step, setStep] = useState<Step>("intro");
  const [photos, setPhotos] = useState<string[]>([]); // dataURLs
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const supabase = createClient();

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "שגיאה בפתיחת המצלמה";
      setErrorMsg(msg);
      setStep("error");
    }
  }, []);

  useEffect(() => {
    if (step === "capturing") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step, startCamera, stopCamera]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setPhotos((prev) => {
      const next = [...prev, dataUrl];
      if (next.length >= PHOTOS_360_COUNT) {
        setStep("review");
      }
      return next;
    });
    // feedback visuel: flash
    if (videoRef.current) {
      videoRef.current.style.filter = "brightness(2)";
      setTimeout(() => {
        if (videoRef.current) videoRef.current.style.filter = "";
      }, 80);
    }
  };

  const uploadAll = async () => {
    setStep("uploading");
    setUploadProgress(0);
    const timestamp = Date.now();
    const urls: string[] = [];

    try {
      for (let i = 0; i < photos.length; i++) {
        const blob = await compressImage(photos[i], 1024, 0.75);
        const path = `${UPLOAD_FOLDERS.PHOTOS_360}/${restaurantId}/${timestamp}-${String(
          i
        ).padStart(2, "0")}.jpg`;
        const { error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(path, blob, {
            contentType: "image/jpeg",
            upsert: true,
          });
        if (error) throw error;
        const {
          data: { publicUrl },
        } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        urls.push(publicUrl);
        setUploadProgress(Math.round(((i + 1) / photos.length) * 100));
      }
      setStep("done");
      setTimeout(() => onComplete(urls), 600);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "שגיאת העלאה";
      setErrorMsg(msg);
      setStep("error");
    }
  };

  const reset = () => {
    setPhotos([]);
    setStep("intro");
    setErrorMsg("");
    setUploadProgress(0);
  };

  // Compute progress angle for the current capture
  const currentAngle = (photos.length / PHOTOS_360_COUNT) * 360;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="relative w-full max-w-2xl bg-charcoal-gradient text-white rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col">
        {/* Close */}
        <button
          onClick={() => {
            stopCamera();
            onCancel();
          }}
          className="absolute top-3 left-3 z-20 h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Intro */}
        {step === "intro" && (
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
              <Step num={1} text="הנח את המנה על משטח שטוח וצמצם הסחות דעת ברקע" />
              <Step num={2} text="הצב את המצלמה במרחק קבוע (30-50 ס״מ)" />
              <Step num={3} text={`סובב סביב המנה לאט ולחץ על הכפתור בכל שלב (${PHOTOS_360_COUNT} צילומים)`} />
              <Step num={4} text="סקור ושמור - התוצאה תופיע כמסתובב 360° בתפריט" />
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex gap-2 text-xs">
              <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span className="text-amber-100">
                <strong>טיפ:</strong> לתוצאות מעולות, השתמש בתאורה אחידה וצלם על רקע פשוט (לבן/שחור). תנועת המצלמה צריכה להיות חלקה.
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => setStep("capturing")}
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
        )}

        {/* Capturing */}
        {step === "capturing" && (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="relative flex-1 bg-black overflow-hidden">
              <video
                ref={videoRef}
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Overlay guide circulaire */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-48 h-48 sm:w-64 sm:h-64" viewBox="0 0 200 200">
                  {/* cercle de référence */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* arc de progression */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#goldGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(currentAngle / 360) * 565.48} 565.48`}
                    transform="rotate(-90 100 100)"
                    style={{ transition: "stroke-dasharray 0.3s" }}
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(42 55% 52%)" />
                      <stop offset="100%" stopColor="hsl(42 78% 65%)" />
                    </linearGradient>
                  </defs>
                  {/* marqueurs à chaque photo */}
                  {Array.from({ length: PHOTOS_360_COUNT }).map((_, i) => {
                    const angle = (i / PHOTOS_360_COUNT) * 2 * Math.PI - Math.PI / 2;
                    const x = 100 + 90 * Math.cos(angle);
                    const y = 100 + 90 * Math.sin(angle);
                    const done = i < photos.length;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill={done ? "hsl(42 78% 65%)" : "rgba(255,255,255,0.4)"}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Counter top */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                {photos.length} / {PHOTOS_360_COUNT}
              </div>

              {/* Hint bottom */}
              {photos.length === 0 && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs">
                  ↻ סובב סביב המנה ולחץ בכל שלב
                </div>
              )}
            </div>

            {/* Shutter */}
            <div className="p-6 flex items-center justify-center gap-4 bg-black">
              <button
                onClick={() => setStep("intro")}
                className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={capturePhoto}
                className="h-20 w-20 rounded-full bg-white shadow-gold-glow ring-4 ring-[hsl(var(--gold))] hover:scale-105 active:scale-95 transition-transform"
                aria-label="צלם"
              />
              <button
                onClick={() => setPhotos((p) => p.slice(0, -1))}
                disabled={photos.length === 0}
                className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Review */}
        {step === "review" && (
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
                onClick={uploadAll}
                className="flex-1 bg-gold-gradient hover:opacity-90 shadow-gold-glow"
                size="lg"
              >
                <Upload className="h-5 w-5" />
                שמור ({photos.length})
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/20 hover:bg-white/10 text-white"
              >
                <RotateCcw className="h-4 w-4" />
                מחדש
              </Button>
            </div>
          </div>
        )}

        {/* Uploading */}
        {step === "uploading" && (
          <div className="p-12 space-y-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gold-gradient flex items-center justify-center animate-pulse">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-serif-display text-2xl font-bold">מעלה...</h2>
            <div className="max-w-sm mx-auto space-y-2">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-gradient transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-white/60">{uploadProgress}% — אל תסגור את הדף</p>
            </div>
          </div>
        )}

        {/* Done */}
        {step === "done" && (
          <div className="p-12 space-y-4 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-serif-display text-2xl font-bold">הצלחה!</h2>
            <p className="text-sm text-white/70">
              {photos.length} תמונות הועלו בהצלחה
            </p>
          </div>
        )}

        {/* Error */}
        {step === "error" && (
          <div className="p-8 space-y-4 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="font-serif-display text-xl font-bold">שגיאה</h2>
            <p className="text-sm text-white/70">{errorMsg}</p>
            <div className="flex gap-2 justify-center pt-2">
              <Button onClick={reset} className="bg-gold-gradient">
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
        )}
      </div>
    </div>
  );
}

function Step({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-6 w-6 rounded-full bg-gold-gradient flex items-center justify-center text-xs font-bold flex-shrink-0">
        {num}
      </div>
      <p className="text-white/80">{text}</p>
    </div>
  );
}
