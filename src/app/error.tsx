"use client";

import { useEffect } from "react";

export default function Error({
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
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "hsl(var(--void))" }}
    >
      <div className="text-center max-w-md">
        <p
          className="font-mono uppercase tracking-widest text-xs mb-6"
          style={{ color: "hsl(var(--accent-bright))" }}
        >
          שגיאה
        </p>
        <h1
          className="font-display text-4xl font-semibold mb-4"
          style={{ color: "hsl(var(--fog))" }}
        >
          משהו <em>השתבש.</em>
        </h1>
        <p
          className="font-sans text-sm mb-8"
          style={{ color: "hsl(var(--subtle))" }}
        >
          אירעה שגיאה בלתי צפויה. אנא נסה שוב.
        </p>
        <button onClick={reset} className="btn-primary">
          נסה שוב
        </button>
      </div>
    </div>
  );
}
