import {
  LayoutDashboard,
  Utensils,
  FolderTree,
  QrCode,
  Settings,
  BarChart3,
  Palette,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  labelEn: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "בית", labelEn: "Home", icon: LayoutDashboard },
  { href: "/dashboard/dishes", label: "מנות", labelEn: "Dishes", icon: Utensils },
  { href: "/dashboard/categories", label: "קטגוריות", labelEn: "Categories", icon: FolderTree },
  { href: "/dashboard/analytics", label: "סטטיסטיקות", labelEn: "Analytics", icon: BarChart3 },
  { href: "/dashboard/qrcode", label: "QR קוד", labelEn: "QR Code", icon: QrCode },
  { href: "/dashboard/design", label: "עיצוב", labelEn: "Design", icon: Palette },
  { href: "/dashboard/settings", label: "הגדרות", labelEn: "Settings", icon: Settings },
];
