<template>
  <div class="spinner-container" v-if="visible">
    <span class="loader"></span>
  </div>
</template>

<script>
export default{
props:{
    visible: Boolean,
}
}
</script>

<style scoped>
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1); /* Fondo semitransparente para hacerlo visible */
}
.loader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  border: 10px solid;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 1);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>