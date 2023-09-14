<template>
    <div class="container">
        <div class="col p-3 ">
            <h6 class="text-center h5">Grilla dinamica</h6>
        </div>
        <div class="row p-3">
            <div class="col">
                <router-link :to="`/modules/${idConfigForm}`" class="btn btn-primary"> Nuevo </router-link>
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
                        <th scope="col">#</th>
                        <th scope="col">#</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ManagerGrillaView',
    data() {
      return {
        idConfigForm: null // Inicializa idConfigForm en null
      };
    },
    created() {
      this.fetch();
    },
    methods: {
      fetch() {
        const idConfigForm = this.$route.params.idConfigForm;
        this.idConfigForm = idConfigForm; // Asigna el valor a idConfigForm
        console.log('ID', this.idConfigForm); 
      }
    }
  };

</script>