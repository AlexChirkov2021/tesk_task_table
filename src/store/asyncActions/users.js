import { setUsersAction } from "../usersReducer";
import api from "../../api";

export const fetchUsers = () => {
  return function (dispatch) {
    api.users.fetchAll().then((data) => dispatch(setUsersAction(data)));
  };
};
