"use client";

import { useEffect, useRef, useState } from "react";
import { useEditMode } from "./EditModeProvider";
import { Loader2, Pencil } from "lucide-react";

type Props = {
  contentKey: string;
  defaultValue: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  multiline?: boolean;
  className?: string;
};

export function EditableText({
  contentKey,
  defaultValue,
  as: Tag = "span",
  multiline = false,
  className = "",
}: Props) {
  const { isAdmin, isEditMode, getContent, setContent, saving } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  const current = getContent(contentKey, defaultValue);
  const isSaving = saving.has(contentKey);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select?.();
    }
  }, [editing]);

  const startEdit = () => {
    if (!isAdmin || !isEditMode) return;
    setDraft(current);
    setEditing(true);
  };

  const commit = async () => {
    setEditing(false);
    const trimmed = draft;
    if (trimmed === current) return;
    await setContent(contentKey, trimmed, "text");
  };

  const cancel = () => {
    setEditing(false);
    setDraft("");
  };

  // Not admin or not in edit mode -> render plain
  if (!isAdmin || !isEditMode) {
    return <Tag className={className}>{current}</Tag>;
  }

  if (editing) {
    const sharedClass =
      "w-full bg-yellow-50 border-2 border-[hsl(var(--gold))] rounded px-2 py-1 outline-none";
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              cancel();
            } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              commit();
            }
          }}
          rows={Math.max(2, draft.split("\n").length)}
          className={`${sharedClass} ${className}`}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            cancel();
          } else if (e.key === "Enter") {
            e.preventDefault();
            commit();
          }
        }}
        className={`${sharedClass} ${className}`}
      />
    );
  }

  return (
    <Tag
      onClick={startEdit}
      className={`${className} relative cursor-pointer outline outline-2 outline-dashed outline-[hsl(var(--gold))]/50 hover:outline-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 rounded transition-colors`}
      title="לחץ לעריכה"
    >
      {current}
      {isSaving && (
        <span className="absolute -top-2 -end-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[hsl(var(--gold))] text-white">
          <Loader2 className="h-3 w-3 animate-spin" />
        </span>
      )}
      {!isSaving && (
        <span className="absolute -top-2 -end-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[hsl(var(--gold))] text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Pencil className="h-2.5 w-2.5" />
        </span>
      )}
    </Tag>
  );
}
