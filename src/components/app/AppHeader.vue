<script setup>
import { ref } from "vue";
import { menu_types } from "@/types/menuType";

const isVisibleAppMenu = ref(false);
const subMenuActive = ref();

function showAppMenu() {
  isVisibleAppMenu.value = !isVisibleAppMenu.value;
}

function showSubMenu(name) {
  if (subMenuActive.value !== name) {
    subMenuActive.value = name;
  } else {
    subMenuActive.value = "";
  }
}
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
    <div class="header__btn-group">
      <div id="header_panel_search"></div>

      <button class="header__burger" @click="showAppMenu">
        <div></div>
      </button>
      <!-- <Sidebar
        v-model:visible="isVisibleAppMenu"
        position="right"
        :pt="{
          root: { class: 'header__sidebar' },
          closeIcon: { class: 'header__close-icon' },
          mask: { class: 'header__overlay' },
        }"
      >
        <nav class="header__nav--mobile">
          <ul class="nav">
            <template v-for="menu in menu_types" :key="menu.label">
              <ul v-if="menu.submenu" class="nav__link__group">
                <div class="nav__menu" @click="showSubMenu(menu.label)">
                  <span>{{ menu.label }}</span>
                  <svg-icon
                    name="arr-r"
                    class="nav__icon"
                    :class="{ ['active']: menu.label === subMenuActive }"
                  />
                </div>
                <div class="nav__submenu" v-if="menu.label === subMenuActive">
                  <li
                    v-for="subMenu in menu.submenu"
                    :key="subMenu.label"
                    class="nav__link"
                  >
                    <router-link
                      exact
                      @click="showAppMenu"
                      :to="menu.url + subMenu.url"
                    >
                      {{ subMenu.label }}</router-link
                    >
                  </li>
                </div>
              </ul>

              <li v-else class="nav__link">
                <router-link @click="showAppMenu" :to="menu.url">
                  {{ menu.label }}
                </router-link>
              </li>
            </template>
          </ul>
        </nav>
      </Sidebar> -->
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
  background-color: var(--primary-color);
  padding: 0px 16px;
  z-index: 3;
  &__notify {
    color: #ffffff;
    width: 24px;
    height: 24px;
    position: relative;
    cursor: pointer;
    .amount {
      width: 17px;
      height: 17px;
      background-color: #91ba4e;
      border-radius: 100%;
      color: #ffffff;
      font-size: 9px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: -3px;
      top: -3px;
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }
}
.header__menu {
  display: flex;
  width: 100%;
}

.header__logo {
  cursor: pointer;
  height: 22px;
  width: 41px;
  color: var(--primary-text-color);

  svg {
    width: 100%;
    height: 100%;
  }
}

.header__nav {
  display: none;
}

.header__nav--mobile {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .header__nav-link--mobile {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 24px;

    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }

    svg {
      height: 24px;
      width: 24px;
    }
  }

  .router-link-exact-active {
    font-weight: var(--font-weight-bold);
    color: var(--primary-color);
  }
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

  &__icon {
    transform: rotate(90deg);
    transition: transform 0.3s ease-in-out;

    &.active {
      transform: rotate(-90deg);
    }
  }
}

.header__btn-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  width: 70%;
}

