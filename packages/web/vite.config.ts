import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
      proxy: {
        "/api": "http://127.0.0.1:3000"
      },
      watch: {
        usePolling: true,
      },
      host: '0.0.0.0',
    }
})
