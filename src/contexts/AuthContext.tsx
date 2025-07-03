/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
  authenticate: (credentials: { token: string; userId: string }) => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState("");

  // Check for stored credentials when component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  async function authenticate({ token }: { token: string }) {
    setAuthToken(token);
    console.log(token);

    try {
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to store auth data:", error);
    }
  }

  function logout() {
    setAuthToken("");

    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Failed to remove auth data:", error);
    }
  }

  const value: AuthContextType = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within a AuthContextProvider");
//   }
//   return context;
// }

export { AuthProvider };
