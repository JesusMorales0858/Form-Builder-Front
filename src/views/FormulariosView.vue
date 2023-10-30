<template>
  <div class="container">
    <div class="col p-3 ">
      <h6 class="text-center h5">Lista de formularios</h6>
    </div>
    <div class="row p-3">
      <div class="col">
        <router-link to="/gestionModulos" class="btn btn-primary">Nuevo</router-link>
      </div>
      <div class="col">
        <div class="d-flex justify-content-end">
          <div class="btn btn-secondary">
            Filter
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table align-middle mx-auto">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo del formulario</th>
            <th scope="col">Descripcion</th>
            <th scope="col" class="nowrap">Operaciones</th>
          </tr>
        </thead>
        <tbody v-for="Listaform of ListaFormularios" :key="Listaform.idConfigForm">
          <tr>
            <th scope="row">{{ Listaform.idConfigForm }}</th>
            <td>{{ Listaform.titulo }}</td>
            <td>{{ Listaform.descripcion }}</td>
            <td class="nowrap">
              <div class="row">
                <div class="col-auto">
                  <button class="btn btn-warning mx-1" v-on:click="asd" disabled>Editar</button>
                </div>
                <div class="col-auto">
                  <button class="btn btn-danger mx-1" v-on:click="eliminarform(Listaform.idConfigForm)">Eliminar</button>
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
import axios from "axios";
export default {
  name: "Formularios",
  data: function () {
    return { ListaFormularios: [] }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      let result = axios.get("/api/ConfigForm/ListaFormulariosCRUD") 
        .then((respuesta) => {
          this.ListaFormularios = respuesta.data.lista
        })
        .catch(err => {
          console.log(err);
        });
    },

    eliminarform(idConfigForm) {
      var enviar = {
        "IdConfigForm": idConfigForm
      }
      axios.put(`/api/ConfigForm/EliminarModulo/${idConfigForm}`)
        .then(datos => {
          console.log(datos);
          this.AlertEliminado();
          this.fetch();
        });
    },
    //Alerts
    AlertEliminado() { alert('Se eliminó correctamente.'); }

  }
}
</script>
<style> .table th.nowrap,
 .table td.nowrap {
   white-space: nowrap;
   width: 25%;
 }
</style>