-- ============================================================
-- Migration 004: Photos 360° pour les mnot
-- Array d'URLs photos prises autour d'une mnot pour créer une rotation
-- ============================================================

ALTER TABLE public.dishes
  ADD COLUMN IF NOT EXISTS photos_360 text[] DEFAULT NULL;

COMMENT ON COLUMN public.dishes.photos_360 IS 'Array of image URLs taken around the dish for 360° rotation viewer';
