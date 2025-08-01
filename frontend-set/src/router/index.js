import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import NotFountPage from '../pages/NotFountPage.vue'
import authRoutes from './auth'
import projectRoutes from './project'
import fundingRoutes from './funding'
import mypageRoutes from './mypage'

import axios from 'axios'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        ...authRoutes,
        ...projectRoutes,
        ...fundingRoutes,
        ...mypageRoutes,
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: NotFountPage,
        },
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
