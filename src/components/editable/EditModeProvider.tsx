"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";

type ContentType = "text" | "image" | "html";

type SiteContentRow = {
  key: string;
  value: string | null;
  type: ContentType;
};

type EditModeCtx = {
  isAdmin: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  content: Map<string, string>;
  getContent: (key: string, fallback: string) => string;
  setContent: (key: string, value: string, type?: ContentType) => Promise<void>;
  saving: Set<string>;
};

const Ctx = createContext<EditModeCtx | null>(null);

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContentMap] = useState<Map<string, string>>(new Map());
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const supabase = useMemo(() => createClient(), []);

  // Check super_admin + load all content on mount
  useEffect(() => {
    const init = async () => {
      const [{ data: userRes }, { data: rows }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("site_content").select("key, value, type"),
      ]);

      if (userRes?.user) {
        const { data: role } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userRes.user.id)
          .maybeSingle();
        setIsAdmin(role?.role === "super_admin");
      }

      if (rows) {
        const m = new Map<string, string>();
        (rows as SiteContentRow[]).forEach((r) => {
          if (r.value !== null) m.set(r.key, r.value);
        });
        setContentMap(m);
      }
    };
    init();
  }, [supabase]);

  const getContent = useCallback(
    (key: string, fallback: string) => content.get(key) ?? fallback,
    [content]
  );

  const setContent = useCallback(
    async (key: string, value: string, type: ContentType = "text") => {
      setSaving((s) => new Set(s).add(key));
      // Optimistic
      setContentMap((prev) => {
        const next = new Map(prev);
        next.set(key, value);
        return next;
      });

      const { error } = await supabase.rpc("set_site_content", {
        p_key: key,
        p_value: value,
        p_type: type,
      });

      setSaving((s) => {
        const next = new Set(s);
        next.delete(key);
        return next;
      });

      if (error) {
        console.error("Failed to save content:", error.message);
        // Could revert here, but leave optimistic for UX
      }
    },
    [supabase]
  );

  const toggleEditMode = useCallback(() => {
    if (!isAdmin) return;
    setIsEditMode((v) => !v);
  }, [isAdmin]);

  const value = useMemo<EditModeCtx>(
    () => ({
      isAdmin,
      isEditMode,
      toggleEditMode,
      content,
      getContent,
      setContent,
      saving,
    }),
    [isAdmin, isEditMode, toggleEditMode, content, getContent, setContent, saving]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEditMode() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe fallback if Provider missing: nothing editable
    return {
      isAdmin: false,
      isEditMode: false,
      toggleEditMode: () => {},
      content: new Map<string, string>(),
      getContent: (_k: string, fb: string) => fb,
      setContent: async () => {},
      saving: new Set<string>(),
    } as EditModeCtx;
  }
  return ctx;
}
