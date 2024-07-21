<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  ref,
  watch,
  onUnmounted,
  computed,
} from "vue";

import PageLabel from "../../components/PageLabel.vue";

import DayOfMonth from "./components/DayOfMonth.vue";
import ControlPanel from "./components/ControlPanel.vue";
import ModalSelectPersons from "./components/ModalSelectPersons.vue";

import calendar from "./composables/mockWorkers";
import { useCalendarData } from "./composables/useCalendarData";

const { calendarData, setCalendarDate } = useCalendarData();

const showModal = ref(false);
const editDate = ref();
const workersMonth: any = ref([]);
const selectedWorkers = ref([]);
const weeks: any = ref([]);
const filteredWeeks: any = ref([]);
const currentIndex: any = ref(0);
const isMobile = ref(false);
const nearDate = 24 * 60 * 60 * 1000;

const isRightButtonDisabled = computed(() => {
  if (currentIndex.value === 6) {
    return true;
  }
  return false;
});

const isLeftButtonDisabled = computed(() => {
  if (currentIndex.value === 0) {
    return true;
  }
  return false;
});

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

function workersRepeatCounter(sortFilter: any) {
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
          } else {
            const dublFindNext = res.find(
              (item: any) =>
                item.id === nextWorkerId &&
                checkDateInRange(
                  new Date(nextDate),
                  new Date(item.startDate),
                  new Date(item.endDate)
                )
            );
            if (!dublFindNext) {
              res.push({
                id: nextWorkerId,
                count: 1,
                startDate: nextDate,
                endDate: nextDate,
              });
            }
            const dublFindCurrent = res.find(
              (item: any) =>
                item.id === currentWorkerId &&
                checkDateInRange(
                  new Date(currentDate),
                  new Date(item.startDate),
                  new Date(item.endDate)
                )
            );
            if (!dublFindCurrent) {
              res.push({
                id: currentWorkerId,
                count: 1,
                startDate: currentDate,
                endDate: currentDate,
              });
            }
          }
        }
      }
    }
  }
  return res;
}

function sortedWorkers(date: Date) {
  const findWeek = isMobile.value
    ? filteredWeeks.value.filter((item: any) => {
        return item.find(
          (week: any) =>
            week.date.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
        );
      })
    : weeks.value.filter((item: any) => {
        return item.find(
          (week: any) =>
            week.date.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
        );
      });
  const filteredOptions = workersMonth.value.filter((option: any) => {
    const optionDate = option.date;
    if (findWeek) {
      return (
        findWeek[0] &&
        findWeek[0].some(
          (item: any) =>
            item.date.setHours(0, 0, 0, 0) === optionDate.setHours(0, 0, 0, 0)
        )
      );
    }
  });
  const sortFilter = filteredOptions.sort((a: any, b: any) => a.date - b.date);
  const counter = workersRepeatCounter(sortFilter);
  for (let i = 0; i < sortFilter.length; i++) {
    let currentDate: any = new Date(sortFilter[i].date);
    currentDate.setHours(0, 0, 0, 0);

    if (i > 0) {
      let previousDate: any = new Date(sortFilter[i - 1].date);
      previousDate.setHours(0, 0, 0, 0);
      if (currentDate - previousDate === 24 * 60 * 60 * 1000) {
        let currentWorkers = [...sortFilter[i].workers].slice();
        let previousWorkers = [...sortFilter[i - 1].workers].slice();

        let idCount: { [key: number]: number } = {};
        const filterCounter = counter.filter((item: any) => {
          if (
            (currentDate.setHours(0, 0, 0, 0) >=
              item.startDate.setHours(0, 0, 0, 0) &&
              currentDate.setHours(0, 0, 0, 0) <=
                item.endDate.setHours(0, 0, 0, 0)) ||
            (previousDate.setHours(0, 0, 0, 0) >=
              item.startDate.setHours(0, 0, 0, 0) &&
              previousDate.setHours(0, 0, 0, 0) <=
                item.endDate.setHours(0, 0, 0, 0))
          ) {
            return item;
          }
        });
        for (let i = 0; i < filterCounter.length; i++) {
          let currentWorkerId = filterCounter[i].id;
          idCount[currentWorkerId] = filterCounter[i].count;
        }
        // console.log('--------')
        // console.log("idCount", idCount)
        // console.log("currentDate", currentDate)
        // console.log("filterCounter", filterCounter);

        let sortedCurrentWorkers = currentWorkers.sort((a: any, b: any) => {
          return idCount[b.id] - idCount[a.id];
        });

        let sortedPreviousWorkers = previousWorkers.sort((a: any, b: any) => {
          return idCount[b.id] - idCount[a.id];
        });
        // console.log("sortedPreviousWorkers", sortedPreviousWorkers)

        for (let j = 0; j < sortedPreviousWorkers.length; j++) {
          const previousId = sortedPreviousWorkers[j].id;

          const currentIdx = sortedCurrentWorkers.findIndex(
            (item) => item.id === previousId
          );
          if (currentIdx !== -1) {
            const findJinCurrent = sortedCurrentWorkers.findIndex(
              (value: any, index: number) => index === j
            );
            if (findJinCurrent !== -1) {
              const temp = sortedCurrentWorkers[currentIdx];
              sortedCurrentWorkers[currentIdx] =
                sortedCurrentWorkers[findJinCurrent];
              sortedCurrentWorkers[findJinCurrent] = temp;
            }
          }
        }

        // console.log(currentWorker);
        // console.log("splice CurrentWorkers", sortedCurrentWorkers);

        sortFilter[i - 1].workers = sortedPreviousWorkers;
        sortFilter[i].workers = sortedCurrentWorkers;

        workersMonth.value = workersMonth.value.map((item: any) => {
          if (
            new Date(item.date).setHours(0, 0, 0, 0) ===
            new Date(currentDate).setHours(0, 0, 0, 0)
          ) {
            return { ...item, workers: sortedCurrentWorkers };
          }
          return item;
        });

        updateCalendar(new Date(currentDate), sortedCurrentWorkers);
      }
    }
  }
}

