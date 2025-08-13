import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import authRoutes from './auth'
import projectRoutes from './project'
import fundingRoutes from './funding'
import mypageRoutes from './mypage'

import axios from 'axios'
import adminRoutes from './admin'

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
        ...adminRoutes,
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: NotFoundPage,
        },
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})

// 전역 라우터 가드 추가
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt')
    const userRole = localStorage.getItem('role')

    console.log('✅라우터 가드 - 경로:', to.path, '토큰:', !!token, '역할:', userRole)

    // 로그인이 필요한 페이지들
    const authRequiredPages = ['/mypage', '/dashboard']

    if (authRequiredPages.includes(to.path)) {
        if (!token) {
            // 로그인이 필요한 페이지인데 토큰이 없으면 로그인 페이지로
            next('/auth/login')
            return
        }

        // 역할에 따른 접근 제어
        if (to.path === '/mypage' && userRole !== 'ROLE_NORMAL') {
            // 일반 사용자가 아닌데 마이페이지 접근 시도
            next('/dashboard')
            return
        }

        if (to.path === '/dashboard' && userRole === 'ROLE_NORMAL') {
            // 일반 사용자가 대시보드 접근 시도
            next('/mypage')
            return
        }
    }

    if (to.name === 'login' && from.name !== 'login') {
        sessionStorage.setItem('previousRoute', from.fullPath)
    }

    next()
})

export default router
