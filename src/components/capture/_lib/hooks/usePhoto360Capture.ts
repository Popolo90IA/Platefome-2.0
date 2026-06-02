"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  STORAGE_BUCKET,
  UPLOAD_FOLDERS,
  PHOTOS_360_COUNT,
} from "@/lib/constants";
import { compressImage } from "../helpers";
import {
  CAPTURE_QUALITY,
  COMPLETE_DELAY_MS,
  COMPRESS_MAX_WIDTH,
  COMPRESS_QUALITY,
  FLASH_DURATION_MS,
  VIDEO_CONSTRAINTS,
} from "../constants";
import type { Step } from "../types";

interface Args {
  restaurantId: string;
  onComplete: (urls: string[]) => void;
}

export function usePhoto360Capture({ restaurantId, onComplete }: Args) {
  const [step, setStep] = useState<Step>("intro");
  const [photos, setPhotos] = useState<string[]>([]);
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
        video: VIDEO_CONSTRAINTS,
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

  const capturePhoto = useCallback(() => {
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
    const dataUrl = canvas.toDataURL("image/jpeg", CAPTURE_QUALITY);
    setPhotos((prev) => {
      const next = [...prev, dataUrl];
      if (next.length >= PHOTOS_360_COUNT) setStep("review");
      return next;
    });
    if (videoRef.current) {
      videoRef.current.style.filter = "brightness(2)";
      setTimeout(() => {
        if (videoRef.current) videoRef.current.style.filter = "";
      }, FLASH_DURATION_MS);
    }
  }, []);

  const removeLast = useCallback(() => {
    setPhotos((p) => p.slice(0, -1));
  }, []);

  const uploadAll = useCallback(async () => {
    setStep("uploading");
    setUploadProgress(0);
    const timestamp = Date.now();
    const urls: string[] = [];
    try {
      for (let i = 0; i < photos.length; i++) {
        const blob = await compressImage(
          photos[i],
          COMPRESS_MAX_WIDTH,
          COMPRESS_QUALITY
        );
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
      setTimeout(() => onComplete(urls), COMPLETE_DELAY_MS);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "שגיאת העלאה";
      setErrorMsg(msg);
      setStep("error");
    }
  }, [photos, restaurantId, supabase, onComplete]);

  const reset = useCallback(() => {
    setPhotos([]);
    setStep("intro");
    setErrorMsg("");
    setUploadProgress(0);
  }, []);

  return {
    step,
    setStep,
    photos,
    errorMsg,
    uploadProgress,
    videoRef,
    canvasRef,
    stopCamera,
    capturePhoto,
    removeLast,
    uploadAll,
    reset,
  };
}
