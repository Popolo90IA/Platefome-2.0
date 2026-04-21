-- ============================================================
-- Migration 005: Étendre le bucket restaurant-images
-- - Augmente la taille max à 50MB (pour vidéos + modèles 3D)
-- - Autorise images + vidéos + modèles .glb/.gltf
-- ============================================================

UPDATE storage.buckets
SET
  public = true,
  file_size_limit = 52428800, -- 50 MB
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'model/gltf-binary',
    'model/gltf+json',
    'application/octet-stream'
  ]
WHERE id = 'restaurant-images';

-- Vérification (optionnel, à lancer séparément)
-- SELECT id, public, file_size_limit, allowed_mime_types
-- FROM storage.buckets WHERE id = 'restaurant-images';
