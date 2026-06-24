import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  DM_Mono,
  Noto_Serif_Hebrew,
  Heebo,
} from "next/font/google";
import "./globals.css";
import { EditModeProvider } from "@/components/editable/EditModeProvider";
import { ToastProvider } from "@/components/ui/toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

const notoSerifHebrew = Noto_Serif_Hebrew({
  subsets: ["hebrew"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-hebrew",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-heebo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plateform.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PLATFORME · תפריט דיגיטלי למסעדות",
    template: "%s · PLATFORME",
  },
  description:
    "תפריטים דיגיטליים בתלת מימד למסעדות — כל מנה ב-360°. Menus 3D pour restaurants, scannables via QR.",
  keywords: ["menu digital", "QR menu", "3D menu", "restaurant", "תפריט דיגיטלי", "menu 360"],
  applicationName: "PLATFORME",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/brand/logo-mark.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    type: "website",
    siteName: "PLATFORME",
    title: "PLATFORME · כל מנה בתלת מימד",
    description: "Every dish, in 360°. Menus immersifs pour restaurants.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PLATFORME" }],
    locale: "he_IL",
    alternateLocale: ["en_US", "fr_FR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PLATFORME · Every dish, in 360°",
    description: "Menus digitaux 3D pour restaurants.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5ede0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} ${notoSerifHebrew.variable} ${heebo.variable}`}
    >
      <body className="antialiased">
        {/* No-flash : applique le thème de la home sur <html> avant le paint
            (uniquement sur la route '/'), pour éviter le flash dark→clair. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(location.pathname==='/'){var t=localStorage.getItem('plateform-theme')||'dark';document.documentElement.classList.toggle('dark',t!=='light');}}catch(e){}`,
          }}
        />
        <ToastProvider>
          <EditModeProvider>
            {children}
          </EditModeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
