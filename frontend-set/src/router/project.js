export default [
  {
    path: '/project/create',
    name: 'projectCreate',
    component: () => import('../pages/project/ProjectCreatePage.vue'),
  },
  {
    path: '/project/detail/:id',
    name: 'projectDetail',
    component: () => import('../pages/project/ProjectDetailPage.vue'),
    props: true,
  },
  {
    path: '/project',
    name: 'projectList',
    component: () => import('../pages/project/ProjectListPage.vue'),
  },
]
