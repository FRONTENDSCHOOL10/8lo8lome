import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const viteConfig = defineConfig({
  base: '/',
  server: {
    host: 'localhost',
    port: 3000,
    open: false,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-router-dom': ['react-router-dom'],
          'react-ecosystem': [
            'immer',
            'use-immer',
            'motion',
            'react-helmet-async',
            'react-hot-toast',
            'react-swipeable',
            'zustand',
            'swiper',
            'axios',
          ],
          components: [
            './src/components/AppList.jsx',
            './src/pages/Main/GymList.jsx',
            './src/components/AppNav.jsx',
          ],
        },
      },
    },
  },
});

export default viteConfig;
