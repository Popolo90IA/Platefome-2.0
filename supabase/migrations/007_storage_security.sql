-- ============================================================
-- Migration 007: Durcissement RLS storage + restriction MIME
-- ----------------------------------------------------------------
-- Corrige les policies trop laxistes de 003_storage.sql :
--   - UPDATE/DELETE: seul le propriétaire (owner = auth.uid()) peut modifier
--   - Retire 'application/octet-stream' du bucket (catch-all dangereux)
--   - Conserve INSERT pour authenticated (le owner est posé automatiquement)
-- ============================================================

-- 1) Resserrer les MIME autorisés (retire octet-stream)
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'model/gltf-binary',
  'model/gltf+json'
]
WHERE id = 'restaurant-images';

-- 2) UPDATE: réservé au propriétaire
DROP POLICY IF EXISTS "Users can update their images" ON storage.objects;
CREATE POLICY "Users can update their own images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'restaurant-images'
    AND owner = auth.uid()
  )
  WITH CHECK (
    bucket_id = 'restaurant-images'
    AND owner = auth.uid()
  );

-- 3) DELETE: réservé au propriétaire
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
CREATE POLICY "Users can delete their own images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'restaurant-images'
    AND owner = auth.uid()
  );

-- 4) INSERT: l'authenticated peut uploader (Supabase pose owner = auth.uid())
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'restaurant-images');

-- 5) Override admin: super_admin garde le contrôle total (cleanup, modération)
DROP POLICY IF EXISTS "Super admin full access to images" ON storage.objects;
CREATE POLICY "Super admin full access to images"
  ON storage.objects FOR ALL
  TO authenticated
  USING (
    bucket_id = 'restaurant-images'
    AND public.is_super_admin()
  )
  WITH CHECK (
    bucket_id = 'restaurant-images'
    AND public.is_super_admin()
  );

-- ============================================================
-- 6) menu_events: valider l'existence du restaurant_id à l'insert
--    (évite le spam avec des UUID inexistants)
-- ============================================================
DROP POLICY IF EXISTS "anyone can insert menu events" ON public.menu_events;
CREATE POLICY "anyone can insert menu events"
  ON public.menu_events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.restaurants r
      WHERE r.id = restaurant_id
        AND r.is_active = true
    )
  );

-- ============================================================
-- 7) site_content: si type='html' est conservé, restreindre aux super_admin
--    (XSS stocké potentiel — à sanitize aussi côté rendu)
-- ============================================================
-- (Optionnel: décommente pour bloquer 'html' complètement)
-- ALTER TABLE public.site_content
--   ADD CONSTRAINT site_content_no_html
--   CHECK (type <> 'html');
