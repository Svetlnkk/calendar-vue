<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + name" />
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.svg-icon {
  width: 20px;
  height: 20px;
  overflow: hidden;
}
</style>
