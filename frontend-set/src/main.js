import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api' // 선택: proxy 쓸 때 유용

app.use(createPinia())
app.use(router)

app.mount('#app')
