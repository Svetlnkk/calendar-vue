<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="page-label__wrapper">
    <div class="page-label">
      <div class="page-label__name">{{ name }}</div>
      <div class="page-label__description">{{ description }}</div>
    </div>
    <slot name="value"></slot>
  </div>
</template>

<style scoped lang="scss">
.page-label {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__name {
    font-weight: 700;
    font-size: 32px;
  }

  &__description {
    color: #d6d6d6;
  }

  @media screen and (max-width: 768px) {
    &__wrapper {
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 16px;
    }

    &__name {
      font-size: 24px;
    }
  }
}
</style>
