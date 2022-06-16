import React from "react";
import Table from "./table";
import { Link } from "react-router-dom";

const UserTable = ({ users, onSort, selectedSort }) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user.id}`}>{user.name}</Link>,
    },
    role: { name: "Должность", component: (user) => <p>{user.role}</p> },
    phone: { name: "Телефон", component: (user) => <p>{user.phone}</p> },
  };
  return (
    <Table
      columns={columns}
      data={users}
      onSort={onSort}
      selectedSort={selectedSort}
    />
  );
};

export default UserTable;
