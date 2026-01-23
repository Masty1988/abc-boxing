# ABC Boxing Club - Backend Admin

## Installation. 

### 1. Dépendances

```bash
npm install prisma @prisma/client next-auth bcryptjs stripe
npm install -D @types/bcryptjs tsx
```

### 2. Configuration

Copier `.env.example` en `.env.local` et remplir :

```bash
cp .env.example .env.local
```

Variables importantes :
- `DATABASE_URL` : Chemin SQLite (dev) ou URL PostgreSQL (prod)
- `NEXTAUTH_SECRET` : Générer avec `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` : Depuis dashboard.stripe.com

### 3. Base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer la base de données
npx prisma db push

# Créer l'admin initial
npx tsx scripts/create-admin.ts

# Initialiser les slots photos
npx tsx scripts/init-photos.ts
```

### 4. Lancer

```bash
npm run dev
```

Accéder à http://localhost:3000/taz

**Login par défaut :**
- Username: `taz`
- Password: `ABC2024!`

⚠️ **CHANGER LE MOT DE PASSE EN PRODUCTION !**

## Structure des fichiers

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # Auth NextAuth
│   │   ├── adherents/                    # CRUD adhérents
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── validate-payment/route.ts
│   │   ├── photos/route.ts              # Gestion photos
│   │   └── stripe/
│   │       ├── checkout/route.ts        # Créer paiement
│   │       └── webhook/route.ts         # Webhook Stripe
│   └── taz/
│       ├── layout.tsx                   # SessionProvider
│       ├── page.tsx                     # Dashboard
│       └── login/page.tsx               # Login
├── lib/
│   ├── auth.ts                          # Config NextAuth
│   └── prisma.ts                        # Client Prisma
prisma/
│   └── schema.prisma                    # Schéma BDD
scripts/
│   ├── create-admin.ts                  # Créer admin
│   └── init-photos.ts                   # Init photos
```

## Stripe

### Configuration webhook (prod)

1. Dashboard Stripe → Developers → Webhooks
2. Add endpoint: `https://abcboxing.fr/api/stripe/webhook`
3. Events: `checkout.session.completed`, `payment_intent.payment_failed`
4. Copier le signing secret dans `STRIPE_WEBHOOK_SECRET`

### Test local

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Déploiement Vercel

1. Connecter le repo GitHub
2. Variables d'environnement dans Vercel :
   - `DATABASE_URL` (Vercel Postgres ou Supabase)
   - `NEXTAUTH_URL` = `https://abcboxing.fr`
   - `NEXTAUTH_SECRET`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_APP_URL` = `https://abcboxing.fr`

3. Build command : `prisma generate && next build`
