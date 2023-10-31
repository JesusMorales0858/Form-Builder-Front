<template>
  <div class="container">
    <form @submit.prevent="iniciarSesion()">
      <!-- Usuario input -->
      <div class="form-outline mb-4">
        <input type="text" id="usuario" class="form-control" v-model="usuario" />
        <label class="form-label" for="usuario">Usuario</label>
      </div>

      <!-- Contraseña input -->
      <div class="form-outline mb-4">
        <input type="password" id="clave" class="form-control" v-model="clave" />
        <label class="form-label" for="clave">Contraseña</label>
      </div>

      <!-- 2 column grid layout for inline styling -->
      <div class="row mb-4">
        <div class="col">
          <!-- Checkbox -->
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
            <label class="form-check-label" for="form2Example31"> Recordar </label>
          </div>
        </div>

        <div class="row d-flex justify-content-center">
          <!-- Simple link -->
          <a href="#!">Olvidaste tu contraseña?</a>
        </div>
      </div>

      <!-- Submit button -->
      <div>
        <!-- Loading Lineal -->
        <div class="loadingLineal" v-show="loading">
          <h1>Linear loader</h1>
          <div class="bar-loadinglineal">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        <button v-show="!loading" type="submit" class="btn btn-primary btn-block mb-4">Acceder</button>
      </div>
      <!-- Register buttons -->
      <div class="text-center">
        <p>No tienes una cuenta? <a href="/registro">Registrate</a></p>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'acceso',
  data() {
    return {
      usuario: '',
      clave: '',
      loading: false
    }
  },
  methods: {
    async iniciarSesion() {
      var payload = {
        username: this.usuario,
        password: this.clave
      };
      this.loading = true;
      await this.axios.post('/api/Autenticacion/validar', payload)
        .then(response => {
          localStorage.setItem('token', response.data.token);
          this.$store.commit('setAuthenticated', true);
          this.$store.commit('setUsuario', response.data.usuario);
          this.$router.push('/Inicio');
        })
        .catch(response => {
          console.log(response.data)
        });
      this.loading = false;
    }
  }

}

</script>
<style>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form-container {
  width: 300px;
  /* Ancho form*/
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

@import url(https://fonts.googleapis.com/css?family=Lato:300,400);

.loadingLineal {
  padding: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Lato';
  color: #fff;
}

/* linear loading */
.bar-loadinglineal {
  align-items: center;
  position: relative;
  height: 5px;
  width: 100%;
  background-color: #bdbdbd;
}

.bar {
  content: "";
  display: inline;
  position: absolute;
  height: 5px;
  width: 0;
  right: 0;
}

.bar:nth-child(1) {
  background-color: #006495;
  animation: linear_loader 3s linear 1s infinite;
}

.bar:nth-child(2) {
  background-color: #006495;
  animation: linear_loader 3s linear 2s infinite;
}

.bar:nth-child(3) {
  background-color: #006495;
  animation: linear_loader 3s linear 3s infinite;
}

@keyframes linear_loader {
  0% {
    right: 100%;
    width: 10%;
  }

  30% {
    right: 0%;
    width: 40%;
  }

  50% {
    right: 0%;
    width: 0%;
  }

  80% {
    right: 0%;
    width: 0%;
  }

  100% {
    right: 0%;
    width: 0%;
  }
}

/* end linear loading */
</style>