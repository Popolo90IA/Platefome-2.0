"use client";

/**
 * LoadingSpinner — spinner doré centré.
 */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
    </div>
  );
}
