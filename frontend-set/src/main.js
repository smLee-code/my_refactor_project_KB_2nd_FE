import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '/api' // 환경변수 또는 기본값

app.use(createPinia())
app.use(router)

// axios를 전역에서 사용할 수 있도록 설정
app.config.globalProperties.$axios = axios

app.mount('#app')
