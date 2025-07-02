import type React from "react";
import { useState } from "react";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import axios from "axios";

import Button from "../components/general/Button";
import Field from "../components/general/Field";
import { useAuth } from "../contexts/AuthContext";

const BASE_URL = "https://assign-api.piton.com.tr/api/rest";

interface AuthProps {
  children: React.ReactNode;
  greetTitle: string;
  mainTitle: string;
  primaryButtonText: string;
  primaryOnClick: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
  secondaryButtonText: string;
  secondaryOnClick: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
}

function Auth({
  children,
  greetTitle,
  mainTitle,
  primaryButtonText,
  primaryOnClick,
  secondaryButtonText,
  secondaryOnClick,
}: AuthProps) {
  return (
    <main className="h-screen grid grid-cols-1 md:grid-cols-2 font-manrope">
      <img
        src="./img/login-banner.webp"
        alt="Image from a bookstore, table and a light source on the focus, table is filled with books"
        className="w-full h-screen object-cover hidden md:inline-block"
      />

      <div className="flex flex-col w-2/3 h-full m-auto">
        <div className="header flex flex-col gap-16 py-12">
          <Link to="/home" className="branding self-center h-16">
            <img src="./img/logo.svg" alt="Bookstore's logo in purple color" />
          </Link>
          <div className="title flex flex-col gap-1">
            <h2 className="justify-start text-slate-900/60 text-md font-semibold">
              {greetTitle}
            </h2>
            <h1 className="justify-start text-slate-900 text-3xl font-bold">
              {mainTitle}
            </h1>
          </div>
        </div>

        <form className="w-full h-full">
          <div className="flex flex-col gap-8">{children}</div>
          <div className="flex flex-col gap-2.5">
            <Button type="primary" onClick={primaryOnClick}>
              {primaryButtonText}
            </Button>
            <Button type="secondary" onClick={secondaryOnClick}>
              {secondaryButtonText}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Login() {
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Auth
      greetTitle="Welcome back!"
      mainTitle="Login to your account"
      primaryButtonText="Login"
      primaryOnClick={(e) =>
        handleAuth(
          e,
          "login",
          {
            email,
            password,
          },
          navigate,
          authenticate
        )
      }
      secondaryButtonText="Register"
      secondaryOnClick={(e) => {
        e.preventDefault();
        navigate("/signup");
      }}
    >
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
    </Auth>
  );
}

function Signup() {
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Auth
      greetTitle="Join today!"
      mainTitle="Create an account"
      primaryButtonText="Register"
      primaryOnClick={(e) =>
        handleAuth(
          e,
          "register",
          {
            email,
            password,
          },
          navigate,
          authenticate
        )
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
    </Auth>
  );
}

async function handleAuth(
  e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  authType: "login" | "register",
  data: object,
  navigate: NavigateFunction,
  authenticate: (credentials: { token: string; userId: string }) => void
) {
  e.preventDefault();

  // if (!email && !password) {
  //   throw new Error("Please fill the login fields!");
  // }

  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/${authType}`,
      data,
    });

    authenticate(
      authType === "login"
        ? res.data.action_login.token
        : res.data.action_register.token
    );
    navigate("/");
  } catch (error) {
    console.log(error);
  }
}

export { Login, Signup };
