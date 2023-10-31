<template>
  <div class="title">Registro de Usuario</div> 
  <div class="container">
    
        <form @submit.prevent="registrarUsuario">
      <!-- Usuario input -->
      <div class="form-outline mb-4">
        <input type="text" id="usuario" class="form-control" v-model="usuario" required />
        <label class="form-label" for="usuario">Usuario</label>
      </div>

      <!-- Contraseña input -->
      <div class="form-outline mb-4">
        <input type="password" id="clave" class="form-control" v-model="clave" required />
        <label class="form-label" for="clave">Contraseña</label>
      </div>

      <!-- Submit button -->
      <div>
        <button v-show="!loading" type="submit" class="btn btn-primary btn-block mb-4">Registrar</button>
        <div class="loadingLineal" v-show="loading">
          <h1>Linear loader</h1>
          <div class="bar-loadinglineal">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
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
      loading: false,
      error: null // Agregamos una variable para el mensaje de error
    };
  },
  methods: {
    async registrarUsuario() {
      var payload = {
        userID: 0,
        username: this.usuario,
        password: this.clave,
        roleID: 1
      };
      this.loading = true;
      this.error = null; // Limpiamos el mensaje de error

      // Realizamos la solicitud POST
      await this.axios.post('/api/Registro/nuevoUsuario', payload)
        .then(response => {
          
          this.$router.push('/');
        })
        .catch(error => {
          // Verificamos si el error es debido a que el usuario ya existe
          if (error.response && error.response.status === 400) {
            this.error = 'Este usuario ya existe';
          } else {
            console.log('Error en el registro:', error);
          }
        });

      this.loading = false;
    }
  }
};
</script>

  <style>
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em; /* Puedes ajustar el tamaño de la fuente según tus preferencias */
    margin-top: 30px; /* Agrega un margen superior de 20px */
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
  }
  
  .form-container {
    width: 300px; /* Ancho form*/
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  @import url(https://fonts.googleapis.com/css?family=Lato:300,400);
  
  .loadingLineal{
    text-align: center;
    font-family: 'Lato';
    color: #fff;
  }
  
  /* linear loading */
  .bar-loadingLineal{
    position: relative;
    height: 5px;
    width: 100%;
    background-color: #bdbdbd;
  }
  
  .bar{
    content: "";
    display: inline;
    position: absolute;
    height: 100%;
    width: 0;
    right: 0;
  }
  
  .bar:nth-child(1) {
    background-color: #006495;
    animation: linear_loader 3s linear 1s infinite;
  }
  
  .bar:nth-child(2) {
    background-color: #F2635F;
    animation: linear_loader 3s linear 2s infinite;
  }
  
  .bar:nth-child(3) {
    background-color: #F4D00C;
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