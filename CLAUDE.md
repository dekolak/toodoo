# Consignes pour Claude Code

Projet Toodoo : app SaaS de gestion de taches collaborative, multi-tenant.

## Avec l'utilisateur
- Repondre en francais, simplement et brievement.
- Faire le travail demande sans redemander ; ne poser une question que si on est bloque.
- Si on lui demande un **avis**, donner l'avis et attendre le feu vert avant de coder.

## Travail
- Branche `claude/<sujet>` depuis `origin/main`, commit, push.
- Avant de fusionner : `npm run test`, `npx tsc --noEmit -p apps/app`, verification navigateur si changement visible.
- Migration Prisma : nommee, reprend les donnees existantes, testee sur base vide.
- Pas de texte en dur dans les ecrans clients : cle dans `apps/app/src/textes/fr.ts` + `t()`.
- Mettre a jour la doc (`README.md`, `docs/`) dans la meme PR.

## Stack
- **API** : NestJS + Prisma + PostgreSQL — `cd apps/api && npm run build && node dist/main`
- **App** : React + Vite + Tailwind + TipTap — `cd apps/app && npx vite --port 5173`
- **Shared** : `packages/shared` — types et constantes communes
- **Base locale** : `docker compose up -d db` — base `toodoo` (user `toodoo` / `toodoo`)
