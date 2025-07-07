import { useState } from "react";
import axios from "axios";

interface AuthHookReturn {
  login: (data: object) => Promise<void>;
  register: (data: object) => Promise<void>;
  logout: () => void;
  token: string;
}

export function useAuth(): AuthHookReturn {
  const [authToken, setAuthToken] = useState("");

  const authenticate = async ({ token }: { token: string }) => {
    setAuthToken(token);

    try {
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to store auth data:", error);
    }
  };

  const handleAuth = async (authType: "login" | "register", data: object) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/${authType}`,
        data,
      });

      const responseData =
        authType === "login" ? res.data.action_login : res.data.action_register;

      authenticate({
        token: responseData.token,
      });
    } catch {
      throw new Error("An error occurred");
    }
  };

  const handleLogout = () => {
    setAuthToken("");

    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Failed to remove auth data:", error);
    }
  };

  return {
    login: (data) => handleAuth("login", data),
    register: (data) => handleAuth("register", data),
    logout: () => handleLogout(),
    token: authToken,
  };
}
