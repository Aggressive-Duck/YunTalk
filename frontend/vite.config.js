import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  server: {
    proxy: {
      // Proxy API requests
      '/api': 'http://localhost:3000',
      // Proxy static file requests (uploads, etc.)
      '/uploads': 'http://localhost:3000',
    }
  }
})
