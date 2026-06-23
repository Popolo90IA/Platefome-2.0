"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

/* ── SearchBar — email / restaurant name filter ── */
export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="חפש לפי אימייל או שם מסעדה..."
        className="h-12 pr-11 text-[15px]"
      />
    </div>
  );
}
