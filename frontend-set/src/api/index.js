import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // 세션 쿠키 포함
})

// 요청 인터셉터: JWT 토큰을 자동으로 헤더에 추가
api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        const token = authStore.token || localStorage.getItem('jwt')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// 응답 인터셉터: 401 에러 시 로그아웃 처리
// api.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             const authStore = useAuthStore()
//             authStore.logout()
//             router.push('/auth/login')
//         }
//         return Promise.reject(error)
//     },
// )

export default api
