import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // Ensure relative paths for assets
  build: {
    outDir: 'dist', // Ensure correct output directory
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173, // Ensure default Vite port
    }
  }
});
