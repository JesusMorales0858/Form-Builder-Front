import {createStore} from 'vuex';
import router from '../router';
import VuexPersistence from 'vuex-persist';
const storage = createStore({
    state: {
    isAuthenticated: false,
    usuario: '',
    permisos: []
    },
    mutations:{
        setAuthenticated(state, value){
            state.isAuthenticated = value;
        },
        setUsuario(state, usuario){
            state.usuario = usuario;
        },
        setPermisos(state, permisos) {
            state.permisos = permisos;
        },
        logout(state){
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        state.usuario = '';
        state.permisos = [];
        router.push('/');
        }
    },
    /*actions: {
        cargarPermisos({ commit }) {
          // Cargar permisos desde localStorage
          const permisos = JSON.parse(localStorage.getItem('userPermissions')) || [];
          commit('setPermisos', permisos);
        },
      },*/
    plugins:[
        new VuexPersistence({
            storage: window.localStorage
        }).plugin
    ]

});
export default storage