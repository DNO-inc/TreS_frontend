import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      components: '/src/components',
      constants: '/src/constants',
      context: '/src/context',
      layouts: '/src/layouts',
      pages: '/src/pages',
      functions: '/src/shared/functions',
      hooks: '/src/shared/hooks',
      api: '/src/store/api',
      theme: '/src/theme',
      utils: '/src/utils',
    },
  },
})
