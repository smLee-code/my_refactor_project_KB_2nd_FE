export default [
  {
    path: '/project/create',
    name: 'projectCreate',
    component: () => import('../pages/project/ProjectCreatePage.vue'),
  },
  {
    path: '/project/list/detail/:projectId',
    name: 'projectDetail',
    component: () => import('../pages/project/ProjectDetailPage.vue'),
  },
  {
    path: '/project/list',
    name: 'projectList',
    component: () => import('../pages/project/ProjectListPage.vue'),
  },
]
