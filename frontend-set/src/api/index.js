import axios from 'axios'
// import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const api = axios.create({
  baseURL: '/api', // 👈 이게 자동으로 /api 앞에 붙음
  withCredentials: true, // 세션 쿠키 포함
})

export default api
