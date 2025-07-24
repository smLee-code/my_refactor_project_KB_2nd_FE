import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    global: {}, // ✅ global을 빈 객체로 define해서 sockjs-client global 참조 에러 방지
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    '/chat-app': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      ws: true, // ✅ WebSocket proxy
    },
  },
})
