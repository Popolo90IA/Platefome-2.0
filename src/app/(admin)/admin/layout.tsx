"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Header } from "@/components/dashboard/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="dash-layout min-h-screen flex"
      style={{ background: "hsl(var(--void))" }}
      dir="rtl"
    >
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dash-main-area flex-1 flex flex-col min-w-0 min-h-screen">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto">
          <div className="dash-content px-8 py-10 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
