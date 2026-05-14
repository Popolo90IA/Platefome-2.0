"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex-1 flex items-center justify-center p-8"
      style={{ background: "hsl(var(--void))" }}
    >
      <div className="text-center max-w-sm">
        <p
          className="font-mono uppercase tracking-widest text-xs mb-4"
          style={{ color: "hsl(var(--accent-bright))" }}
        >
          שגיאה
        </p>
        <h2
          className="font-display text-2xl font-semibold mb-3"
          style={{ color: "hsl(var(--fog))" }}
        >
          משהו <em>השתבש.</em>
        </h2>
        <p
          className="font-sans text-sm mb-6"
          style={{ color: "hsl(var(--subtle))" }}
        >
          אירעה שגיאה בלתי צפויה בדשבורד.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary text-sm">
            נסה שוב
          </button>
          <Link
            href="/dashboard"
            className="font-sans text-sm px-4 py-2 rounded-lg border transition-colors"
            style={{
              color: "hsl(var(--fog))",
              borderColor: "hsl(var(--line))",
              textDecoration: "none",
            }}
          >
            חזרה לדשבורד
          </Link>
        </div>
      </div>
    </div>
  );
}
