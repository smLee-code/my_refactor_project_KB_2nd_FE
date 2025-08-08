import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// 앱 시작 시 토큰 로드
const authStore = useAuthStore()
authStore.loadToken()

axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api' // 기본값

// axios를 전역에서 사용할 수 있도록 설정
app.config.globalProperties.$axios = axios

app.use(router)
app.mount('#app')
