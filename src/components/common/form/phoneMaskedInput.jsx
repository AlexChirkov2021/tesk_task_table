import React from "react";
import InputMask from "react-input-mask";

const PhoneMaskedInput = ({ value, onChange, name, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <InputMask
          mask="+7 (999) 999-9999"
          onChange={handleChange}
          value={value}
          name={name}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default PhoneMaskedInput;
