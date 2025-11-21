import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/boozy/', // GitHub Pages base path
  assetsInclude: ['**/*.mp4'],
  build: {
    assetsInlineLimit: 0, // Disable inlining for large files
  },
})
