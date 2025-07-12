export default [
    {
      path: '/funding/detail',
      name: 'fundingDetail',
      component: () => import('../pages/funding/FundingDetailPage.vue'),
    },
    {
      path: '/funding/join',
      name: 'fundingJoin',
      component: () => import('../pages/funding/FundingDetailPage.vue'),
    },
    {
      path: '/funding/list',
      name: 'fundingList',
      component: () => import('../pages/funding/FundingListPage.vue'),
    },

];