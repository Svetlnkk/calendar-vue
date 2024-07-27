<script setup>
import { menu_types } from "@/types/menuType";
</script>

<template>
  <header class="header">
    <div class="header__menu">
      <nav class="header__nav">
        <template v-for="menu in menu_types" :key="menu.label">
          <router-link :to="menu.url" :data-text="menu.label">
            {{ menu.label }}
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  --font-size-lg: 18px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  background-color: var(--border-color);
  padding: 0px 16px;
  z-index: 3;
}
.header__menu {
  display: flex;
  width: 100%;
}

.header__nav {
  display: none;
}

.nav {
  padding: 36px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__link {
    &__group {
      display: flex;
      flex-direction: column;
    }
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__submenu {
    margin-top: 16px;
    padding: 0 20px;
    display: flex;
    font-size: 14px;
    flex-direction: column;
    gap: 16px;
  }
}

@media (min-width: 768px) {
  .header__menu {
    display: flex;
  }
  .header {
    padding: 0px 32px;
  }
}

@media (min-width: 1200px) {
  .header {
    padding: 0px 32px;
  }

  .header__menu {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }

  .header__nav {
    display: flex;
    align-self: flex-start;
    align-items: center;
    height: 56px;
    gap: 24px;

    a {
      color: var(--header-text-color);
      font-size: 14px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    a:hover,
    a:focus-visible {
      text-decoration: underline;
    }

    a::after {
      content: attr(data-text);
      content: attr(data-text) / "";
      height: 0;
      visibility: hidden;
      overflow: hidden;
      user-select: none;
      pointer-events: none;
      font-weight: var(--font-weight-bold);
    }

    .router-link-active {
      color: var(--header-text-color);
      font-weight: var(--font-weight-bold);
    }
  }
}

@media (min-width: 1400px) {
  .header__nav {
    gap: 32px;
  }
  .header__menu {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }
}
@media (min-width: 1600px) {
  .header__nav {
    gap: 32px;
  }
}

@media (min-width: 1850px) {
  .header {
    padding: 0px calc(100% / 2 - 1780px / 2);
  }
}
</style>
