<script setup lang="ts">
import { useNotificationStore } from "@/stores";

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="notification">
    <transition-group name="list">
      <div v-if="notificationStore.loading" class="notification__box">
        <div class="notification__box__title notification__box__title-loading">
          <span class="notification__box__title__spin" />
          <div class="notification__box__title__status">
            Процесс выполняется...
          </div>
        </div>
      </div>
      <div
        v-else-if="notificationStore.notifications.length > 0"
        class="notification__box"
      >
        <div
          v-for="notify in notificationStore.notifications"
          :key="notify.key"
        >
          <div
            class="notification__box__title notification__box__title-loading"
          >
            <svg-icon v-if="notify.isError" name="notification-error" />
            <svg-icon v-else name="ok" style="color: green" />

            <div class="notification__box__title__status">
              {{ notify.message }}
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.notification {
  user-select: none;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transform: translate(50%, 0px);
  padding-bottom: 30px;
  z-index: 2000;
  bottom: 0;
  right: 50%;

  &__box {
    width: 400px;
    padding: 12px 24px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 1px rgb(0 0 0 / 16%);
    border-radius: 5px;
    max-height: 300px;
    overflow: hidden;
    text-overflow: ellipsis;

    &__title {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      gap: 6px;
      padding-bottom: 8px;
      margin-bottom: 8px;

      svg {
        width: 24px;
        height: 24px;
        color: red;
      }

      &__close {
        cursor: pointer;
        width: 20px !important;
        height: 20px !important;
        margin-left: auto;
        color: rgb(201, 201, 201) !important;
      }

      &__spin {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: inline-block;
        border-top: 3px solid #049be8;
        border-right: 3px solid transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }
    }

    &__title-loading {
      justify-content: center;
      border-bottom: none;
      margin-bottom: 0;
      padding: 10px 0px;
      gap: 26px;
    }

    &__text {
      line-height: 1.2em;
      max-height: 3.6em;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      white-space: pre-line;
      font-size: 14px;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
  z-index: -1;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.list-move {
  transition: transform 0.2s ease;
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
