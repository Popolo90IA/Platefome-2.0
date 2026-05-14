"use client";

import Link from "next/link";

export default function NotFound() {
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
          404
        </p>
        <h1
          className="font-display text-4xl font-semibold mb-4"
          style={{ color: "hsl(var(--fog))" }}
        >
          הדף לא <em>נמצא.</em>
        </h1>
        <p
          className="font-sans text-sm mb-8"
          style={{ color: "hsl(var(--subtle))" }}
        >
          הקישור שחיפשת לא קיים או הוסר.
        </p>
        <Link
          href="/"
          className="btn-primary inline-block"
          style={{ textDecoration: "none" }}
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
