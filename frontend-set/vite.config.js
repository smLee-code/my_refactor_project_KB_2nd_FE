import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const target = env.VITE_API_URL || 'https://localhost:8080'

    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },

        define: {
            global: {}, // ✅ sockjs-client global 참조 에러 방지
        },
        server: {
            proxy: {
                '/api': {
                    target,
                    changeOrigin: true,
                    secure: false,
                    configure: (proxy, options) => {
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            console.log('Proxying:', req.url, '->', options.target + req.url)
                        })
                    },
                },
                '/chat': {
                    target,
                    changeOrigin: true,
                },
                '/chat-app': {
                    target,
                    changeOrigin: true,
                    ws: true,
                },
            },
        },
    }
})
