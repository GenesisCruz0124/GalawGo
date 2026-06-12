import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GalawGo is deployed to GitHub Pages at:
//   https://<your-username>.github.io/galawgo/
// so every asset path must be prefixed with "/galawgo/".
// If you rename the GitHub repo, update this "base" value to match
// (it must be "/your-repo-name/", including the slashes).
export default defineConfig({
  base: '/galawgo/',
  plugins: [react()],
})
