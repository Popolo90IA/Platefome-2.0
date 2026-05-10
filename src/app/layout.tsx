import type { Metadata } from "next";
import "./globals.css";
import { EditModeProvider } from "@/components/editable/EditModeProvider";
import { FloatingEditToggle } from "@/components/editable/FloatingEditToggle";

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
    <html lang="he" dir="rtl">
      <body className="antialiased">
        <EditModeProvider>
          {children}
          <FloatingEditToggle />
        </EditModeProvider>
      </body>
    </html>
  );
}
