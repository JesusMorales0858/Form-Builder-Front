<template>
    <div class="modal-permisos">
        <div class="modal-contenido">
            <div class="modal-content">
                <div class="modal-header">
                    <label class="text-muted fs-7">Permisos</label>
                    <button type="button" class="btn-close" @click="cerrarModalPermisos" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body text-center">
                 <!-- Mensaje no hay permisos --> 
                 <span class="text-muted fs-8" v-if="mensajeNoHayPermisos"> No tiene permisos asignados </span>  
                <!-- Spinner: lo mostramos si loading es true -->
                <div class="d-flex justify-content-center" v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
                <div v-if="!loading">
                    <ul ul class="list-group" v-for="Permisos of ListaPermisos" :key="Permisos.permisosID">
                        <li class="list-group-item list-group-item-info fs-7">{{ Permisos.descripcion }}</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'PermisosModal',
    props: {
        usuarioId: Number,
    },
    data() {
        return {
            ListaPermisos: [],
            loading: false,
            mensajeNoHayPermisos: false
        };
    },
    created() {
        this.fetch();
    },
    methods: {

        async fetch() {
            this.loading = true;
            await this.axios.get(`/api/Permisos/ObtenerPermisosUsuario/${this.usuarioId}`)
                .then((respuesta) => {
                    this.ListaPermisos = respuesta.data.usuario;
                    if(!this.ListaPermisos){
                        this.mensajeNoHayPermisos = true;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.loading = false;
        },
        cerrarModalPermisos() {
            console.log("Cerrando Modal pErmisos");
            this.$emit('cerrar-modal-permisos');
        },
    }
}

</script>
  
<style scoped>
/* Estilos específicos para el componente EditarFilaModal */
.modal-permisos {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1050;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /* Oculta el desbordamiento del contenido del modal */
}


.modal-contenido {
    background: #fff;
    /*border: 1px solid #ccc;*/
    border-radius: 5px;
}

.modalFooter {
    margin-bottom: 20px;
}
.list-group-item {
    font-size: 0.8rem; /* Ajusta el tamaño de la fuente según tus preferencias */
    padding: 0.5rem 1rem; /* Ajusta el padding según tus preferencias */
}
/* ...otros estilos... */
</style>