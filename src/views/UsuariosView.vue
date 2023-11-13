<template>
  <ver-permisos :usuario-id="DatosUsuario.userID" @cerrar-modal-permisos="cerrarModalVerPermisos"
    v-if="modalVerpermisos"></ver-permisos>
  <editar-usuario :usuario-id="DatosUsuario.userID" @cerrar-modal-editar="cerrarModalEdicion" @guardar-exito="editarListo"
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
    <div class="container-sm">
      <div class="table-container">
        <table class="table align-middle mx-auto" v-if="$store.state.permisos.includes(2)"><!-- 3 -->
          <thead>
            <tr>
              <th scope="col">Nombre de usuario</th>
              <th scope="col"></th>
              <th scope="col">Permisos</th>
              <th scope="col" class="nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody v-for="ListaUser of ListaUsuarios" :key="ListaUser.usuarioId">
            <tr  :style="{ 'pointer-events': $store.state.rol === '0' ? 'none' : 'auto' }">
              <td>{{ ListaUser.username }}</td>
              <td>
                <button disabled class="btn btn-outline-success btn-sm ms-3" v-if="ListaUser.roleID === 1">Administrador</button>
              </td>
              <td>
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
                      v-on:click="mostarAlertaConfirmacion(ListaUser)" v-if="$store.state.permisos.includes(5)">
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
      <!-- Alerta de confirmación personalizada -->
      <div v-if="mostrarAlertaEliminar" class="alert alert-primary d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
          <use xlink:href="#info-fill" />
        </svg>
        <div>
          ¿Estás seguro de que deseas eliminar este registro?
          <button class="btn btn-outline-danger btn-sm ms-3" @click="eliminarUsuario(idUserToDelete)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Confirmar</button>
          <button class="btn btn-outline-secondary btn-sm ms-2" @click="cerrarAlertaConfirmacion">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill"
              viewBox="0 0 16 16">
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
            </svg>
            Cancelar</button>
        </div>
      </div> <!--fin alerta confirmacion-->
      <!--alerta suceso-->
      <alerta-suceso :visible="mostrarAlertaSuceso" :mensaje="mensajeAlertaSuceso" />
      <alerta-error :visible="mostrarAlertaError" :mensaje="mensajeAlertaError" />
    </div>

  </div>
</template>
<script>
import PermisosModal from '@/components/PermisosModal.vue';
import EditarUsuarioModal from '@/components/EditarUsuarioModal.vue';
import BarraNavegacion from '@/components/BarraNavegacion.vue';
import Spinner from '@/components/Spinner.vue';
import AlertaSuceso from '@/components/AlertaSuceso.vue';
import AlertaError from '@/components/AlertaError.vue';
export default {
  name: "Formularios",
  components: {
    'barra-navegacion': BarraNavegacion,
    'ver-permisos': PermisosModal,
    'editar-usuario': EditarUsuarioModal,
    'spinner': Spinner,
    'alerta-suceso': AlertaSuceso,
    'alerta-error': AlertaError,
  },
  data: function () {
    return {
      MostrarSpinner: false,
      ListaUsuarios: [],
      modalVerpermisos: false,
      modalEditarUsuario: false,
      idUsuario: null,
      mostrarAlertaEliminar: false,
      mostrarAlertaSuceso: false,
      mostrarAlertaError: false,
      mensajeAlertaSuceso: '',
      mensajeAlertaError: '',
      idUserToDelete: null
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
            console.log(respuesta.data.lista);
          })
          .catch(err => {
            this.mensajeAlertaError = 'Error del servidor';
            this.mostrarAlertaError = true;
            setTimeout(() => {
              this.mostrarAlertaError = false;
            }, 2000);
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
    },
    editarListo() {
      this.modalEditarUsuario = false
      this.mensajeAlertaSuceso = 'Modificado exitosamente';
      this.mostrarAlertaSuceso = true;
      this.fetch();

      setTimeout(() => {
        this.mostrarAlertaSuceso = false;
      }, 2000);
    },
    mostarAlertaConfirmacion(ListaUser) {
      this.mostrarAlertaEliminar = true;
      this.idUserToDelete = ListaUser.userID; // Guarda el idConfigForm en data
    },
    cerrarAlertaConfirmacion() {
      this.mostrarAlertaEliminar = false;
    },
    async eliminarUsuario() {
      this.mostrarAlertaEliminar = false;
      await this.axios.put(`/api/Usuarios/Eliminar/${this.idUserToDelete}`)
        .then((respuesta) => {
          this.mensajeAlertaSuceso = 'Eliminado exitosamente';
          this.mostrarAlertaSuceso = true;
          this.fetch();
          setTimeout(() => {
            this.mostrarAlertaSuceso = false;
          }, 2000);
        }).catch(error => {
          this.mensajeAlertaError = 'Error del servidor';
          this.mostrarAlertaError = true;
          this.fetch();
          setTimeout(() => {
            this.mostrarAlertaError = false;
          }, 2000);
        });
    }

  }
}
</script>
<style>
.custom-margin-botonN {
  margin-left: 115px;
  /* Ajusta el valor según tus necesidades */
}

.table-container {
  max-height: 320px;
  /* ajusta la altura máxima según tus necesidades */
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
}
</style>