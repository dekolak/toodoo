# Toodoo — Gestion de taches SaaS

Monorepo npm workspaces. App de gestion de taches collaborative, multi-tenant.

- **`apps/api`** — backend NestJS + Prisma + PostgreSQL (auth JWT, CRUD, multi-tenant)
- **`apps/app`** — frontend React PWA (Vite + Tailwind + TipTap)
- **`packages/shared`** — types et constantes partagees

## Setup local

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

## Deploiement Coolify

Le projet se deploie avec **Docker Compose** sur Coolify.

1. Creer un nouveau service **Docker Compose** dans Coolify
2. Source : repo GitHub `dekolak/toodoo`
3. Configurer les variables d'environnement (voir `.env.example` a la racine) :
   - `POSTGRES_PASSWORD` — mot de passe PostgreSQL
   - `JWT_SECRET` — secret JWT
   - `CORS_ORIGIN` — URL du frontend (ex: `https://app.toodoo.example`)
   - `VITE_API_URL` — URL de l'API (ex: `https://api.toodoo.example`)
4. Configurer les domaines dans Coolify :
   - Service `api` : domaine API (port 3000)
   - Service `app` : domaine frontend (port 80)
5. Deployer

Les migrations Prisma sont appliquees automatiquement au demarrage de l'API (entrypoint).

## Architecture

- **Multi-tenant** : chaque entreprise a son espace isole (tenantId sur toutes les tables principales)
- **JWT auth** : roles admin / manager / member
- **PWA** : installation mobile, cache offline, notifications push (prevu)
- **WebSocket** : temps reel via Socket.io (prevu)
