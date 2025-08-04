import MyPage from '@/pages/mypage/MyPage.vue'
import DashBoardPage from '@/pages/mypage/DashBoardPage.vue'

export default [
    {
        path: '/mypage',
        name: 'mypage',
        component: MyPage,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoardPage,
    },
]
