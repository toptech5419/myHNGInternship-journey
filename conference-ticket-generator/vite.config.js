import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Remove rollupOptions unless you have multiple entry points
  },
  publicDir: 'public',
  base: '/', // Add base path
  server: {
    host: true, 
  }
})