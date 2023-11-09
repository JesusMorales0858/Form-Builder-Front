<template>
  <barra-navegacion></barra-navegacion>
  <spinner :visible="MostrarSpinner"></spinner>
  <div v-if="!MostrarSpinner">
    <div>
      <h6 class="text-center h5">Lista de formularios</h6>
    </div>
    <div class="row p-3">
      <div class="col">
        <router-link to="/gestionModulos" class="btn btn-outline-primary" title="Nuevo" v-if="$store.state.permisos.includes(6)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg>
        Nuevo</router-link>
      </div>
    </div>

    <!-- mostrar mensaje si la api no tiene registros -->
    <div class="text-center" v-if="NoHayRegistros">
            <h3>
                <small class="text-muted">No hay formularios cargados</small>
            </h3>
        </div>


    <div class="table-responsive" v-if="$store.state.permisos.includes(7) && !NoHayRegistros && ListaFormularios.length > 0">
      <table class="table align-middle mx-auto">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Titulo del formulario</th>
            <th scope="col">Descripcion</th>
            <th scope="col" class="nowrap">Acciones</th>
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
                  <router-link :to="`/grilla/${Listaform.idConfigForm}`" class="btn btn-outline-secondary btn-sm ms-3" title="Acceder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-table"
                      viewBox="0 0 16 16">
                      <path
                        d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                    </svg>
                  Acceder</router-link>
                </div>
                <div class="col-auto">
                  <button class="btn btn-outline-danger btn-sm ms-3" title="Eliminar"
                    v-on:click="eliminarform(Listaform.idConfigForm)" v-if="$store.state.permisos.includes(8)">
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
import BarraNavegacion from '@/components/BarraNavegacion.vue';
import Spinner from '@/components/Spinner.vue';
export default {
  name: "Formularios",
  components: {
    'spinner': Spinner,
    'barra-navegacion': BarraNavegacion
  },
  data: function () {
    return {
      ListaFormularios: [],
      MostrarSpinner: false,
      NoHayRegistros: false,
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
     const respuesta =  await this.axios.get("/api/ConfigForm/ListaFormulariosCRUD")
        .then((respuesta) => {
          this.ListaFormularios = respuesta.data.lista

          //si no hay formularios en la respuesta de la api mostrar mensaje
          if (this.ListaFormularios.length == 0){
            this.NoHayRegistros=true
          console.log(this.ListaFormularios)}
        })
        .catch(err => {
          console.log(err);
        });
      this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
    },

    async eliminarform(idConfigForm) {
      var enviar = {
        "IdConfigForm": idConfigForm
      }
      await this.axios.put(`/api/ConfigForm/EliminarModulo/${idConfigForm}`)
        .then(datos => {
          this.AlertEliminado();
          this.fetch();
        });
    },
    //Alerts
    AlertEliminado() { alert('Se eliminó correctamente.'); }

  }
}
</script>
<style scoped> 
 .table th.nowrap,
 .table td.nowrap {
   white-space: nowrap;
   width: 25%;
 }</style>