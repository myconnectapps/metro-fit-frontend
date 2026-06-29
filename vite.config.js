import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://metro-fit-backend-481201841367.asia-southeast2.run.app',
        changeOrigin: true,
      },
    },
  },
});
