import React from "react";
import { IMaskInput } from "react-imask";

const DateMaskedInput = ({ value, onChange, name, label }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <IMaskInput
          mask={Date}
          min={new Date(1950, 0, 1)}
          max={new Date(2020, 0, 1)}
          lazy={false}
          unmask={true}
          onAccept={(value) => onChange({ name: "birthday", value: value })}
          value={value}
          name={name}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default DateMaskedInput;
