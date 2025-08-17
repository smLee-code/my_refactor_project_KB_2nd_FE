const adminRoutes = [
    {
        path: '/admin/loan-management/:id',
        name: 'AdminLoanManagement',
        component: () => import('@/pages/admin/LoanManagementPage.vue'),
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        },
    },

    {
        path: '/admin/my-loans',
        name: 'AdminMyLoanList',
        component: () => import('@/pages/admin/MyLoanListPage.vue'),
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
        },
    },
    {
        path: '/admin/challenge/:fundId/participants',
        name: 'ChallengeParticipantList',
        component: () => import('@/pages/admin/ChallengeParticipantListPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
        path: '/admin/challenge/logs/:userChallengeId',
        name: 'ChallengeLogVerification',
        component: () => import('@/pages/admin/ChallengeLogVerificationPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
    },

    {
        path: '/admin/my-challenges',
        name: 'AdminMyChallengeList',
        component: () => import('@/pages/admin/MyChallengeListPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
    },
]

export default adminRoutes
