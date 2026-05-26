"use client";

const CARD_BASE = {
  background: "linear-gradient(135deg,hsl(38,30%,97%),hsl(36,22%,93%))",
  border: "1px solid hsl(30,18%,82%,.5)",
  borderRadius: 20,
  padding: "36px 32px",
  position: "relative" as const,
  overflow: "hidden" as const,
};

const NUMBER_BG = {
  position: "absolute" as const,
  top: 12,
  left: 20,
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 72,
  fontWeight: 800,
  color: "hsl(28,62%,42%,.18)",
  lineHeight: 1,
  letterSpacing: "-.04em",
  userSelect: "none" as const,
};

const ICON_WRAP_BASE = {
  width: 52,
  height: 52,
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
};

const EYEBROW_BASE = {
  fontFamily: "'DM Sans',sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase" as const,
  marginBottom: 10,
};

const H3 = {
  fontFamily: "'Cormorant Garamond',serif",
  fontSize: "2rem",
  fontWeight: 700,
  color: "hsl(24,18%,16%)",
  lineHeight: 1.1,
  marginBottom: 12,
};

const P = {
  fontFamily: "'DM Sans',sans-serif",
  fontSize: ".9rem",
  color: "hsl(24,12%,32%)",
  lineHeight: 1.65,
  marginBottom: 24,
};

const MOCKUP = {
  background: "hsl(38,28%,94%)",
  border: "1px solid hsl(30,18%,82%,.3)",
  borderRadius: 12,
  padding: "14px 16px",
};

/**
 * FeaturesSection — section #features "השיטה" (3 cards QR / 3D AR / Analytics).
 */
export function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        padding: "120px 0 140px",
        background: "hsl(38,30%,97%)",
        borderTop: "1px solid hsl(30,18%,86%)",
        position: "relative",
        scrollMarginTop: 80,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse,hsl(28,62%,42%,.06) 0%,transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          direction: "rtl",
        }}
      >
        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "hsl(28,62%,42%,.08)",
              border: "1px solid hsl(28,62%,42%,.18)",
              borderRadius: 99,
              padding: "6px 18px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(28,62%,42%)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase" as const,
                color: "hsl(28,62%,42%)",
              }}
            >
              השיטה
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
              fontWeight: 700,
              color: "hsl(24,18%,16%)",
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              margin: 0,
            }}
          >
            שלושה שלבים.{" "}
            <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>
              מהפכה גסטרונומית.
            </em>
          </h2>
        </div>

        {/* 3 cards */}
        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {/* Card 1 — QR Scan */}
          <div className="reveal" data-delay="0" style={CARD_BASE}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg, hsl(28,62%,42%), hsl(22,70%,50%))",
              }}
            />
            <div style={NUMBER_BG}>01</div>
            <div
              style={{
                ...ICON_WRAP_BASE,
                background:
                  "linear-gradient(135deg,hsl(28,62%,42%,.12),hsl(22,70%,50%,.08))",
                border: "1px solid hsl(28,62%,42%,.3)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(28,62%,42%)"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="3" height="3" rx=".5" />
              </svg>
            </div>
            <div style={{ ...EYEBROW_BASE, color: "hsl(28,62%,42%)" }}>סריקה</div>
            <h3 style={H3}>
              הלקוח מכוון,
              <br />
              התפריט נפתח
            </h3>
            <p style={P}>
              קוד QR אישי. תוך 0.8 שניות נפתח תפריט ישירות בדפדפן — ללא אפליקציה,
              ללא הורדה.
            </p>
            <div
              style={{
                ...MOCKUP,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: "hsl(38,30%,97%)",
                  borderRadius: 8,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 3,
                  padding: 7,
                  flexShrink: 0,
                }}
              >
                <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
                <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
                <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
                <div style={{ background: "hsl(28,62%,42%)", borderRadius: 2 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".8rem",
                    fontWeight: 600,
                    color: "hsl(24,18%,16%)",
                  }}
                >
                  תפריט נפתח
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".7rem",
                    color: "hsl(28,8%,50%)",
                  }}
                >
                  0.8s · ללא הורדה
                </div>
              </div>
              <div
                style={{
                  background: "hsl(140,60%,45%,.15)",
                  border: "1px solid hsl(140,60%,45%,.3)",
                  borderRadius: 6,
                  padding: "3px 8px",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".7rem",
                  color: "hsl(140,60%,60%)",
                  flexShrink: 0,
                }}
              >
                ✓ פעיל
              </div>
            </div>
          </div>

          {/* Card 2 — 3D AR */}
          <div className="reveal" data-delay="120" style={CARD_BASE}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg,hsl(36,80%,58%),hsl(28,62%,42%))",
              }}
            />
            <div style={NUMBER_BG}>02</div>
            <div
              style={{
                ...ICON_WRAP_BASE,
                background:
                  "linear-gradient(135deg,hsl(36,80%,55%,.15),hsl(28,62%,42%,.1))",
                border: "1px solid hsl(36,80%,55%,.25)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(36,80%,62%)"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" x2="12" y1="22.08" y2="12" />
              </svg>
            </div>
            <div style={{ ...EYEBROW_BASE, color: "hsl(36,80%,62%)" }}>
              AR תלת-מימד
            </div>
            <h3 style={H3}>
              המנה על
              <br />
              השולחן, ב-AR
            </h3>
            <p style={P}>
              iPhone ו-Android מציגים את המנה במציאות רבודה. כל מנה — לפני
              ההזמנה.
            </p>
            <div style={{ ...MOCKUP, textAlign: "center" as const }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "hsl(36,80%,55%,.1)",
                  border: "1px solid hsl(36,80%,55%,.2)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  marginBottom: 10,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(36,80%,62%)"
                  strokeWidth="2"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".8rem",
                    color: "hsl(28,62%,42%)",
                    fontWeight: 600,
                  }}
                >
                  360° AR Mode
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".75rem",
                    color: "hsl(28,8%,50%)",
                  }}
                >
                  iPhone ✓
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".75rem",
                    color: "hsl(28,8%,50%)",
                  }}
                >
                  Android ✓
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 — Analytics */}
          <div className="reveal" data-delay="240" style={CARD_BASE}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg,hsl(140,60%,45%),hsl(28,62%,42%))",
              }}
            />
            <div style={NUMBER_BG}>03</div>
            <div
              style={{
                ...ICON_WRAP_BASE,
                background:
                  "linear-gradient(135deg,hsl(140,60%,45%,.15),hsl(28,62%,42%,.1))",
                border: "1px solid hsl(140,60%,45%,.25)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(140,60%,55%)"
                strokeWidth="2"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div style={{ ...EYEBROW_BASE, color: "hsl(140,60%,55%)" }}>
              אנליטיקה
            </div>
            <h3 style={H3}>
              +30% הזמנות
              <br />
              נמדדו
            </h3>
            <p style={P}>
              שולחנות שסורקים ממירים ×3.4 יותר. אנליטיקה בזמן אמת: צפיות, המרות,
              מנות פופולריות.
            </p>
            <div style={MOCKUP}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 5,
                  height: 48,
                  marginBottom: 8,
                }}
              >
                {[30, 50, 40, 65, 55, 80, 100].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background:
                        i === 6
                          ? "hsl(28,62%,42%)"
                          : `hsl(28,62%,42%,${0.15 + i * 0.11})`,
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".72rem",
                  color: "hsl(28,8%,45%)",
                  textAlign: "center" as const,
                }}
              >
                הזמנות — 7 ימים אחרונים ↑
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
