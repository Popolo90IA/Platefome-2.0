import type { SupabaseClient } from "@supabase/supabase-js";
import type { Restaurant } from "@/types/database.types";
import type { DesignForm } from "../types";
import { DEFAULT_FORM } from "../constants";

type SB = SupabaseClient;

/* ── Map a restaurant row → editable design form (with defaults) ── */
export function restaurantToForm(data: Restaurant): DesignForm {
  return {
    theme_primary: data.theme_primary ?? DEFAULT_FORM.theme_primary,
    theme_dark_mode: data.theme_dark_mode ?? DEFAULT_FORM.theme_dark_mode,
    theme_font_pack: data.theme_font_pack ?? DEFAULT_FORM.theme_font_pack,
    menu_layout: data.menu_layout ?? DEFAULT_FORM.menu_layout,
    menu_hero_style: data.menu_hero_style ?? DEFAULT_FORM.menu_hero_style,
    menu_category_style:
      data.menu_category_style ?? DEFAULT_FORM.menu_category_style,
    logo_url: data.logo_url,
    banner_url: data.banner_url,
    name: data.name ?? "",
    description: data.description ?? "",
  };
}

/* ── Subset of form propagated to the live preview iframe ── */
export function buildPreviewPatch(f: DesignForm) {
  return {
    theme_primary: f.theme_primary,
    theme_dark_mode: f.theme_dark_mode,
    theme_font_pack: f.theme_font_pack,
    menu_layout: f.menu_layout,
    menu_hero_style: f.menu_hero_style,
    menu_category_style: f.menu_category_style,
  };
}

/* ── Load the current user's restaurant ── */
export async function loadRestaurant(supabase: SB): Promise<Restaurant | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  return data ?? null;
}

/* ── Persist design fields ── */
export async function saveDesign(
  supabase: SB,
  restaurantId: string,
  form: DesignForm,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("restaurants")
    .update({
      theme_primary: form.theme_primary,
      theme_dark_mode: form.theme_dark_mode,
      theme_font_pack: form.theme_font_pack,
      menu_layout: form.menu_layout,
      menu_hero_style: form.menu_hero_style,
      menu_category_style: form.menu_category_style,
      logo_url: form.logo_url,
      banner_url: form.banner_url,
    })
    .eq("id", restaurantId);
  return { error: error?.message ?? null };
}
