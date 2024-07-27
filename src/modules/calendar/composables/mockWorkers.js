import { ref } from "vue";

const calendar = ref([
  {
    year: 2023,
    months: [
      {
        id: 9,
        options: [
          {
            date: new Date("2023-12-01"),
            workers: [
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
            ],
          },
          {
            date: new Date("2023-12-10"),
            workers: [
              {
                name: "Алексей Иванов",
                id: 1,
                image: null,
              },
              {
                name: "Светлана Лядова",
                id: 5,
                image: null,
              },
            ],
          },
          {
            date: new Date("2023-12-23"),
            workers: [
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
            ],
          },
        ],
      },
      {
        id: 10,
        options: [
          {
            date: new Date("2024-01-22"),
            workers: [
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
          },
          {
            date: new Date("2024-01-30"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-02-03"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-02-04"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-05-05"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-07-06"),
            workers: [
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
          },
          {
            date: new Date("2024-07-07"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-07-14"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-07-17"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-07-18"),
            workers: [
              {
                name: "Алексей Иванов",
                id: 1,
                image: null,
              },
              {
                name: "Вадим Кузнецов",
                id: 3,
                image: null,
              },
            ],
          },
          {
            date: new Date("2024-07-19"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-07-30"),
            workers: [
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
            ],
          },
        ],
      },
      {
        id: 11,
        options: [
          {
            date: new Date("2024-08-05"),
            workers: [
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
            ],
          },
          {
            date: new Date("2024-08-05"),
            workers: [
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
            ],
          },
        ],
      },
    ],
  },
]);

export default { calendar };
