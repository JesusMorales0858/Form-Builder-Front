<template>
  <nav class="navbar bg-dark navbar-dark" v-if="mostrarBarraNavegacion">
    <div class="container-fluid">
      <div>
        <button v-if="$store.state.isAuthenticated" class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar" v-on:click="fetch">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="navbar-brand">
        <div class="row">
          <!-- informacion de la sesion, cerrar sesion -->
          <div class="col-auto">
            <!--icono user-->
            <button class="navbar-toggler" v-on:click="abrirModalSesion()">
            <svg v-if="$store.state.isAuthenticated" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
              fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
            </button>
          </div>
            
            
        </div>
      </div>
      <div v-if="!$store.state.isAuthenticated">
        <router-link to="/" class="btn btn-secondary"> Iniciar Sesion </router-link>
      </div>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/Inicio" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/formularios" class="nav-link">Gestion de modulos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/usuarios" class="nav-link">Gestion de usuarios</router-link>
          </li>
          <li v-for="formulario of formularios" :key="formulario.idConfigForm">
            <router-link :to="`/grilla/${formulario.idConfigForm}`" class="nav-link">{{ formulario.titulo
            }}</router-link>
          </li>


        </ul>
      </div>
    </div>
  </nav>
  <div @click="cerrarModalSesion" class="modal-overlay" v-if="modalSesion">
    <router-view class="container">
    </router-view>
    <info-sesion v-if="modalSesion" @cerrar-modal="cerrarModalSesion"></info-sesion>
  </div>
</template>
<script>
import InfoSesionModal from '@/components/InfoSesionModal.vue'
export default {
  name: "BarraNavegacion",
  components:{
   'info-sesion': InfoSesionModal,
  },
  data: function () {
    return {
      formularios: [],
      modalSesion: false,
    };
  },
  computed: {
    mostrarBarraNavegacion() {
      return this.$route.name !== 'Acceder';
    }

  },
  /*watch:{
    '$route'(to, from){
      this.mostarBarraNavegacion = to.name != 'Acceder';
    }
  }, */
  async created() {
    // Verificar si el usuario está autenticado antes de hacer la solicitud a la API
    if (this.mostrarBarraNavegacion) {

      if (this.$store.state.isAuthenticated) {
        this.fetch();
      }
    }
  },
  methods: {
    async fetch() {
      await this.axios.get("/api/ConfigForm/ListaFormulariosMenu")
        .then((respuesta) => {
          this.formularios = respuesta.data.lista
        })
        .catch(err => {
          console.log(err);
        });
    },

    abrirModalSesion(){
      this.modalSesion = true;
    },
    cerrarModalSesion(){
      this.modalSesion = false;
    }
  }
};
</script>
<style>
nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
/* Estilo para el overlay que cubre el componente padre */
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
  z-index: 1040; /* Asegura que el overlay esté detrás del modal */
  cursor: pointer; /* Cambia el cursor al hacer clic */
}
</style>
