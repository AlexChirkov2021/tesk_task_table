import React from "react";
import { useSelector } from "react-redux/es/exports";

const RolesList = ({ onChange, selectedRoles }) => {
  const roles = useSelector((state) => state.roles.roles);
  return (
    <div className="mb-4">
      <select
        className="form-select"
        id="id"
        name="roles"
        value={selectedRoles ? selectedRoles : ""}
        onChange={onChange}
      >
        <option disabled value="">
          Выбрать должность
        </option>
        {roles?.length > 0 &&
          roles.map((option) => <option key={Math.random()}>{option}</option>)}
      </select>
    </div>
  );
};

export default RolesList;
