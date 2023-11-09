<template>
    <div class="modal-sesion">
        <div class="modal-contenido">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" @click="cerrarModalSesion" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body text-center">
                    <div>
                        <svg v-if="$store.state.isAuthenticated" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                            fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-muted fs-4">
                            {{ $store.state.usuario }}
                        </p>
                    </div>
                    </div>
                    <div class="text-center">
                    <div class="modalFooter">
                        <router-link to="#!" v-if="$store.state.isAuthenticated" @click="$store.commit('logout')"
                            class="btn btn-outline-secondary btn-sm" title="Cerrar Sesion">

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-door-closed-fill" viewBox="0 0 16 16">
                                <path
                                    d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            </svg>
                            Salir </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'InfoSesionModal',
    components: {

    },
    props: {
    },
    data() {
        return {
        };
    },
    methods:{
        cerrarModalSesion() {
      this.$emit('cerrar-modal');
    },
    }
}

</script>
  
<style scoped>
/* Estilos específicos para el componente EditarFilaModal */
.modal-sesion {
    position: fixed;
    top: 66px; /* Ajusta la distancia desde la parte superior según sea necesario */
    right: 3px;
    width: 250px; /* Ajusta el ancho según sea necesario */
    z-index: 1050; /* Asegura que el modal esté por encima del contenido existente */
    display: flex;
    flex-direction: column;
}


.modal-contenido {
    background: #fff;
    /*border: 1px solid #ccc;*/
    border-radius: 5px;
}
.modalFooter{
    margin-bottom: 20px;
}

/* ...otros estilos... */</style>