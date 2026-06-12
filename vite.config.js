import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GalawGo is deployed to GitHub Pages at:
//   https://<your-username>.github.io/galawgo/
// so every asset path must be prefixed with "/galawgo/".
// If you rename the GitHub repo, update this "base" value to match
// (it must be "/your-repo-name/", including the slashes).
export default defineConfig({
  base: '/galawgo/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'GalawGo - Diet & Fitness Companion',
        short_name: 'GalawGo',
        description:
          'A beginner-friendly diet & fitness companion. Track workouts, meals, and weight - all offline, all on your device.',
        theme_color: '#10B981',
        background_color: '#10B981',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/galawgo/',
        scope: '/galawgo/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Cache every built asset so the app keeps working offline.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
      },
    }),
  ],
})
