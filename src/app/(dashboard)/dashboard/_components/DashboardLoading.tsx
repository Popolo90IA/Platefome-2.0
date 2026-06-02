"use client";

/**
 * DashboardLoading — spinner ligne fine.
 */
export function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div
        className="h-px w-16 animate-pulse"
        style={{ background: "hsl(var(--line))" }}
      />
    </div>
  );
}
