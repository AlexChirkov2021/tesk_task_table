import React, { useEffect, useState } from "react";
import api from "../api";
import UserTable from "./userTable";
import _ from "lodash";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const UsersListPage = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [roles, setRoles] = useState();
  const [dates, setDates] = useState();
  const [sortBy, setSortBy] = useState({ path: "", order: "" });
  const [selectedRoles, setSelectedRoles] = useState();
  const [checkStatus, setCheckStatus] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    api.users
      .fetchAll()
      .then((data) => setRoles(_.uniq(data.map(({ role }) => role))));
  }, []);

  useEffect(() => {
    api.users
      .fetchAll()
      .then((data) => setDates(data.map(({ birthday }) => birthday)));
  }, []);

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSortByName = (value) => {
    setSortBy({ path: "name", order: sortBy.order === value ? "desc" : "asc" });
  };

  const handleSortByBirthdayAsc = () => {
    console.log(dates);
  };
  const handleSortByBirthdayDesc = (array) => {
    array.map((item) => {
      const [date, month, year] = item;
      console.log(year, date, month, year);
    });
    setSortBy({
      path: "birthday",
      order: "desc",
    });
  };

  const handleChangeRole = ({ target }) => {
    setSelectedRoles(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const uniqueRoles = () => {
    setRoles(_.uniq(roles));
  };

  const toggleCheckbox = () => {
    setCheckStatus((prevState) => !prevState);
    setSelectedRoles();
  };

  useEffect(() => {
    uniqueRoles();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRoles, checkStatus]);

  const filteredUsers = checkStatus
    ? users.filter((user) => user.isArchive === true)
    : selectedRoles
    ? users.filter((user) => user.role === selectedRoles)
    : users;

  const count = filteredUsers?.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const usersCrop = paginate(sortedUsers, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedRoles();
    setCheckStatus(false);
  };
  return (
    <div className="d-flex">
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <div className="mb-4">
          <select
            className="form-select"
            id="id"
            name="roles"
            value=""
            onChange={handleChangeRole}
          >
            <option disabled value="">
              Выбрать должность
            </option>
            {roles?.length > 0 &&
              roles.map((option) => (
                <option key={Math.random()}>{option}</option>
              ))}
          </select>
        </div>

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
            Фильтрация по должности
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

        {count > 0 && (
          <UserTable
            users={usersCrop}
            selectedSort={sortBy}
            onSort={handleSort}
          />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <button
          className="btn btn-secondary mt-2 mb-2"
          onClick={() => handleSortByName("asc")}
        >
          Сортировка по имени
        </button>
        <button
          className="btn btn-secondary mt-2 mb-2 "
          onClick={handleSortByBirthdayAsc}
        >
          Сортировка по дате рождения (возрастание)
        </button>
        <button
          className="btn btn-secondary mt-2 mb-2 "
          onClick={handleSortByBirthdayDesc}
        >
          Сортировка по дате рождения (убывание)
        </button>
      </div>
    </div>
  );
};

export default UsersListPage;
