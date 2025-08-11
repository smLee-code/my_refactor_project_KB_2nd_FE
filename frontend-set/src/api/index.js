import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
    withCredentials: true, // 세션 쿠키 포함
})

// 요청 인터셉터 - JWT 토큰 자동 추가
api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        // 토큰이 없으면 localStorage에서 로드
        if (!authStore.token) {
            authStore.loadToken()
        }
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default api
