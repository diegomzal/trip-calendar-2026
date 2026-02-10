import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['calendar.svg', 'events.json'],
      manifest: {
        name: 'Calendario Europa 2026',
        short_name: 'Europa2026',
        description: 'Calendario de viajes por Europa 2026',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'calendar.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'calendar.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/events.json'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'events-data',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
