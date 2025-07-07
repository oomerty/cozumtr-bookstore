import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { useAuth } from "../hooks/useAuth";

import { Auth } from "./Auth";
import Field from "../components/general/Field";
import Alert from "../components/general/Alert";

interface SignupFormInput {
  name: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const { register: signup } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignupFormInput>();
  const onSubmit: SubmitHandler<SignupFormInput> = async (data) => {
    try {
      await signup(data);
    } catch {
      setError("root", {
        message:
          "There might already be an account with this email - please try to login first or try again later",
      });
      return;
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
      greetTitle="Join today!"
      mainTitle="Create an account"
      primaryButtonText={isSubmitting ? "Loading..." : "Register"}
      secondaryButtonText="Login"
      secondaryOnClick={(e) => {
        e.preventDefault();
        navigate("/login");
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field
        type="text"
        label="Name"
        placeholder="John Doe"
        register={register("name", {
          required: "Name is required",
        })}
      />
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

      {errors.root && <Alert title="Error" text={errors.root.message} />}
      {errors.email && <Alert title="Error" text={errors.email.message} />}
      {errors.password && (
        <Alert title="Error" text={errors.password.message} />
      )}

      {isSubmitSuccessful && (
        <Alert title="Success" text="Account successfully created" />
      )}
    </Auth>
  );
}

export default Signup;
