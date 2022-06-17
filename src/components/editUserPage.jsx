import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "./textField";
import api from "../api";
import CheckBoxField from "./checkBoxField";
import SelectField from "./selectField";
import _ from "lodash";
import PhoneMaskedInput from "./phoneMaskedInput";
import DateMaskedInput from "./dateMaskedInput";

const EditUserPage = () => {
  const [data, setData] = useState({
    name: "",
    role: "",
    phone: "",
    isArchive: false,
    birthday: "",
  });
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    api.users
      .fetchAll()
      .then((data) => setRoles(_.uniq(data.map(({ role }) => role))));
  }, []);
  const history = useHistory();
  const { userId } = useParams();
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    api.users.getById(Number(userId)).then((data) =>
      setData({
        name: data.name,
        role: data.role,
        phone: data.phone,
        isArchive: data.isArchive,
        birthday: data.birthday,
      })
    );
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.users
      .update(Number(userId), {
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
          <PhoneMaskedInput
            onChange={handleChange}
            value={data.phone}
            name="phone"
            label="Телефон"
          />
          <DateMaskedInput
            onChange={handleChange}
            value={data.birthday}
            name="birthday"
            label="День рождения"
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

export default EditUserPage;
