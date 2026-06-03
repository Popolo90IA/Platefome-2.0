"use client";

import { FooterBottomBar } from "./footer/FooterBottomBar";
import { FooterBrandCol } from "./footer/FooterBrandCol";
import { FooterCTA } from "./footer/FooterCTA";
import { FooterLinkColumns } from "./footer/FooterLinkColumns";

/**
 * SiteFooter — footer dark complet (CTA band + colonnes liens + bottom bar).
 */
export function SiteFooter() {
  return (
    <footer style={{ background: "hsl(28,22%,14%)" }}>
      <FooterCTA />

      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "64px 24px 0",
          direction: "rtl",
        }}
      >
        <div
          className="footer-links"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 56,
          }}
        >
          <FooterBrandCol />
          <FooterLinkColumns />
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}
