"use client";

import { HOME_STATS } from "../_lib/constants";

/**
 * StatsSection — section "מספרים שמדברים" (4 chiffres clés).
 */
export function StatsSection() {
  return (
    <section
      style={{
        padding: "96px 0",
        background: "hsl(30,20%,87%)",
        borderTop: "1px solid hsl(30,18%,80%)",
        borderBottom: "1px solid hsl(30,18%,80%)",
        position: "relative",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 900,
          height: 400,
          background:
            "radial-gradient(ellipse,hsl(28,62%,42%,.06) 0%,transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="page-section-inner"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 56px",
          direction: "rtl",
        }}
      >
        {/* Eyebrow + Titre */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{ width: 32, height: 1, background: "hsl(28,62%,42%,.35)" }}
            />
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".6875rem",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "hsl(28,62%,42%)",
                fontWeight: 500,
              }}
            >
              מספרים שמדברים
            </span>
            <div
              style={{ width: 32, height: 1, background: "hsl(28,62%,42%,.35)" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2rem,4vw,2.75rem)",
              fontWeight: 600,
              color: "hsl(24,18%,16%)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            המסעדות שבחרו{" "}
            <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>
              PLATFORME
            </em>{" "}
            מרוויחות יותר
          </h2>
        </div>

        {/* Grille stats */}
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 1,
            background: "hsl(30,18%,88%)",
          }}
        >
          {HOME_STATS.map((s, i) => (
            <div
              key={s.label}
              className="reveal"
              data-delay={String(i * 80)}
              style={{
                background: "hsl(38,28%,94%)",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                position: "relative",
                overflow: "hidden",
                transition: "background .2s",
                cursor: "default",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "hsl(36,22%,90%)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "hsl(38,28%,94%)")
              }
            >
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
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "3.75rem",
                  fontWeight: 800,
                  color: "hsl(24,18%,16%)",
                  lineHeight: 1,
                  letterSpacing: "-.04em",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "hsl(24,18%,16%)",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".8125rem",
                  color: "hsl(24,12%,38%)",
                  lineHeight: 1.55,
                  flexGrow: 1,
                }}
              >
                {s.sub}
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: "1px solid hsl(30,18%,88%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(28,62%,42%)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".75rem",
                    color: "hsl(28,62%,42%)",
                  }}
                >
                  {s.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
