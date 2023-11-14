import { createStore } from 'vuex';
import router from '../router';
import VuexPersistence from 'vuex-persist';

// Crear una instancia de VuexPersistence
const vuexLocal = new VuexPersistence({
  storage: window.localStorage, // Almacenar en localStorage
});

const storage = createStore({
  state: {
    isAuthenticated: false,
    usuario: '',
    permisos: [],
    rol:''
  },
  mutations: {
    setAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    setPermisos(state, permisos) {
      state.permisos = permisos;
    },
    setRol(state, rol) {
      state.rol = rol;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      state.usuario = '';
      state.permisos = [];
      router.push('/');
    },
    verificarAutenticacion({ state }) {
      // Verificar autenticación y redirigir si no está autenticado
      if (!state.isAuthenticated && router.currentRoute.value.path !== '/') {
        router.push('/');
      }
    },
  },
  actions: {
    cargarPermisos({ commit }) {
      // Cargar permisos desde localStorage
      const permisos = JSON.parse(localStorage.getItem('userPermissions')) || [];
      commit('setPermisos', permisos);
    },
  },
  plugins: [vuexLocal.plugin], // Usa el plugin de VuexPersistence
});

export default storage;
