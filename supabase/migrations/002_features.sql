-- ============================================================
-- Migration 002: Features avancées (analytics, disponibilité, badges, 3D/AR, vidéos, multi-langue)
-- ============================================================

-- 1. Ajout de colonnes aux plats: disponibilité, badges, vidéo, multi-langue
ALTER TABLE public.dishes
  ADD COLUMN IF NOT EXISTS is_available boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_new boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_signature boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS name_en text,
  ADD COLUMN IF NOT EXISTS name_fr text,
  ADD COLUMN IF NOT EXISTS description_en text,
  ADD COLUMN IF NOT EXISTS description_fr text;

-- 2. Ajout de colonnes aux categories pour multi-langue
ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS name_en text,
  ADD COLUMN IF NOT EXISTS name_fr text;

-- 3. Ajout settings au restaurant (langues disponibles, devise)
ALTER TABLE public.restaurants
  ADD COLUMN IF NOT EXISTS languages text[] NOT NULL DEFAULT ARRAY['he']::text[],
  ADD COLUMN IF NOT EXISTS default_language text NOT NULL DEFAULT 'he',
  ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'ILS',
  ADD COLUMN IF NOT EXISTS description_en text,
  ADD COLUMN IF NOT EXISTS description_fr text;

-- 4. Table d'analytics — scans QR + vues menu + vues de plats
CREATE TABLE IF NOT EXISTS public.menu_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('qr_scan','menu_view','dish_view','ar_view','video_play')),
  dish_id uuid REFERENCES public.dishes(id) ON DELETE SET NULL,
  user_agent text,
  referrer text,
  language text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS menu_events_restaurant_idx ON public.menu_events(restaurant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS menu_events_type_idx ON public.menu_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS menu_events_dish_idx ON public.menu_events(dish_id) WHERE dish_id IS NOT NULL;

-- 5. RLS pour menu_events
ALTER TABLE public.menu_events ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut insérer (les clients tracking depuis le menu public)
DROP POLICY IF EXISTS "anyone can insert menu events" ON public.menu_events;
CREATE POLICY "anyone can insert menu events"
  ON public.menu_events FOR INSERT
  WITH CHECK (true);

-- Seul le owner du restaurant peut lire ses événements
DROP POLICY IF EXISTS "owners can read their menu events" ON public.menu_events;
CREATE POLICY "owners can read their menu events"
  ON public.menu_events FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM public.restaurants WHERE user_id = auth.uid()
    )
  );

-- 6. Storage policies pour les modèles 3D et vidéos (dans le bucket existant)
-- Pas de changement, le bucket restaurant-images accepte déjà tout format si policies sont ouvertes.

-- 7. Vue agrégée pour analytics rapides
CREATE OR REPLACE VIEW public.restaurant_stats AS
SELECT
  r.id AS restaurant_id,
  r.name,
  COUNT(*) FILTER (WHERE me.event_type = 'qr_scan') AS qr_scans,
  COUNT(*) FILTER (WHERE me.event_type = 'menu_view') AS menu_views,
  COUNT(*) FILTER (WHERE me.event_type = 'dish_view') AS dish_views,
  COUNT(*) FILTER (WHERE me.event_type = 'ar_view') AS ar_views,
  COUNT(*) FILTER (WHERE me.event_type = 'video_play') AS video_plays,
  COUNT(*) FILTER (WHERE me.event_type = 'menu_view' AND me.created_at > now() - interval '7 days') AS views_last_7d,
  COUNT(*) FILTER (WHERE me.event_type = 'menu_view' AND me.created_at > now() - interval '30 days') AS views_last_30d
FROM public.restaurants r
LEFT JOIN public.menu_events me ON me.restaurant_id = r.id
GROUP BY r.id, r.name;

GRANT SELECT ON public.restaurant_stats TO authenticated;
