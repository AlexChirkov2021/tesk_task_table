import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../../../store/asyncActions/roles";
import api from "../../../api";
import TextField from "../../common/form/textField";
import CheckBoxField from "../../common/form/checkBoxField";
import SelectField from "../../common/form/selectField";
import PhoneMaskedInput from "../../common/form/phoneMaskedInput";
import DateMaskedInput from "../../common/form/dateMaskedInput";

const EditUserPage = () => {
  const [data, setData] = useState({
    name: "",
    role: "",
    phone: "",
    isArchive: false,
    birthday: "",
  });
  const roles = useSelector((state) => state.roles.roles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

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

export default EditUserPage;
