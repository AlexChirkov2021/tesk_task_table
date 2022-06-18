import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import api from "../../../api";
import CheckBoxField from "../../common/form/checkBoxField";
import SelectField from "../../common/form/selectField";
import _ from "lodash";
import PhoneMaskedInput from "../../common/form/phoneMaskedInput";
import DateMaskedInput from "../../common/form/dateMaskedInput";

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
            label="День рождения "
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
            label="В архиве"
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
