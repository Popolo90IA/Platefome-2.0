"use client";

/* ── PreviewCard — client-side demo phone with mock 3D dish ── */
export function PreviewCard() {
  return (
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
  );
}
