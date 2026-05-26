"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { SectionCard } from "../_ui/SectionCard";

type DangerSectionProps = {
  dishName: string;
  onDelete: () => void;
};

export function DangerSection({ dishName, onDelete }: DangerSectionProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const canDelete = confirmText === dishName && dishName.length > 0;

  const reset = () => {
    setShowConfirm(false);
    setConfirmText("");
  };

  return (
    <SectionCard title="אזור סכנה" badge="בלתי הפיך" defaultOpen={false}>
      <div
        style={{
          padding: "18px 20px",
          borderRadius: 10,
          border: "1px solid hsl(var(--ember) / .3)",
          background: "hsl(var(--ember) / .04)",
        }}
      >
        <div
          className="font-sans"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "hsl(var(--fog))",
            marginBottom: 4,
          }}
        >
          מחיקת המנה
        </div>
        <p
          className="font-sans"
          style={{
            fontSize: 13,
            color: "hsl(var(--subtle))",
            marginBottom: 14,
            lineHeight: 1.5,
          }}
        >
          פעולה זו בלתי הפיכה. המנה, תמונותיה ומדיניות הגשה ימחקו לצמיתות.
        </p>
        {!showConfirm ? (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="font-sans"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              cursor: "pointer",
              background: "transparent",
              border: "1px solid hsl(var(--ember) / .5)",
              color: "hsl(var(--ember))",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all .15s",
            }}
          >
            <Trash2 style={{ width: 13, height: 13 }} />
            מחק מנה
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              className="font-sans"
              style={{ fontSize: 13, color: "hsl(var(--fog))" }}
            >
              הקלד את שם המנה לאישור:
              <span style={{ fontWeight: 600, marginRight: 4 }}>
                {dishName}
              </span>
            </div>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={dishName}
              className="font-sans"
              style={{
                fontSize: 14,
                padding: "10px 14px",
                background: "hsl(var(--void))",
                border: "1px solid hsl(var(--ember) / .4)",
                borderRadius: 8,
                color: "hsl(var(--fog))",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={onDelete}
                disabled={!canDelete}
                className="font-sans"
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: canDelete ? "pointer" : "not-allowed",
                  background: canDelete
                    ? "hsl(var(--ember))"
                    : "hsl(var(--line))",
                  border: "none",
                  color: "white",
                  transition: "all .15s",
                }}
              >
                מחק לצמיתות
              </button>
              <button
                type="button"
                onClick={reset}
                className="font-sans"
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: "pointer",
                  background: "transparent",
                  border: "1px solid hsl(var(--line))",
                  color: "hsl(var(--subtle))",
                }}
              >
                ביטול
              </button>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
