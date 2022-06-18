import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUsers } from "../../../store/asyncActions/users";
import { fetchRoles } from "../../../store/asyncActions/roles";
import api from "../../../api";
import TextField from "../../common/form/textField";
import CheckBoxField from "../../common/form/checkBoxField";
import SelectField from "../../common/form/selectField";
import PhoneMaskedInput from "../../common/form/phoneMaskedInput";
import DateMaskedInput from "../../common/form/dateMaskedInput";

const AddNewUser = () => {
  const users = useSelector((state) => state.users.users);
  const [data, setData] = useState({
    name: "",
    isArchive: false,
    role: "",
    phone: "",
    birthday: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

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
