export default [
  {
    path: '/funding/create',
    name: 'fundingCreate',
    component: () => import('../pages/funding/FundingCreatePage.vue'),
  },
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
]
