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
        path: '/funding/join/:id',
        name: 'fundingJoin',
        component: () => import('../pages/funding/FundingJoinPage.vue'),
    },
    {
        path: '/funding/join-payment/:id',
        name: 'fundingJoinWithPayment',
        component: () => import('../pages/funding/FundingJoinWithPaymentPage.vue'),
    },
    {
        path: '/funding/join-apply/:id',
        name: 'fundingJoinWithoutPayment',
        component: () => import('../pages/funding/FundingJoinWithoutPaymentPage.vue'),
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
