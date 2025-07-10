import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { useAuth } from "../hooks/useAuth";

import { Auth } from "../components/page-specific/auth/Auth";
import Field from "../components/general/Field";
import Checkbox from "../components/general/Checkbox";
import Alert from "../components/general/Alert";

interface LoginFormInput {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      await login(data);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("root", {
        message: `${
          err ? err : "Cannot log you in right now - please try again later"
        }`,
      });
    }
  };

  return (
    <Auth
      greetTitle="Welcome back!"
      mainTitle="Login to your account"
      primaryButtonText={isSubmitting ? "Loading..." : "Login"}
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
      {errors.email && (
        <p className="text-base text-red-600 font-semibold">
          {errors.email.message}
        </p>
      )}
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
      {errors.password && (
        <p className="text-base text-red-600 font-semibold">
          {errors.password.message}
        </p>
      )}

      <Checkbox id="loginRememberMe" label="Remember Me" />

      {errors.root && <Alert title="Error" text={errors.root.message} />}

      {isSubmitSuccessful && <Alert title="Success" text="Login successful" />}
    </Auth>
  );
}

export default Login;
