<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from "vue";

import type { IDay, IWorker } from "../composables/useCalendarData";
import { useDayTitle } from "../composables";
import colors from "../composables/workerColors";

interface IProps {
  day: IDay;
  workersMonth: IWorker[] | undefined;
  week: Array<Object> | undefined;
  isMobile?: boolean;
}

const props = defineProps<IProps>();
const emits = defineEmits(["titleClick"]);

const workers: any = ref([]);
const repeatWorker = ref([]);
const nearDate = 24 * 60 * 60 * 1000;

const title = useDayTitle(props.day.date);

const pastDate = computed(() => {
  const today = new Date();
  if (!props.day.isToday && props.day.date.getTime() < today.getTime()) {
    return true;
  }
  return false;
});

const handleTitleClick = (selectedDate: any, workers: any) => {
  // console.log("workers click", workers)
  emits("titleClick", { selectedDate, workers });
};

function checkDateInRange(date: Date, startDate: Date, endDate: Date) {
  const dateHours = date.setHours(0, 0, 0, 0);
  const startDateHours = startDate.setHours(0, 0, 0, 0);
  const endDateHourse = endDate.setHours(0, 0, 0, 0);

  if (dateHours >= startDateHours && dateHours <= endDateHourse) {
    return true;
  }
  if (startDateHours - dateHours === nearDate) {
    return true;
  } else if (dateHours - endDateHourse === nearDate) {
    return true;
  }

  return false;
}

function findRepeatWorkerOnWeek() {
  if (props.workersMonth && props.week) {
    const filteredOptions = props.workersMonth.filter((option) => {
      const optionDate = option.date;
      if (props.week) {
        return props.week.some(
          (item: any) => item.date.toDateString() === optionDate.toDateString()
        );
      }
    });
    const sortFilter = filteredOptions.sort(
      (a: any, b: any) => a.date - b.date
    );
    let res: any = [];
    for (let i = 0; i < sortFilter.length - 1; i++) {
      let currentDate: any = new Date(sortFilter[i].date);
      let nextDate: any = new Date(sortFilter[i + 1].date);

      currentDate.setHours(0, 0, 0, 0);
      nextDate.setHours(0, 0, 0, 0);

      if (nextDate - currentDate === nearDate) {
        let currentWorkers = sortFilter[i].workers;
        let nextWorkers = sortFilter[i + 1].workers;

        for (let j = 0; j < currentWorkers.length; j++) {
          let currentWorkerId = currentWorkers[j].id;

          for (let k = 0; k < nextWorkers.length; k++) {
            let nextWorkerId = nextWorkers[k].id;

            if (currentWorkerId === nextWorkerId) {
              const dublFind = res.find(
                (item: any) =>
                  item.id === currentWorkerId &&
                  checkDateInRange(
                    new Date(currentDate),
                    new Date(item.startDate),
                    new Date(item.endDate)
                  )
              );
              if (dublFind) {
                dublFind.count += 1;
                if (
                  dublFind.startDate.setHours(0, 0, 0, 0) -
                    currentDate.setHours(0, 0, 0, 0) ===
                  nearDate
                ) {
                  dublFind.startDate = new Date(currentDate);
                }
                if (
                  nextDate.setHours(0, 0, 0, 0) -
                    dublFind.endDate.setHours(0, 0, 0, 0) ===
                  nearDate
                ) {
                  dublFind.endDate = new Date(nextDate);
                }
              } else {
                res.push({
                  id: currentWorkerId,
                  count: 2,
                  startDate: currentDate,
                  endDate: nextDate,
                });
              }
              break;
            }
          }
        }
      }
    }
    repeatWorker.value = res;
  }
}

function selectedPeriod() {
  if (props.workersMonth) {
    const currentDate = props.day.date;
    const currentDateWithoutTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    let countTrue = 0;
    props.workersMonth.forEach((item: any) => {
      const propDateWithoutTime = new Date(
        item.date.getFullYear(),
        item.date.getMonth(),
        item.date.getDate()
      );
      if (currentDateWithoutTime.getTime() === propDateWithoutTime.getTime()) {
        countTrue += 1;
      }
    });
    if (countTrue > 0) {
      return true;
    }
  }
  return false;
}

function getWorkerColor(workerId: number) {
  const foundColor = colors.colors.find((item) => item.id === workerId);
  if (foundColor) {
    return foundColor.color;
  } else {
    return "blueviolet";
  }
}

