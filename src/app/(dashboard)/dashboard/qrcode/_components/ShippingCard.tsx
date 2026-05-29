"use client";

import { CARD } from "../_lib/constants";

type Props = {
  tableCount: number;
  formatLabel: string;
  total: number;
  orderSent: boolean;
  onOrder: () => void;
};

/**
 * ShippingCard — sidebar : prix total + bouton "הזמן עכשיו" + confirmation.
 */
export function ShippingCard({
  tableCount,
  formatLabel,
  total,
  orderSent,
  onOrder,
}: Props) {
  return (
    <div
      style={{
        ...CARD,
        background:
          "linear-gradient(160deg, hsl(28,62%,42%,.08), transparent)",
        border: "1px solid hsl(28,62%,42%,.2)",
      }}
    >
      <div
        className="font-sans uppercase"
        style={{
          fontSize: "11.5px",
          letterSpacing: ".05em",
          color: "hsl(var(--accent-bright))",
          marginBottom: 14,
        }}
      >
        הדפסה ומשלוח
      </div>
      <div
        className="font-display"
        style={{
          fontSize: 28,
          fontWeight: 500,
          color: "hsl(var(--fog))",
          marginBottom: 4,
        }}
      >
        <em
          style={{ fontStyle: "italic", color: "hsl(var(--accent-bright))" }}
        >
          ₪{total}
        </em>
      </div>
      <p
        className="font-sans"
        style={{
          fontSize: 12,
          color: "hsl(var(--subtle))",
          marginBottom: 14,
        }}
      >
        {tableCount} {formatLabel} · נייר ממוחזר 350gsm · משלוח חינם
      </p>
      <button
        className="btn-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          padding: "11px 20px",
          fontSize: 13,
        }}
        onClick={onOrder}
      >
        הזמן עכשיו · 3 ימי עסקים
      </button>
      {orderSent && (
        <p
          className="font-sans text-sm text-center mt-3"
          style={{ color: "hsl(158 45% 42%)" }}
        >
          ההזמנה התקבלה — {tableCount} × {formatLabel} · ₪{total}
          <br />
          <span style={{ color: "hsl(var(--subtle))", fontSize: 12 }}>
            נציג יצור קשר בקרוב
          </span>
        </p>
      )}
    </div>
  );
}
