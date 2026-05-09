import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
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
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('three') || id.includes('vanta')) {
              return 'three';
            }
            return 'vendor'; // other node_modules
          }
        },
      },
    },
  },
})
