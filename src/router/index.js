import { createRouter, createWebHistory } from 'vue-router';
import storage from '@/storage';
import HomeView from '../views/HomeView.vue'
//Importar demas vistas

const routes = [{
        path: '/Inicio',
        name: 'Inicio',
        component: HomeView,
        meta: { requiresAuth: true }
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
        component: () =>
            import ( '../views/FormBuilderView.vue'),
            meta: { requiresAuth: true }
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: () =>
            import ('../views/UsuariosView'),
            meta: { requiresAuth: true}
    },
    {
        path: '/crearusuario',
        name: 'crearusuario',
        component: () =>
            import ('../views/CrearUsuario'),
            meta: { requiresAuth: true}
    },
    {
        path: '/modules/:idConfigForm',
        name: 'modules  ',
        component: () =>
            import ('../views/ManagerModulesView'),
            meta: { requiresAuth: true },
    },
    {
        path: '/formularios',
        name: 'formularios',
        component: () =>
            import ('../views/FormulariosView'),
            meta: { requiresAuth: true },
    },
    {
        path: '/editForms/:id',
        name: 'editForms',
        component: () =>
            import ('../views/EditForms'),
            meta: { requiresAuth: true },
    },
    {
        path: '/grilla/:idConfigForm',
        name: 'grilla  ',
        component: () =>
            import ('../views/ManagerGrillaView'),
            meta: { requiresAuth: true },
    },
    {
        path: '/',
        name: 'Acceder',
        component: () =>
            import ('../views/LoginView'),
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // Si la ruta requiere autenticación
    if (to.meta.requiresAuth) {
      // Verifica si el usuario está autenticado
      if (!storage.state.isAuthenticated) {
        return next({ name: 'Acceder' }); // Redirige a la página de inicio de sesión
      }
    }
    next();
  });
  
  
export default router