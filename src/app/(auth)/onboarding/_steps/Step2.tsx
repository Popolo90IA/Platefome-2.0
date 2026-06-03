"use client";

import { S } from "../_lib/constants";

/* ── Step 2: First dish / file upload ───────────────── */
export function Step2() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 36,
        marginTop: 0,
        alignItems: "stretch",
      }}
    >
      {/* Upload card */}
      <div
        style={{
          background: "hsl(var(--deep))",
          border: `1px solid ${S.line}`,
          borderRadius: 18,
          padding: 40,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Upload zone */}
        <div
          style={{
            flex: 1,
            border: `2px dashed hsl(28,62%,42%,.4)`,
            borderRadius: 14,
            background: "linear-gradient(160deg, hsl(28,62%,42%,.05), transparent)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "40px 30px",
            textAlign: "center",
            minHeight: 280,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 99,
              background: "hsl(28,62%,42%,.12)",
              display: "grid",
              placeItems: "center",
              color: S.accent,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div
            className="font-display"
            style={{ fontSize: 26, fontWeight: 500, color: S.fog, letterSpacing: "-.01em" }}
          >
            גרור קובץ <em style={{ fontStyle: "italic", color: S.accent }}>3D</em> או תמונות
          </div>
          <p
            className="font-sans"
            style={{ fontSize: 14, color: S.subtle, maxWidth: 380, lineHeight: 1.55, margin: 0 }}
          >
            המרה אוטומטית של .glb / .usdz / .obj. או 12 תמונות JPG מזוויות שונות וה-AI שלנו יבנה את המודל.
          </p>
          <span
            className="font-mono"
            style={{
              fontSize: 10,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: S.dim,
              marginTop: 6,
            }}
          >
            .GLB · .USDZ · .OBJ · JPG · MAX 80MB
          </span>

          {/* Hidden file input trigger */}
          <label style={{ cursor: "pointer", marginTop: 4 }}>
            <span
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                fontSize: 13.5,
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              בחר קובץ
            </span>
            <input type="file" accept=".glb,.usdz,.obj,.jpg,.jpeg,.png" style={{ display: "none" }} />
          </label>
        </div>

        {/* Alt: phone scan */}
        <div
          style={{
            marginTop: 18,
            padding: 18,
            background: S.abyss,
            borderRadius: 12,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: S.accent,
              color: "white",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
              <circle cx="12" cy="14" r="3" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="font-sans" style={{ fontSize: 14, fontWeight: 600, color: S.fog }}>
              סרוק מהפלאפון תוך כדי
            </div>
            <div
              className="font-sans"
              style={{ fontSize: 12.5, color: S.subtle, marginTop: 3, lineHeight: 1.5 }}
            >
              קוד QR יישלח לטלפון שלך. צלם 12 תמונות בהנחייה חיה.
            </div>
          </div>
          <span style={{ color: S.dim, fontSize: 18 }}>←</span>
        </div>
      </div>

      {/* Preview card */}
      <div
        style={{
          background:
            "linear-gradient(170deg, hsl(28,55%,28%) 0%, hsl(28,30%,15%) 50%, hsl(28,15%,8%) 100%)",
          borderRadius: 18,
          padding: "40px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          position: "relative",
          overflow: "hidden",
          minHeight: 460,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 100%, hsl(28,62%,55%,.15), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "hsl(28,62%,65%)",
            position: "relative",
          }}
        >
          איך זה יראה ללקוח
        </div>

        {/* Demo phone */}
        <div
          style={{
            width: 220,
            height: 360,
            background: "#1a1614",
            borderRadius: 28,
            padding: 8,
            boxShadow: "0 30px 80px -20px rgba(0,0,0,.6)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(180deg, hsl(28,12%,18%), hsl(28,12%,10%))",
              borderRadius: 22,
              padding: "18px 14px",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Mini plate */}
            <div
              style={{
                width: 130,
                height: 130,
                margin: "22px auto 14px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 50% 30%, hsl(28,5%,90%), hsl(28,8%,70%))",
                position: "relative",
                boxShadow: "0 18px 30px -10px rgba(0,0,0,.5)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  right: 18,
                  bottom: 18,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 50% 30%, hsl(38,55%,68%), hsl(32,40%,48%))",
                }}
              />
            </div>
            {/* Orbit */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, calc(-50% - 28px)) scaleY(.3)",
                width: 170,
                height: 170,
                border: "1px dashed hsl(28,62%,55%,.5)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div
              className="font-display"
              style={{ fontSize: 18, fontWeight: 600, color: "hsl(36,40%,92%)", textAlign: "center" }}
            >
              חומוס <em style={{ fontStyle: "italic", color: "hsl(28,62%,65%)" }}>מסבחה</em>
            </div>
            <div
              className="font-mono"
              style={{ color: "hsl(28,62%,65%)", textAlign: "center", marginTop: 4, fontSize: 13 }}
            >
              ₪38
            </div>
            <div
              className="font-sans"
              style={{
                margin: "18px 6px 0",
                padding: 10,
                background: "linear-gradient(135deg, hsl(28,62%,42%), hsl(22,70%,50%))",
                borderRadius: 10,
                textAlign: "center",
                fontSize: 11.5,
                fontWeight: 600,
                color: "white",
              }}
            >
              הוסף להזמנה
            </div>
          </div>
        </div>

        <p
          className="font-sans"
          style={{
            fontSize: 12,
            color: "hsl(28,30%,75%)",
            textAlign: "center",
            maxWidth: 220,
            lineHeight: 1.5,
            position: "relative",
            margin: 0,
          }}
        >
          תצוגה מקדימה תתעדכן ברגע שהקובץ מועלה — בלי המתנה.
        </p>
      </div>
    </div>
  );
}
