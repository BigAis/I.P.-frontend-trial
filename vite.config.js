// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to avoid CORS issues
      '/api': {
        target: 'https://dev.cobaltfairy.online',
        changeOrigin: true,
        secure: false
      }
    }
  }
})