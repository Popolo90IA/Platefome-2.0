"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";

interface CollapsibleSectionProps {
  open: boolean;
  onToggle: () => void;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  children: ReactNode;
}

export function CollapsibleSection({
  open,
  onToggle,
  title,
  subtitle,
  icon,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 bg-secondary/30 hover:bg-secondary/60 transition-colors text-start"
      >
        <span className="h-8 w-8 rounded-lg bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold-dark))] flex items-center justify-center flex-shrink-0">
          {icon}
        </span>
        <span className="flex-1 min-w-0">
          <div className="font-medium text-sm">{title}</div>
          {subtitle && (
            <div className="text-xs text-muted-foreground truncate">
              {subtitle}
            </div>
          )}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="p-4 bg-card">{children}</div>}
    </div>
  );
}
