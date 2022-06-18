import { setRolesAction } from "../rolesReducer";
import api from "../../api";
import _ from "loadsh";

export const fetchRoles = () => {
  return function (dispatch) {
    api.users
      .fetchAll()
      .then((data) =>
        dispatch(setRolesAction(_.uniq(data.map((item) => item.role))))
      );
  };
};
