"use client";

import { HOME_STATS } from "../_lib/constants";
import { StatsHeading } from "./_stats/StatsHeading";
import { StatCard } from "./_stats/StatCard";

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
          background: "radial-gradient(ellipse,hsl(28,62%,42%,.06) 0%,transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="page-section-inner"
        style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}
      >
        <StatsHeading />

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
            <StatCard key={s.label} s={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
