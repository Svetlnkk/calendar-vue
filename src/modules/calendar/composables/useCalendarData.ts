import { ref } from 'vue';

export interface IDay {
  date: Date;
  isToday: boolean;
  isDesiredMonth: boolean;
  isDayOff: boolean;
}

export interface Worker {
  name: string;
  id: number;
}

export interface IWorker {
  date: Date;
  workers: Worker[];
}

export interface ICalendar {
  id: number;
  options: IWorker[];
}

const dateWithoutTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const useCalendarData = () => {
  const calendarData = ref<IDay[]>();

  const setCalendarDate = (paramDate: Date): void => {
    const result: IDay[] = [];

    const paramDateWithoutTime = dateWithoutTime(paramDate);
    const year = paramDateWithoutTime.getFullYear();
    const month = paramDateWithoutTime.getMonth();
    const today = dateWithoutTime(new Date());

    const weekDay = (day: number) => {
      if (day === 0) return 6;
      return day - 1;
    };

    const checkIsDayOff = (date: Date) => {
      const day = weekDay(date.getDay());
      return day === 5 || day === 6;
    };

    // Первый день недели месяца
    const firstDayOfWeekInMonth = weekDay(new Date(year, month, 1).getDay());

    // Последнее число месяца
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // Последний день недели месяца
    const endDayOfWeekInMonth = weekDay(
      new Date(year, month, lastDateOfMonth).getDay()
    );

    // Прошлый месяц
    const prevMonth = new Date(year, month, 0);

    // Последнее число предыдущего месяца
    const endDateOfPrevMonth = prevMonth.getDate();

    // Цикл по добавлению последних чисел предыдущего месяца
    for (let i = firstDayOfWeekInMonth; i > 0; i--) {
      const date = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        endDateOfPrevMonth - i + 1
      );

      result.push({
        date,
        isToday: false,
        isDesiredMonth: false,
        isDayOff: checkIsDayOff(date)
      });
    }

    // Цикл по добавлению дат текущего месяца
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const date = new Date(year, month, i);

      result.push({
        date,
        isToday,
        isDesiredMonth: true,
        isDayOff: checkIsDayOff(date)
      });
    }

    // Цикл по добавлению первых чисел следующего месяца
    for (let i = endDayOfWeekInMonth; i < 6; i++) {
      const date = new Date(
        paramDateWithoutTime.getFullYear(),
        paramDateWithoutTime.getMonth() + 1,
        i - endDayOfWeekInMonth + 1
      );

      result.push({
        date,
        isToday: false,
        isDesiredMonth: false,
        isDayOff: checkIsDayOff(date)
      });
    }

    calendarData.value = result;
  };

  return { calendarData, setCalendarDate };
};

export { useCalendarData };
