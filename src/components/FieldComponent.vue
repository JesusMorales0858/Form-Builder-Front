

<template>
  <div class="form-group">
    <label style="margin-right: 10px;">{{ field.label }}</label>
    <input
      v-if="field.type === 'text' || field.type === 'password' || field.type === 'email' || field.type === 'number'"
      :type="field.type"
      :placeholder="field.placeholder"
      v-model="field.value"
      class="form-control"
    >
    <textarea v-else-if="field.type === 'textarea'"
      :placeholder="field.placeholder"
      v-model="field.value"
      class="form-control"
    ></textarea>
    <select v-else-if="field.type === 'select'" v-model="field.value" class="form-control">
      <option v-for="option in field.options" :value="option">{{ option }}</option>
    </select>
    <input v-else-if="field.type === 'checkbox'" type="checkbox" v-model="field.value" class="form-check-input">
    <!-- Agrega más condiciones para otros tipos de campos -->
  </div>
</template>

<script>
export default {
  props: ['field']
};
</script>

<style scoped>
input {
  margin-bottom: 5px;
}
select {
  margin-bottom: 5px;
}
</style>
