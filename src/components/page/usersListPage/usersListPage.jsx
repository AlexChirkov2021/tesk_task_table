import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/asyncActions/users";
import { fetchRoles } from "../../../store/asyncActions/roles";
import Table from "../../common/table";
import _ from "lodash";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { Link } from "react-router-dom";
import RolesList from "../../common/rolesList";

const UsersListPage = () => {
  const [selectedRoles, setSelectedRoles] = useState();
  const [checkStatus, setCheckStatus] = useState(false);
  const pageSize = 10;
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.sortBy);
  const page = useSelector((state) => state.currentPage.page);
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const startProgram = () => {
    return;
  };

  useEffect(() => {
    startProgram();
  }, []);

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
  const handleSortByBirthday = (value) => {
    dispatch({
      type: "SET_PATH",
      payload: "birthdayNew",
    });
    dispatch({
      type: "SET_ORDER",
      payload: value,
    });
  };

  const handleChangeRole = ({ target }) => {
    setSelectedRoles(target.value);
    setCheckStatus(false);
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
    setSelectedRoles("");
    setCheckStatus(false);
    dispatch({
      type: "SET_PATH",
      payload: "",
    });
    dispatch({
      type: "SET_ORDER",
      payload: "",
    });
  };
  return (
    <div className="d-flex">
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <RolesList onChange={handleChangeRole} selectedRoles={selectedRoles} />
        <button className="btn btn-secondary mt-2 mb-2" onClick={clearFilter}>
          ????????????????
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
            ?? ????????????
          </label>
        </div>
      </div>
      <div className="d-flex flex-column">
        <ul className="nav d-flex justify-content-center">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="users/add">
              ???????????????? ????????????????????????
            </Link>
          </li>
        </ul>

        {count > 0 && <Table data={usersCrop} />}
        <div className="d-flex justify-content-center">
          <Pagination itemsCount={count} pageSize={pageSize} />
        </div>
      </div>
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <button
          className="btn btn-secondary mt-2 mb-2"
          onClick={() => handleSortByName("asc")}
        >
          ???????????????????? ???? ??????????
        </button>
        <button
          className="btn btn-secondary mt-2 mb-2"
          onClick={() => handleSortByBirthday("desc")}
        >
          ???????????????????? ???? ???????? ????????????????(??????????????????????)
        </button>
        <button
          className="btn btn-secondary mt-2 mb-2"
          onClick={() => handleSortByBirthday("asc")}
        >
          ???????????????????? ???? ???????? ????????????????(????????????????)
        </button>
      </div>
    </div>
  );
};

export default UsersListPage;
