import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/asyncActions/users";
import { fetchRoles } from "../../../store/asyncActions/roles";
import UserTable from "../../../ui/userTable";
import _ from "lodash";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { Link } from "react-router-dom";
import RolesList from "../../common/rolesList";

const UsersListPage = () => {
  const dispatch = useDispatch();
  const [selectedRoles, setSelectedRoles] = useState();
  const [checkStatus, setCheckStatus] = useState(false);
  const pageSize = 10;
  const sortBy = useSelector((state) => state.sortBy);
  const page = useSelector((state) => state.currentPage.page);
  const users = useSelector((state) => state.users.users);
  const roles = useSelector((state) => state.roles.roles);
  console.log(roles);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleSortByName = (value) => {
    dispatch({
      type: "SET_PATH",
      payload: "name",
    });
    dispatch({
      type: "SET_ORDER",
      payload: sortBy.order === value ? "desc" : "asc",
    });
  };

  const handleChangeRole = ({ target }) => {
    setSelectedRoles(target.value);
  };
  const toggleCheckbox = () => {
    setCheckStatus((prevState) => !prevState);
    setSelectedRoles();
  };

  useEffect(() => {
    dispatch({ type: "SET_PAGE", payload: 1 });
  }, [selectedRoles, checkStatus, dispatch]);

  const filteredUsers = checkStatus
    ? users.filter((user) => user.isArchive === true)
    : selectedRoles
    ? users.filter((user) => user.role === selectedRoles)
    : users;

  const count = filteredUsers?.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const usersCrop = paginate(sortedUsers, page, pageSize);
  const clearFilter = () => {
    setSelectedRoles();
    setCheckStatus(false);
  };
  return (
    <div className="d-flex">
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <RolesList onChange={handleChangeRole} selectedRoles={selectedRoles} />
        <button className="btn btn-secondary mt-2 mb-2" onClick={clearFilter}>
          Очистить
        </button>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={toggleCheckbox}
            checked={checkStatus ? true : false}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            В архиве
          </label>
        </div>
      </div>
      <div className="d-flex flex-column">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="users/add">
              Добавить пользователя
            </Link>
          </li>
        </ul>

        {count > 0 && <UserTable users={usersCrop} />}
        <div className="d-flex justify-content-center">
          <Pagination itemsCount={count} pageSize={pageSize} />
        </div>
      </div>
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <button
          className="btn btn-secondary mt-2 mb-2"
          onClick={() => handleSortByName("asc")}
        >
          Сортировка по имени
        </button>
      </div>
    </div>
  );
};

export default UsersListPage;