.header__notification {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  width: 22px;
  color: var(--primary-text-color);
  background-color: transparent;
  padding: 0;
  outline: none;
  border: none;
  transition: transform ease-in-out 0.2s;

  &:hover,
  &:focus-visible {
    transform: scale(1.1);
    background-color: transparent;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

.notification__title-container {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-hover-color);

  .notification__title {
    color: var(--primary-color);
    font-size: 20px;
    font-weight: var(--font-weight-bold);
  }
}

.header__user {
  cursor: pointer;
  height: 22px;
  width: 22px;
  color: var(--primary-text-color);
  background-color: var(--border-hover-color);
  padding: 0;
  outline: none;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--primary-text-color);
  transition: transform ease-in-out 0.2s;

  &:hover,
  &:focus-visible {
    transform: scale(1.1);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: transparent;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.notificationModal {
  position: absolute;
  top: calc(100% + 16px);
  right: 70px;
  width: 534px;
  height: 774px;
}

.header__burger {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27px;
  width: 27px;
  margin-left: 8px;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0;
  position: relative;
  cursor: pointer;

  div {
    height: 2px;
    width: 100%;
    background-color: var(--primary-text-color);
    transition: transform ease-in-out 0.2s;

    &::before,
    &::after {
      position: absolute;
      content: "";
      height: 2px;
      width: 100%;
      background-color: var(--primary-text-color);
      left: 0;
      transition: transform ease-in-out 0.2s;
    }

    &::before {
      transform: translate(0, 7px);
    }

    &::after {
      transform: translate(0, -7px);
    }
  }

  &:hover div,
  &:focus-visible div {
    transform: scaleX(80%);

    &::before {
      transform: translate(0, 7px) scaleX(120%);
    }

    &::after {
      transform: translate(0, -7px) scaleX(120%);
    }
  }
}

.header__panel {
  display: none;
}

.content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  a {
    font-size: 14px;
  }
}

@media (min-width: 768px) {
  .header__menu {
    display: flex;
  }
  .header {
    padding: 0px 32px;
  }

  .header__logo {
    height: 26px;
    width: 47px;
  }

  .notification__title-container {
    .notification__title {
      font-size: 24px;
    }
  }

  .content {
    a {
      font-size: var(--font-size);
    }

    > .router-link-active {
      font-weight: var(--font-weight-bold);
      cursor: default;

      &:hover {
        border: none;
      }
    }

    &__router__link {
      max-width: 250px;
      color: var(--text-color);
      transition: font-weight 0.3s ease-in;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        font-weight: var(--font-weight-bold);
      }
    }
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

  .header__logo {
    height: 32px;
    width: 98px;

    svg {
      width: 58px;
      height: 32px;
    }
  }

  .header__nav {
    display: flex;
    align-self: flex-start;
    align-items: center;
    height: 56px;
    gap: 24px;

    a {
      color: var(--primary-text-color);
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
      color: var(--primary-text-color);
      font-weight: var(--font-weight-bold);
    }

    button {
      color: var(--primary-text-color);
      font-size: 14px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }

    button:hover,
    button:focus-visible {
      text-decoration: underline;
    }
  }

  .header__btn-group {
    gap: 14px;
  }

  .header__notification {
    height: 48px;
    width: 48px;
  }

  .header__user {
    height: 32px;
    width: 32px;
  }

  .header__burger {
    display: none;
  }

  .header__panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    bottom: 0;
    background: var(--Gray3, #fcfcfc);
    box-shadow: var(--box-shadow);
    transform: translate(-50%, 100%);
    width: 100%;
    border-radius: 10px;
    padding: 10px 40px;
  }

  .panel__info {
    display: flex;
    align-items: center;
  }

  .panel__info-icon {
    color: var(--primary-color);
    height: 28px;
    width: 28px;
    margin-right: 16px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .panel__info-name {
    display: flex;
    flex-direction: column;
    font-weight: 700;
    font-size: 18px;

    span {
      font-weight: 400;
      font-size: 14px;
      color: #d6d6d6;
    }
  }

  .panel__submenu {
    display: flex;
    align-items: center;
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

  .header__panel {
    transform: translate(-50%, 100%);
    width: 1502px;
    min-height: 86px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 10px 40px;
  }
}
@media screen and (max-width: 660px) {
  .notificationModal {
    left: 50%;
    transform: translateX(-50%);
    max-width: 500px;
    width: 90%;
  }
}
</style>

<style lang="scss">
.p-sidebar-mask.p-component-overlay.p-sidebar-right.header__overlay {
  background-color: rgba(0, 0, 0, 0.4);
}

.header__overlay {
  .p-sidebar.header__sidebar {
    background: var(--bg-color);
    padding: 18px 16px 18px 32px;
    width: 375px;
  }

  .header__close-icon {
    height: 27px;
    width: 27px;
    margin-bottom: 16px;
  }
}

.header__notificationsPanel,
.header__adminPanel {
  border-radius: 5px;
  background: var(--bg-color);
  box-shadow: var(--box-shadow);
  padding: 24px 16px;
  margin: 0 16px;
  width: calc(100% - 32px);

  a {
    font-size: 20px;
  }
}

.header__adminPanel {
  margin-left: -5px;
}

.header__notificationsPanel {
  max-width: 543px;
}

.header__adminPanel {
  width: auto;
}

@media (min-width: 992px) {
  .header__overlay {
    .p-sidebar.header__sidebar {
      padding: 32px 32px;
      width: 407px;
    }
  }

  .header__notificationsPanel,
  .header__adminPanel {
    padding: 40px;
  }
}
</style>
