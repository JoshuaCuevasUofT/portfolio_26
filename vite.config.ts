// vite.config.ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    minify: 'terser',
    sourcemap: false,
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom'))        return 'react-dom';
          if (id.includes('react'))            return 'react';
          if (id.includes('three') || id.includes('vanta')) return 'three';
          if (id.includes('react-syntax-highlighter')) return 'syntax-highlighter';
          if (id.includes('react-markdown') || id.includes('remark')) return 'markdown';
          return 'vendor';
        },
      },
    },
  },
})