function updateMonthWorkers(dayObj: any) {
  const findMonth = workersMonth.value.find(
    (item: any) =>
      item.date.setHours(0, 0, 0, 0) === dayObj.date.setHours(0, 0, 0, 0)
  );
  if (findMonth) {
    findMonth.workers = dayObj.workers;
  } else {
    workersMonth.value.push(dayObj);
  }
}

function updateCalendar(tempDate: Date, values?: any) {
  const year = tempDate.getFullYear();
  const month = tempDate.getMonth();
  const day = tempDate.getDate();

  let yearObj = calendar.calendar.value.find((item) => item.year === year);

  if (!yearObj) {
    const newYear = {
      year: year,
      months: [],
    };
    calendar.calendar.value.push(newYear);
    yearObj = newYear;
  }

  let monthObj = yearObj.months.find((item) => item.id === month);

  if (!monthObj) {
    const newMonthObj = { id: month, options: [] };
    yearObj.months.push(newMonthObj);
    monthObj = newMonthObj;
  }

  const getTimeDate = new Date(year, month, day);
  let dayObj: any = monthObj.options.find(
    (item: any) =>
      new Date(
        item.date.getFullYear(),
        item.date.getMonth(),
        item.date.getDate()
      ).getTime() === getTimeDate.getTime()
  );

  if (!dayObj) {
    const newDayObj = { date: tempDate, workers: [] };
    monthObj.options.push(newDayObj);
    dayObj = newDayObj;
  }
  dayObj.workers = values;

  updateMonthWorkers(dayObj);

  // console.log("calendar.calendar.value", calendar.calendar.value);
}

function newWorkers(values: any) {
  if (values?.date?.length === 2) {
    const startDate = new Date(values.date[0]);
    const endDate = new Date(values.date[1]);

    const tempDate = new Date(startDate);
    while (tempDate <= endDate) {
      updateCalendar(new Date(tempDate), values.workers);
      tempDate.setDate(tempDate.getDate() + 1);
    }
  } else {
    const tempDate = new Date(values.date[0]);
    updateCalendar(new Date(tempDate), values.workers);
    sortedWorkers(new Date(tempDate));
  }
}

function openModal(id?: Date, values?: any) {
  showModal.value = true;
  if (!id) {
    editDate.value = undefined;
  } else {
    editDate.value = id;
    if (values) {
      selectedWorkers.value = values.workers;
    }
  }
}

function closeModal() {
  showModal.value = false;
}

function weeksOnMounth() {
  const daysPerWeek = 7;
  let currentWeek: any = [];

  if (calendarData.value) {
    calendarData.value.forEach((day: any, index: any) => {
      currentWeek.push(day);

      //index === calendarData.value.length - 1
      if (calendarData.value) {
        if (
          (index + 1) % daysPerWeek === 0 ||
          index === calendarData.value.length - 1
        ) {
          weeks.value.push(currentWeek);
          currentWeek = [];
        }
      }
    });
    getFilteredWeeks();
  }
}

function filteredCalendar() {
  if (calendarData.value) {
    for (const year of calendar.calendar.value) {
      for (const month of year.months) {
        for (const option of month.options) {
          for (const date of calendarData.value) {
            if (option.date.toDateString() === date.date.toDateString()) {
              workersMonth.value.push(option);
              break;
            }
          }
        }
      }
    }
    // workersMonth.value.sort((a: any, b: any) => a.date - b.date)
  } else {
    workersMonth.value = [];
  }
}

