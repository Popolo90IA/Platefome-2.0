"use client";

import { UploadCard } from "./_step2/UploadCard";
import { PreviewCard } from "./_step2/PreviewCard";

/* ── Step 2: First dish / file upload ───────────────── */
export function Step2() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 36,
        marginTop: 0,
        alignItems: "stretch",
      }}
    >
      <UploadCard />
      <PreviewCard />
    </div>
  );
}
