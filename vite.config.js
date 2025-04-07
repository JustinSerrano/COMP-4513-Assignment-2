import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('leaflet')) {
              return 'leaflet-vendor';
            }
            if (id.includes('supabase')) {
              return 'supabase-vendor';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase the chunk size limit if needed
  }
});
