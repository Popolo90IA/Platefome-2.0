import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Header } from "@/components/dashboard/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex"
      style={{ background: "hsl(var(--void))" }}
      dir="rtl"
    >
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-10 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
