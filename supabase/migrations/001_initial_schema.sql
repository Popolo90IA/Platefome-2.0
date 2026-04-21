-- ============================================================
-- Migration 001: Schema initial
-- Tables: restaurants, categories, dishes
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Table: restaurants
-- ============================================================
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_restaurant UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS restaurants_user_id_idx ON public.restaurants(user_id);
CREATE INDEX IF NOT EXISTS restaurants_slug_idx ON public.restaurants(slug);

ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Public can read all restaurants (for public menu)
DROP POLICY IF EXISTS "Public can view restaurants" ON public.restaurants;
CREATE POLICY "Public can view restaurants"
  ON public.restaurants FOR SELECT
  USING (true);

-- Owner can insert their own restaurant
DROP POLICY IF EXISTS "Users can insert their own restaurant" ON public.restaurants;
CREATE POLICY "Users can insert their own restaurant"
  ON public.restaurants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Owner can update their own restaurant
DROP POLICY IF EXISTS "Users can update their own restaurant" ON public.restaurants;
CREATE POLICY "Users can update their own restaurant"
  ON public.restaurants FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Owner can delete their own restaurant
DROP POLICY IF EXISTS "Users can delete their own restaurant" ON public.restaurants;
CREATE POLICY "Users can delete their own restaurant"
  ON public.restaurants FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- Table: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS categories_restaurant_id_idx ON public.categories(restaurant_id);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Public can read categories
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories"
  ON public.categories FOR SELECT
  USING (true);

-- Owner can manage categories of their restaurant
DROP POLICY IF EXISTS "Owners can insert categories" ON public.categories;
CREATE POLICY "Owners can insert categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE id = restaurant_id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Owners can update categories" ON public.categories;
CREATE POLICY "Owners can update categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE id = restaurant_id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Owners can delete categories" ON public.categories;
CREATE POLICY "Owners can delete categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE id = restaurant_id AND user_id = auth.uid()
    )
  );

-- ============================================================
-- Table: dishes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  model_3d_url TEXT,
  ar_enabled BOOLEAN DEFAULT FALSE,
  allergens TEXT[],
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS dishes_restaurant_id_idx ON public.dishes(restaurant_id);
CREATE INDEX IF NOT EXISTS dishes_category_id_idx ON public.dishes(category_id);

ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view dishes" ON public.dishes;
CREATE POLICY "Public can view dishes"
  ON public.dishes FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Owners can insert dishes" ON public.dishes;
CREATE POLICY "Owners can insert dishes"
  ON public.dishes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE id = restaurant_id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Owners can update dishes" ON public.dishes;
CREATE POLICY "Owners can update dishes"
  ON public.dishes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE id = restaurant_id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Owners can delete dishes" ON public.dishes;
CREATE POLICY "Owners can delete dishes"
  ON public.dishes FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants
      WHERE id = restaurant_id AND user_id = auth.uid()
    )
  );

-- ============================================================
-- Trigger to auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS restaurants_updated_at ON public.restaurants;
CREATE TRIGGER restaurants_updated_at
  BEFORE UPDATE ON public.restaurants
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS categories_updated_at ON public.categories;
CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS dishes_updated_at ON public.dishes;
CREATE TRIGGER dishes_updated_at
  BEFORE UPDATE ON public.dishes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
