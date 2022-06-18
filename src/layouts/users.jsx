import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <EditUserPage /> : <UsersListPage />}</>;
};

export default Users;
