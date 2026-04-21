"use client";

import { useEditMode } from "./EditModeProvider";
import { Pencil, Check, X } from "lucide-react";

export function FloatingEditToggle() {
  const { isAdmin, isEditMode, toggleEditMode } = useEditMode();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 end-6 z-[9999] flex items-center gap-2">
      {isEditMode && (
        <div className="bg-[hsl(var(--gold))] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-gold-glow animate-pulse">
          מצב עריכה פעיל · לחץ על טקסט או תמונה
        </div>
      )}
      <button
        onClick={toggleEditMode}
        className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${
          isEditMode
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gold-gradient hover:scale-105 text-white shadow-gold-glow"
        }`}
        title={isEditMode ? "סגור עריכה" : "מצב עריכה (Admin)"}
      >
        {isEditMode ? (
          <X className="h-6 w-6" />
        ) : (
          <Pencil className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
