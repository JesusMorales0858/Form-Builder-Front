<template>
  <nav class="navbar bg-dark navbar-dark">
    <div class="container-fluid">
      <div class="navbar-brand">
        <!--icono user-->
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle"
          viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
        <!--  ********************************* -->
        Usuario
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" v-on:click="fetch">
        <!-- boton activador !!-->
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/formularios" class="nav-link">Gestion de modulos</router-link>
          </li>
          <li v-for="formulario of formularios" :key="formulario.idConfigForm">
            <router-link :to="`/grilla/${formulario.idConfigForm}`" class="nav-link">{{ formulario.titulo
            }}</router-link>
          </li>


        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>
<script>
import axios from "axios";

export default {
  name: "App",
  data: function () { return { formularios: [] } },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      let result = axios.get("http://localhost:5045/api/ConfigForm/ListaFormulariosMenu")
        .then((respuesta) => {
          this.formularios = respuesta.data.lista
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}*/</style>
