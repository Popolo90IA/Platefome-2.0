"use client";

import { X } from "lucide-react";
import { PHOTOS_360_COUNT } from "@/lib/constants";
import { CapturingStep } from "./_components/CapturingStep";
import { DoneStep } from "./_components/DoneStep";
import { ErrorStep } from "./_components/ErrorStep";
import { IntroStep } from "./_components/IntroStep";
import { ReviewStep } from "./_components/ReviewStep";
import { UploadingStep } from "./_components/UploadingStep";
import { usePhoto360Capture } from "./_lib/hooks/usePhoto360Capture";
import type { Photo360Props } from "./_lib/types";

/**
 * Photo360Capture — orchestrateur du flow de capture 360°.
 * Étapes : intro → capturing → review → uploading → done | error.
 */
export function Photo360Capture({
  onComplete,
  onCancel,
  restaurantId,
}: Photo360Props) {
  const {
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
  } = usePhoto360Capture({ restaurantId, onComplete });

  const currentAngle = (photos.length / PHOTOS_360_COUNT) * 360;

  const handleClose = () => {
    stopCamera();
    onCancel();
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="relative w-full max-w-2xl bg-charcoal-gradient text-white rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col">
        <button
          onClick={handleClose}
          className="absolute top-3 left-3 z-20 h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "intro" && (
          <IntroStep
            onStart={() => setStep("capturing")}
            onCancel={onCancel}
          />
        )}

        {step === "capturing" && (
          <CapturingStep
            videoRef={videoRef}
            canvasRef={canvasRef}
            photosCount={photos.length}
            currentAngle={currentAngle}
            onShutter={capturePhoto}
            onBack={() => setStep("intro")}
            onUndo={removeLast}
          />
        )}

        {step === "review" && (
          <ReviewStep
            photos={photos}
            onUpload={uploadAll}
            onReset={reset}
          />
        )}

        {step === "uploading" && <UploadingStep progress={uploadProgress} />}

        {step === "done" && <DoneStep count={photos.length} />}

        {step === "error" && (
          <ErrorStep
            message={errorMsg}
            onRetry={reset}
            onCancel={onCancel}
          />
        )}
      </div>
    </div>
  );
}