function getWorkerWidth(workerId: number, date: Date) {
  const dateHours = date.setHours(0, 0, 0, 0);
  const foundWorker: any = repeatWorker.value.find(
    (item: any) =>
      item.id === workerId &&
      checkDateInRange(
        new Date(date),
        new Date(item.startDate),
        new Date(item.endDate)
      )
  );
  if (foundWorker) {
    if (
      getDisplayWorker(workerId, date) === "hidden" ||
      dateHours !== foundWorker.startDate.setHours(0, 0, 0, 0)
    ) {
      if (props.isMobile) {
        return "97%";
      }
      return "94%";
    } else {
      if (props.isMobile) {
        return `calc(${foundWorker.count * 98}%`;
      } else {
        return `calc(${foundWorker.count * 94}% + ${
          16 * (foundWorker.count - 1)
        }px)`;
      }
    }
  } else {
    if (props.isMobile) {
      return "97%";
    }
    return "94%";
  }
}

function getDisplayWorker(workerId: number, date: Date) {
  const getTimeDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const foundWorker: any = repeatWorker.value.find(
    (item: any) =>
      item.id === workerId &&
      checkDateInRange(
        new Date(date),
        new Date(item.startDate),
        new Date(item.endDate)
      )
  );
  if (foundWorker) {
    const foudDate = new Date(
      foundWorker.startDate.getFullYear(),
      foundWorker.startDate.getMonth(),
      foundWorker.startDate.getDate()
    );
    if (getTimeDate.getTime() > foudDate.getTime()) {
      return "hidden";
    } else {
      return "visible";
    }
  } else {
    return "visible";
  }
}

function findWorkerDay(values: any) {
  const currentDate = props.day.date;
  const currentDateWithoutTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  values.forEach((item: any) => {
    const propDateWithoutTime = new Date(
      item.date.getFullYear(),
      item.date.getMonth(),
      item.date.getDate()
    );
    if (currentDateWithoutTime.getTime() === propDateWithoutTime.getTime()) {
      workers.value = item.workers;
    }
  });
}

onBeforeMount(() => {
  findRepeatWorkerOnWeek();
  if (props.workersMonth) {
    findWorkerDay(props.workersMonth);
  }
});

watch(
  () => props.workersMonth,
  (newValue) => {
    if (newValue) {
      // console.log("------------")
      // console.log("newValue", newValue)
      repeatWorker.value = [];
      findRepeatWorkerOnWeek();
      findWorkerDay(newValue);
      // console.log("newValue after", newValue)
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="day-of-month">
    <div
      class="title"
      :class="{
        notDesiredMonth: !day.isDesiredMonth,
        dayOff: day.isDayOff,
        pastDisabled: pastDate,
      }"
      @click.stop="pastDate ? false : handleTitleClick(day.date, workers)"
    >
      {{ title }}
    </div>
    <template v-if="selectedPeriod()">
      <div class="day-of-month__workers">
        <div
          v-for="worker in workers"
          :key="worker.id"
          class="worker"
          :style="{
            backgroundColor: getWorkerColor(worker.id),
            width: getWorkerWidth(worker.id, day.date),
            visibility: getDisplayWorker(worker.id, day.date),
          }"
        >
          <div class="worker__avatar">
            <img
              :src="
                worker.image
                  ? `${worker.image}`
                  : '/images/svg/plugForImage.svg'
              "
              alt=""
            />
          </div>
          <div class="worker__name">{{ worker.name }} {{ worker.id }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.day-of-month {
  display: flex;
  flex-direction: column;
  min-height: 250px;
  height: 100%;

  .title {
    display: flex;
    height: 38px;
    margin: 24px 8px;
    padding: 8px 10px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    color: #404040;
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &.notDesiredMonth {
      color: var(--border-hover-color);
    }

    &.dayOff {
      background-color: #f3f3f3;
    }

    &.pastDisabled {
      cursor: default;
    }
  }

  &__workers {
    width: 100%;

    .worker {
      display: flex;
      height: 35px;
      padding: 8px 16px;
      margin: 0 8px 8px 8px;
      opacity: 0.7;
      border-radius: 5px;

      &__avatar {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        border: 1px solid #fff;
        overflow: hidden;
        margin-right: 16px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &__name {
        color: #fff;
        font-family: Nunito Sans;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  .day-of-month {
    .title {
      margin: 8px 8px;
      width: auto;
      font-size: 16px;
    }
  }
}

@media screen and (min-width: 1025px) {
}
</style>
