import React from "react";

export const ReactHookFormInput = ({ name, error, label, type, register }) => {
  return (
    <div className="form-input-containter">
      <label htmlFor={name}>
        {label}
        <input {...register(name)} type={type} />
      </label>
      <span className="input-error">{error}</span>
    </div>
  );
};
