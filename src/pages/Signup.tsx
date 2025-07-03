import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { Auth } from "./Auth";
import Field from "../components/general/Field";
import Spinner from "../components/general/Spinner";
import Alert from "../components/general/Alert";

function Signup() {
  const navigate = useNavigate();
  const { register, loading, error, success } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) return <Spinner />;

  return (
    <Auth
      greetTitle="Join today!"
      mainTitle="Create an account"
      primaryButtonText="Register"
      primaryOnClick={(e) =>
        register(e, {
          email,
          password,
        })
      }
      secondaryButtonText="Login"
      secondaryOnClick={(e) => {
        e.preventDefault();
        navigate("/login");
      }}
    >
      <Field
        type="text"
        label="Name"
        placeholder="John Doe"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Field
        type="email"
        label="E-mail"
        placeholder="john@mail.com"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Field
        type="password"
        label="Password"
        placeholder="• • • • • • • •"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {success && <Alert title="Success" text={success} />}
    </Auth>
  );
}

export default Signup;
