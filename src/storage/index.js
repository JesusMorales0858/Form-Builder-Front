import {createStore} from 'vuex';
import router from '../router';
import VuexPersistence from 'vuex-persist';
const storage = createStore({
    state: {
    isAuthenticated: false,
    usuario: ''
    },
    mutations:{
        setAuthenticated(state, value){
            state.isAuthenticated = value;
        },
        setUsuario(state, usuario){
            state.usuario = usuario;
        },
        logout(state){
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        state.usuario = '';
        router.push('/');
        }
    },
    plugins:[
        new VuexPersistence({
            storage: window.localStorage
        }).plugin
    ]

});
export default storage