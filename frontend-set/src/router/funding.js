export default [
    {
        path: '/funding/create/loan',
        name: 'fundingCreateLoan',
        component: () => import('../pages/funding/FundingCreateLoanPage.vue'),
    },
    {
        path: '/funding/create/savings',
        name: 'fundingCreateSavings',
        component: () => import('../pages/funding/FundingCreateSavingsPage.vue'),
    },
    {
        path: '/funding/create/donation',
        name: 'fundingCreateDonation',
        component: () => import('../pages/funding/FundingCreateDonationPage.vue'),
    },
    {
        path: '/funding/create/challenge',
        name: 'fundingCreateChallenge',
        component: () => import('../pages/funding/FundingCreateChallengePage.vue'),
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
