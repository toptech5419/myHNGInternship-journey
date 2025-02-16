import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensure this is set correctly
  build: {
    outDir: 'dist', // Ensure Vercel picks the right output
  }
});
