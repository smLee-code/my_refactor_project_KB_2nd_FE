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
        component: () => import('../pages/funding/FundingJoinPage.vue'),
    },
    {
        path: '/funding',
        name: 'fundingList',
        component: () => import('../pages/funding/FundingListPage.vue'),
    },
    {
        path: '/funding/join/:id/payment',
        name: 'fundingPayment',
        component: () => import('@/components/payment/Payment.vue'),
        props: true,
    },
]
