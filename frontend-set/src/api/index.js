import axios from 'axios'
// import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
    withCredentials: true, // 세션 쿠키 포함
})

export default api
