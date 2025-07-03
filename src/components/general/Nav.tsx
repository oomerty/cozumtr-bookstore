import { Link, useNavigate } from "react-router-dom";

// import { useAuth } from "../../hooks/useAuth";

import Field from "./Field";
import Button from "./Button";

function Nav() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav className="flex flex-row bg-white shadow-[0px_8px_10px_0px_rgba(9,9,55,0.02)] gap:8 md:gap-32 justify-between items-center px-8 md:px-16 py-6 sticky top-0">
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
            <Button type="field" className="!px-2.5 inline-block md:hidden">
              <span className="material-symbols-outlined">search</span>
            </Button>
            <Button type="field" className="!px-2.5">
              <span className="material-symbols-outlined">person</span>
            </Button>
            <Button type="field" className="!px-2.5">
              <span className="material-symbols-outlined">favorite</span>
            </Button>
            <Button type="field" className="!px-2.5">
              <span className="material-symbols-outlined">shopping_cart</span>
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
            <Button type="field" onClick={() => navigate("/login")}>
              Login
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
