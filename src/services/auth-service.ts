import { useState } from "react";
import apiClient from "./api-client";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  action_login: {
    token: string;
    userId?: string;
  };
}

interface RegisterResponse {
  action_register: {
    token: string;
    userId?: string;
  };
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient.post<LoginResponse>("/login", credentials);

      const { token } = data.action_login;

      localStorage.setItem("token", token);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      await apiClient.post<RegisterResponse>("/register", data);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return {
    login,
    register,
    logout,
    getToken,
    isAuthenticated,
    loading,
    error,
  };
}
