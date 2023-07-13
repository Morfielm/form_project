import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { RegistrationButton } from "./RegistrationButton";

const INITIAL_INPUTS = {
  email: "",
  password: "",
  passwordConfirm: "",
};
export const Form = () => {
  const [formInputs, setFormInputs] = useState(INITIAL_INPUTS);
  const [formErrors, setFormErrors] = useState(INITIAL_INPUTS);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
    const error = validateField(name, value);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const validateField = (name, value) => {
    if (value.length === 0) {
      return "Поле не должно быть пустым";
    }
    if (name === "password" && value.length < 6) {
      return "Пароль должен иметь не меньше 6 символов";
    }
    if (name === "passwordConfirm" && value !== formInputs.password) {
      return "Пароли должны совпадать";
    }
    return "";
  };

  const validateForm = () => {
    const errors = {};
    let hasError = false;
    Object.keys(formInputs).forEach((name) => {
      const error = validateField(name, formInputs[name]);
      if (error.length) {
        hasError = true;
      }
      errors[name] = error;
    });
    setFormErrors(errors);
    return hasError;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const formHasErrors = validateForm();
    if (!formHasErrors) {
      console.log(formInputs);
    }
  };

  return (
    <form className="registration-form" onSubmit={onSubmitForm}>
      <FormInput
        label={"Email"}
        type={"email"}
        name={"email"}
        error={formErrors.email}
        onChangeInput={onChangeInput}
      />
      <FormInput
        label={"Пароль"}
        type={"password"}
        name={"password"}
        error={formErrors.password}
        onChangeInput={onChangeInput}
      />
      <FormInput
        label={"Повторить пароль"}
        type={"password"}
        name={"passwordConfirm"}
        error={formErrors.passwordConfirm}
        onChangeInput={onChangeInput}
      />
      <RegistrationButton />
    </form>
  );
};
