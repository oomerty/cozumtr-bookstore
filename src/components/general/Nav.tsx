import { Link, useNavigate } from "react-router-dom";

import Field from "./Field";
import Button from "./Button";
import Card from "./Card";
import { memo, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function Nav() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [userMenu, setUserMenu] = useState(false);

  function handleUserMenu() {
    if (buttonRef.current) {
      setUserMenu(!userMenu);
    }
  }

  return (
    <nav className="flex flex-row bg-white shadow-[0px_8px_10px_0px_rgba(9,9,55,0.02)] gap:8 md:gap-32 justify-between items-center px-8 md:px-16 py-6 sticky top-0 z-50">
      <Link to="/" className="branding self-center h-8 md:h-full">
        <img
          src="/img/logo.svg"
          alt="Bookstore's logo in purple color"
          className="h-full"
        />
      </Link>
      <div className="w-full hidden md:block">
        <Field placeholder="Search" type="text" value="" onChange={() => {}} />
      </div>
      <div className="flex flex-row gap-4">
        {token ? (
          <>
            <Button btnType="field" className="!px-2.5 inline-block md:hidden">
              <span className="material-symbols-outlined">search</span>
            </Button>
            <Button
              btnType="field"
              className="!px-2.5"
              ref={buttonRef}
              onClick={() => handleUserMenu()}
            >
              <span className="material-symbols-outlined">person</span>
            </Button>
            {userMenu && <NavUserMenu className={`absolute mt-12`} />}
            <Button
              btnType="field"
              className="!px-2.5"
              onClick={() => navigate("/liked-products")}
            >
              <span className="material-symbols-outlined">favorite</span>
            </Button>
            <Button
              btnType="field"
              className="!px-2.5"
              onClick={() => navigate("/cart")}
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </Button>
          </>
        ) : (
          <>
            <Button btnType="primary" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
            <Button btnType="field" onClick={() => navigate("/login")}>
              Login
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

function NavUserMenu({ className }: { className?: string }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Card
      className={`z-50 !p-0 !gap-0 !bg-gray-100 !hover:bg-gray-100 !outline-0 min-w-32 ${
        className && className
      }`}
    >
      <Button btnType="field">Profile</Button>
      <Button
        btnType="field"
        onClick={() => {
          logout();
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }}
      >
        Logout
      </Button>
    </Card>
  );
}

export default memo(Nav);
