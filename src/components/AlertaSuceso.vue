<template>
    <div v-if="visible" class="alert alert-success d-flex align-items-center" role="alert">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
        <use xlink:href="#check-circle-fill" />
      </svg>
      <div>
        {{ mensaje }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean,
      mensaje: String,
    },
  };
  </script>
  