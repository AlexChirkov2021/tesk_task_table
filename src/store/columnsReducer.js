import { Link } from "react-router-dom";
const defaultState = {
  name: {
    name: "Имя",
    component: (user) => <Link to={`/users/${user.id}`}>{user.name}</Link>,
  },
  role: { name: "Должность", component: (user) => <p>{user.role}</p> },
  phone: { name: "Телефон", component: (user) => <p>{user.phone}</p> },
};

export const columnsReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
