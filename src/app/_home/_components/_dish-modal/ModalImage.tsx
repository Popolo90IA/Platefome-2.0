import type { GalleryDish } from "../../_lib/types";

/* ── ModalImage — cover photo + badge chip + close button ── */
export function ModalImage({
  dish,
  onClose,
}: {
  dish: GalleryDish;
  onClose: () => void;
}) {
  return (
    <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dish.img}
        alt={dish.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,hsl(36,22%,90%) 0%,transparent 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "6px 14px",
          background: "hsl(38,28%,94%,.82)",
          backdropFilter: "blur(8px)",
          border: "1px solid hsl(30,18%,82%,.2)",
          borderRadius: 99,
          fontFamily: "'DM Mono',monospace",
          fontSize: ".625rem",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: dish.badgeColor,
        }}
      >
        {dish.badge}
      </div>

      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "hsl(38,28%,94%,.72)",
          border: "1px solid hsl(30,18%,82%,.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "hsl(var(--pale))",
          transition: "background .2s",
        }}
        onMouseOver={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "hsl(38,30%,97%)")
        }
        onMouseOut={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "hsl(38,28%,94%,.72)")
        }
        aria-label="סגור"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
