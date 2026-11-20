import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiOrigin = env.VITE_API_URL ? new URL(env.VITE_API_URL).origin : undefined;

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'Toodoo — Gestion de taches',
          short_name: 'Toodoo',
          description: 'Gestion de taches collaborative pour equipes',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#0f172a',
          theme_color: '#6366f1',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          ],
        },
        workbox: {
          navigateFallback: '/index.html',
          runtimeCaching: apiOrigin
            ? [{
                urlPattern: new RegExp(
                  `^${apiOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/(tasks|projects|stages|users|auth/me)(/|\\?|$)`,
                ),
                handler: 'NetworkFirst',
                method: 'GET',
                options: {
                  cacheName: 'toodoo-api-cache',
                  networkTimeoutSeconds: 4,
                  cacheableResponse: { statuses: [0, 200] },
                  expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 7 },
                },
              }]
            : [],
        },
      }),
    ],
    server: {
      port: 5173,
      proxy: {
        '/api': { target: 'http://localhost:3000', changeOrigin: true },
      },
    },
  };
})
