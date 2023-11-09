<template>
  <barra-navegacion></barra-navegacion>
  <div class="background-container">
  </div>
</template>
<script>
import BarraNavegacion from '@/components/BarraNavegacion.vue';
export default{
  components:{
        'barra-navegacion': BarraNavegacion,
    },
}
</script>
<style>
.background-container {
  /* Establece la imagen de fondo */
  background-image: url('../assets/home.jpeg'); 
  
  /* Ajusta el tamaño de la imagen de fondo según tus necesidades */
  background-size: 1100px 740px;
  
  /* Centra la imagen de fondo */
  background-position: center;
  
  /* Establece una altura y anchura mínimas para el contenedor */
  min-height: 100vh; /* Ajusta la altura mínima según tus necesidades */
  min-width: 100%; /* Ajusta la anchura mínima según tus necesidades */
  
  /* Otros estilos de diseño si es necesario */
  color: white; /* Color del texto */
  font-size: 24px; /* Tamaño de fuente del texto */
}

/* Otros estilos de CSS para tu contenido, si es necesario */
</style>
