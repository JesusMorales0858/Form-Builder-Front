<template>
    <barra-navegacion></barra-navegacion>
    <div class="title">Crea un nuevo usuario</div> 
    <div class="container">
          <form @submit.prevent="crearUsuario">
        <!-- Usuario input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="usuario">Usuario</label>
          <input type="text" id="usuario" class="form-control" v-model="usuario" required />
        </div>
  
        <!-- Contraseña input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="clave">Contraseña</label>
          <input type="password" id="clave" class="form-control" v-model="clave" required />
        </div>
        
        <!-- Permisos input -->
        <div class="form-group">
            <label for="permisos">Permisos:</label>
            <br>
            <div class="permisos-check">
            <div class="form-check" v-for="(permiso, index) in permisos" :key="index">
              <input
                type="checkbox"
                :id="permiso"
                class="form-check-input"
                :value="index+1"
                v-model="permisosSeleccionados"
              />
              <label :for="permiso" class="form-check-label"> {{ permiso }}</label>
              </div>
            </div>
          </div>
        <!-- Submit button -->
        <br>
        <div>
              <button type="reset" class="btn btn-outline-secondary btn-sm m-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path
                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
              Cancelar</button>
              <button v-show="!loading" type="submit" class="btn btn-outline-success btn-sm m-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill"
                viewBox="0 0 16 16">
                <path
                  d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5v-13Z" />
                <path
                  d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V16Zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V0ZM9 1h2v4H9V1Z" />
              </svg>
              Guardar</button>
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
  import BarraNavegacion from '@/components/BarraNavegacion.vue';
  export default {
    name: 'acceso',
    components:{
      'barra-navegacion':BarraNavegacion,
    },
    data() {
      return {
        usuario: '',
        clave: '',
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
        permisosSeleccionados:[],
        loading: false,
        error: null // Agregamos una variable para el mensaje de error
      };
    },
    methods: {
      async crearUsuario() {
        var payload = {
        username: this.usuario,
        password: this.clave,
        roleID: 0,
        permisos: this.permisosSeleccionados.map(permisoId => ({ permisoId:permisoId }))
      };
        console.log(payload)
  
        // Realizamos la solicitud POST
        await this.axios.post('/api/Usuarios/guardarUsuario', payload)
          .then(response => {
            
            this.$router.push('/usuarios');
            alert("guardado con exito");
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
    .permisos-check {
  max-height: 210px; /* ajusta la altura máxima según tus necesidades */
  overflow-y: auto;
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
    </style>