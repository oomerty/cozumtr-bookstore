import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthHookReturn {
  login: (e: React.FormEvent<HTMLFormElement>, data: object) => Promise<void>;
  register: (
    e: React.FormEvent<HTMLFormElement>,
    data: object
  ) => Promise<void>;
  logout: () => void;
  token: string;
  loading: boolean;
  error: string | null;
  success: string | null;
  clearMessages: () => void;
}

export function useAuth(): AuthHookReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState("");

  const navigate = useNavigate();

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const authenticate = async ({ token }: { token: string }) => {
    setAuthToken(token);

    try {
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to store auth data:", error);
    }
  };

  const handleAuth = async (
    e: React.FormEvent<HTMLFormElement>,
    authType: "login" | "register",
    data: object
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // API'da boş email ve pass gönderilse bile başarıyla giriş yapılabiliyor?

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

      setSuccess(
        authType === "login"
          ? "Login successful! Redirecting..."
          : "Registration successful! Please login."
      );

      setTimeout(() => {
        if (authType === "login") {
          navigate("/");
        } else {
          navigate("/login");
        }
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
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
    login: (e, data) => handleAuth(e, "login", data),
    register: (e, data) => handleAuth(e, "register", data),
    logout: () => handleLogout(),
    token: authToken,
    loading,
    error,
    success,
    clearMessages,
  };
}
