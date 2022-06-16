import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/usersListPage";
import EditUserPage from "../components/editUserPage";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <EditUserPage /> : <UsersListPage />}</>;
};

export default Users;
