"use client";

import Link from "next/link";
import { CARD_STYLE } from "../_lib/constants";

type Props = {
  dishesMissing3d: number;
};

/**
 * InsightCard — insight hebdo + CTA "צור 3D".
 */
export function InsightCard({ dishesMissing3d }: Props) {
  return (
    <div
      style={{
        ...CARD_STYLE,
        background:
          "linear-gradient(160deg, hsl(var(--deep)), hsl(28,30%,93%))",
      }}
    >
      <h3
        className="font-display"
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "hsl(var(--fog))",
          margin: "0 0 16px",
        }}
      >
        תובנה{" "}
        <em style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}>
          השבוע
        </em>
      </h3>
      <p
        className="font-display"
        style={{
          fontSize: 22,
          fontWeight: 500,
          lineHeight: 1.25,
          color: "hsl(var(--fog))",
          margin: "0 0 16px",
        }}
      >
        מנות עם תצוגת 3D מקבלות{" "}
        <em
          style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}
        >
          ×2.4 יותר הזמנות
        </em>
        .
      </p>
      <p
        className="font-sans"
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: "hsl(var(--subtle))",
          margin: "0 0 20px",
        }}
      >
        {dishesMissing3d > 0
          ? `${dishesMissing3d} מנות שלך עדיין ללא תצוגת 3D. הוסף אותן השבוע.`
          : "כל המנות שלך כבר יש להן תצוגת 3D. מצוין!"}
      </p>
      <Link href="/dashboard/dishes">
        <button
          className="btn-primary"
          style={{ padding: "10px 20px", fontSize: 13 }}
        >
          צור 3D
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
