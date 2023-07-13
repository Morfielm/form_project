import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { RegistrationButton } from "./RegistrationButton";
import * as yup from "yup";

const INITIAL_INPUTS = {
  email: "",
  password: "",
  passwordConfirm: "",
};

const emailScheme = yup
  .string()
  .email("Введите правильный email.")
  .required("Поле обязательное для ввода");

const passwordScheme = yup
  .string()
  .min(6, "Пароль не должен быть меньше 6 символов.")
  .max(30, "Пароль не должен быть более 30 символов.")
  .required("Поле обязательное для ввода");

const validateAndGetErrorMessage = (scheme, value) => {
  let errorMessage = "";

  try {
    scheme.validateSync(value);
  } catch ({ errors }) {
    errorMessage = errors[0];
  }

  return errorMessage;
};

export const FormYup = () => {
  const [formInputs, setFormInputs] = useState(INITIAL_INPUTS);
  const [formErrors, setFormErrors] = useState(INITIAL_INPUTS);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
    const error = validateField(name, value);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const validateField = (name, value) => {
    if (name === "email") {
      return validateAndGetErrorMessage(emailScheme, value);
    }
    if (name === "password") {
      return validateAndGetErrorMessage(passwordScheme, value);
    }
    if (name === "passwordConfirm") {
      const confirmError = validateAndGetErrorMessage(passwordScheme, value);
      if (!confirmError && value !== formInputs.password) {
        return "Пароли должны совпадать";
      } else {
        return confirmError;
      }
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
