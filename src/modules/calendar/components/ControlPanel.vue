<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import Calendar from "primevue/calendar";

const emit = defineEmits(["setDate", "updateWorkers"]);

const MIN_YEAR = 2020;
const minDate = new Date(MIN_YEAR, 0, 31);

const currentDate = ref(new Date());

function handleCalendarClick() {
  emit("setDate", currentDate.value);
}

onBeforeMount(() => {
  currentDate.value = new Date();
  emit("setDate", currentDate.value);
});

const handleButtonClick = (prev: boolean) => {
  const currentYear = new Date(currentDate.value).getFullYear();
  const currentMonth = new Date(currentDate.value).getMonth();

  if (prev && currentMonth === 0 && currentYear === MIN_YEAR) return;

  currentDate.value = new Date(
    currentDate.value.setMonth(prev ? currentMonth - 1 : currentMonth + 1)
  );

  emit("setDate", currentDate.value);
};
</script>

<template>
  <div class="control-panel">
    <PrimeButton class="period" text @click="handleButtonClick(true)">
      <template #icon> &lt; </template>
    </PrimeButton>

    <Calendar
      v-model="currentDate"
      view="month"
      date-format="MM yy"
      :manualInput="false"
      :min-date="minDate"
      @date-select="handleCalendarClick"
      class="period"
    >
      <template #previousicon>
        <svg-icon name="arr-l" />
      </template>
      <template #nexticon>
        <svg-icon name="arr-r" />
      </template>
    </Calendar>

    <PrimeButton class="period" text @click="handleButtonClick(false)">
      <template #icon> &gt; </template>
    </PrimeButton>
  </div>
</template>

<style scoped lang="scss">
.hidden-input {
  display: none;
}
.control-panel {
  display: flex;
  gap: 1rem;
}

.period {
  color: #404040;
  font-family: Nunito Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
}

button {
  cursor: pointer;
}

:deep(.p-inputtext) {
  background-color: unset;
  border: none;
  height: 15px;
}
:deep(.p-inputtext:hover) {
  color: #049be8;
}

:deep(.p-calendar) {
  height: 15px;
  margin-top: 5px;
  width: 165px;
}
</style>
