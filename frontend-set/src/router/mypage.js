export default [
  {
    path: '/mypage/interest',
    name: 'interest',
    component: () => import('../pages/mypage/InterestPage.vue'),
  },
  {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoardPage,
  },
]
