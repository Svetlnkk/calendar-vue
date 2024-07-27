<script setup lang="ts"></script>

<template>
  <div class="dashboard-content">
    <div class="dashboard-content__description">
      Привет, это учебный компонент - календарь!
    </div>
    <router-link
      class="dashboard-content__link"
      to="/calendar"
      title="Calendar"
    >
      <span>Смотреть</span>
      <svg-icon name="arr-r" />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.dashboard-content {
  display: flex;
  gap: 16px;
  align-items: center;

  &__description {
    font-size: 18px;
  }

  &__link {
    display: flex;
    gap: 8px;
    font-size: 18px;
    color: var(--primary-color);
  }
}
</style>
