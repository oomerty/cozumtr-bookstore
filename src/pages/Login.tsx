import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { useAuth } from "../hooks/useAuth";

import { Auth } from "./Auth";
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
      throw new Error();
    } catch {
      setError("root", {
        message: "Cannot find user with this e-mail or password",
      });
    } finally {
      if (!errors) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
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

      {errors.root && <Alert title="Error" text={errors.root.message} />}
      {errors.email && <Alert title="Error" text={errors.email.message} />}
      {errors.password && (
        <Alert title="Error" text={errors.password.message} />
      )}

      {isSubmitSuccessful && <Alert title="Success" text="Login successful" />}
    </Auth>
  );
}

export default Login;
