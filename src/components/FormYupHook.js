import React from "react";
import { ReactHookFormInput } from "./ReactHookFormInput";
import { RegistrationButton } from "./RegistrationButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = yup
  .object({
    email: yup
      .string()
      .email("Введите правильный email.")
      .required("Поле обязательное для ввода"),
    password: yup
      .string()
      .min(6, "Пароль не должен быть меньше 6 символов.")
      .max(30, "Пароль не должен быть более 30 символов.")
      .required("Поле обязательное для ввода"),
    passwordConfirm: yup
      .string()
      .required("Поле обязательное для ввода")
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
  })
  .required();

export const FormYupHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
      <ReactHookFormInput
        label={"Email"}
        type={"email"}
        name={"email"}
        error={errors.email?.message}
        register={register}
      />
      <ReactHookFormInput
        label={"Пароль"}
        type={"password"}
        name={"password"}
        error={errors.password?.message}
        register={register}
      />
      <ReactHookFormInput
        label={"Повторить пароль"}
        type={"password"}
        name={"passwordConfirm"}
        error={errors.passwordConfirm?.message}
        register={register}
      />
      <RegistrationButton />
    </form>
  );
};
