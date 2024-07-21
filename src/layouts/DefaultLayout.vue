<script setup lang="ts">
import AppHeader from "../components/app/AppHeader.vue";
</script>

<template>
  <AppHeader />

  <main
    :class="{
      'page-container': true,
    }"
  >
    <slot />
  </main>
</template>

<style scoped lang="scss">
.page-container {
  overflow: auto;
  padding: 24px 16px 8px;
  position: relative;
  height: auto;
}

::-webkit-scrollbar {
  // width: 16px;
  width: 6px;
  height: 16px;
}

::-webkit-scrollbar-track {
  background-color: #ffffff00;
}

::-webkit-scrollbar-thumb {
  background-color: #049be8;
  border: 2px solid var(--primary-color);
}

@media screen and (min-width: 768px) {
  .page-container {
    padding: 24px 32px 8px;
    height: calc(100vh - var(--header-height));
  }
}

@media screen and (min-width: 1200px) {
  .page-container {
    padding: 30px 32px 8px;
    background: #fcfcfc;
  }
}

@media screen and (min-width: 1850px) {
  .page-container {
    padding: 30px calc(100% / 2 - 1780px / 2) 8px;
  }
}

@media screen and (max-width: 1199px) {
  .page-container {
    background-image: none !important;
  }
}
</style>
