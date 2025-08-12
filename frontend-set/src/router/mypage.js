import MyPage from '@/pages/mypage/MyPage.vue'
import DashBoardPage from '@/pages/mypage/DashBoardPage.vue'

export default [
    {
        path: '/mypage',
        name: 'mypage',
        component: MyPage,
        beforeEnter: (to, from, next) => {
            // 로컬스토리지에서 역할 확인
            const userRole = localStorage.getItem('role')
            console.log('✅마이페이지 접근 - 사용자 역할:', userRole)

            if (userRole === 'ROLE_NORMAL') {
                next() // 일반 사용자는 마이페이지 접근 가능
            } else {
                // 다른 역할은 대시보드로 리다이렉트
                next('/dashboard')
            }
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoardPage,
        beforeEnter: (to, from, next) => {
            // 로컬스토리지에서 역할 확인
            const userRole = localStorage.getItem('role')
            console.log('✅대시보드 접근 - 사용자 역할:', userRole)

            if (userRole === 'ROLE_NORMAL') {
                // 일반 사용자는 마이페이지로 리다이렉트
                next('/mypage')
            } else {
                next() // 관리자나 다른 역할은 대시보드 접근 가능
            }
        },
    },
]
