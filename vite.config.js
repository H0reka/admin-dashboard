import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://15.206.209.231:8080/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/noadminapi': {
        target: 'http://15.206.209.231:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/noadminapi/, ''),
      },
    },
  },
})