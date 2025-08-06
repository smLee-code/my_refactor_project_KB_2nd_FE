import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [vue()],
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
                    target: env.VITE_API_URL || 'http://localhost:8080',
                    changeOrigin: true,
                    secure: false,
                    configure: (proxy, options) => {
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            console.log('Proxying:', req.url, '->', options.target + req.url)
                        })
                    },
                },
                '/chat': {
                    target: env.VITE_API_URL || 'http://localhost:8080',
                    changeOrigin: true,
                },
                '/chat-app': {
                    target: env.VITE_API_URL || 'http://localhost:8080',
                    changeOrigin: true,
                    ws: true,
                },
            },
        },
    }
})
