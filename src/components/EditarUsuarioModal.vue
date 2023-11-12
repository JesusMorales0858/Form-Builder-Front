<template>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <label class="text-muted fs-7">Editar usuario</label>
            <button type="button" class="btn-close" @click="cerrarModal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <!-- Spinner: lo mostramos si loading es true -->
            <div class="d-flex justify-content-center" v-if="loading">
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
            <div v-if="!loading">
              <form @submit.prevent="updateUser()">
                <!-- datos cargados -->
                <div>
                  <div class="form-group">
                    <label for="nombreUsuario">Usuario</label>
                    <input
                      class="form-control"
                      id="nombreUsuario"
                      type="text"
                      v-model="datosUsuariosCargados"
                      placeholder="Ingresar nombre de usuario"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="clave">Contraseña</label>
                    <input
                      class="form-control"
                      id="clave"
                      type="password"
                      placeholder="Ingresar contraseña nueva"
                      v-model= "clave"
                    />
                  </div>
                </div>
                <!-- permisos cargados -->
                <div class="form-check" v-for="(permiso, index) in permisos" :key="index">
                  <input
                    type="checkbox"
                    :id="permiso"
                    class="form-check-input"
                    :value="index + 1"
                    v-model="permisosSeleccionados"
                    @change="seleccionarTodosSiEsNecesario"
                  />
                  <label :for="permiso" class="form-check-label">{{ permiso }}</label>
                </div>
                <div class="form-check">
    <input
      type="checkbox"
      id="todos"
      class="form-check-input"
      @change="marcarDesmarcarTodos"
      :checked="todosSeleccionados"
    />
    <label for="todos" class="form-check-label">Todos</label>
  </div>
                <div class="modalFooter text-center">
                  <button type="button" class="btn btn-outline-danger btn-sm m-1" @click="cerrarModal">Cerrar</button>
                  <button type="button" class="btn btn-outline-success btn-sm m-1" @click="guardarEdicion">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AlertaSuceso from "../components/AlertaSuceso.vue";
  export default {
    name: 'EditarFilaModal',
    components: {
      AlertaSuceso,
    },
    props: {
      usuarioId: Number,
    },
    data() {
      return {
        loading: false,
        permisos: [
          'Crear formularios',
          'Editar usuarios',
          'Ver formularios creados!',
          'Eliminar formularios',
          'Responder formularios',
          'Crear usuarios',
          'Ver usuarios',
          'Editar Respuestas',
          'Editor permisos de usuarios',
          'Eliminar Usuarios',
          'Eliminar Respuestas',
          'Ver Respuestas'
        ],
        permisosSeleccionados: [],
        datosUsuariosCargados: {},
        NuevoNombreUsuario: "",
        clave:""
      };
    },
    computed: {
      todosSeleccionados() {
        return this.permisosSeleccionados.length === this.permisos.length;
      },
    },
    created() {
      this.fetch();
    },
    methods: {
      async fetch() {
        this.loading = true;
        //solicitud a la api para obtener los permisos por id de usuario
        await this.axios.get(`/api/Permisos/ObtenerPermisosUsuario/${this.usuarioId}`)
          .then((respuesta => {
            const permisosUsuario = respuesta.data.usuario.map((permiso) => permiso.funcionId);
            // Marcar los checkbox según los permisos del usuario
            this.permisosSeleccionados = permisosUsuario;
            console.log(permisosUsuario)
          }))
          .catch(error => {
            console.log(error)
          });
        await this.axios.get(`/api/Usuarios/ObtenerUsuarioPorID/${this.usuarioId}`)
          .then((respuesta2 => {
            console.log(respuesta2.data.usuario);
            this.datosUsuariosCargados = respuesta2.data.usuario.username;
          }))
          .catch(error => {
            console.log(error)
          });
          this.loading = false;
      },
      cerrarModal() {
        this.$emit('cerrar-modal-editar');
      },
      async guardarEdicion() {
      const data = {
        userID: this.usuarioId,
        username: this.datosUsuariosCargados,
        roleID: 0, // Ajusta según la lógica de tu aplicación
        permisos: this.permisosSeleccionados.map(permisoId => ({
          permisoId: permisoId
        }))
      };
      if (this.clave) {
        data.password = this.clave;
    }

      try {
        // Realiza la solicitud a la API con los datos
        console.log(data)
        await this.axios.put(`api/Usuarios/editarUsuario/${this.usuarioId}`, data);   
        // Puedes emitir un evento o mostrar una alerta de éxito
        this.$emit('guardar-exito');
        alert("guardado con exito");
      } catch (error) {
        // Maneja los errores de la solicitud (puedes mostrar una alerta de error)
        console.error(error);
      }
    },
     /* seleccionarTodosSiEsNecesario() {
        if (this.todosSeleccionados) {
          this.permisosSeleccionados = Array.from({ length: this.permisos.length }, (_, i) => i + 1);
        }
      },
      marcarDesmarcarTodos() {
    if (this.todosSeleccionados) {
      this.permisosSeleccionados = Array.from({ length: this.permisos.length }, (_, i) => i + 1);
    } else {
      this.permisosSeleccionados = [];
    }
  },*/
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para el componente EditarFilaModal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-dialog {
    background: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  /* Estilos para el formulario y botones dentro del modal */
  .form-group {
    margin-bottom: 10px;
  }
  /* Estilos para los inputs del formulario */
.form-control {
  font-size: 0.8rem; /* Ajusta el tamaño de la fuente según tus preferencias */
  padding: 0.5rem; /* Ajusta el padding según tus preferencias */
}

/* Estilos para los checkboxes dentro del formulario */
.form-check-input {
  width: 16px; /* Ajusta el ancho según tus preferencias */
  height: 16px; /* Ajusta la altura según tus preferencias */
}
  /* Estilos para el pie del formulario (botones) */
  .modalFooter {
    margin-top: 10px;
  }
  
  /* ...otros estilos... */
  </style>
  