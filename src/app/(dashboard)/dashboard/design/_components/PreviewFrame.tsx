"use client";

import { Ref } from "react";
import { Loader2 } from "lucide-react";
import type { PreviewMode } from "../_lib/types";
import { computeFrameMetrics } from "../_lib/helpers";

type Props = {
  menuUrl: string | null;
  mode: PreviewMode;
  tabletLandscape: boolean;
  panelW: number;
  windowH: number;
  iframeRef: Ref<HTMLIFrameElement>;
  onIframeLoad: () => void;
};

/**
 * PreviewFrame — iframe + chrome device (mobile/tablet scaled, desktop full).
 */
export function PreviewFrame({
  menuUrl,
  mode,
  tabletLandscape,
  panelW,
  windowH,
  iframeRef,
  onIframeLoad,
}: Props) {
  if (!menuUrl) {
    return (
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      </div>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          className="relative overflow-hidden shadow-premium w-full h-full"
          style={{
            borderRadius: 12,
            border: "1px solid hsl(var(--line))",
          }}
        >
          <iframe
            ref={iframeRef}
            src={menuUrl}
            className="w-full h-full border-0"
            style={{ borderRadius: 10 }}
            title="תצוגה מקדימה חיה"
            onLoad={onIframeLoad}
          />
        </div>
      </div>
    );
  }

  const m = computeFrameMetrics(mode, tabletLandscape, windowH, panelW);
  const { iW, iH, borderW, radius, scale, frameW, frameH } = m;

  return (
    <div className="flex-1 flex items-center justify-center overflow-hidden">
      <div
        className="relative shadow-premium flex-shrink-0"
        style={{
          width: frameW,
          height: frameH,
          borderRadius: radius * scale,
          border: `${borderW * scale}px solid hsl(var(--line))`,
          overflow: "hidden",
          transition: "width .3s, height .3s, border-radius .3s",
        }}
      >
        {mode === "mobile" && (
          <div
            className="absolute z-10 rounded-full"
            style={{
              width: 90 * scale,
              height: 6 * scale,
              top: 10 * scale,
              left: "50%",
              transform: "translateX(-50%)",
              background: "hsl(var(--line))",
            }}
          />
        )}
        <div
          style={{
            width: iW,
            height: iH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <iframe
            ref={iframeRef}
            src={menuUrl}
            style={{
              width: iW,
              height: iH,
              border: "none",
              borderRadius: Math.max(radius - borderW, 0),
            }}
            title="תצוגה מקדימה חיה"
            onLoad={onIframeLoad}
          />
        </div>
      </div>
    </div>
  );
}
