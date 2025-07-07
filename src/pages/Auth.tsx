import type React from "react";
import { Link } from "react-router-dom";

import Button from "../components/general/Button";

interface AuthProps {
  children: React.ReactNode;
  greetTitle: string;
  mainTitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryOnClick: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
  onSubmit: () => void;
}

function Auth({
  children,
  greetTitle,
  mainTitle,
  primaryButtonText,
  secondaryButtonText,
  secondaryOnClick,
  onSubmit,
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
          <Link to="/" className="branding self-center h-16">
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

        <form
          className="w-full h-full flex flex-col justify-between pb-8"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-8">{children}</div>
          <div className="flex flex-col gap-2.5">
            <Button btnType="primary" formSubmit="submit">
              {primaryButtonText}
            </Button>
            <Button btnType="secondary" onClick={secondaryOnClick}>
              {secondaryButtonText}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export { Auth };
