# Migrations Supabase — Plateform

## ⚠️ Numérotation : collisions volontaires

Deux paires de migrations partagent le même préfixe numérique. Supabase trie **alphabétiquement** par nom de fichier, donc l'ordre réel d'exécution est :

| Ordre | Fichier | Contenu |
|---|---|---|
| 1 | `001_initial_schema.sql` | Tables `restaurants`, `categories`, `dishes` + RLS de base |
| 2 | `002_features.sql` | Colonnes `dishes` (is_available, video_url, multi-langue), `menu_events`, vue `restaurant_stats` |
| 3 | `002_user_roles.sql` | Table `user_roles` + trigger auto-assign `restaurant_owner` + helper `is_super_admin()` |
| 4 | `003_admin.sql` | RLS super_admin + RPCs `admin_set_user_role`, `admin_set_restaurant_active`, `admin_delete_restaurant` + vue `admin_users_view` |
| 5 | `003_storage.sql` | Bucket `restaurant-images` (5 MB, jpeg/png/webp) + policies |
| 6 | `004_photos_360.sql` | Table `photos_360` (24 vues par plat) |
| 7 | `005_storage_extend.sql` | Buckets additionnels (videos, models 3D) |
| 8 | `006_site_content.sql` | Contenu éditable du site (landing, mentions) |
| 9 | `007_storage_security.sql` | Policies RLS supplémentaires Storage |

## Dépendances entre migrations

- `003_admin.sql` **dépend de** `002_user_roles.sql` (utilise `public.user_roles` et `is_super_admin()`).
- `002_features.sql` **dépend de** `001_initial_schema.sql` (ALTER TABLE sur `dishes`, `categories`, `restaurants`).
- L'ordre alphabétique satisfait ces dépendances **par chance** :
  - `002_features` (`f`) < `002_user_roles` (`u`) — OK car `features` ne touche pas `user_roles`
  - `003_admin` (`a`) < `003_storage` (`s`) — OK car `admin` n'a pas besoin du bucket Storage

## Règle pour les nouvelles migrations

Toujours utiliser un préfixe numérique **unique** : `008_xxx.sql`, `009_xxx.sql`...
Ne jamais réutiliser un préfixe déjà pris.

## État actuel

Toutes ces migrations ont déjà été **exécutées en production**. Ne renommez pas les fichiers existants — Supabase enregistre les migrations exécutées par nom dans `supabase_migrations.schema_migrations`, et renommer casserait le suivi.
