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

Image unique (API sert aussi le frontend compile). Fichier `docker-compose.prod.yml`.

1. Nouveau service **Docker Compose** dans Coolify
2. Source : repo GitHub `dekolak/toodoo`, fichier compose : `docker-compose.prod.yml`
3. Variables d'environnement :
   - `POSTGRES_PASSWORD` — mot de passe PostgreSQL
   - `JWT_SECRET` — secret JWT
4. Domaine : sur le service `app`, port 3000 (ex: `https://toodoo.dekolak.fr:3000`)
5. Deployer

Les migrations Prisma et le seed se lancent automatiquement au demarrage.

## Architecture

- **Multi-tenant** : chaque entreprise a son espace isole (tenantId sur toutes les tables principales)
- **API prefix** : toutes les routes API sous `/api` (ex: `/api/auth/login`)
- **ServeStatic** : en prod, l'API sert le frontend compile (un seul conteneur)
- **JWT auth** : roles admin / manager / member
- **PWA** : installation mobile, cache offline, notifications push (prevu)
- **WebSocket** : temps reel via Socket.io (prevu)
