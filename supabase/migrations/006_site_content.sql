-- ============================================================
-- Migration 006: Contenu éditable du site (textes + images)
-- Seul le super_admin peut éditer. Tout le monde peut lire.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.site_content (
  key           text PRIMARY KEY,         -- ex: "landing.hero.title"
  value         text,                     -- le contenu (texte ou URL image)
  type          text NOT NULL DEFAULT 'text', -- 'text' | 'image' | 'html'
  updated_by    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS site_content_type_idx ON public.site_content(type);

-- RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Lecture publique (anon + authenticated) pour que les visiteurs voient le contenu
DROP POLICY IF EXISTS "site_content public read" ON public.site_content;
CREATE POLICY "site_content public read"
  ON public.site_content FOR SELECT
  TO anon, authenticated
  USING (true);

-- Écriture : super_admin uniquement
DROP POLICY IF EXISTS "site_content super_admin write" ON public.site_content;
CREATE POLICY "site_content super_admin write"
  ON public.site_content FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- RPC: upsert d'une clé (vérifie super_admin + met à jour updated_by/at)
CREATE OR REPLACE FUNCTION public.set_site_content(
  p_key text,
  p_value text,
  p_type text DEFAULT 'text'
)
RETURNS void AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Only super_admin can edit site content';
  END IF;

  IF p_type NOT IN ('text', 'image', 'html') THEN
    RAISE EXCEPTION 'Invalid content type: %', p_type;
  END IF;

  INSERT INTO public.site_content (key, value, type, updated_by, updated_at)
  VALUES (p_key, p_value, p_type, auth.uid(), now())
  ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value,
        type = EXCLUDED.type,
        updated_by = auth.uid(),
        updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.set_site_content(text, text, text) TO authenticated;

-- RPC: bulk read (pour preload d'un namespace)
CREATE OR REPLACE FUNCTION public.get_site_content_by_prefix(p_prefix text)
RETURNS TABLE (key text, value text, type text) AS $$
  SELECT key, value, type FROM public.site_content
  WHERE key LIKE p_prefix || '%';
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION public.get_site_content_by_prefix(text) TO anon, authenticated;
