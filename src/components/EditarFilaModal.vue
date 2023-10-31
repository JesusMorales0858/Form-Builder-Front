<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Fila</h5>
          <button type="button" class="btn-close" @click="cerrarModal" aria-label="Cerrar"></button>
        </div>
        <!--<div class="modal-body">
          <div v-for="campo of dafield" :key="campo.id_Field">
            <label :for="campo.nombre">{{ campo.etiqueta }}</label>
            <input :type="campo.tipo" :placeholder="campo.marcador" :class="campo.clase" :name="campo.nombre"
              :required="campo.requerido" v-model="filaEditadaPorNombre[campo.nombre]">
          </div>
        </div>-->
        <div class="modal-body">
          <div v-for="campo of dafield" :key="campo.id_Field">
            <label :for="campo.nombre">{{ campo.etiqueta }}</label>
            <select v-if="campo.tipo === 'select'" :name="campo.nombre" :class="campo.clase" :required="campo.requerido" v-model="filaEditadaPorNombre[campo.nombre]">
              <option v-for="opcion in campo.opciones ? campo.opciones.split(',') : []" :value="opcion.trim()">{{ opcion.trim() }}</option>
            </select>
            <input v-else :type="campo.tipo" :placeholder="campo.marcador" :class="campo.clase" :name="campo.nombre" :required="campo.requerido" v-model="filaEditadaPorNombre[campo.nombre]">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="guardarEdicion">Guardar</button>
        </div>
        <!-- Spinner: lo mostramos si loading es true -->
        <div class="d-flex justify-content-center" v-if="loading">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AlertaSuceso from "../components/AlertaSuceso.vue";
export default {
  name: 'EditarFilaModal',
  components:{
    AlertaSuceso,
  },
  props: {
    fila: Object,
    campoTexto: String,
  },
  data() {
    return {
      filaEditadaPorNombre: {}, // Objeto para mostrar en el formulario HTML
      filaEditadaPorIdAnswer: {}, // Objeto para enviar a la API
      dafield: [],
      id_DelFormulario: null,
      id_DeFila: null,
      loading: false, // Agregamos la variable de loading para controlar el spinner
      datosDeLaFila: null, // Agregar esta línea
      mostrarAlertaSuceso: false, // visibilidad alerta de suceso
      mensajeAlertaSuceso: ""  //mensaje de alerta de suceso vacio
    };
  },
  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      // Inicializa el spinner

      this.loading = true;

      this.id_DelFormulario = this.fila[1].id_ConfigForm;
      this.id_DeFila = this.fila[0];

      // Solicitud que trae los datos para construir el formulario
      this.axios.get(`/api/ConfigForm/MostrarFormularioCompleto/${this.id_DelFormulario}`)
        .then((estructuraDelFormulario) => {
          this.dafield = estructuraDelFormulario.data.datosField;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          // Finaliza el spinner
          this.loading = false;
        });

      // Solicitud que trae los datos de la fila seleccionada
      this.axios.get(`/api/ConfigForm/ListaRespuestasIdentificadorFila/${this.id_DelFormulario}/${this.id_DeFila}`)
        .then((DatosFila) => {
          this.datosDeLaFila = DatosFila.data.lista; // Asignar a datosDeLaFila
          this.filaEditadaPorNombre = {};
          this.filaEditadaPorIdAnswer = {};

          this.datosDeLaFila.forEach((campo) => {
            this.filaEditadaPorNombre[campo.nombre] = campo.valor;
            this.filaEditadaPorIdAnswer[campo.id_Answer] = campo.valor;
          });

        })
        .catch(err => {
          console.log(err);
        });
    },

    cerrarModal() {
      this.$emit('cerrar-modal');
    },
    guardarEdicion() {
      if (this.datosDeLaFila) {
        const ediciones = [];
        for (const campoNombre in this.filaEditadaPorNombre) {
          const campo = this.datosDeLaFila.find(item => item.nombre === campoNombre);
          if (campo) {
            const id_Answer = campo.id_Answer;
            ediciones.push({
              id_Answer: id_Answer,
              valor: this.filaEditadaPorNombre[campoNombre].toString()
            });
          }
        }
        this.axios
          .post("/api/ConfigForm/Respuestas/Editar", ediciones)
          .then((response) => {
            // Procesar la respuesta del servidor si es necesario
            this.cerrarModal();
          })
          .catch((err) => {
            console.error("Error al guardar las ediciones:", err);
            // Manejar el error apropiadamente
          });
      }


    }

  }
}
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

/* ...otros estilos... */
</style>