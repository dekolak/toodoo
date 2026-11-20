# Toodoo — Gestion de taches SaaS

Monorepo npm workspaces. App de gestion de taches collaborative, multi-tenant.

- **`apps/api`** — backend NestJS + Prisma + PostgreSQL (auth JWT, CRUD, multi-tenant)
- **`apps/app`** — frontend React PWA (Vite + Tailwind + TipTap)
- **`packages/shared`** — types et constantes partagees

## Setup

```bash
# Base de donnees
docker compose up -d db

# Installer les dependances
npm install

# Generer le client Prisma + migration
cd apps/api
cp .env.example .env
npx prisma migrate dev --name init
npm run seed
cd ../..

# Lancer
npm run api   # API sur http://localhost:3000
npm run app   # App sur http://localhost:5173
```

Compte demo : `admin@demo.local` / `admin`

## Architecture

- **Multi-tenant** : chaque entreprise a son espace isole (tenantId sur toutes les tables principales)
- **JWT auth** : roles admin / manager / member
- **Sous-apps** : registre de mini-apps avec permissions par UserType
- **PWA** : installation mobile, cache offline, notifications push (prevu)
- **WebSocket** : temps reel via Socket.io (prevu)
