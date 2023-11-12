<template>
  <ver-permisos :usuario-id="DatosUsuario.userID" @cerrar-modal-permisos="cerrarModalVerPermisos"
    v-if="modalVerpermisos"></ver-permisos>
  <editar-usuario :usuario-id="DatosUsuario.userID" @cerrar-modal-editar="cerrarModalEdicion"
    v-if="modalEditarUsuario"></editar-usuario>
  <div @click="cerrarModalVerPermisos" class="modal-overlay" v-if="modalVerpermisos"></div>
  <barra-navegacion></barra-navegacion>
  <spinner :visible="MostrarSpinner"></spinner>
  <div v-if="!MostrarSpinner">
    <div class="col p-3 ">
      <h6 class="text-center h5">Lista de usuarios</h6>
    </div>
    <div class="row p-3">
      <div class="col">
        <router-link to="/crearusuario" class="btn btn-outline-primary btn-sm custom-margin-botonN"
          v-if="$store.state.permisos.includes(1)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg>
          Nuevo</router-link>
      </div>
    </div>
    <div class="table-container container-sm">
      <table class="table align-middle mx-auto" v-if="$store.state.permisos.includes(2)"><!-- 3 -->
        <thead>
          <tr>
            <th scope="col">Nombre de usuario</th>
            <th scope="col">Permisos</th>
            <th scope="col" class="nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody v-for="ListaUser of ListaUsuarios" :key="ListaUser.usuarioId">
          <tr>
            <td>{{ ListaUser.username }}</td>
            <td scope="row">
              <div>
                  <button class="btn btn-outline-info btn-sm ms-3" title="Permisos" v-on:click="verPermisos(ListaUser)"
                    v-if="$store.state.permisos.includes(5)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-eye-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path
                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                    Ver Permisos</button>
                </div>
            </td>
            <td class="nowrap">
              <div class="row">
                <div class="col-auto">
                  <button class="btn btn-outline-warning btn-sm ms-3" title="Editar" v-on:click="asd"
                    v-if="$store.state.permisos.includes(2)" @click="mostrarModalEdicion(ListaUser)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                    Editar</button>
                </div>
                <div class="col-auto">
                  <button class="btn btn-outline-danger btn-sm ms-3" title="Eliminar"
                    v-on:click="eliminarUsuario(ListaUser)" v-if="$store.state.permisos.includes(5)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    Eliminar</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import PermisosModal from '@/components/PermisosModal.vue';
import EditarUsuarioModal from '@/components/EditarUsuarioModal.vue';
import BarraNavegacion from '@/components/BarraNavegacion.vue';
import Spinner from '@/components/Spinner.vue';
export default {
  name: "Formularios",
  components: {
    'barra-navegacion': BarraNavegacion,
    'ver-permisos': PermisosModal,
    'editar-usuario': EditarUsuarioModal,
    'spinner': Spinner
  },
  data: function () {
    return {
      MostrarSpinner: false,
      ListaUsuarios: [],
      modalVerpermisos: false,
      modalEditarUsuario: false,
      idUsuario: null
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.MostrarSpinner = true,
        await this.axios.get("/api/Usuarios/ListaUsuarios")
          .then((respuesta) => {
            this.ListaUsuarios = respuesta.data.lista;
          })
          .catch(err => {
            console.log(err);
          });
      this.MostrarSpinner = false;
    },
    verPermisos(ListaUser) {
      this.DatosUsuario = ListaUser;
      this.modalVerpermisos = true;
    },
    cerrarModalVerPermisos() {
      this.modalVerpermisos = false
    },
    mostrarModalEdicion(ListaUser) {
      this.DatosUsuario = ListaUser;
      this.modalEditarUsuario = true;
    },
    cerrarModalEdicion() {
      this.modalEditarUsuario = false
      this.fetch();
    },

    async eliminarUsuario(ListaUser) {
      this.idUsuario = ListaUser.userID;
      console.log(this.idUsuario);
      await this.axios.put(`/api/Usuarios/Eliminar/${this.idUsuario}`)
        .then((respuesta) => {
          alert("Eliminado con exito");
          this.fetch();
        }).catch(error => {

        });
    }

  }
}
</script>
<style>
.custom-margin-botonN{
  margin-left: 115px; /* Ajusta el valor según tus necesidades */
}
.table-container {
  max-height: 320px; /* ajusta la altura máxima según tus necesidades */
  overflow-y: auto;
}
.table th.nowrap,
 .table td.nowrap {
   white-space: nowrap;
   width: 30%;
 }

 .modal-overlay {
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   background: rgba(0, 0, 0, 0.5);
   /* Fondo oscuro semitransparente */
   z-index: 1040;
   /* Asegura que el overlay esté detrás del modal */
   cursor: pointer;
   /* Cambia el cursor al hacer clic */
 }</style>