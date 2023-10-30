import {createStore} from 'vuex';

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
        }
    }

});
export default storage