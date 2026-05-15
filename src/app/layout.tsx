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

export const metadata: Metadata = {
  title: "PLATFORME | תפריט דיגיטלי למסעדות",
  description: "תפריטים דיגיטליים למסעדות עם QR קוד",
  icons: {
    icon: [
      { url: "/brand/logo-mark.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon-32.png",
  },
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
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} ${notoSerifHebrew.variable} ${heebo.variable}`}
    >
      <body className="antialiased">
        <EditModeProvider>
          {children}
        </EditModeProvider>
      </body>
    </html>
  );
}
