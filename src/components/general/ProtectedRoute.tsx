import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!token) navigate("/login", { replace: true });
    },
    [token, navigate]
  );

  return token ? children : null;
}

export default ProtectedRoute;
