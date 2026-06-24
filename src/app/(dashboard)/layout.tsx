"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ThemeScript targetSelector="#dashboard-root" defaultTheme="dark" />
      <ThemeProvider targetSelector="#dashboard-root" defaultTheme="dark">
        <div
          id="dashboard-root"
          className="dash-layout min-h-screen flex"
          style={{ background: "hsl(var(--void))" }}
        >
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="dash-main-area flex-1 flex flex-col min-w-0 min-h-screen">
            <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
            <main className="flex-1 overflow-y-auto">
              <div className="dash-content px-8 py-10 max-w-5xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
