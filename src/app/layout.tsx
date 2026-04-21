import type { Metadata } from "next";
import "./globals.css";
import { EditModeProvider } from "@/components/editable/EditModeProvider";
import { FloatingEditToggle } from "@/components/editable/FloatingEditToggle";

export const metadata: Metadata = {
  title: "פלטפורמת מסעדות | Plateforme Restaurant",
  description: "תפריטים דיגיטליים למסעדות עם QR קוד",
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
