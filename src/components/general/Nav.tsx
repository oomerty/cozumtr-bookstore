import { Link } from "react-router-dom";
import Field from "./Field";
import { useAuth } from "../../contexts/AuthContext";
import Button from "./Button";

function Nav() {
  const { token } = useAuth();

  return (
    <nav className="flex flex-row shadow-[0px_8px_10px_0px_rgba(9,9,55,0.02)] gap-32 items-center px-16 py-6">
      <Link to="/" className="branding self-center h-16">
        <img
          src="./img/logo.svg"
          alt="Bookstore's logo in purple color"
          className="h-full"
        />
      </Link>
      <div className="w-full">
        <Field placeholder="Search" type="text" />
      </div>
      {token !== undefined ? (
        <Button>Buton</Button>
      ) : (
        <div className="flex flex-row gap-1 w-max">
          <Button type="primary">Sign Up</Button>
          <Button>Login</Button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