function handleNavigationClick(prev: boolean) {
  if (prev) {
    if (currentIndex.value > 0 && currentIndex.value + 1 > 1) {
      currentIndex.value -= 2;
    }
  } else {
    if (currentIndex.value + 1 < 7) {
      currentIndex.value += 2;
    }
  }
}

function getFilteredWeeks() {
  weeks.value.forEach((item: any) => {
    let currentWeek: any = [];
    item.forEach((day: any, index: any) => {
      if (index === currentIndex.value || index === currentIndex.value + 1) {
        currentWeek.push(day);
      }
    });
    filteredWeeks.value.push(currentWeek);
  });
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 1024;
};

onBeforeMount(() => {
  checkMobile();
});

onMounted(() => {
  window.addEventListener("resize", checkMobile);
  checkMobile();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

watch(calendarData, (newValue) => {
  if (newValue) {
    weeks.value = [];
    workersMonth.value = [];
    filteredWeeks.value = [];
    weeksOnMounth();
    filteredCalendar();
  }
});

watch(currentIndex, () => {
  filteredWeeks.value = [];
  getFilteredWeeks();
});
</script>

<template>
  <PageLabel name="Календарь" :description="new Date().toLocaleDateString()">
    <template #value>
      <div class="button-group">
        <PrimeButton
          class="period"
          text
          label="Указать по периоду"
          @click="openModal()"
        >
          <template #icon>
            <svg-icon name="header-calendar-icon" />
          </template>
        </PrimeButton>
      </div>
    </template>
  </PageLabel>

  <ControlPanel @setDate="setCalendarDate($event)" />

  <div class="scroll-mode">
    <perfect-scrollbar
      v-if="calendarData"
      class="calendar-container"
      :options="{ suppressScrollY: true }"
    >
      <!-- <perfect-scrollbar class="vert-scroll"> -->
      <div class="vert-scroll">
        <div class="calendar-list">
          <div class="calendar-navigation">
            <PrimeButton
              class="navigation"
              :disabled="isLeftButtonDisabled"
              text
              @click="handleNavigationClick(true)"
            >
              <template #icon>
                <svg-icon name="left-calendar" />
              </template>
            </PrimeButton>
            <PrimeButton
              class="navigation"
              :disabled="isRightButtonDisabled"
              text
              @click="handleNavigationClick(false)"
            >
              <template #icon>
                <svg-icon name="right-calendar" />
              </template>
            </PrimeButton>
          </div>
          <div
            v-for="(week, indexW) in isMobile ? filteredWeeks : weeks"
            :key="indexW"
            class="calendar-grid"
          >
            <div v-for="day in week" :key="day.date.valueOf()">
              <DayOfMonth
                :day="day"
                :workersMonth="workersMonth"
                @titleClick="openModal(day.date, $event)"
                :week="week"
                :isMobile="isMobile"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- </perfect-scrollbar> -->
    </perfect-scrollbar>
  </div>

  <ModalDialog
    v-if="showModal"
    header="График работы"
    @closeModal="showModal = false"
  >
    <ModalSelectPersons
      @closeModal="closeModal"
      @sendData="newWorkers"
      :editDate="editDate"
      :selectedWorkers="selectedWorkers"
    />
  </ModalDialog>
</template>

<style scoped lang="scss">
.scroll-mode {
  height: calc(100vh - 300px);
}

.vert-scroll {
  width: 100%;
  overflow-y: auto;
}

.button-group {
  display: flex;
  gap: 32px;
}

.navigation {
  svg {
    width: 20px;
    height: 20px;
  }
}

.calendar-navigation {
  display: flex;
  width: 100%;
  justify-content: space-between;
  z-index: 1;
  position: relative;
  transform: translate(0, 52px) scaleX(100%);
}

.period {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  color: #404040;
  font-family: Nunito Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  svg {
    width: 20px;
    height: 20px;
    color: #049be8;
  }
}

.calendar-container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: auto;

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(2, calc(100% / 2));
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    margin-bottom: 1rem;
  }
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: #049be8;
  border: 2px solid var(--primary-color);
}

@media screen and (min-width: 1025px) {
  .scroll-mode {
    height: calc(100vh - 200px);
  }
  .calendar-container {
    .calendar-grid {
      grid-template-columns: repeat(7, 250px);
    }
  }

  .calendar-navigation {
    display: none;
  }

  .vert-scroll {
    overflow-y: auto;
  }
}
</style>
