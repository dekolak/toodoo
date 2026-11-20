#!/bin/sh
set -e

echo "[entrypoint] Applying database migrations..."
npx prisma migrate deploy

echo "[entrypoint] Seeding reference data..."
npx prisma db seed || true

echo "[entrypoint] Starting API..."
exec node dist/main.js
