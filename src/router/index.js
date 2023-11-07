import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//Importar demas vistas

const routes = [{
        path: '/Inicio',
        name: 'Inicio',
        component: HomeView
    },
    {
        path: '/registro',
        name: 'registro',
        component: () =>
            import ('../views/RegistroUsuario')
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
        path: '/usuarios',
        name: 'usuarios',
        component: () =>
            import ('../views/UsuariosView')
        //meta: { requiresAuth: true, requiredPermissions: [1, 3, 2, 4, 5] }
    },
    {
        path: '/crearusuario',
        name: 'crearusuario',
        component: () =>
            import ('../views/CrearUsuario'),
           // meta: { requiresAuth: true, requiredPermissions: [1] }
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
        path: '/editForms/:id',
        name: 'editForms',
        component: () =>
            import ('../views/EditForms')
    },
    {
        path: '/grilla/:idConfigForm',
        name: 'grilla  ',
        component: () =>
            import ('../views/ManagerGrillaView')
    },
    {
        path: '/',
        name: 'Acceder',
        component: () =>
            import ('../views/LoginView')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      // Asegúrate de que el usuario esté autenticado
      if (!store.state.isAuthenticated) {
        return next('/LoginView');
      }
      
      // Verifica los permisos
      const requiredPermissions = to.meta.requiredPermissions;
      const userPermissions = store.state.permisos;
  
      if (!requiredPermissions.every((permission) => userPermissions.includes(permission))) {
        // No tienes acceso a esta ruta, muestra un aviso
        alert('No tienes acceso a este apartado');
        return next(false); // Evita la navegación
      }
    }
    next();
  });
  
export default router