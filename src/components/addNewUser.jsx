import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "./textField";
import api from "../api";
import CheckBoxField from "./checkBoxField";
import SelectField from "./selectField";
import _ from "lodash";

const AddNewUser = () => {
  const [users, setUsers] = useState();
  const [data, setData] = useState({
    name: "",
    isArchive: false,
    role: "",
    phone: "",
    birthday: "",
  });
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    api.users
      .fetchAll()
      .then((data) => setRoles(_.uniq(data.map(({ role }) => role))));
  }, []);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const history = useHistory();
  const { userId } = useParams();
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.users
      .addUser(users.length, {
        ...data,
      })
      .then((data) => history.push(`/users`));
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 shadow p-4">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя сотрудника"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <TextField
            label="Телефон"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
          <TextField
            label="День рождения"
            name="birthday"
            value={data.birthday}
            onChange={handleChange}
          />
          <SelectField
            label="Выбери свою должность"
            defaultOption="Выбрать..."
            name="role"
            options={roles}
            onChange={handleChange}
            value={data.role}
          />
          <CheckBoxField
            label="Статус"
            value={data.isArchive}
            onChange={handleChange}
            name="isArchive"
          />

          <button type="submit" className="btn btn-primary w-100 mx-auto">
            Обновить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
