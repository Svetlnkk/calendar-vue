import { ref, computed, toRaw } from "vue";
import { defineStore } from "pinia";

import { getRandomId } from "@/lib/shared";

interface INotification {
  isError: boolean;
  message: string;
  key: string;
}

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<INotification[]>([]);
  const duration = 5_000;
  const __loading = ref(0);

  const loading = computed(() => Boolean(__loading.value));

  const delNotification = (payload: INotification) => {
    const index = notifications.value.findIndex(
      (item) => toRaw(item) === toRaw(payload)
    );

    if (index >= 0) notifications.value.splice(index, 1);
  };

  const setNotification = (message: string, isError: boolean) => {
    const payload = { message, isError, key: getRandomId() };
    notifications.value.push(payload);

    setTimeout(() => {
      delNotification(payload);
    }, duration);
  };

  const showOk = (message: string) => {
    setNotification(message, false);
  };

  const showError = (message: string) => {
    setNotification(message, true);
  };

  return {
    notifications,
    loading,

    delNotification,
    showOk,
    showError,
  };
});
