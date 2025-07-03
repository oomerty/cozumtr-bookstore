import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { useAuth } from "../hooks/useAuth";

import { Auth } from "./Auth";
import Field from "../components/general/Field";
import Checkbox from "../components/general/Checkbox";
import Spinner from "../components/general/Spinner";
import Alert from "../components/general/Alert";

interface LoginFormInput {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { login, loading, error, success } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log(data);
  };

  if (loading) return <Spinner />;

  return (
    <Auth
      greetTitle="Welcome back!"
      mainTitle="Login to your account"
      primaryButtonText="Login"
      // primaryOnClick={(e) =>
      //   login(e, {
      //     email,
      //     password,
      //   })
      // }
      secondaryButtonText="Register"
      secondaryOnClick={(e) => {
        e.preventDefault();
        navigate("/signup");
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field
        type="email"
        label="E-mail"
        placeholder="john@mail.com"
        register={register("email", {
          required: "E-mail is required",
          validate: (value) => {
            if (!value.includes("@")) {
              return "E-mail must include @";
            }
            return true;
          },
        })}
      />
      <Field
        type="password"
        label="Password"
        placeholder="• • • • • • • •"
        register={register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        })}
      />

      <Checkbox id="loginRememberMe" label="Remember Me" />

      {errors.email && <Alert title="Error" text={errors.email.message} />}
      {errors.password && (
        <Alert title="Error" text={errors.password.message} />
      )}

      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {success && <Alert title="Success" text={success} />}
    </Auth>
  );
}

export default Login;
