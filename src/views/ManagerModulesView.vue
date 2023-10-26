<template>
  <div class="container">
    <form @submit.prevent="obtenerValores">
      <div id="ContenedorDeCampos">
        <div class="form-group">
          <div v-for="formulario of daform" :key="formulario.idConfigForm">
            <div class="col p-3 ">
              <h6 class="text-center h5">{{ formulario.titulo }}</h6>
              <p class="text-center">{{ formulario.descripcion }}</p>
            </div>
          </div>
          <div v-for="campos of dafield" :key="campos.id_Field">
            <label :for="campos.nombre">{{ campos.etiqueta }}</label>
            <!-- Si el tipo es "select", renderiza un select -->
            <select v-if="campos.tipo === 'select'" :name="campos.nombre" :class="campos.clase" :required="campos.requerido" :identificador="campos.id_Field">
  <option v-for="opcion in campos.opciones ? campos.opciones.split(',') : []" :value="opcion.trim()">{{ opcion.trim() }}</option>
</select>

            <!-- Si no, renderiza un input según el tipo -->
            <input v-else :type="campos.tipo" :placeholder="campos.marcador" :class="campos.clase" :name="campos.nombre" :required="campos.requerido" :identificador="campos.id_Field">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-auto">
          <div class="col  p-3 text-center">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </div>
        <div class="col-auto">
          <div class="col  p-3 text-center">
            <button type="reset" class="btn btn-primary">Reset</button>
          </div>
        </div>
      </div>
    </form>
    <!-- Spinner: lo mostramos si loading es true -->
    <div class="d-flex justify-content-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ManagerModulesView',
  data: function () {
    return { daform: [], dafield: [], loading: false }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {

      //inicializa el spinner
      this.loading = true;


      const idConfigForm = this.$route.params.idConfigForm;

      axios.get(`http://localhost:5045/api/ConfigForm/MostrarFormularioCompleto/${idConfigForm}`)
        .then((respuesta) => {
          this.daform = respuesta.data;
          this.dafield = respuesta.data.datosField;
          console.log(this.dafield);
        })
        .catch(err => {
          console.log(err);
        }).finally(() => {
          //finaliza el spinner
          // Ocultamos el spinner luego de finalizar la solicitud
          this.loading = false;
        });
    },
    obtenerValores() {

      // Obtén una referencia al contenedor de campos dinámicos
      var contenedor = document.getElementById("ContenedorDeCampos");

      // Encuentra todos los elementos de formulario dentro del contenedor
      var campos = contenedor.querySelectorAll("input[type='text'], textarea, input[type='number'], select");

      // Crea un objeto para almacenar los valores
      var valores = [];

      //recuperar valor del idConfigForm
      var idConfigForm = this.$route.params.idConfigForm;

      // Recorre los campos y obtén sus valores
      campos.forEach(function (campo) {
        valores.push({
          id_ConfigForm: idConfigForm,  // Puedes ajustar este valor según tus necesidades
          id_Field: campo.getAttribute("identificador"),  // Utiliza getAttribute para obtener el valor de key
          valor: campo.value,
        });

      });
      //enviar valores a la api
      // Realiza una solicitud POST a la API para guardar los registros
      axios.post('http://localhost:5045/api/ConfigForm/Respuestas/Guardar', valores)
        .then((respuesta) => {

          //redirigir a la grilla dinamica
          this.$router.push(`/grilla/${idConfigForm}`);

        })
        .catch(err => {
          console.log('Error al guardar los registros:', err);
        });


    }
  }
};
</script>
