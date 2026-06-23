"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

/**
 * SearchBar — input recherche restaurant.
 */
export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="חפש לפי שם, slug או אימייל..."
        className="h-12 pr-11 text-[15px]"
      />
    </div>
  );
}
