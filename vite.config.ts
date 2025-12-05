import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/boozy/', // For GitHub Pages deployment
  base: '/', // For production deployment (root domain)
  assetsInclude: ['**/*.mp4'],
  build: {
    assetsInlineLimit: 0, // Disable inlining for large files
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
