# Plateform — Claude Code instructions

Tu travailles sur **Plateform**, un SaaS israélien pour restaurants : menus digitaux 3D / 360° accessibles via QR. Stack : Next.js 14 (App Router) + Supabase + Tailwind. Public israélien, donc **RTL hébreu prioritaire** + français/anglais.

---

## 1. Brand identity

### Couleurs (déjà dans `src/app/globals.css` et `tailwind.config.js`)

- **Bg principal** : `hsl(38 28% 94%)` — beige sable
- **Cards** : `hsl(38 30% 97%)` — off-white
- **Sections alt** : `hsl(36 22% 90%)`
- **Texte principal** : `hsl(24 18% 16%)` — fog
- **Accent primaire (bronze)** : `hsl(28 62% 42%)` — utilisé pour CTA, accents, italiques
- **Accent secondaire (terracotta)** : `hsl(22 70% 50%)` — pour gradients

**Gradient signature** (CTAs, logo, accents) :
```css
background: linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%);
```

### Typographie
| Famille | Usage |
|---|---|
| Cormorant Garamond | Titres (h1–h3), italic pour `<em>` accent |
| DM Sans | Body, boutons, UI |
| DM Mono | Eyebrows, labels (uppercase, letter-spacing .14em) |
| Noto Serif Hebrew + Heebo | Override RTL hébreu |

**Pattern signature** : titres avec un mot en italique bronze, ex.
```jsx
<h1>Le menu est <em>l'expérience</em></h1>
```
(le `<em>` est stylé via `globals.css` pour avoir le gradient bronze.)

### Logo
Dans `public/brand/` :
- `logo-lockup.svg` — sur la home, footer, favicon source
- `logo-mark.svg` — assiette + P italique, sur cards, en réduit
- `logo-monogram.svg` — tuile bronze, pour app icon / favicon
- `wordmark.svg` — texte seul

**Toujours utiliser le wordmark "PLATE*FORM*"** avec `FORM` en italique bronze. Jamais "Plateforme" complet (le mot est volontairement tronqué).

---

## 2. Design reference — `design-ref/`

Ouvre ces fichiers HTML dans ton navigateur pour voir les mockups finaux. Ce sont des designs **pixel-final** que tu dois reproduire en composants React :

| Mockup | Page Next.js cible |
|---|---|
| `design-ref/index.html` | `src/app/page.tsx` (home/marketing) |
| `design-ref/onboarding.html` | `src/app/(auth)/signup/page.tsx` ou wizard |
| `design-ref/dashboard.html` | `src/app/(dashboard)/dashboard/page.tsx` |
| `design-ref/menu-list.html` | `src/app/(dashboard)/dashboard/menu/page.tsx` |
| `design-ref/dish-editor.html` | `src/app/(dashboard)/dashboard/menu/[id]/edit/page.tsx` |
| `design-ref/analytics.html` | `src/app/(dashboard)/dashboard/analytics/page.tsx` |
| `design-ref/qr-print.html` | `src/app/(dashboard)/dashboard/qr/page.tsx` |
| `design-ref/dish-viewer.html` | `src/app/menu/[slug]/[dish]/page.tsx` (vue client 3D) |

`design-ref/colors_and_type.css` est la **source de vérité** des tokens design — tous les `var(--xxx)` sont déjà mappés dans `globals.css`. Réutilise-les.

---

## 3. Localisation — RTL hébreu

- L'app a un sélecteur de langue : 14 langues. **Hébreu = défaut** pour les restos israéliens.
- Wrappe les pages avec `dir="rtl"` quand `lang === "he"`.
- Heebo + Noto Serif Hebrew sont chargés. Pas besoin de fallback Arial.
- Tous les mockups sont **déjà en hébreu RTL** — copie les chaînes telles quelles dans `src/lib/i18n.ts`.

---

## 4. Comment tu travailles

1. Lis `design-ref/colors_and_type.css` pour internaliser les tokens
2. Pour chaque page, ouvre le HTML correspondant en parallèle de la page Next.js existante
3. Recrée en composants React + Tailwind (utilise `bg-background`, `text-foreground`, `text-primary`, etc.)
4. Pour ce qui n'est pas couvert par Tailwind, utilise les classes utilitaires définies dans `globals.css` (`.btn-primary`, `.eyebrow`, `.font-display-it`, etc.)
5. Garde les composants Shadcn existants (`src/components/ui/*`) — adapte juste les couleurs si besoin
6. Pour le 3D viewer client, utilise `<model-viewer>` ou Three.js avec les `.glb` dans `public/models/`

---

## 5. Données placeholder

Tu n'as pas encore de **vraies photos**. Pour les mockups :
- Pour les images de plats : utilise `<image-slot>` ou des `<div>` avec `background: linear-gradient(...)` aux couleurs des plats (cf. `design-ref/menu-list.html`)
- Le restaurateur uploadera ses photos via le dashboard plus tard
- Pour les 3D : `public/models/hero-dish.glb`, `pizza.glb`, `tuna.glb` sont déjà là

---

## 6. Checklist de déploiement

- [ ] Variables d'env Supabase configurées dans Vercel
- [ ] Domaine custom (ou `plateform.vercel.app`)
- [ ] Favicon depuis `public/brand/logo-monogram.svg`
- [ ] Open Graph image basée sur `logo-lockup.svg` + tagline
- [ ] `lang="he"` + `dir="rtl"` par défaut sur les sous-domaines israéliens
- [ ] Test mobile : tous les mockups sont pensés mobile-first pour la vue client

---

## 7. Tonalité éditoriale

- **Élégant, pas corpo.** Phrases courtes, italiques pour les emphases.
- **Pas d'emoji** dans l'UI (sauf si tu trouves ça vraiment utile).
- **Pas de stats inventées.** Si tu mets un nombre, ancre-le ou marque-le clairement comme exemple.
- **Mots-clés brand** : *experience*, *360°*, *3D*, *immersif*, *artisan*, *menu vivant*.
- En FR/EN : tagline = *"Every dish, in 360°"*. En HE : *"כל מנה · בתלת מימד"*.

---

Bon courage. Toutes les questions de design : référence `design-ref/`. Toutes les questions d'archi : c'est du Next.js standard, le repo est déjà bootstrappé.
