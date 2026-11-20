# Build context = racine du monorepo :
#   docker build -f apps/app/Dockerfile --build-arg VITE_API_URL=https://api.example.com .
#
# VITE_API_URL est injectee au build (import.meta.env).
# Changer l'URL de l'API necessite un rebuild.

FROM node:22-bookworm-slim AS build
WORKDIR /repo
COPY package.json package-lock.json ./
COPY apps/app/package.json apps/app/package.json
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm ci
COPY packages/shared packages/shared
COPY apps/app apps/app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /repo/apps/app
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY apps/app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/app/dist /usr/share/nginx/html

EXPOSE 80
