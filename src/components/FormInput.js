import React from "react";

export const FormInput = ({ name, error, label, type, onChangeInput }) => {
  return (
    <div className="form-input-containter">
      <label htmlFor={name}>
        {label}
        <input type={type} name={name} onChange={onChangeInput} />
      </label>
      <span className="input-error">{error}</span>
    </div>
  );
};
