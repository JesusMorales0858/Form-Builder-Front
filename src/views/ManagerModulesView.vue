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
            <input :type="campos.tipo" :placeholder="campos.marcador" :class="campos.clase" :name="campos.nombre"
              :required="campos.requerido">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-auto">
          <div class="col  p-3 text-center">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
        <div class="col-auto">
          <div class="col  p-3 text-center">
            <button type="reset" class="btn btn-primary">Reset</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ManagerModulesView',
  data: function () {
    return { daform: [], dafield: [] }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const idConfigForm = this.$route.params.idConfigForm;

      axios.get(`http://localhost:5045/api/ConfigForm/MostrarFormularioCompleto/${idConfigForm}`)
        .then((respuesta) => {
          this.daform = respuesta.data;
          this.dafield = respuesta.data.datosField;
          console.log(respuesta.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    obtenerValores() {
      console.log("Va func");

      // Obtén una referencia al contenedor de campos dinámicos
      var contenedor = document.getElementById("ContenedorDeCampos");

      // Encuentra todos los elementos de formulario dentro del contenedor
      var campos = contenedor.querySelectorAll("input[type='text'], textarea, input[type='number']");

      // Crea un objeto para almacenar los valores
      var valores = {};

      // Recorre los campos y obtén sus valores
      campos.forEach(function(campo) {
        valores[campo.name] = campo.value;
      });

      // Haz lo que quieras con los valores (por ejemplo, mostrarlos en la consola)
      console.log(valores);
    }
  }
};
</script>
