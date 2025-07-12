export default [
    {
      path: '/mypage/interest',
      name: 'interest',
      component: () => import('../pages/mypage/InterestPage.vue'),
    },
    {
      path: '/mypage/notice',
      name: 'notice',
      component: () => import('../pages/mypage/NoticePage.vue'),
    },
    {
      path: '/mypage/setting',
      name: 'setting',
      component: () => import('../pages/mypage/SettingPage.vue'),
    },

];
  