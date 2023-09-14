import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//Importar demas vistas

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/gestionModulos',
        name: 'gestionModulos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/FormBuilderView.vue')
    },
    {
        path: '/modules/:idConfigForm',
        name: 'modules  ',
        component: () =>
            import ('../views/ManagerModulesView')
    },
    {
        path: '/formularios',
        name: 'formularios',
        component: () =>
            import ('../views/FormulariosView')
    },
    {
        path: '/grilla/:idConfigForm',
        name: 'grilla  ',
        component: () =>
            import ('../views/ManagerGrillaView')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router