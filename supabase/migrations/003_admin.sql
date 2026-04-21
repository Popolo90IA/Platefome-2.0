-- ============================================================
-- Migration 003: Super admin — accès total + flag is_active sur restaurants
-- ============================================================

-- 1. Colonne is_active sur restaurants (pour désactiver un resto depuis l'admin)
ALTER TABLE public.restaurants
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS restaurants_is_active_idx ON public.restaurants(is_active);

-- 2. Helper: vérifier si l'utilisateur actuel est super_admin (SECURITY DEFINER contourne RLS)
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'super_admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 3. Policies RLS — super_admin a accès total en lecture/écriture sur TOUTES les tables
-- ============================================================

-- restaurants
DROP POLICY IF EXISTS "super_admin full access restaurants" ON public.restaurants;
CREATE POLICY "super_admin full access restaurants"
  ON public.restaurants FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- categories
DROP POLICY IF EXISTS "super_admin full access categories" ON public.categories;
CREATE POLICY "super_admin full access categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- dishes
DROP POLICY IF EXISTS "super_admin full access dishes" ON public.dishes;
CREATE POLICY "super_admin full access dishes"
  ON public.dishes FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- menu_events (lecture globale pour analytics)
DROP POLICY IF EXISTS "super_admin read all menu events" ON public.menu_events;
CREATE POLICY "super_admin read all menu events"
  ON public.menu_events FOR SELECT
  TO authenticated
  USING (public.is_super_admin());

-- user_roles (super_admin peut tout lire/modifier pour promouvoir/rétrograder)
DROP POLICY IF EXISTS "super_admin full access user_roles" ON public.user_roles;
CREATE POLICY "super_admin full access user_roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- 4. Vue: liste des users avec email + role + restaurant(s)
CREATE OR REPLACE VIEW public.admin_users_view AS
SELECT
  u.id AS user_id,
  u.email,
  u.created_at AS signed_up_at,
  u.last_sign_in_at,
  COALESCE(ur.role, 'restaurant_owner') AS role,
  r.id AS restaurant_id,
  r.name AS restaurant_name,
  r.slug AS restaurant_slug,
  r.is_active AS restaurant_is_active
FROM auth.users u
LEFT JOIN public.user_roles ur ON ur.user_id = u.id
LEFT JOIN public.restaurants r ON r.user_id = u.id;

GRANT SELECT ON public.admin_users_view TO authenticated;

-- 5. RPC: promote / demote user (seul super_admin peut appeler)
CREATE OR REPLACE FUNCTION public.admin_set_user_role(
  target_user_id uuid,
  new_role text
)
RETURNS void AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Only super_admin can change user roles';
  END IF;

  IF new_role NOT IN ('super_admin', 'restaurant_owner') THEN
    RAISE EXCEPTION 'Invalid role: %', new_role;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, new_role)
  ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.admin_set_user_role(uuid, text) TO authenticated;

-- 6. RPC: toggle is_active sur un restaurant
CREATE OR REPLACE FUNCTION public.admin_set_restaurant_active(
  target_restaurant_id uuid,
  new_active boolean
)
RETURNS void AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Only super_admin can change restaurant status';
  END IF;

  UPDATE public.restaurants
  SET is_active = new_active, updated_at = now()
  WHERE id = target_restaurant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.admin_set_restaurant_active(uuid, boolean) TO authenticated;

-- 7. RPC: delete restaurant (cascade sur dishes/categories/events via FK)
CREATE OR REPLACE FUNCTION public.admin_delete_restaurant(
  target_restaurant_id uuid
)
RETURNS void AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Only super_admin can delete restaurants';
  END IF;

  DELETE FROM public.restaurants WHERE id = target_restaurant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.admin_delete_restaurant(uuid) TO authenticated;

-- ============================================================
-- PROMOTION SUPER_ADMIN (avidanmarciano97@gmail.com)
-- Exécute ce bloc SÉPARÉMENT après que la migration ci-dessus ait réussi:
--
--   INSERT INTO public.user_roles (user_id, role)
--   VALUES (
--     (SELECT id FROM auth.users WHERE email = 'avidanmarciano97@gmail.com'),
--     'super_admin'
--   )
--   ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';
--
-- Vérification:
--   SELECT u.email, ur.role FROM auth.users u
--   JOIN public.user_roles ur ON ur.user_id = u.id
--   WHERE u.email = 'avidanmarciano97@gmail.com';
-- ============================================================
