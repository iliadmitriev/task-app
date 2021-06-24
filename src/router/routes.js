const routes = [
    {
        path: '/create',
        name: 'create',
        component: () => import('@/views/Create.vue')
    },
    {
        path: '/',
        name: 'list',
        component: () => import('@/views/List.vue')
    },
    {
        path: '/task/:id',
        name: 'task',
        component: () => import('@/views/Task.vue')
    }
]

export default routes