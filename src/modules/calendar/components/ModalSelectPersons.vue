<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { Form } from "vee-validate";
import Calendar from "primevue/calendar";

import InputOption from "@/components/InputOption.vue";
import { useNotificationStore } from "@/stores";

const notificationStore = useNotificationStore();

const emit = defineEmits(["closeModal", "sendData"]);

const props = defineProps({
  editDate: {
    type: Date,
    default: undefined,
  },
  selectedWorkers: {
    type: Array,
    default: () => [],
  },
});

const dates = ref();
const minDate = ref();
const loading = ref(false);
const form_node = ref(null);

const workers: any = ref({
  value: [],
  type: "checkbox",
  name: "workers",
  label: "",
  options: [
    {
      name: "Алексей Иванов",
      id: 1,
      image: null,
    },
    {
      name: "Артём Смирнов",
      id: 2,
      image: null,
    },
    {
      name: "Вадим Кузнецов",
      id: 3,
      image: null,
    },
    {
      name: "Владимир Попов",
      id: 4,
      image: null,
    },
    {
      name: "Светлана Лядова",
      id: 5,
      image: null,
    },
    {
      name: "Валентин Васильев",
      id: 6,
      image: null,
    },
    {
      name: "Ольга Иванова",
      id: 7,
      image: null,
    },
    {
      name: "Иван Петров",
      id: 8,
      image: null,
    },
    {
      name: "Данил Соколов",
      id: 9,
      image: null,
    },
    {
      name: "Алексей Михайлов",
      id: 10,
      image: null,
    },
    {
      name: "Мария Дмитрова",
      id: 11,
      image: null,
    },
  ],
});

onBeforeMount(async () => {
  const date = new Date();
  minDate.value = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (props.editDate && props.selectedWorkers) {
    workers.value.value = props.selectedWorkers;
  }
});

async function handleSubmit(values: any) {
  try {
    loading.value = true;
    if ((!dates.value || dates.value.length === 0) && !props.editDate) {
      notificationStore.showError(`Укажите дату`);
      return;
    }

    const data = {
      date: props.editDate ? [props.editDate] : dates.value,
      workers: values.workers,
    };
    emit("sendData", data);
    emit("closeModal");
    notificationStore.showOk("Все хорошо");
  } catch (err) {
    console.log("error", err);
    notificationStore.showError(`${err}`);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Form ref="form_node" @submit="handleSubmit">
    <div class="dates-range">
      <div class="title">Укажите период работы:</div>

      <div class="work-period">
        <svg-icon name="header-calendar-icon" />
        <template v-if="editDate">{{
          editDate.toLocaleDateString("ru-RU")
        }}</template>
        <template v-else>
          <Calendar
            v-model="dates"
            selectionMode="range"
            date-format="dd.mm.yy"
            :manualInput="false"
            :min-date="minDate"
          >
            <template #previousicon>
              <svg-icon name="arr-l" />
            </template>
            <template #nexticon>
              <svg-icon name="arr-r" />
            </template>
          </Calendar>
        </template>
      </div>
    </div>

    <div class="work-persons">
      <div class="title">Сотрудники:</div>

      <div class="content">
        <InputOption v-bind="workers" v-model="workers.value" />
      </div>
    </div>

    <div class="save-button">
      <PrimeButton
        label="Сохранить"
        size="large"
        class="button"
        type="submit"
      />
    </div>
  </Form>
</template>

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.dates-range {
  margin-bottom: 32px;

  .work-period {
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      color: #049be8;
    }
  }
}

.work-persons {
  margin-bottom: 48px;
}

.content {
  display: flex;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  svg {
    color: #049be8;
  }
}

.save-button {
  text-align: end;
}

.button {
  width: 100%;
}

@media screen and (min-width: 460px) {
  :deep(.form-input-option .form-input-item) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 19px;
    row-gap: 8px;
    font-size: 14px;
  }
}

@media screen and (min-width: 1090px) {
  :deep(.form-input-option .form-input-item) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 19px;
    row-gap: 8px;
    font-size: 16px;
  }
}

@media screen and (min-width: 1200px) {
  .content {
    margin-bottom: 0;
  }

  :deep(.form-input-option .form-input-item) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 19px;
    row-gap: 8px;
    font-size: 16px;
  }

  .button {
    width: 300px;
  }
}

@media screen and (min-width: 1600px) {
  :deep(.form-input-option .form-input-item) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 19px;
    row-gap: 8px;
    font-size: 16px;
  }
}

:deep(.p-checkbox .p-checkbox-box) {
  border-radius: 50%;
}
</style>
