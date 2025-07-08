import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface AuthHookReturn {
  login: (data: object) => Promise<void>;
  register: (data: object) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  token: string;
}

interface AuthErrorResponse {
  internal?: {
    response?: {
      body?: {
        message?: string;
      };
    };
  };
}

export function useAuth(): AuthHookReturn {
  const [authToken, setAuthToken] = useState("");
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthStatus(true);
    }
  }, []);

  const authenticate = async ({ token }: { token: string }) => {
    setAuthToken(token);

    try {
      localStorage.setItem("token", token);
      setAuthStatus(true);
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
    } catch (err: unknown) {
      const axiosError = err as AxiosError<AuthErrorResponse>;

      throw new Error(
        axiosError.response?.data?.internal?.response?.body?.message ??
          "An error occurred with authentication - please try again later"
      );
    }
  };

  const handleLogout = () => {
    setAuthToken("");

    try {
      localStorage.removeItem("token");
      setAuthStatus(false);
    } catch (error) {
      console.error("Failed to remove auth data:", error);
    }
  };

  return {
    login: (data) => handleAuth("login", data),
    register: (data) => handleAuth("register", data),
    logout: () => handleLogout(),
    isAuthenticated: authStatus,
    token: authToken,
  };
}
