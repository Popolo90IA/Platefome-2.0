import { createClient } from "@/lib/supabase/client";
import type { MenuEventType } from "@/types/database.types";

/**
 * Track un événement côté client (fire & forget).
 * Utilise RLS: anyone peut insérer, seul l'owner peut lire.
 */
export async function trackEvent(
  restaurantId: string,
  eventType: MenuEventType,
  opts?: { dishId?: string | null; language?: string | null }
) {
  try {
    const supabase = createClient();
    await supabase.from("menu_events").insert({
      restaurant_id: restaurantId,
      event_type: eventType,
      dish_id: opts?.dishId ?? null,
      language: opts?.language ?? null,
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      referrer:
        typeof document !== "undefined" ? document.referrer.slice(0, 500) : null,
    });
  } catch (err) {
    // fire & forget
    console.warn("analytics track failed", err);
  }
}
