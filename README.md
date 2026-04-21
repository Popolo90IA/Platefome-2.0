# פלטפורמת מסעדות | Plateforme Restaurant

SaaS pour restaurants : menus digitaux accessibles via QR code, interface en hébreu (RTL).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 3.4.1** (PAS v4)
- **Supabase** (Auth + Database + Storage)
- **Shadcn/ui** + Lucide icons
- **qrcode** pour la génération QR

## Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Créer un projet Supabase

1. Aller sur https://supabase.com et créer un nouveau projet
2. Dans **Settings → API**, copier :
   - `Project URL`
   - `anon public` key
3. Dans **Authentication → Providers → Email**, **désactiver** "Confirm email" pour faciliter le dev

### 3. Configurer `.env.local`

```bash
cp .env.local.example .env.local
```

Remplir :
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Lancer les migrations SQL

Dans l'ordre, dans le **SQL Editor** de Supabase :

1. `supabase/migrations/001_initial_schema.sql` — tables restaurants, categories, dishes + RLS
2. `supabase/migrations/002_user_roles.sql` — table user_roles + trigger auto-assignation
3. `supabase/migrations/003_storage.sql` — bucket `restaurant-images` + policies

### 5. Créer un super admin (optionnel)

Après inscription sur l'app, récupérer ton user UUID et exécuter dans le SQL Editor :

```sql
UPDATE public.user_roles
SET role = 'super_admin'
WHERE user_id = 'ton-user-uuid';
```

### 6. Démarrer le serveur

```bash
npm run dev
```

Ouvrir http://localhost:3000

## Structure

```
src/
├── app/
│   ├── (auth)/              Login / Signup
│   ├── (dashboard)/         Dashboard restaurateur (protégé)
│   │   ├── dashboard/       Accueil + stats
│   │   ├── dashboard/dishes
│   │   ├── dashboard/categories
│   │   ├── dashboard/settings
│   │   └── dashboard/qrcode
│   ├── (admin)/admin/       Zone admin (super_admin only)
│   ├── menu/[slug]/         Menu public (sans auth)
│   ├── auth/callback/       Callback OAuth
│   └── page.tsx             Landing page
├── components/
│   ├── ui/                  Shadcn (Button, Input, Card, ...)
│   ├── dashboard/           Sidebar + Header
│   └── upload/ImageUpload   Upload Supabase Storage
├── lib/
│   ├── supabase/            Clients browser + server + middleware
│   ├── validations/         Schemas Zod
│   ├── utils.ts
│   └── constants.ts
├── hooks/useAuth.ts
├── types/                   Types DB
└── middleware.ts            Protection routes
```

## Fonctionnalités

- [x] Auth (signup, login, logout)
- [x] Système de rôles (restaurant_owner / super_admin)
- [x] Dashboard avec stats
- [x] Settings restaurant + upload logo/banner
- [x] CRUD catégories
- [x] CRUD plats + upload image
- [x] Menu public `/menu/[slug]`
- [x] Génération + download QR code
- [x] Zone admin (vue restaurants + stats globales)

## Notes importantes

- **Tailwind v3.4.1 uniquement** — ne pas upgrade vers v4
- **Next.js 16 `params` async** : `const { slug } = await params`
- **Supabase cookies async** : `const cookieStore = await cookies()`
- Interface en **hébreu RTL** (`dir="rtl"` sur `<html>`)
- Les prix sont affichés en shekels (₪)

## Déploiement

Recommandé : **Vercel**
1. Push le repo sur GitHub
2. Importer dans Vercel
3. Ajouter les variables d'env (`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy
