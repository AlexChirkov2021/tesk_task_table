const users = [
  {
    id: 1,
    name: "Илья Емельянов",
    isArchive: false,
    role: "driver",
    phone: "+7 (883) 508-3269",
    birthday: "1982-12-02",
  },
  {
    id: 2,
    name: "Александр Ларионов",
    isArchive: true,
    role: "waiter",
    phone: "+7 (823) 440-3602",
    birthday: "1986-01-26",
  },
  {
    id: 3,
    name: "Богдан Давыдов",
    isArchive: false,
    role: "driver",
    phone: "+7 (971) 575-2645",
    birthday: "1990-11-29",
  },
  {
    id: 4,
    name: "Олимпиада Макарова",
    isArchive: true,
    role: "waiter",
    phone: "+7 (945) 447-2286",
    birthday: "1987-01-06",
  },
  {
    id: 5,
    name: "Алла Котова",
    isArchive: false,
    role: "cook",
    phone: "+7 (948) 523-2964",
    birthday: "1982-01-26",
  },
  {
    id: 6,
    name: "Кира Колесникова",
    isArchive: true,
    role: "cook",
    phone: "+7 (929) 592-3637",
    birthday: "1972-02-25",
  },
  {
    id: 7,
    name: "Александр Третьяков",
    isArchive: false,
    role: "driver",
    phone: "+7 (872) 568-2916",
    birthday: "1979-05-31",
  },
  {
    id: 8,
    name: "Пелагея Морозова",
    isArchive: false,
    role: "driver",
    phone: "+7 (977) 521-3479",
    birthday: "1981-09-11",
  },
  {
    id: 9,
    name: "Агафон Громов",
    isArchive: true,
    role: "driver",
    phone: "+7 (868) 569-3159",
    birthday: "1988-06-07",
  },
  {
    id: 10,
    name: "Владлен Тетерин",
    isArchive: true,
    role: "driver",
    phone: "+7 (808) 592-2480",
    birthday: "1978-06-20",
  },
  {
    id: 11,
    name: "Валерий Пестов",
    isArchive: false,
    role: "cook",
    phone: "+7 (899) 403-2387",
    birthday: "1987-01-20",
  },
  {
    id: 12,
    name: "Даниил Кузнецов",
    isArchive: true,
    role: "waiter",
    phone: "+7 (933) 582-2673",
    birthday: "1987-05-25",
  },
  {
    id: 13,
    name: "Фёдор Веселов",
    isArchive: true,
    role: "waiter",
    phone: "+7 (951) 517-3787",
    birthday: "1972-12-16",
  },
  {
    id: 14,
    name: "Пантелеймон Ефимов",
    isArchive: true,
    role: "cook",
    phone: "+7 (807) 492-3627",
    birthday: "1986-04-17",
  },
  {
    id: 15,
    name: "Иванна Калашникова",
    isArchive: true,
    role: "waiter",
    phone: "+7 (927) 488-2568",
    birthday: "1982-03-24",
  },
  {
    id: 16,
    name: "Прасковья Кондратьева",
    isArchive: true,
    role: "cook",
    phone: "+7 (875) 517-3873",
    birthday: "1983-06-07",
  },
  {
    id: 17,
    name: "Евдокия Филиппова",
    isArchive: false,
    role: "waiter",
    phone: "+7 (877) 450-3253",
    birthday: "1994-12-03",
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

const fetchAll = () =>
  new Promise((resolve) => {
    resolve(JSON.parse(localStorage.getItem("users")));
  });

const update = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex((u) => u.id === id);
    users[userIndex] = { ...users[userIndex], ...data };
    localStorage.setItem("users", JSON.stringify(users));
    resolve(users[userIndex]);
  });

const getById = (id) =>
  new Promise((resolve) => {
    resolve(
      JSON.parse(localStorage.getItem("users")).find((user) => user.id === id)
    );
  });

const addUser = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = id;
    users[userIndex] = {
      ...users[userIndex],
      id: Number(`${userIndex + 1}`),
      ...data,
    };
    localStorage.setItem("users", JSON.stringify(users));
    resolve(users[userIndex]);
  });

export default {
  fetchAll,
  getById,
  update,
  addUser,
};
