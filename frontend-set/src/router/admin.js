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
]

export default adminRoutes
