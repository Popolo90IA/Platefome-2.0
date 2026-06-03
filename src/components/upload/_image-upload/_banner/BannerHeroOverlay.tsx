"use client";

/* ── BannerHeroOverlay — logo + name + tagline, mimics real menu hero ── */
export function BannerHeroOverlay({
  logoUrl,
  restaurantName,
}: {
  logoUrl?: string | null;
  restaurantName?: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 text-center gap-2.5 px-4">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="logo"
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid hsl(28,62%,52%,.5)",
            boxShadow: "0 0 0 3px hsl(28,62%,52%,.15)",
          }}
        />
      ) : (
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "var(--grad-bronze)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid hsl(28,62%,52%,.4)",
          }}
        >
          <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
            {restaurantName?.charAt(0) ?? "?"}
          </span>
        </div>
      )}
      <div>
        <div
          style={{
            color: "hsl(36,30%,82%)",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: ".01em",
          }}
        >
          {restaurantName || "שם המסעדה"}
        </div>
        <div
          style={{
            color: "hsl(28,62%,52%)",
            fontSize: 10,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            marginTop: 2,
          }}
        >
          EVERY DISH · IN 360°
        </div>
      </div>
    </div>
  );
}
